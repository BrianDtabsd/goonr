/**
 * DocuMind CMS — AUTHORITATIVE design decisions.
 *
 * Owner decisions only. Agents MUST implement this file + DESIGN_DECISIONS.md.
 * If a property is not defined here → stop and ask the owner. Do not guess.
 *
 * @see DESIGN_DECISIONS.md (human-readable full spec)
 */

import { getCaseAppMeta } from '../config/caseAppMeta';

export const decisionRecord = {
  meta: {
    product: 'DocuMind cms',
    version: '1.0.0',
    owner: 'Product owner',
    status: 'authoritative',
    updated: '2026-06-11',
  },

  /** Trace every choice to a decision ID in DESIGN_DECISIONS.md */
  ids: {
    brand: 'DM-001',
    themes: 'DM-002',
    brandColors: 'DM-003',
    calmPalette: 'DM-004',
    forbidden: 'DM-005',
    typography: 'DM-006',
    spacing: 'DM-007',
    radius: 'DM-008',
    shadow: 'DM-009',
    motion: 'DM-010',
    icons: 'DM-011',
    domainColors: 'DM-012',
  },
};

// ---------------------------------------------------------------------------
// FOUNDATION — your explicit decisions
// ---------------------------------------------------------------------------

export const decisions = {
  brand: {
    id: 'DM-001',
    name: getCaseAppMeta().brandName,
    breadcrumbPrefix: getCaseAppMeta().breadcrumbPrefix,
    source: 'Owner specified: DocuMind cms',
  },

  themes: {
    id: 'DM-002',
    workplace: {
      name: 'Workplace Light',
      class: 'ds-theme-workplace',
      useFor: ['dashboard', 'decision center', 'analysis forms', 'case lists', 'navigation shell'],
      reference: 'Owner workplace UI screenshots (light, cream/grey, rounded cards)',
    },
    casefile: {
      name: 'Case File Dark Glass',
      class: 'ds-theme-casefile',
      useFor: ['case detail', 'document hub', 'dense info panels', 'GRTW view'],
      reference: 'Owner case file glass screenshots (dark, ice glow, pale gold CTA)',
    },
  },

  brandColors: {
    id: 'DM-003',
    source: 'Owner provided CSS variables',
    tokens: {
      ink: { hex: '#1B1B1B', cssVar: '--color-1', use: 'Primary text, charcoal buttons' },
      slate: { hex: '#434A53', cssVar: '--color-2', use: 'Secondary text, borders, labels' },
      ember: { hex: '#FF5722', cssVar: '--color-3', use: 'Accent CTA — one per view max' },
      mist: { hex: '#EEEEEE', cssVar: '--color-4', use: 'Workplace page background' },
    },
    emberHover: '#E64A19',
  },

  calmAccents: {
    id: 'DM-004',
    source: 'Owner: calm palette, ADHD/anxiety-safe; globe + case file refs',
    sage: { hex: '#78BDA7', use: 'Active, online, success' },
    ice: { hex: '#C8E6EA', use: 'Info, focus, dark-mode glass glow' },
    gold: { hex: '#E8DFA8', use: 'Primary CTA on dark case file theme' },
    sand: { hex: '#C4A574', use: 'Warning, pending, in-progress' },
    clay: { hex: '#C4886A', use: 'Needs attention — never use red' },
    casefilePage: { hex: '#0D0D0D', use: 'Case file background' },
    cardWhite: { hex: '#FFFFFF', use: 'Workplace card surfaces' },
  },

  forbidden: {
    id: 'DM-005',
    source: 'Owner: no anxiety-inducing UI',
    colors: ['corporate blue (#3b82f6)', 'bright red', 'neon green', 'purple gradients'],
    fonts: ['JetBrains Mono', 'font-mono in ds/ or caseapp/'],
    patterns: [
      'flashing animation',
      'infinite pulse on non-status elements',
      'ALL CAPS body copy',
      'line-height below 1.5 on body',
      'invented product names or colors',
    ],
  },

  typography: {
    id: 'DM-006',
    source: 'Owner: ADHD-friendly; Inter only; tightened headings',
    fontFamily: 'Inter',
    bodySize: '16px',
    bodyLineHeight: 1.65,
    rules: [
      'One H1 per view',
      'Max 3 heading levels per card',
      'Labels: Inter uppercase wide tracking — not monospace',
      'Stat values: tabular-nums',
      'Max prose width ~65ch',
    ],
  },

  spacing: {
    id: 'DM-007',
    source: 'Owner: generous spacing, not cramped',
    touchTargetMin: '44px',
    cardPadding: '24px',
    sectionGap: '32–40px',
    sidebarWidth: '240px',
    pagePaddingX: '24px desktop / 32px large',
  },

  radius: {
    id: 'DM-008',
    source: 'Owner screenshots: rounded modern UI',
    button: '12px (rounded-xl)',
    card: '16px (rounded-2xl)',
    input: '12px (rounded-xl)',
    pill: '9999px (rounded-full)',
    minimumCard: '16px — never 4px sharp corners',
  },

  motion: {
    id: 'DM-010',
    source: 'Owner: bounces OK; no flashy motion',
    allowed: ['hover lift -2px', 'press scale 0.98', 'fade-in', 'tab transition'],
    forbidden: ['flash', 'infinite pulse (except live status dot)', 'parallax', 'auto carousel'],
    easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    durationHover: '250ms',
    durationPress: '150ms',
    respectReducedMotion: true,
  },

  icons: {
    id: 'DM-011',
    set: 'Solar (iconify-icon)',
    rule: 'No emoji as icons',
  },
};

// ---------------------------------------------------------------------------
// COMPONENT SPECS — every variant decided; agents copy exactly
// ---------------------------------------------------------------------------

export const components = {
  appShell: {
    id: 'DM-100',
    component: 'DSAppShell',
    anatomy: ['sidebar 240px', 'main scroll area', 'optional floating advisor pill'],
    themes: ['workplace', 'casefile'],
  },

  sidebar: {
    id: 'DM-101',
    component: 'DSSidebar',
    workplace: {
      width: '240px',
      background: '#E4E4E4',
      border: 'rgba(67,74,83,0.15) right',
      brand: 'DocuMind cms from caseAppMeta',
      statusDot: '#78BDA7 sage',
    },
    casefile: {
      background: '#111111',
      border: 'white/6% right',
    },
    navItem: {
      padding: '10px 12px',
      radius: '12px',
      inactive: { text: '#434A53', hover: 'stone tint bg' },
      activeWorkplace: { bg: '#D8D8D8', text: '#1B1B1B', weight: 500 },
      activeCasefile: { bg: 'white/8%', text: 'stone-100' },
    },
    profile: {
      avatar: '36px circle',
      avatarWorkplace: 'ink bg, white initials',
      avatarCasefile: 'white/10 bg',
    },
  },

  button: {
    id: 'DM-102',
    component: 'DSButton',
    sizes: {
      default: { px: '20px', py: '10px', fontSize: '14px' },
      sm: { px: '16px', py: '8px', fontSize: '12px' },
    },
    radius: '12px',
    motion: 'hover -2px y, active scale 0.98',
    variants: {
      primary: {
        theme: 'workplace',
        bg: '#1B1B1B',
        text: '#FFFFFF',
        hover: '#2A2A2A',
        use: 'Main actions: Create Case, Run Analysis, Save',
      },
      accent: {
        theme: 'workplace',
        bg: '#FF5722',
        text: '#FFFFFF',
        hover: '#E64A19',
        use: 'ONE highlight action per view: New Analysis',
        maxPerView: 1,
      },
      secondary: {
        theme: 'workplace',
        bg: 'transparent',
        border: 'slate 25%',
        text: '#1B1B1B',
        use: 'New Case, Edit, secondary actions',
      },
      ghost: {
        theme: 'both',
        use: 'Nav actions, back, low emphasis',
      },
      primaryCasefile: {
        theme: 'casefile',
        bg: '#E8DFA8',
        text: '#1B1B1B',
        hover: '#D9CE9E',
        use: 'Deep Review, primary on dark',
      },
      secondaryCasefile: {
        theme: 'casefile',
        border: 'white/15%',
        text: 'stone-300',
        use: '+ Note, Edit on case file',
      },
    },
    disabled: { opacity: 0.4, pointerEvents: 'none' },
    focus: { ring: 'ember 35% workplace / ice 40% casefile' },
  },

  card: {
    id: 'DM-103',
    component: 'DSCard',
    padding: '24px',
    radius: '16px',
    workplace: {
      bg: '#FFFFFF',
      border: 'slate 15%',
      shadow: '0 4px 24px rgba(27,27,27,0.06)',
      hover: 'lift -2px + stronger shadow',
    },
    casefile: {
      bg: 'white/4%',
      border: 'white/8%',
      blur: '20px',
      glowVariant: 'ice border + subtle glow — profile hero card',
    },
  },

  statCard: {
    id: 'DM-104',
    component: 'DSStatCard',
    value: { size: '36px', weight: 600, tracking: '-0.03em', nums: 'tabular' },
    label: { size: '10px', uppercase: true, tracking: '0.14em', color: 'stone-400' },
    layout: 'value top-left, optional icon top-right',
  },

  pageHeader: {
    id: 'DM-105',
    component: 'DSPageHeader',
    anatomy: ['breadcrumb', 'title H1', 'optional subtitle', 'actions right'],
    breadcrumb: 'documind cms / {section} via caseAppBreadcrumb()',
    title: 'pageTitle scale — one per view',
  },

  caseHeader: {
    id: 'DM-106',
    component: 'DSCaseHeader',
    anatomy: ['back ghost', 'breadcrumb', 'case ID', 'status badges', 'case name', 'tabs', 'actions'],
    tabs: ['Gather', 'Analysis', 'Resolution', 'GRTW', 'Tasks', 'Files'],
    caseIdStyle: 'semibold tabular-nums — not monospace',
  },

  input: {
    id: 'DM-107',
    components: ['DSInput', 'DSTextarea'],
    height: '44px min (input)',
    padding: '12px 16px',
    radius: '12px',
    workplace: {
      bg: '#FFFFFF',
      border: 'slate 20%',
      focus: 'ember border 45% + ring 15%',
    },
    casefile: {
      bg: 'white/5%',
      border: 'white/10%',
      focus: 'ice border 30% + ring 15%',
    },
    label: '11px uppercase medium tracking 0.14em slate',
    error: 'clay #C4886A — not red',
  },

  tabs: {
    id: 'DM-108',
    component: 'DSTabs',
    container: 'pilled track with 4px inner padding',
    workplace: { track: '#E4E4E4/80', active: 'white bg + shadow' },
    casefile: { track: 'white/3%', active: 'white/10%' },
    tabPadding: '8px 16px',
  },

  badge: {
    id: 'DM-109',
    component: 'DSBadge',
    shape: 'pill',
    font: '10px uppercase medium tracking 0.1em',
    variants: {
      online: { dot: 'sage', use: 'Model online, inference active' },
      active: { dot: 'sage', use: 'In progress / GRTW' },
      plan: { use: 'STD PLAN, coverage tags on case file' },
      neutral: { use: 'Closed, archived' },
    },
    rule: 'Always include dot for live/status badges',
  },

  table: {
    id: 'DM-110',
    wrapper: 'card shell rounded-2xl overflow hidden',
    header: '10px uppercase medium slate — not monospace',
    row: 'hover stone-50 workplace / white/3% casefile',
    cellPadding: '14px 20px',
  },

  alert: {
    id: 'DM-111',
    casefileInfo: {
      bg: 'ice/8%',
      border: 'ice/18%',
      use: 'Pending data points banner — not red warning',
    },
  },

  advisor: {
    id: 'DM-112',
    component: 'DSAdvisorPanel',
    floating: {
      position: 'fixed bottom-right',
      shape: 'pill',
      bg: 'ink/95%',
      label: 'Senior Advisor',
      dot: 'sage online',
    },
    panel: {
      tabs: ['Document Analysis', 'RTW Prediction', 'Hermes Agent'],
      logStyle: 'Inter xs — not monospace',
      inputPlaceholder: 'Ask the advisor...',
    },
  },

  fileChip: {
    id: 'DM-113',
    anatomy: ['icon', 'filename', 'type/size meta', 'optional remove'],
    radius: '12px',
    workplace: { bg: '#F8F8F8', border: 'slate 15%' },
  },

  empty: {
    id: 'DM-114',
    layout: 'centered icon + title + body + optional CTA',
    tone: 'muted stone — no alarming colors',
  },
};

// ---------------------------------------------------------------------------
// DOMAIN — case management colors (owner-approved mappings)
// ---------------------------------------------------------------------------

export const domainDecisions = {
  id: 'DM-012',
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
  pipelineStages: ['intake', 'classify', 'route', 'execute', 'review', 'complete'],
};

/** Agent gate: returns false if a class/color looks invented */
export function isForbiddenStyle(value) {
  if (!value || typeof value !== 'string') return false;
  const checks = [
    /font-mono/i,
    /jetbrains/i,
    /#3b82f6|#2563eb|blue-5/i,
    /#ef4444|red-5/i,
    /purple-|from-purple/i,
    /caselogic|gaqo/i,
  ];
  return checks.some((re) => re.test(value));
}
