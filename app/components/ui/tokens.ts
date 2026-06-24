/**
 * Design tokens for the EMDR trainer UI.
 *
 * These are extracted from the real product surfaces (SettingsPanel,
 * GroundingOverlay, TherapistPanel, globals.css) and codified so that
 * primitive components (Button, Field, Panel ...) share one source of
 * truth. Calm, clinical-wellness, dark theme. No bright white rings,
 * no hard pure-black shadows.
 *
 * Everything is a plain TS constant: hex values for canvas / inline
 * style, tailwind utility strings for className. Import named.
 */

/* ------------------------------------------------------------------ *
 * COLORS - semantic roles
 * Base canvas, surfaces (translucent white tints), borders, text.
 * ------------------------------------------------------------------ */
export const COLORS = {
  /** App canvas. zinc-950, used by body + emdr-shell. */
  bg: '#09090b',
  /** Panel canvas tint used by side panels and full-screen consoles. */
  bgPanel: '#0a0a0c',
  /** Slightly lifted modal surface (grounding card, log modal). */
  bgRaised: '#0d0d10',

  /** Surface fills: translucent white, ascending elevation. */
  surface: {
    /** Faintest fill, inactive tiles / list rows. */
    subtle: 'bg-white/[0.02]',
    /** Default resting surface. */
    base: 'bg-white/[0.03]',
    /** Hover / secondary surface. */
    raised: 'bg-white/[0.04]',
    /** Active / pressed surface, badges. */
    strong: 'bg-white/[0.06]',
    /** Top-most interactive surface. */
    strongest: 'bg-white/[0.08]',
  },

  /** Hover targets for the matching surface step. */
  surfaceHover: {
    subtle: 'hover:bg-white/[0.06]',
    base: 'hover:bg-white/[0.04]',
    raised: 'hover:bg-white/[0.07]',
    strong: 'hover:bg-white/[0.08]',
    strongest: 'hover:bg-white/10',
  },

  /** Hairline borders. Tonal, never bright white. */
  border: {
    /** Default panel / divider hairline. */
    base: 'border-white/[0.06]',
    /** Faint divider used between sections. */
    faint: 'border-white/5',
    /** Even fainter inset border on subtle surfaces. */
    subtle: 'border-white/[0.04]',
    /** Active tile border. */
    strong: 'border-white/12',
  },

  /** Text roles. */
  text: {
    /** Primary copy and headings. */
    primary: 'text-white/90',
    /** Pure white reserved for emphatic headings / values. */
    bright: 'text-white',
    /** Secondary body copy. */
    secondary: 'text-white/60',
    /** Muted helper text. */
    muted: 'text-white/45',
    /** Faintest hints / captions. */
    faint: 'text-white/25',
    /** Dark text on a light (white) CTA. */
    onLight: 'text-zinc-950',
  },
} as const;

/* ------------------------------------------------------------------ *
 * ACCENTS - one dominant accent per context.
 * Each role carries: hex (canvas / inline glow), and tailwind class
 * groups for the standard "selected = accent fill, not white ring"
 * treatment (fill bg + tinted text + tinted border).
 * ------------------------------------------------------------------ */
type AccentRole = {
  /** Raw hex for canvas / boxShadow / inline style. */
  hex: string;
  /** Soft translucent fill for active state. */
  fill: string;
  /** Tinted foreground text. */
  text: string;
  /** Tinted border for active state. */
  border: string;
  /** Hover fill (slightly stronger). */
  hover: string;
  /** Tonal glow shadow keyed in SHADOW.glow when available. */
  glow?: string;
};

export const ACCENTS = {
  /** primary CTA / focus. indigo. */
  primary: {
    hex: '#6366f1',
    soft: '#818cf8',
    fill: 'bg-indigo-500/15',
    text: 'text-indigo-200',
    border: 'border-indigo-500/20',
    hover: 'hover:bg-indigo-500/25',
    glow: '0 0 20px rgba(99,102,241,0.4)',
  } satisfies AccentRole & { soft: string },

  /** success / go / start a set. emerald. */
  success: {
    hex: '#10b981',
    fill: 'bg-emerald-500/15',
    text: 'text-emerald-200',
    border: 'border-emerald-500/20',
    hover: 'hover:bg-emerald-500/25',
    glow: '0 0 15px rgba(16, 185, 129, 0.5)',
  } satisfies AccentRole,

  /** danger / stop. rose. */
  danger: {
    hex: '#f43f5e',
    fill: 'bg-rose-500/15',
    text: 'text-rose-200',
    border: 'border-rose-500/20',
    hover: 'hover:bg-rose-500/25',
    glow: '0 0 15px rgba(244, 63, 94, 0.5)',
  } satisfies AccentRole,

  /** warning / caution. amber. */
  warn: {
    hex: '#f59e0b',
    fill: 'bg-amber-500/12',
    text: 'text-amber-200',
    border: 'border-amber-500/20',
    hover: 'hover:bg-amber-500/20',
    glow: '0 0 15px rgba(245, 158, 11, 0.5)',
  } satisfies AccentRole,

  /** calm / therapeutic cue. violet. */
  calm: {
    hex: '#a78bfa',
    fill: 'bg-violet-500/15',
    text: 'text-violet-100',
    border: 'border-violet-500/20',
    hover: 'hover:bg-violet-500/25',
  } satisfies AccentRole,

  /** info / stimulation channel. cyan. */
  info: {
    hex: '#06b6d4',
    fill: 'bg-cyan-500/15',
    text: 'text-cyan-200',
    border: 'border-cyan-500/20',
    hover: 'hover:bg-cyan-500/25',
    glow: '0 0 15px rgba(6, 182, 212, 0.5)',
  } satisfies AccentRole,

  /** neutral white CTA on dark (the primary "Start" button). */
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

/* ------------------------------------------------------------------ *
 * RADIUS - one scale, used consistently.
 * ------------------------------------------------------------------ */
export const RADIUS = {
  /** Small chips, tiny tiles, scale buttons. */
  sm: 'rounded-lg',
  /** Default controls: buttons, inputs, tiles. */
  md: 'rounded-xl',
  /** Panels, cards, primary CTAs. */
  lg: 'rounded-2xl',
  /** Hero modal card (grounding overlay). */
  xl: 'rounded-[28px]',
  /** Pills, dots, toggles, color swatches. */
  full: 'rounded-full',
} as const;

/* ------------------------------------------------------------------ *
 * SPACING - tailwind spacing steps used across the UI.
 * Reference scale so primitives stay consistent (gap / padding).
 * ------------------------------------------------------------------ */
export const SPACING = {
  /** 0.375rem - tight gaps inside dense rows. */
  xs: '1.5',
  /** 0.5rem - default chip / icon gaps. */
  sm: '2',
  /** 0.625rem - comfortable inner gaps. */
  smPlus: '2.5',
  /** 0.75rem - section inner gaps. */
  md: '3',
  /** 0.875rem - card padding. */
  mdPlus: '3.5',
  /** 1rem - block gaps. */
  lg: '4',
  /** 1.25rem - panel horizontal padding. */
  xl: '5',
  /** 1.75rem - hero card padding. */
  xxl: '7',
} as const;

/* ------------------------------------------------------------------ *
 * SHADOW - soft, tonal. Strings usable in className (arbitrary value)
 * or in style.boxShadow / filter.
 * ------------------------------------------------------------------ */
export const SHADOW = {
  /** Default soft panel shadow, tinted dark, not pure black slab. */
  panel: 'shadow-[0_8px_24px_-6px_rgba(0,0,0,0.6)]',
  /** Side-drawer cast (left edge). */
  drawer: 'shadow-[-20px_0_60px_-10px_rgba(0,0,0,0.8)]',
  /** Soft lift for active tiles. */
  soft: 'shadow-lg',
  /** Glow filters for the moving target / active swatches (drop-shadow). */
  glow: {
    cyan: '0 0 15px rgba(6, 182, 212, 0.5)',
    emerald: '0 0 15px rgba(16, 185, 129, 0.5)',
    amber: '0 0 15px rgba(245, 158, 11, 0.5)',
    rose: '0 0 15px rgba(244, 63, 94, 0.5)',
    white: '0 0 15px rgba(255, 255, 255, 0.5)',
    indigo: '0 0 20px rgba(99,102,241,0.4)',
  },
  /** Soft white halo for the white CTA. */
  ctaWhite: 'shadow-[0_0_20px_rgba(255,255,255,0.12)]',
  ctaWhiteHover: 'hover:shadow-[0_0_35px_rgba(255,255,255,0.25)]',
} as const;

/* ------------------------------------------------------------------ *
 * TYPE - typography class bundles.
 * System / Manrope stack. tabular-nums for any numeric readout.
 * ------------------------------------------------------------------ */
export const TYPE = {
  /** Section labels: uppercase, wide tracking, faint. */
  label: 'text-[11px] uppercase tracking-[0.14em] font-semibold text-white/45',
  /** Panel heading. */
  heading: 'text-lg font-medium tracking-tight text-white',
  /** Smaller subheading inside dense consoles. */
  headingSm: 'text-[15px] font-semibold tracking-tight text-white',
  /** Default body copy. */
  body: 'text-[13px] leading-relaxed text-white/90',
  /** Secondary / helper body. */
  bodyMuted: 'text-[13px] leading-relaxed text-white/60',
  /** Small caption. */
  caption: 'text-[12px] text-white/45',
  /** Monospace-feel numeric values (tabular). */
  mono: 'tabular-nums',
} as const;

/* ------------------------------------------------------------------ *
 * Z - z-index scale. Mirrors the live layering in the product.
 * ------------------------------------------------------------------ */
export const Z = {
  /** Phase rail / docked navigation. */
  rail: 40,
  /** Side panels and full-screen consoles. */
  panel: 50,
  /** Secondary drawers stacked above a panel. */
  drawer: 61,
  /** Grounding / safety overlay (always reachable). */
  overlay: 120,
  /** Top-most blocking modal. */
  modal: 140,
} as const;
