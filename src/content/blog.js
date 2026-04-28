/**
 * Learn page (/learn) — education + trust; every card should push toward #pricing or checkout.
 */

export const blogIntro = {
  heading: 'Learn',
  subheading:
    'Short articles on how the observatory works. When you are ready, pick a plan and complete secure checkout with Stripe.',
};

export const blogPosts = [
  {
    layout: 'text',
    eyebrow: 'Guide',
    eyebrowColor: 'blue',
    heading: 'What you get on each subscription tier',
    headingSize: 'md',
    body: 'Researcher, Professional, and Global Node differ by regions, history depth, API access, and support. Compare the feature list on the homepage, then subscribe from Pricing or Checkout.',
    image:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop&sig=1',
    imagePosition: 'left',
    size: 'sm',
    cta: { label: 'View pricing →', href: '/#pricing', variant: 'empty' },
  },
  {
    layout: 'text',
    eyebrow: 'Security',
    eyebrowColor: 'emerald',
    heading: 'How Stripe checkout protects your payment',
    headingSize: 'md',
    body: 'We use Stripe Payment Links for subscriptions. Your card details are entered on Stripe’s hosted page — we never store them. You receive receipts and a billing portal link from Stripe.',
    image:
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800&auto=format&fit=crop&sig=2',
    imagePosition: 'left',
    size: 'sm',
    cta: { label: 'Go to checkout hub →', href: '/checkout', variant: 'empty' },
  },
  {
    layout: 'text',
    eyebrow: 'Workflow',
    eyebrowColor: 'amber',
    heading: 'From raw signals to a decision in four steps',
    headingSize: 'md',
    body: 'Collect → Normalize → Interpret → Forecast. That pipeline is how the dashboard turns noisy sensor data into something your leads can brief executives on.',
    image:
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop&sig=3',
    imagePosition: 'left',
    size: 'sm',
    cta: { label: 'See how it works →', href: '/#methodology', variant: 'empty' },
  },
  {
    layout: 'text',
    eyebrow: 'Hardware',
    eyebrowColor: 'purple',
    heading: 'Optional add-ons from the shop',
    headingSize: 'md',
    body: 'Sensors and kits in the Store are separate from your subscription. Add them to the cart when you need physical gear; subscriptions stay on Stripe.',
    image:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=800&auto=format&fit=crop&sig=4',
    imagePosition: 'left',
    size: 'sm',
    cta: { label: 'Browse the shop →', href: '/store', variant: 'empty' },
  },
];
