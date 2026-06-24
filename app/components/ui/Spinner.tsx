'use client';

/**
 * Spinner - soft animated loading indicator.
 * Uses a CSS-driven arc ring with a tinted color. Respects reduced-motion
 * via a pulsing opacity fallback instead of spinning.
 */

import React from 'react';
import { cn } from './cn';
import { ACCENTS, RADIUS, type AccentName } from './tokens';

/* ------------------------------------------------------------------ */

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface SpinnerProps {
  /** Visual size of the spinner. Default: 'md'. */
  size?: SpinnerSize;
  /**
   * Accent color used for the active arc.
   * Defaults to 'primary' (indigo).
   */
  accent?: AccentName;
  /** Additional class applied to the wrapper span. */
  className?: string;
  /** Accessible label for screen readers. Default: 'Loading'. */
  label?: string;
}

/* ------------------------------------------------------------------ */

const SIZE_MAP: Record<SpinnerSize, { px: number; stroke: number }> = {
  xs: { px: 14, stroke: 1.5 },
  sm: { px: 18, stroke: 2 },
  md: { px: 24, stroke: 2 },
  lg: { px: 32, stroke: 2 },
  xl: { px: 44, stroke: 2.5 },
};

/** Accent hex for the arc color. */
const ACCENT_HEX: Record<AccentName, string> = {
  primary: ACCENTS.primary.hex,
  success: ACCENTS.success.hex,
  danger: ACCENTS.danger.hex,
  warn: ACCENTS.warn.hex,
  calm: ACCENTS.calm.hex,
  info: ACCENTS.info.hex,
  white: ACCENTS.white.hex,
};

/* ------------------------------------------------------------------ */

export const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  function Spinner(
    { size = 'md', accent = 'primary', className, label = 'Loading' },
    ref,
  ) {
    const { px, stroke } = SIZE_MAP[size];
    const r = (px - stroke * 2) / 2;
    const circ = 2 * Math.PI * r;
    const arcLen = circ * 0.65; // 65% arc visible
    const trackColor = 'rgba(255,255,255,0.07)';
    const arcColor = ACCENT_HEX[accent];

    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={cn('inline-flex items-center justify-center', RADIUS.full, className)}
        style={{ width: px, height: px }}
      >
        {/* Inline keyframes - scoped per size via a unique animation name. */}
        <style>{`
          @keyframes emdr-spin {
            to { transform: rotate(360deg); }
          }
          @keyframes emdr-pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.8; }
          }
          @media (prefers-reduced-motion: no-preference) {
            .emdr-spinner-svg { animation: emdr-spin 0.9s linear infinite; }
          }
          @media (prefers-reduced-motion: reduce) {
            .emdr-spinner-svg { animation: emdr-pulse 1.4s ease-in-out infinite; }
          }
        `}</style>

        <svg
          className="emdr-spinner-svg"
          width={px}
          height={px}
          viewBox={`0 0 ${px} ${px}`}
          fill="none"
          aria-hidden="true"
        >
          {/* Track ring */}
          <circle
            cx={px / 2}
            cy={px / 2}
            r={r}
            stroke={trackColor}
            strokeWidth={stroke}
          />
          {/* Active arc */}
          <circle
            cx={px / 2}
            cy={px / 2}
            r={r}
            stroke={arcColor}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${arcLen} ${circ - arcLen}`}
            strokeDashoffset={circ * 0.25}
            style={{ opacity: 0.9 }}
          />
        </svg>
      </span>
    );
  },
);

export default Spinner;
