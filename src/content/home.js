/**
 * Home page content. Edit the words / images / Stripe links here to reskin
 * the home page for a new client.
 *
 * The home page is a vertical stack of SECTIONS. Each section has:
 *   - header:   plain section heading (eyebrow + h2 + paragraph)
 *   - grid:     Tailwind grid classes for the cards row (e.g. "grid-cols-1 md:grid-cols-2 xl:grid-cols-4")
 *   - cards:    array of ContentCard prop objects
 *
 * Card layouts:    text, bullets, numbered, image, pills, stat
 * Eyebrow / tone:  blue, emerald, amber, rose, purple, white
 * Heading sizes:   sm, md, lg, xl
 * Image positions: top, left, right, background, none
 * Card sizes:      sm (1 col), md (2 cols), lg (3 cols), full (full row)
 * fixedHeight:     CSS height string (e.g. '520px') — original operational row h-[520px]
 * minHeight:       optional min-height for module-style cards (e.g. '280px')
 * shellStyle:      'operational' (24px radius, p-8) | 'module' (22px radius, p-5)
 * imagePosition='background' automatically applies a dark scrim and white text.
 *
 * For Stripe checkout buttons, paste a Payment Link URL into cta.stripeLink.
 */

export const homeSections = [
  // ─────────────────────────────────────────────────────────────────────
  // 1. Operational Value — section header + 4-card grid (h-520px)
  //    Mirrors the "Operational Value" section in the original template.
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'features',
    header: {
      eyebrow: 'Why teams subscribe',
      eyebrowColor: 'blue',
      heading: 'Built for decisions that depend on cleaner signals',
      subheading:
        'When conditions change fast, lag costs you. GAQO turns live atmospheric data into earlier detection, sharper forecasts, and confident response planning — the outcomes your subscription pays for.',
      headingSize: 'lg',
      align: 'left',
      maxWidth: 'max-w-4xl',
    },
    grid: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6',
    cards: [
      {
        layout: 'text',
        eyebrow: 'Outcome 01',
        eyebrowColor: 'blue',
        heading: 'Earlier detection with clearer environmental signals',
        headingSize: 'sm',
        body: 'Detect meaningful air-quality shifts before regional conditions fully intensify, reducing lag between signal emergence and operational awareness.',
        tone: 'blue',
        fixedHeight: '520px',
        contentAlign: 'between',
      },
      {
        layout: 'text',
        eyebrow: 'Regional Visibility',
        eyebrowColor: 'emerald',
        heading: 'Sharper visibility across evolving exposure zones',
        headingSize: 'sm',
        body: 'Understand where atmospheric pressure is building, how it is spreading, and which monitored regions require closer attention.',
        image:
          'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/163e54e9-84b2-4fa6-a55b-81d745775469_3840w.webp?w=1200&q=85',
        imagePosition: 'background',
        imageAlt: 'Atmospheric operational visibility',
        tone: 'emerald',
        className: 'border-white/25',
        fixedHeight: '520px',
        contentAlign: 'between',
      },
      {
        layout: 'stat',
        eyebrow: 'Forecast Reliability',
        eyebrowColor: 'blue',
        heading: 'Operational confidence',
        headingSize: 'sm',
        value: '3.4',
        suffix: '×',
        label:
          'Broader regional visibility across layered atmospheric conditions and monitored shifts.',
        tone: 'blue',
        fixedHeight: '520px',
        contentAlign: 'between',
        cta: {
          label: 'View system impact',
          href: '#',
          className:
            'w-full justify-center !rounded-xl py-3.5 text-sm font-medium',
        },
      },
      {
        layout: 'bullets',
        eyebrow: 'Response Planning',
        eyebrowColor: 'white',
        heading: 'Move from isolated measurements to clearer response planning',
        headingSize: 'sm',
        image:
          'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c3eac46a-01b0-4bae-a362-638327533871_3840w.webp?w=1200&q=85',
        imagePosition: 'background',
        imageAlt: 'Response planning environmental scene',
        tone: 'blue',
        className: 'border-white/25',
        items: [
          'Earlier anomaly recognition',
          'Sharper regional prioritization',
          'Built for environmental intelligence teams',
        ],
        fixedHeight: '520px',
        contentAlign: 'between',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 2. Platform Capabilities — 4 small text cards in a single row
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'platform-capabilities',
    header: {
      eyebrow: 'Inside the platform',
      eyebrowColor: 'blue',
      heading: 'Everything included in your workspace',
      subheading:
        'From live telemetry to API access — pick the tier that matches how your team works. Upgrade when you need more regions or faster refresh.',
      headingSize: 'lg',
      align: 'left',
      maxWidth: 'max-w-4xl',
    },
    grid: 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6',
    cards: [
      {
        layout: 'text',
        shellStyle: 'module',
        eyebrow: 'Stream',
        eyebrowColor: 'blue',
        heading: 'Real-time Telemetry',
        headingSize: 'sm',
        body: 'Continuous streaming of atmospheric data from active global sensors, standardizing inputs instantly.',
        tone: 'blue',
        className: 'min-h-[280px] xl:min-h-[300px]',
      },
      {
        layout: 'text',
        shellStyle: 'module',
        eyebrow: 'Forecast',
        eyebrowColor: 'emerald',
        heading: 'Predictive Drift Mapping',
        headingSize: 'sm',
        body: 'Advanced models project pollutant movement across borders, offering clear short-range environmental foresight.',
        tone: 'emerald',
        className: 'min-h-[280px] xl:min-h-[300px]',
      },
      {
        layout: 'text',
        shellStyle: 'module',
        eyebrow: 'Geo',
        eyebrowColor: 'amber',
        heading: 'Geographic Isolation',
        headingSize: 'sm',
        body: 'Segment exposure analytics by precise regional coordinates to isolate anomalies effectively.',
        tone: 'amber',
        className: 'min-h-[280px] xl:min-h-[300px]',
      },
      {
        layout: 'text',
        shellStyle: 'module',
        eyebrow: 'Connect',
        eyebrowColor: 'purple',
        heading: 'API Integration',
        headingSize: 'sm',
        body: 'Connect our environmental observability layer directly into your existing operational dashboards.',
        tone: 'purple',
        className: 'min-h-[280px] xl:min-h-[300px]',
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────
  // 3. Final CTA — single full-width card
  // ─────────────────────────────────────────────────────────────────────
  {
    id: 'final-cta',
    header: null,
    grid: 'grid grid-cols-1',
    cards: [
      {
        layout: 'text',
        eyebrow: 'Platform Access',
        eyebrowColor: 'white',
        heading: 'Start with the plan that fits your team',
        subheading:
          'Subscribe in minutes through secure Stripe checkout. Prefer to try first? Start on the free Researcher tier, then upgrade when you need global coverage and APIs.',
        headingSize: 'xl',
        cta: {
          label: 'See plans & subscribe',
          href: '#pricing',
        },
      },
    ],
  },
];
