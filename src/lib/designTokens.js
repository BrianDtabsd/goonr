/**
 * GAQO Design System — canonical tokens for all UI surfaces.
 *
 * RULES FOR CONSUMERS (including AI agents building new frontends):
 * 1. Import tokens from this file — do NOT invent new hex values or Tailwind colors.
 * 2. Use only the six accent names for categorical color (blue, emerald, amber, rose, purple, white).
 * 3. Use semantic.* tokens for status, feedback, and interactive states.
 * 4. Use element.* tokens for component class strings — copy verbatim.
 * 5. For case-management UI, use domain.* mappings — do not create ad-hoc status colors.
 */

import { accentColors, getAccent, getHeadingSize } from './cardTokens';

// Re-export card token helpers so consumers have a single import path.
export { accentColors, getAccent, getHeadingSize };

// ---------------------------------------------------------------------------
// 1. COLOR PALETTE
// ---------------------------------------------------------------------------

/** Page-level and structural colors (dark glass theme). */
export const palette = {
  page: {
    background: '#020617', // slate-950 — fallback behind bg image
    overlay: 'rgba(15, 23, 42, 0.4)', // slate-900/40 scrim over background image
    scrimHeavy: 'rgba(2, 6, 23, 0.72)',
  },
  primary: {
    DEFAULT: '#3b82f6', // blue-500 — CTAs, links, focus rings
    hover: '#2563eb', // blue-600
    active: '#1d4ed8', // blue-700
    muted: '#60a5fa', // blue-400 — secondary emphasis
    subtle: 'rgba(59, 130, 246, 0.15)', // blue-500/15 — tinted surfaces
    border: 'rgba(96, 165, 250, 0.3)', // blue-400/30
  },
  text: {
    heading: '#ffffff',
    body: '#cbd5e1', // slate-300
    muted: '#94a3b8', // slate-400
    disabled: 'rgba(148, 163, 184, 0.5)', // slate-400/50
    inverse: '#0f172a', // slate-900 — text on light chips inside footer etc.
    link: '#60a5fa', // blue-400
    linkHover: '#93c5fd', // blue-300
  },
  surface: {
    glass: 'rgba(255, 255, 255, 0.1)',
    glassHover: 'rgba(255, 255, 255, 0.14)',
    glassActive: 'rgba(255, 255, 255, 0.18)',
    glassSubtle: 'rgba(255, 255, 255, 0.05)',
    glassStrong: 'rgba(255, 255, 255, 0.2)',
    frostRgb: '255, 255, 255',
  },
  border: {
    DEFAULT: 'rgba(255, 255, 255, 0.15)',
    subtle: 'rgba(255, 255, 255, 0.08)',
    strong: 'rgba(255, 255, 255, 0.25)',
    divider: 'rgba(255, 255, 255, 0.05)',
    focus: 'rgba(59, 130, 246, 0.6)',
  },
};

/** Semantic feedback and status colors — use ONLY these for success/warning/error/info. */
export const semantic = {
  success: {
    text: 'text-emerald-300',
    textStrong: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-400/25',
    dot: 'bg-emerald-400',
    icon: '#34d399', // emerald-400
  },
  warning: {
    text: 'text-amber-300',
    textStrong: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-400/25',
    dot: 'bg-amber-400',
    icon: '#fbbf24', // amber-400
  },
  error: {
    text: 'text-rose-300',
    textStrong: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-400/25',
    dot: 'bg-rose-400',
    icon: '#fb7185', // rose-400
  },
  info: {
    text: 'text-blue-300',
    textStrong: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-400/25',
    dot: 'bg-blue-400',
    icon: '#60a5fa', // blue-400
  },
  neutral: {
    text: 'text-slate-300',
    textStrong: 'text-slate-200',
    bg: 'bg-white/5',
    border: 'border-white/15',
    dot: 'bg-slate-400',
    icon: '#94a3b8', // slate-400
  },
};

/** Allowed accent names — the ONLY categorical color keys permitted in data/config. */
export const accentNames = ['blue', 'emerald', 'amber', 'rose', 'purple', 'white'];

// ---------------------------------------------------------------------------
// 2. TYPOGRAPHY
// ---------------------------------------------------------------------------

export const typography = {
  fonts: {
    body: "'Inter', system-ui, sans-serif",
    display: "'Space Grotesk', 'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
  },
  scale: {
    hero: 'font-display text-[3.3rem] sm:text-[4.4rem] lg:text-[5.5rem] leading-[0.98] tracking-[-0.045em] font-light',
    h1: 'text-[2.35rem] sm:text-[2.9rem] lg:text-[3.45rem] leading-[1.02] tracking-[-0.04em] font-light',
    h2: 'text-[2.05rem] sm:text-[2.65rem] lg:text-[3.45rem] leading-[1.04] tracking-[-0.045em] font-light',
    h3: 'text-[1.55rem] lg:text-[1.7rem] leading-[1.08] tracking-[-0.03em] font-light',
    h4: 'text-[1.35rem] leading-[1.15] tracking-[-0.03em] font-light',
    bodyLg: 'text-[1.05rem] sm:text-[1.15rem] leading-[1.7]',
    body: 'text-sm leading-[1.75]',
    bodySm: 'text-[13px] leading-[1.7]',
    caption: 'text-xs leading-[1.6] opacity-70',
    eyebrow: 'font-mono text-[11px] uppercase tracking-[0.22em]',
    label: 'font-mono text-[12px] uppercase tracking-[0.18em]',
    stat: 'text-5xl font-medium leading-none tracking-[-0.05em]',
  },
};

// ---------------------------------------------------------------------------
// 3. SPACING, RADIUS, SHADOW, MOTION
// ---------------------------------------------------------------------------

export const spacing = {
  pageX: 'px-6 md:px-8 lg:px-12',
  sectionY: 'gap-24 lg:gap-28',
  sectionInner: 'gap-14 lg:gap-16',
  cardGrid: 'gap-6 md:gap-8',
  stackSm: 'gap-2',
  stackMd: 'gap-4',
  stackLg: 'gap-8',
  maxContent: 'max-w-[1360px] mx-auto w-full',
  maxNarrow: 'max-w-3xl mx-auto w-full',
  scrollOffset: 'scroll-mt-28',
};

export const radius = {
  card: '2.5rem', // 40px — default glass-card via CSS var
  operational: '1.5rem', // 24px — glass-card--radius-24
  module: '1.375rem', // 22px — glass-card--radius-22
  pricing: '1.75rem', // 28px — rounded-[28px]
  buttonPill: 'rounded-full',
  buttonRounded: 'rounded-xl',
  buttonSharp: 'rounded-none',
  input: 'rounded-xl',
  badge: 'rounded-full',
  avatar: 'rounded-full',
  logo: 'rounded-xl',
};

export const shadow = {
  cardOperational:
    '0 18px 50px rgba(148, 163, 184, 0.12), 0 6px 18px rgba(15, 23, 42, 0.04)',
  navScrolled: 'shadow-2xl',
  highlight: '0 0 40px rgba(0, 0, 0, 0.1)',
  buttonGlow: (primaryHex) =>
    `0 0 0 4px ${primaryHex}33, 0 0 20px ${primaryHex}99`,
};

export const motion = {
  easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
  durationFast: 'duration-300',
  durationNormal: 'duration-500',
  durationSlow: 'duration-700',
  fadeUp: 'anim-trigger anim-fade-up',
  lineReveal: 'anim-wrap anim-line',
  reducedMotionQuery: '(prefers-reduced-motion: reduce)',
};

// ---------------------------------------------------------------------------
// 4. ELEMENT STYLES (Tailwind class strings — use verbatim)
// ---------------------------------------------------------------------------

export const element = {
  /** Eyebrow pill — section/category label above headings. */
  eyebrow: {
  base: 'inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/5 px-4 py-2',
  section: 'inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-xl px-4 py-2',
  dot: 'w-1.5 h-1.5 rounded-full',
  text: 'font-mono text-[11px] uppercase tracking-[0.22em] opacity-80',
  },

  /** Glass surfaces — require .glass-card CSS from index.css */
  glass: {
    card: 'glass-card',
    cardOperational: 'glass-card glass-card--content-shell glass-card--radius-24',
    cardModule: 'glass-card glass-card--content-shell glass-card--radius-22',
    nav: 'glass-nav',
    container: 'glass-container',
  },

  /** Buttons — prefer <Button> component; use these when building new primitives. */
  button: {
    base: 'inline-flex items-center justify-center font-semibold transition-all duration-300 px-6 py-2.5',
    primary:
      'inline-flex items-center justify-center font-semibold transition-all duration-300 px-6 py-2.5 rounded-full text-white hover:-translate-y-1',
    secondary:
      'inline-flex items-center justify-center font-semibold transition-all duration-300 px-6 py-2.5 rounded-full text-white bg-white/10 border border-transparent hover:-translate-y-1',
    outline:
      'inline-flex items-center justify-center font-semibold transition-all duration-300 px-6 py-2.5 rounded-full bg-transparent border hover:-translate-y-1',
    ghost:
      'inline-flex items-center justify-center font-semibold transition-all duration-300 px-3 py-2 rounded-full bg-transparent border border-transparent text-white/90 hover:text-white',
    danger:
      'inline-flex items-center justify-center font-semibold transition-all duration-300 px-6 py-2.5 rounded-full text-white bg-rose-500/80 hover:bg-rose-500 border border-rose-400/30 hover:-translate-y-1',
    sm: '!px-4 !py-2 text-sm',
    lg: '!px-8 !py-3 text-base',
    icon: 'inline-flex items-center justify-center p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors',
    disabled: 'opacity-40 pointer-events-none cursor-not-allowed',
  },

  /** Form controls */
  input: {
    base: 'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-400/60 backdrop-blur-sm transition-colors focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/25',
    error: 'border-rose-400/50 focus:border-rose-400/60 focus:ring-rose-500/25',
    disabled: 'opacity-50 cursor-not-allowed bg-white/[0.02]',
    label: 'block font-mono text-[11px] uppercase tracking-[0.18em] text-slate-400 mb-2',
    hint: 'mt-1.5 text-xs text-slate-400/80',
    errorText: 'mt-1.5 text-xs text-rose-400',
  },

  select: {
    base: 'w-full appearance-none rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 pr-10 text-sm text-white backdrop-blur-sm transition-colors focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/25',
  },

  textarea: {
    base: 'w-full min-h-[120px] rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400/60 backdrop-blur-sm transition-colors focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-500/25 resize-y',
  },

  checkbox: {
    base: 'h-4 w-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-2 focus:ring-blue-500/25 focus:ring-offset-0',
  },

  /** Badges and status chips */
  badge: {
    base: 'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em]',
    recommended: 'bg-blue-600 text-white border-transparent shadow-sm',
    neutral: 'bg-white/10 text-white/90 border-white/20',
  },

  statusChip: {
    base: 'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium',
    // Combine base + semantic.bg + semantic.border + semantic.textStrong
  },

  /** Pills used inside cards (ContentCard pills layout) */
  pill: {
    base: 'inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium',
  },

  /** Data table — for case lists, pipeline logs */
  table: {
    wrapper: 'glass-card glass-card--content-shell glass-card--radius-22 overflow-hidden',
    table: 'w-full text-sm',
    thead: 'border-b border-white/10 bg-white/[0.03]',
    th: 'px-5 py-3 text-left font-mono text-[11px] uppercase tracking-[0.16em] text-slate-400 font-medium',
    tbody: 'divide-y divide-white/5',
    tr: 'transition-colors hover:bg-white/[0.04]',
    trSelected: 'bg-blue-500/10 hover:bg-blue-500/12',
    td: 'px-5 py-3.5 text-slate-200',
    tdMuted: 'px-5 py-3.5 text-slate-400',
  },

  /** Sidebar navigation — for case management app shell */
  sidebar: {
    shell: 'flex h-full flex-col border-r border-white/10 bg-white/[0.03] backdrop-blur-xl',
    item: 'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-300 transition-colors hover:bg-white/10 hover:text-white',
    itemActive: 'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm bg-blue-500/15 text-blue-200 border border-blue-400/20',
    sectionLabel: 'px-3 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500',
  },

  /** Tabs */
  tabs: {
    list: 'inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/20 p-1 backdrop-blur-xl',
    tab: 'rounded-full px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white',
    tabActive: 'rounded-full px-4 py-2 text-sm font-medium bg-white/10 text-white shadow-sm',
  },

  /** Pipeline / spine stepper */
  pipeline: {
    stepCard: 'group w-full relative rounded-[22px] p-8 md:p-10 cursor-pointer text-left transition-all duration-500 glass-card',
    stepCardInactive: 'opacity-80 hover:opacity-100',
    stepNumber: 'text-sm font-medium font-mono transition-colors',
    stepNumberActive: 'text-blue-400',
    stepNumberInactive: 'opacity-50 group-hover:opacity-80',
    connector: 'w-px h-6 bg-white/10 mx-auto',
  },

  /** Modal / dialog */
  modal: {
    overlay: 'fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm',
    panel: 'glass-card glass-card--radius-24 w-full max-w-lg p-8 shadow-2xl',
    title: 'card-title text-[1.55rem] font-light mb-2',
    body: 'text-sm leading-[1.75] text-slate-300 mb-6',
    footer: 'flex items-center justify-end gap-3',
  },

  /** Toast / alert banners */
  alert: {
    base: 'flex items-start gap-3 rounded-xl border px-4 py-3 text-sm',
    success: 'bg-emerald-500/10 border-emerald-400/25 text-emerald-200',
    warning: 'bg-amber-500/10 border-amber-400/25 text-amber-200',
    error: 'bg-rose-500/10 border-rose-400/25 text-rose-200',
    info: 'bg-blue-500/10 border-blue-400/25 text-blue-200',
  },

  /** Empty state */
  empty: {
    wrapper: 'flex flex-col items-center justify-center text-center py-16 px-6',
    icon: 'mb-4 text-slate-500',
    title: 'card-title text-lg font-light mb-2',
    body: 'text-sm text-slate-400 max-w-sm',
  },

  /** Loading skeleton */
  skeleton: {
    base: 'animate-pulse rounded-lg bg-white/10',
    text: 'h-4 w-full animate-pulse rounded bg-white/10',
    avatar: 'h-10 w-10 animate-pulse rounded-full bg-white/10',
  },

  /** Activity timeline */
  timeline: {
    item: 'relative pl-6 pb-6 border-l border-white/10 last:pb-0',
    dot: 'absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full border-2 border-slate-950',
    time: 'font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500 mb-1',
    content: 'text-sm text-slate-300',
  },

  /** Accordion (FAQ pattern) */
  accordion: {
    item: 'glass-card glass-card--content-shell glass-card--radius-22 border border-white/10 overflow-hidden',
    trigger:
      'cursor-pointer list-none px-5 py-4 text-left text-sm font-medium text-white/95 flex justify-between items-center gap-3',
    content: 'px-5 pb-4 pt-0 text-sm leading-[1.75] opacity-80 border-t border-white/5',
    icon: 'shrink-0 text-blue-400 text-lg leading-none transition-transform group-open:rotate-45',
  },

  /** Avatar */
  avatar: {
    sm: 'h-8 w-8 rounded-full border border-white/15 bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-xs font-semibold text-white',
    md: 'h-10 w-10 rounded-full border border-white/15 bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-sm font-semibold text-white',
    lg: 'h-12 w-12 rounded-full border border-white/15 bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-base font-semibold text-white',
  },

  /** Divider */
  divider: {
    horizontal: 'border-t border-white/10',
    vertical: 'border-l border-white/10',
  },

  /** Focus ring — apply to custom interactive elements */
  focusRing: 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950',
};

// ---------------------------------------------------------------------------
// 5. ICONS
// ---------------------------------------------------------------------------

/** Solar icon set only — do not mix other icon families. */
export const icons = {
  set: 'solar',
  defaults: { width: '16', height: '16' },
  nav: {
    menu: 'solar:hamburger-menu-linear',
    close: 'solar:close-circle-linear',
  },
  action: {
    arrowRight: 'solar:arrow-right-linear',
    check: 'solar:check-circle-linear',
    add: 'solar:add-circle-linear',
    edit: 'solar:pen-linear',
    delete: 'solar:trash-bin-trash-linear',
    search: 'solar:magnifer-linear',
    filter: 'solar:filter-linear',
    refresh: 'solar:refresh-linear',
    settings: 'solar:settings-linear',
  },
  status: {
    success: 'solar:check-circle-bold',
    warning: 'solar:danger-triangle-linear',
    error: 'solar:close-circle-bold',
    info: 'solar:info-circle-linear',
    pending: 'solar:clock-circle-linear',
  },
  domain: {
    case: 'solar:folder-with-files-linear',
    agent: 'solar:cpu-bolt-linear',
    pipeline: 'solar:routing-2-linear',
    document: 'solar:document-text-linear',
    user: 'solar:user-linear',
  },
};

// ---------------------------------------------------------------------------
// 6. CASE MANAGEMENT DOMAIN MAPPINGS
// ---------------------------------------------------------------------------

/**
 * Pre-defined mappings for case management / agent spine pipeline UI.
 * Agents MUST use these — do not invent new status colors.
 */
export const domain = {
  caseStatus: {
    open: { accent: 'blue', semantic: 'info', label: 'Open' },
    in_progress: { accent: 'amber', semantic: 'warning', label: 'In Progress' },
    pending_review: { accent: 'purple', semantic: 'neutral', label: 'Pending Review' },
    resolved: { accent: 'emerald', semantic: 'success', label: 'Resolved' },
    closed: { accent: 'white', semantic: 'neutral', label: 'Closed' },
    escalated: { accent: 'rose', semantic: 'error', label: 'Escalated' },
  },

  pipelineStage: {
    intake: { accent: 'blue', step: '01', label: 'Intake' },
    classify: { accent: 'purple', step: '02', label: 'Classify' },
    route: { accent: 'amber', step: '03', label: 'Route' },
    execute: { accent: 'emerald', step: '04', label: 'Execute' },
    review: { accent: 'white', step: '05', label: 'Review' },
    complete: { accent: 'emerald', step: '06', label: 'Complete' },
  },

  agentAction: {
    success: 'emerald',
    running: 'blue',
    waiting: 'amber',
    failed: 'rose',
    skipped: 'white',
  },

  priority: {
    low: { accent: 'white', label: 'Low' },
    medium: { accent: 'blue', label: 'Medium' },
    high: { accent: 'amber', label: 'High' },
    critical: { accent: 'rose', label: 'Critical' },
  },
};

// ---------------------------------------------------------------------------
// 7. HELPERS
// ---------------------------------------------------------------------------

/** Build a status chip class string from a semantic key. */
export function statusChipClasses(semanticKey = 'neutral') {
  const s = semantic[semanticKey] || semantic.neutral;
  return `${element.statusChip.base} ${s.bg} ${s.border} ${s.textStrong}`;
}

/** Build an accent pill class string. */
export function accentPillClasses(accentName = 'blue') {
  const a = getAccent(accentName);
  return `${element.pill.base} ${a.pill}`;
}

/** Build eyebrow with dot color. */
export function eyebrowClasses(accentName = 'blue', variant = 'base') {
  const a = getAccent(accentName);
  const shell = variant === 'section' ? element.eyebrow.section : element.eyebrow.base;
  return { shell, dot: `${element.eyebrow.dot} ${a.dot}`, text: element.eyebrow.text };
}

/** Resolve domain case status to accent + semantic tokens. */
export function resolveCaseStatus(statusKey) {
  return domain.caseStatus[statusKey] || domain.caseStatus.open;
}

/** CSS custom properties to copy into :root (matches index.css defaults). */
export const cssVariables = {
  '--bg-url': "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop')",
  '--font-body': typography.fonts.body,
  '--font-heading': typography.fonts.body,
  '--color-heading': palette.text.heading,
  '--color-subtitle': palette.text.muted,
  '--color-body': palette.text.body,
  '--text-body-size': '16px',
  '--primary-color': palette.primary.DEFAULT,
  '--frost-rgb': palette.surface.frostRgb,
  '--card-padding': '2rem',
  '--card-radius': radius.card,
  '--card-opacity': '0.1',
  '--card-border-opacity': '0.15',
  '--card-frost': '24px',
};
