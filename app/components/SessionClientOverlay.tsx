'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Users, LifeBuoy } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useT } from '../i18n/useT';

export const SessionClientOverlay = () => {
  const { isPlaying, setIsGroundingOpen } = useStore();
  const t = useT();

  return (
    <>
      {}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0a0c]/50 backdrop-blur-xl border border-white/10 shadow-lg">
        <Users size={14} className="text-cyan-400" />
        <span className="text-[12px] font-medium text-white/70">{t.sessClientBadge}</span>
      </div>

      {}
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="fixed inset-x-0 bottom-24 z-30 flex justify-center px-6 pointer-events-none"
          >
            <p className="text-center text-white/55 text-[14px] leading-relaxed max-w-xs px-4 py-2.5 rounded-2xl bg-[#0a0a0c]/40 backdrop-blur-md border border-white/[0.06]">
              {t.sessClientWaiting}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {}
      <button
        onClick={() => setIsGroundingOpen(true)}
        aria-label={t.navGrounding}
        title={t.navGrounding}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-5 py-2.5 flex items-center gap-2 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 active:scale-95 transition-all text-emerald-200/80 hover:text-emerald-100 text-xs font-semibold backdrop-blur-md border border-emerald-500/20 shadow-lg"
      >
        <LifeBuoy size={13} /> {t.stopGround}
      </button>
    </>
  );
};
