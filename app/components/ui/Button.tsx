'use client';

/**
 * Button - primary interactive primitive for the EMDR trainer.
 *
 * Variants: primary | secondary | ghost | danger | success | accent
 * Sizes: sm | md | lg
 * Optional leading/trailing icon, loading state with spinner,
 * disabled, active:scale feedback, focus-visible ring keyed to variant accent.
 */

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from './cn';
import { RADIUS } from './tokens';
import { SPRING_SNAPPY, reduceTransition } from './motion';

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'accent';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon rendered before the label. */
  iconLeft?: React.ReactNode;
  /** Icon rendered after the label. */
  iconRight?: React.ReactNode;
  /** Replaces content with a spinner and disables interaction. */
  loading?: boolean;
}

/* ------------------------------------------------------------------ */
/* Class maps                                                           */
/* ------------------------------------------------------------------ */

const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-indigo-500/15 text-indigo-200 border border-indigo-500/20',
    'hover:bg-indigo-500/25',
    'focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
  ),
  secondary: cn(
    'bg-white/[0.04] text-white/90 border border-white/[0.06]',
    'hover:bg-white/[0.07]',
    'focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
  ),
  ghost: cn(
    'bg-transparent text-white/60 border border-transparent',
    'hover:bg-white/[0.04] hover:text-white/90',
    'focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
  ),
  danger: cn(
    'bg-rose-500/15 text-rose-200 border border-rose-500/20',
    'hover:bg-rose-500/25',
    'focus-visible:ring-2 focus-visible:ring-rose-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
  ),
  success: cn(
    'bg-emerald-500/15 text-emerald-200 border border-emerald-500/20',
    'hover:bg-emerald-500/25',
    'focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
  ),
  accent: cn(
    'bg-violet-500/15 text-violet-100 border border-violet-500/20',
    'hover:bg-violet-500/25',
    'focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
  ),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-7 px-3 gap-1.5 text-[12px] font-medium tracking-wide',
  md: 'h-9 px-4 gap-2   text-[13px] font-medium',
  lg: 'h-11 px-5 gap-2.5 text-[14px] font-medium',
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-[18px]',
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'secondary',
      size = 'md',
      iconLeft,
      iconRight,
      loading = false,
      disabled,
      children,
      className,
      ...rest
    },
    ref,
  ) {
    const reduced = useReducedMotion();
    const isDisabled = disabled || loading;

    const transition = reduceTransition(SPRING_SNAPPY, reduced);

    return (
      <motion.button
        ref={ref}
        whileTap={isDisabled ? undefined : { scale: 0.98, transition }}
        disabled={isDisabled}
        className={cn(
          /* base layout */
          'relative inline-flex items-center justify-center select-none',
          'outline-none cursor-pointer',
          RADIUS.md,
          /* consistent transition for hover/focus */
          'transition-colors duration-150',
          /* variant and size */
          variantClasses[variant],
          sizeClasses[size],
          /* disabled / loading */
          isDisabled && 'opacity-40 cursor-not-allowed pointer-events-none',
          className,
        )}
        aria-disabled={isDisabled}
        aria-busy={loading}
        {...(rest as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {/* Loading spinner replaces icons when loading */}
        {loading ? (
          <Loader2
            className={cn(iconSizeClasses[size], 'animate-spin shrink-0')}
            strokeWidth={2}
            aria-hidden="true"
          />
        ) : (
          iconLeft && (
            <span className={cn(iconSizeClasses[size], 'shrink-0 flex items-center')} aria-hidden="true">
              {iconLeft}
            </span>
          )
        )}

        {/* Label - visually hidden when loading with no children fallback */}
        {children && (
          <span className={cn('truncate', loading && 'opacity-0 absolute')}>
            {children}
          </span>
        )}

        {!loading && iconRight && (
          <span className={cn(iconSizeClasses[size], 'shrink-0 flex items-center')} aria-hidden="true">
            {iconRight}
          </span>
        )}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
