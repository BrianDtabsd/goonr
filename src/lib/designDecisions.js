/**
 * DocuMind CMS — design specs for agents.
 *
 * Plain named sections only. NO coded IDs (DF-xxx, DC-xxx, DM-xxx, etc.).
 * Your data field registry is a separate system — never mix with design.
 *
 * @see DESIGN_DECISIONS.md
 */

import { getCaseAppMeta } from '../config/caseAppMeta';

export const decisionRecord = {
  product: 'DocuMind cms',
  version: '1.1.0',
  note: 'Design specs only — not part of the data field registry',
};

export const decisions = {
  brand: {
    name: getCaseAppMeta().brandName,
    breadcrumbPrefix: getCaseAppMeta().breadcrumbPrefix,
  },

  themes: {
    workplace: {
      class: 'ds-theme-workplace',
      useFor: ['dashboard', 'decision center', 'analysis forms', 'case lists'],
    },
    casefile: {
      class: 'ds-theme-casefile',
      useFor: ['case detail', 'document hub', 'GRTW view'],
    },
  },

  brandColors: {
    ink: '#1B1B1B',
    slate: '#434A53',
    ember: '#FF5722',
    emberHover: '#E64A19',
    mist: '#EEEEEE',
  },

  calmAccents: {
    sage: '#78BDA7',
    ice: '#C8E6EA',
    gold: '#E8DFA8',
    sand: '#C4A574',
    clay: '#C4886A',
    casefilePage: '#0D0D0D',
  },

  forbidden: {
    colors: ['corporate blue', 'bright red', 'neon green', 'purple gradients'],
    fonts: ['JetBrains Mono', 'font-mono in ds/ or caseapp/'],
    codedIds: ['DF-xxx', 'DC-xxx', 'DM-xxx', 'any XX-### pattern in design files'],
    brands: ['GAQO', 'caselogic', 'any name not in caseAppMeta.js'],
  },

  typography: {
    fontFamily: 'Inter',
    bodySize: '16px',
    bodyLineHeight: 1.65,
    rules: [
      'One H1 per view',
      'Max 3 heading levels per card',
      'Labels: Inter uppercase — not monospace',
      'tabular-nums for stats and IDs',
    ],
  },

  spacing: {
    touchTargetMin: '44px',
    cardPadding: '24px',
    sidebarWidth: '240px',
  },

  motion: {
    allowed: ['hover lift', 'press scale', 'fade-in'],
    forbidden: ['flash', 'infinite pulse on non-status elements'],
    respectReducedMotion: true,
  },
};

export const components = {
  appShell: { component: 'DSAppShell', themes: ['workplace', 'casefile'] },
  sidebar: { component: 'DSSidebar', width: '240px' },
  button: { component: 'DSButton', accentMaxPerView: 1 },
  card: { component: 'DSCard' },
  statCard: { component: 'DSStatCard' },
  pageHeader: { component: 'DSPageHeader' },
  caseHeader: {
    component: 'DSCaseHeader',
    tabs: ['Gather', 'Analysis', 'Resolution', 'GRTW', 'Tasks', 'Files'],
  },
  input: { components: ['DSInput', 'DSTextarea'] },
  tabs: { component: 'DSTabs' },
  badge: { component: 'DSBadge' },
  advisor: { component: 'DSAdvisorPanel' },
};

export const domainDecisions = {
  caseStatus: {
    open: { accent: 'ice', label: 'Open' },
    in_progress: { accent: 'sand', label: 'In Progress' },
    pending_review: { accent: 'stone', label: 'Pending Review' },
    resolved: { accent: 'sage', label: 'Resolved' },
    closed: { accent: 'stone', label: 'Closed' },
    escalated: { accent: 'sand', label: 'Escalated' },
  },
  priority: {
    low: 'stone',
    medium: 'ice',
    high: 'sand',
    critical: 'sand',
  },
};

export function isForbiddenStyle(value) {
  if (!value || typeof value !== 'string') return false;
  const checks = [
    /font-mono/i,
    /jetbrains/i,
    /#3b82f6|#2563eb|blue-5/i,
    /#ef4444|red-5/i,
    /purple-|from-purple/i,
    /caselogic|gaqo/i,
    /\bD[FMC]-\d{2,3}\b/i,
    /\b[A-Z]{2}-\d{3}\b/,
  ];
  return checks.some((re) => re.test(value));
}
