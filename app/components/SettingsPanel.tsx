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
import { SectionLabel } from './ui/SectionLabel';
import { Toggle } from './ui/Toggle';
import { Slider } from './ui/Slider';
import { Divider } from './ui/Divider';
import { SelectionTile } from './ui/SelectionTile';
import { Button } from './ui/Button';
import { SHADOW, COLORS } from './ui/tokens';
import { cn } from './ui/cn';

const ValueBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="text-white/80 text-[13px] font-medium tabular-nums bg-white/[0.06] px-2.5 py-1 rounded-lg border border-white/[0.06]">
    {children}
  </span>
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
  const [hapticOk, setHapticOk] = useState(false);
  useEffect(() => { setHapticOk(isHapticSupported()); }, []);

  const handleShare = () => {
    const link = generateShareLink();
    navigator.clipboard.writeText(link);
    setJustCopied(true);
    setTimeout(() => setJustCopied(false), 2000);
  };

  const colors = [
    { value: '#06b6d4', shadow: SHADOW.glow.cyan },
    { value: '#10b981', shadow: SHADOW.glow.emerald },
    { value: '#f59e0b', shadow: SHADOW.glow.amber },
    { value: '#f43f5e', shadow: SHADOW.glow.rose },
    { value: '#ffffff', shadow: SHADOW.glow.white },
    { value: '#6366f1', shadow: SHADOW.glow.indigo }
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
    { id: 'none',           icon: Wind,      accent: 'white'   as const },
    { id: 'rain',           icon: CloudRain, accent: 'info'    as const },
    { id: 'ocean',          icon: Waves,     accent: 'info'    as const },
    { id: 'breath',         icon: Wind,      accent: 'success' as const },
    { id: 'hz528',          icon: Music,     accent: 'warn'    as const },
    { id: 'wind_harmonics', icon: Headphones,accent: 'primary' as const },
    { id: 'breathform',     icon: Wind,      accent: 'calm'    as const },
    { id: 'pink',           icon: Activity,  accent: 'danger'  as const },
    { id: 'brown',          icon: Waves,     accent: 'warn'    as const },
    { id: 'drone',          icon: Radio,     accent: 'info'    as const }
  ];

  const bgButtons = [
    { id: 'black',  icon: Moon,     accent: 'white'   as const },
    { id: 'aurora', icon: Orbit,    accent: 'success' as const },
    { id: 'stars',  icon: Sparkles, accent: 'primary' as const }
  ];

  const presetCategories = [
    { id: 'calm',     title: t.catCalm,     color: 'text-emerald-400', icon: ShieldAlert, presets: ['anxiety', 'panic'] },
    { id: 'resource', title: t.catResource, color: 'text-amber-400',   icon: Sparkles,    presets: ['resource', 'focus', 'sleep', 'grounding_528'] },
    { id: 'focus',    title: t.catFocus,    color: 'text-cyan-400',    icon: Brain,       presets: ['adhd_focus', 'adhd_impulse', 'adhd_calm', 'adhd_body'] },
    { id: 'profiles', title: t.catProfiles, color: 'text-rose-400',    icon: Zap,         hint: t.profilesHint, presets: ['trauma_smooth', 'trauma_deep', 'trauma_saccadic', 'trauma_acute', 'trauma_body', 'trauma_flashback'] }
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
            <div className="flex items-center justify-between px-5 pt-5 pb-4 shrink-0 border-b border-white/5">
              <div>
                <h2 className="text-lg font-medium tracking-tight text-white">{t.settingsTitle}</h2>
                <p className="text-white/25 text-[12px] mt-0.5 tracking-wide">{t.settingsSub}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => useStore.getState().togglePlaying()}
                  className={cn(
                    'flex items-center gap-1.5 px-4 py-2 rounded-xl font-medium text-[13px] transition-all border',
                    isPlaying
                      ? 'bg-white/[0.08] border-white/[0.06] text-white hover:bg-white/[0.08]'
                      : 'bg-cyan-500/15 border-cyan-500/20 text-cyan-300 hover:bg-cyan-500/25'
                  )}
                >
                  {isPlaying
                    ? <><Pause size={14} className="fill-current" /> {t.pause}</>
                    : <><Play size={14} fill="currentColor" style={{ transform: 'translateX(1px)' }} /> {t.test}</>}
                </button>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-2 rounded-xl hover:bg-white/[0.08] text-white/45 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div className="flex-1 no-scrollbar overflow-y-auto">

              <div className="px-5 pt-5 pb-1">
                <SectionLabel>{t.languageSection}</SectionLabel>
                <div className="grid grid-cols-4 gap-1.5 mt-2.5">
                  {LOCALES.map((l) => (
                    <button
                      key={l}
                      onClick={() => setLang(l)}
                      className={cn(
                        'min-h-[44px] py-1.5 px-1 rounded-xl text-[11px] font-medium leading-tight border transition-all flex flex-col items-center justify-center gap-0.5 min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
                        lang === l
                          ? 'bg-white/[0.08] text-white border-white/12 shadow-lg'
                          : 'bg-white/[0.02] text-white/45 border-transparent hover:bg-white/[0.04]'
                      )}
                    >
                      <span className="text-[15px] leading-none">{LOCALE_META[l].flag}</span>
                      <span className="block max-w-full truncate">{LOCALE_META[l].native}</span>
                    </button>
                  ))}
                </div>
              </div>

              <Divider className="mx-5 my-2" />

              <div className="px-5 pt-2 pb-2">
                <SectionLabel>{t.programs}</SectionLabel>
                <div className="flex flex-col gap-2 mt-3">
                  {presetCategories.map(cat => {
                    const CatIcon = cat.icon;
                    const isExpanded = expandedCategory === cat.id;
                    return (
                      <div key={cat.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                        <button
                          onClick={() => setExpandedCategory(isExpanded ? null : cat.id)}
                          className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <CatIcon size={16} className={`${cat.color} shrink-0`} />
                            <span className={`font-medium text-[14px] ${cat.color} truncate`}>{cat.title}</span>
                          </div>
                          <ChevronDown size={14} className={`text-white/45 transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
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
                                  <p className="text-[11px] text-amber-200/60 leading-relaxed px-1 pb-1">{cat.hint}</p>
                                )}
                                {cat.presets.map(pid => {
                                  const preset = t.presets[pid];
                                  const isActive = activePreset === pid;
                                  return (
                                    <button
                                      key={pid}
                                      onClick={() => applyPreset(pid)}
                                      className={cn(
                                        'w-full text-left px-3 py-2.5 rounded-xl transition-all text-[13px] border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
                                        isActive
                                          ? 'bg-white/[0.08] border-white/12 text-white'
                                          : 'bg-transparent border-transparent text-white/60 hover:bg-white/[0.04] hover:text-white/80'
                                      )}
                                    >
                                      <div className="font-medium">{preset?.label ?? pid}</div>
                                      <div className="text-[11px] text-white/25 mt-0.5">{preset?.desc}</div>
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

              <Divider className="mx-5 my-2" />

              <div className="px-5 py-3">
                <SectionLabel>{t.patternLabel}</SectionLabel>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-3">
                  {patterns.map(p => {
                    const Icon = p.icon;
                    return (
                      <SelectionTile
                        key={p.id}
                        active={pattern === p.id}
                        accent="info"
                        onClick={() => setPattern(p.id as any)}
                        icon={<Icon size={16} strokeWidth={pattern === p.id ? 2 : 1.5} />}
                        label={t.patterns[p.id]}
                        size="sm"
                      />
                    );
                  })}
                </div>
              </div>

              <div className="px-5 py-3 border-t border-white/5">
                <SectionLabel>{t.shapeLabel}</SectionLabel>
                <div className="grid grid-cols-4 gap-2 mt-3">
                  {shapes.map(s => {
                    const Icon = s.icon;
                    return (
                      <SelectionTile
                        key={s.id}
                        active={targetShape === s.id}
                        accent="primary"
                        onClick={() => setTargetShape(s.id as any)}
                        icon={<Icon size={16} strokeWidth={targetShape === s.id ? 2 : 1.5} />}
                        label={t.shapes[s.id]}
                        size="sm"
                      />
                    );
                  })}
                </div>
              </div>

              <div className="px-5 py-3 border-t border-white/5">
                <SectionLabel>{t.colorLabel}</SectionLabel>
                <div className="flex gap-3 mt-3 flex-wrap">
                  {colors.map(c => (
                    <button
                      key={c.value}
                      onClick={() => setColor(c.value)}
                      className={cn(
                        'w-8 h-8 rounded-full shrink-0 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
                        color === c.value
                          ? 'scale-125'
                          : 'opacity-40 hover:opacity-80 hover:scale-110'
                      )}
                      style={{
                        backgroundColor: c.value,
                        boxShadow: color === c.value ? c.shadow : 'none',
                        // no accent-tinted focus ring here, Tailwind cannot do it inline; falls back to white/30
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="px-5 py-3 border-t border-white/5 flex flex-col gap-4">
                <Slider
                  label={t.speedLabel}
                  value={speed}
                  min={0.5}
                  max={3.0}
                  step={0.1}
                  unit={t.hzUnit}
                  accent="info"
                  onChange={(v) => setSpeed(v)}
                />
                <Slider
                  label={t.amplitudeLabel}
                  value={amplitude}
                  min={40}
                  max={100}
                  step={1}
                  unit="%"
                  accent="info"
                  description={t.amplitudeHint}
                  onChange={(v) => setAmplitude(Math.round(v))}
                />
                <Slider
                  label={t.seriesLabel}
                  value={cyclesPerSet}
                  min={10}
                  max={60}
                  step={2}
                  unit={t.cyclesUnit}
                  accent="info"
                  onChange={(v) => setCyclesPerSet(Math.round(v))}
                />
                <Slider
                  label={t.sizeLabel}
                  value={size}
                  min={20}
                  max={150}
                  step={1}
                  unit={t.pxUnit}
                  accent="info"
                  onChange={(v) => setSize(Math.round(v))}
                />
              </div>

              <div className="px-5 py-3 border-t border-white/5 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <VolumeX size={14} className={audioEnabled ? 'text-white/45' : 'text-cyan-400/80'} />
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-cyan-400/70">{t.mute}</span>
                      <p className="text-white/25 text-[12px] mt-0.5">{t.muteDesc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setAudioEnabled(!audioEnabled)}
                    className={cn(
                      'w-11 h-6 rounded-full relative flex items-center transition-colors duration-300 shrink-0 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
                      !audioEnabled ? 'bg-cyan-500/80 border-transparent' : 'bg-white/[0.06] border-white/[0.06]'
                    )}
                  >
                    <div className={cn('w-4 h-4 rounded-full bg-white shadow transition-transform duration-300', !audioEnabled ? 'translate-x-6' : 'translate-x-1')} />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-emerald-400/70">{t.reduceMotion}</span>
                    <p className="text-white/25 text-[12px] mt-0.5">{t.reduceMotionDesc}</p>
                  </div>
                  <button
                    onClick={() => setSafeMode(!safeMode)}
                    className={cn(
                      'w-11 h-6 rounded-full relative flex items-center transition-colors duration-300 shrink-0 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/40 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
                      safeMode ? 'bg-emerald-500/80 border-transparent' : 'bg-white/[0.06] border-white/[0.06]'
                    )}
                  >
                    <div className={cn('w-4 h-4 rounded-full bg-white shadow transition-transform duration-300', safeMode ? 'translate-x-6' : 'translate-x-1')} />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-rose-400/70">{t.saccades}</span>
                    <p className="text-white/25 text-[12px] mt-0.5">{t.saccadesDesc}{safeMode ? t.saccadesOffSafe : ''}</p>
                  </div>
                  <button
                    onClick={() => { if (!safeMode) setIsSaccadic(!isSaccadic); }}
                    className={cn(
                      'w-11 h-6 rounded-full relative flex items-center transition-colors duration-300 shrink-0 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
                      isSaccadic && !safeMode ? 'bg-rose-500/80 border-transparent' : 'bg-white/[0.06] border-white/[0.06]',
                      safeMode && 'opacity-40 pointer-events-none'
                    )}
                  >
                    <div className={cn('w-4 h-4 rounded-full bg-white shadow transition-transform duration-300', isSaccadic && !safeMode ? 'translate-x-6' : 'translate-x-1')} />
                  </button>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-violet-400/70">{t.cogLoad}</span>
                      <p className="text-white/25 text-[12px] mt-0.5">{t.cogLoadDesc}</p>
                    </div>
                    <button
                      onClick={() => setShowSymbols(!showSymbols)}
                      className={cn(
                        'w-11 h-6 rounded-full relative flex items-center transition-colors duration-300 shrink-0 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
                        showSymbols ? 'bg-violet-500/80 border-transparent' : 'bg-white/[0.06] border-white/[0.06]'
                      )}
                    >
                      <div className={cn('w-4 h-4 rounded-full bg-white shadow transition-transform duration-300', showSymbols ? 'translate-x-6' : 'translate-x-1')} />
                    </button>
                  </div>
                  <AnimatePresence>
                    {showSymbols && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex gap-1.5 overflow-hidden">
                        {symbolLangKeys.map((l) => (
                          <button
                            key={l}
                            onClick={() => setSymbolLanguage(l as any)}
                            className={cn(
                              'flex-1 py-1.5 rounded-lg text-[12px] font-medium transition-colors border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
                              symbolLanguage === l
                                ? 'bg-violet-500/15 text-violet-200 border-violet-500/20'
                                : 'bg-white/[0.03] text-white/45 border-transparent hover:bg-white/[0.04]'
                            )}
                          >
                            {t.langNames[l]}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="px-5 py-3 border-t border-white/5 flex flex-col gap-4">
                <div>
                  <SectionLabel>{t.stimSound}</SectionLabel>
                  <div className="grid grid-cols-3 gap-1.5 mt-2.5">
                    {audioKeys.map((a) => (
                      <button
                        key={a}
                        onClick={() => setAudioFormat(a as any)}
                        className={cn(
                          'min-h-[44px] py-2 px-1.5 rounded-xl text-[12px] font-medium leading-tight text-center transition-all border min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
                          audioFormat === a
                            ? 'bg-cyan-500/15 text-cyan-200 border-cyan-500/20 shadow-lg'
                            : 'bg-white/[0.02] text-white/45 border-transparent hover:bg-white/[0.04]'
                        )}
                      >
                        {t.audioFormats[a]}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <SectionLabel>{t.ambientLabel}</SectionLabel>
                  <div className="grid grid-cols-4 gap-2 mt-2.5">
                    {ambientButtons.map((b) => {
                      const Icon = b.icon;
                      return (
                        <SelectionTile
                          key={b.id}
                          active={ambientSound === b.id}
                          accent={b.accent}
                          onClick={() => setAmbientSound(b.id as any)}
                          icon={<Icon size={13} />}
                          label={t.ambientNames[b.id]}
                          size="sm"
                        />
                      );
                    })}
                  </div>
                  <p className="text-white/25 text-[11px] mt-2 leading-relaxed">{t.ambientNote}</p>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    { label: t.blsVolume,        val: audioVolume,   set: setAudioVolume },
                    { label: t.ambientVolumeLabel, val: ambientVolume, set: setAmbientVolume }
                  ].map((item, i) => (
                    <div key={i} className={!audioEnabled ? 'opacity-40 pointer-events-none' : ''}>
                      <div className="flex justify-between items-center gap-3 mb-2">
                        <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-cyan-400/70">{item.label}</span>
                        <ValueBadge>{Math.round(item.val * 100)}%</ValueBadge>
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
                  <SectionLabel>{t.bgLabel}</SectionLabel>
                  <div className="grid grid-cols-3 gap-1.5 mt-2.5">
                    {bgButtons.map((b) => {
                      const Icon = b.icon;
                      return (
                        <SelectionTile
                          key={b.id}
                          active={visualBackground === b.id}
                          accent={b.accent}
                          onClick={() => setVisualBackground(b.id as any)}
                          icon={<Icon size={14} />}
                          label={t.bgNames[b.id]}
                          size="sm"
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="px-5 py-3 border-t border-white/5 flex flex-col gap-4">
                <SectionLabel accent="primary">{t.channelsSection}</SectionLabel>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-violet-400/70">{t.hapticLabel}</span>
                    <p className="text-white/25 text-[12px] mt-0.5">
                      {hapticOk ? t.hapticDesc : t.hapticUnsupported}
                    </p>
                  </div>
                  <button
                    onClick={() => { if (hapticOk) setHapticEnabled(!hapticEnabled); }}
                    className={cn(
                      'w-11 h-6 rounded-full relative flex items-center transition-colors duration-300 shrink-0 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
                      hapticEnabled && hapticOk ? 'bg-violet-500/80 border-transparent' : 'bg-white/[0.06] border-white/[0.06]',
                      !hapticOk && 'opacity-40 pointer-events-none'
                    )}
                  >
                    <div className={cn('w-4 h-4 rounded-full bg-white shadow transition-transform duration-300', hapticEnabled && hapticOk ? 'translate-x-6' : 'translate-x-1')} />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-amber-400/70">{t.visualStim}</span>
                    <p className="text-white/25 text-[12px] mt-0.5">{t.visualStimDesc}</p>
                  </div>
                  <button
                    onClick={() => setVisualEnabled(!visualEnabled)}
                    className={cn(
                      'w-11 h-6 rounded-full relative flex items-center transition-colors duration-300 shrink-0 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
                      visualEnabled ? 'bg-amber-500/80 border-transparent' : 'bg-white/[0.06] border-white/[0.06]'
                    )}
                  >
                    <div className={cn('w-4 h-4 rounded-full bg-white shadow transition-transform duration-300', visualEnabled ? 'translate-x-6' : 'translate-x-1')} />
                  </button>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-cyan-400/70">{t.vestibular}</span>
                    <p className="text-white/25 text-[12px] mt-0.5">{t.vestibularDesc}</p>
                  </div>
                  <button
                    onClick={() => setVestibularSafe(!vestibularSafe)}
                    className={cn(
                      'w-11 h-6 rounded-full relative flex items-center transition-colors duration-300 shrink-0 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
                      vestibularSafe ? 'bg-cyan-500/80 border-transparent' : 'bg-white/[0.06] border-white/[0.06]'
                    )}
                  >
                    <div className={cn('w-4 h-4 rounded-full bg-white shadow transition-transform duration-300', vestibularSafe ? 'translate-x-6' : 'translate-x-1')} />
                  </button>
                </div>
              </div>

              <div className="px-5 py-3 border-t border-white/5">
                <div className="flex items-center justify-between bg-white/[0.02] rounded-xl px-4 py-3 border border-white/[0.06]">
                  <SectionLabel>{t.sessionsToday}</SectionLabel>
                  <span className="text-cyan-400 text-xl font-light tabular-nums">{setsCompleted}</span>
                </div>
              </div>

              <div className="px-5 py-5 shrink-0 flex flex-col gap-3">
                <button
                  onClick={handleShare}
                  className={cn(
                    'w-full py-3 rounded-2xl font-semibold text-[13px] tracking-wide transition-all border flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
                    justCopied
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 focus-visible:ring-emerald-500/40'
                      : 'bg-white/[0.04] border-white/[0.06] text-white/60 hover:bg-white/[0.07] hover:text-white focus-visible:ring-white/20'
                  )}
                >
                  {justCopied
                    ? (<><Check size={14} /> {t.linkCopied}</>)
                    : (<><Share2 size={14} /> {t.sharePreset}</>)}
                </button>

                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className={cn(
                    'w-full py-3.5 bg-white hover:bg-white/90 text-zinc-950 rounded-2xl font-semibold text-[14px] tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
                    SHADOW.ctaWhite,
                    SHADOW.ctaWhiteHover
                  )}
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
