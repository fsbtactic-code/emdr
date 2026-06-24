'use client';

/**
 * SegmentedControl - mutually exclusive option group.
 *
 * Active option gets a translucent accent fill (no white ring).
 * Used for pattern selection, session mode, and form option groups.
 * Supports all AccentName keys from tokens.ts.
 */

import { useReducedMotion, motion, AnimatePresence } from 'framer-motion';
import { cn } from './cn';
import { COLORS, ACCENTS, RADIUS, TYPE, type AccentName } from './tokens';
import { SPRING_SNAPPY, reduceTransition } from './motion';

/* ------------------------------------------------------------------ */

export interface SegmentedOption<T extends string = string> {
  value: T;
  label: string;
  /** Optional icon rendered before the label. */
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Visual accent for the active thumb. Defaults to 'primary'. */
  accent?: AccentName;
  /** Full-width stretches each segment equally. Default false. */
  fullWidth?: boolean;
  /** ARIA label for the group. */
  'aria-label'?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  accent = 'primary',
  fullWidth = false,
  'aria-label': ariaLabel,
  className,
}: SegmentedControlProps<T>) {
  const reduced = useReducedMotion();
  const a = ACCENTS[accent];

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        'relative flex items-center gap-0.5 p-0.5',
        COLORS.surface.base,
        RADIUS.md,
        'border border-white/[0.06]',
        fullWidth && 'w-full',
        className,
      )}
    >
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={opt.disabled}
            onClick={() => !opt.disabled && onChange(opt.value)}
            className={cn(
              'relative flex items-center justify-center gap-1.5 px-3 py-1.5',
              'text-[13px] font-medium select-none transition-colors duration-150',
              RADIUS.sm,
              fullWidth && 'flex-1',
              /* Active text always uses accent tint. */
              isActive ? a.text : COLORS.text.muted,
              /* Hover on inactive items. */
              !isActive && !opt.disabled && 'hover:text-white/70',
              opt.disabled && 'opacity-40 cursor-not-allowed',
              !opt.disabled && 'cursor-pointer',
              /* Focus-visible ring uses accent color, not white. */
              'focus-visible:outline-none',
              isActive
                ? 'focus-visible:ring-1 focus-visible:ring-offset-0'
                : 'focus-visible:ring-1 focus-visible:ring-white/20',
            )}
            style={
              isActive
                ? { '--tw-ring-color': ACCENTS[accent].hex } as React.CSSProperties
                : undefined
            }
          >
            {/* Animated fill thumb. */}
            <AnimatePresence initial={false}>
              {isActive && (
                <motion.span
                  key="thumb"
                  layoutId="seg-thumb"
                  aria-hidden
                  className={cn(
                    'absolute inset-0',
                    RADIUS.sm,
                    a.fill,
                    'border',
                    a.border,
                  )}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={
                    reduceTransition(
                      { ...SPRING_SNAPPY, layout: true } as never,
                      reduced,
                    )
                  }
                />
              )}
            </AnimatePresence>

            {/* Content above the thumb. */}
            <span className="relative flex items-center gap-1.5 z-10">
              {opt.icon && (
                <span className="opacity-80 flex-shrink-0">{opt.icon}</span>
              )}
              <span>{opt.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
