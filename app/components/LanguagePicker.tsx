'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { LOCALES, LOCALE_META } from '../i18n';
import { useT } from '../i18n/useT';
import type { Locale } from '../i18n';

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
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[130] flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-2xl"
        >
          <motion.div
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 16, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 200 }}
            className="w-full max-w-md bg-[#0d0d0f] border border-white/10 rounded-[28px] p-7 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="relative z-10 flex flex-col">
              <div className="text-center mb-6">
                <h2 className="text-[22px] font-bold text-white tracking-tight">{t.pickTitle}</h2>
                <p className="text-white/40 text-[13px] mt-1.5">{t.pickSub}</p>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {LOCALES.map((l) => (
                  <button
                    key={l}
                    onClick={() => pick(l)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-2xl border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/20 transition-all active:scale-[0.98] min-w-0"
                  >
                    <span className="text-[22px] leading-none shrink-0">{LOCALE_META[l].flag}</span>
                    <span className="text-[14px] font-semibold text-white/85 truncate">{LOCALE_META[l].native}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
