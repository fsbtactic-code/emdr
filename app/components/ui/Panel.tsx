'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { cn } from './cn';
import { COLORS, RADIUS, SHADOW, TYPE } from './tokens';
import { fadeRise, reduceVariants, SPRING } from './motion';

type PanelVariant = 'base' | 'raised' | 'strong';

export interface PanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** background fill intensity: base resting, raised, strong for active panels */
  variant?: PanelVariant;
  title?: React.ReactNode;
  description?: React.ReactNode;
  headerTrailing?: React.ReactNode;
  /** drop default padding for panels whose children supply their own */
  noPadding?: boolean;
  /** drop the header-to-body border when there is no header */
  noBorder?: boolean;
  /** defaults to true */
  animate?: boolean;
}

const VARIANT_BG: Record<PanelVariant, string> = {
  base: COLORS.surface.base,
  raised: COLORS.surface.raised,
  strong: COLORS.surface.strong,
};

export const Panel = React.forwardRef<HTMLDivElement, PanelProps>(
  function Panel(
    {
      variant = 'base',
      title,
      description,
      headerTrailing,
      noPadding = false,
      noBorder = false,
      animate = true,
      className,
      children,
      ...rest
    },
    ref,
  ) {
    const reduced = useReducedMotion();
    const hasHeader = title != null || description != null || headerTrailing != null;

    const rootClasses = cn(
      RADIUS.lg,
      VARIANT_BG[variant],
      'border',
      COLORS.border.base,
      SHADOW.panel,
      // clip children to the rounded corners
      'overflow-hidden',
      className,
    );

    const inner = (
      <div ref={ref} className={rootClasses} {...rest}>
        {hasHeader && (
          <div
            className={cn(
              'flex items-start justify-between gap-4 px-5 py-4',
              !noBorder && 'border-b',
              !noBorder && COLORS.border.faint,
            )}
          >
            <div className="min-w-0 flex-1">
              {title != null && (
                <div className={cn(TYPE.headingSm, 'leading-snug')}>{title}</div>
              )}
              {description != null && (
                <div className={cn(TYPE.bodyMuted, 'mt-0.5')}>{description}</div>
              )}
            </div>
            {headerTrailing != null && (
              <div className="flex-shrink-0">{headerTrailing}</div>
            )}
          </div>
        )}

        <div className={noPadding ? undefined : 'p-5'}>{children}</div>
      </div>
    );

    if (!animate) return inner;

    return (
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={reduceVariants(fadeRise, reduced)}
        transition={SPRING}
      >
        {inner}
      </motion.div>
    );
  },
);

Panel.displayName = 'Panel';
