'use client';

import {
  X, Lock, Play, Pause, Save, Check, RotateCcw,
  ClipboardList, Activity, BookOpen, Radio,
  Gauge, VolumeX, Sparkles, Wind, Anchor, Leaf, EyeOff, LifeBuoy,
  ArrowLeftRight, ArrowUpDown, MoveDiagonal, MoveDiagonal2,
  Infinity as InfinityIcon, GripHorizontal, Columns, TrendingUp,
  Circle, Square as SquareIcon, CircleDashed, Wand2,
  CloudRain, Waves, Music, Headphones, Moon, Orbit, Volume2, SlidersHorizontal
} from 'lucide-react';
import {
  useStore, SessionPhase, PatternType, ClientCue,
  TargetShape, AudioFormat, AmbientSound, VisualBackground
} from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useT } from '../i18n/useT';
import { saveSession } from '../lib/journal';
import { isHapticSupported } from '../hooks/useHapticBLS';
import { MiniStimPreview } from './MiniStimPreview';

// Ordered phase list. Index aligns with the t.phases array (phase 1 to 8).
const PHASE_ORDER: SessionPhase[] = [
  SessionPhase.Idle,
  SessionPhase.History,
  SessionPhase.Preparation,
  SessionPhase.Assessment,
  SessionPhase.Desensitization,
  SessionPhase.Installation,
  SessionPhase.BodyScan,
  SessionPhase.Closure
];

// ---- shared primitives (dense clinical UI, single radius + accent scale) ----

const Label = ({ children, color = 'text-white/40' }: { children: React.ReactNode; color?: string }) => (
  <span className={`text-[11px] uppercase tracking-[0.14em] font-semibold ${color}`}>{children}</span>
);

const SectionLabel = ({ children, color = 'text-white/40', icon: Icon }: {
  children: React.ReactNode; color?: string; icon?: typeof Gauge;
}) => (
  <div className="flex items-center gap-2">
    {Icon && <Icon size={13} className={`shrink-0 ${color}`} />}
    <Label color={color}>{children}</Label>
  </div>
);

// Filled value pill (no white outline).
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="text-white/80 text-[13px] font-medium tabular-nums bg-white/[0.05] px-2.5 py-1 rounded-lg">
    {children}
  </span>
);

// Toggle: accent fill when on, filled track when off (no white ring).
const Toggle = ({ enabled, onChange, accent }: { enabled: boolean; onChange: () => void; accent: string }) => (
  <button
    onClick={onChange}
    className={`w-11 h-6 rounded-full relative flex items-center transition-colors duration-300 shrink-0 ${enabled ? accent : 'bg-white/[0.08]'}`}
  >
    <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>
);

const Field = ({ label, value, onChange, placeholder, rows = 2 }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) => (
  <div className="flex flex-col gap-1.5">
    <Label color="text-white/50">{label}</Label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full resize-none rounded-xl bg-white/[0.03] px-3 py-2.5 text-[13px] leading-relaxed text-white/85 placeholder:text-white/20 focus:outline-none focus:bg-white/[0.05] transition-colors no-scrollbar"
    />
  </div>
);

// A row of numbered buttons for a bounded scale (SUD 0-10, VOC 1-7).
const ScaleRow = ({ from, to, value, onPick, accent }: {
  from: number;
  to: number;
  value: number | null;
  onPick: (v: number) => void;
  accent: string;
}) => {
  const items: number[] = [];
  for (let i = from; i <= to; i++) items.push(i);
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((i) => {
        const active = value === i;
        return (
          <button
            key={i}
            onClick={() => onPick(i)}
            className={`min-w-[34px] h-9 px-1 rounded-xl text-[13px] font-medium tabular-nums transition-all ${
              active ? accent : 'bg-white/[0.03] text-white/40 hover:bg-white/[0.07]'
            }`}
          >
            {i}
          </button>
        );
      })}
    </div>
  );
};

// Slider row with a value badge, mirroring SettingsPanel.
const SliderRow = ({ label, value, min, max, step, val, onChange, hint, color = 'text-white/50' }: {
  label: string;
  value: string;
  min: number;
  max: number;
  step: number;
  val: number;
  onChange: (v: number) => void;
  hint?: string;
  color?: string;
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-center gap-3">
      <Label color={color}>{label}</Label>
      <Badge>{value}</Badge>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={val}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      className="w-full"
    />
    {hint && <p className="text-white/25 text-[11px] leading-relaxed -mt-0.5">{hint}</p>}
  </div>
);

// Icon + label tile used for pattern / shape / ambient / background pickers.
const Tile = ({ active, accent, onClick, icon: Icon, children }: {
  active: boolean;
  accent: string;
  onClick: () => void;
  icon: typeof Gauge;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className={`min-h-[54px] py-2 px-1.5 rounded-xl text-[12px] font-medium leading-tight text-center transition-all flex flex-col gap-1.5 items-center justify-center min-w-0 ${
      active ? `${accent} shadow-lg` : 'bg-white/[0.03] text-white/40 hover:bg-white/[0.07]'
    }`}
  >
    <Icon size={15} strokeWidth={active ? 2 : 1.5} className="shrink-0" />
    <span className="block max-w-full truncate leading-[1.1]">{children}</span>
  </button>
);

// ---- static option tables (ids + icons), labels resolved from the dict ----

const PATTERNS: { id: PatternType; icon: typeof Gauge }[] = [
  { id: 'horizontal', icon: ArrowLeftRight },
  { id: 'vertical', icon: ArrowUpDown },
  { id: 'diagonal-1', icon: MoveDiagonal },
  { id: 'diagonal-2', icon: MoveDiagonal2 },
  { id: 'lemniscate', icon: InfinityIcon },
  { id: 'dots', icon: GripHorizontal },
  { id: 'pulse', icon: Activity },
  { id: 'bars', icon: Columns },
  { id: 'zigzag', icon: TrendingUp },
];

const SHAPES: { id: TargetShape; icon: typeof Gauge }[] = [
  { id: 'circle', icon: Circle },
  { id: 'square', icon: SquareIcon },
  { id: 'ring', icon: CircleDashed },
  { id: 'butterfly', icon: Wand2 },
];

const COLORS = [
  { value: '#06b6d4', shadow: '0 0 16px rgba(6,182,212,0.6)' },
  { value: '#10b981', shadow: '0 0 16px rgba(16,185,129,0.6)' },
  { value: '#f59e0b', shadow: '0 0 16px rgba(245,158,11,0.6)' },
  { value: '#f43f5e', shadow: '0 0 16px rgba(244,63,94,0.6)' },
  { value: '#ffffff', shadow: '0 0 16px rgba(255,255,255,0.6)' },
  { value: '#6366f1', shadow: '0 0 16px rgba(99,102,241,0.6)' },
];

const AUDIO_FORMATS: AudioFormat[] = ['continuous', 'click', 'metronome', 'white_noise', 'binaural_beats'];

const AMBIENTS: { id: AmbientSound; icon: typeof Gauge; accent: string }[] = [
  { id: 'none', icon: VolumeX, accent: 'bg-white/[0.08] text-white/80' },
  { id: 'rain', icon: CloudRain, accent: 'bg-cyan-500/15 text-cyan-200' },
  { id: 'ocean', icon: Waves, accent: 'bg-blue-500/15 text-blue-200' },
  { id: 'breath', icon: Wind, accent: 'bg-emerald-500/15 text-emerald-200' },
  { id: 'hz528', icon: Music, accent: 'bg-amber-500/15 text-amber-200' },
  { id: 'wind_harmonics', icon: Headphones, accent: 'bg-indigo-500/15 text-indigo-200' },
  { id: 'breathform', icon: Wind, accent: 'bg-violet-500/15 text-violet-200' },
  { id: 'pink', icon: Activity, accent: 'bg-pink-500/15 text-pink-200' },
  { id: 'brown', icon: Waves, accent: 'bg-orange-500/15 text-orange-200' },
  { id: 'drone', icon: Radio, accent: 'bg-teal-500/15 text-teal-200' },
];

const BACKGROUNDS: { id: VisualBackground; icon: typeof Gauge; accent: string }[] = [
  { id: 'black', icon: Moon, accent: 'bg-white/[0.08] text-white/80' },
  { id: 'aurora', icon: Orbit, accent: 'bg-emerald-500/15 text-emerald-200' },
  { id: 'stars', icon: Sparkles, accent: 'bg-indigo-500/15 text-indigo-200' },
];

export function TherapistPanel() {
  const t = useT();
  const lang = useStore((s) => s.lang);
  const isClinicalOpen = useStore((s) => s.isClinicalOpen);
  const setIsClinicalOpen = useStore((s) => s.setIsClinicalOpen);
  const setIsResourcesOpen = useStore((s) => s.setIsResourcesOpen);
  const setIsSessionOpen = useStore((s) => s.setIsSessionOpen);
  const setIsGroundingOpen = useStore((s) => s.setIsGroundingOpen);
  const isHost = useStore((s) => s.isHost);

  // clinical slice
  const currentPhase = useStore((s) => s.currentPhase);
  const setPhase = useStore((s) => s.setPhase);
  const targetDesc = useStore((s) => s.targetDesc);
  const setTargetDesc = useStore((s) => s.setTargetDesc);
  const negCognition = useStore((s) => s.negCognition);
  const setNegCognition = useStore((s) => s.setNegCognition);
  const posCognition = useStore((s) => s.posCognition);
  const setPosCognition = useStore((s) => s.setPosCognition);
  const emotions = useStore((s) => s.emotions);
  const setEmotions = useStore((s) => s.setEmotions);
  const bodyLocation = useStore((s) => s.bodyLocation);
  const setBodyLocation = useStore((s) => s.setBodyLocation);
  const suds = useStore((s) => s.suds);
  const logSuds = useStore((s) => s.logSuds);
  const vocInitial = useStore((s) => s.vocInitial);
  const setVocInitial = useStore((s) => s.setVocInitial);
  const vocCurrent = useStore((s) => s.vocCurrent);
  const setVocCurrent = useStore((s) => s.setVocCurrent);
  const sudsLog = useStore((s) => s.sudsLog);
  const observations = useStore((s) => s.observations);
  const addObservation = useStore((s) => s.addObservation);
  const therapistNotes = useStore((s) => s.therapistNotes);
  const setTherapistNotes = useStore((s) => s.setTherapistNotes);
  const resetClinical = useStore((s) => s.resetClinical);

  const sessionStartedAt = useStore((s) => s.sessionStartedAt);
  const isPlaying = useStore((s) => s.isPlaying);
  const setPlaying = useStore((s) => s.setPlaying);

  // live stimulation controls (broadcast to client via room.state)
  const speed = useStore((s) => s.speed);
  const setSpeed = useStore((s) => s.setSpeed);
  const amplitude = useStore((s) => s.amplitude);
  const setAmplitude = useStore((s) => s.setAmplitude);
  const pattern = useStore((s) => s.pattern);
  const setPattern = useStore((s) => s.setPattern);
  const size = useStore((s) => s.size);
  const setSize = useStore((s) => s.setSize);
  const color = useStore((s) => s.color);
  const setColor = useStore((s) => s.setColor);
  const targetShape = useStore((s) => s.targetShape);
  const setTargetShape = useStore((s) => s.setTargetShape);
  const cyclesPerSet = useStore((s) => s.cyclesPerSet);
  const setCyclesPerSet = useStore((s) => s.setCyclesPerSet);
  const audioFormat = useStore((s) => s.audioFormat);
  const setAudioFormat = useStore((s) => s.setAudioFormat);
  const ambientSound = useStore((s) => s.ambientSound);
  const setAmbientSound = useStore((s) => s.setAmbientSound);
  const visualBackground = useStore((s) => s.visualBackground);
  const setVisualBackground = useStore((s) => s.setVisualBackground);
  const audioVolume = useStore((s) => s.audioVolume);
  const setAudioVolume = useStore((s) => s.setAudioVolume);
  const ambientVolume = useStore((s) => s.ambientVolume);
  const setAmbientVolume = useStore((s) => s.setAmbientVolume);
  const hapticEnabled = useStore((s) => s.hapticEnabled);
  const setHapticEnabled = useStore((s) => s.setHapticEnabled);
  const visualEnabled = useStore((s) => s.visualEnabled);
  const setVisualEnabled = useStore((s) => s.setVisualEnabled);
  const vestibularSafe = useStore((s) => s.vestibularSafe);
  const setVestibularSafe = useStore((s) => s.setVestibularSafe);
  // host-local audio (NOT broadcast: muting here only affects the host device)
  const audioEnabled = useStore((s) => s.audioEnabled);
  const setAudioEnabled = useStore((s) => s.setAudioEnabled);
  // calming mechanic the host pushes onto the client screen (broadcast)
  const clientCue = useStore((s) => s.clientCue);
  const setClientCue = useStore((s) => s.setClientCue);

  // per-set local state for the desensitization loop
  const [setObsNote, setSetObsNote] = useState('');
  const [setObsSuds, setSetObsSuds] = useState<number | null>(null);
  const [awaitingNotice, setAwaitingNotice] = useState(false);
  const [saved, setSaved] = useState(false);

  // SSR-safe haptic capability resolution (navigator is unavailable on the server).
  const [hapticOk, setHapticOk] = useState(false);
  useEffect(() => { setHapticOk(isHapticSupported()); }, []);

  const startSet = () => {
    setAwaitingNotice(false);
    setSetObsNote('');
    setSetObsSuds(null);
    setPlaying(true);
  };

  const stopSet = () => {
    setPlaying(false);
    setAwaitingNotice(true);
  };

  const logObservation = () => {
    addObservation({ set: observations.length + 1, note: setObsNote, suds: setObsSuds });
    if (setObsSuds !== null) logSuds(setObsSuds);
    setAwaitingNotice(false);
  };

  const nextSet = () => {
    setSetObsNote('');
    setSetObsSuds(null);
    setAwaitingNotice(false);
  };

  const handleSave = async () => {
    const startedAt = sessionStartedAt ?? Date.now();
    const endedAt = Date.now();
    try {
      await saveSession({
        startedAt,
        endedAt,
        durationSec: Math.max(0, Math.round((endedAt - startedAt) / 1000)),
        mode: isHost ? 'host' : 'solo',
        sudsLog,
        vocInitial,
        vocCurrent,
        observations,
        notes: therapistNotes,
        phaseReached: currentPhase
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // Local journal write failed (no IndexedDB or storage blocked). Stay silent, no PII leaves device.
    }
  };

  const maxSuds = 10;
  const currentIndex = Math.max(0, PHASE_ORDER.indexOf(currentPhase));
  const currentMeta = t.phases[currentIndex];
  const previewLabel = lang === 'ru' ? 'Что видит клиент' : 'What the client sees';

  return (
    <AnimatePresence>
      {isClinicalOpen && (
        !isHost ? (
          /* SOLO LOCK: reprocessing is gated. Centered card on the dark workspace. */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a0a0c]/92 backdrop-blur-2xl"
          >
            <button
              onClick={() => setIsClinicalOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 p-2 rounded-xl hover:bg-white/[0.08] text-white/40 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
            <motion.div
              initial={{ scale: 0.96, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 16, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 200 }}
              className="w-full max-w-md rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] px-6 py-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-2.5">
                <ClipboardList size={18} className="text-indigo-300 shrink-0" />
                <h2 className="text-lg font-medium tracking-tight text-white">{t.tpTitle}</h2>
              </div>
              <div className="flex items-start gap-2.5">
                <Lock size={16} className="text-amber-300 shrink-0 mt-0.5" />
                <p className="text-[13px] text-amber-100/85 leading-relaxed">{t.tpSoloLock}</p>
              </div>
              <p className="text-[12px] text-white/40 leading-relaxed">{t.tpHostOnly}</p>
              <button
                onClick={() => { setIsClinicalOpen(false); setIsSessionOpen(true); }}
                className="w-full py-3 rounded-xl font-semibold text-[13px] bg-white text-zinc-950 hover:bg-zinc-200 transition-all flex items-center justify-center gap-2"
              >
                <Radio size={15} /> {t.specStartBtn}
              </button>
              <button
                onClick={() => setIsResourcesOpen(true)}
                className="w-full py-3 rounded-xl font-medium text-[13px] border border-amber-500/25 bg-amber-500/10 text-amber-100 hover:bg-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <BookOpen size={14} /> {t.phases[1]?.name}
              </button>
            </motion.div>
          </motion.div>
        ) : (
          /* FULL-SCREEN CONDUCT WORKSPACE (host) */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#0a0a0c] flex flex-col"
          >
            {/* ============================ HEADER ============================ */}
            <div className="shrink-0 border-b border-white/5">
              {/* row 1: title + phase stepper + actions */}
              <div className="px-4 md:px-6 pt-3 pb-2.5 flex items-center gap-3 md:gap-4">
                <div className="flex items-center gap-2.5 min-w-0 shrink-0">
                  <ClipboardList size={18} className="text-indigo-300 shrink-0" />
                  <h2 className="text-[15px] md:text-lg font-semibold tracking-tight text-white truncate">{t.tpTitle}</h2>
                </div>

                {/* compact horizontal 8-phase stepper */}
                <div className="flex-1 min-w-0 overflow-x-auto no-scrollbar">
                  <div className="flex items-center gap-1.5">
                    {PHASE_ORDER.map((ph, idx) => {
                      const meta = t.phases[idx];
                      const active = currentPhase === ph;
                      return (
                        <button
                          key={ph}
                          onClick={() => setPhase(ph)}
                          title={meta?.name}
                          className={`shrink-0 flex items-center gap-1.5 pl-1.5 pr-2.5 py-1.5 rounded-xl transition-all ${
                            active
                              ? 'bg-indigo-500/20 text-white'
                              : 'bg-white/[0.03] text-white/45 hover:bg-white/[0.07]'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-lg shrink-0 flex items-center justify-center text-[11px] font-semibold tabular-nums ${
                            active ? 'bg-indigo-400/30 text-indigo-50' : 'bg-white/[0.06] text-white/45'
                          }`}>
                            {meta?.n ?? idx}
                          </span>
                          <span className="text-[12px] font-medium whitespace-nowrap max-w-[150px] truncate hidden xl:inline">{meta?.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setIsGroundingOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-[13px] bg-emerald-500/12 text-emerald-200 hover:bg-emerald-500/20 transition-all"
                  >
                    <LifeBuoy size={15} className="shrink-0" />
                    <span className="hidden sm:inline">{t.stopGround}</span>
                  </button>
                  <button
                    onClick={() => setIsClinicalOpen(false)}
                    className="p-2 rounded-xl hover:bg-white/[0.08] text-white/40 hover:text-white transition-colors shrink-0"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {/* row 2: current phase number + name + short guidance for "what to do now" */}
              <div className="px-4 md:px-6 pb-3 flex items-start gap-3">
                <span className="shrink-0 flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-indigo-500/12">
                  <span className="text-indigo-300 text-[13px] font-semibold tabular-nums">{t.tpPhaseLabel} {currentMeta?.n}</span>
                  <span className="text-white text-[13px] font-medium">{currentMeta?.name}</span>
                </span>
                <p className="text-[12px] md:text-[13px] text-white/45 leading-relaxed pt-1.5 min-w-0">{currentMeta?.desc}</p>
              </div>
            </div>

            {/* ===================== BODY: two columns ===================== */}
            <div className="flex-1 min-h-0 flex flex-col lg:flex-row">

              {/* LEFT: clinical record / notes. Order-2 on stacking so the live
                  preview + controls are reachable first on narrow screens. */}
              <div className="order-2 lg:order-1 flex-1 min-h-0 overflow-y-auto no-scrollbar border-t lg:border-t-0 lg:border-r border-white/5">
                <div className="px-5 md:px-7 py-6 max-w-2xl mx-auto flex flex-col divide-y divide-white/[0.06]">

                  {/* Assessment (phase 3) */}
                  <div className="flex flex-col gap-4 pb-6">
                    <SectionLabel color="text-indigo-300/80" icon={ClipboardList}>{t.phases[3]?.name}</SectionLabel>
                    <Field label={t.tpTarget} value={targetDesc} onChange={setTargetDesc} rows={2} />
                    <Field label={t.tpNeg} value={negCognition} onChange={setNegCognition} rows={2} />
                    <Field label={t.tpPos} value={posCognition} onChange={setPosCognition} rows={2} />
                    <Field label={t.tpEmotions} value={emotions} onChange={setEmotions} rows={1} />
                    <Field label={t.tpBody} value={bodyLocation} onChange={setBodyLocation} rows={1} />
                    <div className="flex flex-col gap-2">
                      <Label color="text-white/50">{t.tpVocInit}</Label>
                      <ScaleRow from={1} to={7} value={vocInitial} onPick={setVocInitial} accent="bg-emerald-500/20 text-emerald-100" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label color="text-white/50">{t.tpSuds}</Label>
                      <ScaleRow from={0} to={10} value={suds} onPick={logSuds} accent="bg-rose-500/20 text-rose-100" />
                    </div>
                  </div>

                  {/* Installation (phase 5) */}
                  <div className="flex flex-col gap-4 py-6">
                    <SectionLabel color="text-emerald-300/80" icon={Check}>{t.phases[5]?.name}</SectionLabel>
                    <Field label={t.tpPos} value={posCognition} onChange={setPosCognition} rows={2} />
                    <div className="flex flex-col gap-2">
                      <Label color="text-white/50">{t.tpVoc}</Label>
                      <ScaleRow from={1} to={7} value={vocCurrent} onPick={setVocCurrent} accent="bg-emerald-500/20 text-emerald-100" />
                    </div>
                  </div>

                  {/* Observation log */}
                  <div className="flex flex-col gap-3 py-6">
                    <SectionLabel icon={ClipboardList}>{t.tpLogObs}</SectionLabel>
                    {observations.length > 0 ? (
                      <div className="flex flex-col gap-1.5">
                        {observations.map((o, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-[12px] text-white/60 px-3 py-2.5 rounded-xl bg-white/[0.03]">
                            <span className="text-white/30 tabular-nums shrink-0 font-semibold">#{o.set}</span>
                            <span className="min-w-0 flex-1 leading-relaxed">{o.note || '-'}</span>
                            {o.suds !== null && <span className="text-rose-300/80 tabular-nums shrink-0 font-medium">SUD {o.suds}</span>}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[12px] text-white/25">-</p>
                    )}
                  </div>

                  {/* SUDS trend mini-bars */}
                  <div className="flex flex-col gap-3 py-6">
                    <SectionLabel color="text-cyan-300/80" icon={Activity}>{t.tpSudsTrend}</SectionLabel>
                    {sudsLog.length > 0 ? (
                      <div className="flex items-end gap-1.5 h-24 px-1">
                        {sudsLog.map((e, i) => (
                          <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1.5 min-w-0">
                            <div
                              className="w-full rounded-t-md bg-gradient-to-t from-rose-500/40 to-cyan-400/70"
                              style={{ height: `${Math.max(4, (e.value / maxSuds) * 100)}%` }}
                              title={`SUD ${e.value}`}
                            />
                            <span className="text-[9px] text-white/30 tabular-nums">{e.value}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[12px] text-white/25">-</p>
                    )}
                  </div>

                  {/* Therapist notes (main writing area) */}
                  <div className="pt-6">
                    <Field label={t.tpNotes} value={therapistNotes} onChange={setTherapistNotes} placeholder={t.tpNotesPh} rows={6} />
                  </div>
                </div>
              </div>

              {/* RIGHT: live preview + start/stop + FULL settings */}
              <div className="order-1 lg:order-2 w-full lg:w-[400px] lg:shrink-0 overflow-y-auto no-scrollbar">
                <div className="px-5 py-6 flex flex-col divide-y divide-white/[0.06]">

                  {/* a) Live preview of the client screen */}
                  <div className="flex flex-col gap-2.5 pb-6">
                    <Label color="text-white/45">{previewLabel}</Label>
                    <MiniStimPreview />
                  </div>

                  {/* b) Start / Stop-and-ask + notice flow (Desensitization, phase 4) */}
                  <div className="flex flex-col gap-3 py-6">
                    <SectionLabel color="text-rose-300/80" icon={Activity}>{t.phases[4]?.name}</SectionLabel>
                    {!awaitingNotice && (
                      <button
                        onClick={startSet}
                        disabled={isPlaying}
                        className={`w-full py-4 rounded-2xl font-semibold text-[15px] transition-all flex items-center justify-center gap-2 ${
                          isPlaying
                            ? 'bg-white/[0.04] text-white/30'
                            : 'bg-emerald-500/15 text-emerald-100 hover:bg-emerald-500/25'
                        }`}
                      >
                        <Play size={16} fill="currentColor" /> {t.tpStartSet}
                      </button>
                    )}
                    {isPlaying && (
                      <button
                        onClick={stopSet}
                        className="w-full py-4 rounded-2xl font-semibold text-[15px] bg-rose-500/15 text-rose-100 hover:bg-rose-500/25 transition-all flex items-center justify-center gap-2"
                      >
                        <Pause size={16} className="fill-current" /> {t.tpStopSet}
                      </button>
                    )}

                    <AnimatePresence>
                      {awaitingNotice && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden flex flex-col gap-3"
                        >
                          <p className="text-[13px] text-white/70 leading-relaxed pt-1">{t.tpNoticePrompt}</p>
                          <textarea
                            value={setObsNote}
                            onChange={(e) => setSetObsNote(e.target.value)}
                            placeholder={t.tpObsPh}
                            rows={2}
                            className="w-full resize-none rounded-xl bg-white/[0.03] px-3 py-2.5 text-[13px] leading-relaxed text-white/85 placeholder:text-white/20 focus:outline-none focus:bg-white/[0.05] transition-colors no-scrollbar"
                          />
                          <div className="flex flex-col gap-2">
                            <Label color="text-white/50">{t.tpSuds}</Label>
                            <ScaleRow from={0} to={10} value={setObsSuds} onPick={setSetObsSuds} accent="bg-rose-500/20 text-rose-100" />
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={logObservation}
                              className="flex-1 py-2.5 rounded-xl font-medium text-[13px] bg-indigo-500/15 text-indigo-200 hover:bg-indigo-500/25 transition-all"
                            >
                              {t.tpLogObs}
                            </button>
                            <button
                              onClick={nextSet}
                              className="flex-1 py-2.5 rounded-xl font-medium text-[13px] bg-white/[0.04] text-white/70 hover:bg-white/[0.08] transition-all"
                            >
                              {t.tpNextSet}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* c) Show a resource technique to the client (cues) */}
                  <div className="flex flex-col gap-3 py-6">
                    <SectionLabel color="text-violet-300/80" icon={Sparkles}>{t.cueTitle}</SectionLabel>
                    <p className="text-white/30 text-[12px] leading-relaxed">{t.cueHint}</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {([
                        { cue: 'butterfly', label: t.cueButterfly, Icon: Wind },
                        { cue: 'breathing', label: t.cueBreathing, Icon: Anchor },
                        { cue: 'grounding', label: t.cueGrounding, Icon: Leaf },
                      ] as { cue: ClientCue; label: string; Icon: typeof Wind }[]).map(({ cue, label, Icon }) => {
                        const active = clientCue === cue;
                        return (
                          <button
                            key={cue}
                            onClick={() => setClientCue(cue)}
                            className={`min-h-[44px] px-3 py-2.5 rounded-xl text-[13px] font-medium flex items-center gap-2 transition-all min-w-0 ${
                              active
                                ? 'bg-violet-500/15 text-violet-100 shadow-lg'
                                : 'bg-white/[0.03] text-white/45 hover:bg-white/[0.07]'
                            }`}
                          >
                            <Icon size={14} className="shrink-0" />
                            <span className="truncate">{label}</span>
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setClientCue('none')}
                        className={`min-h-[44px] px-3 py-2.5 rounded-xl text-[13px] font-medium flex items-center gap-2 transition-all min-w-0 ${
                          clientCue === 'none'
                            ? 'bg-white/[0.08] text-white/70'
                            : 'bg-white/[0.03] text-white/45 hover:bg-white/[0.07]'
                        }`}
                      >
                        <EyeOff size={14} className="shrink-0" />
                        <span className="truncate">{t.cueClear}</span>
                      </button>
                    </div>
                  </div>

                  {/* d) FULL stimulation settings (replicates SettingsPanel direct controls) */}

                  {/* Pattern */}
                  <div className="flex flex-col gap-3 py-6">
                    <SectionLabel color="text-cyan-300/80" icon={SlidersHorizontal}>{t.patternLabel}</SectionLabel>
                    <div className="grid grid-cols-3 gap-1.5">
                      {PATTERNS.map((p) => (
                        <Tile
                          key={p.id}
                          active={pattern === p.id}
                          accent="bg-cyan-500/15 text-cyan-100"
                          onClick={() => setPattern(p.id)}
                          icon={p.icon}
                        >
                          {t.patterns[p.id]}
                        </Tile>
                      ))}
                    </div>
                  </div>

                  {/* Shape */}
                  <div className="flex flex-col gap-3 py-6">
                    <SectionLabel color="text-indigo-300/80" icon={Circle}>{t.shapeLabel}</SectionLabel>
                    <div className="grid grid-cols-4 gap-1.5">
                      {SHAPES.map((s) => (
                        <Tile
                          key={s.id}
                          active={targetShape === s.id}
                          accent="bg-indigo-500/15 text-indigo-100"
                          onClick={() => setTargetShape(s.id)}
                          icon={s.icon}
                        >
                          {t.shapes[s.id]}
                        </Tile>
                      ))}
                    </div>
                  </div>

                  {/* Color */}
                  <div className="flex flex-col gap-3 py-6">
                    <SectionLabel color="text-white/40">{t.colorLabel}</SectionLabel>
                    <div className="flex gap-3 flex-wrap">
                      {COLORS.map((c) => {
                        const active = color === c.value;
                        return (
                          <button
                            key={c.value}
                            onClick={() => setColor(c.value)}
                            aria-label={c.value}
                            className={`w-8 h-8 rounded-full shrink-0 transition-all duration-300 ${active ? 'scale-125' : 'opacity-40 hover:opacity-80 hover:scale-110'}`}
                            style={{ backgroundColor: c.value, boxShadow: active ? c.shadow : 'none' }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* Timing: speed, amplitude, series, size */}
                  <div className="flex flex-col gap-5 py-6">
                    <SectionLabel color="text-cyan-300/80" icon={Gauge}>{lang === 'ru' ? 'Тайминг' : 'Timing'}</SectionLabel>
                    <SliderRow label={t.speedLabel} value={`${speed.toFixed(1)} ${t.hzUnit}`} min={0.5} max={3} step={0.1} val={speed} onChange={setSpeed} />
                    <SliderRow label={t.amplitudeLabel} value={`${amplitude}%`} min={40} max={100} step={1} val={amplitude} onChange={(v) => setAmplitude(Math.round(v))} hint={t.amplitudeHint} />
                    <SliderRow label={t.seriesLabel} value={`${cyclesPerSet} ${t.cyclesUnit}`} min={10} max={60} step={2} val={cyclesPerSet} onChange={(v) => setCyclesPerSet(Math.round(v))} />
                    <SliderRow label={t.sizeLabel} value={`${size} ${t.pxUnit}`} min={20} max={150} step={1} val={size} onChange={(v) => setSize(Math.round(v))} />
                  </div>

                  {/* Sound: stim format, ambient, volumes, background, host-local mute */}
                  <div className="flex flex-col gap-5 py-6">
                    <SectionLabel color="text-sky-300/80" icon={Volume2}>{lang === 'ru' ? 'Звук' : 'Sound'}</SectionLabel>

                    <div className="flex flex-col gap-2.5">
                      <Label color="text-white/50">{t.stimSound}</Label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {AUDIO_FORMATS.map((a) => {
                          const active = audioFormat === a;
                          return (
                            <button
                              key={a}
                              onClick={() => setAudioFormat(a)}
                              className={`min-h-[44px] py-2 px-1.5 rounded-xl text-[12px] font-medium leading-tight text-center transition-all min-w-0 ${
                                active ? 'bg-cyan-500/15 text-cyan-100 shadow-lg' : 'bg-white/[0.03] text-white/40 hover:bg-white/[0.07]'
                              }`}
                            >
                              {t.audioFormats[a]}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <Label color="text-white/50">{t.ambientLabel}</Label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {AMBIENTS.map((b) => (
                          <Tile
                            key={b.id}
                            active={ambientSound === b.id}
                            accent={b.accent}
                            onClick={() => setAmbientSound(b.id)}
                            icon={b.icon}
                          >
                            {t.ambientNames[b.id]}
                          </Tile>
                        ))}
                      </div>
                      <p className="text-white/25 text-[11px] leading-relaxed">{t.ambientNote}</p>
                    </div>

                    <div className={`flex flex-col gap-5 ${!audioEnabled ? 'opacity-40 pointer-events-none' : ''}`}>
                      <SliderRow label={t.blsVolume} value={`${Math.round(audioVolume * 100)}%`} min={0} max={1} step={0.05} val={audioVolume} onChange={setAudioVolume} color="text-sky-300/70" />
                      <SliderRow label={t.ambientVolumeLabel} value={`${Math.round(ambientVolume * 100)}%`} min={0} max={1} step={0.05} val={ambientVolume} onChange={setAmbientVolume} color="text-sky-300/70" />
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <Label color="text-white/50">{t.bgLabel}</Label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {BACKGROUNDS.map((b) => (
                          <Tile
                            key={b.id}
                            active={visualBackground === b.id}
                            accent={b.accent}
                            onClick={() => setVisualBackground(b.id)}
                            icon={b.icon}
                          >
                            {t.bgNames[b.id]}
                          </Tile>
                        ))}
                      </div>
                    </div>

                    {/* host-local mute (NOT broadcast) */}
                    <div className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] px-3.5 py-3">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <VolumeX size={15} className={`shrink-0 mt-0.5 ${!audioEnabled ? 'text-sky-300/80' : 'text-white/30'}`} />
                        <div className="min-w-0">
                          <Label color={!audioEnabled ? 'text-sky-300/70' : 'text-white/40'}>{t.tpLocalMute}</Label>
                          <p className="text-white/30 text-[12px] mt-0.5 leading-relaxed">{t.tpLocalMuteHint}</p>
                        </div>
                      </div>
                      <Toggle enabled={!audioEnabled} onChange={() => setAudioEnabled(!audioEnabled)} accent="bg-sky-500/70" />
                    </div>
                  </div>

                  {/* Channels: haptic / visual / vestibular */}
                  <div className="flex flex-col gap-4 py-6">
                    <SectionLabel color="text-indigo-300/80" icon={Radio}>{t.channelsSection}</SectionLabel>
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <Label color="text-violet-300/70">{t.hapticLabel}</Label>
                        <p className="text-white/30 text-[12px] mt-0.5 leading-relaxed">{hapticOk ? t.hapticDesc : t.hapticUnsupported}</p>
                      </div>
                      <Toggle enabled={hapticEnabled && hapticOk} onChange={() => { if (hapticOk) setHapticEnabled(!hapticEnabled); }} accent="bg-violet-500/70" />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <Label color="text-amber-300/70">{t.visualStim}</Label>
                        <p className="text-white/30 text-[12px] mt-0.5 leading-relaxed">{t.visualStimDesc}</p>
                      </div>
                      <Toggle enabled={visualEnabled} onChange={() => setVisualEnabled(!visualEnabled)} accent="bg-amber-500/70" />
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <Label color="text-teal-300/70">{t.vestibular}</Label>
                        <p className="text-white/30 text-[12px] mt-0.5 leading-relaxed">{t.vestibularDesc}</p>
                      </div>
                      <Toggle enabled={vestibularSafe} onChange={() => setVestibularSafe(!vestibularSafe)} accent="bg-teal-500/70" />
                    </div>
                  </div>

                  {/* e) Save / new session */}
                  <div className="flex flex-col gap-3 py-6">
                    <button
                      onClick={handleSave}
                      className={`w-full py-3.5 rounded-2xl font-semibold text-[13px] tracking-wide transition-all flex items-center justify-center gap-2 ${
                        saved
                          ? 'bg-emerald-500/15 text-emerald-300'
                          : 'bg-white/[0.06] text-white/75 hover:bg-white/[0.1] hover:text-white'
                      }`}
                    >
                      {saved ? (<><Check size={14} /> {t.tpSaved}</>) : (<><Save size={14} /> {t.tpSaveSession}</>)}
                    </button>
                    <button
                      onClick={resetClinical}
                      className="w-full py-3.5 rounded-2xl font-medium text-[13px] tracking-wide transition-all bg-white/[0.03] text-white/50 hover:bg-white/[0.07] hover:text-white/80 flex items-center justify-center gap-2"
                    >
                      <RotateCcw size={14} /> {t.tpReset}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )
      )}
    </AnimatePresence>
  );
}
