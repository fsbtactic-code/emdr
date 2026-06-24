import type { ReactNode } from 'react';
import { cn } from './cn';
import { ACCENTS, RADIUS, TYPE } from './tokens';
import type { AccentName } from './tokens';

export interface InfoBannerProps {
  accent: AccentName;
  /** leading icon, rendered at 16px baseline */
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

// tonal info strip for disclaimers, privacy notices and hints.
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
