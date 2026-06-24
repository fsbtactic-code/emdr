'use client';

/**
 * Chip / Pill - compact tag or toggle pill.
 *
 * Variants:
 *   neutral  - default quiet surface, used for read-only tags
 *   accent   - tinted with the given AccentName (selectable / active states)
 *
 * When selectable=true the chip behaves as a toggle button (role="checkbox").
 * When onClick is provided without selectable it behaves as a plain button.
 * Without either, it is a presentational span (role="status" for screen readers).
 */

import * as React from 'react';
import { useReducedMotion, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from './cn';
import { COLORS, ACCENTS, RADIUS, type AccentName } from './tokens';
import { SPRING_SNAPPY, reduceTransition } from './motion';

/* ------------------------------------------------------------------ */

export type ChipVariant = 'neutral' | 'accent';

export interface ChipProps {
  label: string;
  /** Icon element rendered before the label. Use Lucide icons, size 12-14. */
  icon?: React.ReactNode;
  variant?: ChipVariant;
  /** Accent key - effective when variant='accent'. Default 'primary'. */
  accent?: AccentName;
  /** Whether this chip acts as a toggle. */
  selectable?: boolean;
  selected?: boolean;
  /** Renders a remove (X) button. onRemove fires on click. */
  onRemove?: () => void;
  /** Click handler (or toggle handler if selectable). */
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

/* ------------------------------------------------------------------ */

const variantBase: Record<ChipVariant, string> = {
  neutral: cn(COLORS.surface.raised, 'border border-white/[0.06]', COLORS.text.secondary),
  accent: cn(COLORS.surface.raised, 'border border-white/[0.06]', COLORS.text.secondary),
};

const selectedStyles = (accent: AccentName): string => {
  const a = ACCENTS[accent];
  return cn(a.fill, 'border', a.border, a.text);
};

/* ------------------------------------------------------------------ */

export function Chip({
  label,
  icon,
  variant = 'neutral',
  accent = 'primary',
  selectable = false,
  selected = false,
  onRemove,
  onClick,
  disabled = false,
  className,
}: ChipProps) {
  const reduced = useReducedMotion();
  const isInteractive = selectable || !!onClick;
  const isSelected = selectable ? selected : false;

  const baseClass = cn(
    'inline-flex items-center gap-1 px-2.5 py-1',
    'text-[12px] font-medium leading-none',
    RADIUS.full,
    'transition-colors duration-150',
    'select-none',
    /* Base variant styles. */
    isSelected ? selectedStyles(accent) : variantBase[variant],
    /* Hover on unselected neutral chips. */
    isInteractive && !isSelected && !disabled && 'hover:bg-white/[0.06] hover:text-white/75',
    /* Hover on accent-selected chips. */
    isInteractive && isSelected && !disabled && ACCENTS[accent].hover,
    disabled && 'opacity-40 cursor-not-allowed',
    isInteractive && !disabled && 'cursor-pointer',
    /* Focus ring - accent tinted, not white ring. */
    isInteractive && 'focus-visible:outline-none focus-visible:ring-1',
    className,
  );

  const content = (
    <>
      {icon && (
        <span aria-hidden className="flex-shrink-0 opacity-80">
          {icon}
        </span>
      )}
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          disabled={disabled}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={cn(
            'ml-0.5 flex items-center justify-center',
            'rounded-full w-3.5 h-3.5 -mr-0.5',
            'opacity-50 hover:opacity-100 transition-opacity duration-100',
            disabled && 'pointer-events-none',
          )}
        >
          <X size={10} strokeWidth={2.5} />
        </button>
      )}
    </>
  );

  /* Presentational (no interactivity). */
  if (!isInteractive && !onRemove) {
    return (
      <span role="status" className={baseClass}>
        {content}
      </span>
    );
  }

  const motionProps = {
    whileTap: !disabled && !reduced
      ? { scale: 0.95 }
      : undefined,
    transition: reduceTransition(SPRING_SNAPPY, reduced),
  };

  if (selectable) {
    return (
      <motion.button
        type="button"
        role="checkbox"
        aria-checked={selected}
        disabled={disabled}
        onClick={() => !disabled && onClick?.()}
        className={baseClass}
        {...motionProps}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && onClick?.()}
      className={baseClass}
      {...motionProps}
    >
      {content}
    </motion.button>
  );
}
