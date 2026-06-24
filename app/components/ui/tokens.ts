// Design tokens shared by the UI primitives (Button, Field, Panel ...).
// Hex values are for canvas / inline style; tailwind utility strings are for className.
// Dark theme: tonal borders only, no bright white rings or pure-black shadows.

export const COLORS = {
  // app canvas, zinc-950 (body + emdr-shell)
  bg: '#09090b',
  bgPanel: '#0a0a0c',
  bgRaised: '#0d0d10',

  // translucent white fills, ascending elevation
  surface: {
    subtle: 'bg-white/[0.02]',
    base: 'bg-white/[0.03]',
    raised: 'bg-white/[0.04]',
    strong: 'bg-white/[0.06]',
    strongest: 'bg-white/[0.08]',
  },

  surfaceHover: {
    subtle: 'hover:bg-white/[0.06]',
    base: 'hover:bg-white/[0.04]',
    raised: 'hover:bg-white/[0.07]',
    strong: 'hover:bg-white/[0.08]',
    strongest: 'hover:bg-white/10',
  },

  // hairlines, never bright white
  border: {
    base: 'border-white/[0.06]',
    faint: 'border-white/5',
    subtle: 'border-white/[0.04]',
    strong: 'border-white/12',
  },

  text: {
    primary: 'text-white/90',
    bright: 'text-white',
    secondary: 'text-white/60',
    muted: 'text-white/45',
    faint: 'text-white/25',
    onLight: 'text-zinc-950',
  },
} as const;

// one dominant accent per context: fill bg + tinted text + tinted border
// (selected state is an accent fill, not a white ring)
type AccentRole = {
  hex: string;
  fill: string;
  text: string;
  border: string;
  hover: string;
  glow?: string;
};

export const ACCENTS = {
  // primary CTA / focus, indigo
  primary: {
    hex: '#6366f1',
    soft: '#818cf8',
    fill: 'bg-indigo-500/15',
    text: 'text-indigo-200',
    border: 'border-indigo-500/20',
    hover: 'hover:bg-indigo-500/25',
    glow: '0 0 20px rgba(99,102,241,0.4)',
  } satisfies AccentRole & { soft: string },

  // success / start a set, emerald
  success: {
    hex: '#10b981',
    fill: 'bg-emerald-500/15',
    text: 'text-emerald-200',
    border: 'border-emerald-500/20',
    hover: 'hover:bg-emerald-500/25',
    glow: '0 0 15px rgba(16, 185, 129, 0.5)',
  } satisfies AccentRole,

  // danger / stop, rose
  danger: {
    hex: '#f43f5e',
    fill: 'bg-rose-500/15',
    text: 'text-rose-200',
    border: 'border-rose-500/20',
    hover: 'hover:bg-rose-500/25',
    glow: '0 0 15px rgba(244, 63, 94, 0.5)',
  } satisfies AccentRole,

  // warning, amber
  warn: {
    hex: '#f59e0b',
    fill: 'bg-amber-500/12',
    text: 'text-amber-200',
    border: 'border-amber-500/20',
    hover: 'hover:bg-amber-500/20',
    glow: '0 0 15px rgba(245, 158, 11, 0.5)',
  } satisfies AccentRole,

  // calm / therapeutic cue, violet
  calm: {
    hex: '#a78bfa',
    fill: 'bg-violet-500/15',
    text: 'text-violet-100',
    border: 'border-violet-500/20',
    hover: 'hover:bg-violet-500/25',
  } satisfies AccentRole,

  // info / stimulation channel, cyan
  info: {
    hex: '#06b6d4',
    fill: 'bg-cyan-500/15',
    text: 'text-cyan-200',
    border: 'border-cyan-500/20',
    hover: 'hover:bg-cyan-500/25',
    glow: '0 0 15px rgba(6, 182, 212, 0.5)',
  } satisfies AccentRole,

  // neutral white CTA on dark (the primary Start button)
  white: {
    hex: '#ffffff',
    fill: 'bg-white',
    text: 'text-zinc-950',
    border: 'border-transparent',
    hover: 'hover:bg-white/90',
    glow: '0 0 20px rgba(255,255,255,0.12)',
  } satisfies AccentRole,
} as const;

export type AccentName = keyof typeof ACCENTS;

export const RADIUS = {
  sm: 'rounded-lg',
  md: 'rounded-xl',
  lg: 'rounded-2xl',
  xl: 'rounded-[28px]',
  full: 'rounded-full',
} as const;

// tailwind spacing steps (gap / padding), comments are the rem equivalent
export const SPACING = {
  xs: '1.5', // 0.375rem
  sm: '2', // 0.5rem
  smPlus: '2.5', // 0.625rem
  md: '3', // 0.75rem
  mdPlus: '3.5', // 0.875rem
  lg: '4', // 1rem
  xl: '5', // 1.25rem
  xxl: '7', // 1.75rem
} as const;

// soft tonal shadows, usable in className or style.boxShadow / filter
export const SHADOW = {
  panel: 'shadow-[0_8px_24px_-6px_rgba(0,0,0,0.6)]',
  drawer: 'shadow-[-20px_0_60px_-10px_rgba(0,0,0,0.8)]',
  soft: 'shadow-lg',
  // drop-shadow glow for the moving target / active swatches
  glow: {
    cyan: '0 0 15px rgba(6, 182, 212, 0.5)',
    emerald: '0 0 15px rgba(16, 185, 129, 0.5)',
    amber: '0 0 15px rgba(245, 158, 11, 0.5)',
    rose: '0 0 15px rgba(244, 63, 94, 0.5)',
    white: '0 0 15px rgba(255, 255, 255, 0.5)',
    indigo: '0 0 20px rgba(99,102,241,0.4)',
  },
  ctaWhite: 'shadow-[0_0_20px_rgba(255,255,255,0.12)]',
  ctaWhiteHover: 'hover:shadow-[0_0_35px_rgba(255,255,255,0.25)]',
} as const;

// system / Manrope stack, tabular-nums for numeric readouts
export const TYPE = {
  label: 'text-[11px] uppercase tracking-[0.14em] font-semibold text-white/45',
  heading: 'text-lg font-medium tracking-tight text-white',
  headingSm: 'text-[15px] font-semibold tracking-tight text-white',
  body: 'text-[13px] leading-relaxed text-white/90',
  bodyMuted: 'text-[13px] leading-relaxed text-white/60',
  caption: 'text-[12px] text-white/45',
  mono: 'tabular-nums',
} as const;

export const Z = {
  rail: 40,
  panel: 50,
  drawer: 61,
  overlay: 120, // grounding / safety overlay, always reachable
  modal: 140,
} as const;
