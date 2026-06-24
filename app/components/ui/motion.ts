// framer-motion presets, paired with prefers-reduced-motion via the
// reduceVariants / reduceTransition helpers below.
import type { Transition, Variants } from 'framer-motion';

// default spring for panels / cards
export const SPRING: Transition = {
  type: 'spring',
  stiffness: 320,
  damping: 30,
};

// snappier spring for small controls (toggles, chips)
export const SPRING_SNAPPY: Transition = {
  type: 'spring',
  stiffness: 480,
  damping: 26,
};

// tween fallback matching globals.css --ease-fluid
export const EASE_FLUID: Transition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1],
};

export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: SPRING },
  exit: { opacity: 0, y: 8, transition: EASE_FLUID },
};

// mirrors the GroundingOverlay card
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

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05, delayChildren: 0.02 },
  },
};

// strip y / x / scale offsets so reduced-motion gets a plain fade.
// pass the result of useReducedMotion() as `reduced`.
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

// near-instant fade when reduced, otherwise the given transition
export function reduceTransition(transition: Transition, reduced: boolean | null): Transition {
  return reduced ? { duration: 0.15, ease: 'linear' } : transition;
}
