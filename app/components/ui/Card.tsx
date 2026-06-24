'use client';

/**
 * Card - interactive selection card for the EMDR trainer UI.
 *
 * Used for mode / exercise choosers. Renders as a button with optional
 * icon, title, description, and trailing slot. Selected state uses an
 * accent fill (NOT a white ring). Hover uses a soft translucent lift.
 *
 * Usage:
 *   <Card title="Bilateral Stimulation" description="Eye movement track" onClick={...} />
 *   <Card icon={<Eye />} title="Visual" accent="calm" selected onClick={...} />
 *   <Card title="Session Log" trailing={<ChevronRight />} onClick={...} />
 */

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { cn } from './cn';
import { ACCENTS, COLORS, RADIUS, SHADOW, TYPE, type AccentName } from './tokens';
import { cardPop, reduceVariants } from './motion';

/* ------------------------------------------------------------------ *
 * Types
 * ------------------------------------------------------------------ */

export interface CardProps {
  /** Optional leading icon (lucide-react element recommended). */
  icon?: React.ReactNode;
  /** Primary label. */
  title?: React.ReactNode;
  /** Secondary descriptor below the title. */
  description?: React.ReactNode;
  /** Trailing slot (arrow icon, badge, count). */
  trailing?: React.ReactNode;
  /**
   * Accent used for icon tinting and selected state fill.
   * Defaults to 'primary' (indigo).
   */
  accent?: AccentName;
  /** Whether this card is currently selected / active. */
  selected?: boolean;
  /** Disable the card (visually muted, not interactive). */
  disabled?: boolean;
  /** Animate entrance with cardPop. Defaults to true. */
  animate?: boolean;
  /** Click handler (the element renders as a button when onClick is provided). */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** Additional className merged onto the root element. */
  className?: string;
  /** aria-label for accessibility when title is not plain text. */
  'aria-label'?: string;
  /** Additional aria attributes forwarded to the button. */
  'aria-pressed'?: boolean;
  /** Custom role override if needed. */
  role?: React.AriaRole;
  children?: React.ReactNode;
}

/* ------------------------------------------------------------------ *
 * Component
 * ------------------------------------------------------------------ */

export const Card = React.forwardRef<HTMLButtonElement, CardProps>(
  function Card(
    {
      icon,
      title,
      description,
      trailing,
      accent = 'primary',
      selected = false,
      disabled = false,
      animate = true,
      onClick,
      className,
      children,
      'aria-label': ariaLabel,
      'aria-pressed': ariaPressed,
      role,
      ...rest
    },
    ref,
  ) {
    const reduced = useReducedMotion();
    const accentTokens = ACCENTS[accent];

    // Base resting surface
    const baseBg = COLORS.surface.base;
    // Hover surface lift (no accent)
    const hoverBg = COLORS.surfaceHover.base;

    // Selected: accent fill + accent border
    const selectedBg = accentTokens.fill;
    const selectedBorder = accentTokens.border;
    const selectedIconText = accentTokens.text;

    const cardClasses = cn(
      // Reset button defaults
      'group w-full text-left',
      // Shape
      RADIUS.lg,
      // Layout
      'flex items-start gap-3 px-4 py-3.5',
      // Border
      'border',
      // Transition
      'transition-all duration-200',
      // Focus ring (accent-tinted, not white)
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0',
      // Ring color from accent
      accent === 'primary' && 'focus-visible:ring-indigo-500/60',
      accent === 'success' && 'focus-visible:ring-emerald-500/60',
      accent === 'danger' && 'focus-visible:ring-rose-500/60',
      accent === 'warn' && 'focus-visible:ring-amber-500/60',
      accent === 'calm' && 'focus-visible:ring-violet-500/60',
      accent === 'info' && 'focus-visible:ring-cyan-500/60',
      accent === 'white' && 'focus-visible:ring-white/30',
      // State: idle vs selected
      !selected && !disabled && baseBg,
      !selected && !disabled && hoverBg,
      !selected && !disabled && COLORS.border.base,
      !selected && !disabled && 'hover:shadow-lg',
      selected && selectedBg,
      selected && selectedBorder,
      // Disabled
      disabled && COLORS.surface.subtle,
      disabled && COLORS.border.faint,
      disabled && 'opacity-50 cursor-not-allowed',
      !disabled && 'cursor-pointer',
      className,
    );

    const iconWrapperClasses = cn(
      'mt-0.5 flex-shrink-0 flex items-center justify-center w-8 h-8',
      RADIUS.sm,
      // Icon tint
      selected ? selectedIconText : COLORS.text.muted,
      // Icon bg
      selected ? 'bg-white/[0.06]' : 'bg-white/[0.03]',
      // Transition
      'transition-colors duration-200',
    );

    const titleClasses = cn(
      TYPE.headingSm,
      'leading-snug',
      selected ? 'text-white' : COLORS.text.primary,
      'transition-colors duration-200',
    );

    const descClasses = cn(
      TYPE.bodyMuted,
      'mt-0.5',
      selected ? 'text-white/70' : undefined,
      'transition-colors duration-200',
    );

    const cardBody = (
      <>
        {/* Leading icon */}
        {icon != null && (
          <span className={iconWrapperClasses} aria-hidden="true">
            {icon}
          </span>
        )}

        {/* Text content */}
        <div className="min-w-0 flex-1">
          {title != null && <div className={titleClasses}>{title}</div>}
          {description != null && <div className={descClasses}>{description}</div>}
          {children}
        </div>

        {/* Trailing slot */}
        {trailing != null && (
          <div
            className={cn(
              'flex-shrink-0 mt-0.5',
              COLORS.text.faint,
              'group-hover:text-white/40 transition-colors duration-200',
            )}
            aria-hidden="true"
          >
            {trailing}
          </div>
        )}
      </>
    );

    const button = (
      <button
        ref={ref}
        type="button"
        className={cardClasses}
        onClick={onClick}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-pressed={ariaPressed ?? selected}
        role={role}
        {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {cardBody}
      </button>
    );

    if (!animate) return button;

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={reduceVariants(cardPop, reduced)}
      >
        {button}
      </motion.div>
    );
  },
);

Card.displayName = 'Card';
