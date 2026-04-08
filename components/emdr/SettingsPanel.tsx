'use client';

import { useStore } from '@/store/useStore';
import { Settings2 } from 'lucide-react';
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
    isPlaying
  } = useStore();

  const colors = [
    { name: 'Cyan', value: '#06b6d4', shadow: 'var(--drop-shadow-glow-cyan)' },
    { name: 'Emerald', value: '#10b981', shadow: 'var(--drop-shadow-glow-emerald)' },
    { name: 'Amber', value: '#f59e0b', shadow: 'var(--drop-shadow-glow-amber)' },
    { name: 'Rose', value: '#f43f5e', shadow: 'var(--drop-shadow-glow-rose)' },
    { name: 'White', value: '#ffffff', shadow: 'var(--drop-shadow-glow-white)' },
  ];

  const patternNames: Record<string, string> = {
    'horizontal': '↔ Горизонталь',
    'vertical': '↕ Вертикаль',
    'diagonal-1': '⤡ Диагональ 1',
    'diagonal-2': '⤢ Диагональ 2',
    'lemniscate': '∞ Бесконечность',
    'dots': '•• Точки',
    'pulse': '◎ Пульсация',
    'bars': '‖ Столбы',
    'zigzag': '∿ Зигзаг'
  };

  const audioFormatNames: Record<string, string> = {
    'continuous': 'Волна',
    'click': 'Щелчки',
    'metronome': 'Счет'
  };

  return (
    <>
      <button 
        onClick={() => setIsSettingsOpen(true)}
        className={`absolute top-6 left-6 z-40 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors ${isSettingsOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Settings2 size={24} className="text-white/60" />
      </button>

      <AnimatePresence>
        {isSettingsOpen && (
          <motion.div 
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 w-full h-[70vh] bg-zinc-900/60 backdrop-blur-[80px] border-t border-white/10 rounded-t-[48px] shadow-[0_-20px_80px_-20px_rgba(0,0,0,0.8)] z-50 flex flex-col"
          >
            {/* iOS Drag Handle */}
            <div className="w-full flex justify-center py-5 shrink-0">
              <div className="w-16 h-1.5 bg-white/20 hover:bg-white/40 cursor-grab active:cursor-grabbing rounded-full transition-colors" />
            </div>

            <div className="flex-1 overflow-y-auto w-full px-8 pb-12 max-w-6xl mx-auto flex flex-col gap-12 no-scrollbar">
              
              <div className="flex justify-between items-end border-b border-white/5 pb-4 shrink-0">
                <div>
                  <h2 className="text-3xl font-light tracking-wide text-white drop-shadow-md">Настройки Сессии</h2>
                  <p className="text-white/40 mt-2 font-medium tracking-wide">Режим предпросмотра активен</p>
                </div>
                <button 
                  onClick={() => useStore.getState().togglePlaying()}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white font-semibold transition-all border border-white/10 flex items-center gap-2"
                >
                  {isPlaying ? '⏸ Пауза' : '▶ Тест'}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
                
                {/* Column 1: Visuals */}
                <div className="flex flex-col gap-8 bg-white/[0.03] p-6 rounded-[32px] border border-white/5 shadow-inner">
                  <div className="flex flex-col gap-4">
                    <span className="text-white/80 text-xs uppercase tracking-widest font-bold">Направление / Режим</span>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(patternNames).map(([p, label]) => (
                        <button
                          key={p}
                          onClick={() => setPattern(p as any)}
                          className={`py-3 px-3 rounded-2xl text-xs font-semibold transition-all duration-300 flex items-center justify-center ${pattern === p ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] scale-105' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 mt-4">
                    <span className="text-white/80 text-xs uppercase tracking-widest font-bold text-center">Свечение объекта</span>
                    <div className="flex gap-5 justify-center bg-black/20 p-4 rounded-[24px]">
                      {colors.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setColor(c.value)}
                          className={`w-8 h-8 rounded-full transition-all duration-300 ${color === c.value ? 'scale-125 ring-2 ring-white/60 ring-offset-2 ring-offset-zinc-900' : 'opacity-60 hover:opacity-100 hover:scale-110'}`}
                          style={{ backgroundColor: c.value, boxShadow: color === c.value ? c.shadow : 'none' }}
                          title={c.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column 2: Behavior and Setup */}
                <div className="flex flex-col gap-8 bg-white/[0.03] p-6 rounded-[32px] border border-white/5 shadow-inner">
                  
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-xs uppercase tracking-widest font-bold">Скорость</span>
                      <span className="text-white/90 text-sm font-medium bg-black/40 px-3 py-1 rounded-xl border border-white/5">{speed.toFixed(1)} Гц</span>
                    </div>
                    <input type="range" min="0.5" max="3.0" step="0.1" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="accent-cyan-400 w-full mt-2" />
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-xs uppercase tracking-widest font-bold">Длина подхода</span>
                      <span className="text-white/90 text-sm font-medium bg-black/40 px-3 py-1 rounded-xl border border-white/5">{cyclesPerSet} циклов</span>
                    </div>
                    <input type="range" min="10" max="60" step="2" value={cyclesPerSet} onChange={(e) => setCyclesPerSet(parseInt(e.target.value))} className="accent-cyan-400 w-full mt-2" />
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-xs uppercase tracking-widest font-bold">Размер стимула</span>
                      <span className="text-white/90 text-sm font-medium bg-black/40 px-3 py-1 rounded-xl border border-white/5">{size} px</span>
                    </div>
                    <input type="range" min="20" max="150" step="1" value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="accent-cyan-400 w-full mt-2" />
                  </div>
                  
                  <div className="flex items-center justify-between bg-black/20 p-4 rounded-[24px]">
                    <span className="text-white/80 text-xs uppercase tracking-widest font-bold">Пройдено подходов</span>
                    <span className="text-cyan-400 text-lg font-bold">{setsCompleted}</span>
                  </div>

                </div>

                {/* Column 3: Audio and Cognition (Working memory) */}
                <div className="flex flex-col gap-8 bg-white/[0.03] p-6 rounded-[32px] border border-white/5 shadow-inner">
                  
                  <div className="flex flex-col gap-4">
                    <span className="text-white/80 text-xs uppercase tracking-widest font-bold">Аудио-Стимуляция</span>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(audioFormatNames).map(([a, label]) => (
                        <button
                          key={a}
                          onClick={() => setAudioFormat(a as any)}
                          className={`py-3 px-1 rounded-2xl text-xs font-semibold transition-all duration-300 flex items-center justify-center ${audioFormat === a ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.15)] scale-105' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-xs uppercase tracking-widest font-bold text-amber-500/90 drop-shadow-md">Рандомизация</span>
                      <span className="text-amber-400 text-sm font-bold bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20">{randomness}%</span>
                    </div>
                    <input type="range" min="0" max="100" step="1" value={randomness} onChange={(e) => setRandomness(parseInt(e.target.value))} className="accent-amber-400 w-full mt-2" />
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-2">
                    <span className="text-white/80 text-xs uppercase tracking-widest font-bold text-amber-500/90 drop-shadow-md">Асинхронный Звук</span>
                    <button 
                      onClick={() => setIsDesync(!isDesync)}
                      className={`w-14 h-8 rounded-full transition-colors relative flex items-center shadow-inner border border-white/10 ${isDesync ? 'bg-amber-500/80' : 'bg-black/50'}`}
                    >
                      <div className={`w-6 h-6 rounded-full bg-white transition-transform shadow-md ${isDesync ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                  </div>

                </div>

              </div>
              
              <div className="flex justify-center mt-auto pt-6 border-t border-white/5">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-16 py-5 bg-cyan-500 hover:bg-cyan-400 rounded-full text-white shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:shadow-[0_0_60px_rgba(6,182,212,0.5)] transition-all font-bold uppercase tracking-[0.2em] text-sm active:scale-95"
                >
                  Готово
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
