'use client';

import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Settings2, MessageSquareHeart, HelpCircle, LifeBuoy, Users, Github, Heart, ClipboardList, BookOpen, Repeat, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useT } from '../i18n/useT';

// Animated tooltip that appears to the right of the nav rail button
function NavTooltip({ label, visible }: { label: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="tooltip"
          initial={{ opacity: 0, x: -6, scale: 0.92 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -4, scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 420, damping: 28, mass: 0.6 }}
          className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2"
        >
          {/* Left-pointing caret */}
          <span
            aria-hidden="true"
            className="absolute -left-[5px] top-1/2 -translate-y-1/2 h-0 w-0"
            style={{
              borderTop: '5px solid transparent',
              borderBottom: '5px solid transparent',
              borderRight: '5px solid rgba(10,10,12,0.92)',
            }}
          />
          {/* Pill body */}
          <span className="relative flex items-center rounded-xl bg-[#0a0a0c]/90 px-3 py-1.5 text-[13px] font-medium text-white shadow-[0_8px_24px_-4px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.06)] backdrop-blur-xl whitespace-nowrap">
            {label}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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

  // Track which button is hovered by id string (null = none)
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const closeAll = () => {
    setIsSettingsOpen(false);
    setIsFeedbackOpen(false);
    setIsGuideOpen(false);
    setIsSessionOpen(false);
    setIsResourcesOpen(false);
    setIsClinicalOpen(false);
    setIsJournalOpen(false);
  };

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
          // overflow-visible so tooltips aren't clipped by the rail container
          className="fixed left-4 top-4 md:left-6 md:top-6 z-40 flex flex-col gap-2 overflow-visible"
        >
          {/* Main nav group */}
          <div className="flex flex-col gap-1.5 p-1.5 rounded-[22px] bg-[#0a0a0c]/40 backdrop-blur-2xl border border-white/[0.08] shadow-2xl overflow-visible">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isHovered = hoveredId === item.id;
              return (
                <div key={item.id} className="relative overflow-visible">
                  <button
                    onClick={item.onClick}
                    aria-label={item.title}
                    onMouseEnter={() => setHoveredId(item.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setHoveredId(item.id)}
                    onBlur={() => setHoveredId(null)}
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
                  <NavTooltip label={item.title} visible={isHovered} />
                </div>
              );
            })}
          </div>

          {/* Bottom group: onboarding, switch-mode, GitHub */}
          <div className="flex flex-col gap-1.5 p-1.5 rounded-[22px] bg-[#0a0a0c]/40 backdrop-blur-2xl border border-white/[0.08] shadow-2xl overflow-visible">
            {appMode && (
              <div className="relative overflow-visible">
                <button
                  onClick={() => { closeAll(); setOnboardingMode(appMode); setIsOnboardingOpen(true); }}
                  aria-label={t.navOnboarding}
                  onMouseEnter={() => setHoveredId('onboarding')}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId('onboarding')}
                  onBlur={() => setHoveredId(null)}
                  className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-[18px] bg-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all"
                >
                  <GraduationCap size={20} />
                </button>
                <NavTooltip label={t.navOnboarding} visible={hoveredId === 'onboarding'} />
              </div>
            )}
            {appMode && (
              <div className="relative overflow-visible">
                <button
                  onClick={() => { closeAll(); setAppMode(null); }}
                  aria-label={t.modeSwitch}
                  onMouseEnter={() => setHoveredId('switch')}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId('switch')}
                  onBlur={() => setHoveredId(null)}
                  className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-[18px] bg-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all"
                >
                  <Repeat size={20} />
                </button>
                <NavTooltip label={t.modeSwitch} visible={hoveredId === 'switch'} />
              </div>
            )}
            <div className="relative overflow-visible">
              <a
                href="https://github.com/fsbtactic-code/emdr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                onMouseEnter={() => setHoveredId('github')}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId('github')}
                onBlur={() => setHoveredId(null)}
                className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-[18px] bg-white/5 text-white/60 hover:text-white hover:bg-white/10 hover:scale-105 active:scale-95 transition-all"
              >
                <Github size={20} />
              </a>
              <NavTooltip label="GitHub" visible={hoveredId === 'github'} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
