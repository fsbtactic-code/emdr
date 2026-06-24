'use client';

/**
 * ProgressDots
 *
 * Step-progress indicator: the active step is an elongated pill in the
 * accent color; completed steps are smaller solid dots; upcoming steps
 * are faint muted dots. Smooth layout animation when the active index
 * changes. Respects prefers-reduced-motion.
 */

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from './cn';
import { ACCENTS, RADIUS, type AccentName } from './tokens';
import { SPRING_SNAPPY } from './motion';

export interface ProgressDotsProps {
  /** Total number of steps. */
  total: number;
  /** Zero-based index of the current active step. */
  current: number;
  /** Accent color for the active dot pill. Defaults to 'primary'. */
  accent?: AccentName;
  /** Additional className fragments applied to the container. */
  className?: string;
  /** Accessible label for the group. */
  'aria-label'?: string;
}

export function ProgressDots({
  total,
  current,
  accent = 'primary',
  className,
  'aria-label': ariaLabel = 'Прогресс шагов',
}: ProgressDotsProps) {
  const reduced = useReducedMotion();
  const accentHex = ACCENTS[accent].hex;

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn('flex items-center gap-1.5', className)}
    >
      {Array.from({ length: total }, (_, i) => {
        const isActive = i === current;
        const isDone = i < current;

        return (
          <motion.span
            key={i}
            role="presentation"
            aria-hidden="true"
            // Active: elongated pill. Inactive: small circle.
            animate={{
              width: isActive ? 20 : 6,
              opacity: isDone ? 0.55 : isActive ? 1 : 0.25,
            }}
            transition={reduced ? { duration: 0.15 } : SPRING_SNAPPY}
            style={{
              display: 'inline-block',
              height: 6,
              borderRadius: 999,
              background: isActive ? accentHex : 'rgba(255,255,255,0.5)',
              boxShadow: isActive && !reduced
                ? `0 0 8px ${accentHex}80`
                : 'none',
              flexShrink: 0,
            }}
          />
        );
      })}

      {/* Screen-reader only progress text */}
      <span className="sr-only">
        Шаг {current + 1} из {total}
      </span>
    </div>
  );
}
