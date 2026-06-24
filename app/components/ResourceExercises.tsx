'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Shield, Sun, Box, Wind, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';

// ---------------------------------------------------------------------------
// Local strings - ru + en, no edits to shared i18n files
// ---------------------------------------------------------------------------

type Locale = string;

interface ExStrings {
  title: string;
  subtitle: string;
  disclaimer: string;
  note: string;
  back: string;
  next: string;
  finish: string;
  stepOf: (cur: number, total: number) => string;
  exercises: ExerciseDef[];
}

interface ExerciseDef {
  id: string;
  name: string;
  tagline: string;
  steps: string[];
}

const strings: Record<string, ExStrings> = {
  ru: {
    title: 'Ресурсные упражнения',
    subtitle: 'Стабилизация и заземление - фаза 2 EMDR',
    disclaimer: 'Эти упражнения - стабилизация и заземление, не переработка травмы. Безопасны без терапевта.',
    note: 'Стабилизация',
    back: 'Назад',
    next: 'Далее',
    finish: 'Завершить',
    stepOf: (cur, total) => `Шаг ${cur} из ${total}`,
    exercises: [
      {
        id: 'safe_place',
        name: 'Безопасное место',
        tagline: 'Визуализация спокойного пространства',
        steps: [
          'Устройтесь удобно. Закройте глаза или направьте взгляд вниз. Сделайте три медленных вдоха и выдоха.',
          'Представьте место, где вам спокойно и безопасно. Это может быть реальное или воображаемое место.',
          'Оглянитесь в этом месте. Что вы видите вокруг? Замечайте цвета, свет, очертания.',
          'Прислушайтесь. Какие звуки есть в этом месте? Или, может быть, там тихо?',
          'Почувствуйте воздух на коже. Температуру, возможно запах. Ощутите землю или поверхность под ногами.',
          'Позвольте себе полностью находиться здесь. Почувствуйте, как тело расслабляется. Запомните это ощущение.',
          'Дайте этому месту название - слово или образ, к которому вы сможете вернуться в любой момент. Медленно откройте глаза.',
        ],
      },
      {
        id: 'container',
        name: 'Контейнер',
        tagline: 'Временно убрать тревожный материал',
        steps: [
          'Сядьте удобно. Сделайте несколько спокойных вдохов. Напомните себе: вы в безопасности прямо сейчас.',
          'Представьте надежный контейнер. Это может быть сейф, сундук, ящик - любой прочный закрытый сосуд.',
          'Рассмотрите его: материал, размер, замок или крышка. Убедитесь, что он достаточно крепкий.',
          'Назовите то, что сейчас вас беспокоит - одним словом или образом. Не погружайтесь в детали.',
          'Представьте, как вы помещаете это в контейнер. Закройте крышку. Заприте замок. Контейнер надежен.',
          'Поставьте контейнер в безопасное место в вашем воображении - на полку, в хранилище. Он никуда не денется.',
          'Сделайте вдох. Вы можете вернуться к этому материалу позже, когда будете готовы - и с поддержкой.',
        ],
      },
      {
        id: 'light_stream',
        name: 'Поток света',
        tagline: 'Теплый свет через тело',
        steps: [
          'Сядьте или лягте удобно. Закройте глаза. Три медленных дыхания.',
          'Представьте теплый, мягкий свет - любого цвета, который ощущается как целительный и спокойный.',
          'Пусть этот свет входит через макушку головы. Ощутите мягкое тепло.',
          'Медленно свет движется вниз: лоб, лицо, шея. Там, где свет проходит - напряжение растворяется.',
          'Свет течет через плечи, руки, грудь. Каждый выдох - чуть больше расслабления.',
          'Теперь свет проходит через живот, поясницу, бедра, колени, голени.',
          'Свет достигает ступней и уходит в землю, унося с собой все лишнее. Тело светлое и спокойное.',
        ],
      },
      {
        id: 'butterfly_hug',
        name: 'Объятие бабочки',
        tagline: 'Попеременное постукивание для самоуспокоения',
        steps: [
          'Сядьте прямо. Скрестите руки на груди: правая рука на левом плече, левая - на правом.',
          'Закройте глаза или слегка опустите взгляд. Сделайте один глубокий вдох.',
          'Следите за анимацией ниже. Начните медленно постукивать попеременно: сначала правой рукой, потом левой.',
          'Продолжайте в медленном ритме - примерно раз в секунду. Дышите ровно и спокойно.',
          'Думайте о чем-то нейтральном или немного приятном, пока выполняете постукивание.',
          'Сделайте 20-30 попеременных постукиваний. Затем остановитесь. Сделайте глубокий вдох.',
          'Опустите руки. Как вы себя чувствуете? Замечайте любые изменения в теле или настроении.',
        ],
      },
    ],
  },
  en: {
    title: 'Resource Exercises',
    subtitle: 'Stabilization and grounding - EMDR phase 2',
    disclaimer: 'These exercises are stabilization and grounding, not trauma reprocessing. Safe without a therapist.',
    note: 'Stabilization',
    back: 'Back',
    next: 'Next',
    finish: 'Finish',
    stepOf: (cur, total) => `Step ${cur} of ${total}`,
    exercises: [
      {
        id: 'safe_place',
        name: 'Safe / Calm Place',
        tagline: 'Guided visualization of a peaceful space',
        steps: [
          'Get comfortable. Close your eyes or soften your gaze downward. Take three slow, deep breaths.',
          'Imagine a place where you feel calm and safe. It can be real or completely imagined.',
          'Look around in that place. What do you see? Notice colors, light, shapes.',
          'Listen. What sounds are there - or is it quiet?',
          'Notice the air on your skin. Temperature, maybe a scent. Feel the ground or surface beneath you.',
          'Let yourself be fully present there. Feel your body relax. Remember this feeling.',
          'Give this place a name - a word or image you can return to any time. Slowly open your eyes.',
        ],
      },
      {
        id: 'container',
        name: 'Container',
        tagline: 'Mentally set aside disturbing material',
        steps: [
          'Sit comfortably. Take a few calm breaths. Remind yourself: you are safe right now.',
          'Imagine a strong container - a safe, a chest, a box. Something solid with a secure lid or lock.',
          'Examine it: the material, size, the lock or latch. Make sure it feels sturdy enough.',
          'Name what is bothering you - just one word or image. Do not dive into details.',
          'Picture placing it inside the container. Close the lid. Lock it. The container is secure.',
          'Set the container somewhere safe in your imagination - on a shelf, in a vault. It will stay there.',
          'Take a breath. You can return to this material later when you are ready - and with support.',
        ],
      },
      {
        id: 'light_stream',
        name: 'Light Stream',
        tagline: 'Warm light moving through the body',
        steps: [
          'Sit or lie comfortably. Close your eyes. Three slow breaths.',
          'Imagine a warm, gentle light - any color that feels healing and calm to you.',
          'Let this light enter through the top of your head. Feel a gentle warmth.',
          'Slowly the light moves down: forehead, face, neck. Where the light passes, tension dissolves.',
          'Light flows through shoulders, arms, chest. Each exhale - a little more relaxation.',
          'Now the light moves through the belly, lower back, hips, knees, calves.',
          'The light reaches your feet and flows into the earth, carrying away anything you no longer need.',
        ],
      },
      {
        id: 'butterfly_hug',
        name: 'Butterfly Hug',
        tagline: 'Alternating self-tapping for self-soothing',
        steps: [
          'Sit upright. Cross your arms over your chest: right hand on left shoulder, left hand on right shoulder.',
          'Close your eyes or soften your gaze downward. Take one deep breath.',
          'Follow the animation below. Start tapping slowly and alternately: first right hand, then left.',
          'Continue at a slow pace - about once per second. Breathe steadily and calmly.',
          'Think of something neutral or mildly pleasant while you tap.',
          'Do 20-30 alternating taps. Then stop. Take a deep breath.',
          'Lower your arms. How do you feel? Notice any changes in your body or mood.',
        ],
      },
    ],
  },
};

function getStrings(lang: Locale): ExStrings {
  return strings[lang] ?? strings['ru'];
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

/** Slow breathing circle used in Safe Place and Light Stream steps */
function BreathCircle({ color }: { color: string }) {
  return (
    <div className="relative w-28 h-28 flex items-center justify-center mx-auto my-4">
      <motion.div
        className="absolute rounded-full border"
        style={{
          width: 80,
          height: 80,
          backgroundColor: `${color}18`,
          borderColor: `${color}50`,
        }}
        animate={{ scale: [1, 1.55, 1.55, 1, 1] }}
        transition={{
          duration: 16,
          ease: 'easeInOut',
          repeat: Infinity,
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 28,
          height: 28,
          backgroundColor: `${color}55`,
        }}
        animate={{ scale: [1, 1.3, 1.3, 1, 1] }}
        transition={{
          duration: 16,
          ease: 'easeInOut',
          repeat: Infinity,
          times: [0, 0.25, 0.5, 0.75, 1],
        }}
      />
    </div>
  );
}

/** Butterfly Hug pacing: a butterfly whose wings bloom with color alternately
 *  (left, then right) in a slow, smooth rhythm to pace the alternating self-taps. */
function ButterflyHugAnim() {
  const D = 2.6; // full left+right cycle, calm pace (~1.3s per side)
  const tr = (times: number[]) => ({ duration: D, times, repeat: Infinity, ease: 'easeInOut' as const });

  return (
    <div className="flex items-center justify-center my-5">
      <motion.svg
        viewBox="0 0 220 170"
        className="w-44 h-36"
        animate={{ y: [0, -5, 0], rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: D, repeat: Infinity, ease: 'easeInOut' }}
      >
        <defs>
          <radialGradient id="bwing" cx="50%" cy="45%" r="68%">
            <stop offset="0%" stopColor="#c4b5fd" />
            <stop offset="55%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#7c5cff" />
          </radialGradient>
        </defs>

        {/* wing outlines - always visible, color fills in on the active side */}
        <g fill="none" stroke="rgba(196,181,253,0.4)" strokeWidth={1.5}>
          <ellipse cx={76} cy={60} rx={37} ry={29} />
          <ellipse cx={85} cy={108} rx={28} ry={24} />
          <ellipse cx={144} cy={60} rx={37} ry={29} />
          <ellipse cx={135} cy={108} rx={28} ry={24} />
        </g>

        {/* left wings fill (blooms first) */}
        <motion.g
          fill="url(#bwing)"
          style={{ transformBox: 'fill-box', transformOrigin: '92% 50%' }}
          animate={{ opacity: [0.1, 1, 0.12, 0.1], scale: [1, 1.06, 1, 1] }}
          transition={tr([0, 0.28, 0.5, 1])}
        >
          <ellipse cx={76} cy={60} rx={37} ry={29} />
          <ellipse cx={85} cy={108} rx={28} ry={24} />
        </motion.g>

        {/* right wings fill (blooms second) */}
        <motion.g
          fill="url(#bwing)"
          style={{ transformBox: 'fill-box', transformOrigin: '8% 50%' }}
          animate={{ opacity: [0.1, 0.12, 1, 0.1], scale: [1, 1, 1.06, 1] }}
          transition={tr([0, 0.5, 0.78, 1])}
        >
          <ellipse cx={144} cy={60} rx={37} ry={29} />
          <ellipse cx={135} cy={108} rx={28} ry={24} />
        </motion.g>

        {/* body + head + antennae */}
        <ellipse cx={110} cy={86} rx={5} ry={38} fill="#ddd6fe" />
        <circle cx={110} cy={50} r={6} fill="#ddd6fe" />
        <path d="M110 46 C 104 32, 97 28, 90 26" fill="none" stroke="#c4b5fd" strokeWidth={1.5} strokeLinecap="round" />
        <path d="M110 46 C 116 32, 123 28, 130 26" fill="none" stroke="#c4b5fd" strokeWidth={1.5} strokeLinecap="round" />
        <circle cx={90} cy={26} r={2.5} fill="#c4b5fd" />
        <circle cx={130} cy={26} r={2.5} fill="#c4b5fd" />
      </motion.svg>
    </div>
  );
}

/** Container for exercise-specific animation on a given step */
function StepAnimation({ exerciseId, stepIndex, accent }: { exerciseId: string; stepIndex: number; accent: string }) {
  if (exerciseId === 'butterfly_hug' && stepIndex >= 2 && stepIndex <= 5) {
    return <ButterflyHugAnim />;
  }
  if ((exerciseId === 'safe_place' && stepIndex >= 1) ||
    (exerciseId === 'light_stream') ||
    (exerciseId === 'container' && stepIndex >= 1 && stepIndex <= 4)) {
    return <BreathCircle color={accent} />;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Warm glow layer for Light Stream exercise
// ---------------------------------------------------------------------------

function WarmGlowLayer() {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-[28px] pointer-events-none">
      {/* Glow 1 - top-left amber orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 280,
          height: 280,
          background: 'radial-gradient(circle, rgba(251,191,36,0.28) 0%, rgba(251,146,60,0.12) 50%, transparent 75%)',
          filter: 'blur(24px)',
          top: -60,
          left: -40,
        }}
        animate={{
          x: [0, 18, -10, 0],
          y: [0, 12, 24, 0],
          scale: [1, 1.08, 0.95, 1],
          opacity: [0.7, 1, 0.8, 0.7],
        }}
        transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
      />
      {/* Glow 2 - bottom-right rose orb */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 220,
          height: 220,
          background: 'radial-gradient(circle, rgba(251,113,133,0.22) 0%, rgba(253,186,116,0.12) 50%, transparent 75%)',
          filter: 'blur(28px)',
          bottom: -40,
          right: -30,
        }}
        animate={{
          x: [0, -14, 8, 0],
          y: [0, -10, -20, 0],
          scale: [1, 0.92, 1.1, 1],
          opacity: [0.6, 0.9, 0.65, 0.6],
        }}
        transition={{ duration: 12, ease: 'easeInOut', repeat: Infinity, delay: 1.5 }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step runner
// ---------------------------------------------------------------------------

interface StepRunnerProps {
  exercise: ExerciseDef;
  accent: string;
  icon: React.ReactNode;
  strings: ExStrings;
  onClose: () => void;
}

function StepRunner({ exercise, accent, icon, strings: s, onClose }: StepRunnerProps) {
  const [step, setStep] = useState(0);
  const total = exercise.steps.length;
  const isLast = step === total - 1;
  const isLightStream = exercise.id === 'light_stream';

  const goNext = () => {
    if (isLast) {
      onClose();
    } else {
      setStep((p) => p + 1);
    }
  };
  const goBack = () => setStep((p) => Math.max(0, p - 1));

  if (isLightStream) {
    return (
      <div className="flex flex-col h-full relative">
        {/* Header (top padding clears the corner back/close buttons so they do not overlap the icon) */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: 'rgba(251,191,36,0.18)' }}
          >
            {icon}
          </div>
          <div className="min-w-0">
            <div className="text-[14px] font-semibold text-amber-950 leading-tight">{exercise.name}</div>
            <div className="text-[11px] text-orange-800/60 mt-0.5">{exercise.tagline}</div>
          </div>
        </div>

        {/* Disclaimer badge - warm tones */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-amber-500/[0.12] border border-amber-600/20 mb-5">
          <Shield size={12} className="text-amber-700/80 shrink-0" />
          <span className="text-[11px] text-amber-900/70 leading-tight">{s.disclaimer}</span>
        </div>

        {/* Step content */}
        <div className="flex-1 flex flex-col">
          {/* Progress dots */}
          <div className="flex gap-1.5 justify-center mb-4">
            {exercise.steps.map((_, i) => (
              <motion.div
                key={i}
                className="h-1 rounded-full"
                animate={{
                  width: i === step ? 20 : 6,
                  backgroundColor: i <= step ? '#d97706' : 'rgba(120,53,15,0.18)',
                }}
                transition={{ duration: 0.25 }}
              />
            ))}
          </div>

          <div className="text-[11px] text-amber-800/50 text-center mb-3 tabular-nums">
            {s.stepOf(step + 1, total)}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <StepAnimation exerciseId={exercise.id} stepIndex={step} accent="#f59e0b" />

              <p className="text-[14px] text-amber-950/85 leading-[1.75] text-center px-2">
                {exercise.steps[step]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Nav buttons */}
        <div className="flex gap-3 mt-6 pt-4 border-t border-amber-800/15">
          <button
            onClick={goBack}
            disabled={step === 0}
            className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-amber-900/[0.08] text-amber-900/60 text-[13px] font-medium disabled:opacity-30 hover:bg-amber-900/[0.14] hover:text-amber-950 transition-all active:scale-[0.97]"
          >
            <ChevronLeft size={15} />
            {s.back}
          </button>
          <button
            onClick={goNext}
            className="flex-1 py-3 rounded-xl font-semibold text-[13px] flex items-center justify-center gap-1.5 transition-all active:scale-[0.97] bg-amber-500/80 text-white hover:bg-amber-500 shadow-sm"
          >
            {isLast ? s.finish : s.next}
            {!isLast && <ChevronRight size={15} />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${accent}20` }}
        >
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-[14px] font-semibold text-white/90 leading-tight">{exercise.name}</div>
          <div className="text-[11px] text-white/35 mt-0.5">{exercise.tagline}</div>
        </div>
      </div>

      {/* Disclaimer badge */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/15 mb-5">
        <Shield size={12} className="text-emerald-400/80 shrink-0" />
        <span className="text-[11px] text-emerald-200/65 leading-tight">{s.disclaimer}</span>
      </div>

      {/* Step content */}
      <div className="flex-1 flex flex-col">
        {/* Progress dots */}
        <div className="flex gap-1.5 justify-center mb-4">
          {exercise.steps.map((_, i) => (
            <motion.div
              key={i}
              className="h-1 rounded-full"
              animate={{
                width: i === step ? 20 : 6,
                backgroundColor: i <= step ? accent : 'rgba(255,255,255,0.12)',
              }}
              transition={{ duration: 0.25 }}
            />
          ))}
        </div>

        <div className="text-[11px] text-white/30 text-center mb-3 tabular-nums">
          {s.stepOf(step + 1, total)}
        </div>

        {/* Animation area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <StepAnimation exerciseId={exercise.id} stepIndex={step} accent={accent} />

            <p className="text-[14px] text-white/80 leading-[1.75] text-center px-2">
              {exercise.steps[step]}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav buttons */}
      <div className="flex gap-3 mt-6 pt-4 border-t border-white/[0.05]">
        <button
          onClick={goBack}
          disabled={step === 0}
          className="flex items-center gap-1.5 px-4 py-3 rounded-xl bg-white/[0.05] text-white/50 text-[13px] font-medium disabled:opacity-30 hover:bg-white/[0.09] hover:text-white/80 transition-all active:scale-[0.97]"
        >
          <ChevronLeft size={15} />
          {s.back}
        </button>
        <button
          onClick={goNext}
          className="flex-1 py-3 rounded-xl font-semibold text-[13px] flex items-center justify-center gap-1.5 transition-all active:scale-[0.97]"
          style={{ backgroundColor: `${accent}22`, color: accent, border: `1px solid ${accent}35` }}
        >
          {isLast ? s.finish : s.next}
          {!isLast && <ChevronRight size={15} />}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Exercise card data
// ---------------------------------------------------------------------------

interface ExerciseCard {
  id: string;
  accent: string;
  icon: React.ReactNode;
}

const CARDS: ExerciseCard[] = [
  { id: 'safe_place', accent: '#22d3ee', icon: <Sparkles size={16} style={{ color: '#22d3ee' }} /> },
  { id: 'container', accent: '#818cf8', icon: <Box size={16} style={{ color: '#818cf8' }} /> },
  { id: 'light_stream', accent: '#fbbf24', icon: <Sun size={16} style={{ color: '#fbbf24' }} /> },
  { id: 'butterfly_hug', accent: '#a78bfa', icon: <Wind size={16} style={{ color: '#a78bfa' }} /> },
];

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function ResourceExercises() {
  const isResourcesOpen = useStore((s) => s.isResourcesOpen);
  const setIsResourcesOpen = useStore((s) => s.setIsResourcesOpen);
  const setPlaying = useStore((s) => s.setPlaying);
  const lang = useStore((s) => s.lang);

  const [activeId, setActiveId] = useState<string | null>(null);

  const s = getStrings(lang);

  // Stop stimulation when overlay opens
  useEffect(() => {
    if (isResourcesOpen) {
      setPlaying(false);
      setActiveId(null);
    }
  }, [isResourcesOpen, setPlaying]);

  const handleClose = () => {
    setIsResourcesOpen(false);
    setActiveId(null);
  };

  const activeCard = CARDS.find((c) => c.id === activeId) ?? null;
  const activeExercise = s.exercises.find((e) => e.id === activeId) ?? null;
  const isLightStream = activeId === 'light_stream';

  return (
    <AnimatePresence>
      {isResourcesOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className={`fixed inset-0 z-[120] flex items-center justify-center p-4 backdrop-blur-2xl ${isLightStream ? '' : 'bg-zinc-950/90'}`}
          style={isLightStream ? { background: 'radial-gradient(circle at 50% 32%, rgba(255,243,224,0.93), rgba(254,215,170,0.9) 55%, rgba(255,228,230,0.92))' } : undefined}
        >
          <motion.div
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 16, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-[28px] p-6 shadow-2xl relative overflow-hidden max-h-[92vh] flex flex-col"
            style={
              isLightStream
                ? { background: 'linear-gradient(135deg, #fffbeb 0%, #fed7aa 45%, #ffe4e6 100%)', border: '1px solid rgba(180,83,9,0.14)' }
                : { backgroundColor: '#0d0d0f', border: '1px solid rgba(255,255,255,0.06)' }
            }
          >
            {/* Ambient glow - dark theme only */}
            {!isLightStream && (
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-500/8 blur-[80px] rounded-full pointer-events-none" />
            )}

            {/* Warm animated glows - light stream only */}
            {isLightStream && <WarmGlowLayer />}

            <div className="relative z-10 flex flex-col flex-1 min-h-0">
              {/* Top controls: aligned to the card content padding, never overlap content.
                  Back (when inside an exercise) on the left, close on the right. */}
              <div className="flex items-center justify-between mb-4 shrink-0 h-9">
                {activeId ? (
                  <button
                    onClick={() => setActiveId(null)}
                    aria-label="Back to list"
                    className={`flex items-center gap-1 pl-2 pr-3 h-9 rounded-lg text-[13px] font-medium transition-all ${
                      isLightStream
                        ? 'text-amber-900/60 hover:text-amber-950 hover:bg-amber-900/10'
                        : 'text-white/50 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <ChevronLeft size={16} /> {s.back}
                  </button>
                ) : (
                  <span />
                )}
                <button
                  onClick={handleClose}
                  aria-label="Close"
                  className={`w-9 h-9 flex items-center justify-center rounded-full transition-all ${
                    isLightStream
                      ? 'text-amber-900/50 hover:text-amber-950 hover:bg-amber-900/10'
                      : 'text-white/40 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Header */}
              <AnimatePresence mode="wait">
                {!activeId && (
                  <motion.div
                    key="header"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="mb-5"
                  >
                    <div className="flex items-center gap-2 text-indigo-300/80 text-[11px] font-bold uppercase tracking-[0.15em] mb-1">
                      <Shield size={12} />
                      {s.note}
                    </div>
                    <h2 className="text-[20px] font-bold text-white tracking-tight leading-tight">{s.title}</h2>
                    <p className="text-white/35 text-[12px] mt-1">{s.subtitle}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Content area */}
              <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
                <AnimatePresence mode="wait">
                  {!activeId ? (
                    <motion.div
                      key="picker"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="flex flex-col gap-3">
                        {CARDS.map((card) => {
                          const ex = s.exercises.find((e) => e.id === card.id);
                          if (!ex) return null;
                          return (
                            <button
                              key={card.id}
                              onClick={() => setActiveId(card.id)}
                              className="group w-full text-left flex items-center gap-4 p-4 rounded-2xl border border-transparent bg-white/[0.03] hover:bg-white/[0.07] transition-all active:scale-[0.99]"
                            >
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                style={{
                                  backgroundColor: `${card.accent}18`,
                                }}
                              >
                                {card.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-[14px] font-semibold text-white/90 leading-tight">{ex.name}</div>
                                <div className="text-[12px] text-white/40 mt-0.5 leading-tight">{ex.tagline}</div>
                              </div>
                              <ChevronRight size={15} className="text-white/20 group-hover:text-white/50 transition-colors shrink-0" />
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-5 flex items-start gap-2 px-3 py-2.5 rounded-xl bg-amber-500/[0.05] border border-amber-500/12">
                        <Shield size={12} className="text-amber-400/70 shrink-0 mt-0.5" />
                        <p className="text-[11px] text-amber-200/55 leading-relaxed">{s.disclaimer}</p>
                      </div>
                    </motion.div>
                  ) : activeCard && activeExercise ? (
                    <motion.div
                      key={`exercise-${activeId}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.25 }}
                      className="h-full"
                    >
                      <StepRunner
                        exercise={activeExercise}
                        accent={activeCard.accent}
                        icon={activeCard.icon}
                        strings={s}
                        onClose={handleClose}
                      />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
