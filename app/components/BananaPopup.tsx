'use client';

import { Github, Heart, Send, X } from 'lucide-react';
import { OverlayShell } from './ui/OverlayShell';
import { IconButton } from './ui/IconButton';
import { COLORS } from './ui/tokens';

export function BananaPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <OverlayShell
      open={open}
      onClose={onClose}
      maxWidth="max-w-md"
      z="modal"
      glow="primary"
      ariaLabel="EMDR-trenazer svobodnyy proekt"
    >
      <IconButton
        aria-label="Zakryt"
        variant="ghost"
        size="sm"
        onClick={onClose}
        className="absolute top-4 right-4"
      >
        <X size={16} />
      </IconButton>

      <div className="relative z-10 flex flex-col items-center gap-5">
        <img src="/banana.png" alt="" className="w-16 h-16 object-contain" />

        <div className="text-center">
          <h2 className="text-[20px] font-bold text-white tracking-tight">
            EMDR-trenazer - svobodnyy proekt
          </h2>
          <p className={`${COLORS.text.muted} text-[13px] mt-2 leading-relaxed`}>
            Polzuytes besplatno. Kod otkryt - mozhno razvernut servis na svoem servere.
          </p>
        </div>

        <div className="w-full flex flex-col gap-2">
          <a
            href="https://github.com/fsbtactic-code/emdr"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.08] text-white text-[14px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950"
          >
            <Github size={17} />
            Otkryt na GitHub
          </a>

          <a
            href="https://yoomoney.ru/to/4100118497833879"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-200 text-[14px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950"
          >
            <Heart size={17} />
            Podderzhat proekt
          </a>

          <a
            href="https://t.me/hackmemasters"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.08] text-white text-[14px] font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950"
          >
            <Send size={17} />
            Svyazatsya s avtorom
          </a>
        </div>
      </div>
    </OverlayShell>
  );
}
