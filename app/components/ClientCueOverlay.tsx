'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';

// Box-breathing cadence (seconds per phase) and the scale the circle eases to.
const BOX_SECONDS = [4, 4, 4, 4];
const BOX_SCALE = [1.0, 1.0, 0.62, 0.62];

type Strings = {
  butterflyTitle: string;
  butterflyHint: string;
  breathingTitle: string;
  breathPhases: [string, string, string, string];
  groundingTitle: string;
  groundingLead: string;
  grounding: [string, string, string, string, string];
};

// Local copy, ru + en only (any other locale falls back to ru).
const RU: Strings = {
  butterflyTitle: 'Объятие бабочки',
  butterflyHint: 'Скрестите руки на груди и мягко постукивайте по плечам, по очереди слева и справа, в спокойном ритме.',
  breathingTitle: 'Дыхание по квадрату',
  breathPhases: ['Вдох', 'Задержка', 'Выдох', 'Задержка'],
  groundingTitle: 'Заземление 5-4-3-2-1',
  groundingLead: 'Назовите про себя, не торопясь, на спокойном дыхании.',
  grounding: [
    '5 вещей, которые вы видите',
    '4 вещи, которые вы можете потрогать',
    '3 звука, которые вы слышите',
    '2 запаха, которые вы чувствуете',
    '1 вкус, который вы ощущаете',
  ],
};

const EN: Strings = {
  butterflyTitle: 'Butterfly hug',
  butterflyHint: 'Cross your arms over your chest and gently tap your shoulders, alternating left and right, at a calm pace.',
  breathingTitle: 'Box breathing',
  breathPhases: ['Inhale', 'Hold', 'Exhale', 'Hold'],
  groundingTitle: 'Grounding 5-4-3-2-1',
  groundingLead: 'Name them quietly to yourself, slowly, with calm breathing.',
  grounding: [
    '5 things you can see',
    '4 things you can touch',
    '3 sounds you can hear',
    '2 smells you can notice',
    '1 taste you can sense',
  ],
};

// A slow box-breathing circle, shared by 'breathing' and 'grounding'.
function BreathingCircle({ phases }: { phases: [string, string, string, string] }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % BOX_SECONDS.length), BOX_SECONDS[0] * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
      <motion.div
        className="absolute w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-emerald-500/12"
        animate={{ scale: BOX_SCALE[phase], opacity: [0.7, 0.95, 0.7] }}
        transition={{ duration: BOX_SECONDS[phase], ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-cyan-400/[0.18] blur-2xl"
        animate={{ scale: BOX_SCALE[phase] }}
        transition={{ duration: BOX_SECONDS[phase], ease: 'easeInOut' }}
      />
      <div className="relative z-10 text-center">
        <span className="block text-white text-lg font-medium tracking-tight">{phases[phase]}</span>
        <span className="block text-emerald-200/70 text-[13px] mt-1 tabular-nums">{BOX_SECONDS[phase]}</span>
      </div>
    </div>
  );
}

// Butterfly-hug guide: two glowing shoulder zones alternating ~1 Hz.
function ButterflyGuide({ s }: { s: Strings }) {
  const [side, setSide] = useState<0 | 1>(0);

  useEffect(() => {
    const id = setInterval(() => setSide((v) => (v === 0 ? 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const zone = (active: boolean) => ({
    opacity: active ? 1 : 0.35,
    scale: active ? 1.06 : 0.94,
  });

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex items-center justify-center gap-6 sm:gap-10">
        {[0, 1].map((i) => {
          const active = side === i;
          return (
            <motion.div
              key={i}
              animate={zone(active)}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-violet-500/20 blur-2xl" />
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-indigo-500/[0.16] flex items-center justify-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-violet-400/30" />
              </div>
            </motion.div>
          );
        })}
      </div>
      <p className="max-w-sm text-center text-white/55 text-[14px] leading-relaxed px-2">{s.butterflyHint}</p>
    </div>
  );
}

export function ClientCueOverlay() {
  const clientCue = useStore((state) => state.clientCue);
  const lang = useStore((state) => state.lang);
  const s = lang === 'en' ? EN : RU;

  const title =
    clientCue === 'butterfly' ? s.butterflyTitle
    : clientCue === 'breathing' ? s.breathingTitle
    : clientCue === 'grounding' ? s.groundingTitle
    : '';

  return (
    <AnimatePresence>
      {clientCue !== 'none' && (
        <motion.div
          key={clientCue}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[115] flex items-center justify-center px-6 py-10 bg-zinc-950/92 backdrop-blur-2xl overflow-y-auto no-scrollbar"
        >
          {/* soft accent glow, color follows the cue */}
          <div
            className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 blur-[90px] rounded-full pointer-events-none ${
              clientCue === 'butterfly' ? 'bg-violet-500/10' : 'bg-emerald-500/10'
            }`}
          />

          <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-md w-full">
            <h2 className="text-white text-[22px] sm:text-[26px] font-medium tracking-tight">{title}</h2>

            {clientCue === 'butterfly' && <ButterflyGuide s={s} />}

            {clientCue === 'breathing' && <BreathingCircle phases={s.breathPhases} />}

            {clientCue === 'grounding' && (
              <div className="flex flex-col items-center gap-7 w-full">
                <BreathingCircle phases={s.breathPhases} />
                <p className="text-white/55 text-[14px] leading-relaxed max-w-sm">{s.groundingLead}</p>
                <div className="w-full flex flex-col gap-2 text-left">
                  {s.grounding.map((g) => (
                    <div
                      key={g}
                      className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-emerald-500/[0.06]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70 shrink-0" />
                      <span className="text-[14px] text-white/75 leading-snug">{g}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
