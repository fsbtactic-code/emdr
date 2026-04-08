'use client';

import { useStore } from '@/store/useStore';
import { Play, Pause, Settings2 } from 'lucide-react';
import { useState } from 'react';

export const Controls = () => {
  const { isPlaying, togglePlaying, speed, setSpeed, size, setSize, color, setColor } = useStore();
  const [openSettings, setOpenSettings] = useState(false);

  const colors = [
    { name: 'Cyan', value: '#06b6d4', shadow: 'var(--drop-shadow-glow-cyan)' },
    { name: 'Emerald', value: '#10b981', shadow: 'var(--drop-shadow-glow-emerald)' },
    { name: 'Amber', value: '#f59e0b', shadow: 'var(--drop-shadow-glow-amber)' },
    { name: 'Rose', value: '#f43f5e', shadow: 'var(--drop-shadow-glow-rose)' },
    { name: 'White', value: '#ffffff', shadow: 'var(--drop-shadow-glow-white)' },
  ];

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center space-y-4">
      {openSettings && (
        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-6 w-80 text-sm transition-all duration-300 ease-fluid">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-white/70">Speed ({speed.toFixed(1)} Hz)</span>
            </div>
            <input 
              type="range" min="0.5" max="3.0" step="0.1" 
              value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="accent-white/80 w-full"
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-white/70">Size ({size}px)</span>
            </div>
            <input 
              type="range" min="20" max="100" step="1" 
              value={size} onChange={(e) => setSize(parseInt(e.target.value))}
              className="accent-white/80 w-full"
            />
          </div>

          <div className="flex gap-3 justify-center">
            {colors.map((c) => (
              <button
                key={c.value}
                onClick={() => setColor(c.value)}
                className={`w-6 h-6 rounded-full transition-transform duration-300 ${color === c.value ? 'scale-125 ring-2 ring-white/50' : 'scale-100 opacity-60 hover:opacity-100'}`}
                style={{ backgroundColor: c.value, boxShadow: color === c.value ? c.shadow : 'none' }}
                aria-label={`Select ${c.name}`}
              />
            ))}
          </div>
        </div>
      )}

      <div className="glass-panel p-2 rounded-full flex items-center justify-between gap-6 transition-all duration-300 px-4">
        <button 
          onClick={togglePlaying}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 text-white"
        >
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
        </button>
        <button 
          onClick={() => setOpenSettings(!openSettings)}
          className={`p-3 rounded-full transition-colors duration-300 ${openSettings ? 'bg-white/20' : 'bg-transparent hover:bg-white/10'}`}
        >
          <Settings2 size={24} className="text-white/80" />
        </button>
      </div>
    </div>
  );
};
