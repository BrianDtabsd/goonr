/**
 * Home page content. Edit the words / images / Stripe links here to reskin
 * the home page for a new client.
 *
 * The home page is a vertical stack of SECTIONS. Each section has:
 *   - header:   plain section heading (eyebrow + h2 + paragraph)
 *   - grid:     Tailwind grid classes for the cards row
 *   - cards:    array of ContentCard prop objects
 *
 * For Stripe checkout buttons, paste a Payment Link URL into cta.stripeLink.
 */

export const homeSections = [
  {
    id: 'features',
    header: {
      eyebrow: 'Why customers choose you',
      eyebrowColor: 'blue',
      heading: 'Your value proposition goes here',
      subheading:
        'Replace this paragraph with the outcomes Your Brand delivers. Keep it concrete — what changes for the customer after they buy or subscribe?',
      headingSize: 'lg',
      align: 'left',
      maxWidth: 'max-w-4xl',
    },
    grid: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6',
    cards: [
      {
        layout: 'text',
        eyebrow: 'Benefit 01',
        eyebrowColor: 'blue',
        heading: 'Sample benefit headline',
        headingSize: 'sm',
        body: 'One short paragraph describing a customer outcome. Replace with your own benefit copy.',
        tone: 'blue',
        fixedHeight: '520px',
        contentAlign: 'between',
      },
      {
        layout: 'text',
        eyebrow: 'Benefit 02',
        eyebrowColor: 'emerald',
        heading: 'Another sample benefit',
        headingSize: 'sm',
        body: 'Swap the background image and rewrite this body for your product or service.',
        image:
          'https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop',
        imagePosition: 'background',
        imageAlt: 'Sample product atmosphere',
        tone: 'emerald',
        className: 'border-white/25',
        fixedHeight: '520px',
        contentAlign: 'between',
      },
      {
        layout: 'stat',
        eyebrow: 'Proof point',
        eyebrowColor: 'blue',
        heading: 'Sample metric',
        headingSize: 'sm',
        value: '2.5',
        suffix: '×',
        label: 'Replace with a real metric customers care about.',
        tone: 'blue',
        fixedHeight: '520px',
        contentAlign: 'between',
        cta: {
          label: 'Learn more',
          href: '#methodology',
          className:
            'w-full justify-center !rounded-xl py-3.5 text-sm font-medium',
        },
      },
      {
        layout: 'bullets',
        eyebrow: 'Included',
        eyebrowColor: 'white',
        heading: 'What they get',
        headingSize: 'sm',
        image:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
        imagePosition: 'background',
        imageAlt: 'Sample workspace scene',
        tone: 'blue',
        className: 'border-white/25',
        items: [
          'Sample bullet one',
          'Sample bullet two',
          'Sample bullet three',
        ],
        fixedHeight: '520px',
        contentAlign: 'between',
      },
    ],
  },

  {
    id: 'platform-capabilities',
    header: {
      eyebrow: 'Features',
      eyebrowColor: 'blue',
      heading: 'Everything in your offer',
      subheading:
        'Four feature cards — rename headings and bodies to match Your Brand. Hide this section in Studio → Pages if you do not need it.',
      headingSize: 'lg',
      align: 'left',
      maxWidth: 'max-w-4xl',
    },
    grid: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6',
    cards: [
      {
        layout: 'text',
        shellStyle: 'module',
        eyebrow: 'Feature',
        eyebrowColor: 'blue',
        heading: 'Sample feature one',
        headingSize: 'sm',
        body: 'Short feature description. Replace with your own.',
        tone: 'blue',
        className: 'min-h-[280px] xl:min-h-[300px]',
      },
      {
        layout: 'text',
        shellStyle: 'module',
        eyebrow: 'Feature',
        eyebrowColor: 'emerald',
        heading: 'Sample feature two',
        headingSize: 'sm',
        body: 'Short feature description. Replace with your own.',
        tone: 'emerald',
        className: 'min-h-[280px] xl:min-h-[300px]',
      },
      {
        layout: 'text',
        shellStyle: 'module',
        eyebrow: 'Feature',
        eyebrowColor: 'amber',
        heading: 'Sample feature three',
        headingSize: 'sm',
        body: 'Short feature description. Replace with your own.',
        tone: 'amber',
        className: 'min-h-[280px] xl:min-h-[300px]',
      },
      {
        layout: 'text',
        shellStyle: 'module',
        eyebrow: 'Feature',
        eyebrowColor: 'purple',
        heading: 'Sample feature four',
        headingSize: 'sm',
        body: 'Short feature description. Replace with your own.',
        tone: 'purple',
        className: 'min-h-[280px] xl:min-h-[300px]',
      },
    ],
  },

  {
    id: 'final-cta',
    header: null,
    grid: 'grid grid-cols-1',
    cards: [
      {
        layout: 'text',
        eyebrow: 'Get started',
        eyebrowColor: 'white',
        heading: 'Ready when you are',
        subheading:
          'Point this CTA at pricing or checkout. Replace the label and href for Your Brand.',
        headingSize: 'xl',
        cta: {
          label: 'See plans',
          href: '#pricing',
        },
      },
    ],
  },
];
