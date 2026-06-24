/**
 * framer-motion presets for the EMDR trainer.
 *
 * Calm, restrained motion. Soft springs for entrances, gentle
 * fade + rise for content. No infinite flicker. Always honour
 * prefers-reduced-motion via the useReducedMotion hook and the
 * reduceVariants helper below.
 */
import type { Transition, Variants } from 'framer-motion';

/* ------------------------------------------------------------------ *
 * Springs
 * ------------------------------------------------------------------ */

/** Soft default spring. Calm settle, used for panels / cards. */
export const SPRING: Transition = {
  type: 'spring',
  stiffness: 320,
  damping: 30,
};

/** Snappier spring for small controls (toggles, chips). */
export const SPRING_SNAPPY: Transition = {
  type: 'spring',
  stiffness: 480,
  damping: 26,
};

/** Tween fallback matching globals.css --ease-fluid. */
export const EASE_FLUID: Transition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
};

/* ------------------------------------------------------------------ *
 * Variants
 * ------------------------------------------------------------------ */

/** Fade in while rising a few px. Pairs with SPRING. */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: SPRING },
  exit: { opacity: 0, y: 8, transition: EASE_FLUID },
};

/** Modal card pop: scale + rise. Mirrors GroundingOverlay card. */
export const cardPop: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 16 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', damping: 26, stiffness: 200 },
  },
  exit: { opacity: 0, scale: 0.96, y: 16, transition: EASE_FLUID },
};

/** Container that staggers its children's entrance. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
};

/* ------------------------------------------------------------------ *
 * Reduced-motion helper
 * ------------------------------------------------------------------ */

/**
 * Collapse a variants set to opacity-only when the user prefers reduced
 * motion. Strips y / scale offsets so nothing slides or zooms, keeping a
 * plain fade. Pass the result of useReducedMotion() as `reduced`.
 *
 *   const reduced = useReducedMotion();
 *   <motion.div variants={reduceVariants(fadeRise, reduced)} ... />
 */
export function reduceVariants(variants: Variants, reduced: boolean | null): Variants {
  if (!reduced) return variants;
  const flatten = (v: Variants[string]): Variants[string] => {
    if (typeof v !== 'object' || v === null) return v;
    const { y: _y, x: _x, scale: _scale, ...rest } = v as Record<string, unknown>;
    return rest as Variants[string];
  };
  return {
    hidden: flatten(variants.hidden),
    visible: flatten(variants.visible),
    exit: variants.exit ? flatten(variants.exit) : undefined,
  } as Variants;
}

/**
 * Pick a transition that respects reduced motion: an instant-ish fade
 * when reduced, the given spring otherwise.
 */
export function reduceTransition(transition: Transition, reduced: boolean | null): Transition {
  return reduced ? { duration: 0.15, ease: 'linear' } : transition;
}
