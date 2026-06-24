'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from './cn';
import { RADIUS } from './tokens';
import { SPRING_SNAPPY, reduceTransition } from './motion';

export type IconButtonVariant =
  | 'default'
  | 'ghost'
  | 'primary'
  | 'danger'
  | 'success'
  | 'accent';

export type IconButtonSize = 'sm' | 'md' | 'lg';

export type IconButtonShape = 'square' | 'round';

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** required: also used as the native title */
  'aria-label': string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  shape?: IconButtonShape;
  active?: boolean;
  children: React.ReactNode;
}

const variantClasses: Record<IconButtonVariant, string> = {
  default: cn(
    'bg-white/[0.04] text-white/60 border border-white/[0.06]',
    'hover:bg-white/[0.07] hover:text-white/90',
    'focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
  ),
  ghost: cn(
    'bg-transparent text-white/45 border border-transparent',
    'hover:bg-white/[0.04] hover:text-white/75',
    'focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
  ),
  primary: cn(
    'bg-indigo-500/15 text-indigo-200 border border-indigo-500/20',
    'hover:bg-indigo-500/25',
    'focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
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

// active state uses an accent fill, not a white ring
const activeClasses: Record<IconButtonVariant, string> = {
  default: 'bg-white/[0.08] text-white/90 border-white/12',
  ghost: 'bg-white/[0.06] text-white/90 border-white/[0.06]',
  primary: 'bg-indigo-500/25 text-indigo-100 border-indigo-500/30',
  danger: 'bg-rose-500/25 text-rose-100 border-rose-500/30',
  success: 'bg-emerald-500/25 text-emerald-100 border-emerald-500/30',
  accent: 'bg-violet-500/25 text-violet-100 border-violet-500/30',
};

const sizeClasses: Record<IconButtonSize, string> = {
  sm: 'size-7',
  md: 'size-9',
  lg: 'size-11',
};

const iconSizeClasses: Record<IconButtonSize, string> = {
  sm: 'size-3.5',
  md: 'size-4',
  lg: 'size-[18px]',
};

const shapeClasses: Record<IconButtonShape, string> = {
  square: RADIUS.md,
  round: RADIUS.full,
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  function IconButton(
    {
      'aria-label': ariaLabel,
      variant = 'default',
      size = 'md',
      shape = 'square',
      active = false,
      disabled,
      children,
      className,
      ...rest
    },
    ref,
  ) {
    const reduced = useReducedMotion();
    const transition = reduceTransition(SPRING_SNAPPY, reduced);

    return (
      <motion.button
        ref={ref}
        whileTap={disabled ? undefined : { scale: 0.94, transition }}
        disabled={disabled}
        aria-label={ariaLabel}
        title={ariaLabel}
        aria-pressed={active}
        className={cn(
          'relative inline-flex items-center justify-center shrink-0',
          'outline-none cursor-pointer select-none',
          'transition-colors duration-150',
          shapeClasses[shape],
          sizeClasses[size],
          variantClasses[variant],
          active && activeClasses[variant],
          disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
          className,
        )}
        aria-disabled={disabled}
        {...(rest as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        <span
          className={cn(
            iconSizeClasses[size],
            'flex items-center justify-center [&>svg]:w-full [&>svg]:h-full',
          )}
          aria-hidden="true"
        >
          {children}
        </span>
      </motion.button>
    );
  },
);

IconButton.displayName = 'IconButton';
