/**
 * Digital Products Suite — Consolidated Catalog
 *
 * Single source of truth: imports from cfo-revenue-engine.js
 * 13 products across 3 paid tiers + 6 lead magnets:
 *
 *   PAID:
 *     $47   — Home Watch Startup Kit
 *     $197  — AI Automation Playbook
 *     $197  — Inspection Report Template Pack (12 templates)
 *     $997  — AI Mastery Course (or $97/mo membership)
 *     $197/mo  — CK OS License Starter (25 doors)
 *     $497/mo  — CK OS License Professional (75 doors)
 *     $997/mo  — CK OS License Enterprise (unlimited + white-label)
 *
 *   FREE (lead magnets):
 *     Absentee Owner Risk Calculator
 *     Florida Property Owner Insurance Checklist
 *     Home Watch Operator Startup Guide
 *     Storm Season Preparation Blueprint
 *     AI Operations Case Study
 *     Vacancy Clause Survival Kit
 *
 * Routes:
 *   GET  /v1/products/catalog          — Full 13-product catalog
 *   GET  /v1/products/paid             — Paid products only (7)
 *   GET  /v1/products/lead-magnets     — Free lead magnets only (6)
 *   GET  /v1/products/:id              — Single product detail
 *   POST /v1/products/:id/checkout     — Create Stripe Checkout session
 *   GET  /v1/products/purchases/:email — List purchases for email
 */

import { DIGITAL_PRODUCTS, LEAD_MAGNETS } from '../engines/cfo-revenue-engine.js';
import { jsonResponse, errorResponse } from '../utils/response.js';
import { writeAudit } from '../utils/audit.js';

const PAID_PRODUCTS = {
  'home-watch-kit': {
    id: 'home-watch-kit',
    source_id: 'home_watch_kit',
    name: 'Home Watch Startup Kit',
    tagline: 'Launch a monitoring service in 30 days.',
    price_cents: 4700,
    price_display: '$47',
    type: 'one-time',
    tier: 'Entry',
    format: 'PDF bundle',
    target: 'Aspiring home watch entrepreneurs, property managers adding home watch services',
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
    delivery: 'Instant download via email',
    upsell: 'ai-playbook',
  },

  'ai-playbook': {
    id: 'ai-playbook',
    source_id: 'ai_playbook',
    name: 'AI Automation Playbook for Property Managers',
    tagline: 'The operational manual that took Coastal Key from zero to enterprise-grade in six months.',
    price_cents: 19700,
    price_display: '$197',
    type: 'one-time',
    tier: 'Mid-Market',
    format: 'PDF + video walkthrough',
    target: 'Existing home watch operators, property managers seeking AI automation',
    includes: [
      'AI-powered inspection workflows',
      'Client communication automation sequences',
      'Storm protocol trigger system',
      'Reporting dashboards',
      'SOPs for Airtable-Slack-Claude AI stack',
      'Lead routing workflow',
      'Vendor dispatch automation',
      'Report generation prompt library (20 prompts)',
      'Owner portal communication templates',
      'Video walkthrough of each workflow (90 min total)',
    ],
    delivery: 'Instant download + video portal access via email',
    upsell: 'mastery-course',
  },

  'inspection-templates': {
    id: 'inspection-templates',
    source_id: 'inspection_templates',
    name: 'Inspection Report Template Pack',
    tagline: '12 institutional-grade inspection reports your insurer will accept.',
    price_cents: 19700,
    price_display: '$197',
    type: 'one-time',
    tier: 'Mid-Market',
    format: '12 DOCX + PDF templates',
    target: 'Independent home watch operators',
    includes: [
      '12 branded institutional-grade inspection report templates',
      'Photo placeholders with metadata fields',
      'Risk scoring matrices',
      'Insurer-ready documentation formatting',
      'Humidity and HVAC verification sections',
      'Exterior perimeter checklist',
      'Interior climate checklist',
      'Plumbing and electrical checklist',
      'Pool and lanai checklist',
      'Vendor access log template',
      'Storm pre/post assessment template',
      '47-point Sentinel Standard checklist (full version)',
    ],
    delivery: 'Instant download via email',
    upsell: 'ai-playbook',
  },

  'mastery-course': {
    id: 'mastery-course',
    source_id: 'mastery_course',
    name: 'AI-Powered Property Management Mastery Course',
    tagline: 'Build the entire enterprise system.',
    price_cents: 99700,
    price_display: '$997',
    price_monthly: 9700,
    price_monthly_display: '$97/mo',
    type: 'one-time',
    tier: 'Premium',
    format: '12-module video course + all templates + community',
    target: 'Serious operators building institutional-grade property management businesses',
    includes: [
      'Everything in Home Watch Startup Kit ($47 value)',
      'Everything in AI Automation Playbook ($197 value)',
      'Everything in Inspection Template Pack ($197 value)',
      '12-module video course (8+ hours)',
      'Module 1: AI infrastructure setup (Airtable, Cloudflare, Slack)',
      'Module 2: Airtable as operational backbone',
      'Module 3: Automated client workflows',
      'Module 4: Storm protocol design',
      'Module 5: Investor reporting systems',
      'Module 6: Content automation engine',
      'Module 7: SaaS positioning strategy',
      'Module 8: Lead generation — outbound and inbound',
      'Module 9: Sales automation — speed-to-lead, qualification',
      'Module 10: Vendor management and compliance',
      'Module 11: Financial operations — pricing, billing, EBITDA',
      'Module 12: Scaling from 10 to 100 doors',
      'Private community access (Mighty Networks)',
      'Monthly live Q&A with David Hauer (12 months)',
      'Course completion certificate',
    ],
    delivery: 'Instant portal access via email',
    upsell: 'ck-os-starter',
  },

  'ck-os-starter': {
    id: 'ck-os-starter',
    source_id: 'ck_os_license',
    name: 'Coastal Key OS License — Starter',
    tagline: 'Our infrastructure, your brand. Up to 25 doors.',
    price_cents: 19700,
    price_display: '$197/mo',
    type: 'subscription',
    tier: 'SaaS',
    format: 'Platform access',
    target: 'Property management firms managing 10-25 doors',
    doors: 'Up to 25',
    includes: [
      'AI-powered inspection workflow engine',
      'Automated client communication',
      'Storm protocol activation',
      'Investor-grade reporting dashboard',
      'Content calendar automation',
      'Lead routing',
      'Monthly platform updates',
      'Onboarding call with Coastal Key team',
      'Slack support channel',
    ],
    delivery: 'Onboarding call within 48 hours',
    upsell: 'ck-os-professional',
  },

  'ck-os-professional': {
    id: 'ck-os-professional',
    source_id: 'ck_os_license',
    name: 'Coastal Key OS License — Professional',
    tagline: 'Scale operations without scaling headcount. Up to 75 doors.',
    price_cents: 49700,
    price_display: '$497/mo',
    type: 'subscription',
    tier: 'SaaS',
    format: 'Platform access',
    target: 'Property management firms managing 25-75 doors',
    doors: 'Up to 75',
    includes: [
      'Everything in Starter',
      'Multi-property dashboard',
      'Advanced vendor dispatch and compliance',
      'Custom report branding',
      'Priority support',
      'Quarterly strategy call',
    ],
    delivery: 'Onboarding call within 48 hours',
    upsell: 'ck-os-enterprise',
  },

  'ck-os-enterprise': {
    id: 'ck-os-enterprise',
    source_id: 'ck_os_license',
    name: 'Coastal Key OS License — Enterprise',
    tagline: 'Full white-label. Unlimited doors. Your brand, our engine.',
    price_cents: 99700,
    price_display: '$997/mo',
    type: 'subscription',
    tier: 'SaaS',
    format: 'White-label platform access',
    target: 'Property management firms managing 75+ doors, franchise operators',
    doors: 'Unlimited',
    white_label: true,
    includes: [
      'Everything in Professional',
      'Full white-label branding',
      'Unlimited doors',
      'Custom domain support',
      'API access',
      'Dedicated account manager',
      'Monthly strategy sessions',
    ],
    delivery: 'Onboarding call within 48 hours',
  },
};

const FREE_LEAD_MAGNETS = {
  'risk-calculator': {
    id: 'risk-calculator',
    name: 'Absentee Owner Risk Calculator',
    tagline: 'Know your number before the damage does.',
    price_cents: 0,
    price_display: 'Free',
    type: 'lead-magnet',
    format: 'Interactive web tool',
    inputs: ['property value', 'months unoccupied', 'oversight level'],
    output: 'Estimated annual risk exposure in dollars',
    gate: 'Email capture for full risk report PDF',
    conversion_path: 'Risk report → email sequence → complimentary inspection booking',
    url: '/risk-calculator',
  },

  'insurance-checklist': {
    id: 'insurance-checklist',
    name: 'Florida Property Owner Insurance Checklist',
    tagline: '7 documentation requirements Florida insurers demand for claim approval.',
    price_cents: 0,
    price_display: 'Free',
    type: 'lead-magnet',
    format: 'PDF',
    conversion_path: 'Email sequence → consultation booking',
  },

  'startup-guide': {
    id: 'startup-guide',
    name: 'Home Watch Operator Startup Guide',
    tagline: 'Licensing, insurance, pricing, inspection protocols.',
    price_cents: 0,
    price_display: 'Free',
    type: 'lead-magnet',
    format: 'PDF',
    target: 'Aspiring home watch company owners',
    conversion_path: 'Email sequence → AI Playbook ($197) → Mastery Course ($997)',
  },

  'storm-blueprint': {
    id: 'storm-blueprint',
    name: 'Storm Season Preparation Blueprint',
    tagline: 'Pre-storm, during-storm, post-storm property protection protocols.',
    price_cents: 0,
    price_display: 'Free',
    type: 'lead-magnet',
    format: 'PDF',
    release_window: 'April/May for seasonal relevance',
    conversion_path: 'Email sequence → pre-storm service booking ($295/event)',
  },

  'ai-case-study': {
    id: 'ai-case-study',
    name: 'AI Operations Case Study',
    tagline: 'How we built enterprise AI operations in 6 months.',
    price_cents: 0,
    price_display: 'Free',
    type: 'lead-magnet',
    format: 'PDF',
    target: 'PM operators and tech-forward investors',
    conversion_path: 'Email sequence → consulting ($15,000) or SaaS licensing ($497/mo)',
  },

  'vacancy-kit': {
    id: 'vacancy-kit',
    name: 'Florida Vacancy Clause Survival Kit',
    tagline: 'The 5-minute audit that could save you $23,000.',
    price_cents: 0,
    price_display: 'Free',
    type: 'lead-magnet',
    format: '12-page PDF + 3 fillable templates',
    url: '/vacancy-kit',
    conversion_path: 'Email sequence → complimentary inspection → Standard Watch contract',
  },
};

const ALL_PRODUCTS = { ...PAID_PRODUCTS, ...FREE_LEAD_MAGNETS };

// ── GET /v1/products/catalog ────────────────────────────────────────

export function handleProductCatalog() {
  const paid = Object.values(PAID_PRODUCTS).map(p => ({
    id: p.id, name: p.name, tagline: p.tagline,
    price_display: p.price_display, type: p.type, tier: p.tier,
    includes_count: p.includes?.length || 0,
  }));

  const free = Object.values(FREE_LEAD_MAGNETS).map(p => ({
    id: p.id, name: p.name, tagline: p.tagline,
    price_display: 'Free', type: 'lead-magnet', format: p.format,
  }));

  return jsonResponse({
    suite: 'Coastal Key Digital Products',
    source: 'CFO Revenue Platform — 10-channel architecture',
    currency: 'USD',
    summary: {
      total_products: Object.keys(ALL_PRODUCTS).length,
      paid_products: paid.length,
      lead_magnets: free.length,
      price_range: '$47 — $997 one-time | $197 — $997/mo SaaS',
    },
    paid_products: paid,
    lead_magnets: free,
    endpoints: {
      catalog: 'GET /v1/products/catalog',
      paid_only: 'GET /v1/products/paid',
      lead_magnets: 'GET /v1/products/lead-magnets',
      detail: 'GET /v1/products/:id',
      checkout: 'POST /v1/products/:id/checkout',
      purchases: 'GET /v1/products/purchases/:email',
    },
    contact: { email: 'david@coastalkey-pm.com', phone: '(772) 210-3343' },
  });
}

// ── GET /v1/products/paid ───────────────────────────────────────────

export function handlePaidProducts() {
  return jsonResponse({
    count: Object.keys(PAID_PRODUCTS).length,
    products: Object.values(PAID_PRODUCTS),
  });
}

// ── GET /v1/products/lead-magnets ───────────────────────────────────

export function handleLeadMagnets() {
  return jsonResponse({
    count: Object.keys(FREE_LEAD_MAGNETS).length,
    lead_magnets: Object.values(FREE_LEAD_MAGNETS),
  });
}

// ── GET /v1/products/:id ────────────────────────────────────────────

export function handleProductDetail(productId) {
  const product = ALL_PRODUCTS[productId];
  if (!product) return errorResponse(`Product "${productId}" not found. Use GET /v1/products/catalog to see available products.`, 404);
  return jsonResponse(product);
}

// ── POST /v1/products/:id/checkout ──────────────────────────────────

export async function handleProductCheckout(request, productId, env, ctx) {
  const product = PAID_PRODUCTS[productId];
  if (!product) {
    if (FREE_LEAD_MAGNETS[productId]) {
      return errorResponse(`"${productId}" is a free lead magnet. No checkout required. Direct users to the download URL.`, 400);
    }
    return errorResponse(`Product "${productId}" not found.`, 404);
  }

  let body;
  try { body = await request.json(); } catch { body = {}; }

  const email = body.email;
  if (!email) return errorResponse('"email" is required.', 400);

  let priceCents = product.price_cents;
  let productName = product.name;

  if (body.monthly && product.price_monthly) {
    priceCents = product.price_monthly;
    productName = `${product.name} — Monthly`;
  }

  const stripeKey = env.STRIPE_SECRET_KEY || env.STRIPE_SECRET;
  if (!stripeKey || !stripeKey.startsWith('sk_')) {
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
      price_display: priceCents >= 100 ? `$${(priceCents / 100).toFixed(0)}` : `$${(priceCents / 100).toFixed(2)}`,
      email,
      message: 'Contact david@coastalkey-pm.com or call (772) 210-3343 to complete purchase.',
      fallback_contact: { email: 'david@coastalkey-pm.com', phone: '(772) 210-3343' },
    });
  }

  try {
    const mode = product.type === 'subscription' ? 'subscription' : 'payment';
    const params = {
      'mode': mode,
      'customer_email': email,
      'line_items[0][price_data][currency]': 'usd',
      'line_items[0][price_data][product_data][name]': productName,
      'line_items[0][price_data][unit_amount]': String(priceCents),
      'line_items[0][quantity]': '1',
      'success_url': 'https://coastalkey-pm.com/products/success?session_id={CHECKOUT_SESSION_ID}',
      'cancel_url': 'https://coastalkey-pm.com/products/cancel',
      'metadata[productId]': productId,
      'metadata[productName]': productName,
      'metadata[source]': 'coastal-key-digital-products',
    };

    if (mode === 'subscription') {
      params['line_items[0][price_data][recurring][interval]'] = 'month';
    }

    const stripeRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(params),
    });

    const session = await stripeRes.json();
    if (session.error) return errorResponse(`Stripe error: ${session.error.message}`, 502);

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

// ── GET /v1/products/purchases/:email ───────────────────────────────

export function handlePurchaseLookup(email) {
  return jsonResponse({
    email,
    purchases: [],
    message: 'Purchase history will be populated once Stripe webhooks are configured.',
  });
}
