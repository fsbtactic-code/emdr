'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Compass,
  Link2,
  UserCheck,
  Activity,
  LifeBuoy,
  Sparkles,
  Settings2,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react';
import { useStore } from '../store/useStore';
import type { AppMode } from '../store/useStore';

type Locale = 'ru' | 'en';

interface OnbStep {
  icon: LucideIcon;
  title: string;
  body: string;
  // optional inline action for the step (e.g. open the session panel)
  actionLabel?: string;
  action?: () => void;
}

interface OnbStrings {
  badgeSpecialist: string;
  badgeSelfhelp: string;
  back: string;
  next: string;
  skip: string;
  finish: string;
  stepOf: (i: number, n: number) => string;
}

const STRINGS: Record<Locale, OnbStrings> = {
  ru: {
    badgeSpecialist: 'Режим специалиста',
    badgeSelfhelp: 'Самопомощь',
    back: 'Назад',
    next: 'Далее',
    skip: 'Пропустить',
    finish: 'Готово',
    stepOf: (i, n) => 'Шаг ' + i + ' из ' + n,
  },
  en: {
    badgeSpecialist: 'Practitioner mode',
    badgeSelfhelp: 'Self-help',
    back: 'Back',
    next: 'Next',
    skip: 'Skip',
    finish: 'Done',
    stepOf: (i, n) => 'Step ' + i + ' of ' + n,
  },
};

function localeOf(lang: string): Locale {
  return lang === 'en' ? 'en' : 'ru';
}

export function OnboardingFlow() {
  const isOnboardingOpen = useStore((s) => s.isOnboardingOpen);
  const onboardingMode = useStore((s) => s.onboardingMode);
  const lang = useStore((s) => s.lang);
  const markOnboardingSeen = useStore((s) => s.markOnboardingSeen);
  const setIsOnboardingOpen = useStore((s) => s.setIsOnboardingOpen);
  const setIsSessionOpen = useStore((s) => s.setIsSessionOpen);

  const mode: AppMode = onboardingMode ?? 'selfhelp';
  const loc = localeOf(lang);
  const t = STRINGS[loc];

  const [step, setStep] = useState(0);

  // reset to the first step whenever the overlay opens or the mode changes
  useEffect(() => {
    if (isOnboardingOpen) setStep(0);
  }, [isOnboardingOpen, mode]);

  const steps = useMemo<OnbStep[]>(() => {
    if (mode === 'specialist') {
      if (loc === 'en') {
        return [
          {
            icon: Compass,
            title: 'You are in practitioner mode',
            body: 'You guide the client through the session. The app delivers the bilateral stimulation, you stay in control.',
          },
          {
            icon: Link2,
            title: 'Create a session',
            body: 'Open "Сессия со специалистом", tap "Создать сессию", copy the link and send it to the client.',
            actionLabel: 'Open session panel',
            action: () => {
              markOnboardingSeen(mode);
              setIsOnboardingOpen(false);
              setIsSessionOpen(true);
            },
          },
          {
            icon: UserCheck,
            title: 'Client connects',
            body: 'When the client opens the link you see "Клиент подключен". Their screen mirrors the stimulus you control, with no settings on their side.',
          },
          {
            icon: Activity,
            title: 'Conduct the session',
            body: 'Open "Ведение сессии", move through the 8 phases, capture SUD (0-10) and VOC (1-7). Run sets with "Запустить сет", then "Остановить и спросить". Quick controls change speed and pattern live, and you can mute the sound on your own device while the client keeps hearing it.',
          },
          {
            icon: LifeBuoy,
            title: 'Safety',
            body: '"Стоп и заземление" is always available. The client can send you a stop or distress signal at any moment.',
          },
        ];
      }
      return [
        {
          icon: Compass,
          title: 'Вы в режиме специалиста',
          body: 'Вы ведете клиента через сессию. Приложение дает билатеральную стимуляцию, управление остается за вами.',
        },
        {
          icon: Link2,
          title: 'Создайте сессию',
          body: 'Откройте "Сессия со специалистом", нажмите "Создать сессию", скопируйте ссылку и отправьте ее клиенту.',
          actionLabel: 'Открыть панель сессии',
          action: () => {
            markOnboardingSeen(mode);
            setIsOnboardingOpen(false);
            setIsSessionOpen(true);
          },
        },
        {
          icon: UserCheck,
          title: 'Клиент подключается',
          body: 'Когда клиент откроет ссылку, вы увидите "Клиент подключен". Его экран повторяет стимул, которым управляете вы, без настроек на его стороне.',
        },
        {
          icon: Activity,
          title: 'Ведите сессию',
          body: 'Откройте "Ведение сессии", проходите 8 фаз, фиксируйте SUD (0-10) и VOC (1-7). Запускайте серии кнопкой "Запустить сет", затем "Остановить и спросить". Быстрые регуляторы меняют скорость и паттерн на ходу, а звук можно приглушить на своем устройстве, клиент продолжит слышать его.',
        },
        {
          icon: LifeBuoy,
          title: 'Безопасность',
          body: '"Стоп и заземление" доступны всегда. Клиент в любой момент может прислать вам сигнал стоп или о дискомфорте.',
        },
      ];
    }

    // self-help
    if (loc === 'en') {
      return [
        {
          icon: Sparkles,
          title: 'A self-help tool',
          body: 'This is a self-help tool, not therapy. It works well for calming down and stabilization.',
        },
        {
          icon: Settings2,
          title: 'Start with resources',
          body: 'Begin with the resources (safe place, container, breathing). Adjust pattern, sound and speed in the settings to fit you.',
        },
        {
          icon: LifeBuoy,
          title: 'Safety',
          body: '"Стоп и заземление" is always available. Reprocessing of trauma is done with a specialist, not alone.',
        },
      ];
    }
    return [
      {
        icon: Sparkles,
        title: 'Инструмент самопомощи',
        body: 'Это инструмент самопомощи, не терапия. Хорошо подходит для успокоения и стабилизации.',
      },
      {
        icon: Settings2,
        title: 'Начните с ресурсов',
        body: 'Начните с ресурсов (безопасное место, контейнер, дыхание). Подберите паттерн, звук и скорость под себя в настройках.',
      },
      {
        icon: LifeBuoy,
        title: 'Безопасность',
        body: '"Стоп и заземление" доступны всегда. Переработка травмы делается со специалистом, а не в одиночку.',
      },
    ];
  }, [mode, loc, markOnboardingSeen, setIsOnboardingOpen, setIsSessionOpen]);

  const total = steps.length;
  const safeStep = Math.min(step, total - 1);
  const current = steps[safeStep];
  const isLast = safeStep === total - 1;
  const accent = mode === 'specialist' ? 'indigo' : 'emerald';

  const close = () => {
    markOnboardingSeen(mode);
    setIsOnboardingOpen(false);
  };

  const next = () => {
    if (isLast) close();
    else setStep((s) => Math.min(s + 1, total - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const Icon = current.icon;

  return (
    <AnimatePresence>
      {isOnboardingOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 z-[125] flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-2xl"
        >
          <motion.div
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 16, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#0d0d0f] border border-white/[0.06] rounded-[28px] p-6 sm:p-7 shadow-2xl relative overflow-hidden max-h-[92vh] overflow-y-auto no-scrollbar"
          >
            <div
              className={
                'absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 blur-[60px] rounded-full pointer-events-none ' +
                (accent === 'indigo' ? 'bg-indigo-500/10' : 'bg-emerald-500/10')
              }
            />

            <button
              onClick={close}
              aria-label="Close"
              className="absolute top-3 right-3 p-2 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all z-20"
            >
              <X size={18} />
            </button>

            <div className="relative z-10 flex flex-col">
              <div
                className={
                  'flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.15em] mb-5 ' +
                  (accent === 'indigo' ? 'text-indigo-300/90' : 'text-emerald-300/90')
                }
              >
                <Sparkles size={14} />
                {mode === 'specialist' ? t.badgeSpecialist : t.badgeSelfhelp}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={safeStep}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col"
                >
                  <div
                    className={
                      'w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ' +
                      (accent === 'indigo'
                        ? 'bg-indigo-500/10 text-indigo-300'
                        : 'bg-emerald-500/10 text-emerald-300')
                    }
                  >
                    <Icon size={22} />
                  </div>

                  <p className="text-white/35 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
                    {t.stepOf(safeStep + 1, total)}
                  </p>
                  <h2 className="text-[21px] font-bold text-white tracking-tight mb-2.5 leading-snug">
                    {current.title}
                  </h2>
                  <p className="text-white/55 text-[14px] leading-relaxed">{current.body}</p>

                  {current.actionLabel && current.action && (
                    <button
                      onClick={current.action}
                      className={
                        'mt-4 self-start px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all active:scale-[0.98] ' +
                        (accent === 'indigo'
                          ? 'bg-indigo-500/15 text-indigo-200 hover:bg-indigo-500/25'
                          : 'bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25')
                      }
                    >
                      {current.actionLabel}
                    </button>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* step dots */}
              <div className="flex items-center gap-1.5 mt-7 mb-5">
                {steps.map((_, i) => (
                  <span
                    key={i}
                    className={
                      'h-1.5 rounded-full transition-all duration-300 ' +
                      (i === safeStep
                        ? accent === 'indigo'
                          ? 'w-5 bg-indigo-400'
                          : 'w-5 bg-emerald-400'
                        : 'w-1.5 bg-white/20')
                    }
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                {safeStep > 0 ? (
                  <button
                    onClick={back}
                    className="flex items-center gap-1 px-4 py-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] text-white/70 text-[14px] font-semibold transition-all active:scale-[0.98]"
                  >
                    <ChevronLeft size={16} /> {t.back}
                  </button>
                ) : (
                  <button
                    onClick={close}
                    className="px-4 py-3 rounded-2xl text-white/40 hover:text-white/70 text-[14px] font-medium transition-colors"
                  >
                    {t.skip}
                  </button>
                )}

                <button
                  onClick={next}
                  className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-white text-zinc-950 rounded-2xl font-semibold text-[14px] hover:bg-zinc-200 transition-all active:scale-[0.98]"
                >
                  {isLast ? t.finish : t.next}
                  {!isLast && <ChevronRight size={16} />}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
