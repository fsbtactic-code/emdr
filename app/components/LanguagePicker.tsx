'use client';

import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';
import { LOCALES, LOCALE_META } from '../i18n';
import { useT } from '../i18n/useT';
import type { Locale } from '../i18n';
import { OverlayShell } from './ui/OverlayShell';

export const LanguagePicker = () => {
  const { setLang, isClient } = useStore();
  const t = useT();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isClient) return;
    try {
      if (!localStorage.getItem('emdr_lang')) setShow(true);
    } catch {
      setShow(true);
    }
  }, [isClient]);

  const pick = (l: Locale) => {
    setLang(l);
    setShow(false);
  };

  return (
    <OverlayShell
      open={show}
      onClose={() => setShow(false)}
      maxWidth="max-w-md"
      z="modal"
      glow="info"
      ariaLabel={t.pickTitle}
    >
      <div className="relative z-10 flex flex-col">
        <div className="text-center mb-6">
          <h2 className="text-[22px] font-bold text-white tracking-tight">{t.pickTitle}</h2>
          <p className="text-white/45 text-[13px] mt-1.5">{t.pickSub}</p>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {LOCALES.map((l) => (
            <button
              key={l}
              onClick={() => pick(l)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-white/[0.06] bg-white/[0.03] hover:bg-white/[0.07] transition-all active:scale-[0.98] min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950"
            >
              <span className="text-[22px] leading-none shrink-0">{LOCALE_META[l].flag}</span>
              <span className="text-[14px] font-semibold text-white/90 truncate">{LOCALE_META[l].native}</span>
            </button>
          ))}
        </div>
      </div>
    </OverlayShell>
  );
};
