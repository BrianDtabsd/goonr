/**
 * System Logic section — intro + step cards. Defaults; overridable via Settings → Site copy.
 */

export const systemLogicIntro = {
  eyebrow: 'System Logic',
  headingLine1: 'From distributed sensing to',
  headingLine2: 'environmental clarity',
  subheading:
    'The observatory transforms fragmented atmospheric inputs into a unified operational view that can be monitored, interpreted, and acted on.',
  exploreCtaLabel: 'Explore methodology',
  exploreCtaHref: '#access',
};

export const systemLogicSteps = [
  {
    title: 'Collect',
    description:
      'Aggregate live environmental streams from sensor networks, satellite layers, and regional measurements to establish a unified observational input layer.',
    image:
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/e3160dde-0640-4209-ba49-2fdd186ab7aa_1600w.jpg',
  },
  {
    title: 'Normalize',
    description:
      'Standardize signal quality across sources, calibrate inconsistencies, and align measurements into a coherent atmospheric model that can be trusted across regions.',
    image:
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/ad49c60a-ac88-46a9-803d-231a2d478e0c_1600w.jpg',
  },
  {
    title: 'Interpret',
    description:
      'Detect pollutant build-up, drift anomalies, and emerging exposure shifts across monitored zones.',
    image:
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/ea63cda8-7a78-412b-a258-e0190a2d2f29_1600w.jpg',
  },
  {
    title: 'Forecast',
    description:
      'Project likely movement, density change, and short-range environmental shifts across time and geography to support clearer response planning.',
    image:
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/f6611eb5-6c22-42ad-ad4c-1afd7eaeb616_1600w.jpg',
  },
];
