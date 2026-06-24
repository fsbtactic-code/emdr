'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LifeBuoy, Phone, Globe, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { BOX_BREATH_SECONDS, BREATH_SCALE } from '../content';
import { useT } from '../i18n/useT';
import { getCrisisContacts } from '../content/crisis';
import type { CrisisContact } from '../content/crisis';
import { OverlayShell } from './ui/OverlayShell';
import { IconButton } from './ui/IconButton';
import { SectionLabel } from './ui/SectionLabel';
import { Button } from './ui/Button';
import { COLORS } from './ui/tokens';

export const GroundingOverlay = () => {
  const { isGroundingOpen, setIsGroundingOpen, setPlaying, lang, appMode, isClient } = useStore();
  // practitioner-led sessions hide hotlines on both sides
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
    <OverlayShell
      open={isGroundingOpen}
      onClose={() => setIsGroundingOpen(false)}
      maxWidth="max-w-lg"
      z="overlay"
      glow="success"
      ariaLabel={t.groundTitle}
      className="max-h-[92vh] overflow-y-auto no-scrollbar"
    >
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden rounded-[28px]">
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

      <IconButton
        aria-label="Close"
        variant="ghost"
        shape="round"
        size="sm"
        onClick={() => setIsGroundingOpen(false)}
        className="absolute top-3 right-3 z-20"
      >
        <X size={18} />
      </IconButton>

      <div className="relative z-10 flex flex-col items-center text-center">
        <SectionLabel icon={LifeBuoy} accent="success" className="mb-1">
          {t.groundBadge}
        </SectionLabel>
        <h2 className="text-[22px] font-bold text-white tracking-tight mb-1">{t.groundTitle}</h2>
        <p className={`${COLORS.text.muted} text-[13px] mb-6`}>{t.groundStopped}</p>

        <div className="relative w-40 h-40 flex items-center justify-center mb-3">
          <motion.div
            className="absolute w-24 h-24 rounded-full bg-emerald-500/15 border border-emerald-500/20"
            animate={{ scale: BREATH_SCALE[breath.idx] }}
            transition={{ duration: BOX_BREATH_SECONDS[breath.idx], ease: 'easeInOut' }}
          />
          <div className="relative z-10 flex flex-col items-center">
            <span className="text-white font-semibold text-[15px]">{t.breathPhases[breath.idx]}</span>
            <span className="text-emerald-300 text-2xl font-light tabular-nums">{breath.count}</span>
          </div>
        </div>
        <p className={`${COLORS.text.faint} text-[12px] mb-6`}>{t.boxBreathHint}</p>

        <div className="w-full text-left">
          <SectionLabel className="mb-2">{t.nameAloud}</SectionLabel>
          <div className="flex flex-col gap-1.5">
            {t.grounding5432.map((g) => (
              <div key={g} className="flex gap-2.5 items-center p-2.5 rounded-xl bg-white/[0.04] border border-transparent">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/70 shrink-0" />
                <span className="text-[13px] text-white/60">{g}</span>
              </div>
            ))}
          </div>
        </div>

        {!hideCrisis && (
          <div className="w-full mt-6 rounded-2xl bg-rose-500/15 border border-rose-500/20 p-3 text-left">
            <SectionLabel icon={LifeBuoy} accent="danger" className="mb-3">
              {t.crisisHeading}
            </SectionLabel>

            <div className="flex flex-col gap-2">
              {getCrisisContacts(lang).map((c: CrisisContact) => {
                const hasPhone = Boolean(c.phone);
                const hasUrl = Boolean(c.url);
                return (
                  <div
                    key={c.name}
                    className="flex items-start gap-3 bg-white/[0.03] rounded-xl px-3 py-2.5"
                  >
                    <div
                      className={[
                        'mt-0.5 w-7 h-7 rounded-full flex items-center justify-center shrink-0',
                        hasPhone ? 'bg-rose-500/15' : 'bg-amber-500/12',
                      ].join(' ')}
                    >
                      {hasPhone ? (
                        <Phone size={13} className="text-rose-300/80" />
                      ) : (
                        <Globe size={13} className="text-amber-300/80" />
                      )}
                    </div>

                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-[13px] text-white/60 leading-snug">{c.name}</span>

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
                        <span className="text-[11px] text-white/25 leading-snug mt-0.5">
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

        <Button
          onClick={() => setIsGroundingOpen(false)}
          variant="secondary"
          size="lg"
          className="w-full mt-4 bg-white text-zinc-950 border-transparent hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.12)] hover:shadow-[0_0_35px_rgba(255,255,255,0.25)] focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950"
        >
          {t.groundDone}
        </Button>
      </div>
    </OverlayShell>
  );
};
