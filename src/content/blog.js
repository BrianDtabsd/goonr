/**
 * Learn page (/learn) — sample articles. Replace with Your Brand guides.
 */

export const blogIntro = {
  heading: 'Learn',
  subheading:
    'Sample articles so the Learn page has structure. Replace titles and bodies, or hide the page in Studio → Pages.',
};

export const blogPosts = [
  {
    layout: 'text',
    eyebrow: 'Guide',
    eyebrowColor: 'blue',
    heading: 'Sample article: choosing a plan',
    headingSize: 'md',
    body: 'Explain how customers should pick a tier. Link them to pricing when ready.',
    image:
      'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop&sig=1',
    imagePosition: 'left',
    size: 'sm',
    cta: { label: 'View pricing →', href: '/#pricing', variant: 'empty' },
  },
  {
    layout: 'text',
    eyebrow: 'Checkout',
    eyebrowColor: 'emerald',
    heading: 'Sample article: how checkout works',
    headingSize: 'md',
    body: 'Reassure buyers that payment is handled securely by Stripe. Replace with your own FAQ-style article.',
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop&sig=2',
    imagePosition: 'left',
    size: 'sm',
    cta: { label: 'Go to checkout →', href: '/checkout', variant: 'empty' },
  },
  {
    layout: 'text',
    eyebrow: 'Workflow',
    eyebrowColor: 'amber',
    heading: 'Sample article: how it works',
    headingSize: 'md',
    body: 'Walk through your process in a few steps. Point readers at the methodology section.',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop&sig=3',
    imagePosition: 'left',
    size: 'sm',
    cta: { label: 'See how it works →', href: '/#methodology', variant: 'empty' },
  },
  {
    layout: 'text',
    eyebrow: 'Shop',
    eyebrowColor: 'purple',
    heading: 'Sample article: browse the shop',
    headingSize: 'md',
    body: 'Introduce products or add-ons. Link to the store page.',
    image:
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop&sig=4',
    imagePosition: 'left',
    size: 'sm',
    cta: { label: 'Browse the shop →', href: '/store', variant: 'empty' },
  },
];
