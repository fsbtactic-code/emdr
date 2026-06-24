'use client';
import { useState, useEffect } from 'react';
import { Share, PlusSquare, AppWindow, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useT } from '../i18n/useT';
import { IconButton } from './ui/IconButton';

export const InstallPrompt = () => {
  const t = useT();
  const [show, setShow] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | ''>('');

  useEffect(() => {
    const ua = window.navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    const isAndroid = /android/i.test(ua);
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;

    if (!isStandalone && (isIOS || isAndroid)) {
      setPlatform(isIOS ? 'ios' : 'android');
      const hasDismissed = sessionStorage.getItem('install_prompt_dismissed');
      if (!hasDismissed) {
        const timer = setTimeout(() => setShow(true), 4000);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem('install_prompt_dismissed', 'true');
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.95 }}
          className="fixed bottom-6 left-4 right-4 z-[120] max-w-[400px] mx-auto overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
        >
          <div className="relative bg-[#0d0d10]/90 backdrop-blur-[30px] border border-white/[0.06] rounded-2xl p-5 shadow-2xl">
            <div className="absolute top-4 right-4">
              <IconButton
                aria-label="Dismiss"
                variant="ghost"
                size="sm"
                shape="round"
                onClick={dismiss}
              >
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><line x1="3" y1="3" x2="13" y2="13"/><line x1="13" y1="3" x2="3" y2="13"/></svg>
              </IconButton>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/30 to-indigo-500/30 rounded-2xl flex items-center justify-center border border-white/[0.06] shadow-inner group">
                  <AppWindow className="text-white group-hover:scale-110 transition-transform" size={28} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base tracking-tight leading-tight">{t.installTitle}</h4>
                  <p className="text-white/45 text-[12px] font-medium mt-0.5 tracking-wide">{t.installSub}</p>
                </div>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

              <div className="space-y-3">
                {platform === 'ios' ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/15 flex items-center justify-center text-cyan-300 text-xs font-bold border border-cyan-500/20">1</div>
                      <p className="text-white/60 text-sm py-0.5">
                        {t.installIosStep1Pre} <span className="bg-white/[0.06] px-2 py-0.5 rounded-lg inline-flex items-center mx-1 text-cyan-300"><Share size={14} /> {t.installShare}</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/15 flex items-center justify-center text-cyan-300 text-xs font-bold border border-cyan-500/20">2</div>
                      <p className="text-white/60 text-sm py-0.5">
                        {t.installIosStep2Pre} <span className="text-white font-bold mx-1">{t.installIosHome}</span> <PlusSquare size={14} className="inline text-white/45" />
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/15 flex items-center justify-center text-cyan-300 text-xs font-bold border border-cyan-500/20">1</div>
                      <p className="text-white/60 text-sm py-0.5">
                        {t.installAndroidStep1Pre} <span className="bg-white/[0.06] px-2 py-0.5 rounded-lg inline-flex items-center mx-1 text-white/45"><MoreVertical size={14} /> {t.installMenu}</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/15 flex items-center justify-center text-cyan-300 text-xs font-bold border border-cyan-500/20">2</div>
                      <p className="text-white/60 text-sm py-0.5">{t.installAndroidStep2}</p>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={dismiss}
                className="w-full mt-2 py-3 bg-white text-zinc-950 rounded-2xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950"
              >
                {t.installThanks}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
