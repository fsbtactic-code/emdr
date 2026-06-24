'use client';

import {
  X, Lock, Play, Pause, Save, Check,
  ClipboardList, Radio, BookOpen,
  Wind, Anchor, Leaf, Sun, EyeOff, LifeBuoy, VolumeX, Volume2,
  SlidersHorizontal, ChevronLeft, ChevronRight, ListOrdered,
} from 'lucide-react';
import {
  useStore, SessionPhase,
} from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import { useT } from '../i18n/useT';
import { saveSession } from '../lib/journal';
import { MiniStimPreview } from './MiniStimPreview';
import { SessionSettingsDrawer } from './SessionSettingsDrawer';
import { CUE_CONTENT, cueStepCount, clampCueStep, type CueTechnique } from '../content/cues';

const PHASE_ORDER: SessionPhase[] = [
  SessionPhase.Idle,
  SessionPhase.History,
  SessionPhase.Preparation,
  SessionPhase.Assessment,
  SessionPhase.Desensitization,
  SessionPhase.Installation,
  SessionPhase.BodyScan,
  SessionPhase.Closure,
];

const Label = ({ children, color = 'text-white/45' }: { children: React.ReactNode; color?: string }) => (
  <span className={`text-[11px] uppercase tracking-[0.14em] font-semibold ${color}`}>{children}</span>
);

const Field = ({ label, value, onChange, placeholder, rows = 2 }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
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

const ScaleRow = ({ from, to, value, onPick, accent }: {
  from: number; to: number; value: number | null; onPick: (v: number) => void; accent: string;
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
            className={`min-w-[32px] h-8 px-1 rounded-lg text-[13px] font-medium tabular-nums transition-all ${
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

export function TherapistPanel() {
  const t = useT();
  const lang = useStore((s) => s.lang);
  const isClinicalOpen = useStore((s) => s.isClinicalOpen);
  const setIsClinicalOpen = useStore((s) => s.setIsClinicalOpen);
  const setIsResourcesOpen = useStore((s) => s.setIsResourcesOpen);
  const setIsSessionOpen = useStore((s) => s.setIsSessionOpen);
  const setIsGroundingOpen = useStore((s) => s.setIsGroundingOpen);
  const isHost = useStore((s) => s.isHost);
  const clientActive = useStore((s) => s.clientActive);

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

  const sessionStartedAt = useStore((s) => s.sessionStartedAt);
  const isPlaying = useStore((s) => s.isPlaying);
  const setPlaying = useStore((s) => s.setPlaying);

  const speed = useStore((s) => s.speed);
  const setSpeed = useStore((s) => s.setSpeed);
  const amplitude = useStore((s) => s.amplitude);
  const setAmplitude = useStore((s) => s.setAmplitude);
  const pattern = useStore((s) => s.pattern);
  const setPattern = useStore((s) => s.setPattern);
  const color = useStore((s) => s.color);
  const setColor = useStore((s) => s.setColor);
  const cyclesPerSet = useStore((s) => s.cyclesPerSet);
  const setCyclesPerSet = useStore((s) => s.setCyclesPerSet);
  const audioEnabled = useStore((s) => s.audioEnabled);
  const setAudioEnabled = useStore((s) => s.setAudioEnabled);

  const clientCue = useStore((s) => s.clientCue);
  const setClientCue = useStore((s) => s.setClientCue);
  const cueStep = useStore((s) => s.cueStep);
  const setCueStep = useStore((s) => s.setCueStep);

  const [setObsNote, setSetObsNote] = useState('');
  const [setObsSuds, setSetObsSuds] = useState<number | null>(null);
  const [awaitingNotice, setAwaitingNotice] = useState(false);
  const [saved, setSaved] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [logOpen, setLogOpen] = useState(false);

  const currentIndex = Math.max(0, PHASE_ORDER.indexOf(currentPhase));
  const currentMeta = t.phases[currentIndex];

  // Alt+1..Alt+8 jump to a phase. Registered only while the host console is open.
  const jumpPhase = useCallback((idx: number) => {
    const ph = PHASE_ORDER[idx];
    if (ph) setPhase(ph);
  }, [setPhase]);

  useEffect(() => {
    if (!isClinicalOpen || !isHost) return;
    const onKey = (e: KeyboardEvent) => {
      if (!e.altKey || e.metaKey || e.ctrlKey) return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 8) {
        e.preventDefault();
        jumpPhase(n - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isClinicalOpen, isHost, jumpPhase]);

  const startSet = () => {
    setAwaitingNotice(false);
    setSetObsNote('');
    setSetObsSuds(null);
    setClientCue('none'); // stimulation and cue are mutually exclusive
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

  const pickCue = (tech: CueTechnique) => {
    setPlaying(false); // technique and stimulation mutually exclusive
    setClientCue(tech); // store resets cueStep to 0
  };

  const cueActive = clientCue !== 'none';
  const cueTech = cueActive ? (clientCue as CueTechnique) : null;
  const cueIdx = cueTech ? clampCueStep(cueTech, cueStep) : 0;
  const cueTotal = cueTech ? cueStepCount(cueTech) : 0;
  const cueStepText = cueTech ? (lang === 'ru' ? CUE_CONTENT[cueTech].steps[cueIdx].ru : CUE_CONTENT[cueTech].steps[cueIdx].en) : '';

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
        phaseReached: currentPhase,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // silent - local journal only, no PII leaves device
    }
  };

  // does a phase have captured data (for the rail status dots)
  const phaseHasData = (ph: SessionPhase): boolean => {
    switch (ph) {
      case SessionPhase.History:
      case SessionPhase.Preparation:
        return therapistNotes.trim().length > 0;
      case SessionPhase.Assessment:
        return !!(targetDesc || negCognition || posCognition || emotions || bodyLocation || suds !== null || vocInitial !== null);
      case SessionPhase.Desensitization:
        return observations.length > 0 || sudsLog.length > 0;
      case SessionPhase.Installation:
        return !!posCognition || vocCurrent !== null;
      case SessionPhase.BodyScan:
        return !!bodyLocation || suds !== null;
      case SessionPhase.Closure:
        return therapistNotes.trim().length > 0;
      default:
        return false;
    }
  };

  const recentObs = observations.slice(-3).reverse();
  const recentLog = sudsLog.slice(-5).reverse();

  const cueButtons: { cue: CueTechnique; label: string; Icon: typeof Wind }[] = [
    { cue: 'butterfly', label: t.cueButterfly, Icon: Wind },
    { cue: 'breathing', label: t.cueBreathing, Icon: Anchor },
    { cue: 'grounding', label: t.cueGrounding, Icon: Leaf },
    { cue: 'lightstream', label: lang === 'ru' ? 'Поток света' : 'Light stream', Icon: Sun },
  ];

  // ---- phase-adaptive center workspace ----
  const renderPhaseFields = () => {
    switch (currentPhase) {
      case SessionPhase.History:
        return (
          <Field label={t.tpTarget} value={targetDesc} onChange={setTargetDesc} rows={3} placeholder={t.tpObsPh} />
        );
      case SessionPhase.Preparation:
        return (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setIsResourcesOpen(true)}
              className="w-full py-3 rounded-xl font-medium text-[13px] bg-amber-500/10 text-amber-100 hover:bg-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <BookOpen size={14} /> {t.phases[1]?.name}
            </button>
          </div>
        );
      case SessionPhase.Assessment:
        return (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div className="xl:col-span-2"><Field label={t.tpTarget} value={targetDesc} onChange={setTargetDesc} rows={2} /></div>
            <Field label={t.tpNeg} value={negCognition} onChange={setNegCognition} rows={2} />
            <Field label={t.tpPos} value={posCognition} onChange={setPosCognition} rows={2} />
            <Field label={t.tpEmotions} value={emotions} onChange={setEmotions} rows={1} />
            <Field label={t.tpBody} value={bodyLocation} onChange={setBodyLocation} rows={1} />
            <div className="flex flex-col gap-2">
              <Label color="text-white/50">{t.tpSuds}</Label>
              <ScaleRow from={0} to={10} value={suds} onPick={logSuds} accent="bg-rose-500/20 text-rose-100" />
            </div>
            <div className="flex flex-col gap-2">
              <Label color="text-white/50">{t.tpVocInit}</Label>
              <ScaleRow from={1} to={7} value={vocInitial} onPick={setVocInitial} accent="bg-emerald-500/20 text-emerald-100" />
            </div>
          </div>
        );
      case SessionPhase.Desensitization:
        return (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl bg-white/[0.03] px-3.5 py-3 flex flex-col gap-1">
              <Label color="text-white/40">{t.tpTarget}</Label>
              <p className="text-[13px] text-white/75 leading-relaxed">{targetDesc || '-'}</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label color="text-white/50">{t.tpSuds}</Label>
              <ScaleRow from={0} to={10} value={suds} onPick={logSuds} accent="bg-rose-500/20 text-rose-100" />
            </div>
            {awaitingNotice && (
              <div className="flex flex-col gap-3 rounded-xl bg-rose-500/[0.06] px-3.5 py-3.5">
                <p className="text-[13px] text-white/75 leading-relaxed">{t.tpNoticePrompt}</p>
                <textarea
                  value={setObsNote}
                  onChange={(e) => setSetObsNote(e.target.value)}
                  placeholder={t.tpObsPh}
                  rows={2}
                  className="w-full resize-none rounded-xl bg-white/[0.04] px-3 py-2.5 text-[13px] leading-relaxed text-white/85 placeholder:text-white/20 focus:outline-none focus:bg-white/[0.06] transition-colors no-scrollbar"
                />
                <div className="flex flex-col gap-2">
                  <Label color="text-white/50">{t.tpSuds}</Label>
                  <ScaleRow from={0} to={10} value={setObsSuds} onPick={setSetObsSuds} accent="bg-rose-500/20 text-rose-100" />
                </div>
                <div className="flex gap-2">
                  <button onClick={logObservation} className="flex-1 py-2.5 rounded-xl font-medium text-[13px] bg-indigo-500/15 text-indigo-200 hover:bg-indigo-500/25 transition-all">{t.tpLogObs}</button>
                  <button onClick={nextSet} className="flex-1 py-2.5 rounded-xl font-medium text-[13px] bg-white/[0.04] text-white/70 hover:bg-white/[0.08] transition-all">{t.tpNextSet}</button>
                </div>
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <Label color="text-white/40">{t.tpLogObs}</Label>
              {recentObs.length > 0 ? (
                recentObs.map((o, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[12px] text-white/60 px-3 py-2 rounded-lg bg-white/[0.03]">
                    <span className="text-white/30 tabular-nums shrink-0 font-semibold">#{o.set}</span>
                    <span className="min-w-0 flex-1 leading-relaxed">{o.note || '-'}</span>
                    {o.suds !== null && <span className="text-rose-300/80 tabular-nums shrink-0 font-medium">SUD {o.suds}</span>}
                  </div>
                ))
              ) : (
                <p className="text-[12px] text-white/25">-</p>
              )}
            </div>
          </div>
        );
      case SessionPhase.Installation:
        return (
          <div className="flex flex-col gap-4">
            <Field label={t.tpPos} value={posCognition} onChange={setPosCognition} rows={2} />
            <div className="flex flex-col gap-2">
              <Label color="text-white/50">{t.tpVoc}</Label>
              <ScaleRow from={1} to={7} value={vocCurrent} onPick={setVocCurrent} accent="bg-emerald-500/20 text-emerald-100" />
            </div>
          </div>
        );
      case SessionPhase.BodyScan:
        return (
          <div className="flex flex-col gap-4">
            <Field label={t.tpBody} value={bodyLocation} onChange={setBodyLocation} rows={2} />
            <div className="flex flex-col gap-2">
              <Label color="text-white/50">{t.tpSuds}</Label>
              <ScaleRow from={0} to={10} value={suds} onPick={logSuds} accent="bg-rose-500/20 text-rose-100" />
            </div>
          </div>
        );
      case SessionPhase.Closure:
        return (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setIsGroundingOpen(true)}
              className="w-full py-3 rounded-xl font-medium text-[13px] bg-emerald-500/12 text-emerald-200 hover:bg-emerald-500/20 transition-all flex items-center justify-center gap-2"
            >
              <LifeBuoy size={15} /> {t.stopGround}
            </button>
            <button
              onClick={handleSave}
              className={`w-full py-3 rounded-xl font-semibold text-[13px] transition-all flex items-center justify-center gap-2 ${
                saved ? 'bg-emerald-500/15 text-emerald-300' : 'bg-white/[0.06] text-white/75 hover:bg-white/[0.1] hover:text-white'
              }`}
            >
              {saved ? (<><Check size={14} /> {t.tpSaved}</>) : (<><Save size={14} /> {t.tpSaveSession}</>)}
            </button>
          </div>
        );
      default: // Idle
        return (
          <p className="text-[13px] text-white/50 leading-relaxed">{t.tpHostOnly}</p>
        );
    }
  };

  return (
    <AnimatePresence>
      {isClinicalOpen && (
        !isHost ? (
          // ---- solo-lock branch (preserved) ----
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
              className="w-full max-w-md rounded-2xl bg-amber-500/[0.06] px-6 py-6 flex flex-col gap-4"
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
                className="w-full py-3 rounded-xl font-medium text-[13px] bg-amber-500/10 text-amber-100 hover:bg-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <BookOpen size={14} /> {t.phases[1]?.name}
              </button>
            </motion.div>
          </motion.div>
        ) : (
          // ---- host clinical console ----
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#0a0a0c] flex flex-col h-[100dvh] overflow-hidden"
          >
            {/* HEADER 56px */}
            <header className="shrink-0 h-14 px-4 md:px-5 flex items-center gap-3 border-b border-white/5">
              <div className="flex items-center gap-2.5 min-w-0">
                <ClipboardList size={18} className="text-indigo-300 shrink-0" />
                <h2 className="text-[15px] font-semibold tracking-tight text-white truncate hidden sm:block">{t.tpTitle}</h2>
              </div>
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/[0.04] shrink-0">
                <span className={`w-1.5 h-1.5 rounded-full ${clientActive ? 'bg-emerald-400' : 'bg-white/25'}`} />
                <span className="text-[11px] font-medium text-white/55">{clientActive ? t.sessLive : t.sessConnecting}</span>
              </span>
              <div className="flex-1 min-w-0 flex items-center gap-2">
                <span className="text-indigo-300 text-[13px] font-semibold tabular-nums shrink-0">{t.tpPhaseLabel} {currentMeta?.n}</span>
                <span className="text-white/80 text-[13px] font-medium truncate">{currentMeta?.name}</span>
              </div>
              <button
                onClick={() => setIsGroundingOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-[13px] bg-emerald-500/12 text-emerald-200 hover:bg-emerald-500/20 transition-all shrink-0"
              >
                <LifeBuoy size={15} className="shrink-0" />
                <span className="hidden md:inline">{t.stopGround}</span>
              </button>
              <button
                onClick={() => setIsClinicalOpen(false)}
                className="p-2 rounded-xl hover:bg-white/[0.08] text-white/40 hover:text-white transition-colors shrink-0"
              >
                <X size={18} />
              </button>
            </header>

            {/* BODY: rail | center | operator. Stacks under lg. */}
            <div className="flex-1 min-h-0 flex flex-col lg:flex-row">

              {/* LEFT phase rail */}
              <nav className="order-1 shrink-0 lg:w-[72px] xl:w-[216px] 2xl:w-[232px] border-b lg:border-b-0 lg:border-r border-white/5 px-2 xl:px-3 py-3 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible no-scrollbar">
                {PHASE_ORDER.map((ph, idx) => {
                  const meta = t.phases[idx];
                  const active = currentPhase === ph;
                  const hasData = phaseHasData(ph);
                  return (
                    <button
                      key={ph}
                      onClick={() => setPhase(ph)}
                      title={`${meta?.name} (Alt+${idx + 1})`}
                      className={`shrink-0 lg:w-full flex items-center gap-2.5 pl-2 pr-2.5 lg:pr-2 py-2 rounded-xl transition-all ${
                        active ? 'bg-indigo-500/20 text-white' : 'bg-white/[0.02] text-white/45 hover:bg-white/[0.06]'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg shrink-0 flex items-center justify-center text-[12px] font-semibold tabular-nums ${
                        active ? 'bg-indigo-400/30 text-indigo-50' : 'bg-white/[0.06] text-white/45'
                      }`}>
                        {meta?.n ?? idx}
                      </span>
                      <span className="text-[12px] font-medium truncate hidden xl:inline flex-1 text-left">{meta?.name}</span>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 hidden xl:block ${
                        active ? 'bg-indigo-300' : hasData ? 'bg-emerald-400/70' : 'bg-white/15'
                      }`} />
                    </button>
                  );
                })}
              </nav>

              {/* CENTER workspace */}
              <main className="order-3 lg:order-2 flex-1 min-h-0 flex flex-col border-t lg:border-t-0 lg:border-r border-white/5">
                {/* phase-adaptive top region */}
                <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 md:px-7 py-5 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[15px] font-semibold text-white tracking-tight">{currentMeta?.name}</h3>
                    <p className="text-[12px] text-white/45 leading-relaxed">{currentMeta?.desc}</p>
                  </div>
                  {renderPhaseFields()}
                </div>

                {/* pinned notes + mini log (always visible) */}
                <div className="shrink-0 border-t border-white/5 px-5 md:px-7 py-3.5 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <Label color="text-white/50">{t.tpNotes}</Label>
                    <button
                      onClick={() => setLogOpen(true)}
                      className="flex items-center gap-1.5 text-[11px] font-medium text-white/45 hover:text-white/80 transition-colors"
                    >
                      <ListOrdered size={12} /> {t.tpSudsTrend}
                    </button>
                  </div>
                  <textarea
                    value={therapistNotes}
                    onChange={(e) => setTherapistNotes(e.target.value)}
                    placeholder={t.tpNotesPh}
                    className="w-full resize-none h-[160px] xl:h-[176px] rounded-xl bg-white/[0.03] px-3.5 py-3 text-[13px] leading-relaxed text-white/85 placeholder:text-white/20 focus:outline-none focus:bg-white/[0.05] transition-colors overflow-y-auto no-scrollbar"
                  />
                  <div className="flex items-center gap-2 overflow-hidden">
                    <Label color="text-white/35">{t.series}</Label>
                    <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
                      {recentLog.length > 0 ? recentLog.map((e, i) => (
                        <span key={i} className="shrink-0 text-[11px] tabular-nums px-1.5 py-0.5 rounded bg-white/[0.04] text-white/55">SUD {e.value}</span>
                      )) : <span className="text-[11px] text-white/25">-</span>}
                    </div>
                  </div>
                </div>
              </main>

              {/* RIGHT operator column */}
              <aside className="order-2 lg:order-3 shrink-0 w-full lg:w-[320px] xl:w-[360px] 2xl:w-[384px] border-t lg:border-t-0 border-white/5 px-4 py-4 flex flex-col gap-3.5 overflow-y-auto lg:overflow-hidden no-scrollbar">
                <MiniStimPreview />

                {/* Start / Stop */}
                {!isPlaying ? (
                  <button
                    onClick={startSet}
                    className="w-full py-4 rounded-2xl font-semibold text-[15px] bg-emerald-500/15 text-emerald-100 hover:bg-emerald-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <Play size={16} fill="currentColor" /> {t.tpStartSet}
                  </button>
                ) : (
                  <button
                    onClick={stopSet}
                    className="w-full py-4 rounded-2xl font-semibold text-[15px] bg-rose-500/15 text-rose-100 hover:bg-rose-500/25 transition-all flex items-center justify-center gap-2"
                  >
                    <Pause size={16} className="fill-current" /> {t.tpStopSet}
                  </button>
                )}

                {/* quick controls */}
                <div className="rounded-2xl bg-white/[0.02] px-3.5 py-3 flex flex-col gap-3">
                  <Label color="text-white/45">{t.tpQuick}</Label>
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] text-white/45">{t.speedLabel}</span>
                        <span className="text-[11px] tabular-nums text-white/70">{speed.toFixed(1)}</span>
                      </div>
                      <input type="range" min={0.5} max={3} step={0.1} value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="w-full" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] text-white/45">{t.seriesLabel}</span>
                        <span className="text-[11px] tabular-nums text-white/70">{cyclesPerSet}</span>
                      </div>
                      <input type="range" min={10} max={60} step={2} value={cyclesPerSet} onChange={(e) => setCyclesPerSet(Math.round(parseFloat(e.target.value)))} className="w-full" />
                    </div>
                    <div className="flex flex-col gap-1 col-span-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[11px] text-white/45">{t.amplitudeLabel}</span>
                        <span className="text-[11px] tabular-nums text-white/70">{amplitude}%</span>
                      </div>
                      <input type="range" min={40} max={100} step={1} value={amplitude} onChange={(e) => setAmplitude(Math.round(parseFloat(e.target.value)))} className="w-full" />
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {([
                      { id: 'horizontal', label: t.patterns.horizontal },
                      { id: 'diagonal-1', label: t.patterns['diagonal-1'] },
                      { id: 'lemniscate', label: t.patterns.lemniscate },
                    ] as const).map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPattern(p.id)}
                        className={`flex-1 min-w-0 py-1.5 px-1 rounded-lg text-[11px] font-medium truncate transition-all ${
                          pattern === p.id ? 'bg-cyan-500/15 text-cyan-100' : 'bg-white/[0.03] text-white/45 hover:bg-white/[0.07]'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex gap-2">
                      {['#06b6d4', '#10b981', '#f59e0b', '#f43f5e', '#6366f1'].map((c) => (
                        <button
                          key={c}
                          onClick={() => setColor(c)}
                          aria-label={c}
                          className={`w-5 h-5 rounded-full shrink-0 transition-all ${color === c ? 'scale-125' : 'opacity-40 hover:opacity-80'}`}
                          style={{ backgroundColor: c, boxShadow: color === c ? `0 0 10px ${c}99` : 'none' }}
                        />
                      ))}
                    </div>
                    <button
                      onClick={() => setAudioEnabled(!audioEnabled)}
                      title={t.tpLocalMute}
                      className={`px-2.5 py-2 rounded-lg transition-all flex items-center gap-1.5 ${!audioEnabled ? 'bg-sky-500/20 text-sky-200' : 'bg-white/[0.04] text-white/45 hover:bg-white/[0.08]'}`}
                    >
                      {!audioEnabled ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </button>
                  </div>
                </div>

                {/* Show to client */}
                <div className="rounded-2xl bg-white/[0.02] px-3.5 py-3 flex flex-col gap-2.5">
                  <Label color="text-violet-300/80">{t.cueTitle}</Label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {cueButtons.map(({ cue, label, Icon }) => {
                      const active = clientCue === cue;
                      return (
                        <button
                          key={cue}
                          onClick={() => pickCue(cue)}
                          className={`min-h-[42px] px-1.5 py-2 rounded-xl text-[12px] font-medium flex flex-col items-center gap-1 transition-all min-w-0 ${
                            active ? 'bg-violet-500/15 text-violet-100 shadow-lg' : 'bg-white/[0.03] text-white/45 hover:bg-white/[0.07]'
                          }`}
                        >
                          <Icon size={14} className="shrink-0" />
                          <span className="truncate max-w-full">{label}</span>
                        </button>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {cueActive && cueTech && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-2.5 pt-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] uppercase tracking-[0.14em] font-semibold tabular-nums text-violet-200/80">
                              {(lang === 'ru' ? 'Шаг' : 'Step')} {cueIdx + 1}/{cueTotal}
                            </span>
                            <button
                              onClick={() => setClientCue('none')}
                              className="flex items-center gap-1 text-[11px] font-medium text-white/45 hover:text-white/80 transition-colors"
                            >
                              <EyeOff size={12} /> {t.cueClear}
                            </button>
                          </div>
                          <p className="text-[12px] text-white/70 leading-relaxed min-h-[2.4em]">{cueStepText}</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setCueStep(clampCueStep(cueTech, cueIdx - 1))}
                              disabled={cueIdx === 0}
                              className="flex-1 py-2 rounded-xl font-medium text-[13px] bg-white/[0.04] text-white/70 hover:bg-white/[0.08] disabled:opacity-30 transition-all flex items-center justify-center gap-1"
                            >
                              <ChevronLeft size={15} /> {t.back}
                            </button>
                            <button
                              onClick={() => setCueStep(clampCueStep(cueTech, cueIdx + 1))}
                              disabled={cueIdx >= cueTotal - 1}
                              className="flex-1 py-2 rounded-xl font-medium text-[13px] bg-violet-500/15 text-violet-100 hover:bg-violet-500/25 disabled:opacity-30 transition-all flex items-center justify-center gap-1"
                            >
                              {t.next} <ChevronRight size={15} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Full settings */}
                <button
                  onClick={() => setSettingsOpen(true)}
                  className="w-full py-3 rounded-2xl font-medium text-[13px] bg-white/[0.04] text-white/70 hover:bg-white/[0.08] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <SlidersHorizontal size={15} /> {t.navSettings}
                </button>
              </aside>
            </div>

            <SessionSettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />

            {/* Full log modal */}
            <AnimatePresence>
              {logOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setLogOpen(false)}
                  className="fixed inset-0 z-[62] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                >
                  <motion.div
                    initial={{ scale: 0.96, y: 16, opacity: 0 }}
                    animate={{ scale: 1, y: 0, opacity: 1 }}
                    exit={{ scale: 0.96, y: 16, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-lg max-h-[80vh] rounded-2xl bg-[#0d0d10] p-5 flex flex-col gap-4"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-[15px] font-semibold text-white">{t.tpLogObs}</h3>
                      <button onClick={() => setLogOpen(false)} className="p-2 rounded-xl hover:bg-white/[0.08] text-white/40 hover:text-white transition-colors">
                        <X size={18} />
                      </button>
                    </div>
                    <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col gap-1.5">
                      {observations.length > 0 ? observations.map((o, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-[12px] text-white/60 px-3 py-2.5 rounded-xl bg-white/[0.03]">
                          <span className="text-white/30 tabular-nums shrink-0 font-semibold">#{o.set}</span>
                          <span className="min-w-0 flex-1 leading-relaxed">{o.note || '-'}</span>
                          {o.suds !== null && <span className="text-rose-300/80 tabular-nums shrink-0 font-medium">SUD {o.suds}</span>}
                        </div>
                      )) : <p className="text-[12px] text-white/25">-</p>}
                    </div>
                    {sudsLog.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <Label color="text-cyan-300/80">{t.tpSudsTrend}</Label>
                        <div className="flex items-end gap-1.5 h-24 px-1">
                          {sudsLog.map((e, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1.5 min-w-0">
                              <div
                                className="w-full rounded-t-md bg-gradient-to-t from-rose-500/40 to-cyan-400/70"
                                style={{ height: `${Math.max(4, (e.value / 10) * 100)}%` }}
                                title={`SUD ${e.value}`}
                              />
                              <span className="text-[9px] text-white/30 tabular-nums">{e.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      )}
    </AnimatePresence>
  );
}
