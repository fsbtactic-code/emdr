'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, AlertTriangle, Phone, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useT } from '../i18n/useT';
import { IconButton } from './ui/IconButton';
import { Button } from './ui/Button';
import { SectionLabel } from './ui/SectionLabel';
import { AccentIconBadge } from './ui/AccentIconBadge';
import { InfoBanner } from './ui/InfoBanner';
import { COLORS, Z } from './ui/tokens';

export function PreSessionGate() {
  const isGateOpen = useStore((st) => st.isGateOpen);
  const setConsentGiven = useStore((st) => st.setConsentGiven);
  const setDissociationScreenPassed = useStore((st) => st.setDissociationScreenPassed);
  const setIsGateOpen = useStore((st) => st.setIsGateOpen);
  const setIsResourcesOpen = useStore((st) => st.setIsResourcesOpen);
  const t = useT();

  const s = {
    badge: t.gateBadge,
    title: t.gateTitle,
    sub: t.gateSub,
    screenTitle: t.gateScreenTitle,
    screenIntro: t.gateScreenIntro,
    screenItems: t.gateScreenItems,
    stopTitle: t.gateStopTitle,
    stopBody: t.gateStopBody,
    stopHint: t.gateStopHint,
    openResources: t.gateOpenResources,
    consentTitle: t.gateConsentTitle,
    consentItems: t.gateConsentItems,
    accept: t.gateAccept,
  };

  const [step, setStep] = useState<'screen' | 'stop' | 'consent'>('screen');
  const [flags, setFlags] = useState<boolean[]>(s.screenItems.map(() => false));
  const [checks, setChecks] = useState<boolean[]>(s.consentItems.map(() => false));

  const handleOpen = () => {
    setFlags(s.screenItems.map(() => false));
    setChecks(s.consentItems.map(() => false));
    setStep('screen');
  };

  const toggleFlag = (i: number) => {
    setFlags((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const toggleCheck = (i: number) => {
    setChecks((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  const anyFlagged = flags.some(Boolean);
  const allChecked = checks.every(Boolean);

  const handleScreenNext = () => {
    if (anyFlagged) {
      setDissociationScreenPassed(false);
      setStep('stop');
    } else {
      setStep('consent');
    }
  };

  const handleAccept = () => {
    setConsentGiven(true);
    setDissociationScreenPassed(true);
    setIsGateOpen(false);
  };

  const handleOpenResources = () => {
    setIsResourcesOpen(true);
    setIsGateOpen(false);
  };

  const handleDismiss = () => {
    setIsGateOpen(false);
  };

  return (
    <AnimatePresence onExitComplete={handleOpen}>
      {isGateOpen && (
        <motion.div
          key="gate-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleDismiss}
          className="fixed inset-0 flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-2xl"
          style={{ zIndex: Z.modal }}
        >
          <motion.div
            key="gate-panel"
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 16, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg border border-white/[0.06] rounded-[28px] p-7 shadow-2xl relative overflow-hidden max-h-[92vh] overflow-y-auto no-scrollbar"
            style={{ backgroundColor: '#0d0d10' }}
          >
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none" />

            <IconButton
              onClick={handleDismiss}
              aria-label={t.close}
              variant="ghost"
              shape="round"
              className="absolute top-3.5 right-3.5 z-20"
            >
              <X size={18} />
            </IconButton>

            <div className="relative z-10 flex flex-col items-center text-center">
              <SectionLabel
                icon={ShieldCheck}
                accent="info"
                className="mb-2 justify-center"
              >
                {s.badge}
              </SectionLabel>

              <h2 className="text-[22px] font-bold text-white tracking-tight mb-1">{s.title}</h2>
              <p className={`${COLORS.text.muted} text-[13px] mb-6 max-w-sm`}>{s.sub}</p>

              {step === 'screen' && (
                <div className="w-full text-left">
                  <SectionLabel className="mb-1">
                    {s.screenTitle}
                  </SectionLabel>
                  <p className={`${COLORS.text.faint} text-[12px] mb-4`}>{s.screenIntro}</p>

                  <div className="flex flex-col gap-2 mb-6">
                    {s.screenItems.map((item, i) => {
                      const active = flags[i];
                      return (
                        <button
                          key={i}
                          onClick={() => toggleFlag(i)}
                          className={[
                            'flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all duration-150',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
                            active
                              ? 'bg-rose-500/15 border-rose-500/20 text-rose-200'
                              : 'bg-white/[0.03] border-white/[0.06] text-white/60 hover:bg-white/[0.04] hover:text-white/80',
                          ].join(' ')}
                          aria-pressed={active}
                        >
                          <span
                            className={[
                              'mt-[2px] flex-shrink-0 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
                              active
                                ? 'border-rose-500 bg-rose-500'
                                : 'border-white/12 bg-transparent',
                            ].join(' ')}
                          >
                            {active && (
                              <span className="w-1.5 h-1.5 rounded-full bg-white block" />
                            )}
                          </span>
                          <span className="text-[13px] leading-snug">{item}</span>
                        </button>
                      );
                    })}
                  </div>

                  <Button
                    onClick={handleScreenNext}
                    variant={anyFlagged ? 'danger' : 'secondary'}
                    size="lg"
                    className="w-full"
                    style={!anyFlagged ? { background: '#ffffff', color: '#09090b' } : undefined}
                  >
                    {t.next}
                  </Button>
                </div>
              )}

              {step === 'stop' && (
                <div className="w-full text-left">
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-rose-500/10 blur-[60px] rounded-full pointer-events-none" />

                  <div className="relative flex flex-col items-center text-center mb-6">
                    <AccentIconBadge
                      icon={<AlertTriangle size={24} />}
                      accent="danger"
                      size="lg"
                      shape="round"
                      className="mb-4"
                    />
                    <h3 className="text-[18px] font-bold text-white mb-2">{s.stopTitle}</h3>
                    <p className={`${COLORS.text.secondary} text-[13px] leading-relaxed mb-4`}>{s.stopBody}</p>

                    <InfoBanner
                      accent="info"
                      icon={<Phone size={14} />}
                      className="w-full text-left mb-6"
                    >
                      {s.stopHint}
                    </InfoBanner>

                    <Button
                      onClick={handleOpenResources}
                      variant="primary"
                      size="lg"
                      className="w-full"
                    >
                      {s.openResources}
                    </Button>
                  </div>
                </div>
              )}

              {step === 'consent' && (
                <div className="w-full text-left">
                  <SectionLabel className="mb-4">
                    {s.consentTitle}
                  </SectionLabel>

                  <div className="flex flex-col gap-2 mb-6">
                    {s.consentItems.map((item, i) => {
                      const checked = checks[i];
                      return (
                        <button
                          key={i}
                          onClick={() => toggleCheck(i)}
                          className={[
                            'flex items-start gap-3 p-3.5 rounded-2xl border text-left transition-all duration-150',
                            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950',
                            checked
                              ? 'bg-emerald-500/15 border-emerald-500/20 text-emerald-100'
                              : 'bg-white/[0.03] border-white/[0.06] text-white/60 hover:bg-white/[0.04] hover:text-white/80',
                          ].join(' ')}
                          aria-pressed={checked}
                        >
                          <span
                            className={[
                              'mt-[2px] flex-shrink-0 w-4 h-4 rounded border-2 flex items-center justify-center transition-colors',
                              checked
                                ? 'border-emerald-500 bg-emerald-500'
                                : 'border-white/12 bg-transparent',
                            ].join(' ')}
                          >
                            {checked && (
                              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          <span className="text-[13px] leading-snug">{item}</span>
                        </button>
                      );
                    })}
                  </div>

                  <Button
                    onClick={handleAccept}
                    disabled={!allChecked}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                    style={allChecked ? { background: '#ffffff', color: '#09090b' } : undefined}
                  >
                    {s.accept}
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
