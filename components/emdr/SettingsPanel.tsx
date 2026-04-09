'use client';

import { useStore } from '@/store/useStore';
import { Settings2, Zap, ShieldAlert, Sparkles, Brain, Moon, ShieldBan, Play, Pause, Waves, CloudRain, Wind, ArrowUpDown, ArrowLeftRight, MoveDiagonal, MoveDiagonal2, Infinity as InfinityIcon, GripHorizontal, Activity, Columns, TrendingUp, Circle, Square, CircleDashed, Wand2, Orbit, ChevronDown, X, Heart, Focus, Eye, Music, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

// ── Micro-components ────────────────────────────────────────────────────────

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

// ── Main ─────────────────────────────────────────────────────────────────────

export const SettingsPanel = () => {
  const {
    speed, setSpeed, size, setSize, color, setColor, pattern, setPattern,
    audioFormat, setAudioFormat, ambientSound, setAmbientSound,
    cyclesPerSet, setCyclesPerSet,
    setsCompleted, isSettingsOpen, setIsSettingsOpen, isPlaying,
    isSaccadic, setIsSaccadic, showSymbols, setShowSymbols,
    symbolLanguage, setSymbolLanguage, targetShape, setTargetShape,
    visualBackground, setVisualBackground, activePreset, applyPreset
  } = useStore();

  const [expandedCategory, setExpandedCategory] = useState<string | null>('ptsd');

  const colors = [
    { name: 'Cyan',    value: '#06b6d4', shadow: 'var(--drop-shadow-glow-cyan)' },
    { name: 'Emerald', value: '#10b981', shadow: 'var(--drop-shadow-glow-emerald)' },
    { name: 'Amber',   value: '#f59e0b', shadow: 'var(--drop-shadow-glow-amber)' },
    { name: 'Rose',    value: '#f43f5e', shadow: 'var(--drop-shadow-glow-rose)' },
    { name: 'White',   value: '#ffffff', shadow: 'var(--drop-shadow-glow-white)' },
    { name: 'Indigo',  value: '#6366f1', shadow: '0 0 20px rgba(99,102,241,0.4)' },
  ];

  const patterns = [
    { id: 'horizontal',  label: 'Гориз.',     icon: ArrowLeftRight },
    { id: 'vertical',    label: 'Верт.',       icon: ArrowUpDown },
    { id: 'diagonal-1',  label: 'Диаг. 1',    icon: MoveDiagonal },
    { id: 'diagonal-2',  label: 'Диаг. 2',    icon: MoveDiagonal2 },
    { id: 'lemniscate',  label: 'Лемниск.',   icon: InfinityIcon },
    { id: 'dots',        label: 'Точки',       icon: GripHorizontal },
    { id: 'pulse',       label: 'Пульс',       icon: Activity },
    { id: 'bars',        label: 'Столбы',      icon: Columns },
    { id: 'zigzag',      label: 'Зигзаг',      icon: TrendingUp },
  ];

  const shapes = [
    { id: 'circle',    label: 'Круг',    icon: Circle },
    { id: 'square',    label: 'Квадрат', icon: Square },
    { id: 'ring',      label: 'Кольцо',  icon: CircleDashed },
    { id: 'butterfly', label: 'Бабочка', icon: Wand2 },
  ];

  const audioNames: Record<string, string> = {
    'continuous': 'Волна', 'click': 'Щелчки', 'metronome': 'Метр.', 'white_noise': 'Шум', 'binaural_beats': 'Бинаурал',
  };

  const langNames: Record<string, string> = { 'ru': 'Рус', 'en': 'Eng', 'numbers': '123' };

  // ── Preset Categories with sub-items ───────────────────────────────────────
  const presetCategories = [
    {
      id: 'ptsd',
      title: 'ПТСР',
      color: 'text-rose-400',
      icon: Zap,
      presets: [
        { id: 'trauma_flashback', label: 'Флэшбэк',       desc: 'Экстремальная переработка' },
        { id: 'trauma_acute',    label: 'Острая фаза',    desc: 'Саккады, высокая скорость' },
        { id: 'trauma_saccadic', label: 'Саккадический',   desc: 'Резкие прыжки, символы' },
        { id: 'trauma_smooth',   label: 'Плавный трекинг', desc: 'Мягкие движения' },
        { id: 'trauma_deep',     label: 'Глубокая работа', desc: 'Диагональ, медленный' },
      ],
    },
    {
      id: 'anxiety',
      title: 'Тревога',
      color: 'text-emerald-400',
      icon: ShieldAlert,
      presets: [
        { id: 'anxiety',        label: 'Заземление',     desc: 'Медленный, успокаивающий' },
        { id: 'panic',          label: 'Паника',          desc: 'Экстренный режим' },
      ],
    },
    {
      id: 'adhd',
      title: 'СДВГ',
      color: 'text-cyan-400',
      icon: Brain,
      presets: [
        { id: 'adhd_focus',     label: 'Фокус+',          desc: 'Нейростимуляция внимания' },
        { id: 'adhd_impulse',   label: 'Импульс',         desc: 'Контроль гиперактивности' },
        { id: 'adhd_calm',      label: 'Спокойствие',     desc: 'Снижение возбуждения' },
        { id: 'adhd_body',      label: 'Тело',             desc: 'Заземление через ощущения' },
      ],
    },
    {
      id: 'resource',
      title: 'Ресурс',
      color: 'text-amber-400',
      icon: Sparkles,
      presets: [
        { id: 'resource',       label: 'Безопасное место', desc: 'Ресурсирование' },
        { id: 'focus',          label: 'Концентрация',     desc: 'Точки, белый шум' },
        { id: 'sleep',          label: 'Глубокий сон',    desc: '528 Гц, бинауральные ритмы' },
        { id: 'grounding_528',  label: 'Исцеление 528 Гц',desc: 'Частота восстановления' },
      ],
    },
  ];

  return (
    <>
      <button
        onClick={() => setIsSettingsOpen(true)}
        className={`fixed top-4 left-4 md:top-6 md:left-6 z-40 p-3 rounded-2xl bg-white/[0.06] hover:bg-white/10 transition-all backdrop-blur-xl border border-white/[0.08] ${isSettingsOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Settings2 size={22} className="text-white/70" />
      </button>

      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.6 }}
            className="fixed right-0 top-0 h-full w-[380px] md:w-[420px] bg-[#0a0a0c]/85 backdrop-blur-[40px] border-l border-white/[0.06] shadow-[-20px_0_60px_-10px_rgba(0,0,0,0.8)] z-50 flex flex-col"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 shrink-0 border-b border-white/5">
              <div>
                <h2 className="text-lg font-medium tracking-tight text-white">Настройки сессии</h2>
                <p className="text-white/25 text-[12px] mt-0.5 tracking-wide">EMDR-среда</p>
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
                  {isPlaying ? <><Pause size={14} className="fill-current" /> Пауза</> : <><Play size={14} fill="currentColor" style={{ transform: 'translateX(1px)' }} /> Тест</>}
                </button>
                <button 
                  onClick={() => setIsSettingsOpen(false)} 
                  className="p-2 rounded-xl hover:bg-white/[0.08] text-white/40 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* ── Scrollable Body ── */}
            <div className="flex-1 no-scrollbar overflow-y-auto">

              {/* ── Presets (Accordion) ── */}
              <div className="px-5 pt-5 pb-2">
                <Label>Программы</Label>
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
                          <div className="flex items-center gap-2.5">
                            <CatIcon size={16} className={cat.color} />
                            <span className={`font-medium text-[14px] ${cat.color}`}>{cat.title}</span>
                          </div>
                          <ChevronDown size={14} className={`text-white/30 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
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
                                {cat.presets.map(p => {
                                  const isActive = activePreset === p.id;
                                  return (
                                    <button
                                      key={p.id}
                                      onClick={() => applyPreset(p.id)}
                                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all text-[13px] border ${
                                        isActive
                                          ? 'bg-white/[0.08] border-white/12 text-white'
                                          : 'bg-transparent border-transparent text-white/60 hover:bg-white/[0.04] hover:text-white/80'
                                      }`}
                                    >
                                      <div className="font-medium">{p.label}</div>
                                      <div className="text-[11px] text-white/30 mt-0.5">{p.desc}</div>
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

              {/* ── Divider ── */}
              <div className="mx-5 border-t border-white/5 my-2" />

              {/* ── Pattern ── */}
              <div className="px-5 py-3">
                <Label>Паттерн</Label>
                <div className="grid grid-cols-3 gap-1.5 mt-3">
                  {patterns.map(p => {
                    const Icon = p.icon;
                    const active = pattern === p.id;
                    return (
                      <button
                        key={p.id}
                        onClick={() => setPattern(p.id as any)}
                        className={`py-2 rounded-xl text-[12px] font-medium transition-all flex flex-col gap-1 items-center justify-center border ${
                          active ? 'bg-white/10 text-white border-white/12' : 'bg-white/[0.02] text-white/35 hover:bg-white/[0.06] border-transparent'
                        }`}
                      >
                        <Icon size={15} strokeWidth={active ? 2 : 1.5} />
                        <span>{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Shape + Color Row ── */}
              <div className="px-5 py-3 border-t border-white/5">
                <Label>Форма</Label>
                <div className="grid grid-cols-4 gap-1.5 mt-3">
                  {shapes.map(s => {
                    const Icon = s.icon;
                    const active = targetShape === s.id;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setTargetShape(s.id as any)}
                        className={`py-2 rounded-xl text-[12px] font-medium transition-all flex flex-col gap-1 items-center justify-center border ${
                          active ? 'bg-indigo-500/12 text-indigo-200 border-indigo-500/20' : 'bg-white/[0.02] text-white/35 hover:bg-white/[0.06] border-transparent'
                        }`}
                      >
                        <Icon size={15} strokeWidth={active ? 2 : 1.5} />
                        <span>{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="px-5 py-3 border-t border-white/5">
                <Label>Цвет</Label>
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

              {/* ── Sliders ── */}
              <div className="px-5 py-3 border-t border-white/5 flex flex-col gap-4">
                {[
                  { label: 'Скорость', value: `${speed.toFixed(1)} Гц`, min: 0.5, max: 3.0, step: 0.1, val: speed, set: setSpeed, parse: parseFloat },
                  { label: 'Серия', value: `${cyclesPerSet} цикл.`, min: 10, max: 60, step: 2, val: cyclesPerSet, set: setCyclesPerSet, parse: parseInt },
                  { label: 'Размер', value: `${size} px`, min: 20, max: 150, step: 1, val: size, set: setSize, parse: parseInt },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <Label>{item.label}</Label>
                      <Badge>{item.value}</Badge>
                    </div>
                    <input type="range" min={item.min} max={item.max} step={item.step} value={item.val} onChange={e => (item.set as any)(item.parse(e.target.value))} className="w-full" />
                  </div>
                ))}
              </div>

              {/* ── Toggles ── */}
              <div className="px-5 py-3 border-t border-white/5 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label color="text-rose-400/70">Саккады</Label>
                    <p className="text-white/25 text-[12px] mt-0.5">Резкая смена позиций</p>
                  </div>
                  <Toggle enabled={isSaccadic} onChange={() => setIsSaccadic(!isSaccadic)} accent="bg-rose-500/70" />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label color="text-purple-400/70">Когн. нагрузка</Label>
                      <p className="text-white/25 text-[12px] mt-0.5">Символы на объекте</p>
                    </div>
                    <Toggle enabled={showSymbols} onChange={() => setShowSymbols(!showSymbols)} accent="bg-purple-500/70" />
                  </div>
                  <AnimatePresence>
                    {showSymbols && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex gap-1.5 overflow-hidden">
                        {Object.entries(langNames).map(([lang, label]) => (
                          <button key={lang} onClick={() => setSymbolLanguage(lang as any)} className={`flex-1 py-1.5 rounded-lg text-[12px] font-medium transition-colors border ${symbolLanguage === lang ? 'bg-purple-500/15 text-purple-200 border-purple-500/20' : 'bg-white/[0.03] text-white/35 border-transparent hover:bg-white/[0.06]'}`}>
                            {label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* ── Audio ── */}
              <div className="px-5 py-3 border-t border-white/5 flex flex-col gap-4">
                <div>
                  <Label>Звук стимула</Label>
                  <div className="grid grid-cols-3 gap-1.5 mt-2.5">
                    {Object.entries(audioNames).map(([a, label]) => (
                      <button key={a} onClick={() => setAudioFormat(a as any)} className={`py-2 rounded-xl text-[12px] font-medium transition-all border ${audioFormat === a ? 'bg-cyan-500/12 text-cyan-200 border-cyan-500/20' : 'bg-white/[0.02] text-white/35 border-transparent hover:bg-white/[0.06]'}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Эмбиент</Label>
                  <div className="grid grid-cols-4 gap-1.5 mt-2.5">
                    <button onClick={() => setAmbientSound('none')} className={`flex flex-col gap-1 items-center py-2 rounded-xl text-[11px] font-medium border transition-all ${ambientSound === 'none' ? 'bg-white/10 text-white border-white/12' : 'bg-white/[0.02] text-white/35 border-transparent hover:bg-white/[0.06]'}`}><Wind size={13} /> Выкл</button>
                    <button onClick={() => setAmbientSound('rain')} className={`flex flex-col gap-1 items-center py-2 rounded-xl text-[11px] font-medium border transition-all ${ambientSound === 'rain' ? 'bg-cyan-500/12 text-cyan-200 border-cyan-500/20' : 'bg-white/[0.02] text-white/35 border-transparent hover:bg-white/[0.06]'}`}><CloudRain size={13} /> Дождь</button>
                    <button onClick={() => setAmbientSound('ocean')} className={`flex flex-col gap-1 items-center py-2 rounded-xl text-[11px] font-medium border transition-all ${ambientSound === 'ocean' ? 'bg-blue-500/12 text-blue-200 border-blue-500/20' : 'bg-white/[0.02] text-white/35 border-transparent hover:bg-white/[0.06]'}`}><Waves size={13} /> Волны</button>
                    <button onClick={() => setAmbientSound('breath')} className={`flex flex-col gap-1 items-center py-2 rounded-xl text-[11px] font-medium border transition-all ${ambientSound === 'breath' ? 'bg-emerald-500/12 text-emerald-200 border-emerald-500/20' : 'bg-white/[0.02] text-white/35 border-transparent hover:bg-white/[0.06]'}`}><Wind size={13} /> Дыхание</button>
                    <button onClick={() => setAmbientSound('hz528')} className={`flex flex-col gap-1 items-center py-2 rounded-xl text-[11px] font-medium border transition-all ${ambientSound === 'hz528' ? 'bg-amber-500/12 text-amber-200 border-amber-500/20' : 'bg-white/[0.02] text-white/35 border-transparent hover:bg-white/[0.06]'}`}><Music size={13} /> 528 Гц</button>
                    <button onClick={() => setAmbientSound('wind_harmonics')} className={`flex flex-col gap-1 items-center py-2 rounded-xl text-[11px] font-medium border transition-all ${ambientSound === 'wind_harmonics' ? 'bg-indigo-500/12 text-indigo-200 border-indigo-500/20' : 'bg-white/[0.02] text-white/35 border-transparent hover:bg-white/[0.06]'}`}><Headphones size={13} /> Ветер</button>
                    <button onClick={() => setAmbientSound('breathform')} className={`flex flex-col gap-1 items-center py-2 rounded-xl text-[11px] font-medium border transition-all ${ambientSound === 'breathform' ? 'bg-purple-500/12 text-purple-200 border-purple-500/20' : 'bg-white/[0.02] text-white/35 border-transparent hover:bg-white/[0.06]'}`}><Wind size={13} /> Бризформ</button>
                  </div>
                </div>
                <div>
                  <Label>Фон</Label>
                  <div className="grid grid-cols-3 gap-1.5 mt-2.5">
                    <button onClick={() => setVisualBackground('black')} className={`flex flex-col gap-1 items-center py-2 rounded-xl text-[12px] font-medium border transition-all ${visualBackground === 'black' ? 'bg-white/10 text-white border-white/12' : 'bg-white/[0.02] text-white/35 border-transparent hover:bg-white/[0.06]'}`}><Moon size={14} /> Чёрный</button>
                    <button onClick={() => setVisualBackground('aurora')} className={`flex flex-col gap-1 items-center py-2 rounded-xl text-[12px] font-medium border transition-all ${visualBackground === 'aurora' ? 'bg-emerald-500/12 text-emerald-200 border-emerald-500/20' : 'bg-white/[0.02] text-white/35 border-transparent hover:bg-white/[0.06]'}`}><Orbit size={14} /> Aurora</button>
                    <button onClick={() => setVisualBackground('stars')} className={`flex flex-col gap-1 items-center py-2 rounded-xl text-[12px] font-medium border transition-all ${visualBackground === 'stars' ? 'bg-indigo-500/12 text-indigo-200 border-indigo-500/20' : 'bg-white/[0.02] text-white/35 border-transparent hover:bg-white/[0.06]'}`}><Sparkles size={14} /> Пульс</button>
                  </div>
                </div>
              </div>

              {/* ── Sessions Counter ── */}
              <div className="px-5 py-3 border-t border-white/5">
                <div className="flex items-center justify-between bg-white/[0.02] rounded-xl px-4 py-3 border border-white/[0.04]">
                  <Label>Сессий сегодня</Label>
                  <span className="text-cyan-400 text-xl font-light tabular-nums">{setsCompleted}</span>
                </div>
              </div>

              {/* ── CTA ── */}
              <div className="px-5 py-5 shrink-0">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="w-full py-3.5 bg-white hover:bg-white/90 text-zinc-950 rounded-2xl font-semibold text-[14px] tracking-wide transition-all shadow-[0_0_20px_rgba(255,255,255,0.12)] hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-pulse" /> Начать
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
