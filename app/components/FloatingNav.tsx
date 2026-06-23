'use client';

import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Settings2, MessageSquareHeart, HelpCircle, LifeBuoy, Users, Github, Heart, ClipboardList, BookOpen, Repeat, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useT } from '../i18n/useT';

// Tooltip that springs out to the right of a nav rail button: a 3D hinge-open
// with overshoot, a popping caret, an accent glow, a pulsing dot and a one-shot
// shimmer sweep across the pill.
function NavTooltip({ label, visible }: { label: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="tooltip"
          initial={{ opacity: 0, x: -14, scale: 0.7, rotateY: -45 }}
          animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, x: -8, scale: 0.85, rotateY: -22, transition: { duration: 0.14, ease: 'easeIn' } }}
          transition={{ type: 'spring', stiffness: 520, damping: 17, mass: 0.7 }}
          style={{ transformPerspective: 700, transformOrigin: 'left center' }}
          className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 -translate-y-1/2"
        >
          {/* Caret that pops in just after the pill */}
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.06, type: 'spring', stiffness: 600, damping: 20 }}
            className="absolute -left-[5px] top-1/2 -translate-y-1/2 h-0 w-0 origin-right"
            style={{
              borderTop: '5px solid transparent',
              borderBottom: '5px solid transparent',
              borderRight: '6px solid rgba(17,17,21,0.95)',
            }}
          />
          {/* Pill body: gradient surface, accent ring, soft indigo glow, shimmer sweep */}
          <span
            className="relative flex items-center gap-2 overflow-hidden rounded-xl px-3 py-1.5 text-[13px] font-medium text-white whitespace-nowrap backdrop-blur-xl"
            style={{
              background: 'linear-gradient(180deg, rgba(28,28,34,0.95), rgba(12,12,16,0.95))',
              boxShadow:
                '0 0 0 1px rgba(255,255,255,0.08), 0 10px 30px -8px rgba(99,102,241,0.5), 0 4px 12px -4px rgba(0,0,0,0.7)',
            }}
          >
            <motion.span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400"
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ boxShadow: '0 0 8px rgba(129,140,248,0.9)' }}
            />
            <span className="relative z-10">{label}</span>
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              initial={{ x: '-150%' }}
              animate={{ x: '150%' }}
              transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }}
              style={{
                background:
                  'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)',
              }}
            />
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
