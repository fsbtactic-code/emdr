'use client';

import { type ReactNode } from 'react';
import { cn } from './cn';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  /** Centered label for a horizontal divider; ignored when vertical. */
  label?: ReactNode;
  className?: string;
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
      // block hr fills the container minus margins; w-full would ignore mx-* and overflow
      className={cn('border-0 border-t border-white/[0.06]', className)}
    />
  );
}
