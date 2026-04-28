/**
 * Shop page copy — landing-page skill: outcome-led headings, specific bullets, one CTA verb.
 *
 * Wire each item to Stripe:
 *   - Recurring/license items → set cta.stripePriceId + stripeCheckoutMode: 'subscription'
 *   - One-time hardware       → set cta.stripePriceId + stripeCheckoutMode: 'payment'
 *   - Or paste a Stripe Payment Link into cta.stripeLink as a fallback
 */

export const storeIntro = {
  heading: 'Field hardware that pairs with your subscription',
  subheading:
    'Sensors, mounts, and licenses for teams running live monitoring in the real world. Every item ships pre-paired to your account and works out of the box with the live API.',
};

export const storeProducts = [
  {
    layout: 'text',
    heading: 'Sensor Module Alpha',
    subheading: '$99',
    body:
      'Drop-in air-quality module for teams expanding into a new zone — calibrated, paired, and streaming within ten minutes of unboxing.',
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop',
    imagePosition: 'top',
    size: 'sm',
    cta: {
      label: 'Buy module',
      stripeLink: 'https://buy.stripe.com/test_REPLACE_ME_1',
    },
  },
  {
    layout: 'text',
    heading: 'Drift Tracker Pro',
    subheading: '$149',
    body:
      'Pocket-sized tracker for incident response. Visualize plume direction in the field; sync events back to your live dashboard automatically.',
    image:
      'https://images.unsplash.com/photo-1581091012184-7e0cdfbb6797?q=80&w=800&auto=format&fit=crop',
    imagePosition: 'top',
    size: 'sm',
    cta: {
      label: 'Buy tracker',
      stripeLink: 'https://buy.stripe.com/test_REPLACE_ME_2',
    },
  },
  {
    layout: 'text',
    heading: 'Regional Console',
    subheading: '$249',
    body:
      'Glanceable wall display for ops rooms. Five regions, live conditions, alert states — designed to be readable from across the room.',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    imagePosition: 'top',
    size: 'sm',
    cta: {
      label: 'Buy console',
      stripeLink: 'https://buy.stripe.com/test_REPLACE_ME_3',
    },
  },
  {
    layout: 'text',
    heading: 'Calibration Kit',
    subheading: '$59',
    body:
      'Reference standards and verification samples to keep your fleet within drift tolerance. Recommended once per quarter.',
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
    imagePosition: 'top',
    size: 'sm',
    cta: {
      label: 'Buy kit',
      stripeLink: 'https://buy.stripe.com/test_REPLACE_ME_4',
    },
  },
  {
    layout: 'text',
    heading: 'API Access — Annual',
    subheading: '$499 / yr',
    body:
      'Twelve months of telemetry + forecast endpoints for one application. Includes webhooks, dashboards, and 99.9% uptime SLA.',
    image:
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=800&auto=format&fit=crop',
    imagePosition: 'top',
    size: 'sm',
    cta: {
      label: 'Buy license',
      stripeLink: 'https://buy.stripe.com/test_REPLACE_ME_5',
    },
  },
  {
    layout: 'text',
    heading: 'Field Mount Bracket',
    subheading: '$29',
    body:
      'Marine-grade aluminum mount for outdoor sensors. Stainless hardware included — survives hose-down cleaning and freeze-thaw cycles.',
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop',
    imagePosition: 'top',
    size: 'sm',
    cta: {
      label: 'Buy bracket',
      stripeLink: 'https://buy.stripe.com/test_REPLACE_ME_6',
    },
  },
];
