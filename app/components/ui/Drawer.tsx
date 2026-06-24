'use client';

// side-sliding panel: Esc and backdrop click close, sits above panels and below the modal

import { forwardRef, useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from './cn';
import { SHADOW, TYPE, Z } from './tokens';
import { SPRING } from './motion';

export type DrawerSide = 'left' | 'right';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  /** edge the drawer slides from, defaults to 'right' */
  side?: DrawerSide;
  /** tailwind width class, defaults to 'w-80' */
  width?: string;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  /** used when no title is provided */
  ariaLabel?: string;
}

const DRAWER_TITLE_ID = 'drawer-title';

export function Drawer({
  open,
  onClose,
  side = 'right',
  width = 'w-80',
  title,
  children,
  footer,
  className,
  ariaLabel,
}: DrawerProps) {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);

  const xOffset = side === 'right' ? '100%' : '-100%';

  const hiddenState = reduced
    ? { opacity: 0 }
    : { opacity: 0, x: xOffset };
  const visibleState = reduced
    ? { opacity: 1 }
    : { opacity: 1, x: '0%' };
  const exitState = reduced
    ? { opacity: 0 }
    : { opacity: 0, x: xOffset };

  const panelTransition = reduced
    ? { duration: 0.15 }
    : SPRING;

  const exitTransition = reduced
    ? { duration: 0.12 }
    : { duration: 0.22, ease: [0.4, 0, 1, 1] as const };

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Move focus to close button when drawer opens
  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => closeRef.current?.focus(), 30);
    return () => clearTimeout(id);
  }, [open]);

  // Prevent body scroll while open
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const edgeClass =
    side === 'right' ? 'right-0 top-0 bottom-0' : 'left-0 top-0 bottom-0';

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="drawer-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.12 : 0.18 }}
            className="fixed inset-0 backdrop-blur-sm"
            style={{
              zIndex: Z.drawer - 1,
              backgroundColor: 'rgb(9 9 11 / 0.60)',
            }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.aside
            key="drawer-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? DRAWER_TITLE_ID : undefined}
            aria-label={!title ? ariaLabel : undefined}
            initial={hiddenState}
            animate={{ ...visibleState, transition: panelTransition }}
            exit={{ ...exitState, transition: exitTransition }}
            className={cn(
              'fixed flex flex-col',
              edgeClass,
              width,
              'bg-[#0a0a0c]',
              side === 'right'
                ? SHADOW.drawer
                : 'shadow-[20px_0_60px_-10px_rgba(0,0,0,0.8)]',
              'border-white/[0.06]',
              side === 'right' ? 'border-l' : 'border-r',
              className,
            )}
            style={{ zIndex: Z.drawer }}
          >
            <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-white/[0.06] shrink-0">
              {side === 'left' && (
                <CloseButton ref={closeRef} onClose={onClose} />
              )}

              {title ? (
                <h2
                  id={DRAWER_TITLE_ID}
                  className={cn(TYPE.headingSm, 'flex-1 leading-none')}
                >
                  {title}
                </h2>
              ) : (
                <div className="flex-1" />
              )}

              {side === 'right' && (
                <CloseButton ref={closeRef} onClose={onClose} />
              )}
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 px-5 py-4">
              {children}
            </div>

            {footer && (
              <div className="px-5 pb-5 pt-3 border-t border-white/[0.06] shrink-0">
                {footer}
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

// forwardRef so the drawer can move focus here on open
interface CloseButtonProps {
  onClose: () => void;
}

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(
  function CloseButton({ onClose }, ref) {
    return (
      <button
        ref={ref}
        onClick={onClose}
        aria-label="Close panel"
        className={cn(
          'flex items-center justify-center',
          'w-7 h-7 rounded-lg',
          'text-white/45 hover:text-white/80',
          'bg-transparent hover:bg-white/[0.06]',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60',
          'shrink-0',
        )}
      >
        <X size={15} strokeWidth={2} aria-hidden="true" />
      </button>
    );
  },
);
