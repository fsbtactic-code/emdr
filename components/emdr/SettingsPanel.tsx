'use client';

import { useStore } from '@/store/useStore';
import { Settings2, Zap, ShieldAlert, Sparkles, Brain, Moon, ShieldBan, Play, Pause, Waves, CloudRain, Wind, ArrowUpDown, ArrowLeftRight, MoveDiagonal, MoveDiagonal2, Infinity as InfinityIcon, GripHorizontal, Activity, Columns, TrendingUp, Circle, Square, CircleDashed, Wand2, Orbit, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';

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
      const scrollAmount = direction === 'left' ? -300 : 300;
      presetsScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const colors = [
    { name: 'Cyan', value: '#06b6d4', shadow: 'var(--drop-shadow-glow-cyan)' },
    { name: 'Emerald', value: '#10b981', shadow: 'var(--drop-shadow-glow-emerald)' },
    { name: 'Amber', value: '#f59e0b', shadow: 'var(--drop-shadow-glow-amber)' },
    { name: 'Rose', value: '#f43f5e', shadow: 'var(--drop-shadow-glow-rose)' },
    { name: 'White', value: '#ffffff', shadow: 'var(--drop-shadow-glow-white)' },
    { name: 'Indigo', value: '#6366f1', shadow: '0 0 20px rgba(99,102,241,0.4), 0 0 40px rgba(99,102,241,0.2)' },
  ];

  const patterns = [
    { id: 'horizontal', label: 'Гориз.', icon: ArrowLeftRight },
    { id: 'vertical', label: 'Верт.', icon: ArrowUpDown },
    { id: 'diagonal-1', label: 'Диаг. 1', icon: MoveDiagonal },
    { id: 'diagonal-2', label: 'Диаг. 2', icon: MoveDiagonal2 },
    { id: 'lemniscate', label: 'Бескон.', icon: InfinityIcon },
    { id: 'dots', label: 'Точки', icon: GripHorizontal },
    { id: 'pulse', label: 'Пульс', icon: Activity },
    { id: 'bars', label: 'Столбы', icon: Columns },
    { id: 'zigzag', label: 'Зигзаг', icon: TrendingUp }
  ];

  const shapes = [
    { id: 'circle', label: 'Круг', icon: Circle },
    { id: 'square', label: 'Квадрат', icon: Square },
    { id: 'ring', label: 'Кольцо', icon: CircleDashed },
    { id: 'butterfly', label: 'Бабочка', icon: Wand2 }
  ];

  const audioFormatNames: Record<string, string> = {
    'continuous': 'Волна',
    'click': 'Щелчки',
    'metronome': 'Счет',
    'white_noise': 'Белый Шум',
    'binaural_beats': 'Бинаурал'
  };

  const langNames: Record<string, string> = {
    'ru': 'Русский',
    'en': 'English',
    'numbers': 'Цифры'
  };

  const presetGroups = [
    {
      category: 'Острая фаза',
      items: [
        { id: 'anxiety', label: 'Заземление', icon: ShieldAlert, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
        { id: 'panic', label: 'Экстр. Паника', icon: ShieldBan, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
        { id: 'trauma_saccadic', label: 'ПТСР (Саккады)', icon: Zap, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
        { id: 'trauma_smooth', label: 'ПТСР (Плавный)', icon: Zap, color: 'text-rose-300', bg: 'bg-rose-600/10', border: 'border-rose-600/30' },
      ]
    },
    {
      category: 'Ресурс и Фокус',
      items: [
        { id: 'focus', label: 'Концентрация', icon: Brain, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
        { id: 'resource', label: 'Ресурсирование', icon: Sparkles, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
        { id: 'sleep', label: 'Глубокий Сон', icon: Moon, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
      ]
    }
  ];

  return (
    <>
      <button 
        onClick={() => setIsSettingsOpen(true)}
        className={`fixed top-4 left-4 md:top-6 md:left-6 z-40 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-xl border border-white/10 ${isSettingsOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Settings2 size={24} className="text-white/80" />
      </button>

      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div 
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-0 left-0 w-full h-[85vh] md:h-[80vh] bg-zinc-950/80 backdrop-blur-[100px] border-t border-white/10 rounded-t-[32px] md:rounded-t-[48px] shadow-[0_-30px_100px_-20px_rgba(0,0,0,0.8)] z-50 flex flex-col"
          >
            {/* iOS Drag Handle */}
            <div className="w-full flex justify-center py-4 shrink-0">
              <div onClick={() => setIsSettingsOpen(false)} className="w-16 h-1.5 bg-white/20 hover:bg-white/40 cursor-pointer rounded-full transition-colors" />
            </div>

            <div className="flex-1 no-scrollbar overflow-y-auto w-full pb-12 max-w-7xl mx-auto flex flex-col gap-8 md:gap-10">
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-4 shrink-0 px-4 md:px-8 gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white drop-shadow-md">Настройте свою сессию</h2>
                  <p className="text-white/40 mt-1 text-sm md:text-base font-medium tracking-wide">Терапевтическая EMDR-среда</p>
                </div>
                <button 
                  onClick={() => useStore.getState().togglePlaying()}
                  className="w-full md:w-auto px-6 py-3 md:py-2.5 bg-cyan-600/20 hover:bg-cyan-500/40 rounded-full text-cyan-50 font-bold transition-all border border-cyan-500/30 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] active:scale-95"
                >
                  {isPlaying ? (
                    <><Pause size={18} className="fill-current" /> Пауза</>
                  ) : (
                    <><Play size={18} className="fill-current transform translate-x-[1px]" /> Тест стимуляции</>
                  )}
                </button>
              </div>

              {/* Presets Row */}
              <div className="flex flex-col gap-4 relative">
                <div className="flex justify-between items-center px-4 md:px-8">
                  <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest font-bold">Терапевтические Программы</span>
                  <div className="hidden md:flex gap-2">
                    <button onClick={() => scrollPresets('left')} className="p-1.5 rounded-full bg-white/5 hover:bg-white/20 text-white/50 hover:text-white transition-colors">
                      <ChevronLeft size={16} />
                    </button>
                    <button onClick={() => scrollPresets('right')} className="p-1.5 rounded-full bg-white/5 hover:bg-white/20 text-white/50 hover:text-white transition-colors">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="relative w-full">
                  <div 
                    ref={presetsScrollRef}
                    className="flex gap-4 md:gap-6 overflow-x-auto pb-6 px-4 md:px-8 snap-x snap-mandatory no-scrollbar"
                  >
                    {presetGroups.map((group, idx) => (
                      <div key={idx} className="flex gap-3 shrink-0">
                        {group.items.map(p => {
                          const Icon = p.icon;
                          const isActive = activePreset === p.id;
                          return (
                            <button
                              key={p.id}
                              onClick={() => applyPreset(p.id)}
                              className={`shrink-0 snap-center w-[160px] md:w-[190px] flex items-center justify-start gap-3 p-4 md:p-5 rounded-[20px] md:rounded-[28px] transition-all duration-300 border backdrop-blur-md shadow-lg ${isActive ? `${p.bg} ${p.border} ${p.color} ring-2 ring-white/20 scale-[1.02] md:scale-105` : 'bg-white/[0.06] border-white/10 text-white/80 hover:bg-white/[0.12] hover:scale-[1.02] hover:border-white/30'}`}
                            >
                              <Icon size={24} className={`shrink-0 ${isActive ? p.color : 'text-white/60'}`} />
                              <div className="flex flex-col items-start gap-1 overflow-hidden">
                                <span className="font-bold text-[13px] md:text-[14px] tracking-wide leading-tight text-left truncate w-full">{p.label}</span>
                                <span className="text-[9px] md:text-[10px] text-white/30 font-medium tracking-widest uppercase mt-0.5 truncate w-full flex-shrink-0 text-left">{group.category}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    ))}
                    {/* Add a spacer block at the end so the last item isn't glued to the screen edge when scrolled fully right */}
                    <div className="w-[1px] md:w-[10px] shrink-0"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 px-4 md:px-8">
                
                {/* Column 1: Visual Base */}
                <div className="flex flex-col gap-6 md:gap-8 bg-white/[0.02] p-5 md:p-6 rounded-[24px] md:rounded-[32px] border border-white/5 shadow-inner">
                  
                  <div className="flex flex-col gap-4">
                    <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest font-bold">Паттерн движения</span>
                    <div className="grid grid-cols-2 gap-3">
                      {patterns.map((p) => {
                        const PatternIcon = p.icon;
                        return (
                          <button 
                            key={p.id} 
                            onClick={() => setPattern(p.id as any)} 
                            className={`py-3 px-2 rounded-[16px] md:rounded-[20px] text-[11px] md:text-[13px] font-semibold transition-all duration-300 flex flex-col gap-2 items-center justify-center ${pattern === p.id ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30' : 'bg-white/5 text-white/50 hover:bg-white/10 border border-transparent hover:border-white/10'}`}
                          >
                            <PatternIcon size={20} strokeWidth={2.5} />
                            {p.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 pt-5 border-t border-white/5">
                    <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest font-bold">Форма стимула</span>
                    <div className="grid grid-cols-2 gap-3">
                      {shapes.map((s) => {
                        const ShapeIcon = s.icon;
                        return (
                          <button 
                            key={s.id} 
                            onClick={() => setTargetShape(s.id as any)} 
                            className={`py-3 px-2 rounded-[16px] md:rounded-[20px] text-[11px] md:text-[13px] font-semibold transition-all duration-300 flex flex-col gap-2 items-center justify-center ${targetShape === s.id ? 'bg-indigo-500/20 text-indigo-200 border border-indigo-500/30' : 'bg-white/5 text-white/50 hover:bg-white/10 border border-transparent hover:border-white/10'}`}
                          >
                            <ShapeIcon size={20} strokeWidth={2.5} />
                            {s.label}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-auto border-t border-white/5 pt-5">
                    <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest font-bold text-center">Цветовой маркер</span>
                    <div className="flex gap-2 md:gap-4 justify-center bg-black/20 p-3 md:p-4 rounded-[20px] border border-white/5 overflow-x-auto no-scrollbar">
                      {colors.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setColor(c.value)}
                          className={`w-7 h-7 md:w-8 md:h-8 rounded-full shrink-0 transition-all duration-300 ${color === c.value ? 'scale-125 ring-2 ring-white/60 ring-offset-2 ring-offset-zinc-900' : 'opacity-60 hover:opacity-100 hover:scale-110'}`}
                          style={{ backgroundColor: c.value, boxShadow: color === c.value ? c.shadow : 'none' }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>

                </div>

                {/* Column 2: Behavior & Intensity */}
                <div className="flex flex-col gap-6 md:gap-8 bg-white/[0.02] p-5 md:p-6 rounded-[24px] md:rounded-[32px] border border-white/5 shadow-inner">
                  
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest font-bold">Скорость</span>
                      <span className="text-white/90 text-xs md:text-sm font-medium bg-black/40 px-3 py-1 rounded-xl border border-white/5">{speed.toFixed(1)} Гц</span>
                    </div>
                    <input type="range" min="0.5" max="3.0" step="0.1" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="w-full mt-2" />
                  </div>

                  <div className="flex flex-col gap-3 pt-5 border-t border-white/5">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest font-bold">Длина подхода</span>
                      <span className="text-white/90 text-xs md:text-sm font-medium bg-black/40 px-3 py-1 rounded-xl border border-white/5">{cyclesPerSet} цикл.</span>
                    </div>
                    <input type="range" min="10" max="60" step="2" value={cyclesPerSet} onChange={(e) => setCyclesPerSet(parseInt(e.target.value))} className="w-full mt-2" />
                  </div>

                  <div className="flex flex-col gap-3 pt-5 border-t border-white/5">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest font-bold">Размер</span>
                      <span className="text-white/90 text-xs md:text-sm font-medium bg-black/40 px-3 py-1 rounded-xl border border-white/5">{size} px</span>
                    </div>
                    <input type="range" min="20" max="150" step="1" value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="w-full mt-2" />
                  </div>
                  
                  <div className="flex items-center justify-between bg-black/20 border border-white/5 p-4 rounded-[20px] md:rounded-[24px] mt-auto">
                    <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest font-bold">Пройдено сегодня</span>
                    <span className="text-cyan-400 text-lg md:text-xl font-bold">{setsCompleted}</span>
                  </div>

                </div>

                {/* Column 3: Advanced Cognitive Mechanics */}
                <div className="flex flex-col gap-6 md:gap-8 bg-white/[0.02] p-5 md:p-6 rounded-[24px] md:rounded-[32px] border border-white/5 shadow-inner">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-rose-400/90 text-[10px] md:text-xs uppercase tracking-widest font-bold drop-shadow-md">Саккады (Прыжки)</span>
                      <p className="text-white/30 text-[9px] md:text-[10px] mt-1">Резкая смена позиций объектов</p>
                    </div>
                    <button onClick={() => setIsSaccadic(!isSaccadic)} className={`w-12 md:w-14 h-7 md:h-8 rounded-full transition-colors relative flex items-center shadow-inner border border-white/10 shrink-0 ${isSaccadic ? 'bg-rose-500/80' : 'bg-black/50'}`}>
                      <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full bg-white transition-transform shadow-md ${isSaccadic ? 'translate-x-6 md:translate-x-7' : 'translate-x-[2px] md:translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 pt-5 border-t border-white/5">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-purple-400/90 text-[10px] md:text-xs uppercase tracking-widest font-bold drop-shadow-md">Когнитивная нагрузка</span>
                        <p className="text-white/30 text-[9px] md:text-[10px] mt-1">Чтение символов во время движения</p>
                      </div>
                      <button onClick={() => setShowSymbols(!showSymbols)} className={`w-12 md:w-14 h-7 md:h-8 rounded-full transition-colors relative flex items-center shadow-inner border border-white/10 shrink-0 ${showSymbols ? 'bg-purple-500/80' : 'bg-black/50'}`}>
                        <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full bg-white transition-transform shadow-md ${showSymbols ? 'translate-x-6 md:translate-x-7' : 'translate-x-[2px] md:translate-x-1'}`} />
                      </button>
                    </div>
                    
                    <AnimatePresence>
                      {showSymbols && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="flex gap-2 mt-2">
                          {Object.entries(langNames).map(([lang, label]) => (
                            <button key={lang} onClick={() => setSymbolLanguage(lang as any)} className={`flex-1 py-1.5 rounded-lg text-[10px] font-bold transition-colors ${symbolLanguage === lang ? 'bg-purple-500/30 text-purple-200 border border-purple-500/30' : 'bg-white/5 text-white/40'}`}>
                              {label}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Audio Controls (Main & Ambient) */}
                  <div className="flex flex-col gap-3 border-t border-white/5 pt-5">
                     <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest font-bold mb-1">Стимул (Звук)</span>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(audioFormatNames).map(([a, label]) => (
                        <button key={a} onClick={() => setAudioFormat(a as any)} className={`py-2 px-1 rounded-xl text-[10px] md:text-[11px] font-semibold transition-all duration-300 flex items-center justify-center border border-transparent ${audioFormat === a ? 'bg-cyan-500/20 text-cyan-200 border-cyan-500/30' : 'bg-white/5 text-white/50 hover:bg-white/10 hover:border-white/10'}`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-white/5 pt-5">
                    <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest font-bold mb-1">Эмбиент (Фон)</span>
                    <div className="grid grid-cols-3 gap-2">
                      <button onClick={() => setAmbientSound('none')} className={`flex-1 flex flex-col gap-1.5 items-center justify-center py-2.5 rounded-xl text-[10px] font-bold border border-transparent ${ambientSound === 'none' ? 'bg-white/20 text-white border-white/30' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:border-white/10'}`}><Wind size={16}/> Выкл</button>
                      <button onClick={() => setAmbientSound('rain')} className={`flex-1 flex flex-col gap-1.5 items-center justify-center py-2.5 rounded-xl text-[10px] font-bold border border-transparent ${ambientSound === 'rain' ? 'bg-cyan-500/30 text-cyan-200 border-cyan-500/50' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:border-white/10'}`}><CloudRain size={16}/> Дождь</button>
                      <button onClick={() => setAmbientSound('ocean')} className={`flex-1 flex flex-col gap-1.5 items-center justify-center py-2.5 rounded-xl text-[10px] font-bold border border-transparent ${ambientSound === 'ocean' ? 'bg-blue-500/30 text-blue-200 border-blue-500/50' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:border-white/10'}`}><Waves size={16}/> Волны</button>
                    </div>
                  </div>

                  {/* Visual Background (NEW) */}
                  <div className="flex flex-col gap-3 border-t border-white/5 pt-5 mt-auto">
                    <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest font-bold mb-1">Визуальный Фон</span>
                    <div className="grid grid-cols-3 gap-2">
                      <button onClick={() => setVisualBackground('black')} className={`flex-1 flex flex-col gap-1.5 items-center justify-center py-2.5 rounded-xl text-[10px] font-bold border border-transparent ${visualBackground === 'black' ? 'bg-white/20 text-white border-white/30' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:border-white/10'}`}><Moon size={16}/> Pure Black</button>
                      <button onClick={() => setVisualBackground('aurora')} className={`flex-1 flex flex-col gap-1.5 items-center justify-center py-2.5 rounded-xl text-[10px] font-bold border border-transparent ${visualBackground === 'aurora' ? 'bg-emerald-500/30 text-emerald-200 border-emerald-500/50' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:border-white/10'}`}><Orbit size={16}/> Aurora</button>
                      <button onClick={() => setVisualBackground('stars')} className={`flex-1 flex flex-col gap-1.5 items-center justify-center py-2.5 rounded-xl text-[10px] font-bold border border-transparent ${visualBackground === 'stars' ? 'bg-indigo-500/30 text-indigo-200 border-indigo-500/50' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:border-white/10'}`}><Sparkles size={16}/> Pulse</button>
                    </div>
                  </div>

                </div>

              </div>
              
              <div className="flex justify-center mt-2 md:mt-4 pb-6 px-4 md:px-8">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="w-full md:w-auto px-12 md:px-24 py-4 md:py-5 bg-white text-zinc-950 rounded-[24px] md:rounded-[32px] shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all font-bold uppercase tracking-[0.2em] text-xs md:text-sm active:scale-95 flex items-center justify-center gap-2"
                >
                  <span className="animate-pulse">●</span> Начать Выполнение
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
