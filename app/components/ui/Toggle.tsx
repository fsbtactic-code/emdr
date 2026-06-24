'use client';

import { useReducedMotion, motion } from 'framer-motion';
import { cn } from './cn';
import { ACCENTS, TYPE, COLORS, RADIUS, type AccentName } from './tokens';
import { SPRING_SNAPPY, reduceTransition } from './motion';

export interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  accent?: AccentName;
  disabled?: boolean;
  className?: string;
}

const TRACK_FILL: Partial<Record<AccentName, string>> = {
  primary: 'bg-indigo-500/80',
  success:  'bg-emerald-500/80',
  danger:   'bg-rose-500/80',
  warn:     'bg-amber-500/75',
  calm:     'bg-violet-500/80',
  info:     'bg-cyan-500/80',
  white:    'bg-white/80',
};

export function Toggle({
  label,
  checked,
  onChange,
  description,
  accent = 'primary',
  disabled = false,
  className,
}: ToggleProps) {
  const reduced = useReducedMotion();
  const transition = reduceTransition(SPRING_SNAPPY, reduced);

  const trackOn = TRACK_FILL[accent] ?? 'bg-indigo-500/80';
  const switchId = `toggle-${label.replace(/\s+/g, '-').toLowerCase()}`;
  const descId = description
    ? `toggle-desc-${label.replace(/\s+/g, '-').toLowerCase()}`
    : undefined;

  return (
    <div
      className={cn(
        'flex items-start justify-between gap-3',
        disabled && 'opacity-50 pointer-events-none',
        className,
      )}
    >
      <div className="flex flex-col gap-0.5 min-w-0">
        <label
          htmlFor={switchId}
          className={cn('text-[13px] font-medium text-white/80 cursor-pointer select-none leading-snug')}
        >
          {label}
        </label>
        {description && (
          <p id={descId} className={cn(TYPE.caption, 'text-white/40 leading-snug')}>
            {description}
          </p>
        )}
      </div>

      <button
        id={switchId}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-describedby={descId}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative flex-shrink-0 inline-flex items-center',
          'w-10 h-6 rounded-full',
          'border border-white/[0.06]',
          'transition-colors duration-200',
          checked ? trackOn : 'bg-white/[0.06]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'focus-visible:ring-offset-transparent',
          checked
            ? 'focus-visible:ring-indigo-500/40'
            : 'focus-visible:ring-white/20',
          'cursor-pointer',
        )}
      >
        <motion.span
          className={cn(
            'absolute top-0.5 left-0.5',
            'w-5 h-5 rounded-full bg-white',
            'shadow-[0_1px_4px_rgba(0,0,0,0.35)]',
          )}
          animate={{ x: checked ? 16 : 0 }}
          transition={transition}
          aria-hidden
        />
        <span className="sr-only">{checked ? 'On' : 'Off'}</span>
      </button>
    </div>
  );
}
