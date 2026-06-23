'use client';

import {
  X, Play, Pause, Share2, Check,
  ChevronDown, ArrowLeftRight, ArrowUpDown, MoveDiagonal, MoveDiagonal2,
  Infinity as InfinityIcon, GripHorizontal, Activity, Columns, TrendingUp,
  Circle, Square as SquareIcon, CircleDashed, Wand2,
  Wind, CloudRain, Waves, Music, Headphones, Zap, Brain, Sparkles,
  ShieldAlert, Moon, Orbit, Radio, VolumeX
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { isHapticSupported } from '../hooks/useHapticBLS';
import { useShareableState } from '../hooks/useShareableState';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useT } from '../i18n/useT';
import { LOCALES, LOCALE_META } from '../i18n';

const Label = ({ children, color = 'text-white/35' }: { children: React.ReactNode; color?: string }) => (
  <span className={`text-[11px] uppercase tracking-[0.15em] font-semibold ${color}`}>{children}</span>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="text-white/80 text-[13px] font-medium tabular-nums bg-white/[0.06] px-2.5 py-1 rounded-lg border border-white/[0.06]">
    {children}
  </span>
);

const Toggle = ({ enabled, onChange, accent }: { enabled: boolean; onChange: () => void; accent: string }) => (
  <button
    onClick={onChange}
    className={`w-11 h-6 rounded-full relative flex items-center transition-colors duration-300 shrink-0 border ${enabled ? `${accent} border-transparent` : 'bg-white/[0.06] border-white/[0.08]'}`}
  >
    <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>
);

export const SettingsPanel = () => {
  const {
    speed, setSpeed, size, setSize, color, setColor, pattern, setPattern,
    audioFormat, setAudioFormat, ambientSound, setAmbientSound,
    cyclesPerSet, setCyclesPerSet,
    setsCompleted, isSettingsOpen, setIsSettingsOpen, isPlaying,
    isSaccadic, setIsSaccadic, showSymbols, setShowSymbols,
    symbolLanguage, setSymbolLanguage, targetShape, setTargetShape,
    visualBackground, setVisualBackground, activePreset, applyPreset,
    safeMode, setSafeMode, amplitude, setAmplitude, lang, setLang,
    audioEnabled, setAudioEnabled,
    audioVolume, setAudioVolume,
    ambientVolume, setAmbientVolume,
    hapticEnabled, setHapticEnabled,
    visualEnabled, setVisualEnabled,
    vestibularSafe, setVestibularSafe
  } = useStore();
  const t = useT();

  const [expandedCategory, setExpandedCategory] = useState<string | null>('calm');
  const { generateShareLink } = useShareableState();
  const [justCopied, setJustCopied] = useState(false);
  // SSR-safe: navigator is unavailable on the server, so resolve haptic support
  // only after mount to keep the first client render identical to the server one.
  const [hapticOk, setHapticOk] = useState(false);
  useEffect(() => { setHapticOk(isHapticSupported()); }, []);

  const handleShare = () => {
    const link = generateShareLink();
    navigator.clipboard.writeText(link);
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 2000);
  };

  const colors = [
    { value: '#06b6d4', shadow: 'var(--drop-shadow-glow-cyan)' },
    { value: '#10b981', shadow: 'var(--drop-shadow-glow-emerald)' },
    { value: '#f59e0b', shadow: 'var(--drop-shadow-glow-amber)' },
    { value: '#f43f5e', shadow: 'var(--drop-shadow-glow-rose)' },
    { value: '#ffffff', shadow: 'var(--drop-shadow-glow-white)' },
    { value: '#6366f1', shadow: '0 0 20px rgba(99,102,241,0.4)' }
  ];

  const patterns = [
    { id: 'horizontal', icon: ArrowLeftRight },
    { id: 'vertical', icon: ArrowUpDown },
    { id: 'diagonal-1', icon: MoveDiagonal },
    { id: 'diagonal-2', icon: MoveDiagonal2 },
    { id: 'lemniscate', icon: InfinityIcon },
    { id: 'dots', icon: GripHorizontal },
    { id: 'pulse', icon: Activity },
    { id: 'bars', icon: Columns },
    { id: 'zigzag', icon: TrendingUp }
  ];

  const shapes = [
    { id: 'circle', icon: Circle },
    { id: 'square', icon: SquareIcon },
    { id: 'ring', icon: CircleDashed },
    { id: 'butterfly', icon: Wand2 }
  ];

  const audioKeys = ['continuous', 'click', 'metronome', 'white_noise', 'binaural_beats'];
  const symbolLangKeys = ['ru', 'en', 'numbers'];

  const ambientButtons = [
    { id: 'none', icon: Wind, accent: 'bg-white/10 text-white border-white/12' },
    { id: 'rain', icon: CloudRain, accent: 'bg-cyan-500/12 text-cyan-200 border-cyan-500/20' },
    { id: 'ocean', icon: Waves, accent: 'bg-blue-500/12 text-blue-200 border-blue-500/20' },
    { id: 'breath', icon: Wind, accent: 'bg-emerald-500/12 text-emerald-200 border-emerald-500/20' },
    { id: 'hz528', icon: Music, accent: 'bg-amber-500/12 text-amber-200 border-amber-500/20' },
    { id: 'wind_harmonics', icon: Headphones, accent: 'bg-indigo-500/12 text-indigo-200 border-indigo-500/20' },
    { id: 'breathform', icon: Wind, accent: 'bg-purple-500/12 text-purple-200 border-purple-500/20' },
    { id: 'pink', icon: Activity, accent: 'bg-pink-500/12 text-pink-200 border-pink-500/20' },
    { id: 'brown', icon: Waves, accent: 'bg-orange-500/12 text-orange-200 border-orange-500/20' },
    { id: 'drone', icon: Radio, accent: 'bg-teal-500/12 text-teal-200 border-teal-500/20' }
  ];

  const bgButtons = [
    { id: 'black', icon: Moon, accent: 'bg-white/10 text-white border-white/12' },
    { id: 'aurora', icon: Orbit, accent: 'bg-emerald-500/12 text-emerald-200 border-emerald-500/20' },
    { id: 'stars', icon: Sparkles, accent: 'bg-indigo-500/12 text-indigo-200 border-indigo-500/20' }
  ];

  const presetCategories = [
    { id: 'calm', title: t.catCalm, color: 'text-emerald-400', icon: ShieldAlert, presets: ['anxiety', 'panic'] },
    { id: 'resource', title: t.catResource, color: 'text-amber-400', icon: Sparkles, presets: ['resource', 'focus', 'sleep', 'grounding_528'] },
    { id: 'focus', title: t.catFocus, color: 'text-cyan-400', icon: Brain, presets: ['adhd_focus', 'adhd_impulse', 'adhd_calm', 'adhd_body'] },
    { id: 'profiles', title: t.catProfiles, color: 'text-rose-400', icon: Zap, hint: t.profilesHint, presets: ['trauma_smooth', 'trauma_deep', 'trauma_saccadic', 'trauma_acute', 'trauma_body', 'trauma_flashback'] }
  ];

  return (
    <>
      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.6 }}
            className="fixed right-0 top-0 h-full w-[340px] md:w-[420px] bg-[#0a0a0c]/85 backdrop-blur-[40px] border-l border-white/[0.06] shadow-[-20px_0_60px_-10px_rgba(0,0,0,0.8)] z-50 flex flex-col"
          >
            {}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 shrink-0 border-b border-white/5">
              <div>
                <h2 className="text-lg font-medium tracking-tight text-white">{t.settingsTitle}</h2>
                <p className="text-white/25 text-[12px] mt-0.5 tracking-wide">{t.settingsSub}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => useStore.getState().togglePlaying()}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-medium text-[13px] transition-all border ${
                    isPlaying
                      ? 'bg-white/[0.08] border-white/10 text-white hover:bg-white/12'
                      : 'bg-cyan-500/15 border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/25'
                  }`}
                >
                  {isPlaying ? <><Pause size={14} className="fill-current" /> {t.pause}</> : <><Play size={14} fill="currentColor" style={{ transform: 'translateX(1px)' }} /> {t.test}</>}
                </button>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-2 rounded-xl hover:bg-white/[0.08] text-white/40 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {}
            <div className="flex-1 no-scrollbar overflow-y-auto">

              {}
              <div className="px-5 pt-5 pb-1">
                <Label>{t.languageSection}</Label>
                <div className="grid grid-cols-4 gap-1.5 mt-2.5">
                  {LOCALES.map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={`min-h-[44px] py-1.5 px-1 rounded-xl text-[11px] font-medium leading-tight border transition-all flex flex-col items-center justify-center gap-0.5 min-w-0 ${
                        lang === l ? 'bg-white/10 text-white border-white/15 shadow-lg' : 'bg-white/[0.02] text-white/40 border-transparent hover:bg-white/[0.06]'
                      }`}
                    >
                      <span className="text-[15px] leading-none">{LOCALE_META[l].flag}</span>
                      <span className="block max-w-full truncate">{LOCALE_META[l].native}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mx-5 border-t border-white/5 my-2" />

              {}
              <div className="px-5 pt-2 pb-2">
                <Label>{t.programs}</Label>
                <div className="flex flex-col gap-2 mt-3">
                  {presetCategories.map(cat => {
                    const CatIcon = cat.icon;
                    const isExpanded = expandedCategory === cat.id;
                    return (
                      <div key={cat.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <button
                          onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.04] transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <CatIcon size={16} className={`${cat.color} shrink-0`} />
                            <span className={`font-medium text-[14px] ${cat.color} truncate`}>{cat.title}</span>
                          </div>
                          <ChevronDown size={14} className={`text-white/30 transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-3 pb-3 flex flex-col gap-1.5">
                                {cat.hint && (
                                  <p className="text-[11px] text-amber-200/55 leading-relaxed px-1 pb-1">{cat.hint}</p>
                                )}
                                {cat.presets.map(pid => {
                                  const preset = t.presets[pid];
                                  const isActive = activePreset === pid;
                                  return (
                                    <button
                                      key={pid}
                                      onClick={() => applyPreset(pid)}
                                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all text-[13px] border ${
                                        isActive
                                          ? 'bg-white/[0.08] border-white/12 text-white'
                                          : 'bg-transparent border-transparent text-white/60 hover:bg-white/[0.04] hover:text-white/80'
                                      }`}
                                    >
                                      <div className="font-medium">{preset?.label ?? pid}</div>
                                      <div className="text-[11px] text-white/30 mt-0.5">{preset?.desc}</div>
                                    </button>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mx-5 border-t border-white/5 my-2" />

              {}
              <div className="px-5 py-3">
                <Label>{t.patternLabel}</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                  {patterns.map(p => {
                    const Icon = p.icon;
                    const active = pattern === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setPattern(p.id as any)}
                        className={`min-h-[60px] py-2.5 px-2 rounded-xl text-[12px] font-medium transition-all flex flex-col gap-1.5 items-center justify-center border min-w-0 overflow-hidden ${
                          active ? 'bg-white/10 text-white border-white/12 shadow-lg' : 'bg-white/[0.02] text-white/35 hover:bg-white/[0.06] border-transparent'
                        }`}
                      >
                        <Icon size={16} strokeWidth={active ? 2 : 1.5} className="shrink-0" />
                        <span className="block max-w-full truncate text-center leading-[1.1]">{t.patterns[p.id]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {}
              <div className="px-5 py-3 border-t border-white/5">
                <Label>{t.shapeLabel}</Label>
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {shapes.map(s => {
                    const Icon = s.icon;
                    const active = targetShape === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setTargetShape(s.id as any)}
                        className={`min-h-[58px] py-2 px-1.5 rounded-xl text-[12px] font-medium transition-all flex flex-col gap-1.5 items-center justify-center border min-w-0 overflow-hidden ${
                          active ? 'bg-indigo-500/12 text-indigo-200 border-indigo-500/20 shadow-lg' : 'bg-white/[0.02] text-white/35 hover:bg-white/[0.06] border-transparent'
                        }`}
                      >
                        <Icon size={16} strokeWidth={active ? 2 : 1.5} className="shrink-0" />
                        <span className="block max-w-full truncate text-center leading-[1.1]">{t.shapes[s.id]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {}
              <div className="px-5 py-3 border-t border-white/5">
                <Label>{t.colorLabel}</Label>
                <div className="flex gap-3 mt-3 flex-wrap">
                  {colors.map(c => (
                    <button
                      key={c.value}
                      onClick={() => setColor(c.value)}
                      className={`w-8 h-8 rounded-full shrink-0 transition-all duration-300 ${color === c.value ? 'scale-125 ring-2 ring-white/50 ring-offset-2 ring-offset-[#0a0a0c]' : 'opacity-40 hover:opacity-80 hover:scale-110'}`}
                      style={{ backgroundColor: c.value, boxShadow: color === c.value ? c.shadow : 'none' }}
                    />
                  ))}
                </div>
              </div>

              {}
              <div className="px-5 py-3 border-t border-white/5 flex flex-col gap-4">
                {[
                  { label: t.speedLabel, value: `${speed.toFixed(1)} ${t.hzUnit}`, min: 0.5, max: 3.0, step: 0.1, val: speed, set: setSpeed, parse: parseFloat, hint: '' },
                  { label: t.amplitudeLabel, value: `${amplitude}%`, min: 40, max: 100, step: 1, val: amplitude, set: setAmplitude, parse: parseInt, hint: t.amplitudeHint },
                  { label: t.seriesLabel, value: `${cyclesPerSet} ${t.cyclesUnit}`, min: 10, max: 60, step: 2, val: cyclesPerSet, set: setCyclesPerSet, parse: parseInt, hint: '' },
                  { label: t.sizeLabel, value: `${size} ${t.pxUnit}`, min: 20, max: 150, step: 1, val: size, set: setSize, parse: parseInt, hint: '' }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center gap-3">
                      <Label>{item.label}</Label>
                      <Badge>{item.value}</Badge>
                    </div>
                    <input type="range" min={item.min} max={item.max} step={item.step} value={item.val} onChange={e => (item.set as any)(item.parse(e.target.value))} className="w-full" />
                    {item.hint && <p className="text-white/25 text-[11px] leading-relaxed -mt-0.5">{item.hint}</p>}
                  </div>
                ))}
              </div>

              {}
              <div className="px-5 py-3 border-t border-white/5 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <VolumeX size={14} className={audioEnabled ? 'text-white/30' : 'text-sky-400/80'} />
                    <div>
                      <Label color="text-sky-400/70">{t.mute}</Label>
                      <p className="text-white/25 text-[12px] mt-0.5">{t.muteDesc}</p>
                    </div>
                  </div>
                  <Toggle enabled={!audioEnabled} onChange={() => setAudioEnabled(!audioEnabled)} accent="bg-sky-500/70" />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <Label color="text-emerald-400/70">{t.reduceMotion}</Label>
                    <p className="text-white/25 text-[12px] mt-0.5">{t.reduceMotionDesc}</p>
                  </div>
                  <Toggle enabled={safeMode} onChange={() => setSafeMode(!safeMode)} accent="bg-emerald-500/70" />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <Label color="text-rose-400/70">{t.saccades}</Label>
                    <p className="text-white/25 text-[12px] mt-0.5">{t.saccadesDesc}{safeMode ? t.saccadesOffSafe : ''}</p>
                  </div>
                  <Toggle enabled={isSaccadic && !safeMode} onChange={() => !safeMode && setIsSaccadic(!isSaccadic)} accent="bg-rose-500/70" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <Label color="text-purple-400/70">{t.cogLoad}</Label>
                      <p className="text-white/25 text-[12px] mt-0.5">{t.cogLoadDesc}</p>
                    </div>
                    <Toggle enabled={showSymbols} onChange={() => setShowSymbols(!showSymbols)} accent="bg-purple-500/70" />
                  </div>
                  <AnimatePresence>
                    {showSymbols && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex gap-1.5 overflow-hidden">
                        {symbolLangKeys.map((l) => (
                          <button key={l} onClick={() => setSymbolLanguage(l as any)} className={`flex-1 py-1.5 rounded-lg text-[12px] font-medium transition-colors border ${symbolLanguage === l ? 'bg-purple-500/15 text-purple-200 border-purple-500/20' : 'bg-white/[0.03] text-white/35 border-transparent hover:bg-white/[0.06]'}`}>
                            {t.langNames[l]}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {}
              <div className="px-5 py-3 border-t border-white/5 flex flex-col gap-4">
                <div>
                  <Label>{t.stimSound}</Label>
                  <div className="grid grid-cols-3 gap-1.5 mt-2.5">
                    {audioKeys.map((a) => (
                      <button key={a} onClick={() => setAudioFormat(a as any)} className={`min-h-[44px] py-2 px-1.5 rounded-xl text-[12px] font-medium leading-tight text-center transition-all border min-w-0 ${audioFormat === a ? 'bg-cyan-500/12 text-cyan-200 border-cyan-500/20 shadow-lg' : 'bg-white/[0.02] text-white/35 border-transparent hover:bg-white/[0.06]'}`}>
                        {t.audioFormats[a]}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>{t.ambientLabel}</Label>
                  <div className="grid grid-cols-4 gap-2 mt-2.5">
                    {ambientButtons.map((b) => {
                      const Icon = b.icon;
                      const active = ambientSound === b.id;
                      return (
                        <button
                          key={b.id}
                          onClick={() => setAmbientSound(b.id as any)}
                          className={`flex flex-col gap-1 items-center min-h-[56px] py-2 px-1 rounded-xl text-[11px] font-medium leading-tight border transition-all min-w-0 ${active ? `${b.accent} shadow-lg` : 'bg-white/[0.02] text-white/35 border-transparent hover:bg-white/[0.06]'}`}
                        >
                          <Icon size={13} className="shrink-0" />
                          <span className="block max-w-full truncate">{t.ambientNames[b.id]}</span>
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-white/25 text-[11px] mt-2 leading-relaxed">{t.ambientNote}</p>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    { label: t.blsVolume, val: audioVolume, set: setAudioVolume },
                    { label: t.ambientVolumeLabel, val: ambientVolume, set: setAmbientVolume }
                  ].map((item, i) => (
                    <div key={i} className={`flex flex-col gap-2 ${!audioEnabled ? 'opacity-40 pointer-events-none' : ''}`}>
                      <div className="flex justify-between items-center gap-3">
                        <Label color="text-sky-400/70">{item.label}</Label>
                        <Badge>{Math.round(item.val * 100)}%</Badge>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.05}
                        value={item.val}
                        disabled={!audioEnabled}
                        onChange={e => item.set(parseFloat(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <Label>{t.bgLabel}</Label>
                  <div className="grid grid-cols-3 gap-1.5 mt-2.5">
                    {bgButtons.map((b) => {
                      const Icon = b.icon;
                      const active = visualBackground === b.id;
                      return (
                        <button
                          key={b.id}
                          onClick={() => setVisualBackground(b.id as any)}
                          className={`flex flex-col gap-1 items-center py-2 px-1 rounded-xl text-[12px] font-medium leading-tight border transition-all min-w-0 ${active ? b.accent : 'bg-white/[0.02] text-white/35 border-transparent hover:bg-white/[0.06]'}`}
                        >
                          <Icon size={14} className="shrink-0" />
                          <span className="block max-w-full truncate">{t.bgNames[b.id]}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {}
              <div className="px-5 py-3 border-t border-white/5 flex flex-col gap-4">
                <Label color="text-indigo-400/70">{t.channelsSection}</Label>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <Label color="text-violet-400/70">{t.hapticLabel}</Label>
                    <p className="text-white/25 text-[12px] mt-0.5">
                      {hapticOk ? t.hapticDesc : t.hapticUnsupported}
                    </p>
                  </div>
                  <Toggle
                    enabled={hapticEnabled && hapticOk}
                    onChange={() => { if (hapticOk) setHapticEnabled(!hapticEnabled); }}
                    accent="bg-violet-500/70"
                  />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <Label color="text-amber-400/70">{t.visualStim}</Label>
                    <p className="text-white/25 text-[12px] mt-0.5">{t.visualStimDesc}</p>
                  </div>
                  <Toggle enabled={visualEnabled} onChange={() => setVisualEnabled(!visualEnabled)} accent="bg-amber-500/70" />
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <Label color="text-teal-400/70">{t.vestibular}</Label>
                    <p className="text-white/25 text-[12px] mt-0.5">{t.vestibularDesc}</p>
                  </div>
                  <Toggle enabled={vestibularSafe} onChange={() => setVestibularSafe(!vestibularSafe)} accent="bg-teal-500/70" />
                </div>
              </div>

              {}
              <div className="px-5 py-3 border-t border-white/5">
                <div className="flex items-center justify-between bg-white/[0.02] rounded-xl px-4 py-3 border border-white/[0.04]">
                  <Label>{t.sessionsToday}</Label>
                  <span className="text-cyan-400 text-xl font-light tabular-nums">{setsCompleted}</span>
                </div>
              </div>

              {}
              <div className="px-5 py-5 shrink-0 flex flex-col gap-3">
                <button
                  onClick={handleShare}
                  className={`w-full py-3 rounded-2xl font-semibold text-[13px] tracking-wide transition-all border flex items-center justify-center gap-2 ${
                    justCopied
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {justCopied ? (<><Check size={14} /> {t.linkCopied}</>) : (<><Share2 size={14} /> {t.sharePreset}</>)}
                </button>

                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="w-full py-3.5 bg-white hover:bg-white/90 text-zinc-950 rounded-2xl font-semibold text-[14px] tracking-wide transition-all shadow-[0_0_20px_rgba(255,255,255,0.12)] hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" /> {t.start}
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
