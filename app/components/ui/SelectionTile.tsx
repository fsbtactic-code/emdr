'use client';

/**
 * SelectionTile - icon + label tile for selection grids.
 *
 * Used in SettingsPanel pattern/shape/ambient/bg grids and
 * SessionSettingsDrawer. Replaces the two independently-drifted
 * local Tile implementations with a single DS-canonical primitive.
 *
 * Active state: accent fill + tinted border + tinted text (from ACCENTS).
 * Inactive state: surface.base + border.base + text.secondary.
 * Hover state: surfaceHover.base on inactive; accent hover on active.
 * Focus ring: accent-tinted (never white).
 */

import * as React from 'react';
import { useReducedMotion, motion } from 'framer-motion';
import { cn } from './cn';
import { COLORS, ACCENTS, RADIUS, type AccentName } from './tokens';
import { SPRING_SNAPPY, reduceTransition } from './motion';

/* ------------------------------------------------------------------ */

export interface SelectionTileProps {
  /** Icon element rendered above the label. Use Lucide icons or any ReactNode. */
  icon: React.ReactNode;
  /** Short label rendered below the icon. Truncated on overflow. */
  label: string;
  /** Whether this tile is the currently selected option. */
  active: boolean;
  onClick: () => void;
  /** Accent colour used for the active state. Defaults to 'primary'. */
  accent?: AccentName;
  /**
   * Size variant:
   *   sm - compact tile (icon 16, label text-[11px], padding px-2 py-2)
   *   md - default tile (icon 20, label text-[12px], padding px-3 py-3)
   */
  size?: 'sm' | 'md';
  disabled?: boolean;
  className?: string;
}

/* ------------------------------------------------------------------ */

/** Per-accent focus-ring colour class. */
const FOCUS_RING: Record<AccentName, string> = {
  primary: 'focus-visible:ring-indigo-500/40',
  success:  'focus-visible:ring-emerald-500/40',
  danger:   'focus-visible:ring-rose-500/40',
  warn:     'focus-visible:ring-amber-500/40',
  calm:     'focus-visible:ring-violet-500/40',
  info:     'focus-visible:ring-cyan-500/40',
  white:    'focus-visible:ring-white/25',
};

/* ------------------------------------------------------------------ */

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
    /* Layout */
    'flex flex-col items-center justify-center gap-1.5',
    'min-w-0 w-full',
    isSm ? 'px-2 py-2'   : 'px-3 py-3',
    /* Radius - controls scale per DS */
    RADIUS.md,
    /* Border */
    'border',
    /* Transition */
    'transition-colors duration-150',
    /* Base typography */
    'select-none',
    /* Active vs inactive surface + border */
    active
      ? cn(a.fill, a.border)
      : cn(COLORS.surface.base, COLORS.border.base),
    /* Hover */
    !disabled && (active ? a.hover : COLORS.surfaceHover.base),
    /* Disabled */
    disabled && 'opacity-40 cursor-not-allowed',
    !disabled && 'cursor-pointer',
    /* Focus ring - accent tinted, never white */
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
      {/* Icon */}
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

      {/* Label */}
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
