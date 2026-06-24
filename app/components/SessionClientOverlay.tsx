'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Users, LifeBuoy, WifiOff } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useT } from '../i18n/useT';

export const SessionClientOverlay = () => {
  const {
    isPlaying, setIsGroundingOpen,
    clientSignal, setClientSignal, connectionLost
  } = useStore();
  const t = useT();

  const signalBtn = (active: boolean, base: string) =>
    `px-4 py-2.5 flex items-center justify-center rounded-2xl text-[12px] font-semibold backdrop-blur-md border transition-all active:scale-95 ${base} ${active ? 'brightness-125 saturate-150' : ''}`;

  return (
    <>
      {}
      <div className="fixed top-4 inset-x-0 z-40 flex justify-center px-4 pointer-events-none">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0a0c]/50 backdrop-blur-xl border border-white/[0.06] shadow-lg max-w-full">
          <Users size={14} className="text-cyan-400 shrink-0" />
          <span className="text-[12px] font-medium text-white/70 truncate">{t.sessClientBadge}</span>
        </div>
      </div>

      {}
      <AnimatePresence>
        {connectionLost && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="fixed top-16 inset-x-0 z-40 flex justify-center px-4 pointer-events-none"
          >
            <div className="flex items-start gap-2 max-w-sm px-4 py-3 rounded-2xl bg-rose-500/15 backdrop-blur-xl border border-rose-500/30 shadow-lg">
              <WifiOff size={16} className="text-rose-300 shrink-0 mt-0.5" />
              <span className="text-[13px] leading-relaxed text-rose-100/90">{t.connLost}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {}
      <div className="fixed inset-x-0 bottom-6 z-40 flex flex-col items-center gap-3 px-4">
        <AnimatePresence>
          {!isPlaying && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="text-center text-white/55 text-[14px] leading-relaxed max-w-xs px-4 py-2.5 rounded-2xl bg-[#0a0a0c]/40 backdrop-blur-md border border-white/[0.06]"
            >
              {t.sessClientWaiting}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setClientSignal('ok')}
            className={signalBtn(clientSignal === 'ok', 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-200/90 border-emerald-500/25')}
          >
            {t.sigOk}
          </button>
          <button
            onClick={() => setClientSignal('pause')}
            className={signalBtn(clientSignal === 'pause', 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-200/90 border-amber-500/25')}
          >
            {t.sigPause}
          </button>
          <button
            onClick={() => { setClientSignal('stop'); setIsGroundingOpen(true); }}
            className={signalBtn(clientSignal === 'stop', 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-200/90 border-rose-500/25')}
          >
            {t.sigStop}
          </button>
        </div>

        <span className="text-[11px] text-white/40 text-center">{t.sigBadge}</span>

        <button
          onClick={() => setIsGroundingOpen(true)}
          aria-label={t.navGrounding}
          title={t.navGrounding}
          className="px-5 py-2.5 flex items-center gap-2 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 active:scale-95 transition-all text-emerald-200/80 hover:text-emerald-100 text-xs font-semibold backdrop-blur-md border border-emerald-500/20 shadow-lg whitespace-nowrap"
        >
          <LifeBuoy size={13} className="shrink-0" /> {t.stopGround}
        </button>
      </div>
    </>
  );
};
