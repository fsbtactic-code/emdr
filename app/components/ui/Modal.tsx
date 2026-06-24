'use client';

// centered blocking dialog: Esc and backdrop click close, focus moves to the close button

import { useEffect, useRef, type ReactNode } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from './cn';
import { RADIUS, SHADOW, TYPE, Z } from './tokens';
import { cardPop, reduceVariants } from './motion';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  /** tailwind max-width, defaults to 'max-w-md' */
  maxWidth?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  /** used when no title is provided */
  ariaLabel?: string;
}

const MODAL_TITLE_ID = 'modal-title';

export function Modal({
  open,
  onClose,
  title,
  maxWidth = 'max-w-md',
  children,
  footer,
  className,
  ariaLabel,
}: ModalProps) {
  const reduced = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelVariants = reduceVariants(cardPop, reduced);

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  // Move focus to close button when modal opens
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

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0.12 : 0.2 }}
            className="fixed inset-0 backdrop-blur-sm"
            style={{
              zIndex: Z.modal,
              backgroundColor: 'rgb(9 9 11 / 0.85)',
            }}
            onClick={onClose}
            aria-hidden="true"
          />

          <div
            className="fixed inset-0 flex items-center justify-center px-4 pointer-events-none"
            style={{ zIndex: Z.modal }}
          >
            <motion.div
              key="modal-panel"
              role="dialog"
              aria-modal="true"
              aria-labelledby={title ? MODAL_TITLE_ID : undefined}
              aria-label={!title ? ariaLabel : undefined}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              className={cn(
                'relative w-full pointer-events-auto',
                maxWidth,
                RADIUS.lg,
                SHADOW.panel,
                'border border-white/[0.06]',
                'flex flex-col overflow-hidden',
                'bg-[#0d0d10]',
                className,
              )}
            >
              <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-white/[0.06]">
                {title ? (
                  <h2
                    id={MODAL_TITLE_ID}
                    className={cn(TYPE.heading, 'flex-1 leading-none')}
                  >
                    {title}
                  </h2>
                ) : (
                  <div className="flex-1" />
                )}

                <button
                  ref={closeRef}
                  onClick={onClose}
                  aria-label="Close dialog"
                  className={cn(
                    'flex items-center justify-center',
                    'w-7 h-7 rounded-lg',
                    'text-white/45 hover:text-white/80',
                    'bg-transparent hover:bg-white/[0.06]',
                    'transition-colors duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60',
                    '-mr-1 shrink-0',
                  )}
                >
                  <X size={15} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-4 min-h-0">
                {children}
              </div>

              {footer && (
                <div className="px-5 pb-5 pt-3 border-t border-white/[0.06]">
                  {footer}
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
