'use client';

// active step is an elongated accent pill, completed steps are solid dots,
// upcoming steps are faint dots.

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from './cn';
import { ACCENTS, RADIUS, type AccentName } from './tokens';
import { SPRING_SNAPPY } from './motion';

export interface ProgressDotsProps {
  total: number;
  /** Zero-based index of the current step. */
  current: number;
  accent?: AccentName;
  className?: string;
  'aria-label'?: string;
}

export function ProgressDots({
  total,
  current,
  accent = 'primary',
  className,
  'aria-label': ariaLabel,
}: ProgressDotsProps) {
  const reduced = useReducedMotion();
  const accentHex = ACCENTS[accent].hex;
  const label = ariaLabel ?? `${current + 1} / ${total}`;

  return (
    <div
      role="group"
      aria-label={label}
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
            // active = elongated pill, inactive = small circle
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
    </div>
  );
}
