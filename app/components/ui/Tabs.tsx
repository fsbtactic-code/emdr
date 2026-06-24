'use client';

/**
 * Tabs - tab bar with content panels.
 *
 * Two style variants:
 *   underline  - hairline indicator below active tab (drawer/settings style)
 *   fill       - translucent accent fill on active tab (pill style)
 *
 * Usage:
 *   <Tabs tabs={tabs} defaultTab="settings" variant="underline">
 *     {(activeId) => <div>{activeId === 'settings' && <Settings />}</div>}
 *   </Tabs>
 *
 * Or in controlled mode:
 *   <Tabs tabs={tabs} activeTab={tab} onTabChange={setTab} variant="fill" />
 */

import * as React from 'react';
import { useReducedMotion, motion, AnimatePresence } from 'framer-motion';
import { cn } from './cn';
import { COLORS, ACCENTS, RADIUS, TYPE, type AccentName } from './tokens';
import { SPRING_SNAPPY, fadeRise, reduceVariants, reduceTransition } from './motion';

/* ------------------------------------------------------------------ */

export interface TabItem {
  id: string;
  label: string;
  /** Optional icon before the label. */
  icon?: React.ReactNode;
  disabled?: boolean;
}

export type TabsVariant = 'underline' | 'fill';

export interface TabsProps {
  tabs: TabItem[];
  /** Uncontrolled initial tab id. */
  defaultTab?: string;
  /** Controlled active tab id. */
  activeTab?: string;
  /** Fires when active tab changes. */
  onTabChange?: (id: string) => void;
  variant?: TabsVariant;
  accent?: AccentName;
  /**
   * Render prop for content area.
   * Receives the current active tab id.
   * If omitted, no content area is rendered (tab bar only).
   */
  children?: (activeId: string) => React.ReactNode;
  /** ARIA label for the tab list. */
  'aria-label'?: string;
  className?: string;
  /** Extra classes on the content wrapper. */
  contentClassName?: string;
}

/* ------------------------------------------------------------------ */

export function Tabs({
  tabs,
  defaultTab,
  activeTab: controlledActive,
  onTabChange,
  variant = 'underline',
  accent = 'primary',
  children,
  'aria-label': ariaLabel,
  className,
  contentClassName,
}: TabsProps) {
  const reduced = useReducedMotion();
  const [internalActive, setInternalActive] = React.useState<string>(
    defaultTab ?? tabs[0]?.id ?? '',
  );

  const isControlled = controlledActive !== undefined;
  const activeId = isControlled ? controlledActive : internalActive;

  const handleSelect = (id: string) => {
    if (!isControlled) setInternalActive(id);
    onTabChange?.(id);
  };

  const a = ACCENTS[accent];

  /* Tab button styles per variant. */
  const tabButton = (isActive: boolean, disabled: boolean | undefined) => {
    if (variant === 'underline') {
      return cn(
        'relative flex items-center gap-1.5 px-1 pb-2.5 pt-1',
        'text-[13px] font-medium leading-none',
        'transition-colors duration-150',
        isActive ? COLORS.text.primary : COLORS.text.muted,
        !isActive && !disabled && 'hover:text-white/70',
        disabled && 'opacity-40 cursor-not-allowed',
        !disabled && 'cursor-pointer',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20 rounded-sm',
      );
    }
    /* fill variant */
    return cn(
      'relative flex items-center gap-1.5 px-3 py-1.5',
      'text-[13px] font-medium leading-none',
      RADIUS.sm,
      'transition-colors duration-150',
      isActive ? a.text : COLORS.text.muted,
      isActive && cn(a.fill, 'border', a.border),
      !isActive && !disabled && 'hover:text-white/70 hover:bg-white/[0.04]',
      disabled && 'opacity-40 cursor-not-allowed',
      !disabled && 'cursor-pointer',
      'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20',
    );
  };

  const barBase =
    variant === 'underline'
      ? cn(
          'flex items-end gap-5 border-b border-white/[0.06]',
        )
      : cn(
          'flex items-center gap-0.5 p-0.5',
          COLORS.surface.base,
          RADIUS.md,
          'border border-white/[0.06]',
        );

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={barBase}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              disabled={tab.disabled}
              tabIndex={isActive ? 0 : -1}
              onClick={() => !tab.disabled && handleSelect(tab.id)}
              onKeyDown={(e) => {
                /* Arrow key navigation. */
                const enabled = tabs.filter((t) => !t.disabled);
                const currentIdx = enabled.findIndex((t) => t.id === tab.id);
                if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                  e.preventDefault();
                  const next = enabled[(currentIdx + 1) % enabled.length];
                  if (next) handleSelect(next.id);
                }
                if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                  e.preventDefault();
                  const prev = enabled[(currentIdx - 1 + enabled.length) % enabled.length];
                  if (prev) handleSelect(prev.id);
                }
                if (e.key === 'Home') {
                  e.preventDefault();
                  const first = enabled[0];
                  if (first) handleSelect(first.id);
                }
                if (e.key === 'End') {
                  e.preventDefault();
                  const last = enabled[enabled.length - 1];
                  if (last) handleSelect(last.id);
                }
              }}
              className={tabButton(isActive, tab.disabled)}
            >
              {tab.icon && (
                <span aria-hidden className="flex-shrink-0 opacity-80">
                  {tab.icon}
                </span>
              )}
              <span>{tab.label}</span>

              {/* Underline indicator */}
              {variant === 'underline' && isActive && (
                <motion.span
                  key="underline"
                  layoutId="tabs-underline"
                  aria-hidden
                  className={cn(
                    'absolute bottom-0 left-0 right-0 h-px',
                    a.fill.replace(/^bg-/, '').replace(/\/\d+$/, ''),
                  )}
                  style={{
                    background: a.hex,
                    opacity: 0.7,
                  }}
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 0.7 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  transition={reduceTransition(SPRING_SNAPPY, reduced)}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Content panels */}
      {children && (
        <div className={cn('mt-3', contentClassName)}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeId}
              role="tabpanel"
              id={`tabpanel-${activeId}`}
              aria-labelledby={`tab-${activeId}`}
              variants={reduceVariants(fadeRise, reduced)}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {children(activeId)}
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
