'use client';
import { useState, useEffect } from 'react';
import { Share, PlusSquare, X, AppWindow, ArrowRight, Smartphone, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const InstallPrompt = () => {
  const [show, setShow] = useState(false);
  const [platform, setPlatform] = useState<'ios' | 'android' | ''>('');

  useEffect(() => {
    // Check if on mobile
    const ua = window.navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    const isAndroid = /android/i.test(ua);
    
    // Check if already in standalone mode (installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;

    if (!isStandalone && (isIOS || isAndroid)) {
      setPlatform(isIOS ? 'ios' : 'android');
      
      const hasDismissed = sessionStorage.getItem('install_prompt_dismissed');
      if (!hasDismissed) {
        // Delay to let the page load and look professional
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
          className="fixed bottom-6 left-4 right-4 z-[100] max-w-[400px] mx-auto overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
        >
          {/* Main Container with blurred background */}
          <div className="relative bg-[#0d0d0f]/90 backdrop-blur-[30px] border border-white/10 rounded-[32px] p-5 shadow-2xl">
            {/* Close button */}
            <button 
              onClick={dismiss} 
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all active:scale-90"
            >
              <X size={16} />
            </button>

            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/30 to-indigo-500/30 rounded-[18px] flex items-center justify-center border border-white/10 shadow-inner group">
                   <AppWindow className="text-white group-hover:scale-110 transition-transform" size={28} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base tracking-tight leading-tight">Установить NeuroEMDR</h4>
                  <p className="text-white/40 text-[12px] font-medium mt-0.5 tracking-wide">Для работы без границ браузера</p>
                </div>
              </div>

              {/* Instructions Divider */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Specific Instructions */}
              <div className="space-y-3">
                {platform === 'ios' ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">1</div>
                      <p className="text-white/70 text-sm py-0.5">
                        Нажмите кнопку <span className="bg-white/10 px-2 py-0.5 rounded-md inline-flex items-center mx-1 text-blue-400"><Share size={14} /> Поделиться</span>
                      </p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-bold">2</div>
                      <p className="text-white/70 text-sm py-0.5">
                        Прокрутите и выберите <span className="text-white font-bold mx-1">На экран «Домой»</span> <PlusSquare size={14} className="inline text-white/40" />
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold">1</div>
                      <p className="text-white/70 text-sm py-0.5">
                        Нажмите <span className="bg-white/10 px-2 py-0.5 rounded-md inline-flex items-center mx-1 text-white/50"><MoreVertical size={14} /> Меню</span> в углу браузера
                      </p>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xs font-bold">2</div>
                      <p className="text-white/70 text-sm py-0.5">
                        Выберите <span className="text-white font-bold mx-1">Установить</span> или <span className="text-white font-bold mx-1">Добавить</span>
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <button 
                onClick={dismiss}
                className="w-full mt-2 py-3 bg-white text-zinc-950 rounded-2xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2"
              >
                Понятно, спасибо
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
