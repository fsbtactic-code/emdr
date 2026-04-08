'use client';

import { useStore } from '@/store/useStore';
import { Settings2, Zap, ShieldAlert, Sparkles, Brain, Moon, ShieldBan } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const SettingsPanel = () => {
  const { 
    speed, setSpeed, 
    size, setSize, 
    color, setColor, 
    pattern, setPattern,
    audioFormat, setAudioFormat,
    isDesync, setIsDesync,
    randomness, setRandomness,
    cyclesPerSet, setCyclesPerSet,
    setsCompleted, isSettingsOpen, setIsSettingsOpen,
    isPlaying,
    isSaccadic, setIsSaccadic,
    showSymbols, setShowSymbols,
    symbolLanguage, setSymbolLanguage,
    targetShape, setTargetShape,
    activePreset, applyPreset
  } = useStore();

  const colors = [
    { name: 'Cyan', value: '#06b6d4', shadow: 'var(--drop-shadow-glow-cyan)' },
    { name: 'Emerald', value: '#10b981', shadow: 'var(--drop-shadow-glow-emerald)' },
    { name: 'Amber', value: '#f59e0b', shadow: 'var(--drop-shadow-glow-amber)' },
    { name: 'Rose', value: '#f43f5e', shadow: 'var(--drop-shadow-glow-rose)' },
    { name: 'White', value: '#ffffff', shadow: 'var(--drop-shadow-glow-white)' },
    { name: 'Indigo', value: '#6366f1', shadow: '0 0 20px rgba(99,102,241,0.4), 0 0 40px rgba(99,102,241,0.2)' },
  ];

  const patternNames: Record<string, string> = {
    'horizontal': '↔ Гориз.',
    'vertical': '↕ Верт.',
    'diagonal-1': '⤡ Диаг. 1',
    'diagonal-2': '⤢ Диаг. 2',
    'lemniscate': '∞ Бескон.',
    'dots': '•• Точки',
    'pulse': '◎ Пульс',
    'bars': '‖ Столбы',
    'zigzag': '∿ Зигзаг'
  };

  const audioFormatNames: Record<string, string> = {
    'continuous': 'Волна',
    'click': 'Щелчки',
    'metronome': 'Счет',
    'white_noise': 'Белый Шум',
    'binaural_beats': 'Бинаурал'
  };

  const shapeNames: Record<string, string> = {
    'circle': 'Круг',
    'square': 'Квадрат',
    'ring': 'Кольцо',
    'butterfly': 'Бабочка'
  };

  const langNames: Record<string, string> = {
    'ru': 'Русский',
    'en': 'English',
    'numbers': 'Цифры'
  };

  const presets = [
    { id: 'anxiety', label: 'Заземление', icon: ShieldAlert, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    { id: 'trauma', label: 'ПТСР', icon: Zap, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
    { id: 'focus', label: 'Фокус', icon: Brain, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
    { id: 'resource', label: 'Ресурс', icon: Sparkles, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
    { id: 'sleep', label: 'Сон', icon: Moon, color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
    { id: 'panic', label: 'Паника', icon: ShieldBan, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
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
            className="fixed bottom-0 left-0 w-full h-[90vh] md:h-[85vh] bg-zinc-950/80 backdrop-blur-[100px] border-t border-white/10 rounded-t-[32px] md:rounded-t-[48px] shadow-[0_-20px_80px_-20px_rgba(0,0,0,0.8)] z-50 flex flex-col"
          >
            {/* iOS Drag Handle */}
            <div className="w-full flex justify-center py-4 shrink-0">
              <div onClick={() => setIsSettingsOpen(false)} className="w-16 h-1.5 bg-white/20 hover:bg-white/40 cursor-pointer rounded-full transition-colors" />
            </div>

            <div className="flex-1 no-scrollbar overflow-y-auto w-full px-4 md:px-8 pb-12 max-w-7xl mx-auto flex flex-col gap-8 md:gap-10">
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-4 shrink-0 gap-4">
                <div>
                  <h2 className="text-2xl md:text-3xl font-light tracking-wide text-white drop-shadow-md">Настройки Сессии</h2>
                  <p className="text-white/40 mt-1 text-sm md:text-base font-medium tracking-wide">Ультра-кастомная терапевтическая среда</p>
                </div>
                <button 
                  onClick={() => useStore.getState().togglePlaying()}
                  className="w-full md:w-auto px-6 py-3 md:py-2 bg-white/10 hover:bg-white/20 rounded-full text-white font-semibold transition-all border border-white/10 flex items-center justify-center gap-2 shadow-lg hover:shadow-white/5"
                >
                  {isPlaying ? '⏸ Пауза предпросмотра' : '▶ Тест стимуляции'}
                </button>
              </div>

              {/* Presets Row - Scrollable horizontally on mobile */}
              <div className="flex flex-col gap-3">
                <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest font-bold px-2">Терапевтические Программы</span>
                <div className="flex gap-3 md:gap-4 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory">
                {presets.map(p => {
                  const Icon = p.icon;
                  const isActive = activePreset === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => applyPreset(p.id)}
                      className={`shrink-0 snap-center min-w-[140px] md:min-w-[180px] flex items-center justify-center md:justify-start gap-2 md:gap-3 p-3 md:p-4 rounded-[20px] md:rounded-3xl transition-all duration-300 border backdrop-blur-md shadow-lg ${isActive ? `${p.bg} ${p.border} ${p.color} ring-2 ring-white/20 scale-[1.02] md:scale-105` : 'bg-white/[0.08] border-white/20 text-white/90 hover:bg-white/[0.15] hover:scale-[1.02] hover:border-white/40'}`}
                    >
                      <Icon size={20} className={isActive ? p.color : 'text-white/70'} />
                      <span className="font-bold text-[11px] md:text-sm tracking-wide">{p.label}</span>
                    </button>
                  );
                })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                
                {/* Column 1: Visual Base */}
                <div className="flex flex-col gap-6 md:gap-8 bg-white/[0.02] p-5 md:p-6 rounded-[24px] md:rounded-[32px] border border-white/5 shadow-inner">
                  
                  <div className="flex flex-col gap-4">
                    <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest font-bold">Паттерн движения</span>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(patternNames).map(([p, label]) => (
                        <button key={p} onClick={() => setPattern(p as any)} className={`py-2 px-1 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-semibold transition-all duration-300 flex items-center justify-center ${pattern === p ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 pt-5 border-t border-white/5">
                    <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest font-bold">Форма стимула</span>
                    <div className="grid grid-cols-4 gap-2">
                      {Object.entries(shapeNames).map(([s, label]) => (
                        <button key={s} onClick={() => setTargetShape(s as any)} className={`py-2 px-1 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-semibold transition-all duration-300 flex items-center justify-center ${targetShape === s ? 'bg-white/20 text-white border border-white/30' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 mt-auto border-t border-white/5 pt-5">
                    <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest font-bold text-center">Цветовой маркер</span>
                    <div className="flex gap-2 md:gap-4 justify-center bg-black/20 p-3 md:p-4 rounded-[20px] md:rounded-[24px] overflow-x-auto no-scrollbar">
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
                  
                  <div className="flex items-center justify-between bg-black/20 p-4 rounded-[20px] md:rounded-[24px] mt-auto">
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

                  <div className="flex flex-col gap-3 border-t border-white/5 pt-5">
                     <span className="text-white/80 text-[10px] md:text-xs uppercase tracking-widest font-bold mb-1">Формат Звука</span>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {Object.entries(audioFormatNames).map(([a, label]) => (
                        <button key={a} onClick={() => setAudioFormat(a as any)} className={`py-2 md:py-3 px-1 rounded-xl md:rounded-2xl text-[9px] md:text-[11px] font-semibold transition-all duration-300 flex items-center justify-center ${audioFormat === a ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-white/5 pt-5">
                    <div className="flex justify-between items-center">
                      <span className="text-amber-500/90 text-[10px] md:text-xs uppercase tracking-widest font-bold drop-shadow-md">Случайный джиттер</span>
                      <span className="text-amber-400 text-xs md:text-sm font-bold bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20">{randomness}%</span>
                    </div>
                    <input type="range" min="0" max="100" step="1" value={randomness} onChange={(e) => setRandomness(parseInt(e.target.value))} className="accent-amber-400 w-full mt-2" />
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-5 mt-auto">
                    <div>
                      <span className="text-amber-500/90 text-[10px] md:text-xs uppercase tracking-widest font-bold drop-shadow-md">Аудио-Десинхрон</span>
                      <p className="text-white/30 text-[9px] md:text-[10px] mt-1">Звук в противофазе движению</p>
                    </div>
                    <button onClick={() => setIsDesync(!isDesync)} className={`w-12 md:w-14 h-7 md:h-8 rounded-full transition-colors relative flex items-center shadow-inner border border-white/10 shrink-0 ${isDesync ? 'bg-amber-500/80' : 'bg-black/50'}`}>
                      <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full bg-white transition-transform shadow-md ${isDesync ? 'translate-x-6 md:translate-x-7' : 'translate-x-[2px] md:translate-x-1'}`} />
                    </button>
                  </div>

                </div>

              </div>
              
              <div className="flex justify-center mt-2 md:mt-4 pb-6">
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
