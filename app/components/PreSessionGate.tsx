'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, Phone, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Locale } from '../i18n/dict';

const STRINGS: Record<'ru' | 'en', {
  badge: string;
  title: string;
  sub: string;

  screenTitle: string;
  screenIntro: string;
  screenItems: string[];

  stopTitle: string;
  stopBody: string;
  stopHint: string;
  openResources: string;

  consentTitle: string;
  consentItems: string[];

  accept: string;
}> = {
  ru: {
    badge: 'Перед началом',
    title: 'Краткая проверка',
    sub: 'Займет меньше минуты. Помогает убедиться, что инструмент подходит вам сейчас.',

    screenTitle: 'Отметьте, если это есть прямо сейчас',
    screenIntro: 'По умолчанию все пункты - "нет". Отметьте любой, который верен для вас сейчас.',
    screenItems: [
      'Ощущение нереальности или отстраненности от себя и окружающего',
      'Острые мысли о причинении вреда себе или суициде',
      'Психоз или мания прямо сейчас',
      'Тяжелое диссоциативное расстройство (диагноз)',
      'Вещества, нарушающие способность саморегуляции',
    ],

    stopTitle: 'Сейчас лучше обратиться к специалисту',
    stopBody:
      'Один или несколько пунктов указывают, что самостоятельная работа с двойным вниманием сейчас небезопасна. ' +
      'Это не критика - просто сигнал: нужна профессиональная поддержка.',
    stopHint: 'Откройте раздел ресурсов, чтобы найти кризисную помощь и контакты специалистов.',
    openResources: 'Открыть ресурсы поддержки',

    consentTitle: 'Понимание и согласие',
    consentItems: [
      'Я понимаю, что это инструмент самопомощи, а не терапия и не замена специалисту.',
      'Я могу остановить сессию в любой момент и использую заземление / 5-4-3-2-1, если почувствую дискомфорт.',
      'Для полноценной работы с травмой рядом должен быть обученный специалист - я использую инструмент для заземления и расслабления.',
    ],

    accept: 'Начать',
  },
  en: {
    badge: 'Before you start',
    title: 'Quick check',
    sub: 'Takes under a minute. Helps confirm the tool is right for you right now.',

    screenTitle: 'Tap anything that is true right now',
    screenIntro: 'All items default to "no". Tap any that apply to you at this moment.',
    screenItems: [
      'Feeling unreal or detached from yourself or surroundings',
      'Acute thoughts of self-harm or suicide',
      'Psychosis or mania right now',
      'Known severe dissociative disorder (diagnosed)',
      'Under substances that impair self-regulation',
    ],

    stopTitle: 'A specialist would be the right next step',
    stopBody:
      'One or more items suggest that self-guided dual-attention work is not safe right now. ' +
      'This is not a judgment - just a signal that professional support would help.',
    stopHint: 'Open the resources panel to find crisis lines and specialist contacts.',
    openResources: 'Open support resources',

    consentTitle: 'Understanding and consent',
    consentItems: [
      'I understand this is a self-help tool, not therapy and not a substitute for a specialist.',
      'I can stop at any time and will use grounding / 5-4-3-2-1 if I feel distressed.',
      'For actual trauma processing a trained specialist should be present - I am using this for grounding and relaxation.',
    ],

    accept: 'Start',
  },
};

function resolveStrings(lang: Locale) {
  return lang === 'en' ? STRINGS.en : STRINGS.ru;
}

export function PreSessionGate() {
  const isGateOpen = useStore((s) => s.isGateOpen);
  const lang = useStore((s) => s.lang);
  const setConsentGiven = useStore((s) => s.setConsentGiven);
  const setDissociationScreenPassed = useStore((s) => s.setDissociationScreenPassed);
  const setIsGateOpen = useStore((s) => s.setIsGateOpen);
  const setIsResourcesOpen = useStore((s) => s.setIsResourcesOpen);

  const s = resolveStrings(lang);

  const [step, setStep] = useState<'screen' | 'stop' | 'consent'>('screen');
  const [flags, setFlags] = useState<boolean[]>(s.screenItems.map(() => false));
  const [checks, setChecks] = useState<boolean[]>(s.consentItems.map(() => false));

  const handleOpen = () => {
    setFlags(s.screenItems.map(() => false));
    setChecks(s.consentItems.map(() => false));
    setStep('screen');
  };

  const toggleFlag = (i: number) => {
    setFlags((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const toggleCheck = (i: number) => {
    setChecks((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const anyFlagged = flags.some(Boolean);
  const allChecked = checks.every(Boolean);

  const handleScreenNext = () => {
    if (anyFlagged) {
      setDissociationScreenPassed(false);
      setStep('stop');
    } else {
      setStep('consent');
    }
  };

  const handleAccept = () => {
    setConsentGiven(true);
    setDissociationScreenPassed(true);
    setIsGateOpen(false);
  };

  const handleOpenResources = () => {
    setIsResourcesOpen(true);
    setIsGateOpen(false);
  };

  const handleDismiss = () => {
    setIsGateOpen(false);
  };

  return (
    <AnimatePresence onExitComplete={handleOpen}>
      {isGateOpen && (
        <motion.div
          key="gate-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleDismiss}
          className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-2xl"
        >
          <motion.div
            key="gate-panel"
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 16, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#0d0d0f] border border-white/[0.06] rounded-[28px] p-7 shadow-2xl relative overflow-hidden max-h-[92vh] overflow-y-auto no-scrollbar"
          >
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none" />

            <button
              onClick={handleDismiss}
              aria-label={lang === 'en' ? 'Close' : 'Закрыть'}
              className="absolute top-3.5 right-3.5 w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all z-20"
            >
              <X size={18} />
            </button>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="flex items-center gap-2 text-cyan-300/90 text-[11px] font-bold uppercase tracking-[0.15em] mb-2">
                <ShieldCheck size={13} />
                {s.badge}
              </div>

              <h2 className="text-[22px] font-bold text-white tracking-tight mb-1">{s.title}</h2>
              <p className="text-white/45 text-[13px] mb-6 max-w-sm">{s.sub}</p>

              {step === 'screen' && (
                <div className="w-full text-left">
                  <p className="text-white/50 text-[12px] font-semibold uppercase tracking-wider mb-1">
                    {s.screenTitle}
                  </p>
                  <p className="text-white/35 text-[12px] mb-4">{s.screenIntro}</p>

                  <div className="flex flex-col gap-2 mb-6">
                    {s.screenItems.map((item, i) => {
                      const active = flags[i];
                      return (
                        <button
                          key={i}
                          onClick={() => toggleFlag(i)}
                          className={[
                            'flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all duration-150',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400/60',
                            active
                              ? 'bg-rose-500/15 border-rose-400/30 text-rose-200'
                              : 'bg-white/[0.03] border-white/[0.06] text-white/65 hover:bg-white/[0.06] hover:text-white/80',
                          ].join(' ')}
                          aria-pressed={active}
                        >
                          <span
                            className={[
                              'mt-[2px] flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
                              active
                                ? 'border-rose-400 bg-rose-500'
                                : 'border-white/15 bg-transparent',
                            ].join(' ')}
                          >
                            {active && (
                              <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                            )}
                          </span>
                          <span className="text-[13px] leading-snug">{item}</span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleScreenNext}
                    className={[
                      'w-full py-3.5 rounded-2xl font-semibold text-[14px] transition-all active:scale-[0.98]',
                      anyFlagged
                        ? 'bg-rose-500/20 border border-rose-400/30 text-rose-200 hover:bg-rose-500/30'
                        : 'bg-white text-zinc-950 hover:bg-zinc-200',
                    ].join(' ')}
                  >
                    {lang === 'en' ? 'Next' : 'Далее'}
                  </button>
                </div>
              )}

              {step === 'stop' && (
                <div className="w-full text-left">
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/10 blur-[60px] rounded-full pointer-events-none" />

                  <div className="relative flex flex-col items-center text-center mb-6">
                    <div className="w-14 h-14 rounded-full bg-rose-500/15 border border-rose-400/20 flex items-center justify-center mb-4">
                      <AlertTriangle size={24} className="text-rose-300" />
                    </div>
                    <h3 className="text-[18px] font-bold text-white mb-2">{s.stopTitle}</h3>
                    <p className="text-white/55 text-[13px] leading-relaxed mb-4">{s.stopBody}</p>

                    <div className="w-full p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-start gap-3 text-left mb-6">
                      <Phone size={14} className="text-cyan-300/70 mt-0.5 flex-shrink-0" />
                      <p className="text-white/50 text-[12px] leading-relaxed">{s.stopHint}</p>
                    </div>

                    <button
                      onClick={handleOpenResources}
                      className="w-full py-3.5 bg-cyan-500/15 border border-cyan-400/25 text-cyan-200 rounded-2xl font-semibold text-[14px] hover:bg-cyan-500/25 transition-all active:scale-[0.98]"
                    >
                      {s.openResources}
                    </button>
                  </div>
                </div>
              )}

              {step === 'consent' && (
                <div className="w-full text-left">
                  <p className="text-white/50 text-[12px] font-semibold uppercase tracking-wider mb-4">
                    {s.consentTitle}
                  </p>

                  <div className="flex flex-col gap-2 mb-6">
                    {s.consentItems.map((item, i) => {
                      const checked = checks[i];
                      return (
                        <button
                          key={i}
                          onClick={() => toggleCheck(i)}
                          className={[
                            'flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all duration-150',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60',
                            checked
                              ? 'bg-emerald-500/12 border-emerald-400/25 text-emerald-100'
                              : 'bg-white/[0.03] border-white/[0.06] text-white/60 hover:bg-white/[0.06] hover:text-white/80',
                          ].join(' ')}
                          aria-pressed={checked}
                        >
                          <span
                            className={[
                              'mt-[2px] flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
                              checked
                                ? 'border-emerald-400 bg-emerald-500'
                                : 'border-white/15 bg-transparent',
                            ].join(' ')}
                          >
                            {checked && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          <span className="text-[13px] leading-snug">{item}</span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleAccept}
                    disabled={!allChecked}
                    className={[
                      'w-full py-3.5 rounded-2xl font-semibold text-[14px] transition-all active:scale-[0.98]',
                      allChecked
                        ? 'bg-white text-zinc-950 hover:bg-zinc-200'
                        : 'bg-white/10 text-white/30 cursor-not-allowed',
                    ].join(' ')}
                  >
                    {s.accept}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
