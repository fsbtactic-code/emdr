'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';

export const Disclaimer = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('emdr_disclaimer_accepted');
    if (!hasAccepted) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('emdr_disclaimer_accepted', 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-md bg-[#0d0d0f] border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden"
          >
            {/* Background Aesthetic */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-500/10 blur-[50px] rounded-full" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full" />

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-6 border border-rose-500/20 shadow-inner">
                <ShieldAlert className="text-rose-500" size={32} />
              </div>

              <h2 className="text-2xl font-bold text-white tracking-tight mb-4">Внимание: Безопасность</h2>
              
              <div className="space-y-4 mb-8">
                <p className="text-white/70 leading-relaxed text-[15px]">
                  Если у вас не было опыта EMDR-терапии, будьте <span className="text-rose-400 font-semibold underline decoration-rose-400/30 underline-offset-4">предельно осторожны</span>.
                </p>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-left">
                  <p className="text-white/50 text-[13px] leading-relaxed">
                    Метод EMDR может вызывать сильные эмоциональные и телесные реакции. Самостоятельная практика рекомендуется только для ресурсов или после консультации с сертифицированным терапевтом.
                  </p>
                </div>
              </div>

              <button
                onClick={handleAccept}
                className="w-full py-4 bg-white text-zinc-950 rounded-2xl font-bold text-[15px] hover:bg-zinc-200 transition-all active:scale-[0.98] shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 group"
              >
                Я понимаю и принимаю риски
                <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </button>

              <p className="mt-4 text-[11px] uppercase tracking-[0.15em] text-white/20 font-bold">NeuroLab EMDR Platform</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
