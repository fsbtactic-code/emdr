'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { cn } from './cn';
import { ACCENTS, COLORS, RADIUS, SHADOW, TYPE, type AccentName } from './tokens';
import { cardPop, reduceVariants } from './motion';

export interface CardProps {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  trailing?: React.ReactNode;
  /** tints the icon and the selected fill, defaults to 'primary' */
  accent?: AccentName;
  selected?: boolean;
  disabled?: boolean;
  /** defaults to true */
  animate?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  /** set when title is not plain text */
  'aria-label'?: string;
  'aria-pressed'?: boolean;
  role?: React.AriaRole;
  children?: React.ReactNode;
}

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

    const baseBg = COLORS.surface.base;
    const hoverBg = COLORS.surfaceHover.base;

    const selectedBg = accentTokens.fill;
    const selectedBorder = accentTokens.border;
    const selectedIconText = accentTokens.text;

    const cardClasses = cn(
      'group w-full text-left',
      RADIUS.lg,
      'flex items-start gap-3 px-4 py-3.5',
      'border',
      'transition-all duration-200',
      // focus ring is accent-tinted rather than white
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-0',
      accent === 'primary' && 'focus-visible:ring-indigo-500/60',
      accent === 'success' && 'focus-visible:ring-emerald-500/60',
      accent === 'danger' && 'focus-visible:ring-rose-500/60',
      accent === 'warn' && 'focus-visible:ring-amber-500/60',
      accent === 'calm' && 'focus-visible:ring-violet-500/60',
      accent === 'info' && 'focus-visible:ring-cyan-500/60',
      accent === 'white' && 'focus-visible:ring-white/30',
      !selected && !disabled && baseBg,
      !selected && !disabled && hoverBg,
      !selected && !disabled && COLORS.border.base,
      !selected && !disabled && 'hover:shadow-lg',
      selected && selectedBg,
      selected && selectedBorder,
      disabled && COLORS.surface.subtle,
      disabled && COLORS.border.faint,
      disabled && 'opacity-50 cursor-not-allowed',
      !disabled && 'cursor-pointer',
      className,
    );

    const iconWrapperClasses = cn(
      'mt-0.5 flex-shrink-0 flex items-center justify-center w-8 h-8',
      RADIUS.sm,
      selected ? selectedIconText : COLORS.text.muted,
      selected ? 'bg-white/[0.06]' : 'bg-white/[0.03]',
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
        {icon != null && (
          <span className={iconWrapperClasses} aria-hidden="true">
            {icon}
          </span>
        )}

        <div className="min-w-0 flex-1">
          {title != null && <div className={titleClasses}>{title}</div>}
          {description != null && <div className={descClasses}>{description}</div>}
          {children}
        </div>

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
