/**
 * Digital Products Suite — Coastal Key Revenue Engine
 *
 * Four digital products sold via Stripe Checkout:
 *   $47  — Home Watch Startup Kit
 *   $197 — AI Automation Playbook + Inspection Templates
 *   $997 — AI Mastery Course
 *   $197-$997/mo — Coastal Key OS License (SaaS)
 *
 * Routes:
 *   GET  /v1/products/catalog         — Full product catalog
 *   GET  /v1/products/:id             — Single product detail
 *   POST /v1/products/:id/checkout    — Create Stripe Checkout session
 *   GET  /v1/products/purchases/:email — List purchases for email
 */

import { jsonResponse, errorResponse } from '../utils/response.js';
import { writeAudit } from '../utils/audit.js';

const PRODUCTS = {
  'starter-kit': {
    id: 'starter-kit',
    name: 'Home Watch Startup Kit',
    tagline: 'Launch a monitoring service in 30 days.',
    price_cents: 4700,
    price_display: '$47',
    type: 'one-time',
    description: 'Everything you need to launch a home watch business from scratch. Business formation checklist, insurance requirements, NHWA accreditation roadmap, client onboarding templates, inspection checklist (32-point starter version), pricing calculator, and a 30-day launch timeline.',
    includes: [
      'Business formation checklist (FL-specific)',
      'Insurance and bonding requirements guide',
      'NHWA accreditation step-by-step roadmap',
      'Client onboarding packet (3 templates)',
      '32-point inspection checklist (starter version)',
      'Pricing calculator spreadsheet',
      'Service agreement template',
      '30-day launch timeline with daily tasks',
      'Vendor onboarding packet',
      'Marketing launch playbook (first 10 clients)',
    ],
    format: 'PDF + editable templates (Google Docs/Sheets)',
    delivery: 'Instant download via email',
    target: 'Aspiring home watch entrepreneurs, property managers adding home watch services',
    stripe_price_id: null,
  },

  'automation-playbook': {
    id: 'automation-playbook',
    name: 'AI Automation Playbook + Inspection Templates',
    tagline: 'Professionalize overnight.',
    price_cents: 19700,
    price_display: '$197',
    type: 'one-time',
    description: 'The exact AI automation workflows running Coastal Key, plus 12 institutional-grade inspection report templates. Covers lead routing, client communication automation, inspection scheduling, vendor dispatch, and report generation. Every template is insurer-ready with timestamped photo placeholders and risk scoring.',
    includes: [
      '12 inspection report templates (insurer-ready, branded)',
      'AI lead routing workflow (Airtable + Zapier)',
      'Client communication automation sequences',
      'Inspection scheduling system setup guide',
      'Vendor dispatch automation workflow',
      'Report generation prompt library (20 prompts)',
      'Risk scoring methodology and templates',
      'Owner portal communication templates',
      'Storm protocol documentation package',
      'Monthly owner statement narrative templates',
      '47-point Sentinel Standard checklist (full version)',
      'Video walkthrough of each workflow (90 min total)',
    ],
    format: 'PDF + Airtable templates + video access',
    delivery: 'Instant download + video portal access via email',
    target: 'Existing home watch operators, property managers seeking AI automation',
    stripe_price_id: null,
  },

  'mastery-course': {
    id: 'mastery-course',
    name: 'AI Mastery Course',
    tagline: 'Build the entire enterprise system.',
    price_cents: 99700,
    price_display: '$997',
    type: 'one-time',
    description: 'A 12-module course teaching you how to build an AI-powered property management operation from zero. The same system running Coastal Key with 250+ AI agents across 15 departments. Covers infrastructure, automation, sales systems, client management, compliance, and scaling. Includes everything in the Startup Kit and Automation Playbook.',
    includes: [
      'Everything in Startup Kit ($47 value)',
      'Everything in Automation Playbook ($197 value)',
      '12-module video course (8+ hours)',
      'Module 1: Infrastructure — Airtable, Cloudflare, Slack setup',
      'Module 2: AI Agent Architecture — building your first 20 agents',
      'Module 3: Lead Generation — outbound and inbound systems',
      'Module 4: Sales Automation — speed-to-lead, qualification, routing',
      'Module 5: Inspection Operations — Sentinel Standard implementation',
      'Module 6: Client Communication — portal, reports, statements',
      'Module 7: Vendor Management — dispatch, compliance, payment',
      'Module 8: Storm Protocols — pre-storm, post-storm, insurance documentation',
      'Module 9: Financial Operations — pricing, billing, EBITDA tracking',
      'Module 10: Marketing Engine — content calendar, social automation',
      'Module 11: Compliance and Legal — TCPA, FDUTPA, E&O, licensing',
      'Module 12: Scaling — from 10 to 100 doors without proportional headcount',
      'Private community access (Mighty Networks)',
      'Monthly live Q&A with David Hauer (12 months)',
      'Course completion certificate',
    ],
    format: 'Video course + all templates + community + live Q&A',
    delivery: 'Instant portal access via email',
    target: 'Serious operators building institutional-grade property management businesses',
    stripe_price_id: null,
  },

  'os-license': {
    id: 'os-license',
    name: 'Coastal Key OS License',
    tagline: 'Our infrastructure, your brand.',
    price_cents: 19700,
    price_display: 'From $197/mo',
    type: 'subscription',
    tiers: [
      { name: 'Essentials', price_cents: 19700, price_display: '$197/mo', doors: 'Up to 25 doors' },
      { name: 'Professional', price_cents: 49700, price_display: '$497/mo', doors: 'Up to 75 doors' },
      { name: 'Enterprise', price_cents: 99700, price_display: '$997/mo', doors: 'Unlimited + white-label' },
    ],
    description: 'License the Coastal Key operating system for your own property management business. White-label inspection reports, AI-powered operations, client portal, and the full technology stack. Your brand. Our infrastructure.',
    includes: [
      'White-label inspection report generation',
      'AI-powered lead routing and qualification',
      'Client communication automation',
      'Owner portal (branded to your company)',
      'Vendor dispatch and compliance system',
      'Storm protocol activation engine',
      'Content calendar and social automation',
      'Monthly platform updates and new features',
      'Onboarding call with Coastal Key team',
      'Slack support channel',
    ],
    format: 'SaaS platform access',
    delivery: 'Onboarding call within 48 hours of purchase',
    target: 'Property management firms managing 20+ doors seeking AI-powered operations',
    stripe_price_id: null,
  },
};

export function handleProductCatalog() {
  const catalog = Object.values(PRODUCTS).map(p => ({
    id: p.id,
    name: p.name,
    tagline: p.tagline,
    price_display: p.price_display,
    type: p.type,
    target: p.target,
    includes_count: p.includes.length,
  }));

  return jsonResponse({
    suite: 'Coastal Key Digital Products',
    currency: 'USD',
    total_products: catalog.length,
    products: catalog,
    checkout_endpoint: 'POST /v1/products/:id/checkout',
  });
}

export function handleProductDetail(productId) {
  const product = PRODUCTS[productId];
  if (!product) return errorResponse(`Product "${productId}" not found.`, 404);
  return jsonResponse(product);
}

export async function handleProductCheckout(request, productId, env, ctx) {
  const product = PRODUCTS[productId];
  if (!product) return errorResponse(`Product "${productId}" not found.`, 404);

  let body;
  try { body = await request.json(); } catch { body = {}; }

  const email = body.email;
  if (!email) return errorResponse('"email" is required.', 400);

  const tier = body.tier || null;
  let priceCents = product.price_cents;
  let productName = product.name;

  if (product.type === 'subscription' && product.tiers && tier) {
    const selectedTier = product.tiers.find(t => t.name.toLowerCase() === tier.toLowerCase());
    if (selectedTier) {
      priceCents = selectedTier.price_cents;
      productName = `${product.name} — ${selectedTier.name}`;
    }
  }

  if (!env.STRIPE_SECRET || !env.STRIPE_SECRET.startsWith('sk_')) {
    writeAudit(env, ctx, {
      route: `/v1/products/${productId}/checkout`,
      action: 'checkout_attempted',
      product: productId,
      email,
      price_cents: priceCents,
      status: 'stripe_not_configured',
    });

    return jsonResponse({
      status: 'checkout_ready',
      product: productId,
      product_name: productName,
      price_cents: priceCents,
      price_display: `$${(priceCents / 100).toFixed(0)}`,
      email,
      message: 'Stripe checkout session will be created once STRIPE_SECRET is configured. Contact david@coastalkey-pm.com to complete purchase.',
      fallback_contact: {
        email: 'david@coastalkey-pm.com',
        phone: '(772) 210-3343',
      },
    });
  }

  try {
    const mode = product.type === 'subscription' ? 'subscription' : 'payment';
    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.STRIPE_SECRET}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        'mode': mode,
        'customer_email': email,
        'line_items[0][price_data][currency]': 'usd',
        'line_items[0][price_data][product_data][name]': productName,
        'line_items[0][price_data][unit_amount]': String(priceCents),
        ...(mode === 'subscription'
          ? { 'line_items[0][price_data][recurring][interval]': 'month' }
          : {}),
        'line_items[0][quantity]': '1',
        'success_url': 'https://coastalkey-pm.com/products/success?session_id={CHECKOUT_SESSION_ID}',
        'cancel_url': 'https://coastalkey-pm.com/products/cancel',
      }),
    });

    const session = await stripeRes.json();

    if (session.error) {
      return errorResponse(`Stripe error: ${session.error.message}`, 502);
    }

    writeAudit(env, ctx, {
      route: `/v1/products/${productId}/checkout`,
      action: 'checkout_created',
      product: productId,
      email,
      price_cents: priceCents,
      session_id: session.id,
    });

    return jsonResponse({
      status: 'checkout_created',
      checkout_url: session.url,
      session_id: session.id,
      product: productId,
      price_cents: priceCents,
    });
  } catch (err) {
    return errorResponse(`Checkout failed: ${err.message}`, 502);
  }
}

export function handlePurchaseLookup(email) {
  return jsonResponse({
    email,
    purchases: [],
    message: 'Purchase history will be populated once Stripe webhooks are configured.',
  });
}
