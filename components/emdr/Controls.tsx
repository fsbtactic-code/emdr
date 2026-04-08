'use client';

import { useStore } from '@/store/useStore';
import { Play, Pause, Settings2 } from 'lucide-react';
import { useState } from 'react';

export const Controls = () => {
  const { 
    isPlaying, togglePlaying, 
    speed, setSpeed, 
    size, setSize, 
    color, setColor, 
    pattern, setPattern,
    audioFormat, setAudioFormat,
    isDesync, setIsDesync,
    randomness, setRandomness
  } = useStore();
  const [openSettings, setOpenSettings] = useState(false);

  const colors = [
    { name: 'Cyan', value: '#06b6d4', shadow: 'var(--drop-shadow-glow-cyan)' },
    { name: 'Emerald', value: '#10b981', shadow: 'var(--drop-shadow-glow-emerald)' },
    { name: 'Amber', value: '#f59e0b', shadow: 'var(--drop-shadow-glow-amber)' },
    { name: 'Rose', value: '#f43f5e', shadow: 'var(--drop-shadow-glow-rose)' },
    { name: 'White', value: '#ffffff', shadow: 'var(--drop-shadow-glow-white)' },
  ];

  // Mapping types to UI names
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
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center space-y-4">
      {openSettings && (
        <div className="glass-panel p-6 rounded-3xl flex flex-col gap-6 w-[340px] text-sm transition-all duration-300 ease-fluid max-h-[70vh] overflow-y-auto no-scrollbar">
          
          <div className="flex flex-col gap-3">
            <span className="text-white/70 text-xs uppercase tracking-widest font-semibold">Направление / Режим</span>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(patternNames).map(([p, label]) => (
                <button
                  key={p}
                  onClick={() => setPattern(p as any)}
                  className={`py-2 px-2 rounded-xl text-xs transition-colors flex items-center justify-center ${pattern === p ? 'bg-white/20 text-white border border-white/30 drop-shadow-md' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-white/70 text-xs uppercase tracking-widest font-semibold">Формат звука</span>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(audioFormatNames).map(([a, label]) => (
                <button
                  key={a}
                  onClick={() => setAudioFormat(a as any)}
                  className={`py-2 px-2 rounded-xl text-xs transition-colors flex items-center justify-center ${audioFormat === a ? 'bg-white/20 text-white border border-white/30 drop-shadow-md' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-white/70 text-xs uppercase tracking-widest font-semibold">Скорость</span>
              <span className="text-white/90 text-xs bg-white/10 px-2 py-0.5 rounded-full">{speed.toFixed(1)} Гц</span>
            </div>
            <input 
              type="range" min="0.5" max="3.0" step="0.1" 
              value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="accent-white/80 w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-white/70 text-xs uppercase tracking-widest font-semibold">Размер</span>
              <span className="text-white/90 text-xs bg-white/10 px-2 py-0.5 rounded-full">{size} px</span>
            </div>
            <input 
              type="range" min="20" max="150" step="1" 
              value={size} onChange={(e) => setSize(parseInt(e.target.value))}
              className="accent-white/80 w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-white/70 text-xs uppercase tracking-widest font-semibold">Рандомизация</span>
              <span className="text-white/90 text-xs bg-white/10 px-2 py-0.5 rounded-full">{randomness}%</span>
            </div>
            <input 
              type="range" min="0" max="100" step="1" 
              value={randomness} onChange={(e) => setRandomness(parseInt(e.target.value))}
              className="accent-white/80 w-full"
            />
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <span className="text-white/70 text-xs uppercase tracking-widest font-semibold">Аудио-Асинхронность</span>
            <button 
              onClick={() => setIsDesync(!isDesync)}
              className={`w-12 h-6 rounded-full transition-colors relative flex items-center ${isDesync ? 'bg-cyan-600' : 'bg-white/10'}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isDesync ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>

          <div className="flex flex-col gap-3">
             <span className="text-white/70 text-xs uppercase tracking-widest font-semibold text-center mt-2">Свечение</span>
            <div className="flex gap-4 justify-center">
              {colors.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setColor(c.value)}
                  className={`w-7 h-7 rounded-full transition-all duration-300 ${color === c.value ? 'scale-125 ring-2 ring-white/60 ring-offset-2 ring-offset-transparent' : 'opacity-60 hover:opacity-100 hover:scale-110'}`}
                  style={{ backgroundColor: c.value, boxShadow: color === c.value ? c.shadow : 'none' }}
                  aria-label={`Select ${c.name}`}
                />
              ))}
            </div>
          </div>

        </div>
      )}

      <div className="glass-panel p-2 rounded-full flex items-center justify-between gap-6 transition-all duration-300 px-4">
        <button 
          onClick={togglePlaying}
          className="w-14 h-14 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/25 hover:scale-105 active:scale-95 transition-all duration-300 text-white shadow-lg"
        >
          {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
        </button>
        <button 
          onClick={() => setOpenSettings(!openSettings)}
          className={`p-3 rounded-full transition-colors duration-300 ${openSettings ? 'bg-white/20 scale-110' : 'bg-transparent hover:bg-white/10 hover:scale-110 active:scale-95'}`}
        >
          <Settings2 size={26} className="text-white/80" />
        </button>
      </div>
    </div>
  );
};
