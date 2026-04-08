'use client';

import { useStore } from '@/store/useStore';
import { Settings2, Zap, ShieldAlert, Sparkles, Brain } from 'lucide-react';
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
    activePreset, applyPreset
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

  const presets = [
    { id: 'anxiety', label: 'Острая тревога / Заземление', icon: ShieldAlert, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
    { id: 'trauma', label: 'Переработка ПТСР', icon: Zap, color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
    { id: 'focus', label: 'СДВГ и Фокус', icon: Brain, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
    { id: 'resource', label: 'Ресурсирование', icon: Sparkles, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' },
  ];

  return (
    <>
      <button 
        onClick={() => setIsSettingsOpen(true)}
        className={`absolute top-6 left-6 z-40 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-xl border border-white/10 ${isSettingsOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
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
            className="absolute bottom-0 w-full h-[85vh] bg-zinc-950/70 backdrop-blur-[100px] border-t border-white/10 rounded-t-[48px] shadow-[0_-20px_80px_-20px_rgba(0,0,0,0.8)] z-50 flex flex-col"
          >
            {/* iOS Drag Handle */}
            <div className="w-full flex justify-center py-5 shrink-0">
              <div className="w-16 h-1.5 bg-white/20 hover:bg-white/40 cursor-grab active:cursor-grabbing rounded-full transition-colors" />
            </div>

            <div className="flex-1 ios-scrollbar overflow-y-auto w-full px-8 pb-12 max-w-7xl mx-auto flex flex-col gap-10">
              
              <div className="flex justify-between items-end border-b border-white/5 pb-4 shrink-0">
                <div>
                  <h2 className="text-3xl font-light tracking-wide text-white drop-shadow-md">Настройки EMDR-сессии</h2>
                  <p className="text-white/40 mt-2 font-medium tracking-wide">Выберите пресет или настройте механику вручную</p>
                </div>
                <button 
                  onClick={() => useStore.getState().togglePlaying()}
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white font-semibold transition-all border border-white/10 flex items-center gap-2 shadow-lg hover:shadow-white/5"
                >
                  {isPlaying ? '⏸ Пауза предпросмотра' : '▶ Тест стимуляции'}
                </button>
              </div>

              {/* Presets Row */}
              <div className="flex flex-wrap gap-4 mb-4">
                {presets.map(p => {
                  const Icon = p.icon;
                  const isActive = activePreset === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => applyPreset(p.id)}
                      className={`flex-1 min-w-[200px] flex items-center gap-4 p-4 rounded-3xl transition-all duration-300 border ${isActive ? `${p.bg} ${p.border} ${p.color} ring-1 ring-white/20 scale-105` : 'bg-white/[0.03] border-white/5 text-white/50 hover:bg-white/5'}`}
                    >
                      <Icon size={24} className={isActive ? p.color : 'text-white/40'} />
                      <span className="font-semibold text-sm tracking-wide">{p.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                
                {/* Column 1: Visual Base */}
                <div className="flex flex-col gap-8 bg-white/[0.02] p-6 rounded-[32px] border border-white/5 shadow-inner">
                  <div className="flex flex-col gap-4">
                    <span className="text-white/80 text-xs uppercase tracking-widest font-bold">Паттерн движения</span>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {Object.entries(patternNames).map(([p, label]) => (
                        <button
                          key={p}
                          onClick={() => setPattern(p as any)}
                          className={`py-3 px-2 rounded-2xl text-[11px] font-semibold transition-all duration-300 flex items-center justify-center ${pattern === p ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-5 mt-4 border-t border-white/5 pt-6">
                    <span className="text-white/80 text-xs uppercase tracking-widest font-bold text-center">Цветовой маркер</span>
                    <div className="flex gap-4 justify-center bg-black/20 p-4 rounded-[24px]">
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

                {/* Column 2: Behavior & Intensity */}
                <div className="flex flex-col gap-8 bg-white/[0.02] p-6 rounded-[32px] border border-white/5 shadow-inner">
                  
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-xs uppercase tracking-widest font-bold">Скорость</span>
                      <span className="text-white/90 text-sm font-medium bg-black/40 px-3 py-1 rounded-xl border border-white/5">{speed.toFixed(1)} Гц</span>
                    </div>
                    <input type="range" min="0.5" max="3.0" step="0.1" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="w-full mt-3" />
                  </div>

                  <div className="flex flex-col gap-3 pt-6 border-t border-white/5">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-xs uppercase tracking-widest font-bold">Длина подхода</span>
                      <span className="text-white/90 text-sm font-medium bg-black/40 px-3 py-1 rounded-xl border border-white/5">{cyclesPerSet} цикл.</span>
                    </div>
                    <input type="range" min="10" max="60" step="2" value={cyclesPerSet} onChange={(e) => setCyclesPerSet(parseInt(e.target.value))} className="w-full mt-3" />
                  </div>

                  <div className="flex flex-col gap-3 pt-6 border-t border-white/5">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-xs uppercase tracking-widest font-bold">Размер</span>
                      <span className="text-white/90 text-sm font-medium bg-black/40 px-3 py-1 rounded-xl border border-white/5">{size} px</span>
                    </div>
                    <input type="range" min="20" max="150" step="1" value={size} onChange={(e) => setSize(parseInt(e.target.value))} className="w-full mt-3" />
                  </div>
                  
                  <div className="flex items-center justify-between bg-black/20 p-4 rounded-[24px] mt-auto">
                    <span className="text-white/80 text-xs uppercase tracking-widest font-bold">Пройдено сегодня</span>
                    <span className="text-cyan-400 text-xl font-bold">{setsCompleted}</span>
                  </div>

                </div>

                {/* Column 3: Advanced Cognitive Mechanics */}
                <div className="flex flex-col gap-8 bg-white/[0.02] p-6 rounded-[32px] border border-white/5 shadow-inner">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-rose-400/90 text-xs uppercase tracking-widest font-bold drop-shadow-md">Прыжкообразно (Saccadic)</span>
                      <p className="text-white/30 text-[10px] mt-1">Отказ от плавности (Саккады)</p>
                    </div>
                    <button onClick={() => setIsSaccadic(!isSaccadic)} className={`w-14 h-8 rounded-full transition-colors relative flex items-center shadow-inner border border-white/10 ${isSaccadic ? 'bg-rose-500/80' : 'bg-black/50'}`}>
                      <div className={`w-6 h-6 rounded-full bg-white transition-transform shadow-md ${isSaccadic ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-6">
                    <div>
                      <span className="text-purple-400/90 text-xs uppercase tracking-widest font-bold drop-shadow-md">Двойная задача (EMDR 2.0)</span>
                      <p className="text-white/30 text-[10px] mt-1">Всплывающие символы для чтения</p>
                    </div>
                    <button onClick={() => setShowSymbols(!showSymbols)} className={`w-14 h-8 rounded-full transition-colors relative flex items-center shadow-inner border border-white/10 ${showSymbols ? 'bg-purple-500/80' : 'bg-black/50'}`}>
                      <div className={`w-6 h-6 rounded-full bg-white transition-transform shadow-md ${showSymbols ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-white/5 pt-6">
                     <span className="text-white/80 text-xs uppercase tracking-widest font-bold mb-2">Звуковой ритм</span>
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(audioFormatNames).map(([a, label]) => (
                        <button key={a} onClick={() => setAudioFormat(a as any)} className={`py-3 px-1 rounded-2xl text-[11px] font-semibold transition-all duration-300 flex items-center justify-center ${audioFormat === a ? 'bg-cyan-500/20 text-cyan-200 border border-cyan-500/30' : 'bg-white/5 text-white/50 hover:bg-white/10'}`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-white/5 pt-6">
                    <div className="flex justify-between items-center">
                      <span className="text-amber-500/90 text-xs uppercase tracking-widest font-bold drop-shadow-md">Рандомизация</span>
                      <span className="text-amber-400 text-sm font-bold bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20">{randomness}%</span>
                    </div>
                    <input type="range" min="0" max="100" step="1" value={randomness} onChange={(e) => setRandomness(parseInt(e.target.value))} className="accent-amber-400 w-full mt-2" />
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-auto">
                    <div>
                      <span className="text-amber-500/90 text-xs uppercase tracking-widest font-bold drop-shadow-md">Аудио-Десинхронизация</span>
                      <p className="text-white/30 text-[10px] mt-1">Звук в противофазе движению</p>
                    </div>
                    <button onClick={() => setIsDesync(!isDesync)} className={`w-14 h-8 rounded-full transition-colors relative flex items-center shadow-inner border border-white/10 ${isDesync ? 'bg-amber-500/80' : 'bg-black/50'}`}>
                      <div className={`w-6 h-6 rounded-full bg-white transition-transform shadow-md ${isDesync ? 'translate-x-7' : 'translate-x-1'}`} />
                    </button>
                  </div>

                </div>

              </div>
              
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="px-24 py-5 bg-white text-zinc-950 rounded-[32px] shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)] transition-all font-bold uppercase tracking-[0.2em] text-sm active:scale-95"
                >
                  Начать Сессию
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
