'use client';

/**
 * Panel - glassy container surface for the EMDR trainer UI.
 *
 * A semi-transparent dark surface with a hairline border, soft panel shadow,
 * and an optional header slot. Calm, clinical-wellness aesthetic. No bright
 * white rings, no pure-black shadows.
 *
 * Usage:
 *   <Panel>content</Panel>
 *   <Panel title="Settings" description="Adjust session parameters">...</Panel>
 *   <Panel variant="raised" noPadding>...</Panel>
 */

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { cn } from './cn';
import { COLORS, RADIUS, SHADOW, TYPE } from './tokens';
import { fadeRise, reduceVariants, SPRING } from './motion';

/* ------------------------------------------------------------------ *
 * Types
 * ------------------------------------------------------------------ */

type PanelVariant = 'base' | 'raised' | 'strong';

export interface PanelProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Elevation variant. Controls background fill intensity.
   * - base: default resting surface (bg-white/0.03)
   * - raised: slightly lifted (bg-white/0.04)
   * - strong: active / prominent panel (bg-white/0.06)
   */
  variant?: PanelVariant;
  /** Optional panel title rendered in the header slot. */
  title?: React.ReactNode;
  /** Optional subtitle / description below the title. */
  description?: React.ReactNode;
  /** Optional element pinned to the right of the header (badge, icon-button). */
  headerTrailing?: React.ReactNode;
  /** Remove default padding (useful for panels whose children supply their own). */
  noPadding?: boolean;
  /** Remove the top border separating header from body (when no header is used). */
  noBorder?: boolean;
  /** Animate entrance with fadeRise. Defaults to true. */
  animate?: boolean;
}

/* ------------------------------------------------------------------ *
 * Variant tables
 * ------------------------------------------------------------------ */

const VARIANT_BG: Record<PanelVariant, string> = {
  base: COLORS.surface.base,
  raised: COLORS.surface.raised,
  strong: COLORS.surface.strong,
};

/* ------------------------------------------------------------------ *
 * Component
 * ------------------------------------------------------------------ */

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
      // Shape
      RADIUS.lg,
      // Surface
      VARIANT_BG[variant],
      // Border - hairline, never bright
      'border',
      COLORS.border.base,
      // Shadow
      SHADOW.panel,
      // Overflow for corner-clipping
      'overflow-hidden',
      className,
    );

    const inner = (
      <div ref={ref} className={rootClasses} {...rest}>
        {/* Header slot */}
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

        {/* Body */}
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
