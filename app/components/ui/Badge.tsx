'use client';

/**
 * Badge
 *
 * Status indicator with a small dot + text label.
 * Variants map to semantic accent roles so the color carries meaning
 * (e.g. success = "Клиент подключен", danger = "Сессия остановлена").
 *
 * Optionally animated: the dot pulses gently when `pulse` is true,
 * respecting prefers-reduced-motion.
 */

import { useReducedMotion, motion } from 'framer-motion';
import { cn } from './cn';
import { RADIUS } from './tokens';

export type BadgeVariant = 'success' | 'warn' | 'danger' | 'neutral' | 'info' | 'calm';

const VARIANT_CLASSES: Record<
  BadgeVariant,
  { wrap: string; dot: string; text: string }
> = {
  success: {
    wrap: 'bg-emerald-500/10 border border-emerald-500/15',
    dot: 'bg-emerald-400',
    text: 'text-emerald-200',
  },
  warn: {
    wrap: 'bg-amber-500/10 border border-amber-500/15',
    dot: 'bg-amber-400',
    text: 'text-amber-200',
  },
  danger: {
    wrap: 'bg-rose-500/10 border border-rose-500/15',
    dot: 'bg-rose-400',
    text: 'text-rose-200',
  },
  neutral: {
    wrap: 'bg-white/[0.04] border border-white/[0.06]',
    dot: 'bg-white/40',
    text: 'text-white/60',
  },
  info: {
    wrap: 'bg-cyan-500/10 border border-cyan-500/15',
    dot: 'bg-cyan-400',
    text: 'text-cyan-200',
  },
  calm: {
    wrap: 'bg-violet-500/10 border border-violet-500/15',
    dot: 'bg-violet-400',
    text: 'text-violet-100',
  },
};

export interface BadgeProps {
  /** Semantic color variant. */
  variant?: BadgeVariant;
  /** Label text. */
  children: React.ReactNode;
  /**
   * When true the status dot animates with a soft pulse.
   * Automatically disabled when prefers-reduced-motion is set.
   */
  pulse?: boolean;
  /** Additional className fragments. */
  className?: string;
}

export function Badge({
  variant = 'neutral',
  children,
  pulse = false,
  className,
}: BadgeProps) {
  const reduced = useReducedMotion();
  const { wrap, dot, text } = VARIANT_CLASSES[variant];
  const shouldAnimate = pulse && !reduced;

  return (
    <span
      role="status"
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5',
        'text-[11px] font-medium',
        RADIUS.sm,
        wrap,
        className,
      )}
    >
      {/* Status dot */}
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        {shouldAnimate && (
          <motion.span
            className={cn('absolute inline-flex h-full w-full rounded-full opacity-75', dot)}
            animate={{ scale: [1, 1.9, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden
          />
        )}
        <span className={cn('relative inline-flex h-1.5 w-1.5 rounded-full', dot)} />
      </span>

      <span className={text}>{children}</span>
    </span>
  );
}
