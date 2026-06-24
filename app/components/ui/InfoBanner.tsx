import type { ReactNode } from 'react';
import { cn } from './cn';
import { ACCENTS, RADIUS, TYPE } from './tokens';
import type { AccentName } from './tokens';

export interface InfoBannerProps {
  /** Accent palette key: primary | success | danger | warn | calm | info | white */
  accent: AccentName;
  /** Optional leading icon slot. Rendered at 16px baseline; pass any ReactNode. */
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * InfoBanner - tonal info strip.
 *
 * Tonal fill + tinted border from the chosen ACCENTS key. Used for
 * disclaimers, privacy notices, connection-lost banners, and hints
 * wherever a light-weight contextual message is needed.
 *
 * All opacity values come from ACCENTS to keep surfaces consistent.
 * No arbitrary hex, no raw /10 /12 /15 scattered around call sites.
 */
export function InfoBanner({ accent, icon, children, className }: InfoBannerProps) {
  const a = ACCENTS[accent];

  return (
    <div
      className={cn(
        'flex items-start gap-2.5',
        'border',
        RADIUS.md,
        'px-3.5 py-2.5',
        a.fill,
        a.border,
        className,
      )}
    >
      {icon != null && (
        <span
          className={cn('mt-px shrink-0 leading-none', a.text)}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}
      <span className={cn(TYPE.bodyMuted, 'flex-1 min-w-0')}>
        {children}
      </span>
    </div>
  );
}
