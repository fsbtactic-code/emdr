'use client';

import { StimulationEngine } from '@/components/emdr/StimulationEngine';
import { Controls } from '@/components/emdr/Controls';
import { Sidebar } from '@/components/ai/Sidebar';
import { SettingsPanel } from '@/components/emdr/SettingsPanel';
import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';

export default function SessionPage() {
  const { isSettingsOpen } = useStore();

  return (
    <main className="relative w-full h-full flex flex-col bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-zinc-950/80 to-zinc-950 z-0 pointer-events-none" />
      
      <motion.div 
        animate={{
          scale: isSettingsOpen ? 0.7 : 1,
          y: isSettingsOpen ? '-18vh' : 0,
          borderRadius: isSettingsOpen ? '48px' : '0px',
          opacity: isSettingsOpen ? 0.5 : 1
        }}
        transition={{ type: 'spring', bounce: 0, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-full relative z-10 overflow-hidden"
        style={{ transformOrigin: 'top center' }}
      >
        <StimulationEngine />
      </motion.div>

      <SettingsPanel />
      <Controls />
      <Sidebar />
      
    </main>
  );
}
