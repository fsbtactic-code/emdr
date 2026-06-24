'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Heart } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useT } from '../i18n/useT';

export function ModeChooser() {
  const appMode = useStore((s) => s.appMode);
  const setAppMode = useStore((s) => s.setAppMode);
  const setIsSessionOpen = useStore((s) => s.setIsSessionOpen);
  const setIsResourcesOpen = useStore((s) => s.setIsResourcesOpen);
  const t = useT();

  const open = appMode === null;

  const pickSpecialist = () => {
    setIsSessionOpen(true);
    setAppMode('specialist');
  };

  const pickSelfHelp = () => {
    setIsResourcesOpen(true);
    setAppMode('selfhelp');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-2xl"
        >
          <motion.div
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 16, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 200 }}
            className="w-full max-w-xl bg-[#0d0d0f] border border-white/[0.06] rounded-[28px] p-7 shadow-2xl relative overflow-hidden max-h-[92vh] overflow-y-auto no-scrollbar"
          >
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col">
              <div className="text-center mb-6">
                <h2 className="text-[22px] font-bold text-white tracking-tight">{t.modeChooseTitle}</h2>
                <p className="text-white/40 text-[13px] mt-1.5">{t.modeChooseSub}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={pickSpecialist}
                  className="group flex flex-col gap-3 text-left p-5 rounded-2xl border border-transparent bg-white/[0.04] hover:bg-cyan-500/[0.08] transition-all active:scale-[0.98]"
                >
                  <span className="w-11 h-11 flex items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-400/20 text-cyan-300">
                    <ClipboardList size={22} />
                  </span>
                  <span className="text-[15px] font-semibold text-white">{t.modeSpecialist}</span>
                  <span className="text-[12.5px] leading-relaxed text-white/45">{t.modeSpecialistDesc}</span>
                </button>

                <button
                  onClick={pickSelfHelp}
                  className="group flex flex-col gap-3 text-left p-5 rounded-2xl border border-transparent bg-white/[0.04] hover:bg-emerald-500/[0.08] transition-all active:scale-[0.98]"
                >
                  <span className="w-11 h-11 flex items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-400/20 text-emerald-300">
                    <Heart size={22} />
                  </span>
                  <span className="text-[15px] font-semibold text-white">{t.modeSelfHelp}</span>
                  <span className="text-[12.5px] leading-relaxed text-white/45">{t.modeSelfHelpDesc}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
