'use client';

/**
 * PhaseRail - vertical step/phase navigator for the EMDR session console.
 *
 * Renders a numbered list of protocol phases with status indicators:
 *   empty    - phase not yet visited
 *   has-data - phase has some data but not complete
 *   current  - the active phase (accent highlight)
 *   done     - phase completed
 *
 * Clicking a phase calls onJump (therapist can navigate non-linearly).
 * The rail is meant to be docked vertically (left side of console).
 *
 * Usage:
 *   <PhaseRail phases={phases} currentIndex={idx} onJump={setIdx} />
 */

import { motion, useReducedMotion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from './cn';
import { ACCENTS, COLORS, TYPE, Z } from './tokens';
import { fadeRise, reduceVariants, SPRING } from './motion';

/* ------------------------------------------------------------------ */

export type PhaseStatus = 'empty' | 'has-data' | 'current' | 'done';

export interface PhaseItem {
  /** Display name of the phase. */
  name: string;
  /** Optional short label (e.g. phase number override). Defaults to index+1. */
  label?: string;
  /** Status of this phase. */
  status: PhaseStatus;
}

export interface PhaseRailProps {
  phases: PhaseItem[];
  /** Index of the currently active phase (0-based). */
  currentIndex: number;
  /** Called when user clicks a phase step. */
  onJump: (index: number) => void;
  /** Accent used for the current phase highlight. Default: 'primary'. */
  accent?: keyof typeof ACCENTS;
  /** Extra class on the root element. */
  className?: string;
}

/* ------------------------------------------------------------------ */

/**
 * Status dot configs: maps PhaseStatus to classes/content.
 */
const STATUS_DOT: Record<
  PhaseStatus,
  { dotClass: string; showCheck: boolean }
> = {
  empty: {
    dotClass: 'bg-white/[0.06] border border-white/[0.10]',
    showCheck: false,
  },
  'has-data': {
    dotClass: 'bg-amber-500/25 border border-amber-500/40',
    showCheck: false,
  },
  current: {
    // Will be overridden with accent fill
    dotClass: '',
    showCheck: false,
  },
  done: {
    dotClass: 'bg-emerald-500/20 border border-emerald-500/30',
    showCheck: true,
  },
};

/* ------------------------------------------------------------------ */

function PhaseDot({
  status,
  accentFill,
  accentBorder,
}: {
  status: PhaseStatus;
  accentFill: string;
  accentBorder: string;
}) {
  const isCurrent = status === 'current';
  const cfg = STATUS_DOT[status];

  return (
    <span
      aria-hidden
      className={cn(
        'flex items-center justify-center',
        'w-5 h-5 rounded-full shrink-0',
        isCurrent ? cn(accentFill, 'border', accentBorder) : cfg.dotClass,
      )}
    >
      {cfg.showCheck && (
        <Check
          size={10}
          strokeWidth={2.5}
          className="text-emerald-300"
          aria-hidden
        />
      )}
      {isCurrent && (
        <span className="w-1.5 h-1.5 rounded-full bg-white/90" aria-hidden />
      )}
    </span>
  );
}

/* ------------------------------------------------------------------ */

function PhaseConnector({ done }: { done: boolean }) {
  return (
    <span
      aria-hidden
      className={cn(
        'absolute left-[9px] top-[22px] w-px',
        'h-[calc(100%-14px)]',
        done ? 'bg-emerald-500/25' : 'bg-white/[0.06]',
      )}
    />
  );
}

/* ------------------------------------------------------------------ */

const itemVariant = {
  hidden: { opacity: 0, x: -8 },
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
    <nav
      aria-label="Session phases"
      style={{ zIndex: Z.rail }}
      className={cn('relative flex flex-col', className)}
    >
      <motion.ol
        className="flex flex-col"
        variants={reduceVariants(
          {
            hidden: {},
            visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
          },
          reduced,
        )}
        initial="hidden"
        animate="visible"
      >
        {phases.map((phase, idx) => {
          const isCurrent = idx === currentIndex;
          const isDone = phase.status === 'done';
          const isLast = idx === phases.length - 1;
          const phaseLabel = phase.label ?? String(idx + 1);

          const nameClass = cn(
            'text-[13px] leading-tight tracking-tight',
            isCurrent
              ? cn('font-semibold', accentRole.text)
              : isDone
                ? 'text-white/50 font-normal'
                : 'text-white/60 font-normal',
          );

          const numClass = cn(
            TYPE.label,
            'leading-none',
            isCurrent ? accentRole.text : '',
          );

          return (
            <motion.li
              key={idx}
              variants={reduceVariants(itemVariant, reduced)}
              className="relative"
            >
              {/* Vertical connector line between dots */}
              {!isLast && <PhaseConnector done={isDone} />}

              <button
                type="button"
                onClick={() => onJump(idx)}
                aria-current={isCurrent ? 'step' : undefined}
                aria-label={`Go to phase ${phaseLabel}: ${phase.name}`}
                className={cn(
                  'group flex items-start gap-2.5 w-full text-left',
                  'px-2 py-1.5 rounded-lg',
                  'transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2',
                  isCurrent
                    ? cn(
                        accentRole.fill,
                        'focus-visible:ring-indigo-500/40',
                      )
                    : cn(
                        'hover:bg-white/[0.04]',
                        'focus-visible:ring-white/20',
                      ),
                  !isLast && 'mb-0.5',
                )}
              >
                <PhaseDot
                  status={phase.status}
                  accentFill={accentRole.fill}
                  accentBorder={accentRole.border}
                />

                <span className="flex flex-col gap-0.5 pt-px min-w-0">
                  <span className={numClass}>{phaseLabel}</span>
                  <span className={nameClass}>{phase.name}</span>
                </span>
              </button>
            </motion.li>
          );
        })}
      </motion.ol>
    </nav>
  );
}
