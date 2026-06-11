/**
 * DocuMind CMS Design System — canonical tokens (case management UI).
 *
 * TWO THEMES:
 *   workplace  — light mode dashboard (Decision Center, Analysis, lists)
 *   casefile   — dark glass mode (case detail, document hub)
 *
 * CALM PALETTE RULES (non-negotiable):
 *   ✗ corporate blue, bright red, neon green, purple gradients
 *   ✓ charcoal, warm cream, soft sage, ice blue, pale gold, warm stone
 *
 * Import from this file only. Do not invent colors or spacing.
 * Decisions: DESIGN_DECISIONS.md (no coded IDs — separate from data field registry)
 */

// ---------------------------------------------------------------------------
// 1. THEMES
// ---------------------------------------------------------------------------

export const themes = {
  workplace: {
    name: 'Workplace Light',
    usage: 'Dashboard, analysis forms, lists, navigation shell',
    className: 'ds-theme-workplace',
  },
  casefile: {
    name: 'Case File Dark Glass',
    usage: 'Case detail, document hub, dense information panels',
    className: 'ds-theme-casefile',
  },
};

// ---------------------------------------------------------------------------
// 2. BRAND PALETTE (user-defined — canonical)
// ---------------------------------------------------------------------------

/** Your four brand colors. Map all UI through these before using secondary accents. */
export const brand = {
  ink: '#1B1B1B',       // --color-1: primary text, dark buttons
  slate: '#434A53',     // --color-2: secondary text, borders, labels
  ember: '#FF5722',     // --color-3: accent CTA, highlights (use sparingly)
  mist: '#EEEEEE',      // --color-4: page background, light surfaces
  emberHover: '#E64A19',
  emberSubtle: 'rgba(255, 87, 34, 0.12)',
  emberBorder: 'rgba(255, 87, 34, 0.28)',
};

// ---------------------------------------------------------------------------
// 3. COLOR PALETTE (calm — no corporate blue / red / neon)
// ---------------------------------------------------------------------------

export const palette = {
  brand,

  /** Shared brand neutrals (aligned to brand.ink) */
  charcoal: {
    DEFAULT: '#1B1B1B',
    soft: '#2A2A2A',
    muted: '#434A53',
  },
  cream: {
    DEFAULT: '#F4F1EA',
    warm: '#EDE9E1',
    deep: '#E5E0D6',
  },
  stone: {
    DEFAULT: '#78716C',
    light: '#A8A29E',
    muted: '#9C958D',
  },

  /** Accent hues — desaturated, workplace-safe */
  sage: {
    DEFAULT: '#78BDA7',
    muted: '#8FAE9F',
    subtle: 'rgba(120, 189, 167, 0.15)',
    dot: '#78BDA7',
  },
  ice: {
    DEFAULT: '#C8E6EA',
    glow: '#E0F2F7',
    subtle: 'rgba(200, 230, 234, 0.12)',
    border: 'rgba(200, 230, 234, 0.35)',
  },
  gold: {
    DEFAULT: '#D9CE9E',
    warm: '#E8DFA8',
    subtle: 'rgba(217, 206, 158, 0.15)',
    glow: 'rgba(232, 223, 168, 0.25)',
  },
  sand: {
    DEFAULT: '#C4A574',
    subtle: 'rgba(196, 165, 116, 0.15)',
  },
  clay: {
    DEFAULT: '#C4886A',
    subtle: 'rgba(196, 136, 106, 0.12)',
  },

  workplace: {
    page: '#EEEEEE',
    sidebar: '#E4E4E4',
    surface: '#FFFFFF',
    surfaceRaised: '#F8F8F8',
    border: 'rgba(67, 74, 83, 0.18)',
    borderStrong: 'rgba(67, 74, 83, 0.28)',
    text: '#1B1B1B',
    textSecondary: '#434A53',
    textMuted: '#5C636B',
    textLabel: '#434A53',
    navActive: '#D8D8D8',
    navHover: '#E0E0E0',
    primary: '#1B1B1B',
    primaryHover: '#2A2A2A',
    accent: '#FF5722',
    accentHover: '#E64A19',
    focus: 'rgba(255, 87, 34, 0.35)',
    shadow: '0 4px 24px rgba(27, 27, 27, 0.06)',
    shadowHover: '0 8px 32px rgba(27, 27, 27, 0.1)',
  },

  casefile: {
    page: '#0D0D0D',
    pageGradient: 'radial-gradient(ellipse at 30% 20%, rgba(30, 45, 38, 0.4) 0%, transparent 60%)',
    sidebar: '#111111',
    surface: 'rgba(255, 255, 255, 0.04)',
    surfaceRaised: 'rgba(255, 255, 255, 0.07)',
    border: 'rgba(255, 255, 255, 0.08)',
    borderStrong: 'rgba(255, 255, 255, 0.14)',
    text: '#F5F5F4',
    textSecondary: '#A8A29E',
    textMuted: '#78716C',
    textLabel: '#6B6560',
    navActive: 'rgba(255, 255, 255, 0.08)',
    primary: '#E8DFA8',
    primaryHover: '#D9CE9E',
    primaryText: '#1A1A1A',
    focus: 'rgba(200, 230, 234, 0.4)',
    glow: '0 0 20px rgba(232, 223, 168, 0.15)',
    shadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
  },
};

/** Semantic feedback — calm alternatives to red/green/blue alerts */
export const semantic = {
  active: {
    text: 'text-[#78BDA7]',
    bg: 'bg-[#78BDA7]/15',
    border: 'border-[#78BDA7]/25',
    dot: 'bg-[#78BDA7]',
    hex: '#78BDA7',
  },
  success: {
    text: 'text-[#8FAE9F]',
    bg: 'bg-[#78BDA7]/12',
    border: 'border-[#78BDA7]/20',
    dot: 'bg-[#78BDA7]',
    hex: '#78BDA7',
  },
  warning: {
    text: 'text-[#C4A574]',
    bg: 'bg-[#C4A574]/12',
    border: 'border-[#C4A574]/22',
    dot: 'bg-[#C4A574]',
    hex: '#C4A574',
  },
  attention: {
    text: 'text-[#C4886A]',
    bg: 'bg-[#C4886A]/10',
    border: 'border-[#C4886A]/20',
    dot: 'bg-[#C4886A]',
    hex: '#C4886A',
  },
  info: {
    text: 'text-[#C8E6EA]',
    bg: 'bg-[#C8E6EA]/10',
    border: 'border-[#C8E6EA]/22',
    dot: 'bg-[#C8E6EA]',
    hex: '#C8E6EA',
  },
  neutral: {
    text: 'text-stone-400',
    bg: 'bg-white/5',
    border: 'border-white/10',
    dot: 'bg-stone-400',
    hex: '#A8A29E',
  },
};

/** Categorical accent names — ONLY these in data/config */
export const accentNames = ['charcoal', 'ember', 'sage', 'ice', 'gold', 'sand', 'stone'];

export const accents = {
  charcoal: {
    text: 'text-[#1B1B1B] dark:text-stone-200',
    bg: 'bg-[#1B1B1B]/8',
    border: 'border-[#1B1B1B]/15',
    dot: 'bg-[#1B1B1B]',
    pill: 'bg-[#1B1B1B]/8 text-[#1B1B1B] border-[#1B1B1B]/15',
  },
  ember: {
    text: 'text-[#FF5722]',
    bg: 'bg-[#FF5722]/12',
    border: 'border-[#FF5722]/28',
    dot: 'bg-[#FF5722]',
    pill: 'bg-[#FF5722]/12 text-[#E64A19] border-[#FF5722]/28',
  },
  sage: {
    text: 'text-[#78BDA7]',
    bg: 'bg-[#78BDA7]/12',
    border: 'border-[#78BDA7]/22',
    dot: 'bg-[#78BDA7]',
    pill: 'bg-[#78BDA7]/15 text-[#5A9A84] border-[#78BDA7]/25',
  },
  ice: {
    text: 'text-[#C8E6EA]',
    bg: 'bg-[#C8E6EA]/10',
    border: 'border-[#C8E6EA]/22',
    dot: 'bg-[#C8E6EA]',
    pill: 'bg-[#C8E6EA]/12 text-[#A8D4DA] border-[#C8E6EA]/25',
  },
  gold: {
    text: 'text-[#D9CE9E]',
    bg: 'bg-[#D9CE9E]/12',
    border: 'border-[#D9CE9E]/22',
    dot: 'bg-[#D9CE9E]',
    pill: 'bg-[#D9CE9E]/15 text-[#B8AD7A] border-[#D9CE9E]/25',
  },
  sand: {
    text: 'text-[#C4A574]',
    bg: 'bg-[#C4A574]/12',
    border: 'border-[#C4A574]/22',
    dot: 'bg-[#C4A574]',
    pill: 'bg-[#C4A574]/15 text-[#A68B58] border-[#C4A574]/25',
  },
  stone: {
    text: 'text-stone-500',
    bg: 'bg-stone-500/8',
    border: 'border-stone-400/15',
    dot: 'bg-stone-400',
    pill: 'bg-stone-500/10 text-stone-600 border-stone-400/20',
  },
};

export function getAccent(name = 'sage') {
  return accents[name] || accents.sage;
}

// ---------------------------------------------------------------------------
// 3. ADHD-FRIENDLY TYPOGRAPHY
// ---------------------------------------------------------------------------

export const typography = {
  /** Inter only — no monospace in this design system */
  fonts: {
    body: "'Inter', system-ui, sans-serif",
    display: "'Inter', system-ui, sans-serif",
  },

  /**
   * ADHD rules baked into scale:
   * - One H1 per view, max 3 heading levels visible
   * - Labels: Inter + uppercase + wide tracking (scannable anchors)
   * - Body: 16px min, line-height ≥ 1.6
   * - Tightened display headings: negative tracking on large sizes only
   */
  scale: {
    pageTitle: 'text-[1.75rem] sm:text-[2rem] font-semibold tracking-[-0.02em] leading-[1.15]',
    sectionTitle: 'text-xl font-semibold tracking-[-0.01em] leading-[1.25]',
    cardTitle: 'text-base font-semibold leading-[1.3]',
    body: 'text-base leading-[1.65]',
    bodySm: 'text-sm leading-[1.65]',
    caption: 'text-xs leading-[1.55] text-stone-500',
    label: 'text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500',
    labelTight: 'text-[10px] font-medium uppercase tracking-[0.18em] text-stone-500',
    breadcrumb: 'text-[11px] font-medium uppercase tracking-[0.12em] text-stone-400',
    code: 'text-xs tabular-nums text-stone-500',
    stat: 'text-4xl font-semibold tracking-[-0.03em] leading-none tabular-nums',
    caseName: 'text-2xl sm:text-3xl font-semibold tracking-[-0.02em] leading-[1.1]',
  },

  /** Max content line length for readability */
  maxProse: 'max-w-prose',
  maxLabel: 'max-w-[32ch]',
};

// ---------------------------------------------------------------------------
// 4. SPACING (generous — ADHD rule: never pack elements tight)
// ---------------------------------------------------------------------------

export const spacing = {
  /** Minimum touch/click target */
  touchMin: '44px',
  /** Standard gaps */
  xs: '0.5rem',   // 8px
  sm: '0.75rem',  // 12px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
  '3xl': '4rem',  // 64px

  pageX: 'px-6 lg:px-8',
  pageY: 'py-6 lg:py-8',
  section: 'gap-8 lg:gap-10',
  cardGrid: 'gap-4 lg:gap-5',
  stack: 'gap-4',
  stackLg: 'gap-6',
  sidebarWidth: 'w-[240px]',
  contentMax: 'max-w-[1200px] mx-auto w-full',
};

export const radius = {
  sm: 'rounded-lg',       // 8px — inputs, small chips
  md: 'rounded-xl',       // 12px — cards, buttons alt
  lg: 'rounded-2xl',      // 16px — stat cards
  xl: 'rounded-3xl',      // 24px — large panels
  pill: 'rounded-full',
  caseCard: 'rounded-2xl',
};

export const shadow = {
  workplaceCard: 'shadow-[0_4px_24px_rgba(26,26,26,0.06)]',
  workplaceCardHover: 'shadow-[0_8px_32px_rgba(26,26,26,0.1)]',
  casefileCard: 'shadow-[0_8px_32px_rgba(0,0,0,0.35)]',
  casefileGlow: 'shadow-[0_0_20px_rgba(232,223,168,0.12)]',
};

// ---------------------------------------------------------------------------
// 5. MOTION (bounces OK — ADHD rule: motion communicates, never distracts)
// ---------------------------------------------------------------------------

export const motion = {
  easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // gentle bounce
  easingSmooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
  durationFast: '150ms',
  durationNormal: '250ms',
  durationSlow: '400ms',

  /** Tailwind classes */
  cardHover: 'transition-all duration-250 hover:-translate-y-0.5 hover:shadow-lg',
  buttonPress: 'transition-all duration-150 active:scale-[0.97]',
  buttonBounce: 'transition-all duration-250 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
  fadeIn: 'animate-in fade-in duration-300',
};

// ---------------------------------------------------------------------------
// 6. FORBIDDEN STYLES (anxiety-inducing — agents must check against this)
// ---------------------------------------------------------------------------

export const forbidden = {
  colors: [
    '#3b82f6', '#2563eb', '#1d4ed8', // corporate blue
    '#ef4444', '#dc2626', '#f87171', // red
    '#22c55e', '#10b981', '#4ade80', // neon green
    '#a855f7', '#8b5cf6', '#c084fc', // purple
  ],
  tailwind: [
    'bg-blue-', 'text-blue-', 'border-blue-',
    'bg-red-', 'text-red-', 'border-red-',
    'bg-green-5', 'text-green-5', 'bg-emerald-5',
    'bg-purple-', 'text-purple-', 'from-purple', 'to-purple',
    'bg-gradient-to-r from-', // no purple/color gradients
  ],
  patterns: [
    'flashing animations',
    'infinite pulse on non-status elements',
    'ALL CAPS body text',
    'more than 3 font sizes in one card',
    'line-height below 1.5 for body text',
    'JetBrains Mono',
    'font-mono in ds/ or caseapp/ components',
    'coded IDs like DF-012 or DC-012 in design files — reserved for data field registry elsewhere',
  ],
};

// ---------------------------------------------------------------------------
// 7. ELEMENT CLASS STRINGS
// ---------------------------------------------------------------------------

export const element = {
  eyebrow: {
    workplace:
      'inline-flex items-center gap-2 rounded-full border border-stone-300/60 bg-white/60 px-3 py-1.5',
    casefile:
      'inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5',
    dot: 'w-1.5 h-1.5 rounded-full',
    text: 'text-[10px] font-medium uppercase tracking-[0.16em] text-stone-500',
  },

  button: {
    primaryWorkplace:
      'inline-flex items-center justify-center gap-2 rounded-xl bg-[#1B1B1B] px-5 py-2.5 text-sm font-medium text-white transition-all duration-250 hover:bg-[#2A2A2A] hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]/35',
    accentWorkplace:
      'inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF5722] px-5 py-2.5 text-sm font-medium text-white transition-all duration-250 hover:bg-[#E64A19] hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5722]/40',
    secondaryWorkplace:
      'inline-flex items-center justify-center gap-2 rounded-xl border border-[#434A53]/25 bg-transparent px-5 py-2.5 text-sm font-medium text-[#1B1B1B] transition-all duration-250 hover:bg-[#1B1B1B]/5 hover:-translate-y-0.5 active:scale-[0.98]',
    ghostWorkplace:
      'inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-[#434A53] transition-colors hover:bg-[#434A53]/10 hover:text-[#1B1B1B]',
    primaryCasefile:
      'inline-flex items-center justify-center gap-2 rounded-xl bg-[#E8DFA8] px-5 py-2.5 text-sm font-medium text-[#1A1A1A] transition-all duration-250 hover:bg-[#D9CE9E] hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(232,223,168,0.15)] active:scale-[0.98]',
    secondaryCasefile:
      'inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-transparent px-5 py-2.5 text-sm font-medium text-stone-300 transition-all duration-250 hover:bg-white/5 hover:-translate-y-0.5 active:scale-[0.98]',
    ghostCasefile:
      'inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-stone-400 transition-colors hover:bg-white/5 hover:text-stone-200',
    sm: '!px-4 !py-2 text-xs',
    disabled: 'opacity-40 pointer-events-none cursor-not-allowed',
  },

  card: {
    workplace:
      'rounded-2xl border border-[#434A53]/15 bg-white p-6 transition-all duration-250 hover:-translate-y-0.5 shadow-[0_4px_24px_rgba(27,27,27,0.06)] hover:shadow-[0_8px_32px_rgba(27,27,27,0.1)]',
    workplaceFlat: 'rounded-2xl border border-[#434A53]/15 bg-white p-6',
    casefile:
      'rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl p-6 transition-all duration-250',
    casefileGlow:
      'rounded-2xl border border-[#C8E6EA]/20 bg-white/[0.04] backdrop-blur-xl p-6 shadow-[0_0_20px_rgba(200,230,234,0.06)]',
    stat: 'rounded-2xl border border-[#E5E0D8] bg-white p-5 lg:p-6',
  },

    input: {
    workplace:
      'w-full rounded-xl border border-[#434A53]/20 bg-white px-4 py-3 text-sm text-[#1B1B1B] placeholder:text-[#434A53]/60 transition-colors focus:outline-none focus:border-[#FF5722]/45 focus:ring-2 focus:ring-[#FF5722]/15',
    casefile:
      'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-stone-100 placeholder:text-stone-500 backdrop-blur-sm transition-colors focus:outline-none focus:border-[#C8E6EA]/30 focus:ring-2 focus:ring-[#C8E6EA]/15',
    label: 'block text-[11px] font-medium uppercase tracking-[0.14em] text-stone-500 mb-2',
    hint: 'mt-1.5 text-xs text-stone-400',
    error: 'mt-1.5 text-xs text-[#C4886A]',
  },

  sidebar: {
    shell: 'flex h-full flex-col',
    item: 'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-stone-600 transition-all duration-200 hover:bg-stone-200/40',
    itemActive: 'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium bg-[#D8D8D8] text-[#1B1B1B]',
    itemActiveCasefile: 'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium bg-white/[0.08] text-stone-100',
    sectionLabel: 'px-3 py-2 text-[10px] font-medium uppercase tracking-[0.18em] text-stone-400',
    statusDot: 'w-2 h-2 rounded-full bg-[#78BDA7]',
  },

  tabs: {
    listWorkplace: 'inline-flex items-center gap-1 rounded-xl border border-[#434A53]/15 bg-[#E4E4E4]/80 p-1',
    tabWorkplace: 'rounded-lg px-4 py-2 text-sm text-[#434A53] transition-all duration-200 hover:text-[#1B1B1B]',
    tabActiveWorkplace: 'rounded-lg px-4 py-2 text-sm font-medium bg-white text-[#1B1B1B] shadow-sm',
    listCasefile: 'inline-flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.03] p-1',
    tabCasefile: 'rounded-lg px-4 py-2 text-sm text-stone-500 transition-all duration-200 hover:text-stone-200',
    tabActiveCasefile: 'rounded-lg px-4 py-2 text-sm font-medium bg-white/10 text-stone-100',
  },

  table: {
    wrapperWorkplace: 'rounded-2xl border border-[#434A53]/15 bg-white overflow-hidden',
    wrapperCasefile: 'rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl overflow-hidden',
    th: 'px-5 py-3 text-left text-[10px] font-medium uppercase tracking-[0.14em] text-stone-400',
    td: 'px-5 py-3.5 text-sm text-stone-700',
    tdCasefile: 'px-5 py-3.5 text-sm text-stone-300',
    trHover: 'transition-colors hover:bg-stone-50',
    trHoverCasefile: 'transition-colors hover:bg-white/[0.03]',
    divider: 'divide-y divide-[#434A53]/10',
    dividerCasefile: 'divide-y divide-white/[0.05]',
  },

  badge: {
    base: 'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.1em]',
    statusOnline: 'bg-[#78BDA7]/15 text-[#5A9A84] border-[#78BDA7]/25',
    statusPending: 'bg-[#C4A574]/12 text-[#A68B58] border-[#C4A574]/22',
    statusNeutral: 'bg-stone-500/10 text-stone-500 border-stone-400/20',
    grtw: 'bg-[#78BDA7]/15 text-[#5A9A84] border-[#78BDA7]/25',
    plan: 'bg-white/10 text-stone-300 border-white/15',
  },

  alert: {
    base: 'flex items-start gap-3 rounded-xl border px-4 py-3 text-sm',
    info: 'bg-[#C8E6EA]/10 border-[#C8E6EA]/22 text-stone-600',
    infoCasefile: 'bg-[#C8E6EA]/8 border-[#C8E6EA]/18 text-stone-300',
    warning: 'bg-[#C4A574]/10 border-[#C4A574]/20 text-stone-600',
    attention: 'bg-[#C4886A]/10 border-[#C4886A]/18 text-stone-600',
  },

  advisor: {
    panel: 'rounded-2xl border border-white/10 bg-[#1A1A1A]/90 backdrop-blur-xl overflow-hidden',
    float: 'fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-white/10 bg-[#1A1A1A]/95 px-5 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-250 hover:-translate-y-1',
    tab: 'px-4 py-2.5 text-xs font-medium text-stone-400 border-b-2 border-transparent transition-colors',
    tabActive: 'px-4 py-2.5 text-xs font-medium text-[#C8E6EA] border-b-2 border-[#C8E6EA]/50',
    input: 'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-stone-200 placeholder:text-stone-500',
  },

  fileChip: {
    workplace:
      'inline-flex items-center gap-2 rounded-xl border border-[#434A53]/15 bg-[#F8F8F8] px-3 py-2 text-sm text-[#434A53]',
    casefile:
      'inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-stone-300',
  },

  statCard: {
    value: 'text-4xl font-semibold tracking-[-0.03em] leading-none tabular-nums text-[#1B1B1B]',
    valueCasefile: 'text-4xl font-semibold tracking-[-0.03em] leading-none tabular-nums text-stone-100',
    label: 'text-[10px] font-medium uppercase tracking-[0.14em] text-stone-400 mt-2',
    icon: 'text-stone-300',
  },

  empty: {
    wrapper: 'flex flex-col items-center justify-center text-center py-16 px-6',
    icon: 'mb-4 text-stone-300',
    title: 'text-lg font-semibold text-stone-700 mb-2',
    body: 'text-sm text-stone-500 max-w-sm leading-[1.65]',
  },

  focusRing:
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#78BDA7]/40 focus-visible:ring-offset-2',
};

// ---------------------------------------------------------------------------
// 8. ICONS (Solar set)
// ---------------------------------------------------------------------------

export const icons = {
  set: 'solar',
  nav: {
    dashboard: 'solar:widget-5-linear',
    cases: 'solar:folder-with-files-linear',
    incidents: 'solar:danger-circle-linear',
    analysis: 'solar:chart-2-linear',
    decisions: 'solar:checklist-minimalistic-linear',
    people: 'solar:users-group-rounded-linear',
    evidence: 'solar:document-text-linear',
    reports: 'solar:graph-new-linear',
    settings: 'solar:settings-linear',
    processes: 'solar:routing-2-linear',
  },
  action: {
    add: 'solar:add-circle-linear',
    edit: 'solar:pen-linear',
    search: 'solar:magnifer-linear',
    upload: 'solar:upload-linear',
    close: 'solar:close-circle-linear',
    arrowRight: 'solar:arrow-right-linear',
    refresh: 'solar:refresh-linear',
    mic: 'solar:microphone-linear',
    robot: 'solar:cpu-bolt-linear',
  },
  status: {
    active: 'solar:check-circle-linear',
    pending: 'solar:clock-circle-linear',
    attention: 'solar:danger-triangle-linear',
    info: 'solar:info-circle-linear',
  },
};

// ---------------------------------------------------------------------------
// 9. DOMAIN MAPPINGS (case management)
// ---------------------------------------------------------------------------

export const domain = {
  caseStatus: {
    open: { accent: 'ice', semantic: 'info', label: 'Open' },
    in_progress: { accent: 'sand', semantic: 'warning', label: 'In Progress' },
    pending_review: { accent: 'stone', semantic: 'neutral', label: 'Pending Review' },
    resolved: { accent: 'sage', semantic: 'success', label: 'Resolved' },
    closed: { accent: 'stone', semantic: 'neutral', label: 'Closed' },
    escalated: { accent: 'sand', semantic: 'attention', label: 'Escalated' },
  },

  pipelineStage: {
    intake: { accent: 'ice', step: '01', label: 'Intake' },
    classify: { accent: 'stone', step: '02', label: 'Classify' },
    route: { accent: 'sand', step: '03', label: 'Route' },
    execute: { accent: 'sage', step: '04', label: 'Execute' },
    review: { accent: 'gold', step: '05', label: 'Review' },
    complete: { accent: 'sage', step: '06', label: 'Complete' },
  },

  agentAction: {
    success: 'sage',
    running: 'ice',
    waiting: 'sand',
    failed: 'sand',
    skipped: 'stone',
  },

  priority: {
    low: { accent: 'stone', label: 'Low' },
    medium: { accent: 'ice', label: 'Medium' },
    high: { accent: 'sand', label: 'High' },
    critical: { accent: 'sand', label: 'Critical' },
  },

  caseTabs: ['Gather', 'Analysis', 'Resolution', 'GRTW', 'Tasks', 'Files'],
};

// ---------------------------------------------------------------------------
// 10. HELPERS
// ---------------------------------------------------------------------------

export function statusChipClasses(semanticKey = 'neutral', theme = 'workplace') {
  const s = semantic[semanticKey] || semantic.neutral;
  const textColor = theme === 'casefile' ? s.text : s.text.replace('text-[#C8E6EA]', 'text-[#6B9BA3]');
  return `${element.badge.base} ${s.bg} ${s.border} ${textColor}`;
}

export function accentPillClasses(accentName = 'sage') {
  const a = getAccent(accentName);
  return `inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${a.pill}`;
}

export function resolveCaseStatus(statusKey) {
  return domain.caseStatus[statusKey] || domain.caseStatus.open;
}

export function themeElement(theme, key) {
  const t = themes[theme] ? theme : 'workplace';
  const map = element[key];
  if (!map) return '';
  if (typeof map === 'string') return map;
  return map[t] || map.workplace || map.casefile || '';
}

/** CSS variables for each theme — applied via class on root element */
export const cssVariables = {
  workplace: {
    '--color-1': brand.ink,
    '--color-2': brand.slate,
    '--color-3': brand.ember,
    '--color-4': brand.mist,
    '--ds-page': palette.workplace.page,
    '--ds-sidebar': palette.workplace.sidebar,
    '--ds-surface': palette.workplace.surface,
    '--ds-border': palette.workplace.border,
    '--ds-text': palette.workplace.text,
    '--ds-text-muted': palette.workplace.textMuted,
    '--ds-primary': palette.workplace.primary,
    '--ds-accent': palette.sage.DEFAULT,
    '--ds-focus': palette.workplace.focus,
  },
  casefile: {
    '--ds-page': palette.casefile.page,
    '--ds-sidebar': palette.casefile.sidebar,
    '--ds-surface': palette.casefile.surface,
    '--ds-border': palette.casefile.border,
    '--ds-text': palette.casefile.text,
    '--ds-text-muted': palette.casefile.textMuted,
    '--ds-primary': palette.casefile.primary,
    '--ds-accent': palette.ice.DEFAULT,
    '--ds-focus': palette.casefile.focus,
  },
};
