'use client';

import { useStore } from '@/store/useStore';
import { Settings2, MessageSquareHeart, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingNav = () => {
  const { 
    isSettingsOpen, setIsSettingsOpen, 
    isFeedbackOpen, setIsFeedbackOpen,
    isGuideOpen, setIsGuideOpen,
    isPlaying
  } = useStore();

  const navItems = [
    { 
      id: 'settings', 
      icon: Settings2, 
      active: isSettingsOpen, 
      onClick: () => {
        setIsSettingsOpen(!isSettingsOpen);
        setIsFeedbackOpen(false);
        setIsGuideOpen(false);
      }
    },
    { 
      id: 'feedback', 
      icon: MessageSquareHeart, 
      active: isFeedbackOpen, 
      onClick: () => {
        setIsFeedbackOpen(!isFeedbackOpen);
        setIsSettingsOpen(false);
        setIsGuideOpen(false);
      }
    },
    { 
      id: 'guide', 
      icon: HelpCircle, 
      active: isGuideOpen, 
      onClick: () => {
        setIsGuideOpen(!isGuideOpen);
        setIsSettingsOpen(false);
        setIsFeedbackOpen(false);
      }
    },
  ];

  return (
    <AnimatePresence>
      {!isPlaying && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed left-4 top-4 md:left-6 md:top-6 z-40 flex flex-col gap-2"
        >
          <div className="flex flex-col gap-1.5 p-1.5 rounded-[22px] bg-[#0a0a0c]/40 backdrop-blur-2xl border border-white/10 shadow-2xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className={`relative w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-[18px] transition-all duration-300 group
                    ${item.active 
                      ? 'bg-white text-zinc-950 shadow-[0_8px_16px_-4px_rgba(255,255,255,0.2)] scale-[0.98]' 
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95'
                    }`}
                >
                  <Icon size={item.id === 'feedback' ? 24 : 22} />
                  
                  {/* Subtle Indicator dot for active states */}
                  {item.active && (
                    <motion.div 
                      layoutId="active-nav-bg"
                      className="absolute inset-0 rounded-[18px] ring-2 ring-white/20"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
