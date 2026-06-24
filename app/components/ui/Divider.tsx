'use client';

/**
 * Divider
 *
 * Hairline separator, horizontal or vertical. Optionally shows a small
 * centered label (text or ReactNode) for titled section breaks.
 * The line color follows COLORS.border.base (border-white/[0.06]).
 */

import { type ReactNode } from 'react';
import { cn } from './cn';

export interface DividerProps {
  /** Layout axis. Defaults to 'horizontal'. */
  orientation?: 'horizontal' | 'vertical';
  /**
   * Optional label rendered in the center of a horizontal divider.
   * Ignored for vertical dividers.
   */
  label?: ReactNode;
  /** Additional className fragments applied to the root element. */
  className?: string;
  /** aria-orientation forwarded for screen readers. */
  'aria-orientation'?: 'horizontal' | 'vertical';
}

const LINE_H = 'border-t border-white/[0.06]';
const LINE_V = 'border-l border-white/[0.06] self-stretch';

export function Divider({
  orientation = 'horizontal',
  label,
  className,
}: DividerProps) {
  if (orientation === 'vertical') {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        className={cn(LINE_V, 'shrink-0', className)}
      />
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn('flex items-center gap-3', className)}
      >
        <span className={cn('flex-1', LINE_H)} />
        <span className="text-[11px] uppercase tracking-[0.14em] font-medium text-white/30 select-none whitespace-nowrap">
          {label}
        </span>
        <span className={cn('flex-1', LINE_H)} />
      </div>
    );
  }

  return (
    <hr
      role="separator"
      aria-orientation="horizontal"
      className={cn('border-0 border-t border-white/[0.06] w-full', className)}
    />
  );
}
