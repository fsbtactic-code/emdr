import { StimulationEngine } from '@/components/emdr/StimulationEngine';
import { Controls } from '@/components/emdr/Controls';
import { Sidebar } from '@/components/ai/Sidebar';

export default function SessionPage() {
  return (
    <main className="relative w-full h-full flex flex-col bg-zinc-950 overflow-hidden">
      {/* Background vignette for deep dark feel */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-zinc-950/80 to-zinc-950 z-0 pointer-events-none" />
      
      <StimulationEngine />
      <Controls />
      <Sidebar />
      
    </main>
  );
}
