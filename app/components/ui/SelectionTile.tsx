'use client';

// icon + label tile for selection grids (settings panels, session drawer).

import * as React from 'react';
import { useReducedMotion, motion } from 'framer-motion';
import { cn } from './cn';
import { COLORS, ACCENTS, RADIUS, type AccentName } from './tokens';
import { SPRING_SNAPPY, reduceTransition } from './motion';

export interface SelectionTileProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  accent?: AccentName;
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
}

const FOCUS_RING: Record<AccentName, string> = {
  primary: 'focus-visible:ring-indigo-500/40',
  success:  'focus-visible:ring-emerald-500/40',
  danger:   'focus-visible:ring-rose-500/40',
  warn:     'focus-visible:ring-amber-500/40',
  calm:     'focus-visible:ring-violet-500/40',
  info:     'focus-visible:ring-cyan-500/40',
  white:    'focus-visible:ring-white/25',
};

export function SelectionTile({
  icon,
  label,
  active,
  onClick,
  accent = 'primary',
  size = 'md',
  disabled = false,
  className,
}: SelectionTileProps) {
  const reduced = useReducedMotion();
  const a = ACCENTS[accent];

  const isSm = size === 'sm';

  const baseClass = cn(
    'flex flex-col items-center justify-center gap-1.5',
    'min-w-0 w-full',
    isSm ? 'px-2 py-2'   : 'px-3 py-3',
    RADIUS.md,
    'border',
    'transition-colors duration-150',
    'select-none',
    active
      ? cn(a.fill, a.border)
      : cn(COLORS.surface.base, COLORS.border.base),
    !disabled && (active ? a.hover : COLORS.surfaceHover.base),
    disabled && 'opacity-40 cursor-not-allowed',
    !disabled && 'cursor-pointer',
    // accent-tinted ring, never white
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-transparent',
    FOCUS_RING[accent],
    className,
  );

  return (
    <motion.button
      type="button"
      role="radio"
      aria-checked={active}
      aria-pressed={active}
      disabled={disabled}
      onClick={() => !disabled && onClick()}
      className={baseClass}
      whileTap={!disabled && !reduced ? { scale: 0.94 } : undefined}
      transition={reduceTransition(SPRING_SNAPPY, reduced)}
    >
      <span
        aria-hidden
        className={cn(
          'flex-shrink-0 flex items-center justify-center',
          isSm ? 'w-4 h-4' : 'w-5 h-5',
          active ? a.text : COLORS.text.secondary,
          'transition-colors duration-150',
        )}
      >
        {icon}
      </span>

      <span
        className={cn(
          'w-full truncate text-center leading-tight font-medium',
          isSm ? 'text-[11px]' : 'text-[12px]',
          active ? a.text : COLORS.text.muted,
          'transition-colors duration-150',
        )}
      >
        {label}
      </span>
    </motion.button>
  );
}
