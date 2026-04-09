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

export default function SessionPage() {
  const { isSettingsOpen } = useStore();

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
    </main>
  );
}
