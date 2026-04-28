/**
 * Pricing tiers — 3-card classic layout (pricing-page skill).
 *
 *   Plan name      → audience-led ("Researcher" / "Operations" / "Global Node")
 *   Price          → simple, monthly anchored; "Custom" for sales-led tier
 *   Description    → 2 lines: who it's for + what it unlocks
 *   Features       → outcome bullets (what visibility/decision they get)
 *   CTA            → consistent verbs across tiers
 *
 * Wire to Stripe: set cta.stripePriceId from Dashboard → Product → Price ID.
 * Mode: 'subscription' (recurring) or 'payment' (one-time).
 * Fallback: cta.stripeLink (Payment Link URL).
 */

export const pricingIntro = {
  eyebrow: 'Pricing',
  heading: 'Start small. Upgrade when conditions get serious.',
  subheading:
    'Plans that scale from desk research to live, multi-region operations. Cancel anytime, no setup fees, secure Stripe checkout.',
};

export const pricingTiers = [
  {
    name: 'Researcher',
    price: '$0',
    period: '',
    desc: 'For analysts and academics doing trial observation. Free forever — see how the data feels before you commit.',
    features: [
      'Live conditions for 5 monitored regions',
      '24h history for trend checks and reports',
      'Hourly refresh with daily downloadable summaries',
      'Community Slack and weekly office hours',
      'Email export for one researcher',
    ],
    cta: { label: 'Start free', href: '#' },
    highlighted: false,
  },
  {
    name: 'Operations',
    price: '$499',
    period: '/mo',
    desc: 'For environmental and field-ops teams that need live decision support. Live coverage, predictive layers, and the API.',
    features: [
      'Unlimited regions worldwide with live drift mapping',
      '90 days of historical telemetry for incident review',
      '60-second refresh on monitored zones',
      'Real-time API with webhooks for your stack',
      'Priority support with 1-business-day SLA',
    ],
    cta: {
      label: 'Subscribe',
      stripePriceId: 'price_REPLACE_ME_OPS',
      stripeCheckoutMode: 'subscription',
      stripeLink: 'https://buy.stripe.com/test_REPLACE_ME_OPS',
    },
    highlighted: true,
    badge: 'Most teams pick this',
  },
  {
    name: 'Global Node',
    price: 'Custom',
    period: '',
    desc: 'For multinational programs running their own sensors. Bidirectional data, private modeling, dedicated capacity.',
    features: [
      'Bidirectional sensor syndication with your fleet',
      'Custom atmospheric models tuned to your regions',
      'Private deployment zones and data residency',
      'Dedicated infrastructure and named CSM',
      'Procurement-ready: SSO, audit logs, MSA',
    ],
    cta: { label: 'Talk to sales', href: 'mailto:sales@example.com' },
    highlighted: false,
  },
];

/**
 * Optional risk-reversal line to render under the pricing grid.
 * Pricing.jsx may render this; if not, it's a clean place for the next dev to plug it in.
 */
export const pricingRiskReversal = {
  text: 'Cancel anytime. No setup fees. Test with team data on Researcher before upgrading.',
};
