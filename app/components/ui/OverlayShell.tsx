'use client';

/**
 * OverlayShell - glass modal shell for custom overlays.
 *
 * Covers the gap between DS Modal (blur-sm / rounded-2xl / header-bar)
 * and bespoke modals that need blur-2xl, rounded-[28px] and an ambient
 * glow blob (GroundingOverlay, ModeChooser, BananaPopup, SessionJournal,
 * LanguagePicker).
 *
 * Features:
 * - backdrop: fixed inset-0 backdrop-blur-2xl bg-zinc-950/85, click closes
 * - panel: bg-[#0d0d10] border-white/[0.06] rounded-[28px] p-7 SHADOW.panel
 * - optional ambient glow blob top-right, color keyed from ACCENTS
 * - spring entrance via cardPop variants, AnimatePresence
 * - Esc close, focus-trap (first focusable on open), body-scroll-lock
 * - z-index from Z token, default Z.modal
 * - role=dialog, aria-modal, aria-label
 * - reduced-motion aware
 */

import {
  useEffect,
  useRef,
  useCallback,
  type ReactNode,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from './cn';
import { ACCENTS, SHADOW, Z } from './tokens';
import { cardPop, reduceVariants, EASE_FLUID } from './motion';
import type { AccentName } from './tokens';

/* ------------------------------------------------------------------ */

export interface OverlayShellProps {
  /** Controls visibility. */
  open: boolean;
  /** Called when backdrop is clicked or Esc is pressed. */
  onClose: () => void;
  /**
   * Max-width tailwind class.
   * @default 'max-w-md'
   */
  maxWidth?: string;
  /**
   * Z-index layer from the Z token.
   * @default 'modal'
   */
  z?: keyof typeof Z;
  /**
   * Ambient glow blob color.
   * Pass an AccentName to show a tinted blob, false/undefined to omit it.
   */
  glow?: AccentName | false;
  /** aria-label for the dialog (required when no visible heading is rendered). */
  ariaLabel: string;
  /** Dialog body. */
  children: ReactNode;
  /** Additional className on the panel element. */
  className?: string;
}

/* ------------------------------------------------------------------ *
 * Focus-trap helpers
 * ------------------------------------------------------------------ */

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

function getFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
}

/* ------------------------------------------------------------------ */

export function OverlayShell({
  open,
  onClose,
  maxWidth = 'max-w-md',
  z: zKey = 'modal',
  glow,
  ariaLabel,
  children,
  className,
}: OverlayShellProps) {
  const reduced = useReducedMotion();
  const panelVariants = reduceVariants(cardPop, reduced);
  const panelRef = useRef<HTMLDivElement>(null);
  const zIndex = Z[zKey];

  /* ---- Esc close ---- */
  useEffect(() => {
    if (!open) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  /* ---- Focus-trap: initial focus ---- */
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => {
      const panel = panelRef.current;
      if (!panel) return;
      const first = getFocusable(panel)[0];
      first?.focus();
    }, 40);
    return () => clearTimeout(id);
  }, [open]);

  /* ---- Focus-trap: cycle on Tab ---- */
  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key !== 'Tab') return;
      const panel = panelRef.current;
      if (!panel) return;
      const nodes = getFocusable(panel);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [],
  );

  /* ---- Body-scroll lock ---- */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  /* ---- Glow blob color ---- */
  const glowHex = glow ? ACCENTS[glow].hex : null;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="overlay-shell-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reduced ? { duration: 0.12 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
            style={{ zIndex }}
            className="fixed inset-0 backdrop-blur-2xl bg-zinc-950/85"
            onClick={onClose}
          />

          {/* Centering container */}
          <div
            className="fixed inset-0 flex items-center justify-center px-4 pointer-events-none"
            style={{ zIndex }}
          >
            {/* Dialog panel */}
            <motion.div
              key="overlay-shell-panel"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={ariaLabel}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onKeyDown={handleKeyDown}
              onClick={(e) => e.stopPropagation()}
              className={cn(
                'relative w-full pointer-events-auto',
                maxWidth,
                'rounded-[28px]',
                SHADOW.panel,
                'border border-white/[0.06]',
                'overflow-hidden',
                'p-7',
                className,
              )}
              style={{ backgroundColor: '#0d0d10' }}
            >
              {/* Ambient glow blob */}
              {glowHex && (
                <span
                  aria-hidden="true"
                  className="absolute -top-16 -right-12 w-56 h-56 rounded-full pointer-events-none"
                  style={{
                    background: glowHex,
                    opacity: 0.08,
                    filter: 'blur(60px)',
                  }}
                />
              )}

              {/* Content */}
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
