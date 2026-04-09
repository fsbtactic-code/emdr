'use client';

import { useStore } from '@/store/useStore';
import { Settings2, Zap, ShieldAlert, Sparkles, Brain, Moon, ShieldBan, Play, Pause, Waves, CloudRain, Wind, ArrowUpDown, ArrowLeftRight, MoveDiagonal, MoveDiagonal2, Infinity as InfinityIcon, GripHorizontal, Activity, Columns, TrendingUp, Circle, Square, CircleDashed, Wand2, Orbit, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

// ── Micro-components ────────────────────────────────────────────────────────

const SectionLabel = ({ children, color = 'text-white/40' }: { children: React.ReactNode; color?: string }) => (
  <span className={`text-[10px] uppercase tracking-[0.18em] font-semibold ${color}`}>{children}</span>
);

const ValueBadge = ({ children }: { children: React.ReactNode }) => (
  <span className="text-white text-xs font-semibold tabular-nums bg-white/6 px-2.5 py-1 rounded-lg border border-white/8">
    {children}
  </span>
);

// ── Main Component ───────────────────────────────────────────────────────────

export const SettingsPanel = () => {
  const {
    speed, setSpeed,
    size, setSize,
    color, setColor,
    pattern, setPattern,
    audioFormat, setAudioFormat,
    ambientSound, setAmbientSound,
    isDesync, setIsDesync,
    randomness, setRandomness,
    cyclesPerSet, setCyclesPerSet,
    setsCompleted, isSettingsOpen, setIsSettingsOpen,
    isPlaying,
    isSaccadic, setIsSaccadic,
    showSymbols, setShowSymbols,
    symbolLanguage, setSymbolLanguage,
    targetShape, setTargetShape,
    visualBackground, setVisualBackground,
    activePreset, applyPreset
  } = useStore();

  const presetsScrollRef = useRef<HTMLDivElement>(null);

  const scrollPresets = (direction: 'left' | 'right') => {
    if (presetsScrollRef.current) {
      presetsScrollRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  const colors = [
    { name: 'Cyan',    value: '#06b6d4', shadow: 'var(--drop-shadow-glow-cyan)' },
    { name: 'Emerald', value: '#10b981', shadow: 'var(--drop-shadow-glow-emerald)' },
    { name: 'Amber',   value: '#f59e0b', shadow: 'var(--drop-shadow-glow-amber)' },
    { name: 'Rose',    value: '#f43f5e', shadow: 'var(--drop-shadow-glow-rose)' },
    { name: 'White',   value: '#ffffff', shadow: 'var(--drop-shadow-glow-white)' },
    { name: 'Indigo',  value: '#6366f1', shadow: '0 0 20px rgba(99,102,241,0.4)' },
  ];

  const patterns = [
    { id: 'horizontal',  label: 'Горизонталь', icon: ArrowLeftRight },
    { id: 'vertical',    label: 'Вертикаль',   icon: ArrowUpDown },
    { id: 'diagonal-1',  label: 'Диагональ ↗', icon: MoveDiagonal },
    { id: 'diagonal-2',  label: 'Диагональ ↘', icon: MoveDiagonal2 },
    { id: 'lemniscate',  label: 'Бесконечность',icon: InfinityIcon },
    { id: 'dots',        label: 'Точки',        icon: GripHorizontal },
    { id: 'pulse',       label: 'Пульс',        icon: Activity },
    { id: 'bars',        label: 'Столбы',       icon: Columns },
    { id: 'zigzag',      label: 'Зигзаг',       icon: TrendingUp },
  ];

  const shapes = [
    { id: 'circle',    label: 'Круг',     icon: Circle },
    { id: 'square',    label: 'Квадрат',  icon: Square },
    { id: 'ring',      label: 'Кольцо',   icon: CircleDashed },
    { id: 'butterfly', label: 'Бабочка',  icon: Wand2 },
  ];

  const audioFormatNames: Record<string, string> = {
    'continuous':     'Волна',
    'click':          'Щелчки',
    'metronome':      'Метр.',
    'white_noise':    'Шум',
    'binaural_beats': 'Бинаурал',
  };

  const langNames: Record<string, string> = {
    'ru': 'Рус', 'en': 'Eng', 'numbers': '123',
  };

  const presetGroups = [
    {
      category: 'Острая фаза',
      items: [
        { id: 'anxiety',         label: 'Заземление',   icon: ShieldAlert, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', glow: 'rgba(16,185,129,0.15)' },
        { id: 'panic',           label: 'Паника',        icon: ShieldBan,   color: 'text-blue-400',   bg: 'bg-blue-500/10',    border: 'border-blue-500/25',    glow: 'rgba(59,130,246,0.15)' },
        { id: 'trauma_saccadic', label: 'ПТСР · Саккады',icon: Zap,         color: 'text-rose-400',   bg: 'bg-rose-500/10',    border: 'border-rose-500/25',    glow: 'rgba(244,63,94,0.15)'  },
        { id: 'trauma_smooth',   label: 'ПТСР · Плавно', icon: Zap,         color: 'text-rose-300',   bg: 'bg-rose-600/10',    border: 'border-rose-600/25',    glow: 'rgba(251,113,133,0.15)'},
      ],
    },
    {
      category: 'Ресурс и Фокус',
      items: [
        { id: 'focus',    label: 'Фокус',       icon: Brain,    color: 'text-cyan-400',   bg: 'bg-cyan-500/10',   border: 'border-cyan-500/25',   glow: 'rgba(6,182,212,0.15)'  },
        { id: 'resource', label: 'Ресурс',      icon: Sparkles, color: 'text-amber-400',  bg: 'bg-amber-500/10',  border: 'border-amber-500/25',  glow: 'rgba(245,158,11,0.15)' },
        { id: 'sleep',    label: 'Сон',         icon: Moon,     color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/25', glow: 'rgba(99,102,241,0.15)' },
      ],
    },
  ];

  // ── Toggle ─────────────────────────────────────────────────────────────────
  const Toggle = ({ enabled, onChange, accent }: { enabled: boolean; onChange: () => void; accent: string }) => (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full relative flex items-center transition-colors duration-300 shrink-0 border ${enabled ? `${accent} border-transparent` : 'bg-white/6 border-white/10'}`}
    >
      <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform duration-300 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );

  return (
    <>
      {/* Gear trigger */}
      <button
        onClick={() => setIsSettingsOpen(true)}
        className={`fixed top-4 left-4 md:top-6 md:left-6 z-40 p-3 rounded-2xl bg-white/6 hover:bg-white/10 transition-all backdrop-blur-xl border border-white/10 ${isSettingsOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Settings2 size={22} className="text-white/70" />
      </button>

      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.7 }}
            className={`fixed bottom-0 left-0 w-full ${isPlaying ? 'h-[50vh]' : 'h-[88vh] md:h-[82vh]'} landscape:h-screen landscape:w-[360px] landscape:left-auto landscape:right-0 landscape:top-0 landscape:rounded-none landscape:border-l landscape:border-t-0 rounded-t-[28px] md:rounded-t-[36px] bg-[#0a0a0c]/80 backdrop-blur-[40px] border-t border-white/8 shadow-[0_-40px_80px_-10px_rgba(0,0,0,0.9)] z-50 flex flex-col transition-[height] duration-500`}
          >

            {/* Drag Handle */}
            <div className="w-full flex justify-center pt-3 pb-1 shrink-0 landscape:hidden">
              <div onClick={() => setIsSettingsOpen(false)} className="w-10 h-[3px] bg-white/15 hover:bg-white/30 cursor-pointer rounded-full transition-colors" />
            </div>

            {/* Scrollable body */}
            <div className="flex-1 no-scrollbar overflow-y-auto w-full max-w-7xl mx-auto flex flex-col landscape:pb-8">

              {/* ── Header ── */}
              <div className="flex items-center justify-between px-5 md:px-8 landscape:px-5 pt-4 pb-5 md:pt-5 md:pb-6 shrink-0 border-b border-white/5">
                <div>
                  <h2 className="text-xl md:text-2xl font-light tracking-[-0.01em] text-white">Настройки сессии</h2>
                  <p className="text-white/30 text-xs mt-0.5 tracking-wide">EMDR-среда</p>
                </div>
                <button
                  onClick={() => useStore.getState().togglePlaying()}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-medium text-sm transition-all border ${
                    isPlaying
                      ? 'bg-white/8 border-white/12 text-white hover:bg-white/12'
                      : 'bg-cyan-500/15 border-cyan-500/25 text-cyan-300 hover:bg-cyan-500/25'
                  }`}
                >
                  {isPlaying ? <><Pause size={15} className="fill-current" /> Пауза</> : <><Play size={15} className="fill-current translate-x-px" /> Тест</>}
                </button>
              </div>

              {/* ── Presets ── */}
              <div className="flex flex-col gap-3 pt-5 pb-1 shrink-0">
                <div className="flex justify-between items-center px-5 md:px-8 landscape:px-5">
                  <SectionLabel>Программы</SectionLabel>
                  <div className="hidden md:flex gap-1.5">
                    <button onClick={() => scrollPresets('left')} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors"><ChevronLeft size={14} /></button>
                    <button onClick={() => scrollPresets('right')} className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-colors"><ChevronRight size={14} /></button>
                  </div>
                </div>

                <div
                  ref={presetsScrollRef}
                  className="flex gap-2.5 overflow-x-auto px-5 md:px-8 landscape:px-5 pb-4 no-scrollbar"
                >
                  {presetGroups.map((group, gi) => (
                    <div key={gi} className="flex gap-2.5 shrink-0">
                      {group.items.map(p => {
                        const Icon = p.icon;
                        const isActive = activePreset === p.id;
                        return (
                          <button
                            key={p.id}
                            onClick={() => applyPreset(p.id)}
                            style={isActive ? { boxShadow: `0 0 20px ${p.glow}` } : {}}
                            className={`shrink-0 w-[148px] flex flex-col gap-2.5 p-3.5 rounded-[18px] text-left transition-all duration-300 border ${
                              isActive
                                ? `${p.bg} ${p.border} ${p.color} scale-[1.02]`
                                : 'bg-white/[0.04] border-white/8 text-white/70 hover:bg-white/[0.08] hover:border-white/14'
                            }`}
                          >
                            <Icon size={18} className={isActive ? p.color : 'text-white/40'} />
                            <div className="flex flex-col gap-0.5">
                              <span className="font-medium text-[13px] leading-snug">{p.label}</span>
                              <span className="text-[10px] uppercase tracking-widest text-white/25 font-medium">{group.category}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                  <div className="w-4 shrink-0" />
                </div>
              </div>

              {/* ── Settings Grid ── */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 landscape:grid-cols-1 gap-px bg-white/5 border-t border-white/5">

                {/* ── Col 1: Visual ── */}
                <div className="flex flex-col gap-5 p-5 md:p-6 landscape:p-5 bg-[#0a0a0c]/60">
                  {/* Pattern */}
                  <div className="flex flex-col gap-3">
                    <SectionLabel>Паттерн</SectionLabel>
                    <div className="grid grid-cols-3 gap-1.5">
                      {patterns.map(p => {
                        const Icon = p.icon;
                        const active = pattern === p.id;
                        return (
                          <button
                            key={p.id}
                            onClick={() => setPattern(p.id as any)}
                            className={`py-2.5 px-1 rounded-[12px] text-[11px] font-medium transition-all flex flex-col gap-1.5 items-center justify-center ${
                              active
                                ? 'bg-white/10 text-white border border-white/15'
                                : 'bg-white/[0.03] text-white/40 hover:bg-white/6 border border-transparent'
                            }`}
                          >
                            <Icon size={16} strokeWidth={active ? 2 : 1.5} />
                            <span className="truncate w-full text-center text-[10px]">{p.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Shape */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
                    <SectionLabel>Форма стимула</SectionLabel>
                    <div className="grid grid-cols-4 gap-1.5">
                      {shapes.map(s => {
                        const Icon = s.icon;
                        const active = targetShape === s.id;
                        return (
                          <button
                            key={s.id}
                            onClick={() => setTargetShape(s.id as any)}
                            className={`py-2.5 rounded-[12px] text-[11px] font-medium transition-all flex flex-col gap-1.5 items-center justify-center ${
                              active
                                ? 'bg-indigo-500/15 text-indigo-200 border border-indigo-500/25'
                                : 'bg-white/[0.03] text-white/40 hover:bg-white/6 border border-transparent'
                            }`}
                          >
                            <Icon size={16} strokeWidth={active ? 2 : 1.5} />
                            <span className="text-[10px]">{s.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Color */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
                    <SectionLabel>Цвет</SectionLabel>
                    <div className="flex gap-3 flex-wrap">
                      {colors.map(c => (
                        <button
                          key={c.value}
                          onClick={() => setColor(c.value)}
                          className={`w-8 h-8 rounded-full shrink-0 transition-all duration-300 ${color === c.value ? 'scale-125 ring-2 ring-white/50 ring-offset-2 ring-offset-[#0a0a0c]' : 'opacity-50 hover:opacity-90 hover:scale-110'}`}
                          style={{ backgroundColor: c.value, boxShadow: color === c.value ? c.shadow : 'none' }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── Col 2: Behavior ── */}
                <div className="flex flex-col gap-5 p-5 md:p-6 landscape:p-5 bg-[#0a0a0c]/60">
                  {[
                    { label: 'Скорость', value: `${speed.toFixed(1)} Гц`,   min: 0.5, max: 3.0, step: 0.1, val: speed,     set: setSpeed,       parse: parseFloat },
                    { label: 'Серия',    value: `${cyclesPerSet} цикл.`,     min: 10,  max: 60,  step: 2,   val: cyclesPerSet, set: setCyclesPerSet, parse: parseInt },
                    { label: 'Размер',   value: `${size} px`,               min: 20,  max: 150, step: 1,   val: size,        set: setSize,        parse: parseInt },
                  ].map((item, i) => (
                    <div key={i} className={`flex flex-col gap-2.5 ${i > 0 ? 'pt-4 border-t border-white/5' : ''}`}>
                      <div className="flex justify-between items-center">
                        <SectionLabel>{item.label}</SectionLabel>
                        <ValueBadge>{item.value}</ValueBadge>
                      </div>
                      <input
                        type="range"
                        min={item.min} max={item.max} step={item.step}
                        value={item.val}
                        onChange={e => (item.set as any)(item.parse(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  ))}

                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between bg-white/[0.02] rounded-xl px-4 py-3">
                    <SectionLabel>Сессий сегодня</SectionLabel>
                    <span className="text-cyan-400 text-2xl font-light tabular-nums">{setsCompleted}</span>
                  </div>
                </div>

                {/* ── Col 3: Advanced ── */}
                <div className="flex flex-col gap-5 p-5 md:p-6 landscape:p-5 bg-[#0a0a0c]/60">

                  {/* Saccadic */}
                  <div className="flex items-center justify-between">
                    <div>
                      <SectionLabel color="text-rose-400/80">Саккады</SectionLabel>
                      <p className="text-white/30 text-[11px] mt-0.5">Резкая смена позиций</p>
                    </div>
                    <Toggle enabled={isSaccadic} onChange={() => setIsSaccadic(!isSaccadic)} accent="bg-rose-500/70" />
                  </div>

                  {/* Symbols */}
                  <div className="flex flex-col gap-2.5 pt-4 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <SectionLabel color="text-purple-400/80">Когн. нагрузка</SectionLabel>
                        <p className="text-white/30 text-[11px] mt-0.5">Символы во время движения</p>
                      </div>
                      <Toggle enabled={showSymbols} onChange={() => setShowSymbols(!showSymbols)} accent="bg-purple-500/70" />
                    </div>
                    <AnimatePresence>
                      {showSymbols && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex gap-1.5">
                          {Object.entries(langNames).map(([lang, label]) => (
                            <button key={lang} onClick={() => setSymbolLanguage(lang as any)} className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium transition-colors border ${symbolLanguage === lang ? 'bg-purple-500/20 text-purple-200 border-purple-500/25' : 'bg-white/[0.03] text-white/40 border-transparent hover:bg-white/6'}`}>
                              {label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Audio */}
                  <div className="flex flex-col gap-2.5 pt-4 border-t border-white/5">
                    <SectionLabel>Звук стимула</SectionLabel>
                    <div className="grid grid-cols-3 gap-1.5">
                      {Object.entries(audioFormatNames).map(([a, label]) => (
                        <button key={a} onClick={() => setAudioFormat(a as any)} className={`py-2 rounded-xl text-[11px] font-medium transition-all border ${audioFormat === a ? 'bg-cyan-500/15 text-cyan-200 border-cyan-500/25' : 'bg-white/[0.03] text-white/40 border-transparent hover:bg-white/6'}`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ambient */}
                  <div className="flex flex-col gap-2.5 pt-4 border-t border-white/5">
                    <SectionLabel>Эмбиент</SectionLabel>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button onClick={() => setAmbientSound('none')} className={`flex flex-col gap-1 items-center py-2.5 rounded-xl text-[11px] font-medium border transition-all ${ambientSound === 'none' ? 'bg-white/12 text-white border-white/15' : 'bg-white/[0.03] text-white/40 border-transparent hover:bg-white/6'}`}><Wind size={14} /> Выкл</button>
                      <button onClick={() => setAmbientSound('rain')} className={`flex flex-col gap-1 items-center py-2.5 rounded-xl text-[11px] font-medium border transition-all ${ambientSound === 'rain' ? 'bg-cyan-500/15 text-cyan-200 border-cyan-500/25' : 'bg-white/[0.03] text-white/40 border-transparent hover:bg-white/6'}`}><CloudRain size={14} /> Дождь</button>
                      <button onClick={() => setAmbientSound('ocean')} className={`flex flex-col gap-1 items-center py-2.5 rounded-xl text-[11px] font-medium border transition-all ${ambientSound === 'ocean' ? 'bg-blue-500/15 text-blue-200 border-blue-500/25' : 'bg-white/[0.03] text-white/40 border-transparent hover:bg-white/6'}`}><Waves size={14} /> Волны</button>
                    </div>
                  </div>

                  {/* Visual BG */}
                  <div className="flex flex-col gap-2.5 pt-4 border-t border-white/5">
                    <SectionLabel>Фон</SectionLabel>
                    <div className="grid grid-cols-3 gap-1.5">
                      <button onClick={() => setVisualBackground('black')} className={`flex flex-col gap-1 items-center py-2.5 rounded-xl text-[11px] font-medium border transition-all ${visualBackground === 'black' ? 'bg-white/12 text-white border-white/15' : 'bg-white/[0.03] text-white/40 border-transparent hover:bg-white/6'}`}><Moon size={14} /> Чёрный</button>
                      <button onClick={() => setVisualBackground('aurora')} className={`flex flex-col gap-1 items-center py-2.5 rounded-xl text-[11px] font-medium border transition-all ${visualBackground === 'aurora' ? 'bg-emerald-500/15 text-emerald-200 border-emerald-500/25' : 'bg-white/[0.03] text-white/40 border-transparent hover:bg-white/6'}`}><Orbit size={14} /> Aurora</button>
                      <button onClick={() => setVisualBackground('stars')} className={`flex flex-col gap-1 items-center py-2.5 rounded-xl text-[11px] font-medium border transition-all ${visualBackground === 'stars' ? 'bg-indigo-500/15 text-indigo-200 border-indigo-500/25' : 'bg-white/[0.03] text-white/40 border-transparent hover:bg-white/6'}`}><Sparkles size={14} /> Пульс</button>
                    </div>
                  </div>

                </div>

              </div>

              {/* ── CTA ── */}
              <div className="px-5 md:px-8 landscape:px-5 py-5 md:py-6 shrink-0">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="w-full py-3.5 bg-white hover:bg-white/90 text-zinc-950 rounded-2xl font-semibold text-sm tracking-wide transition-all shadow-[0_0_24px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" /> Начать выполнение
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
