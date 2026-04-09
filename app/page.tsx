'use client';

import { StimulationEngine } from '@/components/emdr/StimulationEngine';
import { Controls } from '@/components/emdr/Controls';
import { Sidebar } from '@/components/ai/Sidebar';
import { SettingsPanel } from '@/components/emdr/SettingsPanel';
import { InstallPrompt } from '@/components/emdr/InstallPrompt';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';

export default function SessionPage() {
  const { isSettingsOpen, isPlaying } = useStore();

  return (
    <main className="relative w-full h-full flex flex-col bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-zinc-950/80 to-zinc-950 z-0 pointer-events-none" />
      
      {/* When playing + settings open: compress sideways using paddingRight.
          When not playing + settings open: float up with scale effect. */}
      <motion.div 
        animate={
          isSettingsOpen && isPlaying
            ? { paddingRight: '360px', scale: 1, y: 0, borderRadius: '0px', opacity: 1 }
            : isSettingsOpen
              ? { paddingRight: '0px', scale: 0.7, y: '-18vh', borderRadius: '48px', opacity: 0.5 }
              : { paddingRight: '0px', scale: 1, y: 0, borderRadius: '0px', opacity: 1 }
        }
        transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
        className="w-full h-full relative z-10 overflow-hidden"
        style={{ transformOrigin: 'top center' }}
      >
        <StimulationEngine />
      </motion.div>

      <SettingsPanel />
      <Controls />
      <Sidebar />
      <InstallPrompt />
      
    </main>
  );
}
