'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Copy, Check, Radio, Power } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useT } from '../i18n/useT';

const genId = () => {
  // CSPRNG id, >=12 chars, [a-z0-9] so validRoom/validId still accept it
  const bytes = new Uint8Array(12);
  crypto.getRandomValues(bytes);
  let out = '';
  for (let i = 0; i < bytes.length; i++) out += (bytes[i] % 36).toString(36);
  return out;
};

export const SessionPanel = () => {
  const {
    isSessionOpen, setIsSessionOpen,
    roomId, setRoomId, isHost, setIsHost, clientActive, lang,
    incomingSignal, setIncomingSignal
  } = useStore();
  const t = useT();
  const [copied, setCopied] = useState(false);

  const clientLink =
    typeof window !== 'undefined' && roomId
      ? `${window.location.origin}/emdr?room=${roomId}&lang=${lang}`
      : '';

  const createSession = () => {
    const id = genId();
    setRoomId(id);
    setIsHost(true);
    try {
      const url = `${window.location.pathname}?room=${id}&host=1`;
      window.history.replaceState({}, '', url);
    } catch {}
  };

  const endSession = () => {
    setIsHost(false);
    setRoomId(null);
    try { window.history.replaceState({}, '', window.location.pathname); } catch {}
    setIsSessionOpen(false);
  };

  const copy = () => {
    navigator.clipboard.writeText(clientLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isSessionOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
          className="fixed left-0 top-0 h-full w-full md:w-[440px] bg-[#0a0a0c]/95 backdrop-blur-2xl border-r border-white/[0.06] shadow-2xl z-50 flex flex-col"
        >
          <div className="px-5 pt-5 pb-4 border-b border-white/5 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-white/[0.06] flex items-center justify-center shrink-0">
                <Users size={20} className="text-cyan-400" />
              </div>
              <div className="min-w-0">
                <h2 className="text-lg font-medium text-white tracking-tight truncate">{t.sessHost}</h2>
                <p className="text-white/25 text-[12px] mt-0.5 leading-snug">{t.sessHostSub}</p>
              </div>
            </div>
            <button
              onClick={() => setIsSessionOpen(false)}
              aria-label={lang === 'en' ? 'Close' : 'Закрыть'}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/[0.08] text-white/40 hover:text-white transition-colors shrink-0"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-5 flex flex-col gap-5">
            {!roomId || !isHost ? (
              <button
                onClick={createSession}
                className="w-full py-4 rounded-2xl bg-white text-zinc-950 font-bold text-[15px] hover:bg-zinc-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Radio size={17} /> {t.sessCreate}
              </button>
            ) : (
              <>
                <div className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border ${clientActive ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-200' : 'bg-white/[0.03] border-white/[0.06] text-white/50'}`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${clientActive ? 'bg-emerald-400 animate-pulse' : 'bg-white/30'}`} />
                  <span className="text-[13px] font-medium">{clientActive ? t.sessLive : t.sessConnecting}</span>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/35">{t.sigHeading}</p>
                  {!incomingSignal ? (
                    <p className="px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-white/45 text-[13px]">{t.sigNone}</p>
                  ) : (
                    <div className="flex items-center justify-between gap-2 px-4 py-3 rounded-2xl border border-white/[0.06] bg-white/[0.03]">
                      <span
                        className={`text-[14px] font-semibold ${
                          incomingSignal === 'ok'
                            ? 'text-emerald-300'
                            : incomingSignal === 'pause'
                            ? 'text-amber-300'
                            : 'text-rose-300'
                        }`}
                      >
                        {incomingSignal === 'ok' ? t.sigOkH : incomingSignal === 'pause' ? t.sigPauseH : t.sigStopH}
                      </span>
                      <button
                        onClick={() => setIncomingSignal(null)}
                        className="shrink-0 px-3 py-1.5 rounded-xl bg-white/5 border border-white/[0.06] text-white/60 hover:bg-white/10 text-[12px] font-semibold transition-all"
                      >
                        {t.sigClear}
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/35">{t.sessClientLink}</p>
                  <div className="flex gap-2">
                    <input
                      readOnly
                      value={clientLink}
                      onFocus={(e) => e.currentTarget.select()}
                      className="flex-1 min-w-0 bg-white/[0.04] border border-white/[0.06] rounded-xl px-3 py-2.5 text-[12px] text-white/70 focus:outline-none focus:border-cyan-500/40"
                    />
                    <button
                      onClick={copy}
                      className={`shrink-0 px-3 rounded-xl border flex items-center gap-1.5 text-[12px] font-semibold transition-all ${copied ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' : 'bg-white/5 border-white/[0.06] text-white/70 hover:bg-white/10'}`}
                    >
                      {copied ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                  <p className="text-white/30 text-[12px] leading-relaxed">{t.sessClientHint}</p>
                </div>

                <button
                  onClick={endSession}
                  className="w-full py-3 rounded-2xl bg-rose-500/10 border border-rose-500/25 text-rose-200 font-semibold text-[13px] hover:bg-rose-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Power size={15} /> {t.sessEnd}
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
