'use client';

/**
 * PhaseRail - vertical step/phase navigator for the EMDR session console.
 *
 * A continuous spine runs through the centre of every node; the portion up to
 * the current phase is tinted to read as progress. Node states:
 *   empty    - not visited yet (faint hollow ring)
 *   has-data - started but not complete (ring with a muted core)
 *   current  - active phase (accent fill, soft glow, row highlight)
 *   done     - completed (emerald check)
 *
 * Clicking a phase calls onJump (the practitioner can move non-linearly).
 *
 * Usage:
 *   <PhaseRail phases={phases} currentIndex={idx} onJump={setIdx} />
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from './cn';
import { ACCENTS, TYPE, Z } from './tokens';
import { reduceVariants, SPRING } from './motion';

/* ------------------------------------------------------------------ */

export type PhaseStatus = 'empty' | 'has-data' | 'current' | 'done';

export interface PhaseItem {
  /** Display name of the phase. */
  name: string;
  /** Optional short label (defaults to index + 1). */
  label?: string;
  /** Status of this phase. */
  status: PhaseStatus;
}

export interface PhaseRailProps {
  phases: PhaseItem[];
  /** Index of the currently active phase (0-based). */
  currentIndex: number;
  /** Called when the user clicks a phase step. */
  onJump: (index: number) => void;
  /** Accent used for the current phase. Default: 'primary'. */
  accent?: keyof typeof ACCENTS;
  /** Extra class on the root element. */
  className?: string;
}

/* ------------------------------------------------------------------ */

function PhaseDot({ status, accentHex }: { status: PhaseStatus; accentHex: string }) {
  if (status === 'done') {
    return (
      <span
        aria-hidden
        className="relative z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-emerald-500/20 ring-1 ring-inset ring-emerald-400/40"
      >
        <Check size={10} strokeWidth={2.75} className="text-emerald-300" />
      </span>
    );
  }
  if (status === 'current') {
    return (
      <span
        aria-hidden
        className="relative z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full"
        style={{ backgroundColor: `${accentHex}26`, boxShadow: `0 0 0 1.5px ${accentHex}, 0 0 12px ${accentHex}66` }}
      >
        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: accentHex }} />
      </span>
    );
  }
  if (status === 'has-data') {
    return (
      <span
        aria-hidden
        className="relative z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full ring-1 ring-inset ring-white/20"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
      </span>
    );
  }
  // empty
  return (
    <span
      aria-hidden
      className="relative z-10 block h-[18px] w-[18px] rounded-full ring-1 ring-inset ring-white/10"
    />
  );
}

/* ------------------------------------------------------------------ */

const itemVariant = {
  hidden: { opacity: 0, x: -6 },
  visible: { opacity: 1, x: 0, transition: SPRING },
};

/* ------------------------------------------------------------------ */

export function PhaseRail({
  phases,
  currentIndex,
  onJump,
  accent = 'primary',
  className,
}: PhaseRailProps) {
  const reduced = useReducedMotion();
  const accentRole = ACCENTS[accent];

  return (
    <nav aria-label="Session phases" style={{ zIndex: Z.rail }} className={cn('relative', className)}>
      <motion.ol
        className="flex flex-col"
        variants={reduceVariants(
          { hidden: {}, visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } } },
          reduced,
        )}
        initial="hidden"
        animate="visible"
      >
        {phases.map((phase, idx) => {
          const isCurrent = idx === currentIndex;
          const isFirst = idx === 0;
          const isLast = idx === phases.length - 1;
          const phaseLabel = phase.label ?? String(idx + 1);

          // The spine is tinted from the first node down to the current node.
          const topFilled = idx <= currentIndex;
          const bottomFilled = idx < currentIndex;
          const lineFilled = 'bg-emerald-500/45';
          const lineFaint = 'bg-white/[0.07]';

          return (
            <motion.li key={idx} variants={reduceVariants(itemVariant, reduced)} className="relative">
              <button
                type="button"
                onClick={() => onJump(idx)}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={`Go to phase ${phaseLabel}: ${phase.name}`}
                className={cn(
                  'flex w-full items-center gap-3 rounded-xl pr-3 text-left transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2',
                  isCurrent
                    ? cn(accentRole.fill, 'focus-visible:ring-indigo-500/40')
                    : 'hover:bg-white/[0.04] focus-visible:ring-white/15',
                )}
              >
                {/* Spine gutter: continuous line through the node centre */}
                <span className="relative flex w-7 shrink-0 items-center justify-center self-stretch py-2.5">
                  {!isFirst && (
                    <span
                      aria-hidden
                      className={cn('absolute left-1/2 top-0 h-1/2 w-0.5 -translate-x-1/2 rounded-full', topFilled ? lineFilled : lineFaint)}
                    />
                  )}
                  {!isLast && (
                    <span
                      aria-hidden
                      className={cn('absolute bottom-0 left-1/2 h-1/2 w-0.5 -translate-x-1/2 rounded-full', bottomFilled ? lineFilled : lineFaint)}
                    />
                  )}
                  <PhaseDot status={phase.status} accentHex={accentRole.hex} />
                </span>

                <span className="flex min-w-0 flex-col gap-0.5 py-2.5">
                  <span className={cn(TYPE.label, 'leading-none', isCurrent ? accentRole.text : 'text-white/35')}>
                    {phaseLabel}
                  </span>
                  <span
                    className={cn(
                      'text-[13px] leading-tight tracking-tight',
                      isCurrent ? cn('font-semibold', accentRole.text) : 'font-normal text-white/65',
                    )}
                  >
                    {phase.name}
                  </span>
                </span>
              </button>
            </motion.li>
          );
        })}
      </motion.ol>
    </nav>
  );
}
