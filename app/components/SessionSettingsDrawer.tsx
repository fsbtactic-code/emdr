'use client';

import {
  X, Gauge, Volume2, Radio, VolumeX,
  ArrowLeftRight, ArrowUpDown, MoveDiagonal, MoveDiagonal2,
  Infinity as InfinityIcon, GripHorizontal, Activity, Columns, TrendingUp,
  Circle, Square as SquareIcon, CircleDashed, Wand2,
  Wind, CloudRain, Waves, Music, Headphones, Sparkles, Moon, Orbit,
} from 'lucide-react';
import {
  useStore, PatternType, TargetShape, AudioFormat, AmbientSound, VisualBackground,
} from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useT } from '../i18n/useT';
import { isHapticSupported } from '../hooks/useHapticBLS';
import { Slider } from './ui/Slider';
import { Tabs } from './ui/Tabs';
import { SectionLabel } from './ui/SectionLabel';
import { SelectionTile } from './ui/SelectionTile';
import { Divider } from './ui/Divider';
import { SHADOW, COLORS } from './ui/tokens';
import { cn } from './ui/cn';

type Tab = 'visual' | 'sound' | 'channels';

const PATTERNS: { id: PatternType; icon: typeof Gauge }[] = [
  { id: 'horizontal', icon: ArrowLeftRight },
  { id: 'vertical',   icon: ArrowUpDown },
  { id: 'diagonal-1', icon: MoveDiagonal },
  { id: 'diagonal-2', icon: MoveDiagonal2 },
  { id: 'lemniscate', icon: InfinityIcon },
  { id: 'dots',       icon: GripHorizontal },
  { id: 'pulse',      icon: Activity },
  { id: 'bars',       icon: Columns },
  { id: 'zigzag',     icon: TrendingUp },
];

const SHAPES: { id: TargetShape; icon: typeof Gauge }[] = [
  { id: 'circle',    icon: Circle },
  { id: 'square',    icon: SquareIcon },
  { id: 'ring',      icon: CircleDashed },
  { id: 'butterfly', icon: Wand2 },
];

// Glow values derived from SHADOW.glow tokens
const COLOR_SWATCHES = [
  { value: '#06b6d4', shadow: SHADOW.glow.cyan },
  { value: '#10b981', shadow: SHADOW.glow.emerald },
  { value: '#f59e0b', shadow: SHADOW.glow.amber },
  { value: '#f43f5e', shadow: SHADOW.glow.rose },
  { value: '#ffffff', shadow: SHADOW.glow.white },
  { value: '#6366f1', shadow: SHADOW.glow.indigo },
];

const AUDIO_FORMATS: AudioFormat[] = ['continuous', 'click', 'metronome', 'white_noise', 'binaural_beats'];

const AMBIENTS: { id: AmbientSound; icon: typeof Gauge; accent: 'white' | 'info' | 'success' | 'warn' | 'primary' | 'calm' | 'danger' }[] = [
  { id: 'none',           icon: VolumeX,   accent: 'white'   },
  { id: 'rain',           icon: CloudRain, accent: 'info'    },
  { id: 'ocean',          icon: Waves,     accent: 'info'    },
  { id: 'breath',         icon: Wind,      accent: 'success' },
  { id: 'hz528',          icon: Music,     accent: 'warn'    },
  { id: 'wind_harmonics', icon: Headphones,accent: 'primary' },
  { id: 'breathform',     icon: Wind,      accent: 'calm'    },
  { id: 'pink',           icon: Activity,  accent: 'danger'  },
  { id: 'brown',          icon: Waves,     accent: 'warn'    },
  { id: 'drone',          icon: Radio,     accent: 'info'    },
];

const BACKGROUNDS: { id: VisualBackground; icon: typeof Gauge; accent: 'white' | 'success' | 'primary' }[] = [
  { id: 'black',  icon: Moon,     accent: 'white'   },
  { id: 'aurora', icon: Orbit,    accent: 'success' },
  { id: 'stars',  icon: Sparkles, accent: 'primary' },
];

export function SessionSettingsDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useT();
  const lang = useStore((s) => s.lang);

  const speed          = useStore((s) => s.speed);
  const setSpeed       = useStore((s) => s.setSpeed);
  const amplitude      = useStore((s) => s.amplitude);
  const setAmplitude   = useStore((s) => s.setAmplitude);
  const pattern        = useStore((s) => s.pattern);
  const setPattern     = useStore((s) => s.setPattern);
  const size           = useStore((s) => s.size);
  const setSize        = useStore((s) => s.setSize);
  const color          = useStore((s) => s.color);
  const setColor       = useStore((s) => s.setColor);
  const targetShape    = useStore((s) => s.targetShape);
  const setTargetShape = useStore((s) => s.setTargetShape);
  const cyclesPerSet   = useStore((s) => s.cyclesPerSet);
  const setCyclesPerSet = useStore((s) => s.setCyclesPerSet);
  const audioFormat    = useStore((s) => s.audioFormat);
  const setAudioFormat = useStore((s) => s.setAudioFormat);
  const ambientSound   = useStore((s) => s.ambientSound);
  const setAmbientSound = useStore((s) => s.setAmbientSound);
  const visualBackground    = useStore((s) => s.visualBackground);
  const setVisualBackground = useStore((s) => s.setVisualBackground);
  const audioVolume    = useStore((s) => s.audioVolume);
  const setAudioVolume = useStore((s) => s.setAudioVolume);
  const ambientVolume  = useStore((s) => s.ambientVolume);
  const setAmbientVolume = useStore((s) => s.setAmbientVolume);
  const audioEnabled   = useStore((s) => s.audioEnabled);
  const setAudioEnabled = useStore((s) => s.setAudioEnabled);
  const hapticEnabled  = useStore((s) => s.hapticEnabled);
  const setHapticEnabled = useStore((s) => s.setHapticEnabled);
  const visualEnabled  = useStore((s) => s.visualEnabled);
  const setVisualEnabled = useStore((s) => s.setVisualEnabled);
  const vestibularSafe = useStore((s) => s.vestibularSafe);
  const setVestibularSafe = useStore((s) => s.setVestibularSafe);

  const [tab, setTab] = useState<Tab>('visual');
  const [hapticOk, setHapticOk] = useState(false);
  useEffect(() => { setHapticOk(isHapticSupported()); }, []);

  const tabItems = [
    { id: 'visual',   label: lang === 'ru' ? 'Визуал'  : 'Visual',   icon: <Gauge   size={14} className="shrink-0" /> },
    { id: 'sound',    label: lang === 'ru' ? 'Звук'    : 'Sound',    icon: <Volume2 size={14} className="shrink-0" /> },
    { id: 'channels', label: lang === 'ru' ? 'Каналы'  : 'Channels', icon: <Radio   size={14} className="shrink-0" /> },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/85"
            style={{ zIndex: 60 }}
          />
          {/* drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
            className="fixed right-0 top-0 h-full w-[420px] max-w-full bg-[#0d0d10] border-l border-white/[0.06] shadow-[-20px_0_60px_-10px_rgba(0,0,0,0.8)] flex flex-col"
            style={{ zIndex: 61 }}
          >
            {/* header */}
            <div className="shrink-0 px-5 pt-5 pb-3 border-b border-white/5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium tracking-tight text-white">{t.settingsTitle}</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-white/[0.08] text-white/45 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950"
                >
                  <X size={18} />
                </button>
              </div>
              {/* tab switcher using DS Tabs fill variant */}
              <div className="mt-4">
                <Tabs
                  tabs={tabItems}
                  activeTab={tab}
                  onTabChange={(id) => setTab(id as Tab)}
                  variant="fill"
                  accent="primary"
                />
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
              {/* ---- VISUAL TAB ---- */}
              {tab === 'visual' && (
                <div className="px-5 py-6 flex flex-col divide-y divide-white/[0.06]">
                  {/* patterns */}
                  <div className="flex flex-col gap-3 pb-6">
                    <SectionLabel accent="info" icon={Gauge}>{t.patternLabel}</SectionLabel>
                    <div className="grid grid-cols-3 gap-1.5">
                      {PATTERNS.map((p) => (
                        <SelectionTile
                          key={p.id}
                          active={pattern === p.id}
                          accent="info"
                          onClick={() => setPattern(p.id)}
                          icon={<p.icon size={15} strokeWidth={pattern === p.id ? 2 : 1.5} />}
                          label={t.patterns[p.id]}
                          size="sm"
                        />
                      ))}
                    </div>
                  </div>

                  {/* shapes */}
                  <div className="flex flex-col gap-3 py-6">
                    <SectionLabel accent="primary" icon={Circle}>{t.shapeLabel}</SectionLabel>
                    <div className="grid grid-cols-4 gap-1.5">
                      {SHAPES.map((s) => (
                        <SelectionTile
                          key={s.id}
                          active={targetShape === s.id}
                          accent="primary"
                          onClick={() => setTargetShape(s.id)}
                          icon={<s.icon size={15} strokeWidth={targetShape === s.id ? 2 : 1.5} />}
                          label={t.shapes[s.id]}
                          size="sm"
                        />
                      ))}
                    </div>
                  </div>

                  {/* color swatches */}
                  <div className="flex flex-col gap-3 py-6">
                    <SectionLabel>{t.colorLabel}</SectionLabel>
                    <div className="flex gap-3 flex-wrap">
                      {COLOR_SWATCHES.map((c) => {
                        const active = color === c.value;
                        return (
                          <button
                            key={c.value}
                            onClick={() => setColor(c.value)}
                            aria-label={c.value}
                            className={cn(
                              'w-8 h-8 rounded-full shrink-0 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 focus-visible:ring-white/30',
                              active ? 'scale-125' : 'opacity-40 hover:opacity-80 hover:scale-110'
                            )}
                            style={{ backgroundColor: c.value, boxShadow: active ? c.shadow : 'none' }}
                          />
                        );
                      })}
                    </div>
                  </div>

                  {/* timing sliders */}
                  <div className="flex flex-col gap-5 py-6">
                    <SectionLabel accent="info" icon={Gauge}>{lang === 'ru' ? 'Тайминг' : 'Timing'}</SectionLabel>
                    <Slider label={t.speedLabel}    value={speed}       min={0.5} max={3}   step={0.1} unit={t.hzUnit}    accent="info" onChange={setSpeed} />
                    <Slider label={t.amplitudeLabel} value={amplitude}  min={40}  max={100} step={1}   unit="%"          accent="info" description={t.amplitudeHint} onChange={(v) => setAmplitude(Math.round(v))} />
                    <Slider label={t.seriesLabel}   value={cyclesPerSet} min={10} max={60}  step={2}   unit={t.cyclesUnit} accent="info" onChange={(v) => setCyclesPerSet(Math.round(v))} />
                    <Slider label={t.sizeLabel}     value={size}         min={20} max={150} step={1}   unit={t.pxUnit}   accent="info" onChange={(v) => setSize(Math.round(v))} />
                  </div>

                  {/* backgrounds */}
                  <div className="flex flex-col gap-2.5 pt-6">
                    <SectionLabel accent="primary" icon={Sparkles}>{t.bgLabel}</SectionLabel>
                    <div className="grid grid-cols-3 gap-1.5">
                      {BACKGROUNDS.map((b) => (
                        <SelectionTile
                          key={b.id}
                          active={visualBackground === b.id}
                          accent={b.accent}
                          onClick={() => setVisualBackground(b.id)}
                          icon={<b.icon size={14} />}
                          label={t.bgNames[b.id]}
                          size="sm"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ---- SOUND TAB ---- */}
              {tab === 'sound' && (
                <div className="px-5 py-6 flex flex-col divide-y divide-white/[0.06]">
                  {/* stim sound formats */}
                  <div className="flex flex-col gap-2.5 pb-6">
                    <SectionLabel accent="info" icon={Volume2}>{t.stimSound}</SectionLabel>
                    <div className="grid grid-cols-3 gap-1.5">
                      {AUDIO_FORMATS.map((a) => {
                        const active = audioFormat === a;
                        return (
                          <button
                            key={a}
                            onClick={() => setAudioFormat(a)}
                            className={cn(
                              'min-h-[44px] py-2 px-1.5 rounded-xl text-[12px] font-medium leading-tight text-center transition-all min-w-0 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
                              active
                                ? 'bg-cyan-500/15 text-cyan-200 border-cyan-500/20 shadow-lg'
                                : 'bg-white/[0.03] text-white/45 border-transparent hover:bg-white/[0.04]'
                            )}
                          >
                            {t.audioFormats[a]}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ambient sounds */}
                  <div className="flex flex-col gap-2.5 py-6">
                    <SectionLabel accent="info" icon={Music}>{t.ambientLabel}</SectionLabel>
                    <div className="grid grid-cols-4 gap-1.5">
                      {AMBIENTS.map((b) => (
                        <SelectionTile
                          key={b.id}
                          active={ambientSound === b.id}
                          accent={b.accent}
                          onClick={() => setAmbientSound(b.id)}
                          icon={<b.icon size={13} />}
                          label={t.ambientNames[b.id]}
                          size="sm"
                        />
                      ))}
                    </div>
                    <p className="text-white/25 text-[11px] leading-relaxed">{t.ambientNote}</p>
                  </div>

                  {/* volume sliders */}
                  <div className={cn('flex flex-col gap-5 py-6', !audioEnabled && 'opacity-40 pointer-events-none')}>
                    <Slider
                      label={t.blsVolume}
                      value={Math.round(audioVolume * 100)}
                      min={0} max={100} step={5}
                      unit="%"
                      accent="info"
                      onChange={(v) => setAudioVolume(v / 100)}
                      disabled={!audioEnabled}
                    />
                    <Slider
                      label={t.ambientVolumeLabel}
                      value={Math.round(ambientVolume * 100)}
                      min={0} max={100} step={5}
                      unit="%"
                      accent="info"
                      onChange={(v) => setAmbientVolume(v / 100)}
                      disabled={!audioEnabled}
                    />
                  </div>

                  {/* mute toggle */}
                  <div className="flex items-center justify-between gap-3 pt-6">
                    <div className="flex items-start gap-2.5 min-w-0">
                      <VolumeX size={15} className={cn('shrink-0 mt-0.5', !audioEnabled ? 'text-cyan-400/80' : 'text-white/45')} />
                      <div className="min-w-0">
                        <span className={cn('text-[11px] uppercase tracking-[0.14em] font-semibold', !audioEnabled ? 'text-cyan-400/70' : 'text-white/45')}>{t.tpLocalMute}</span>
                        <p className="text-white/25 text-[12px] mt-0.5 leading-relaxed">{t.tpLocalMuteHint}</p>
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
                </div>
              )}

              {/* ---- CHANNELS TAB ---- */}
              {tab === 'channels' && (
                <div className="px-5 py-6 flex flex-col gap-4">
                  <SectionLabel accent="primary" icon={Radio}>{t.channelsSection}</SectionLabel>

                  {/* haptic */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-violet-400/70">{t.hapticLabel}</span>
                      <p className="text-white/25 text-[12px] mt-0.5 leading-relaxed">{hapticOk ? t.hapticDesc : t.hapticUnsupported}</p>
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

                  {/* visual stim */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-amber-400/70">{t.visualStim}</span>
                      <p className="text-white/25 text-[12px] mt-0.5 leading-relaxed">{t.visualStimDesc}</p>
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

                  {/* vestibular */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-[11px] uppercase tracking-[0.14em] font-semibold text-cyan-400/70">{t.vestibular}</span>
                      <p className="text-white/25 text-[12px] mt-0.5 leading-relaxed">{t.vestibularDesc}</p>
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
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
