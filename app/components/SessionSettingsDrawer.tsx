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

type Tab = 'visual' | 'sound' | 'channels';

const Label = ({ children, color = 'text-white/45' }: { children: React.ReactNode; color?: string }) => (
  <span className={`text-[11px] uppercase tracking-[0.14em] font-semibold ${color}`}>{children}</span>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="text-white/80 text-[13px] font-medium tabular-nums bg-white/[0.05] px-2.5 py-1 rounded-lg">
    {children}
  </span>
);

const Toggle = ({ enabled, onChange, accent }: { enabled: boolean; onChange: () => void; accent: string }) => (
  <button
    onClick={onChange}
    className={`w-11 h-6 rounded-full relative flex items-center transition-colors duration-300 shrink-0 ${enabled ? accent : 'bg-white/[0.08]'}`}
  >
    <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
  </button>
);

const SliderRow = ({ label, value, min, max, step, val, onChange, hint, color = 'text-white/50' }: {
  label: string; value: string; min: number; max: number; step: number;
  val: number; onChange: (v: number) => void; hint?: string; color?: string;
}) => (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between items-center gap-3">
      <Label color={color}>{label}</Label>
      <Badge>{value}</Badge>
    </div>
    <input type="range" min={min} max={max} step={step} value={val} onChange={(e) => onChange(parseFloat(e.target.value))} className="w-full" />
    {hint && <p className="text-white/25 text-[11px] leading-relaxed -mt-0.5">{hint}</p>}
  </div>
);

const Tile = ({ active, accent, onClick, icon: Icon, children }: {
  active: boolean; accent: string; onClick: () => void; icon: typeof Gauge; children: React.ReactNode;
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

const SectionLabel = ({ children, color = 'text-white/40', icon: Icon }: {
  children: React.ReactNode; color?: string; icon?: typeof Gauge;
}) => (
  <div className="flex items-center gap-2">
    {Icon && <Icon size={13} className={`shrink-0 ${color}`} />}
    <Label color={color}>{children}</Label>
  </div>
);

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

export function SessionSettingsDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useT();
  const lang = useStore((s) => s.lang);

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
  const audioEnabled = useStore((s) => s.audioEnabled);
  const setAudioEnabled = useStore((s) => s.setAudioEnabled);
  const hapticEnabled = useStore((s) => s.hapticEnabled);
  const setHapticEnabled = useStore((s) => s.setHapticEnabled);
  const visualEnabled = useStore((s) => s.visualEnabled);
  const setVisualEnabled = useStore((s) => s.setVisualEnabled);
  const vestibularSafe = useStore((s) => s.vestibularSafe);
  const setVestibularSafe = useStore((s) => s.setVestibularSafe);

  const [tab, setTab] = useState<Tab>('visual');
  const [hapticOk, setHapticOk] = useState(false);
  useEffect(() => { setHapticOk(isHapticSupported()); }, []);

  const tabs: { id: Tab; label: string; icon: typeof Gauge }[] = [
    { id: 'visual', label: lang === 'ru' ? 'Визуал' : 'Visual', icon: Gauge },
    { id: 'sound', label: lang === 'ru' ? 'Звук' : 'Sound', icon: Volume2 },
    { id: 'channels', label: lang === 'ru' ? 'Каналы' : 'Channels', icon: Radio },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/40"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.5 }}
            className="fixed right-0 top-0 h-full w-[420px] max-w-full z-[61] bg-[#0d0d10] border-l border-white/[0.06] shadow-[-20px_0_60px_-10px_rgba(0,0,0,0.8)] flex flex-col"
          >
            <div className="shrink-0 px-5 pt-5 pb-3 border-b border-white/5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium tracking-tight text-white">{t.settingsTitle}</h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-xl hover:bg-white/[0.08] text-white/40 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-1.5">
                {tabs.map((tb) => {
                  const active = tab === tb.id;
                  return (
                    <button
                      key={tb.id}
                      onClick={() => setTab(tb.id)}
                      className={`min-h-[42px] py-2 px-2 rounded-xl text-[13px] font-medium flex items-center justify-center gap-1.5 transition-all ${
                        active ? 'bg-indigo-500/15 text-indigo-100' : 'bg-white/[0.03] text-white/45 hover:bg-white/[0.07]'
                      }`}
                    >
                      <tb.icon size={14} className="shrink-0" />
                      <span className="truncate">{tb.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
              {tab === 'visual' && (
                <div className="px-5 py-6 flex flex-col divide-y divide-white/[0.06]">
                  <div className="flex flex-col gap-3 pb-6">
                    <SectionLabel color="text-cyan-300/80" icon={Gauge}>{t.patternLabel}</SectionLabel>
                    <div className="grid grid-cols-3 gap-1.5">
                      {PATTERNS.map((p) => (
                        <Tile key={p.id} active={pattern === p.id} accent="bg-cyan-500/15 text-cyan-100" onClick={() => setPattern(p.id)} icon={p.icon}>
                          {t.patterns[p.id]}
                        </Tile>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 py-6">
                    <SectionLabel color="text-indigo-300/80" icon={Circle}>{t.shapeLabel}</SectionLabel>
                    <div className="grid grid-cols-4 gap-1.5">
                      {SHAPES.map((s) => (
                        <Tile key={s.id} active={targetShape === s.id} accent="bg-indigo-500/15 text-indigo-100" onClick={() => setTargetShape(s.id)} icon={s.icon}>
                          {t.shapes[s.id]}
                        </Tile>
                      ))}
                    </div>
                  </div>

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

                  <div className="flex flex-col gap-5 py-6">
                    <SectionLabel color="text-cyan-300/80" icon={Gauge}>{lang === 'ru' ? 'Тайминг' : 'Timing'}</SectionLabel>
                    <SliderRow label={t.speedLabel} value={`${speed.toFixed(1)} ${t.hzUnit}`} min={0.5} max={3} step={0.1} val={speed} onChange={setSpeed} />
                    <SliderRow label={t.amplitudeLabel} value={`${amplitude}%`} min={40} max={100} step={1} val={amplitude} onChange={(v) => setAmplitude(Math.round(v))} hint={t.amplitudeHint} />
                    <SliderRow label={t.seriesLabel} value={`${cyclesPerSet} ${t.cyclesUnit}`} min={10} max={60} step={2} val={cyclesPerSet} onChange={(v) => setCyclesPerSet(Math.round(v))} />
                    <SliderRow label={t.sizeLabel} value={`${size} ${t.pxUnit}`} min={20} max={150} step={1} val={size} onChange={(v) => setSize(Math.round(v))} />
                  </div>

                  <div className="flex flex-col gap-2.5 pt-6">
                    <SectionLabel color="text-indigo-300/80" icon={Sparkles}>{t.bgLabel}</SectionLabel>
                    <div className="grid grid-cols-3 gap-1.5">
                      {BACKGROUNDS.map((b) => (
                        <Tile key={b.id} active={visualBackground === b.id} accent={b.accent} onClick={() => setVisualBackground(b.id)} icon={b.icon}>
                          {t.bgNames[b.id]}
                        </Tile>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {tab === 'sound' && (
                <div className="px-5 py-6 flex flex-col divide-y divide-white/[0.06]">
                  <div className="flex flex-col gap-2.5 pb-6">
                    <SectionLabel color="text-sky-300/80" icon={Volume2}>{t.stimSound}</SectionLabel>
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

                  <div className="flex flex-col gap-2.5 py-6">
                    <SectionLabel color="text-sky-300/80" icon={Music}>{t.ambientLabel}</SectionLabel>
                    <div className="grid grid-cols-4 gap-1.5">
                      {AMBIENTS.map((b) => (
                        <Tile key={b.id} active={ambientSound === b.id} accent={b.accent} onClick={() => setAmbientSound(b.id)} icon={b.icon}>
                          {t.ambientNames[b.id]}
                        </Tile>
                      ))}
                    </div>
                    <p className="text-white/25 text-[11px] leading-relaxed">{t.ambientNote}</p>
                  </div>

                  <div className={`flex flex-col gap-5 py-6 ${!audioEnabled ? 'opacity-40 pointer-events-none' : ''}`}>
                    <SliderRow label={t.blsVolume} value={`${Math.round(audioVolume * 100)}%`} min={0} max={1} step={0.05} val={audioVolume} onChange={setAudioVolume} color="text-sky-300/70" />
                    <SliderRow label={t.ambientVolumeLabel} value={`${Math.round(ambientVolume * 100)}%`} min={0} max={1} step={0.05} val={ambientVolume} onChange={setAmbientVolume} color="text-sky-300/70" />
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-6">
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
              )}

              {tab === 'channels' && (
                <div className="px-5 py-6 flex flex-col gap-4">
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
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
