'use client';

import React, { forwardRef, useId } from 'react';
import { cn } from './cn';
import { TYPE, COLORS, RADIUS, type AccentName } from './tokens';

type FieldElement = HTMLInputElement | HTMLTextAreaElement;

interface FieldBaseProps {
  label?: string;
  /** helper text below the input; hidden when error is present */
  hint?: string;
  /** when truthy, hint is suppressed and the error is shown instead */
  error?: string;
  accent?: AccentName;
  className?: string;
}

/* discriminated union so `as` picks which ref / prop types apply */
export type FieldProps =
  | (FieldBaseProps &
      React.InputHTMLAttributes<HTMLInputElement> & {
        as?: 'input';
      })
  | (FieldBaseProps &
      React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
        as: 'textarea';
      });

const FOCUS_RING: Partial<Record<AccentName, string>> = {
  primary: 'focus:ring-indigo-500/30 focus:border-indigo-500/30',
  success:  'focus:ring-emerald-500/25 focus:border-emerald-500/30',
  danger:   'focus:ring-rose-500/25 focus:border-rose-500/30',
  warn:     'focus:ring-amber-500/25 focus:border-amber-500/30',
  calm:     'focus:ring-violet-500/25 focus:border-violet-500/30',
  info:     'focus:ring-cyan-500/25 focus:border-cyan-500/30',
  white:    'focus:ring-white/15 focus:border-white/20',
};

function inputCn(accent: AccentName, hasError: boolean, extraCn?: string): string {
  const ring = FOCUS_RING[accent] ?? FOCUS_RING.primary!;
  return cn(
    'w-full bg-white/[0.04] text-white/90 placeholder-white/25',
    'border border-white/[0.06]',
    'rounded-xl px-3 py-2.5',
    'text-[13px] leading-relaxed',
    'outline-none ring-0',
    'transition-all duration-150',
    'focus:bg-white/[0.06]',
    ring,
    'focus:ring-2',
    hasError && 'border-rose-500/40 focus:ring-rose-500/30 focus:border-rose-500/40',
    'disabled:opacity-45 disabled:cursor-not-allowed',
    extraCn,
  );
}

export const Field = forwardRef<FieldElement, FieldProps>(
  function Field(props, ref) {
    const {
      label,
      hint,
      error,
      accent = 'primary',
      className,
      as: asTag = 'input',
      ...rest
    } = props;

    const uid = useId();
    const inputId = `field-${uid}`;
    const hintId  = `field-hint-${uid}`;
    const errId   = `field-err-${uid}`;

    const hasError = Boolean(error);
    const describedBy = cn(
      hasError ? errId : null,
      !hasError && hint ? hintId : null,
    ) || undefined;

    const sharedProps = {
      id: inputId,
      'aria-describedby': describedBy,
      'aria-invalid': hasError || undefined,
    };

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label htmlFor={inputId} className={TYPE.label}>
            {label}
          </label>
        )}

        {asTag === 'textarea' ? (
          <textarea
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
            {...sharedProps}
            className={inputCn(accent, hasError, 'resize-y min-h-[80px]')}
          />
        ) : (
          <input
            ref={ref as React.Ref<HTMLInputElement>}
            {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
            {...sharedProps}
            className={inputCn(accent, hasError)}
          />
        )}

        {hasError ? (
          <p id={errId} role="alert" className="text-[12px] text-rose-300/80 leading-snug">
            {error}
          </p>
        ) : hint ? (
          <p id={hintId} className={cn(TYPE.caption, 'text-white/35 leading-snug')}>
            {hint}
          </p>
        ) : null}
      </div>
    );
  },
);

Field.displayName = 'Field';
