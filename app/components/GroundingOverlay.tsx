'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LifeBuoy, Phone, Globe } from 'lucide-react';
import { useStore } from '../store/useStore';
import { BOX_BREATH_SECONDS, BREATH_SCALE } from '../content';
import { useT } from '../i18n/useT';
import { getCrisisContacts } from '../content/crisis';
import type { CrisisContact } from '../content/crisis';

export const GroundingOverlay = () => {
  const { isGroundingOpen, setIsGroundingOpen, setPlaying, lang, appMode, isClient } = useStore();
  // In a practitioner-led session the clinician handles crisis, so the app does not
  // surface hotlines on either the specialist or the client side. Self-help users do.
  const hideCrisis = appMode === 'specialist' || isClient;
  const t = useT();
  const [breath, setBreath] = useState({ idx: 0, count: BOX_BREATH_SECONDS[0] });

  useEffect(() => {
    if (isGroundingOpen) {
      setPlaying(false);
      setBreath({ idx: 0, count: BOX_BREATH_SECONDS[0] });
    }
  }, [isGroundingOpen, setPlaying]);

  useEffect(() => {
    if (!isGroundingOpen) return;
    const id = setInterval(() => {
      setBreath((b) => {
        if (b.count > 1) return { idx: b.idx, count: b.count - 1 };
        const nextIdx = (b.idx + 1) % BOX_BREATH_SECONDS.length;
        return { idx: nextIdx, count: BOX_BREATH_SECONDS[nextIdx] };
      });
    }, 1000);
    return () => clearInterval(id);
  }, [isGroundingOpen]);

  return (
    <AnimatePresence>
      {isGroundingOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsGroundingOpen(false)}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-zinc-950/92 backdrop-blur-2xl overflow-hidden"
        >
          {/* Calming background that breathes in sync with the box-breathing timer:
              expands and brightens on inhale/hold, contracts and dims on exhale/hold. */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <motion.div
              className="rounded-full"
              style={{
                width: '72vw', height: '72vw', maxWidth: 780, maxHeight: 780,
                background: 'radial-gradient(circle, rgba(16,185,129,0.22), rgba(20,184,166,0.09) 45%, transparent 70%)',
                filter: 'blur(50px)',
              }}
              animate={{ scale: breath.idx <= 1 ? 1.2 : 0.8, opacity: breath.idx <= 1 ? 0.65 : 0.22 }}
              transition={{ duration: BOX_BREATH_SECONDS[breath.idx], ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{
                width: '40vw', height: '40vw', maxWidth: 440, maxHeight: 440,
                background: 'radial-gradient(circle, rgba(34,211,238,0.16), transparent 65%)',
                filter: 'blur(60px)',
              }}
              animate={{ scale: breath.idx <= 1 ? 1.3 : 0.75, opacity: breath.idx <= 1 ? 0.5 : 0.18 }}
              transition={{ duration: BOX_BREATH_SECONDS[breath.idx], ease: 'easeInOut' }}
            />
          </div>

          <motion.div
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 16, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-[#0d0d0f] border border-white/[0.06] rounded-[28px] p-7 shadow-2xl relative overflow-hidden max-h-[92vh] overflow-y-auto no-scrollbar"
          >
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/10 blur-[60px] rounded-full pointer-events-none" />

            <button
              onClick={() => setIsGroundingOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 p-2 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all z-20"
            >
              <X size={18} />
            </button>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="flex items-center gap-2 text-emerald-300/90 text-[12px] font-bold uppercase tracking-[0.15em] mb-1">
                <LifeBuoy size={14} /> {t.groundBadge}
              </div>
              <h2 className="text-[22px] font-bold text-white tracking-tight mb-1">{t.groundTitle}</h2>
              <p className="text-white/45 text-[13px] mb-6">{t.groundStopped}</p>

              <div className="relative w-40 h-40 flex items-center justify-center mb-3">
                <motion.div
                  className="absolute w-24 h-24 rounded-full bg-emerald-500/15 border border-emerald-400/30"
                  animate={{ scale: BREATH_SCALE[breath.idx] }}
                  transition={{ duration: BOX_BREATH_SECONDS[breath.idx], ease: 'easeInOut' }}
                />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-white font-semibold text-[15px]">{t.breathPhases[breath.idx]}</span>
                  <span className="text-emerald-300 text-2xl font-light tabular-nums">{breath.count}</span>
                </div>
              </div>
              <p className="text-white/35 text-[12px] mb-6">{t.boxBreathHint}</p>

              <div className="w-full text-left">
                <p className="text-white/40 text-[11px] font-semibold uppercase tracking-wider mb-2">{t.nameAloud}</p>
                <div className="flex flex-col gap-1.5">
                  {t.grounding5432.map((g) => (
                    <div key={g} className="flex gap-2.5 items-center p-2.5 rounded-xl bg-white/[0.04] border border-transparent">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70 shrink-0" />
                      <span className="text-[13px] text-white/70">{g}</span>
                    </div>
                  ))}
                </div>
              </div>

              {!hideCrisis && (
              <div className="w-full mt-6 rounded-2xl bg-rose-500/[0.04] p-3 text-left">
                {/* heading row */}
                <div className="flex items-center gap-2 mb-3">
                  <LifeBuoy size={13} className="text-rose-400/80 shrink-0" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-rose-300/70">
                    {t.crisisHeading}
                  </span>
                </div>

                {/* contact cards */}
                <div className="flex flex-col gap-2">
                  {getCrisisContacts(lang).map((c: CrisisContact) => {
                    const hasPhone = Boolean(c.phone);
                    const hasUrl = Boolean(c.url);
                    return (
                      <div
                        key={c.name}
                        className="flex items-start gap-3 bg-white/[0.03] rounded-xl px-3 py-2.5"
                      >
                        {/* icon chip */}
                        <div
                          className={[
                            'mt-0.5 w-7 h-7 rounded-full flex items-center justify-center shrink-0',
                            hasPhone
                              ? 'bg-rose-500/[0.15]'
                              : 'bg-amber-500/[0.15]',
                          ].join(' ')}
                        >
                          {hasPhone ? (
                            <Phone size={13} className="text-rose-300/80" />
                          ) : (
                            <Globe size={13} className="text-amber-300/80" />
                          )}
                        </div>

                        {/* text column */}
                        <div className="flex flex-col gap-0.5 min-w-0">
                          <span className="text-[13px] text-white/70 leading-snug">{c.name}</span>

                          {hasPhone && (
                            <span className="text-[13px] text-rose-200 font-semibold tabular-nums leading-tight">
                              {c.phone}
                            </span>
                          )}

                          {hasUrl && (
                            <a
                              href={c.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[11px] text-amber-300/80 hover:text-amber-200 underline underline-offset-2 truncate transition-colors"
                            >
                              {c.url}
                            </a>
                          )}

                          {c.note && (
                            <span className="text-[11px] text-white/35 leading-snug mt-0.5">
                              {c.note}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              )}

              <button
                onClick={() => setIsGroundingOpen(false)}
                className="w-full mt-4 py-3.5 bg-white text-zinc-950 rounded-2xl font-semibold text-[14px] hover:bg-zinc-200 transition-all active:scale-[0.98]"
              >
                {t.groundDone}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
