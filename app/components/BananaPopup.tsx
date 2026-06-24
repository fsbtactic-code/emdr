'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Heart, Send } from 'lucide-react';

export function BananaPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-zinc-950/85 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 24, stiffness: 220 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-[#0d0d0f] border border-white/[0.06] rounded-[28px] p-7 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-500/10 blur-[60px] rounded-full pointer-events-none" />

            <button
              onClick={onClose}
              aria-label="Закрыть"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-xl bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all"
            >
              <X size={16} />
            </button>

            <div className="relative z-10 flex flex-col items-center gap-5">
              <img src="/banana.png" alt="" className="w-16 h-16 object-contain" />

              <div className="text-center">
                <h2 className="text-[20px] font-bold text-white tracking-tight">
                  EMDR-тренажер - свободный проект
                </h2>
                <p className="text-white/45 text-[13px] mt-2 leading-relaxed">
                  Пользуйтесь бесплатно. Код открыт - можно развернуть сервис на своем сервере.
                </p>
              </div>

              <div className="w-full flex flex-col gap-2">
                <a
                  href="https://github.com/fsbtactic-code/emdr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.06] hover:bg-white/10 text-white text-[14px] font-semibold transition-all"
                >
                  <Github size={17} />
                  Открыть на GitHub
                </a>

                <a
                  href="https://yoomoney.ru/to/4100118497833879"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-200 text-[14px] font-semibold transition-all"
                >
                  <Heart size={17} />
                  Поддержать проект
                </a>

                <a
                  href="https://t.me/hackmemasters"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.06] hover:bg-white/10 text-white text-[14px] font-semibold transition-all"
                >
                  <Send size={17} />
                  Связаться с автором
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
