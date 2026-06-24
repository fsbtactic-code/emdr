'use client';

import React, { useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { cn } from './cn';
import { COLORS, RADIUS, SHADOW, TYPE, Z } from './tokens';
import { fadeRise, reduceVariants, SPRING_SNAPPY } from './motion';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: TooltipSide;
  /** Pixel gap between trigger edge and tooltip. */
  gap?: number;
  /** Delay before showing, ms. */
  delay?: number;
  className?: string;
  disabled?: boolean;
}

// class-based offsets rather than inline transform strings, to keep tsc happy.
const SIDE_WRAPPER: Record<TooltipSide, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 pb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 pt-2',
  left: 'right-full top-1/2 -translate-y-1/2 pr-2',
  right: 'left-full top-1/2 -translate-y-1/2 pl-2',
};

/** Directional fade: tooltip slides FROM the opposite side toward trigger. */
const SIDE_VARIANTS: Record<TooltipSide, { hidden: object; visible: object; exit: object }> = {
  top: {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: SPRING_SNAPPY },
    exit: { opacity: 0, y: 4, transition: { duration: 0.12, ease: 'easeIn' } },
  },
  bottom: {
    hidden: { opacity: 0, y: -6 },
    visible: { opacity: 1, y: 0, transition: SPRING_SNAPPY },
    exit: { opacity: 0, y: -4, transition: { duration: 0.12, ease: 'easeIn' } },
  },
  left: {
    hidden: { opacity: 0, x: 6 },
    visible: { opacity: 1, x: 0, transition: SPRING_SNAPPY },
    exit: { opacity: 0, x: 4, transition: { duration: 0.12, ease: 'easeIn' } },
  },
  right: {
    hidden: { opacity: 0, x: -6 },
    visible: { opacity: 1, x: 0, transition: SPRING_SNAPPY },
    exit: { opacity: 0, x: -4, transition: { duration: 0.12, ease: 'easeIn' } },
  },
};

export function Tooltip({
  children,
  content,
  side = 'top',
  delay = 250,
  className,
  disabled = false,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();
  const tooltipId = useId();

  const show = () => {
    if (disabled || !content) return;
    timerRef.current = setTimeout(() => setOpen(true), delay);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(false);
  };

  const rawVariants = SIDE_VARIANTS[side];
  const variants: Variants = (reduced
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.15 } },
        exit: { opacity: 0, transition: { duration: 0.1 } },
      }
    : rawVariants) as Variants;

  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocusCapture={show}
      onBlurCapture={hide}
    >
      <span aria-describedby={open ? tooltipId : undefined}>{children}</span>

      <AnimatePresence>
        {open && (
          <span className={cn('pointer-events-none absolute z-[200]', SIDE_WRAPPER[side])}>
            <motion.span
              id={tooltipId}
              role="tooltip"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              className={cn(
                'inline-block whitespace-nowrap',
                RADIUS.sm,
                SHADOW.panel,
                'border',
                COLORS.border.base,
                'px-2.5 py-1.5',
                TYPE.caption,
                'text-white/80',
                className,
              )}
              style={{
                background: COLORS.bgRaised,
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                zIndex: Z.modal,
              }}
            >
              {content}
            </motion.span>
          </span>
        )}
      </AnimatePresence>
    </span>
  );
}

export default Tooltip;
