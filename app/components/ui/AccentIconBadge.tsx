import type { ReactNode } from 'react';
import { cn } from './cn';
import { ACCENTS, RADIUS } from './tokens';
import type { AccentName } from './tokens';

type Size = 'sm' | 'md' | 'lg';
type Shape = 'square' | 'round';

const SIZE_CLASS: Record<Size, string> = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-14 h-14',
};

const ICON_SIZE_CLASS: Record<Size, string> = {
  sm: '[&>svg]:w-4 [&>svg]:h-4',
  md: '[&>svg]:w-5 [&>svg]:h-5',
  lg: '[&>svg]:w-7 [&>svg]:h-7',
};

export interface AccentIconBadgeProps {
  icon: ReactNode;
  accent: AccentName;
  size?: Size;
  shape?: Shape;
  className?: string;
}

export function AccentIconBadge({
  icon,
  accent,
  size = 'md',
  shape = 'square',
  className,
}: AccentIconBadgeProps) {
  const a = ACCENTS[accent];
  const radius = shape === 'round' ? RADIUS.full : RADIUS.md;

  return (
    <div
      className={cn(
        'flex items-center justify-center shrink-0 border',
        SIZE_CLASS[size],
        ICON_SIZE_CLASS[size],
        radius,
        a.fill,
        a.border,
        a.text,
        className,
      )}
    >
      {icon}
    </div>
  );
}
