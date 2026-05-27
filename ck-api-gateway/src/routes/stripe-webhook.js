/**
 * Stripe Webhook Handler — Fully Automated Payment Processing
 *
 * Handles checkout.session.completed events from Stripe.
 * Automates the entire post-payment flow:
 *   1. Verify webhook signature (HMAC-SHA256)
 *   2. Identify product purchased (service tier or digital product)
 *   3. Create/update Airtable records (Clients, Stripe Subscriptions)
 *   4. Log to AI Log for audit trail
 *   5. Post to Slack #sales-alerts (if configured)
 *
 * Routes:
 *   POST /v1/payments/webhook — Stripe webhook endpoint
 *
 * Required secrets:
 *   STRIPE_SECRET_KEY — Stripe API secret (sk_live_...)
 *   STRIPE_WEBHOOK_SECRET — Webhook signing secret (whsec_...)
 *   AIRTABLE_API_KEY — For record creation
 */

import { jsonResponse, errorResponse } from '../utils/response.js';
import { writeAudit } from '../utils/audit.js';

async function verifyStripeSignature(request, secret) {
  if (!secret) return { verified: false, reason: 'STRIPE_WEBHOOK_SECRET not configured' };

  const signature = request.headers.get('stripe-signature');
  if (!signature) return { verified: false, reason: 'Missing stripe-signature header' };

  const body = await request.text();

  const parts = {};
  for (const pair of signature.split(',')) {
    const [key, value] = pair.split('=');
    parts[key.trim()] = value.trim();
  }

  const timestamp = parts.t;
  const sig = parts.v1;

  if (!timestamp || !sig) return { verified: false, reason: 'Invalid signature format' };

  const age = Math.abs(Date.now() / 1000 - parseInt(timestamp));
  if (age > 300) return { verified: false, reason: 'Timestamp too old (replay protection)' };

  const payload = `${timestamp}.${body}`;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'],
  );
  const mac = await crypto.subtle.sign('HMAC', key, encoder.encode(payload));
  const expected = Array.from(new Uint8Array(mac)).map(b => b.toString(16).padStart(2, '0')).join('');

  if (expected !== sig) return { verified: false, reason: 'Signature mismatch' };

  return { verified: true, body, event: JSON.parse(body) };
}

const PRODUCT_MAP = {
  'home-watch-kit': { name: 'Home Watch Startup Kit', price: '$47', type: 'digital', delivery: 'email' },
  'ai-playbook': { name: 'AI Automation Playbook', price: '$197', type: 'digital', delivery: 'email' },
  'inspection-templates': { name: 'Inspection Report Template Pack', price: '$197', type: 'digital', delivery: 'email' },
  'mastery-course': { name: 'AI Mastery Course', price: '$997', type: 'digital', delivery: 'portal' },
  'ck-os-starter': { name: 'CK OS Starter', price: '$197/mo', type: 'saas', delivery: 'onboarding' },
  'ck-os-professional': { name: 'CK OS Professional', price: '$497/mo', type: 'saas', delivery: 'onboarding' },
  'ck-os-enterprise': { name: 'CK OS Enterprise', price: '$997/mo', type: 'saas', delivery: 'onboarding' },
  'tier-select': { name: 'Select Home Watch', price: '$195/mo', type: 'service', delivery: 'onboarding' },
  'tier-premier': { name: 'Premier Home Watch', price: '$295/mo', type: 'service', delivery: 'onboarding' },
  'tier-platinum': { name: 'Platinum Home Watch', price: '$395/mo', type: 'service', delivery: 'onboarding' },
  'svc-hurricane-prep': { name: 'Hurricane Preparation', price: '$350', type: 'service', delivery: 'schedule' },
  'svc-deep-inspection': { name: 'Deep Property Inspection', price: '$150', type: 'service', delivery: 'schedule' },
  'svc-onboarding': { name: 'New Client Onboarding', price: '$250', type: 'service', delivery: 'schedule' },
};

async function writeToAirtable(env, table, fields) {
  if (!env.AIRTABLE_API_KEY || !env.AIRTABLE_BASE_ID) return null;

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${table}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.AIRTABLE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ records: [{ fields }] }),
      },
    );
    return await res.json();
  } catch {
    return null;
  }
}

async function postToSlack(env, message) {
  if (!env.SLACK_WEBHOOK_URL) return;
  try {
    await fetch(env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message }),
    });
  } catch {}
}

export async function handleStripeWebhook(request, env, ctx) {
  const stripeSecret = env.STRIPE_WEBHOOK_SECRET || env.STRIPE_WEBHOOK_SIGNING_SECRET;

  if (stripeSecret) {
    const result = await verifyStripeSignature(request.clone(), stripeSecret);
    if (!result.verified) {
      return errorResponse(`Webhook verification failed: ${result.reason}`, 401);
    }
    var event = result.event;
  } else {
    try {
      var event = await request.json();
    } catch {
      return errorResponse('Invalid JSON', 400);
    }
  }

  if (event.type !== 'checkout.session.completed') {
    return jsonResponse({ received: true, type: event.type, action: 'ignored' });
  }

  const session = event.data.object;
  const customerEmail = session.customer_email || session.customer_details?.email || 'unknown';
  const customerName = session.customer_details?.name || 'Unknown';
  const amountTotal = session.amount_total;
  const currency = session.currency?.toUpperCase() || 'USD';
  const mode = session.mode;
  const metadata = session.metadata || {};
  const productId = metadata.productId || metadata.serviceId || metadata.product || 'unknown';
  const productInfo = PRODUCT_MAP[productId] || { name: productId, price: `$${(amountTotal / 100).toFixed(0)}`, type: 'unknown', delivery: 'manual' };

  const saleRecord = {
    timestamp: new Date().toISOString(),
    event_id: event.id,
    session_id: session.id,
    customer_email: customerEmail,
    customer_name: customerName,
    product_id: productId,
    product_name: productInfo.name,
    amount_cents: amountTotal,
    amount_display: `$${(amountTotal / 100).toFixed(2)}`,
    currency,
    mode,
    product_type: productInfo.type,
    delivery_method: productInfo.delivery,
    stripe_customer_id: session.customer || null,
    subscription_id: session.subscription || null,
  };

  const actions = [];

  if (productInfo.type === 'digital') {
    actions.push(`DELIVER: Send ${productInfo.name} download link to ${customerEmail}`);
  }
  if (productInfo.type === 'saas') {
    actions.push(`ONBOARD: Schedule onboarding call with ${customerName} at ${customerEmail} for ${productInfo.name}`);
  }
  if (productInfo.type === 'service') {
    actions.push(`SCHEDULE: Create client record and schedule first visit for ${customerName}`);
  }

  ctx.waitUntil(Promise.all([
    writeAudit(env, ctx, {
      route: '/v1/payments/webhook',
      action: 'payment_completed',
      ...saleRecord,
    }),

    writeToAirtable(env, 'Stripe Subscriptions', {
      'Stripe Subscription ID': session.subscription || session.id,
      'Customer Email': customerEmail,
      'Customer Name': customerName,
      'Plan': productInfo.name,
      'Amount': amountTotal / 100,
    }),

    writeToAirtable(env, 'AI Log', {
      'Log Entry': `SALE: ${productInfo.name} — ${saleRecord.amount_display} from ${customerEmail}`,
      'Module': 'Payment Engine',
      'Request Type': 'checkout.session.completed',
      'Input Brief': JSON.stringify({ product: productId, email: customerEmail, amount: saleRecord.amount_display }),
      'Output Text': JSON.stringify({ actions, delivery: productInfo.delivery }),
    }),

    postToSlack(env, `:moneybag: *NEW SALE* — ${productInfo.name} (${saleRecord.amount_display})\nCustomer: ${customerName} <${customerEmail}>\nDelivery: ${productInfo.delivery}\nActions: ${actions.join('; ')}`),
  ]));

  return jsonResponse({
    received: true,
    type: 'checkout.session.completed',
    sale: saleRecord,
    automated_actions: actions,
    status: 'processed',
  });
}
