/**
 * Small fixed palette for ContentCard accents and heading sizes.
 * Keeping this constrained on purpose — the goal is a consistent look across
 * client reskins, not unlimited customization. Add a new entry here if you
 * truly need a new color, don't pass arbitrary Tailwind classes from data files.
 */

export const accentColors = {
  blue: {
    text: 'text-blue-300',
    textStrong: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-400/20',
    dot: 'bg-blue-400',
    pill: 'bg-blue-500/15 text-blue-200 border-blue-400/30',
  },
  emerald: {
    text: 'text-emerald-300',
    textStrong: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-400/20',
    dot: 'bg-emerald-400',
    pill: 'bg-emerald-500/15 text-emerald-200 border-emerald-400/30',
  },
  amber: {
    text: 'text-amber-300',
    textStrong: 'text-amber-400',
    bg: 'bg-amber-500/10',
    border: 'border-amber-400/20',
    dot: 'bg-amber-400',
    pill: 'bg-amber-500/15 text-amber-200 border-amber-400/30',
  },
  rose: {
    text: 'text-rose-300',
    textStrong: 'text-rose-400',
    bg: 'bg-rose-500/10',
    border: 'border-rose-400/20',
    dot: 'bg-rose-400',
    pill: 'bg-rose-500/15 text-rose-200 border-rose-400/30',
  },
  purple: {
    text: 'text-purple-300',
    textStrong: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-400/20',
    dot: 'bg-purple-400',
    pill: 'bg-purple-500/15 text-purple-200 border-purple-400/30',
  },
  white: {
    text: 'text-white/90',
    textStrong: 'text-white',
    bg: 'bg-white/5',
    border: 'border-white/15',
    dot: 'bg-white',
    pill: 'bg-white/10 text-white border-white/20',
  },
};

// Sizes lifted directly from the original HTML template (Operational Value,
// Observed Layers, System Logic, Network Status sections).
//   sm  = sub-card title  (Operational Value: text-[1.35rem] leading-[1.15])
//   md  = larger sub-card  (Observed Layers:  text-[1.55rem] lg:text-[1.7rem])
//   lg  = Operational Value section H2 (text-[2.05rem] sm:text-[2.65rem] lg:text-[3.45rem])
//   xl  = Observed Layers / Pricing H2  (text-[2.35rem] sm:text-[2.9rem]  lg:text-[3.45rem])
export const headingSizes = {
  sm: 'text-[1.35rem] leading-[1.15] tracking-[-0.03em]',
  md: 'text-[1.55rem] lg:text-[1.7rem] leading-[1.08] tracking-[-0.03em]',
  lg: 'text-[2.05rem] sm:text-[2.65rem] lg:text-[3.45rem] leading-[1.04] tracking-[-0.045em]',
  xl: 'text-[2.35rem] sm:text-[2.9rem] lg:text-[3.45rem] leading-[1.02] tracking-[-0.04em]',
};

export function getAccent(name) {
  return accentColors[name] || accentColors.blue;
}

export function getHeadingSize(name) {
  return headingSizes[name] || headingSizes.lg;
}
