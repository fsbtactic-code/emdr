'use client';

import { ClipboardList, Heart } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useT } from '../i18n/useT';
import { OverlayShell } from './ui/OverlayShell';
import { AccentIconBadge } from './ui/AccentIconBadge';
import { COLORS } from './ui/tokens';

export function ModeChooser() {
  const appMode = useStore((s) => s.appMode);
  const setAppMode = useStore((s) => s.setAppMode);
  const setIsSessionOpen = useStore((s) => s.setIsSessionOpen);
  const setIsResourcesOpen = useStore((s) => s.setIsResourcesOpen);
  const t = useT();

  const open = appMode === null;

  const pickSpecialist = () => {
    setIsSessionOpen(true);
    setAppMode('specialist');
  };

  const pickSelfHelp = () => {
    setIsResourcesOpen(true);
    setAppMode('selfhelp');
  };

  return (
    <OverlayShell
      open={open}
      onClose={() => {/* intentional: ModeChooser has no close action */}}
      maxWidth="max-w-xl"
      z="modal"
      glow="info"
      ariaLabel={t.modeChooseTitle}
      className="max-h-[92vh] overflow-y-auto no-scrollbar"
    >
      <div className="relative z-10 flex flex-col">
        <div className="text-center mb-6">
          <h2 className="text-[22px] font-bold text-white tracking-tight">{t.modeChooseTitle}</h2>
          <p className={`${COLORS.text.muted} text-[13px] mt-1.5`}>{t.modeChooseSub}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={pickSpecialist}
            className="group flex flex-col gap-3 text-left p-5 rounded-2xl border border-transparent bg-white/[0.04] hover:bg-cyan-500/[0.08] transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950"
          >
            <AccentIconBadge icon={<ClipboardList size={22} />} accent="info" size="md" />
            <span className="text-[15px] font-semibold text-white">{t.modeSpecialist}</span>
            <span className={`text-[12.5px] leading-relaxed ${COLORS.text.muted}`}>{t.modeSpecialistDesc}</span>
          </button>

          <button
            onClick={pickSelfHelp}
            className="group flex flex-col gap-3 text-left p-5 rounded-2xl border border-transparent bg-white/[0.04] hover:bg-emerald-500/[0.08] transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950"
          >
            <AccentIconBadge icon={<Heart size={22} />} accent="success" size="md" />
            <span className="text-[15px] font-semibold text-white">{t.modeSelfHelp}</span>
            <span className={`text-[12.5px] leading-relaxed ${COLORS.text.muted}`}>{t.modeSelfHelpDesc}</span>
          </button>
        </div>
      </div>
    </OverlayShell>
  );
}
