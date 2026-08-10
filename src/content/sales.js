/**
 * Sales / clearance page content. Same shape as store products.
 */

export const salesIntro = {
  heading: 'Sample sales',
  subheading: 'Limited-time sample offers — replace with your clearance or promo items.',
  headingTone: 'rose',
};

export const salesProducts = [
  {
    layout: 'text',
    heading: 'Sample Sale Item 1',
    subheading: '$49  (was $99)',
    body: 'Limited stock sample — replace with a real promo.',
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
    heading: 'Sample Sale Item 2',
    subheading: '$39  (was $79)',
    body: 'Limited stock sample — replace with a real promo.',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop&sig=2',
    imagePosition: 'top',
    size: 'sm',
    tone: 'rose',
    cta: { label: 'Add to cart', stripeLink: 'https://buy.stripe.com/test_REPLACE_ME_S2' },
  },
  {
    layout: 'text',
    heading: 'Sample Sale Item 3',
    subheading: '$29  (was $59)',
    body: 'Discounted sample unit — replace with your own.',
    image:
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop&sig=3',
    imagePosition: 'top',
    size: 'sm',
    tone: 'rose',
    cta: { label: 'Add to cart', stripeLink: 'https://buy.stripe.com/test_REPLACE_ME_S3' },
  },
  {
    layout: 'text',
    heading: 'Sample Sale Item 4',
    subheading: '$19  (was $39)',
    body: 'Open-box sample — replace with your own.',
    image:
      'https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=800&auto=format&fit=crop&sig=4',
    imagePosition: 'top',
    size: 'sm',
    tone: 'rose',
    cta: { label: 'Add to cart', stripeLink: 'https://buy.stripe.com/test_REPLACE_ME_S4' },
  },
];
