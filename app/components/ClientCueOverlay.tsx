'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { cueStepCount, clampCueStep, type CueTechnique } from '../content/cues';
import { useT } from '../i18n/useT';
import { SectionLabel } from './ui/SectionLabel';

const BOX_SECONDS = [4, 4, 4, 4];
const BOX_SCALE = [1.0, 1.0, 0.62, 0.62];

function BreathingCircle({ phases }: { phases: string[] }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setPhase((p) => (p + 1) % BOX_SECONDS.length), BOX_SECONDS[0] * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
      <motion.div
        className="absolute w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-emerald-500/15"
        animate={{ scale: BOX_SCALE[phase], opacity: [0.7, 0.95, 0.7] }}
        transition={{ duration: BOX_SECONDS[phase], ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-cyan-500/15 blur-2xl"
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

function ButterflyGuide() {
  const [side, setSide] = useState<0 | 1>(0);

  useEffect(() => {
    const id = setInterval(() => setSide((v) => (v === 0 ? 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center justify-center gap-6 sm:gap-10">
      {[0, 1].map((i) => {
        const active = side === i;
        return (
          <motion.div
            key={i}
            animate={{ opacity: active ? 1 : 0.35, scale: active ? 1.06 : 0.94 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            className="relative flex items-center justify-center"
          >
            <div className="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-violet-500/15 blur-2xl" />
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-indigo-500/15 flex items-center justify-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-violet-500/15" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function LightStreamGlow() {
  return (
    <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
      <motion.div
        className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(251,191,36,0.22) 0%, rgba(251,146,60,0.12) 55%, transparent 80%)',
          filter: 'blur(18px)',
        }}
        animate={{ scale: [1, 1.12, 0.96, 1], opacity: [0.7, 1, 0.75, 0.7] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
      />
      <motion.div
        className="absolute w-32 h-32 sm:w-36 sm:h-36 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(253,186,116,0.30) 0%, rgba(251,191,36,0.14) 60%, transparent 85%)',
          filter: 'blur(10px)',
        }}
        animate={{ scale: [1, 1.18, 0.92, 1], opacity: [0.8, 1, 0.7, 0.8] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity, delay: 0.8 }}
      />
      <motion.div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(253,230,138,0.55) 0%, rgba(251,191,36,0.25) 70%, transparent 100%)' }}
        animate={{ scale: [1, 1.1, 0.95, 1], opacity: [0.85, 1, 0.8, 0.85] }}
        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity, delay: 0.4 }}
      />
    </div>
  );
}

// animation does not change with step so the motion stays continuous as the specialist advances the prompt
function CueAnimation({ tech }: { tech: CueTechnique }) {
  const t = useT();
  if (tech === 'butterfly') return <ButterflyGuide />;
  if (tech === 'lightstream') return <LightStreamGlow />;
  return <BreathingCircle phases={t.breathPhases} />;
}

export function ClientCueOverlay() {
  const t = useT();
  const clientCue = useStore((state) => state.clientCue);
  const cueStep = useStore((state) => state.cueStep);

  const tech = clientCue !== 'none' ? (clientCue as CueTechnique) : null;
  const content = tech ? t.cueContent[tech] : null;
  const stepTotal = tech ? cueStepCount(tech) : 0;
  const stepIdx = tech ? Math.min(clampCueStep(tech, cueStep), content!.steps.length - 1) : 0;
  const title = content ? content.title : '';
  const stepText = content ? content.steps[stepIdx] : '';

  return (
    <AnimatePresence>
      {tech && content && (
        <motion.div
          key={tech}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[115] flex items-center justify-center px-6 py-10 bg-zinc-950/85 backdrop-blur-2xl"
        >
          <div
            className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-72 h-72 blur-[90px] rounded-full pointer-events-none ${
              tech === 'butterfly' ? 'bg-violet-500/10' : tech === 'lightstream' ? 'bg-amber-400/10' : 'bg-emerald-500/10'
            }`}
          />

          <div className="relative z-10 flex flex-col items-center text-center gap-8 max-w-md w-full">
            <div className="flex flex-col items-center gap-2">
              <SectionLabel className="tabular-nums">
                {t.stepLabel} {stepIdx + 1} / {stepTotal}
              </SectionLabel>
              <h2 className="text-white text-[22px] sm:text-[26px] font-medium tracking-tight">{title}</h2>
            </div>

            <CueAnimation tech={tech} />

            <AnimatePresence mode="wait">
              <motion.p
                key={stepIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="text-white/80 text-[16px] sm:text-[18px] leading-relaxed max-w-sm"
              >
                {stepText}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
