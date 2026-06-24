'use client';

// glass modal shell for overlays that need blur-2xl, rounded-[28px] and an
// optional ambient glow blob. Handles Esc close, focus-trap and scroll-lock.

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

export interface OverlayShellProps {
  open: boolean;
  onClose: () => void;
  maxWidth?: string;
  z?: keyof typeof Z;
  /** pass an AccentName for a tinted glow blob, false/undefined to omit it */
  glow?: AccentName | false;
  /** required when no visible heading is rendered */
  ariaLabel: string;
  children: ReactNode;
  className?: string;
}

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

function getFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE));
}

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

  // esc close
  useEffect(() => {
    if (!open) return;
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // focus first focusable element on open
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

  // keep Tab focus cycling inside the panel
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

  // lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const glowHex = glow ? ACCENTS[glow].hex : null;

  return (
    <AnimatePresence>
      {open && (
        <>
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

          <div
            className="fixed inset-0 flex items-center justify-center px-4 pointer-events-none"
            style={{ zIndex }}
          >
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

              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
