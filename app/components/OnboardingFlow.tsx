'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, GraduationCap, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { AppMode } from '../store/useStore';

type TourStep = { target?: string; title: string; body: string };

function getSteps(mode: AppMode, lang: string): TourStep[] {
  const ru: Record<AppMode, TourStep[]> = {
    specialist: [
      { title: 'Режим специалиста', body: 'Коротко проведу по интерфейсу. Вы ведете клиента, приложение дает билатеральную стимуляцию.' },
      { target: 'session', title: 'Сессия со специалистом', body: 'Создайте комнату и отправьте ссылку клиенту. Когда он подключится, его экран зеркалит вашу стимуляцию без настроек.' },
      { target: 'clinical', title: 'Ведение сессии', body: 'Протокол по 8 фазам, замеры SUD и VOC, запуск сетов. Здесь же быстрые настройки на лету и показ механик клиенту: бабочка, дыхание, заземление. И кнопка заглушить звук только у себя.' },
      { target: 'settings', title: 'Настройки сессии', body: 'Паттерн движения, скорость, размах, звук стимула и фон. Можно собрать пресет и поделиться ссылкой.' },
      { target: 'grounding', title: 'Стоп и заземление', body: 'Всегда под рукой. Останавливает стимуляцию и помогает вернуться в здесь и сейчас. Тут же кризисные контакты.' },
      { target: 'journal', title: 'Журнал сессий', body: 'Локальная история: настройки, сеты, динамика SUD. Хранится только на вашем устройстве, без имен.' },
      { target: 'switch', title: 'Сменить режим', body: 'Переключиться между режимами специалиста и самопомощи в любой момент.' },
      { title: 'Готово', body: 'Начните с создания сессии. Это обучение можно перезапустить кнопкой обучения в меню.' },
    ],
    selfhelp: [
      { title: 'Режим самопомощи', body: 'Коротко покажу, что где. Это инструмент для стабилизации и расслабления, не замена терапии.' },
      { target: 'resources', title: 'Ресурсы и стабилизация', body: 'Безопасное место, контейнер, поток света, объятие бабочки, дыхание. Безопасно практиковать самостоятельно.' },
      { target: 'settings', title: 'Настройки', body: 'Паттерн движения, скорость, размах, звук и фон под себя.' },
      { target: 'grounding', title: 'Стоп и заземление', body: 'В любой момент остановит стимуляцию и поможет успокоиться по технике 5-4-3-2-1 и дыханию.' },
      { title: 'Готово', body: 'Переработку травмы ведет специалист, а не приложение. Это обучение можно перезапустить из меню.' },
    ],
  };
  const en: Record<AppMode, TourStep[]> = {
    specialist: [
      { title: 'Practitioner mode', body: 'A quick tour of the interface. You guide the client, the app provides the bilateral stimulation.' },
      { target: 'session', title: 'Session with a client', body: 'Create a room and send the link to your client. When they join, their screen mirrors your stimulation with no controls.' },
      { target: 'clinical', title: 'Session conduct', body: 'The 8-phase protocol, SUD and VOC ratings, running sets. Quick controls on the fly, push mechanics to the client (butterfly, breathing, grounding), and mute sound on your side only.' },
      { target: 'settings', title: 'Session settings', body: 'Movement pattern, speed, amplitude, stimulus sound and background. Build a preset and share a link.' },
      { target: 'grounding', title: 'Stop and ground', body: 'Always available. Stops the stimulation and helps return to the here and now. Crisis contacts live here too.' },
      { target: 'journal', title: 'Session journal', body: 'Local history: settings, sets, SUD trend. Stored on your device only, no names.' },
      { target: 'switch', title: 'Switch mode', body: 'Switch between practitioner and self-help mode anytime.' },
      { title: 'All set', body: 'Start by creating a session. You can replay this tour from the onboarding button in the menu.' },
    ],
    selfhelp: [
      { title: 'Self-help mode', body: 'A quick look at what is where. This is a tool for stabilization and calm, not a replacement for therapy.' },
      { target: 'resources', title: 'Resources and stabilization', body: 'Safe place, container, light stream, butterfly hug, breathing. Safe to practice on your own.' },
      { target: 'settings', title: 'Settings', body: 'Movement pattern, speed, amplitude, sound and background to your taste.' },
      { target: 'grounding', title: 'Stop and ground', body: 'Stops the stimulation anytime and helps you settle with 5-4-3-2-1 and breathing.' },
      { title: 'All set', body: 'Trauma reprocessing is led by a practitioner, not an app. Replay this tour from the menu.' },
    ],
  };
  return (lang === 'en' ? en : ru)[mode];
}

type Rect = { top: number; left: number; width: number; height: number };

export function OnboardingFlow() {
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
  const steps = getSteps(mode, lang);
  const labels = lang === 'en'
    ? { skip: 'Skip', back: 'Back', next: 'Next', done: 'Done', step: 'Step', of: 'of' }
    : { skip: 'Пропустить', back: 'Назад', next: 'Далее', done: 'Готово', step: 'Шаг', of: 'из' };

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

  return (
    <AnimatePresence>
      {isOnboardingOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[130]"
        >
          <div className="absolute inset-0" onClick={next} />

          {!hasSpot && <div className="absolute inset-0 bg-[#06060a]/85 backdrop-blur-[2px] pointer-events-none" />}

          {hasSpot && rect && (() => {
            const dim = 'rgba(6,6,10,0.82)';
            const hT = rect.top - pad, hL = rect.left - pad, hW = rect.width + pad * 2, hH = rect.height + pad * 2;
            return (
              <>
                <div className="absolute left-0 right-0 top-0 pointer-events-none transition-all duration-300 ease-out" style={{ height: Math.max(0, hT), background: dim }} />
                <div className="absolute left-0 right-0 bottom-0 pointer-events-none transition-all duration-300 ease-out" style={{ top: hT + hH, background: dim }} />
                <div className="absolute left-0 pointer-events-none transition-all duration-300 ease-out" style={{ top: hT, width: Math.max(0, hL), height: hH, background: dim }} />
                <div className="absolute right-0 pointer-events-none transition-all duration-300 ease-out" style={{ top: hT, left: hL + hW, height: hH, background: dim }} />
                <motion.div
                  className="absolute rounded-[18px] pointer-events-none"
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
                className="rounded-2xl p-5 backdrop-blur-2xl overflow-y-auto no-scrollbar"
                style={{
                  maxHeight: 'calc(100dvh - 28px)',
                  background: 'linear-gradient(180deg, rgba(20,20,26,0.97), rgba(11,11,15,0.97))',
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.07), 0 24px 60px -16px rgba(0,0,0,0.8), 0 0 40px -10px rgba(99,102,241,0.35)',
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300 shrink-0">
                    <GraduationCap size={15} />
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.15em] font-semibold text-indigo-300/70">
                    {labels.step} {safe + 1} {labels.of} {steps.length}
                  </span>
                </div>

                <h3 className="text-[16px] font-bold text-white tracking-tight mb-1.5">{current.title}</h3>
                <p className="text-[13px] leading-relaxed text-white/60">{current.body}</p>

                <div className="flex gap-1.5 mt-4 mb-4">
                  {steps.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === safe ? 'w-5 bg-indigo-400' : 'w-1.5 bg-white/15'}`}
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between gap-2">
                  <button
                    onClick={finish}
                    className="text-[12px] font-medium text-white/40 hover:text-white/70 transition-colors px-1"
                  >
                    {labels.skip}
                  </button>
                  <div className="flex items-center gap-2">
                    {safe > 0 && (
                      <button
                        onClick={back}
                        className="flex items-center gap-1 px-3 py-2 rounded-xl text-[13px] font-medium text-white/70 bg-white/[0.05] hover:bg-white/[0.09] transition-all"
                      >
                        <ChevronLeft size={15} /> {labels.back}
                      </button>
                    )}
                    <button
                      onClick={next}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[13px] font-bold text-zinc-950 bg-white hover:bg-zinc-200 active:scale-95 transition-all"
                    >
                      {safe >= steps.length - 1 ? (<><Check size={15} /> {labels.done}</>) : (<>{labels.next} <ChevronRight size={15} /></>)}
                    </button>
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
