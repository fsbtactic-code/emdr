'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useT } from '../i18n/useT';

const STORAGE_KEY = 'emdr_disclaimer_accepted_v2';

export const Disclaimer = () => {
  const t = useT();
  const isClient = useStore((s) => s.isClient);
  const [show, setShow] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (isClient) return;
    const hasAccepted = localStorage.getItem(STORAGE_KEY);
    if (!hasAccepted) setShow(true);
  }, [isClient]);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-md bg-[#0d0d0f] border border-white/10 rounded-[28px] p-7 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-500/10 blur-[50px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col">
              <div className="w-14 h-14 bg-rose-500/10 rounded-2xl flex items-center justify-center mb-5 border border-rose-500/20 shadow-inner self-center">
                <ShieldAlert className="text-rose-500" size={28} />
              </div>

              {step === 1 ? (
                <>
                  <h2 className="text-[22px] font-bold text-white tracking-tight mb-4 text-center">{t.discTitle1}</h2>
                  <div className="space-y-3 mb-7 text-left">
                    <p className="text-white/70 leading-relaxed text-[14px]">{t.discIntro}</p>
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                      <p className="text-white/55 text-[13px] leading-relaxed">{t.discBox}</p>
                    </div>
                    <p className="text-white/40 text-[12px] leading-relaxed">{t.discPhoto}</p>
                  </div>
                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-4 bg-white text-zinc-950 rounded-2xl font-bold text-[15px] hover:bg-zinc-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
                  >
                    {t.next}
                    <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-[20px] font-bold text-white tracking-tight mb-2 text-center">{t.discTitle2}</h2>
                  <p className="text-white/45 text-[13px] leading-relaxed mb-4 text-center">{t.discScreenIntro}</p>
                  <div className="flex flex-col gap-1.5 mb-5">
                    {t.contraindications.map((c) => (
                      <div key={c} className="flex gap-2.5 items-start p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-400/70 shrink-0" />
                        <span className="text-[13px] text-white/65 leading-relaxed">{c}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setConfirmed((v) => !v)}
                    className="flex items-start gap-3 text-left mb-5 group"
                  >
                    <span className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${confirmed ? 'bg-emerald-500/80 border-emerald-400' : 'bg-white/[0.04] border-white/20 group-hover:border-white/40'}`}>
                      {confirmed && <Check size={13} className="text-white" />}
                    </span>
                    <span className="text-[13px] text-white/70 leading-relaxed">{t.discConfirm}</span>
                  </button>

                  <button
                    onClick={handleAccept}
                    disabled={!confirmed}
                    className="w-full py-4 bg-white text-zinc-950 rounded-2xl font-bold text-[15px] hover:bg-zinc-200 transition-all active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
                  >
                    {t.discAccept}
                  </button>

                  <div className="flex items-center justify-between mt-4">
                    <button onClick={() => setStep(1)} className="flex items-center gap-1 text-[12px] text-white/40 hover:text-white/70 transition-colors">
                      <ChevronLeft size={14} /> {t.back}
                    </button>
                    <a
                      href="https://t.me/hackmemasters"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] uppercase tracking-[0.12em] text-white/40 font-bold hover:text-white/80 transition-colors"
                    >
                      {t.contact}
                    </a>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
