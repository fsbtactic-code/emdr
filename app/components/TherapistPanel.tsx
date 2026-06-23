'use client';

import {
  X, Lock, Play, Pause, Save, Check, RotateCcw,
  ClipboardList, Activity, ChevronRight, BookOpen, Radio,
  Gauge, VolumeX
} from 'lucide-react';
import { useStore, SessionPhase, PatternType } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useT } from '../i18n/useT';
import { saveSession } from '../lib/journal';

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

const Label = ({ children, color = 'text-white/35' }: { children: React.ReactNode; color?: string }) => (
  <span className={`text-[11px] uppercase tracking-[0.15em] font-semibold ${color}`}>{children}</span>
);

// Filled value pill (no white outline).
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="text-white/80 text-[13px] font-medium tabular-nums bg-white/[0.05] px-2.5 py-1 rounded-lg border border-transparent">
    {children}
  </span>
);

// Toggle styled like SettingsPanel: accent fill when on, filled track when off.
const Toggle = ({ enabled, onChange, accent }: { enabled: boolean; onChange: () => void; accent: string }) => (
  <button
    onClick={onChange}
    className={`w-11 h-6 rounded-full relative flex items-center transition-colors duration-300 shrink-0 border ${enabled ? `${accent} border-transparent` : 'bg-white/[0.06] border-transparent'}`}
  >
    <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>
);

// Ordered pattern ids for the compact picker (matches PatternType union).
const QUICK_PATTERNS: PatternType[] = [
  'horizontal', 'vertical', 'diagonal-1', 'diagonal-2', 'lemniscate', 'dots', 'pulse', 'bars', 'zigzag'
];

const Field = ({ label, value, onChange, placeholder, rows = 2 }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) => (
  <div className="flex flex-col gap-1.5">
    <Label>{label}</Label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full resize-none rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-2 text-[13px] text-white/85 placeholder:text-white/20 focus:outline-none focus:border-white/[0.12] transition-colors no-scrollbar"
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
            className={`min-w-[34px] h-9 px-1 rounded-lg text-[13px] font-medium tabular-nums border transition-all ${
              active ? `${accent} shadow-lg` : 'bg-white/[0.03] text-white/40 border-transparent hover:bg-white/[0.07]'
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
  const isClinicalOpen = useStore((s) => s.isClinicalOpen);
  const setIsClinicalOpen = useStore((s) => s.setIsClinicalOpen);
  const setIsResourcesOpen = useStore((s) => s.setIsResourcesOpen);
  const setIsSessionOpen = useStore((s) => s.setIsSessionOpen);
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
  // host-local audio (NOT broadcast: muting here only affects the host device)
  const audioEnabled = useStore((s) => s.audioEnabled);
  const setAudioEnabled = useStore((s) => s.setAudioEnabled);

  // per-set local state for the desensitization loop
  const [setObsNote, setSetObsNote] = useState('');
  const [setObsSuds, setSetObsSuds] = useState<number | null>(null);
  const [awaitingNotice, setAwaitingNotice] = useState(false);

  const [saved, setSaved] = useState(false);

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

  return (
    <AnimatePresence>
      {isClinicalOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', bounce: 0, duration: 0.6 }}
          className="fixed left-0 top-0 h-full w-[340px] md:w-[480px] bg-[#0a0a0c]/85 backdrop-blur-[40px] border-r border-white/[0.06] shadow-[20px_0_60px_-10px_rgba(0,0,0,0.8)] z-50 flex flex-col"
        >
          {/* header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4 shrink-0 border-b border-white/5">
            <div className="flex items-center gap-2.5 min-w-0">
              <ClipboardList size={18} className="text-indigo-300 shrink-0" />
              <div className="min-w-0">
                <h2 className="text-lg font-medium tracking-tight text-white truncate">{t.tpTitle}</h2>
                <p className="text-white/25 text-[12px] mt-0.5 tracking-wide truncate">{t.tpSub}</p>
              </div>
            </div>
            <button
              onClick={() => setIsClinicalOpen(false)}
              className="p-2 rounded-xl hover:bg-white/[0.08] text-white/40 hover:text-white transition-colors shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 no-scrollbar overflow-y-auto">

            {/* phase stepper (always visible) */}
            <div className="px-5 pt-5 pb-2">
              <Label>{t.tpPhaseLabel}</Label>
              <div className="grid grid-cols-1 gap-1.5 mt-3">
                {PHASE_ORDER.map((ph, idx) => {
                  const meta = t.phases[idx];
                  const active = currentPhase === ph;
                  return (
                    <button
                      key={ph}
                      onClick={() => setPhase(ph)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl border transition-all flex items-center gap-3 ${
                        active
                          ? 'bg-indigo-500/12 border-indigo-500/25 text-white'
                          : 'bg-white/[0.02] border-transparent text-white/55 hover:bg-white/[0.05]'
                      }`}
                    >
                      <span className={`w-6 h-6 rounded-lg shrink-0 flex items-center justify-center text-[12px] font-semibold tabular-nums border ${
                        active ? 'bg-indigo-500/25 text-indigo-100 border-indigo-400/30' : 'bg-white/[0.04] text-white/40 border-white/[0.06]'
                      }`}>
                        {meta?.n ?? idx}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13px] font-medium truncate">{meta?.name}</span>
                      </span>
                      {active && <ChevronRight size={14} className="text-indigo-300 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick controls (host only): reachable in every phase, esp. Desensitization.
                These bind to the SAME store fields broadcast to the client, so changes apply live. */}
            {isHost && (
              <div className="px-5 py-4 border-t border-white/5 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Gauge size={14} className="text-cyan-300/80" />
                  <Label color="text-cyan-300/70">{t.tpQuick}</Label>
                </div>

                {/* speed + amplitude sliders */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-3">
                      <Label>{t.speedLabel}</Label>
                      <Badge>{`${speed.toFixed(1)} ${t.hzUnit}`}</Badge>
                    </div>
                    <input
                      type="range"
                      min={0.5}
                      max={3}
                      step={0.1}
                      value={speed}
                      onChange={(e) => setSpeed(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-3">
                      <Label>{t.amplitudeLabel}</Label>
                      <Badge>{`${amplitude}%`}</Badge>
                    </div>
                    <input
                      type="range"
                      min={40}
                      max={100}
                      step={1}
                      value={amplitude}
                      onChange={(e) => setAmplitude(parseInt(e.target.value))}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* compact pattern picker */}
                <div className="flex flex-col gap-2">
                  <Label>{t.patternLabel}</Label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {QUICK_PATTERNS.map((id) => {
                      const active = pattern === id;
                      return (
                        <button
                          key={id}
                          onClick={() => setPattern(id)}
                          className={`min-h-[40px] py-2 px-1.5 rounded-lg text-[12px] font-medium leading-tight text-center transition-all border min-w-0 truncate ${
                            active
                              ? 'bg-cyan-500/15 text-cyan-100 border-cyan-500/25 shadow-lg'
                              : 'bg-white/[0.03] text-white/40 border-transparent hover:bg-white/[0.07]'
                          }`}
                        >
                          {t.patterns[id]}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* host-local mute (NOT broadcast) */}
                <div className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] border border-transparent px-3.5 py-3">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <VolumeX size={15} className={`shrink-0 mt-0.5 ${!audioEnabled ? 'text-cyan-300/80' : 'text-white/30'}`} />
                    <div className="min-w-0">
                      <Label color={!audioEnabled ? 'text-cyan-300/70' : 'text-white/35'}>{t.tpLocalMute}</Label>
                      <p className="text-white/30 text-[12px] mt-0.5 leading-relaxed">{t.tpLocalMuteHint}</p>
                    </div>
                  </div>
                  <Toggle
                    enabled={!audioEnabled}
                    onChange={() => setAudioEnabled(!audioEnabled)}
                    accent="bg-cyan-500/70"
                  />
                </div>
              </div>
            )}

            {!isHost ? (
              /* solo lock: phases 1-2 info is shown above; reprocessing is gated */
              <div className="px-5 py-4">
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.06] px-4 py-4 flex flex-col gap-3">
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
                </div>
              </div>
            ) : (
              <>
                {/* Assessment (phase 3) */}
                <div className="px-5 py-4 border-t border-white/5 flex flex-col gap-4">
                  <Label color="text-indigo-300/70">{t.phases[3]?.name}</Label>
                  <Field label={t.tpTarget} value={targetDesc} onChange={setTargetDesc} rows={2} />
                  <Field label={t.tpNeg} value={negCognition} onChange={setNegCognition} rows={2} />
                  <Field label={t.tpPos} value={posCognition} onChange={setPosCognition} rows={2} />
                  <Field label={t.tpEmotions} value={emotions} onChange={setEmotions} rows={1} />
                  <Field label={t.tpBody} value={bodyLocation} onChange={setBodyLocation} rows={1} />
                  <div className="flex flex-col gap-2">
                    <Label>{t.tpVocInit}</Label>
                    <ScaleRow from={1} to={7} value={vocInitial} onPick={setVocInitial} accent="bg-emerald-500/15 text-emerald-200 border-emerald-500/25" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>{t.tpSuds}</Label>
                    <ScaleRow from={0} to={10} value={suds} onPick={logSuds} accent="bg-rose-500/15 text-rose-200 border-rose-500/25" />
                  </div>
                </div>

                {/* Desensitization (phase 4): set loop */}
                <div className="px-5 py-4 border-t border-white/5 flex flex-col gap-3">
                  <Label color="text-rose-300/70">{t.phases[4]?.name}</Label>
                  {!awaitingNotice ? (
                    <button
                      onClick={startSet}
                      disabled={isPlaying}
                      className={`w-full py-3 rounded-xl font-medium text-[13px] border transition-all flex items-center justify-center gap-2 ${
                        isPlaying
                          ? 'bg-white/[0.04] border-white/[0.06] text-white/30'
                          : 'bg-rose-500/12 border-rose-500/25 text-rose-200 hover:bg-rose-500/20'
                      }`}
                    >
                      <Play size={14} fill="currentColor" /> {t.tpStartSet}
                    </button>
                  ) : null}
                  {isPlaying && (
                    <button
                      onClick={stopSet}
                      className="w-full py-3 rounded-xl font-medium text-[13px] border border-transparent bg-white/[0.06] text-white hover:bg-white/[0.1] transition-all flex items-center justify-center gap-2"
                    >
                      <Pause size={14} className="fill-current" /> {t.tpStopSet}
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
                          className="w-full resize-none rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-2 text-[13px] text-white/85 placeholder:text-white/20 focus:outline-none focus:border-white/[0.12] transition-colors no-scrollbar"
                        />
                        <div className="flex flex-col gap-2">
                          <Label>{t.tpSuds}</Label>
                          <ScaleRow from={0} to={10} value={setObsSuds} onPick={setSetObsSuds} accent="bg-rose-500/15 text-rose-200 border-rose-500/25" />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={logObservation}
                            className="flex-1 py-2.5 rounded-xl font-medium text-[13px] border border-indigo-500/25 bg-indigo-500/12 text-indigo-200 hover:bg-indigo-500/20 transition-all"
                          >
                            {t.tpLogObs}
                          </button>
                          <button
                            onClick={nextSet}
                            className="flex-1 py-2.5 rounded-xl font-medium text-[13px] border border-transparent bg-white/[0.04] text-white/70 hover:bg-white/[0.08] transition-all"
                          >
                            {t.tpNextSet}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {observations.length > 0 && (
                    <div className="flex flex-col gap-1 mt-1">
                      {observations.map((o, i) => (
                        <div key={i} className="flex items-start gap-2 text-[12px] text-white/50 px-2 py-1.5 rounded-lg bg-white/[0.02]">
                          <span className="text-white/30 tabular-nums shrink-0">#{o.set}</span>
                          <span className="min-w-0 flex-1 truncate">{o.note || '-'}</span>
                          {o.suds !== null && <span className="text-rose-300/70 tabular-nums shrink-0">SUD {o.suds}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Installation (phase 5) */}
                <div className="px-5 py-4 border-t border-white/5 flex flex-col gap-4">
                  <Label color="text-emerald-300/70">{t.phases[5]?.name}</Label>
                  <Field label={t.tpPos} value={posCognition} onChange={setPosCognition} rows={2} />
                  <div className="flex flex-col gap-2">
                    <Label>{t.tpVoc}</Label>
                    <ScaleRow from={1} to={7} value={vocCurrent} onPick={setVocCurrent} accent="bg-emerald-500/15 text-emerald-200 border-emerald-500/25" />
                  </div>
                </div>

                {/* SUDS trend */}
                <div className="px-5 py-4 border-t border-white/5 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-cyan-300/80" />
                    <Label color="text-cyan-300/70">{t.tpSudsTrend}</Label>
                  </div>
                  {sudsLog.length > 0 ? (
                    <div className="flex items-end gap-1 h-20">
                      {sudsLog.map((e, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center justify-end gap-1 min-w-0">
                          <div
                            className="w-full rounded-t bg-gradient-to-t from-rose-500/40 to-cyan-400/60"
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

                {/* Therapist notes */}
                <div className="px-5 py-4 border-t border-white/5">
                  <Field label={t.tpNotes} value={therapistNotes} onChange={setTherapistNotes} placeholder={t.tpNotesPh} rows={3} />
                </div>

                {/* actions */}
                <div className="px-5 py-5 shrink-0 flex flex-col gap-3">
                  <button
                    onClick={handleSave}
                    className={`w-full py-3 rounded-2xl font-semibold text-[13px] tracking-wide transition-all border flex items-center justify-center gap-2 ${
                      saved
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-white/[0.05] border-transparent text-white/70 hover:bg-white/[0.1] hover:text-white'
                    }`}
                  >
                    {saved ? (<><Check size={14} /> {t.tpSaved}</>) : (<><Save size={14} /> {t.tpSaveSession}</>)}
                  </button>
                  <button
                    onClick={resetClinical}
                    className="w-full py-3 rounded-2xl font-medium text-[13px] tracking-wide transition-all border border-transparent bg-white/[0.03] text-white/50 hover:bg-white/[0.07] hover:text-white/80 flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={14} /> {t.tpReset}
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
