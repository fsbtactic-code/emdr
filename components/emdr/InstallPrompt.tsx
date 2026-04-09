'use client';
import { useState, useEffect } from 'react';
import { Share, PlusSquare, X, AppWindow } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const InstallPrompt = () => {
  const [show, setShow] = useState(false);
  const [platform, setPlatform] = useState('');

  useEffect(() => {
    const ua = window.navigator.userAgent;
    const isIOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    const isAndroid = /android/i.test(ua);
    
    // Check if running as PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true;

    if (!isStandalone) {
      if (isIOS) setPlatform('ios');
      else if (isAndroid) setPlatform('android');
      
      const hasDismissed = localStorage.getItem('install_prompt_dismissed');
      if (!hasDismissed && (isIOS || isAndroid)) {
        setTimeout(() => setShow(true), 3000);
      }
    }
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem('install_prompt_dismissed', 'true');
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          exit={{ y: 100, opacity: 0 }} 
          className="fixed bottom-6 left-4 right-4 bg-zinc-800/90 backdrop-blur-2xl border border-white/20 p-4 rounded-[28px] z-[60] shadow-2xl max-w-sm mx-auto"
        >
          <button onClick={dismiss} className="absolute top-4 right-4 p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white/70 hover:text-white transition-colors">
            <X size={14} />
          </button>
          <div className="flex gap-4 items-center pr-6">
            <div className="w-14 h-14 bg-gradient-to-tr from-cyan-600 to-indigo-600 rounded-[18px] shrink-0 flex items-center justify-center border border-white/20 shadow-inner">
               <AppWindow className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-bold text-sm tracking-wide">Установить как приложение</h4>
              <p className="text-white/60 text-xs mt-1.5 leading-relaxed">
                {platform === 'ios' ? (
                  <>Нажмите <Share size={12} className="inline mx-0.5 text-blue-400" /> внизу и выберите <br/><b className="text-white">На экран «Домой»</b> <PlusSquare size={12} className="inline mx-0.5" /></>
                ) : (
                  <>Нажмите на меню браузера и выберите <br/><b className="text-white">Добавить на гл. экран</b></>
                )}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
