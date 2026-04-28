/**
 * Sales / clearance page content. Same shape as store products.
 * Set cta.stripeLink to a Stripe Payment Link to wire each item.
 */

export const salesIntro = {
  heading: 'Secret Sales',
  subheading: 'Exclusive clearance items and limited-time offers.',
  headingTone: 'rose',
};

export const salesProducts = [
  {
    layout: 'text',
    heading: 'Clearance Item 1',
    subheading: '$99.50  (was $199.00)',
    body: 'Limited stock — half off while supplies last.',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop&sig=1',
    imagePosition: 'top',
    size: 'sm',
    pills: [{ label: '-50%', color: 'rose' }],
    tone: 'rose',
    cta: { label: 'Add to cart', stripeLink: 'https://buy.stripe.com/test_REPLACE_ME_S1' },
  },
  {
    layout: 'text',
    heading: 'Clearance Item 2',
    subheading: '$99.50  (was $199.00)',
    body: 'Limited stock — half off while supplies last.',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop&sig=2',
    imagePosition: 'top',
    size: 'sm',
    tone: 'rose',
    cta: { label: 'Add to cart', stripeLink: 'https://buy.stripe.com/test_REPLACE_ME_S2' },
  },
  {
    layout: 'text',
    heading: 'Clearance Item 3',
    subheading: '$74.00  (was $148.00)',
    body: 'Discounted demo unit, fully tested.',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop&sig=3',
    imagePosition: 'top',
    size: 'sm',
    tone: 'rose',
    cta: { label: 'Add to cart', stripeLink: 'https://buy.stripe.com/test_REPLACE_ME_S3' },
  },
  {
    layout: 'text',
    heading: 'Clearance Item 4',
    subheading: '$49.00  (was $99.00)',
    body: 'Open-box accessory, like-new condition.',
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop&sig=4',
    imagePosition: 'top',
    size: 'sm',
    tone: 'rose',
    cta: { label: 'Add to cart', stripeLink: 'https://buy.stripe.com/test_REPLACE_ME_S4' },
  },
];
