'use client';

/**
 * Numeric rating row for EMDR clinical scales (SUD 0-10, VOC 1-7).
 *
 *   <ScaleRow from={0} to={10} value={sud} onPick={setSud} accent="danger" label="SUD" />
 *   <ScaleRow from={1} to={7}  value={voc} onPick={setVoc} accent="calm"   label="VOC" />
 */

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from './cn';
import { ACCENTS, COLORS, RADIUS, TYPE, type AccentName } from './tokens';
import { reduceVariants, SPRING_SNAPPY, staggerContainer } from './motion';

export interface ScaleRowProps {
  /** first number in the range, inclusive */
  from: number;
  /** last number in the range, inclusive */
  to: number;
  value: number | undefined;
  onPick: (n: number) => void;
  accent?: AccentName;
  label?: string;
  description?: string;
  className?: string;
}

const BTN_RESTING = [
  'bg-white/[0.03]',
  'border border-white/[0.06]',
  'rounded-lg',
  'text-white/60',
  'text-[13px] font-medium tabular-nums',
  'transition-colors duration-150',
  'focus-visible:outline-none',
].join(' ');

const BTN_HOVER = 'hover:bg-white/[0.07] hover:text-white/90';

/* per-step variant; runs inside staggerContainer so the parent orchestrates timing */
const stepVariant = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: SPRING_SNAPPY },
};

export function ScaleRow({
  from,
  to,
  value,
  onPick,
  accent = 'primary',
  label,
  description,
  className,
}: ScaleRowProps) {
  const reduced = useReducedMotion();
  const accentRole = ACCENTS[accent];

  const numbers: number[] = [];
  for (let i = from; i <= to; i++) numbers.push(i);

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <span className={TYPE.label} aria-label={label}>
          {label}
        </span>
      )}

      <motion.div
        role="group"
        aria-label={label ? `${label} scale ${from} to ${to}` : `Scale ${from} to ${to}`}
        className="flex flex-wrap gap-1.5"
        variants={reduceVariants(staggerContainer, reduced)}
        initial="hidden"
        animate="visible"
      >
        {numbers.map((n) => {
          const isActive = value === n;
          return (
            <motion.button
              key={n}
              type="button"
              aria-label={`${label ?? 'Scale'} ${n}`}
              aria-pressed={isActive}
              onClick={() => onPick(n)}
              variants={reduceVariants(stepVariant, reduced)}
              whileTap={reduced ? {} : { scale: 0.93 }}
              className={cn(
                BTN_RESTING,
                'w-9 h-9 flex items-center justify-center',
                isActive
                  ? cn(
                      accentRole.fill,
                      accentRole.text,
                      'border',
                      accentRole.border,
                      'font-semibold',
                      `focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-[${COLORS.bgPanel}]`,
                    )
                  : cn(
                      BTN_HOVER,
                      'focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-1',
                    ),
              )}
              style={
                isActive && 'glow' in accentRole && accentRole.glow
                  ? { boxShadow: accentRole.glow as string }
                  : undefined
              }
            >
              {n}
            </motion.button>
          );
        })}
      </motion.div>

      {description && (
        <p className={cn(TYPE.caption, 'mt-0.5')}>{description}</p>
      )}
    </div>
  );
}
