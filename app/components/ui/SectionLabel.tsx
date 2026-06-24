'use client';

/**
 * SectionLabel
 *
 * Small uppercase tracking label used to head a section of the UI.
 * Optional leading icon (lucide-react), optional accent color override.
 * Defaults to the canonical TYPE.label treatment (white/45, 11px, tracking-wide).
 */

import { type ElementType, type ReactNode } from 'react';
import { cn } from './cn';
import { TYPE, ACCENTS, type AccentName } from './tokens';

// Lucide icon component shape (we accept any icon as a generic component)
type IconComponent = ElementType<{ size?: number; strokeWidth?: number; className?: string }>;

export interface SectionLabelProps {
  /** The label text. */
  children: ReactNode;
  /** Optional lucide-react icon rendered before the text. */
  icon?: IconComponent;
  /**
   * Optional accent color name to tint the label text and icon.
   * When omitted the default muted text-white/45 applies.
   */
  accent?: AccentName;
  /** Additional className fragments. */
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
