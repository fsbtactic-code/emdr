'use client';

import { type ElementType, type ReactNode } from 'react';
import { cn } from './cn';
import { TYPE, ACCENTS, type AccentName } from './tokens';

type IconComponent = ElementType<{ size?: number; strokeWidth?: number; className?: string }>;

export interface SectionLabelProps {
  children: ReactNode;
  icon?: IconComponent;
  /** Tints label text and icon; defaults to muted text-white/45 when omitted. */
  accent?: AccentName;
  className?: string;
}

export function SectionLabel({ children, icon: Icon, accent, className }: SectionLabelProps) {
  const accentText = accent ? ACCENTS[accent].text : null;

  return (
    <div
      className={cn(
        'flex items-center gap-1.5',
        TYPE.label,
        accentText,
        className,
      )}
    >
      {Icon && (
        <Icon
          size={11}
          strokeWidth={2}
          className={cn('shrink-0', accentText ?? 'text-white/35')}
        />
      )}
      <span>{children}</span>
    </div>
  );
}
