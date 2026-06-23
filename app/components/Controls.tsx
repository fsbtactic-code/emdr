'use client';

import { useStore } from '../store/useStore';
import { Play, Square, LifeBuoy } from 'lucide-react';
import { useT } from '../i18n/useT';

export const Controls = () => {
  const {
    isPlaying, togglePlaying, setPlaying, setsCompleted, isSettingsOpen, setIsSettingsOpen,
    setIsGroundingOpen, suds, consentGiven, setIsGateOpen, sessionStartedAt, setSessionStartedAt,
    appMode
  } = useStore();
  const t = useT();

  if (isPlaying) {
    return (
      <div className="fixed bottom-8 inset-x-0 z-40 flex flex-col items-center gap-4 px-4 pointer-events-none">
        <div className="flex items-center justify-center gap-2.5 pointer-events-auto">
          <button
            onClick={() => {
              setPlaying(false);
              if (suds !== null && suds >= 4) {
                setIsGroundingOpen(true);
              }
            }}
            className="px-4 sm:px-5 py-2.5 flex items-center gap-2 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all text-white/40 hover:text-white/90 text-xs font-medium backdrop-blur-md border border-white/5 shadow-lg whitespace-nowrap shrink-0"
          >
            <Square size={12} fill="currentColor" /> {t.finish}
          </button>
          <button
            onClick={() => setIsGroundingOpen(true)}
            className="px-4 sm:px-5 py-2.5 flex items-center gap-2 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 active:scale-95 transition-all text-emerald-200/80 hover:text-emerald-100 text-xs font-semibold backdrop-blur-md border border-emerald-500/20 shadow-lg whitespace-nowrap shrink-0"
          >
            <LifeBuoy size={13} className="shrink-0" /> {t.stopGround}
          </button>
        </div>
        {setsCompleted > 0 && (
          <p className="text-[11px] tracking-widest uppercase text-white/40 font-medium">
            {t.series}: <strong className="text-white/80">{setsCompleted}</strong>
          </p>
        )}
      </div>
    );
  }

  if (isSettingsOpen) return null;

  const startLabel = appMode === 'specialist' ? t.tpStartSet : t.start;

  return (
    <div className="fixed bottom-10 inset-x-0 z-40 flex flex-col items-center space-y-4">
      <div className="flex flex-col items-center">
        <button
          onClick={() => {
            // Safety gate: require the screening + consent before any session start.
            if (!consentGiven) {
              setIsGateOpen(true);
              return;
            }
            if (sessionStartedAt === null) setSessionStartedAt(Date.now());
            togglePlaying();
            setIsSettingsOpen(false);
          }}
          className="px-8 py-4 rounded-2xl bg-white text-zinc-950 font-semibold text-[15px] shadow-xl hover:bg-zinc-200 active:scale-95 transition-all flex items-center gap-2"
        >
          <Play size={18} fill="currentColor" style={{ transform: 'translateX(1px)' }} />
          {startLabel}
        </button>
        {setsCompleted > 0 && (
          <p className="mt-4 text-xs tracking-widest uppercase text-white/50 font-medium">
            {t.series}: <strong className="text-white/90">{setsCompleted}</strong>
          </p>
        )}
      </div>
    </div>
  );
};
