'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useT } from '../i18n/useT';
import { Button } from './ui/Button';
import { AccentIconBadge } from './ui/AccentIconBadge';
import { InfoBanner } from './ui/InfoBanner';
import { COLORS, Z } from './ui/tokens';

const STORAGE_KEY = 'emdr_disclaimer_accepted_v2';

export const Disclaimer = () => {
  const t = useT();
  const isClient = useStore((s) => s.isClient);
  const setConsentGiven = useStore((s) => s.setConsentGiven);
  const setDissociationScreenPassed = useStore((s) => s.setDissociationScreenPassed);
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
    setConsentGiven(true);
    setDissociationScreenPassed(true);
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-xl"
          style={{ zIndex: Z.overlay }}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-md border border-white/[0.06] rounded-[28px] p-7 shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto no-scrollbar"
            style={{ backgroundColor: '#0d0d10' }}
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-rose-500/10 blur-[50px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col">
              <AccentIconBadge
                icon={<ShieldAlert size={28} />}
                accent="danger"
                size="lg"
                className="mb-5 self-center"
              />

              {step === 1 ? (
                <>
                  <h2 className="text-[22px] font-bold text-white tracking-tight mb-4 text-center">{t.discTitle1}</h2>
                  <div className="space-y-3 mb-7 text-left">
                    <p className={`${COLORS.text.secondary} leading-relaxed text-[14px]`}>{t.discIntro}</p>
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
                      <p className={`${COLORS.text.secondary} text-[13px] leading-relaxed`}>{t.discBox}</p>
                    </div>
                    <p className={`${COLORS.text.faint} text-[12px] leading-relaxed`}>{t.discPhoto}</p>
                  </div>
                  <Button
                    onClick={() => setStep(2)}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    style={{ background: '#ffffff', color: '#09090b' }}
                    iconRight={<ChevronRight size={18} />}
                  >
                    {t.next}
                  </Button>
                </>
              ) : (
                <>
                  <h2 className="text-[20px] font-bold text-white tracking-tight mb-2 text-center">{t.discTitle2}</h2>
                  <p className={`${COLORS.text.muted} text-[13px] leading-relaxed mb-4 text-center`}>{t.discScreenIntro}</p>
                  <div className="flex flex-col gap-1.5 mb-5">
                    {t.contraindications.map((c) => (
                      <div key={c} className="flex gap-2.5 items-start p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500/70 shrink-0" />
                        <span className={`text-[13px] ${COLORS.text.secondary} leading-relaxed`}>{c}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setConfirmed((v) => !v)}
                    className="flex items-start gap-3 text-left mb-5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950 rounded-lg"
                  >
                    <span className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${confirmed ? 'bg-emerald-500/80 border-emerald-500' : 'bg-white/[0.04] border-white/12 group-hover:bg-white/[0.07]'}`}>
                      {confirmed && <Check size={13} className="text-white" />}
                    </span>
                    <span className={`text-[13px] ${COLORS.text.secondary} leading-relaxed`}>{t.discConfirm}</span>
                  </button>

                  <Button
                    onClick={handleAccept}
                    disabled={!confirmed}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    style={confirmed ? { background: '#ffffff', color: '#09090b' } : undefined}
                  >
                    {t.discAccept}
                  </Button>

                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={() => setStep(1)}
                      className={`flex items-center gap-1 text-[12px] ${COLORS.text.faint} hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950 rounded-lg px-1`}
                    >
                      <ChevronLeft size={14} /> {t.back}
                    </button>
                    <a
                      href="https://t.me/hackmemasters"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-[11px] uppercase tracking-[0.14em] ${COLORS.text.faint} font-semibold hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950 rounded-lg px-1`}
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
