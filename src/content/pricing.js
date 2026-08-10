/**
 * Pricing tiers — 3-card classic layout.
 * Wire to Stripe: set cta.stripePriceId from Dashboard → Product → Price ID.
 */

export const pricingIntro = {
  eyebrow: 'Pricing',
  heading: 'Simple plans for Your Brand',
  subheading:
    'Replace plan names, prices, and features. Keep Stripe Price IDs blank until you create products in the Dashboard.',
};

export const pricingTiers = [
  {
    name: 'Starter',
    price: '$0',
    period: '',
    desc: 'For trying Your Brand risk-free. Replace with who this tier is for.',
    features: [
      'Sample feature A',
      'Sample feature B',
      'Sample feature C',
      'Community support',
      'Cancel anytime',
    ],
    cta: { label: 'Start free', href: '#' },
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '$49',
    period: '/mo',
    desc: 'For teams ready to buy. Replace with your mid-tier pitch.',
    features: [
      'Everything in Starter',
      'Sample premium feature',
      'Priority email support',
      'Higher usage limits',
      'Monthly billing via Stripe',
    ],
    cta: {
      label: 'Subscribe',
      stripePriceId: 'price_REPLACE_ME_GROWTH',
      stripeCheckoutMode: 'subscription',
      stripeLink: 'https://buy.stripe.com/test_REPLACE_ME_GROWTH',
    },
    highlighted: true,
    badge: 'Most popular',
  },
  {
    name: 'Business',
    price: 'Custom',
    period: '',
    desc: 'For larger rollouts. Replace with sales-led tier details.',
    features: [
      'Custom limits and onboarding',
      'Dedicated support contact',
      'Security / procurement extras',
      'Volume pricing',
      'Talk to sales to start',
    ],
    cta: { label: 'Talk to sales', href: 'mailto:sales@example.com' },
    highlighted: false,
  },
];

export const pricingRiskReversal = {
  text: 'Cancel anytime. No setup fees. Start on Starter before upgrading.',
};
