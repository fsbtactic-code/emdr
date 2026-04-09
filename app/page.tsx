'use client';

import { StimulationEngine } from '@/components/emdr/StimulationEngine';
import { Controls } from '@/components/emdr/Controls';
import { Sidebar } from '@/components/ai/Sidebar';
import { SettingsPanel } from '@/components/emdr/SettingsPanel';
import { InstallPrompt } from '@/components/emdr/InstallPrompt';
import { EmdrGuide } from '@/components/emdr/EmdrGuide';
import { FloatingNav } from '@/components/emdr/FloatingNav';
import { Disclaimer } from '@/components/emdr/Disclaimer';
import { useStore } from '@/store/useStore';
import { useShareableState } from '@/hooks/useShareableState';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X } from 'lucide-react';

export default function SessionPage() {
  const { isSettingsOpen, applyConfig } = useStore();
  const { decodeConfig } = useShareableState();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const presetBase64 = params.get('p');
    if (presetBase64) {
      const config = decodeConfig(presetBase64);
      if (config) {
        applyConfig(config);
        setShowToast(true);
        // Clean up URL without reload
        const newUrl = window.location.pathname;
        window.history.replaceState({}, '', newUrl);
        setTimeout(() => setShowToast(false), 5000);
      }
    }
  }, []);

  return (
    <main className="relative w-full h-full flex bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-zinc-950/80 to-zinc-950 z-0 pointer-events-none" />
      
      {/* Stimulation area: always full height, shrinks width when settings open */}
      <div
        className={`relative z-10 h-full transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${isSettingsOpen ? 'w-[calc(100%-380px)] md:w-[calc(100%-420px)]' : 'w-full'}`}
      >
        <StimulationEngine />
      </div>

      <FloatingNav />
      <SettingsPanel />
      <Controls />
      <Sidebar />
      <EmdrGuide />
      <InstallPrompt />
      <Disclaimer />

      {/* Preset Applied Toast */}
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
              <span className="text-sm font-bold leading-none">Конфигурация применена</span>
              <span className="text-[11px] opacity-80 mt-1">Параметры от специалиста загружены</span>
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
