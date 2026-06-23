'use client';

import { useStore } from '../store/useStore';
import { Settings2, MessageSquareHeart, HelpCircle, LifeBuoy, Users, Github, Heart, ClipboardList, BookOpen, Repeat, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useT } from '../i18n/useT';

export const FloatingNav = () => {
  const {
    isSettingsOpen, setIsSettingsOpen,
    isFeedbackOpen, setIsFeedbackOpen,
    isGuideOpen, setIsGuideOpen,
    isSessionOpen, setIsSessionOpen,
    isResourcesOpen, setIsResourcesOpen,
    isClinicalOpen, setIsClinicalOpen,
    isJournalOpen, setIsJournalOpen,
    setIsGroundingOpen,
    appMode, setAppMode,
    setOnboardingMode, setIsOnboardingOpen,
    isPlaying
  } = useStore();
  const t = useT();

  const closeAll = () => {
    setIsSettingsOpen(false);
    setIsFeedbackOpen(false);
    setIsGuideOpen(false);
    setIsSessionOpen(false);
    setIsResourcesOpen(false);
    setIsClinicalOpen(false);
    setIsJournalOpen(false);
  };

  // specialistOnly items only appear in practitioner mode, so nothing clinical
  // is shown to a self-help user. Common items appear in both modes.
  const allNavItems = [
    {
      id: 'settings',
      icon: Settings2,
      active: isSettingsOpen,
      title: t.navSettings,
      onClick: () => { const v = !isSettingsOpen; closeAll(); setIsSettingsOpen(v); }
    },
    {
      id: 'guide',
      icon: HelpCircle,
      active: isGuideOpen,
      title: t.navGuide,
      onClick: () => { const v = !isGuideOpen; closeAll(); setIsGuideOpen(v); }
    },
    {
      id: 'session',
      icon: Users,
      specialistOnly: true,
      active: isSessionOpen,
      title: t.sessHost,
      onClick: () => { const v = !isSessionOpen; closeAll(); setIsSessionOpen(v); }
    },
    {
      id: 'clinical',
      icon: ClipboardList,
      specialistOnly: true,
      active: isClinicalOpen,
      title: t.tpTitle,
      onClick: () => { const v = !isClinicalOpen; closeAll(); setIsClinicalOpen(v); }
    },
    {
      id: 'resources',
      icon: Heart,
      active: isResourcesOpen,
      title: t.navResources,
      onClick: () => { const v = !isResourcesOpen; closeAll(); setIsResourcesOpen(v); }
    },
    {
      id: 'journal',
      icon: BookOpen,
      specialistOnly: true,
      active: isJournalOpen,
      title: t.navJournal,
      onClick: () => { const v = !isJournalOpen; closeAll(); setIsJournalOpen(v); }
    },
    {
      id: 'feedback',
      icon: MessageSquareHeart,
      active: isFeedbackOpen,
      title: t.navFeedback,
      onClick: () => { const v = !isFeedbackOpen; closeAll(); setIsFeedbackOpen(v); }
    },
    {
      id: 'grounding',
      icon: LifeBuoy,
      active: false,
      title: t.navGrounding,
      onClick: () => { closeAll(); setIsGroundingOpen(true); }
    }
  ];

  const navItems = allNavItems.filter(
    (it) => appMode === 'specialist' || !('specialistOnly' in it && it.specialistOnly)
  );

  return (
    <AnimatePresence>
      {!isPlaying && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="fixed left-4 top-4 md:left-6 md:top-6 z-40 flex flex-col gap-2"
        >
          <div className="flex flex-col gap-1.5 p-1.5 rounded-[22px] bg-[#0a0a0c]/40 backdrop-blur-2xl border border-white/[0.08] shadow-2xl">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  title={item.title}
                  aria-label={item.title}
                  className={`relative w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-[18px] transition-all duration-300 group
                    ${item.active
                      ? 'bg-white text-zinc-950 shadow-[0_8px_16px_-4px_rgba(255,255,255,0.2)] scale-[0.98]'
                      : item.id === 'grounding'
                        ? 'bg-emerald-500/10 text-emerald-300/80 hover:bg-emerald-500/20 hover:text-emerald-100 hover:scale-105 active:scale-95'
                        : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white hover:scale-105 active:scale-95'
                    }`}
                >
                  <Icon size={22} />
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

          <div className="flex flex-col gap-1.5 p-1.5 rounded-[22px] bg-[#0a0a0c]/40 backdrop-blur-2xl border border-white/[0.08] shadow-2xl">
            {appMode && (
              <button
                onClick={() => { closeAll(); setOnboardingMode(appMode); setIsOnboardingOpen(true); }}
                title={t.navOnboarding}
                aria-label={t.navOnboarding}
                className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-[18px] bg-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all"
              >
                <GraduationCap size={20} />
              </button>
            )}
            {appMode && (
              <button
                onClick={() => { closeAll(); setAppMode(null); }}
                title={t.modeSwitch}
                aria-label={t.modeSwitch}
                className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-[18px] bg-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all"
              >
                <Repeat size={20} />
              </button>
            )}
            <a
              href="https://github.com/fsbtactic-code/emdr"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              aria-label="GitHub"
              className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-[18px] bg-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all"
            >
              <Github size={20} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
