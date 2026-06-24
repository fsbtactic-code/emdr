'use client';

import { StimulationEngine } from './components/StimulationEngine';
import { Controls } from './components/Controls';
import { SettingsPanel } from './components/SettingsPanel';
import { InstallPrompt } from './components/InstallPrompt';
import { EmdrGuide } from './components/EmdrGuide';
import { FloatingNav } from './components/FloatingNav';
import { Disclaimer } from './components/Disclaimer';
import { GroundingOverlay } from './components/GroundingOverlay';
import { LanguagePicker } from './components/LanguagePicker';
import { SessionManager } from './components/SessionManager';
import { SessionPanel } from './components/SessionPanel';
import { SessionClientOverlay } from './components/SessionClientOverlay';
import { ClientCueOverlay } from './components/ClientCueOverlay';
import { TherapistPanel } from './components/TherapistPanel';
import { ResourceExercises } from './components/ResourceExercises';
import { SessionJournal } from './components/SessionJournal';
import { PreSessionGate } from './components/PreSessionGate';
import { ModeChooser } from './components/ModeChooser';
import { OnboardingFlow } from './components/OnboardingFlow';
import { useStore } from './store/useStore';
import { useShareableState } from './hooks/useShareableState';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';
import { useT } from './i18n/useT';
import { isLocale } from './i18n';

export default function SessionPage() {
  const {
    isSettingsOpen, applyConfig, setSafeMode, setLang, setAppMode, isClient,
    appMode, onboardingSeenSpecialist, onboardingSeenSelfhelp,
    markOnboardingSeen, setOnboardingMode, setIsOnboardingOpen
  } = useStore();
  const { decodeConfig } = useShareableState();
  const t = useT();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const urlLang = params.get('lang');
    let savedLang: string | null = null;
    try { savedLang = localStorage.getItem('emdr_lang'); } catch {}
    if (isLocale(urlLang)) setLang(urlLang);
    else if (isLocale(savedLang)) setLang(savedLang);

    try {
      const savedMode = localStorage.getItem('emdr_mode');
      if (savedMode === 'specialist' || savedMode === 'selfhelp') setAppMode(savedMode);
      // restore which onboardings were already seen
      if (localStorage.getItem('emdr_ob_specialist')) markOnboardingSeen('specialist');
      if (localStorage.getItem('emdr_ob_selfhelp')) markOnboardingSeen('selfhelp');
    } catch {}

    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mq.matches) setSafeMode(true);
    }

    let toastTimer: ReturnType<typeof setTimeout> | undefined;
    const presetBase64 = params.get('p');
    if (presetBase64) {
      const config = decodeConfig(presetBase64);
      if (config) {
        applyConfig(config);
        setShowToast(true);
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
        toastTimer = setTimeout(() => setShowToast(false), 5000);
      }
    }
    return () => { if (toastTimer) clearTimeout(toastTimer); };
  }, []);

  // Auto-run the guided onboarding the first time a mode is active (per mode,
  // persisted). Returning users (seen flag in localStorage) are not interrupted.
  useEffect(() => {
    if (isClient || !appMode) return;
    const seen = appMode === 'specialist' ? onboardingSeenSpecialist : onboardingSeenSelfhelp;
    if (!seen) {
      setOnboardingMode(appMode);
      setIsOnboardingOpen(true);
    }
  }, [isClient, appMode, onboardingSeenSpecialist, onboardingSeenSelfhelp, setOnboardingMode, setIsOnboardingOpen]);

  if (isClient) {
    return (
      <main className="relative w-full flex-1 min-h-0 flex bg-zinc-950 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-zinc-950/80 to-zinc-950 z-0 pointer-events-none" />
        <div className="relative z-10 h-full w-full">
          <StimulationEngine />
        </div>
        <SessionClientOverlay />
        <ClientCueOverlay />
        <GroundingOverlay />
        <SessionManager />
      </main>
    );
  }

  return (
    <main className="relative w-full flex-1 min-h-0 flex bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-zinc-950/80 to-zinc-950 z-0 pointer-events-none" />

      {}
      <div
        className={`relative z-10 h-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isSettingsOpen ? 'w-[calc(100%-380px)] md:w-[calc(100%-420px)]' : 'w-full'}`}
      >
        <StimulationEngine />
      </div>

      <FloatingNav />
      <SettingsPanel />
      <SessionPanel />
      <TherapistPanel />
      <ResourceExercises />
      <SessionJournal />
      <Controls />
      <EmdrGuide />
      <InstallPrompt />
      <Disclaimer />
      <GroundingOverlay />
      <PreSessionGate />
      <ModeChooser />
      <OnboardingFlow />
      <LanguagePicker />
      <SessionManager />

      {}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ y: -100, x: '-50%', opacity: 0 }}
            animate={{ y: 24, x: '-50%', opacity: 1 }}
            exit={{ y: -100, x: '-50%', opacity: 0 }}
            className="fixed top-0 left-1/2 z-[100] flex items-center gap-3 px-5 py-3 bg-indigo-500 text-white rounded-2xl shadow-2xl border border-indigo-400/30"
          >
            <Sparkles size={18} />
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-none">{t.presetApplied}</span>
              <span className="text-[11px] opacity-80 mt-1">{t.presetAppliedSub}</span>
            </div>
            <button onClick={() => setShowToast(false)} className="ml-2 p-1 hover:bg-white/10 rounded-lg">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
