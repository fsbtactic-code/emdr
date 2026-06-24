'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, GraduationCap, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { AppMode } from '../store/useStore';
import { useT } from '../i18n/useT';
import { Button } from './ui/Button';
import { ProgressDots } from './ui/ProgressDots';
import { AccentIconBadge } from './ui/AccentIconBadge';
import { COLORS, Z } from './ui/tokens';

type TourStep = { target?: string; title: string; body: string };

// spotlight targets are structural (which rail control to highlight) and stay the
// same across languages. title/body text comes from the dictionary (obSpecialist /
// obSelfhelp), so the order here must match the order of those arrays.
const TOUR_TARGETS: Record<AppMode, (string | undefined)[]> = {
  specialist: [undefined, 'session', 'clinical', 'settings', 'grounding', 'journal', 'switch', undefined],
  selfhelp: [undefined, 'resources', 'settings', 'grounding', undefined],
};

function buildSteps(mode: AppMode, content: { title: string; body: string }[]): TourStep[] {
  const targets = TOUR_TARGETS[mode];
  return content.map((c, i) => ({ target: targets[i], title: c.title, body: c.body }));
}

type Rect = { top: number; left: number; width: number; height: number };

export function OnboardingFlow() {
  const t = useT();
  const isOnboardingOpen = useStore((s) => s.isOnboardingOpen);
  const onboardingMode = useStore((s) => s.onboardingMode);
  const setIsOnboardingOpen = useStore((s) => s.setIsOnboardingOpen);
  const markOnboardingSeen = useStore((s) => s.markOnboardingSeen);
  const lang = useStore((s) => s.lang);
  const setIsSettingsOpen = useStore((s) => s.setIsSettingsOpen);
  const setIsSessionOpen = useStore((s) => s.setIsSessionOpen);
  const setIsClinicalOpen = useStore((s) => s.setIsClinicalOpen);
  const setIsResourcesOpen = useStore((s) => s.setIsResourcesOpen);
  const setIsJournalOpen = useStore((s) => s.setIsJournalOpen);
  const setIsFeedbackOpen = useStore((s) => s.setIsFeedbackOpen);

  const mode: AppMode = onboardingMode ?? 'selfhelp';
  const steps = buildSteps(mode, mode === 'specialist' ? t.obSpecialist : t.obSelfhelp);
  const labels = { skip: t.obSkip, back: t.back, next: t.next, done: t.obDone, step: t.stepLabel, of: t.ofLabel };

  const [step, setStep] = useState(0);
  const [rect, setRect] = useState<Rect | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardH, setCardH] = useState(0);

  const safe = Math.min(step, steps.length - 1);
  const current = steps[safe];

  useEffect(() => {
    if (!isOnboardingOpen) return;
    setStep(0);
    setIsSettingsOpen(false);
    setIsSessionOpen(false);
    setIsClinicalOpen(false);
    setIsResourcesOpen(false);
    setIsJournalOpen(false);
    setIsFeedbackOpen(false);
  }, [isOnboardingOpen, onboardingMode, setIsSettingsOpen, setIsSessionOpen, setIsClinicalOpen, setIsResourcesOpen, setIsJournalOpen, setIsFeedbackOpen]);

  // depend on the target string, not the step object, to avoid looping on setRect
  const target = current?.target ?? null;
  useLayoutEffect(() => {
    if (!isOnboardingOpen) return;
    const doMeasure = () => {
      if (!target) { setRect(null); return; }
      const el = document.querySelector<HTMLElement>(`[data-tour="${target}"]`);
      if (!el) { setRect(null); return; }
      const r = el.getBoundingClientRect();
      setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
    };
    doMeasure();
    const raf = requestAnimationFrame(doMeasure);
    window.addEventListener('resize', doMeasure);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', doMeasure); };
  }, [isOnboardingOpen, target]);

  // measure the callout height so it can be clamped fully inside the viewport
  useLayoutEffect(() => {
    if (!isOnboardingOpen) return;
    const h = cardRef.current?.offsetHeight ?? 0;
    if (h) setCardH(h);
  }, [isOnboardingOpen, safe, rect, lang]);

  const finish = () => { markOnboardingSeen(mode); setIsOnboardingOpen(false); };
  const next = () => { if (safe >= steps.length - 1) finish(); else setStep(safe + 1); };
  const back = () => setStep(Math.max(0, safe - 1));

  const pad = 8;
  const hasSpot = !!rect;

  const MARGIN = 14;
  const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
  const isMobile = vw < 640;
  const cardW = Math.min(320, vw - MARGIN * 2);
  let calloutStyle: React.CSSProperties;
  let caretY = 0; // caret offset inside the card so it keeps pointing at the target
  let showCaret = false;
  if (isMobile) {
    // bottom sheet: full width minus margins, anchored to the bottom, no caret.
    calloutStyle = { left: MARGIN, right: MARGIN, bottom: MARGIN, width: 'auto' };
  } else if (rect) {
    const h = cardH || 280;
    const centerY = rect.top + rect.height / 2;
    // anchor by the card top edge and clamp so the whole card stays on screen
    const top = Math.min(Math.max(centerY - h / 2, MARGIN), Math.max(MARGIN, vh - h - MARGIN));
    const left = Math.min(rect.left + rect.width + 22, vw - cardW - MARGIN);
    calloutStyle = { left, top, width: cardW };
    caretY = Math.min(Math.max(centerY - top, 18), h - 18);
    showCaret = true;
  } else {
    // welcome / finish: centered horizontally, clamped vertically (no translateY so
    // a tall card never overflows the top/bottom of the viewport).
    const h = cardH || 280;
    const top = Math.max(MARGIN, (vh - h) / 2);
    calloutStyle = { left: '50%', top, transform: 'translateX(-50%)', width: cardW };
  }

  const dimColor = 'rgba(9,9,11,0.82)';

  return (
    <AnimatePresence>
      {isOnboardingOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0"
          style={{ zIndex: Z.modal }}
        >
          <div className="absolute inset-0" onClick={next} />

          {!hasSpot && (
            <div
              className="absolute inset-0 backdrop-blur-[2px] pointer-events-none"
              style={{ backgroundColor: 'rgba(9,9,11,0.85)' }}
            />
          )}

          {hasSpot && rect && (() => {
            const hT = rect.top - pad, hL = rect.left - pad, hW = rect.width + pad * 2, hH = rect.height + pad * 2;
            return (
              <>
                <div className="absolute left-0 right-0 top-0 pointer-events-none transition-all duration-300 ease-out" style={{ height: Math.max(0, hT), background: dimColor }} />
                <div className="absolute left-0 right-0 bottom-0 pointer-events-none transition-all duration-300 ease-out" style={{ top: hT + hH, background: dimColor }} />
                <div className="absolute left-0 pointer-events-none transition-all duration-300 ease-out" style={{ top: hT, width: Math.max(0, hL), height: hH, background: dimColor }} />
                <div className="absolute right-0 pointer-events-none transition-all duration-300 ease-out" style={{ top: hT, left: hL + hW, height: hH, background: dimColor }} />
                <motion.div
                  className="absolute rounded-2xl pointer-events-none"
                  initial={false}
                  animate={{ top: hT, left: hL, width: hW, height: hH }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  style={{ boxShadow: '0 0 0 2px rgba(129,140,248,0.9), 0 0 24px 3px rgba(99,102,241,0.5)' }}
                />
              </>
            );
          })()}

          <AnimatePresence mode="wait">
            <motion.div
              key={safe}
              initial={{ opacity: 0, scale: 0.92, x: hasSpot ? -8 : 0 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.12 } }}
              transition={{ type: 'spring', stiffness: 460, damping: 26 }}
              className="absolute z-10"
              style={calloutStyle}
            >
              {showCaret && (
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] -translate-y-1/2 h-0 w-0"
                  style={{ top: caretY, borderTop: '7px solid transparent', borderBottom: '7px solid transparent', borderRight: '8px solid rgba(17,17,21,0.97)' }}
                />
              )}
              <div
                ref={cardRef}
                className="rounded-2xl p-5 backdrop-blur-2xl overflow-y-auto no-scrollbar border border-white/[0.06]"
                style={{
                  maxHeight: 'calc(100dvh - 28px)',
                  backgroundColor: '#0d0d10',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px -16px rgba(0,0,0,0.8), 0 0 40px -10px rgba(99,102,241,0.35)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <AccentIconBadge
                    icon={<GraduationCap size={15} />}
                    accent="primary"
                    size="sm"
                  />
                  <span className={`text-[11px] uppercase tracking-[0.14em] font-semibold ${COLORS.text.muted}`}>
                    {labels.step} {safe + 1} {labels.of} {steps.length}
                  </span>
                </div>

                <h3 className="text-[16px] font-bold text-white tracking-tight mb-1.5">{current.title}</h3>
                <p className={`text-[13px] leading-relaxed ${COLORS.text.secondary}`}>{current.body}</p>

                <ProgressDots
                  total={steps.length}
                  current={safe}
                  accent="primary"
                  className="mt-4 mb-4"
                  aria-label={`${labels.step} ${safe + 1} ${labels.of} ${steps.length}`}
                />

                <div className="flex items-center justify-between gap-2">
                  <Button
                    onClick={finish}
                    variant="ghost"
                    size="sm"
                    className="px-1"
                  >
                    {labels.skip}
                  </Button>
                  <div className="flex items-center gap-2">
                    {safe > 0 && (
                      <Button
                        onClick={back}
                        variant="secondary"
                        size="sm"
                        iconLeft={<ChevronLeft size={15} />}
                      >
                        {labels.back}
                      </Button>
                    )}
                    <Button
                      onClick={next}
                      variant="secondary"
                      size="sm"
                      style={{ background: '#ffffff', color: '#09090b' }}
                      iconLeft={safe >= steps.length - 1 ? <Check size={15} /> : undefined}
                      iconRight={safe >= steps.length - 1 ? undefined : <ChevronRight size={15} />}
                    >
                      {safe >= steps.length - 1 ? labels.done : labels.next}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
