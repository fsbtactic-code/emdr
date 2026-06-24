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
import { cueStepCount, clampCueStep, type CueTechnique } from '../content/cues';
import { SectionLabel } from './ui/SectionLabel';
import { Field } from './ui/Field';
import { ScaleRow } from './ui/ScaleRow';
import { Slider } from './ui/Slider';
import { IconButton } from './ui/IconButton';
import { InfoBanner } from './ui/InfoBanner';
import { OverlayShell } from './ui/OverlayShell';
import { ACCENTS } from './ui/tokens';

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

export function TherapistPanel() {
  const t = useT();
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
  const cueStepText = cueTech ? t.cueContent[cueTech].steps[Math.min(cueIdx, t.cueContent[cueTech].steps.length - 1)] : '';

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

  // true when a phase has captured data, drives the rail status dots
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
    { cue: 'lightstream', label: t.cueLightstream, Icon: Sun },
  ];

  const swatchColors = [
    ACCENTS.info.hex,
    ACCENTS.success.hex,
    ACCENTS.warn.hex,
    ACCENTS.danger.hex,
    ACCENTS.primary.hex,
  ];

  const renderPhaseFields = () => {
    switch (currentPhase) {
      case SessionPhase.History:
        return (
          <Field
            as="textarea"
            label={t.tpTarget}
            value={targetDesc}
            onChange={(e) => setTargetDesc(e.target.value)}
            rows={3}
            placeholder={t.tpObsPh}
          />
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
            <div className="xl:col-span-2">
              <Field
                as="textarea"
                label={t.tpTarget}
                value={targetDesc}
                onChange={(e) => setTargetDesc(e.target.value)}
                rows={2}
              />
            </div>
            <Field
              as="textarea"
              label={t.tpNeg}
              value={negCognition}
              onChange={(e) => setNegCognition(e.target.value)}
              rows={2}
            />
            <Field
              as="textarea"
              label={t.tpPos}
              value={posCognition}
              onChange={(e) => setPosCognition(e.target.value)}
              rows={2}
            />
            <Field
              as="textarea"
              label={t.tpEmotions}
              value={emotions}
              onChange={(e) => setEmotions(e.target.value)}
              rows={1}
            />
            <Field
              as="textarea"
              label={t.tpBody}
              value={bodyLocation}
              onChange={(e) => setBodyLocation(e.target.value)}
              rows={1}
            />
            <ScaleRow
              label={t.tpSuds}
              from={0}
              to={10}
              value={suds ?? undefined}
              onPick={logSuds}
              accent="danger"
            />
            <ScaleRow
              label={t.tpVocInit}
              from={1}
              to={7}
              value={vocInitial ?? undefined}
              onPick={setVocInitial}
              accent="success"
            />
          </div>
        );
      case SessionPhase.Desensitization:
        return (
          <div className="flex flex-col gap-4">
            <div className="rounded-xl bg-white/[0.03] px-3.5 py-3 flex flex-col gap-1">
              <SectionLabel>{t.tpTarget}</SectionLabel>
              <p className="text-[13px] text-white/75 leading-relaxed">{targetDesc || '-'}</p>
            </div>
            <ScaleRow
              label={t.tpSuds}
              from={0}
              to={10}
              value={suds ?? undefined}
              onPick={logSuds}
              accent="danger"
            />
            {awaitingNotice && (
              <InfoBanner accent="danger">
                <div className="flex flex-col gap-3 w-full">
                  <p className="text-[13px] text-white/75 leading-relaxed">{t.tpNoticePrompt}</p>
                  <textarea
                    value={setObsNote}
                    onChange={(e) => setSetObsNote(e.target.value)}
                    placeholder={t.tpObsPh}
                    rows={2}
                    className="w-full resize-none rounded-xl bg-white/[0.04] px-3 py-2.5 text-[13px] leading-relaxed text-white/85 placeholder:text-white/20 focus:outline-none focus:bg-white/[0.06] focus:ring-2 focus:ring-rose-500/30 transition-colors no-scrollbar border border-white/[0.06]"
                  />
                  <ScaleRow
                    label={t.tpSuds}
                    from={0}
                    to={10}
                    value={setObsSuds ?? undefined}
                    onPick={setSetObsSuds}
                    accent="danger"
                  />
                  <div className="flex gap-2">
                    <button onClick={logObservation} className="flex-1 py-2.5 rounded-xl font-medium text-[13px] bg-indigo-500/15 text-indigo-200 hover:bg-indigo-500/25 transition-all">{t.tpLogObs}</button>
                    <button onClick={nextSet} className="flex-1 py-2.5 rounded-xl font-medium text-[13px] bg-white/[0.04] text-white/60 hover:bg-white/[0.07] transition-all">{t.tpNextSet}</button>
                  </div>
                </div>
              </InfoBanner>
            )}
            <div className="flex flex-col gap-1.5">
              <SectionLabel>{t.tpLogObs}</SectionLabel>
              {recentObs.length > 0 ? (
                recentObs.map((o, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-[12px] text-white/60 px-3 py-2 rounded-lg bg-white/[0.03]">
                    <span className="text-white/25 tabular-nums shrink-0 font-semibold">#{o.set}</span>
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
            <Field
              as="textarea"
              label={t.tpPos}
              value={posCognition}
              onChange={(e) => setPosCognition(e.target.value)}
              rows={2}
            />
            <ScaleRow
              label={t.tpVoc}
              from={1}
              to={7}
              value={vocCurrent ?? undefined}
              onPick={setVocCurrent}
              accent="success"
            />
          </div>
        );
      case SessionPhase.BodyScan:
        return (
          <div className="flex flex-col gap-4">
            <Field
              as="textarea"
              label={t.tpBody}
              value={bodyLocation}
              onChange={(e) => setBodyLocation(e.target.value)}
              rows={2}
            />
            <ScaleRow
              label={t.tpSuds}
              from={0}
              to={10}
              value={suds ?? undefined}
              onPick={logSuds}
              accent="danger"
            />
          </div>
        );
      case SessionPhase.Closure:
        return (
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setIsGroundingOpen(true)}
              className="w-full py-3 rounded-xl font-medium text-[13px] bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25 transition-all flex items-center justify-center gap-2"
            >
              <LifeBuoy size={15} /> {t.stopGround}
            </button>
            <button
              onClick={handleSave}
              className={`w-full py-3 rounded-xl font-semibold text-[13px] transition-all flex items-center justify-center gap-2 ${
                saved ? 'bg-emerald-500/15 text-emerald-300' : 'bg-white/[0.06] text-white/60 hover:bg-white/[0.08] hover:text-white'
              }`}
            >
              {saved ? (<><Check size={14} /> {t.tpSaved}</>) : (<><Save size={14} /> {t.tpSaveSession}</>)}
            </button>
          </div>
        );
      default: // Idle
        return (
          <p className="text-[13px] text-white/45 leading-relaxed">{t.tpHostOnly}</p>
        );
    }
  };

  return (
    <AnimatePresence>
      {isClinicalOpen && (
        !isHost ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-2xl"
          >
            <IconButton
              onClick={() => setIsClinicalOpen(false)}
              aria-label="Close"
              variant="ghost"
              className="absolute top-4 right-4"
            >
              <X size={18} />
            </IconButton>
            <motion.div
              initial={{ scale: 0.96, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 16, opacity: 0 }}
              transition={{ type: 'spring', damping: 26, stiffness: 200 }}
              className="w-full max-w-md rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 px-6 py-6 flex flex-col gap-4"
            >
              <div className="flex items-center gap-2.5">
                <ClipboardList size={18} className="text-indigo-300 shrink-0" />
                <h2 className="text-lg font-medium tracking-tight text-white">{t.tpTitle}</h2>
              </div>
              <div className="flex items-start gap-2.5">
                <Lock size={16} className="text-amber-300 shrink-0 mt-0.5" />
                <p className="text-[13px] text-amber-100/85 leading-relaxed">{t.tpSoloLock}</p>
              </div>
              <p className="text-[12px] text-white/45 leading-relaxed">{t.tpHostOnly}</p>
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-[#0a0a0c] flex flex-col h-[100dvh] overflow-hidden"
          >
            <header className="shrink-0 h-14 px-4 md:px-5 flex items-center gap-3 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5 min-w-0">
                <ClipboardList size={18} className="text-indigo-300 shrink-0" />
                <h2 className="text-[15px] font-semibold tracking-tight text-white truncate hidden sm:block">{t.tpTitle}</h2>
              </div>
              <span className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/[0.04] shrink-0">
                <span className={`w-1.5 h-1.5 rounded-full ${clientActive ? 'bg-emerald-400' : 'bg-white/25'}`} />
                <span className="text-[11px] font-medium text-white/45">{clientActive ? t.sessLive : t.sessConnecting}</span>
              </span>
              <div className="flex-1 min-w-0 flex items-center gap-2">
                <span className="text-indigo-300 text-[13px] font-semibold tabular-nums shrink-0">{t.tpPhaseLabel} {currentMeta?.n}</span>
                <span className="text-white/60 text-[13px] font-medium truncate">{currentMeta?.name}</span>
              </div>
              <button
                onClick={() => setIsGroundingOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-[13px] bg-emerald-500/15 text-emerald-200 hover:bg-emerald-500/25 transition-all shrink-0"
              >
                <LifeBuoy size={15} className="shrink-0" />
                <span className="hidden md:inline">{t.stopGround}</span>
              </button>
              <IconButton
                onClick={() => setIsClinicalOpen(false)}
                aria-label="Close"
                variant="ghost"
              >
                <X size={18} />
              </IconButton>
            </header>

            {/* rail / center / operator, stacks vertically under lg */}
            <div className="flex-1 min-h-0 flex flex-col lg:flex-row">

              <nav className="order-1 shrink-0 lg:w-[72px] xl:w-[216px] 2xl:w-[232px] border-b lg:border-b-0 lg:border-r border-white/[0.06] px-2 xl:px-3 py-3 flex flex-row lg:flex-col gap-1 overflow-x-auto lg:overflow-visible no-scrollbar">
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
                        active ? 'bg-indigo-500/15 text-indigo-200' : 'bg-white/[0.06] text-white/45'
                      }`}>
                        {meta?.n ?? idx}
                      </span>
                      <span className="text-[12px] font-medium truncate hidden xl:inline flex-1 text-left">{meta?.name}</span>
                      <span className={`w-1.5 h-1.5 rounded-full shrink-0 hidden xl:block ${
                        active ? 'bg-indigo-300' : hasData ? 'bg-emerald-400/70' : 'bg-white/[0.06]'
                      }`} />
                    </button>
                  );
                })}
              </nav>

              <main className="order-3 lg:order-2 flex-1 min-h-0 flex flex-col border-t lg:border-t-0 lg:border-r border-white/[0.06]">
                <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar px-5 md:px-7 py-5 flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[15px] font-semibold text-white tracking-tight">{currentMeta?.name}</h3>
                    <p className="text-[12px] text-white/45 leading-relaxed">{currentMeta?.desc}</p>
                  </div>
                  {renderPhaseFields()}
                </div>

                <div className="shrink-0 border-t border-white/[0.06] px-5 md:px-7 py-3.5 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between gap-3">
                    <SectionLabel>{t.tpNotes}</SectionLabel>
                    <button
                      onClick={() => setLogOpen(true)}
                      className="flex items-center gap-1.5 text-[11px] font-medium text-white/45 hover:text-white/60 transition-colors"
                    >
                      <ListOrdered size={12} /> {t.tpSudsTrend}
                    </button>
                  </div>
                  <textarea
                    value={therapistNotes}
                    onChange={(e) => setTherapistNotes(e.target.value)}
                    placeholder={t.tpNotesPh}
                    className="w-full resize-none h-[160px] xl:h-[176px] rounded-xl bg-white/[0.03] border border-white/[0.06] px-3.5 py-3 text-[13px] leading-relaxed text-white/90 placeholder:text-white/25 focus:outline-none focus:bg-white/[0.06] focus:ring-2 focus:ring-indigo-500/30 transition-colors overflow-y-auto no-scrollbar"
                  />
                  <div className="flex items-center gap-2 overflow-hidden">
                    <SectionLabel>{t.series}</SectionLabel>
                    <div className="flex items-center gap-1.5 min-w-0 overflow-hidden">
                      {recentLog.length > 0 ? recentLog.map((e, i) => (
                        <span key={i} className="shrink-0 text-[11px] tabular-nums px-1.5 py-0.5 rounded bg-white/[0.04] text-white/60">SUD {e.value}</span>
                      )) : <span className="text-[11px] text-white/25">-</span>}
                    </div>
                  </div>
                </div>
              </main>

              <aside className="order-2 lg:order-3 shrink-0 w-full lg:w-[320px] xl:w-[360px] 2xl:w-[384px] border-t lg:border-t-0 border-white/[0.06] px-4 py-4 flex flex-col gap-3.5 overflow-y-auto lg:overflow-hidden no-scrollbar">
                <MiniStimPreview />

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

                <div className="rounded-2xl bg-white/[0.02] px-3.5 py-3 flex flex-col gap-3">
                  <SectionLabel>{t.tpQuick}</SectionLabel>
                  <div className="flex flex-col gap-3">
                    <Slider
                      label={t.speedLabel}
                      value={speed}
                      min={0.5}
                      max={3}
                      step={0.1}
                      accent="info"
                      onChange={(v) => setSpeed(v)}
                    />
                    <Slider
                      label={t.seriesLabel}
                      value={cyclesPerSet}
                      min={10}
                      max={60}
                      step={2}
                      accent="info"
                      onChange={(v) => setCyclesPerSet(Math.round(v))}
                    />
                    <Slider
                      label={t.amplitudeLabel}
                      value={amplitude}
                      min={40}
                      max={100}
                      step={1}
                      unit="%"
                      accent="info"
                      onChange={(v) => setAmplitude(Math.round(v))}
                    />
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
                          pattern === p.id ? 'bg-cyan-500/15 text-cyan-200' : 'bg-white/[0.03] text-white/45 hover:bg-white/[0.07]'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex gap-2">
                      {swatchColors.map((c) => (
                        <button
                          key={c}
                          onClick={() => setColor(c)}
                          aria-label={c}
                          className={`w-5 h-5 rounded-full shrink-0 transition-all ${color === c ? 'scale-125' : 'opacity-40 hover:opacity-80'}`}
                          style={{ backgroundColor: c, boxShadow: color === c ? `0 0 10px ${c}99` : 'none' }}
                        />
                      ))}
                    </div>
                    <IconButton
                      onClick={() => setAudioEnabled(!audioEnabled)}
                      aria-label={t.tpLocalMute}
                      variant={!audioEnabled ? 'default' : 'ghost'}
                      active={!audioEnabled}
                      size="sm"
                    >
                      {!audioEnabled ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    </IconButton>
                  </div>
                </div>

                <div className="rounded-2xl bg-white/[0.02] px-3.5 py-3 flex flex-col gap-2.5">
                  <SectionLabel accent="calm">{t.cueTitle}</SectionLabel>
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
                            <SectionLabel accent="calm">
                              {t.stepLabel} {cueIdx + 1}/{cueTotal}
                            </SectionLabel>
                            <button
                              onClick={() => setClientCue('none')}
                              className="flex items-center gap-1 text-[11px] font-medium text-white/45 hover:text-white/60 transition-colors"
                            >
                              <EyeOff size={12} /> {t.cueClear}
                            </button>
                          </div>
                          <p className="text-[12px] text-white/60 leading-relaxed min-h-[2.4em]">{cueStepText}</p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setCueStep(clampCueStep(cueTech, cueIdx - 1))}
                              disabled={cueIdx === 0}
                              className="flex-1 py-2 rounded-xl font-medium text-[13px] bg-white/[0.04] text-white/60 hover:bg-white/[0.07] disabled:opacity-30 transition-all flex items-center justify-center gap-1"
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

                <button
                  onClick={() => setSettingsOpen(true)}
                  className="w-full py-3 rounded-2xl font-medium text-[13px] bg-white/[0.04] text-white/60 hover:bg-white/[0.07] hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <SlidersHorizontal size={15} /> {t.navSettings}
                </button>
              </aside>
            </div>

            <SessionSettingsDrawer open={settingsOpen} onClose={() => setSettingsOpen(false)} />

            <OverlayShell
              open={logOpen}
              onClose={() => setLogOpen(false)}
              ariaLabel={t.tpLogObs}
              maxWidth="max-w-lg"
              z="drawer"
              glow={false}
            >
              <div className="flex flex-col gap-4 max-h-[80vh]">
                <div className="flex items-center justify-between">
                  <h3 className="text-[15px] font-semibold text-white">{t.tpLogObs}</h3>
                  <IconButton
                    onClick={() => setLogOpen(false)}
                    aria-label="Close"
                    variant="ghost"
                  >
                    <X size={18} />
                  </IconButton>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar flex flex-col gap-1.5">
                  {observations.length > 0 ? observations.map((o, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-[12px] text-white/60 px-3 py-2.5 rounded-xl bg-white/[0.03]">
                      <span className="text-white/25 tabular-nums shrink-0 font-semibold">#{o.set}</span>
                      <span className="min-w-0 flex-1 leading-relaxed">{o.note || '-'}</span>
                      {o.suds !== null && <span className="text-rose-300/80 tabular-nums shrink-0 font-medium">SUD {o.suds}</span>}
                    </div>
                  )) : <p className="text-[12px] text-white/25">-</p>}
                </div>
                {sudsLog.length > 0 && (
                  <div className="flex flex-col gap-2">
                    <SectionLabel accent="info">{t.tpSudsTrend}</SectionLabel>
                    <div className="flex items-end gap-1.5 h-24 px-1">
                      {sudsLog.map((e, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1.5 min-w-0">
                          <div
                            className="w-full rounded-t-md bg-gradient-to-t from-rose-500/40 to-cyan-400/70"
                            style={{ height: `${Math.max(4, (e.value / 10) * 100)}%` }}
                            title={`SUD ${e.value}`}
                          />
                          <span className="text-[9px] text-white/25 tabular-nums">{e.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </OverlayShell>
          </motion.div>
        )
      )}
    </AnimatePresence>
  );
}
