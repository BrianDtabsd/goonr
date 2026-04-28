/**
 * FAQ — objection handling before the final pricing push.
 * Edit questions/answers here for each client template.
 */

export const faqIntro = {
  eyebrow: 'Questions',
  heading: 'Before you subscribe',
  subheading:
    'Straight answers about plans, billing, and what you get — so you can choose with confidence.',
};

export const faqItems = [
  {
    q: 'How do I actually pay for a plan?',
    a: 'Choose a tier on this site and complete checkout on Stripe’s secure page (card or other methods Stripe supports). No card data touches our servers.',
  },
  {
    q: 'Is there a free way to try it?',
    a: 'Yes — the Researcher tier is built for trial use: limited regions and history so you can validate the workflow before upgrading.',
  },
  {
    q: 'What happens if I need to cancel?',
    a: 'Paid plans are month-to-month unless you agree otherwise with sales. Cancel in the billing portal Stripe emails you — access lasts through the period you already paid for.',
  },
  {
    q: 'What do I get on day one after subscribing?',
    a: 'Dashboard access at your tier’s limits: live telemetry refresh, regional coverage, and API access where included. Enterprise tiers may include onboarding — we’ll confirm in checkout notes.',
  },
  {
    q: 'Do you store our atmospheric data?',
    a: 'We process streams for the observatory layer; retention and regions depend on your plan and any enterprise agreement. Ask sales if you need a specific compliance profile.',
  },
  {
    q: 'Can my team share one account?',
    a: 'Professional and Global Node tiers are meant for operational teams. Seat policies are defined per plan — see feature bullets above or contact us for multi-seat pricing.',
  },
];
