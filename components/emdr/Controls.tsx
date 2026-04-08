'use client';

import { useStore } from '@/store/useStore';
import { Play, Pause } from 'lucide-react';

export const Controls = () => {
  const { isPlaying, togglePlaying, setsCompleted, cyclesPerSet, isSettingsOpen } = useStore();

  if (isSettingsOpen) return null;

  return (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center space-y-4">
      <div className="flex flex-col items-center">
        <button 
          onClick={togglePlaying}
          className="w-20 h-20 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 text-white shadow-xl backdrop-blur-xl border border-white/5"
        >
          {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-2" />}
        </button>
        {setsCompleted > 0 && (
          <p className="mt-4 text-xs tracking-widest uppercase text-white/50 font-medium">
            Подходов за сегодня: <strong className="text-white/90">{setsCompleted}</strong>
          </p>
        )}
      </div>
    </div>
  );
};
