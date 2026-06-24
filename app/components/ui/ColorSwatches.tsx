'use client';

/**
 * ColorSwatches - circular color picker row for EMDR UI state.
 *
 * Used wherever the therapist or client picks a color to represent
 * a feeling, body sensation, or target state. Active swatch gets a
 * translucent accent-tinted ring + subtle glow - no hard white ring.
 *
 * Usage:
 *   const FEELING_COLORS = [
 *     { value: 'calm',   hex: '#a78bfa', label: 'Calm' },
 *     { value: 'tense',  hex: '#f43f5e', label: 'Tension' },
 *     { value: 'numb',   hex: '#94a3b8', label: 'Numbness' },
 *   ];
 *   <ColorSwatches colors={FEELING_COLORS} value={color} onChange={setColor} />
 */

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from './cn';
import { COLORS, TYPE } from './tokens';
import { reduceVariants, SPRING_SNAPPY, staggerContainer } from './motion';

/* ------------------------------------------------------------------ */

export interface SwatchItem {
  /** Internal value for this color (e.g. 'calm', '#a78bfa', 'blue'). */
  value: string;
  /** Actual CSS color shown as the swatch circle. */
  hex: string;
  /** Accessible label for the color. */
  label: string;
}

export interface ColorSwatchesProps {
  colors: SwatchItem[];
  /** Currently selected value, or undefined. */
  value: string | undefined;
  /** Called when user selects a color. Clicking active value clears it (passes undefined). */
  onChange: (value: string | undefined) => void;
  /** Optional label shown above the row. */
  label?: string;
  /** Size variant. Default: 'md'. */
  size?: 'sm' | 'md' | 'lg';
  /** Extra class on root element. */
  className?: string;
}

/* ------------------------------------------------------------------ */

const SIZE_MAP = {
  sm: { outer: 'w-6 h-6',  inner: 'w-4 h-4'  },
  md: { outer: 'w-8 h-8',  inner: 'w-6 h-6'  },
  lg: { outer: 'w-10 h-10', inner: 'w-7 h-7' },
} as const;

/* ------------------------------------------------------------------ */

const swatchVariant = {
  hidden: { opacity: 0, scale: 0.75 },
  visible: { opacity: 1, scale: 1, transition: SPRING_SNAPPY },
};

/* ------------------------------------------------------------------ */

/**
 * Build a subtle tonal glow + selection ring from a hex color.
 * Avoids hard white - uses 30% alpha of the swatch color itself.
 */
function activeStyle(hex: string): React.CSSProperties {
  // Parse hex to rgb for rgba() usage
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return {
    boxShadow: [
      `0 0 0 2px rgba(${r},${g},${b},0.45)`,
      `0 0 12px rgba(${r},${g},${b},0.35)`,
    ].join(', '),
  };
}

/* ------------------------------------------------------------------ */

export function ColorSwatches({
  colors,
  value,
  onChange,
  label,
  size = 'md',
  className,
}: ColorSwatchesProps) {
  const reduced = useReducedMotion();
  const sz = SIZE_MAP[size];

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <span className={TYPE.label}>{label}</span>
      )}

      <motion.div
        role="group"
        aria-label={label ? `${label} color picker` : 'Color picker'}
        className="flex flex-wrap gap-2"
        variants={reduceVariants(staggerContainer, reduced)}
        initial="hidden"
        animate="visible"
      >
        {colors.map((swatch) => {
          const isActive = value === swatch.value;

          return (
            <motion.button
              key={swatch.value}
              type="button"
              aria-label={`${swatch.label}${isActive ? ' (selected)' : ''}`}
              aria-pressed={isActive}
              onClick={() => onChange(isActive ? undefined : swatch.value)}
              variants={reduceVariants(swatchVariant, reduced)}
              whileTap={reduced ? {} : { scale: 0.88 }}
              whileHover={reduced ? {} : { scale: 1.08 }}
              className={cn(
                sz.outer,
                'rounded-full',
                'flex items-center justify-center',
                'transition-opacity duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30',
                'focus-visible:ring-offset-1',
                isActive ? 'opacity-100' : 'opacity-60 hover:opacity-85',
                // Subtle background ring slot so active state has contrast against dark bg
                `bg-[${COLORS.bgPanel}]`,
              )}
              style={isActive ? activeStyle(swatch.hex) : undefined}
            >
              <span
                aria-hidden
                className={cn(sz.inner, 'rounded-full block')}
                style={{ background: swatch.hex }}
              />
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}
