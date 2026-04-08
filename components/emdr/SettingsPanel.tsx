'use client';

import { useStore } from '@/store/useStore';
import { X, Settings2 } from 'lucide-react';
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
    setsCompleted, isSettingsOpen, setIsSettingsOpen
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-3xl overflow-y-auto no-scrollbar"
          >
            <div className="w-full max-w-2xl px-6 py-12 flex flex-col gap-10 text-sm">
              <div className="flex justify-between items-center border-b border-white/10 pb-6">
                <div>
                  <h2 className="text-2xl font-light tracking-wide text-white">Настройки Сессии</h2>
                  <p className="text-white/40 mt-1">Отрегулируйте параметры перед началом.</p>
                </div>
                <button 
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {/* Column 1 */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <span className="text-white/70 text-xs uppercase tracking-widest font-semibold">Направление / Режим</span>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(patternNames).map(([p, label]) => (
                        <button
                          key={p}
                          onClick={() => setPattern(p as any)}
                          className={`py-2 px-3 rounded-xl text-xs transition-colors flex items-center justify-center ${pattern === p ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <span className="text-white/70 text-xs uppercase tracking-widest font-semibold flex justify-between">
                      Формат звука
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(audioFormatNames).map(([a, label]) => (
                        <button
                          key={a}
                          onClick={() => setAudioFormat(a as any)}
                          className={`py-2 px-3 rounded-xl text-xs transition-colors flex items-center justify-center ${audioFormat === a ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <span className="text-white/70 text-xs uppercase tracking-widest font-semibold text-center mt-2">Цветокоррекция</span>
                    <div className="flex gap-4 justify-center">
                      {colors.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setColor(c.value)}
                          className={`w-8 h-8 rounded-full transition-all duration-300 ${color === c.value ? 'scale-125 ring-2 ring-white/60 ring-offset-2 ring-offset-transparent' : 'opacity-60 hover:opacity-100 hover:scale-110'}`}
                          style={{ backgroundColor: c.value, boxShadow: color === c.value ? c.shadow : 'none' }}
                          aria-label={`Select ${c.name}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <span className="text-white/70 text-xs uppercase tracking-widest font-semibold">Скорость</span>
                      <span className="text-white/90 text-xs bg-white/10 px-2 py-0.5 rounded-md">{speed.toFixed(1)} Гц</span>
                    </div>
                    <input type="range" min="0.5" max="3.0" step="0.1" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="accent-cyan-400 w-full" />
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <span className="text-white/70 text-xs uppercase tracking-widest font-semibold">Длина подхода (Циклы)</span>
                      <span className="text-white/90 text-xs bg-white/10 px-2 py-0.5 rounded-md">{cyclesPerSet}</span>
                    </div>
                    <input type="range" min="10" max="60" step="2" value={cyclesPerSet} onChange={(e) => setCyclesPerSet(parseInt(e.target.value))} className="accent-cyan-400 w-full" />
                    <p className="text-[10px] text-white/30 uppercase">Выполнено подходов за сегодня: <strong className="text-white/80">{setsCompleted}</strong></p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <span className="text-white/70 text-xs uppercase tracking-widest font-semibold">Размер</span>
                      <span className="text-white/90 text-xs bg-white/10 px-2 py-0.5 rounded-md">{size} px</span>
                    </div>
                    <input type="range" min="20" max="150" step="1" value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="accent-cyan-400 w-full" />
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between">
                      <span className="text-white/70 text-xs uppercase tracking-widest font-semibold">Рандомизация</span>
                      <span className="text-white/90 text-xs bg-white/10 px-2 py-0.5 rounded-md">{randomness}%</span>
                    </div>
                    <input type="range" min="0" max="100" step="1" value={randomness} onChange={(e) => setRandomness(parseInt(e.target.value))} className="accent-cyan-400 w-full" />
                  </div>

                  <div className="flex items-center justify-between border-t border-white/10 pt-6">
                    <span className="text-white/70 text-xs uppercase tracking-widest font-semibold">Аудио-Асинхронность</span>
                    <button 
                      onClick={() => setIsDesync(!isDesync)}
                      className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${isDesync ? 'bg-cyan-600' : 'bg-white/10'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isDesync ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-12 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-full text-white font-medium shadow-lg hover:shadow-cyan-900/50 transition-all font-semibold uppercase tracking-widest text-xs"
                >
                  Применить и закрыть
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
