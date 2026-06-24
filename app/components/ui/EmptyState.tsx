'use client';

// placeholder for empty session logs, empty protocol lists, no-results screens.

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from './cn';
import { COLORS, RADIUS, SHADOW, SPACING, TYPE, type AccentName, ACCENTS } from './tokens';
import { fadeRise, staggerContainer, reduceVariants } from './motion';

export interface EmptyStateProps {
  /** Icon element; sizing is applied by the disc, do not pre-size it. */
  icon?: React.ReactNode;
  heading: string;
  description?: string;
  action?: React.ReactNode;
  /** Colors the icon disc. */
  accent?: AccentName;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_PADDING: Record<'sm' | 'md' | 'lg', string> = {
  sm: `py-8 px-${SPACING.lg}`,
  md: `py-12 px-${SPACING.xl}`,
  lg: `py-16 px-${SPACING.xxl}`,
};

const ICON_DISC_SIZE: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-14 h-14',
};

const ICON_SCALE: Record<'sm' | 'md' | 'lg', string> = {
  sm: '[&>svg]:w-4 [&>svg]:h-4',
  md: '[&>svg]:w-5 [&>svg]:h-5',
  lg: '[&>svg]:w-6 [&>svg]:h-6',
};

const HEADING_SIZE: Record<'sm' | 'md' | 'lg', string> = {
  sm: TYPE.headingSm,
  md: TYPE.headingSm,
  lg: TYPE.heading,
};

export function EmptyState({
  icon,
  heading,
  description,
  action,
  accent = 'primary',
  size = 'md',
  className,
}: EmptyStateProps) {
  const reduced = useReducedMotion();
  const accentRole = ACCENTS[accent];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={reduceVariants(staggerContainer, reduced)}
      className={cn(
        'flex flex-col items-center justify-center text-center',
        SIZE_PADDING[size],
        className,
      )}
      aria-live="polite"
    >
      {icon && (
        <motion.div
          variants={reduceVariants(fadeRise, reduced)}
          className={cn(
            'mb-4 flex items-center justify-center',
            ICON_DISC_SIZE[size],
            ICON_SCALE[size],
            RADIUS.lg,
            'border',
            accentRole.border,
            accentRole.fill,
            accentRole.text,
          )}
          aria-hidden="true"
        >
          {icon}
        </motion.div>
      )}

      <motion.h3
        variants={reduceVariants(fadeRise, reduced)}
        className={cn(
          HEADING_SIZE[size],
          'mb-1 text-white/90',
        )}
      >
        {heading}
      </motion.h3>

      {description && (
        <motion.p
          variants={reduceVariants(fadeRise, reduced)}
          className={cn(
            TYPE.bodyMuted,
            'max-w-xs',
            action ? 'mb-5' : '',
          )}
        >
          {description}
        </motion.p>
      )}

      {action && (
        <motion.div
          variants={reduceVariants(fadeRise, reduced)}
          className="flex items-center justify-center"
        >
          {action}
        </motion.div>
      )}
    </motion.div>
  );
}

// EmptyState wrapped in a surface card, for when it sits inside a panel
// that already has its own background.

export interface EmptyStateCardProps extends EmptyStateProps {
  shadow?: boolean;
}

export function EmptyStateCard({ shadow = true, className, ...rest }: EmptyStateCardProps) {
  return (
    <div
      className={cn(
        COLORS.surface.base,
        'border',
        COLORS.border.faint,
        RADIUS.lg,
        shadow ? SHADOW.panel : '',
        className,
      )}
    >
      <EmptyState {...rest} />
    </div>
  );
}

export default EmptyState;
