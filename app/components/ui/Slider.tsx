'use client';

import { useReducedMotion, motion } from 'framer-motion';
import { cn } from './cn';
import { ACCENTS, TYPE, COLORS, type AccentName } from './tokens';
import { SPRING_SNAPPY, reduceTransition } from './motion';

export interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  accent?: AccentName;
  /** suffix appended after the numeric display, e.g. 'Hz', 'ms' */
  unit?: string;
  description?: string;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

const ACCENT_HEX: Record<AccentName, string> = {
  primary: ACCENTS.primary.hex,
  success: ACCENTS.success.hex,
  danger:  ACCENTS.danger.hex,
  warn:    ACCENTS.warn.hex,
  calm:    ACCENTS.calm.hex,
  info:    ACCENTS.info.hex,
  white:   ACCENTS.white.hex,
};

export function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  accent = 'primary',
  unit,
  description,
  onChange,
  disabled = false,
  className,
}: SliderProps) {
  const reduced = useReducedMotion();
  const transition = reduceTransition(SPRING_SNAPPY, reduced);

  const fraction = max === min ? 0 : (value - min) / (max - min);
  const pct = `${Math.round(fraction * 100)}%`;
  const accentHex = ACCENT_HEX[accent];

  const labelId = `slider-label-${label.replace(/\s+/g, '-').toLowerCase()}`;
  const descId = description
    ? `slider-desc-${label.replace(/\s+/g, '-').toLowerCase()}`
    : undefined;

  return (
    <div className={cn('flex flex-col gap-2', disabled && 'opacity-50 pointer-events-none', className)}>
      <div className="flex items-center justify-between">
        <label id={labelId} className={TYPE.label}>
          {label}
        </label>
        <span
          className={cn(
            TYPE.mono,
            'text-[13px] font-medium text-white/75 tabular-nums select-none',
          )}
          aria-live="polite"
          aria-atomic="true"
        >
          {value}
          {unit && <span className="ml-0.5 text-[11px] text-white/40">{unit}</span>}
        </span>
      </div>

      <div className="relative flex items-center h-5 group">
        <div
          className={cn(
            'absolute inset-x-0 h-1.5 rounded-full',
            'bg-white/[0.06]',
          )}
        />

        <motion.div
          className="absolute left-0 h-1.5 rounded-full"
          style={{ width: pct, backgroundColor: accentHex, opacity: 0.75 }}
          animate={{ width: pct }}
          transition={transition}
        />

        {/* visual thumb only; the real thumb is the native input below */}
        <motion.div
          className={cn(
            'absolute w-4 h-4 rounded-full',
            'ring-1 ring-white/20',
            'shadow-[0_2px_8px_rgba(0,0,0,0.5)]',
            'pointer-events-none',
          )}
          style={{
            backgroundColor: accentHex,
            left: pct,
            x: '-50%',
          }}
          animate={{ left: pct }}
          transition={transition}
        />

        {/* transparent overlay; carries the actual interaction */}
        <input
          type="range"
          role="slider"
          aria-labelledby={labelId}
          aria-describedby={descId}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(Number(e.target.value))}
          className={cn(
            'absolute inset-0 w-full opacity-0 cursor-pointer',
            'focus-visible:outline-none',
            // focus ring lives on the sibling overlay below
          )}
          style={{ height: '100%' }}
        />

        {/* focus ring overlay, shown via :focus-within */}
        <div
          className={cn(
            'absolute inset-0 rounded-full',
            'ring-0 focus-within:ring-2 ring-indigo-500/30',
            'transition-shadow duration-150',
          )}
          aria-hidden
        />
      </div>

      {description && (
        <p id={descId} className={cn(TYPE.caption, 'text-white/35')}>
          {description}
        </p>
      )}
    </div>
  );
}
