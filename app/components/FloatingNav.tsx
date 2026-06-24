'use client';

import { useState } from 'react';
import { useStore } from '../store/useStore';
import { Settings2, HelpCircle, LifeBuoy, Users, Heart, ClipboardList, BookOpen, Repeat, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useT } from '../i18n/useT';
import { BananaPopup } from './BananaPopup';

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
          <motion.span
            aria-hidden="true"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.06, type: 'spring', stiffness: 600, damping: 20 }}
            className="absolute -left-[5px] top-1/2 -translate-y-1/2 h-0 w-0 origin-right"
            style={{
              borderTop: '5px solid transparent',
              borderBottom: '5px solid transparent',
              borderRight: '6px solid rgba(10,10,12,0.9)',
            }}
          />
          <span className="relative flex items-center rounded-xl px-3.5 py-2 text-[13px] font-semibold text-white/90 whitespace-nowrap bg-[#0a0a0c]/90 backdrop-blur-xl border border-white/[0.06] shadow-[0_8px_24px_-6px_rgba(0,0,0,0.7)]">
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
    isFeedbackOpen: _isFeedbackOpen, setIsFeedbackOpen: _setIsFeedbackOpen,
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

  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [bananaOpen, setBananaOpen] = useState(false);

  const closeAll = () => {
    setIsSettingsOpen(false);
    _setIsFeedbackOpen(false);
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
    <>
      <AnimatePresence>
        {!isPlaying && (
          <motion.div
            key="nav-rail"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed left-4 top-4 md:left-6 md:top-6 z-40 flex flex-col gap-2 overflow-visible"
          >
            <div className="flex flex-col gap-1.5 p-1.5 rounded-2xl bg-[#0a0a0c]/40 backdrop-blur-2xl border border-white/[0.06] shadow-2xl overflow-visible">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isHovered = hoveredId === item.id;
                return (
                  <div key={item.id} className="relative overflow-visible">
                    <button
                      onClick={item.onClick}
                      data-tour={item.id}
                      aria-label={item.title}
                      aria-pressed={item.active}
                      onMouseEnter={() => setHoveredId(item.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onFocus={() => setHoveredId(item.id)}
                      onBlur={() => setHoveredId(null)}
                      className={`relative w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-xl transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950
                        ${item.active
                          ? 'bg-white text-zinc-950 shadow-[0_8px_16px_-4px_rgba(255,255,255,0.2)] scale-[0.98] focus-visible:ring-white/30'
                          : item.id === 'grounding'
                            ? 'bg-emerald-500/15 text-emerald-300/80 hover:bg-emerald-500/25 hover:text-emerald-100 hover:scale-105 active:scale-95 focus-visible:ring-emerald-500/50'
                            : 'bg-white/[0.04] text-white/60 hover:bg-white/[0.07] hover:text-white hover:scale-105 active:scale-95 focus-visible:ring-white/20'
                        }`}
                    >
                      <Icon size={22} />
                      {item.active && (
                        <motion.div
                          layoutId="active-nav-bg"
                          className="absolute inset-0 rounded-xl ring-2 ring-white/20"
                        />
                      )}
                    </button>
                    <NavTooltip label={item.title} visible={isHovered} />
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-1.5 p-1.5 rounded-2xl bg-[#0a0a0c]/40 backdrop-blur-2xl border border-white/[0.06] shadow-2xl overflow-visible">
              {appMode && (
                <div className="relative overflow-visible">
                  <button
                    onClick={() => { closeAll(); setOnboardingMode(appMode); setIsOnboardingOpen(true); }}
                    data-tour="onboarding"
                    aria-label={t.navOnboarding}
                    onMouseEnter={() => setHoveredId('onboarding')}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setHoveredId('onboarding')}
                    onBlur={() => setHoveredId(null)}
                    className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.07] hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950"
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
                    data-tour="switch"
                    aria-label={t.modeSwitch}
                    onMouseEnter={() => setHoveredId('switch')}
                    onMouseLeave={() => setHoveredId(null)}
                    onFocus={() => setHoveredId('switch')}
                    onBlur={() => setHoveredId(null)}
                    className="w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-white/[0.04] text-white/60 hover:text-white hover:bg-white/[0.07] hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950"
                  >
                    <Repeat size={20} />
                  </button>
                  <NavTooltip label={t.modeSwitch} visible={hoveredId === 'switch'} />
                </div>
              )}
              <div className="relative overflow-visible">
                <button
                  onClick={() => setBananaOpen(true)}
                  aria-label="O proekte"
                  onMouseEnter={() => setHoveredId('banana')}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId('banana')}
                  onBlur={() => setHoveredId(null)}
                  className="group w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-white/[0.04] hover:bg-white/[0.07] hover:scale-105 active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-1 focus-visible:ring-offset-zinc-950"
                >
                  {/* render the banana as a white monochrome glyph to match the other rail icons */}
                  <img
                    src="/banana.png"
                    alt=""
                    className="w-6 h-6 object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ filter: 'brightness(0) invert(1)' }}
                  />
                </button>
                <NavTooltip label="O proekte" visible={hoveredId === 'banana'} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BananaPopup open={bananaOpen} onClose={() => setBananaOpen(false)} />
    </>
  );
};
