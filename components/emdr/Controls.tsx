'use client';

import { useStore } from '@/store/useStore';
import { Play, Pause, Square } from 'lucide-react';

export const Controls = () => {
  const { isPlaying, togglePlaying, setPlaying, setsCompleted, isSettingsOpen, setIsSettingsOpen } = useStore();

  // During playback: show stop button, hide settings
  if (isPlaying) {
    return (
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-4">
        <button
          onClick={() => setPlaying(false)}
          className="px-6 py-3 flex items-center gap-2.5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white/90 text-sm font-medium backdrop-blur-xl border border-white/10 shadow-xl"
        >
          <Square size={14} fill="currentColor" /> Завершить
        </button>
        {setsCompleted > 0 && (
          <p className="text-[11px] tracking-widest uppercase text-white/40 font-medium">
            Сессий: <strong className="text-white/80">{setsCompleted}</strong>
          </p>
        )}
      </div>
    );
  }

  // When settings panel is open, don't show the main play button
  if (isSettingsOpen) return null;

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center space-y-4">
      <div className="flex flex-col items-center">
        <button
          onClick={() => {
            togglePlaying();
            // On mobile, auto-close settings when starting
            setIsSettingsOpen(false);
          }}
          className="w-20 h-20 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 text-white shadow-xl backdrop-blur-xl border border-white/5"
        >
          <Play size={32} fill="currentColor" style={{ transform: 'translateX(2px)' }} />
        </button>
        {setsCompleted > 0 && (
          <p className="mt-4 text-xs tracking-widest uppercase text-white/50 font-medium">
            Сессий: <strong className="text-white/90">{setsCompleted}</strong>
          </p>
        )}
      </div>
    </div>
  );
};
