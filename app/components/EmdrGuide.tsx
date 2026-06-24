'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown, Shield, Target, Brain, Eye, Heart, AlertTriangle,
  ListOrdered, Sparkles, BookOpen, ExternalLink, LifeBuoy
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { EVIDENCE_ORDER, REFERENCES } from '../content';
import type { EvidenceLevel } from '../content';
import { useT } from '../i18n/useT';
import { IconButton } from './ui/IconButton';
import { Button } from './ui/Button';
import { InfoBanner } from './ui/InfoBanner';
import { cn } from './ui/cn';

const Para = ({ text }: { text: string }) => (
  <div className="text-[13px] text-white/60 leading-[1.7] whitespace-pre-line">{text}</div>
);

/**
 * Evidence level badge classes from DS ACCENTS palette.
 * strong=emerald, moderate=cyan, emerging=amber, insufficient=rose.
 */
const evidenceLevelClasses: Record<EvidenceLevel, { fill: string; text: string; border: string }> = {
  strong:       { fill: 'bg-emerald-500/15', text: 'text-emerald-200', border: 'border-emerald-500/20' },
  moderate:     { fill: 'bg-cyan-500/15',    text: 'text-cyan-200',    border: 'border-cyan-500/20'    },
  emerging:     { fill: 'bg-amber-500/12',   text: 'text-amber-200',   border: 'border-amber-500/20'   },
  insufficient: { fill: 'bg-rose-500/15',    text: 'text-rose-200',    border: 'border-rose-500/20'    },
};

export const EmdrGuide = () => {
  const { isGuideOpen: isOpen, setIsGuideOpen: setIsOpen, setIsGroundingOpen } = useStore();
  const t = useT();
  const [expanded, setExpanded] = useState<string | null>('what');

  const sections = [
    { id: 'what', icon: Brain, color: 'text-cyan-400', title: t.gWhat, body: <Para text={t.whatIs} /> },
    { id: 'how', icon: Eye, color: 'text-indigo-400', title: t.gHow, body: <Para text={t.mechanism} /> },
    {
      id: 'evidence', icon: Target, color: 'text-emerald-400', title: t.gEvidence,
      body: (
        <div className="flex flex-col gap-2">
          <p className="text-[12px] text-white/45 leading-relaxed mb-1">{t.evidenceIntro}</p>
          {EVIDENCE_ORDER.map((key) => {
            const row = t.evidence[key];
            const c = evidenceLevelClasses[row.level];
            return (
              <div key={key} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                <div className="flex items-center justify-between gap-3 mb-1">
                  <span className="text-[13px] font-medium text-white/90">{row.condition}</span>
                  <span
                    className={cn(
                      'shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] px-2 py-1 rounded-lg border whitespace-nowrap',
                      c.fill, c.text, c.border
                    )}
                  >
                    {t.levelLabels[row.level]}
                  </span>
                </div>
                <p className="text-[12px] text-white/45 leading-relaxed">{row.note}</p>
              </div>
            );
          })}
        </div>
      )
    },
    {
      id: 'protocol', icon: ListOrdered, color: 'text-amber-400', title: t.gProtocol,
      body: (
        <div className="flex flex-col gap-2">
          <p className="text-[12px] text-white/45 leading-relaxed mb-1">{t.protocolIntro}</p>
          {t.phases.map((p) => (
            <div key={p.n} className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-white/[0.06] border border-white/[0.06] flex items-center justify-center text-[12px] font-bold text-white/70">
                {p.n}
              </span>
              <div>
                <div className="text-[13px] font-medium text-white/90">{p.name}</div>
                <div className="text-[12px] text-white/45 leading-relaxed mt-0.5">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      )
    },
    { id: 'positioning', icon: Heart, color: 'text-rose-400', title: t.gPositioning, body: <Para text={t.positioning} /> },
    {
      id: 'safety', icon: AlertTriangle, color: 'text-amber-400', title: t.gSafety,
      body: (
        <div className="flex flex-col gap-4">
          <Para text={t.safetyStop} />
          <Button
            variant="success"
            size="md"
            iconLeft={<LifeBuoy size={15} />}
            onClick={() => { setIsGroundingOpen(true); setIsOpen(false); }}
            className="w-full justify-center"
          >
            {t.openGrounding}
          </Button>
          <div>
            <div className="flex items-center gap-2 text-[12px] font-semibold text-rose-200 uppercase tracking-[0.14em] mb-2">
              <Shield size={13} /> {t.notStartAlone}
            </div>
            <div className="flex flex-col gap-1.5">
              {t.contraindications.map((c) => (
                <div key={c} className="text-[12px] text-white/60 leading-relaxed flex gap-2">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-400/70 shrink-0" />
                  {c}
                </div>
              ))}
            </div>
          </div>
          <InfoBanner accent="warn">
            <p className="text-[12px] text-amber-200/70 leading-relaxed">{t.safetyPhoto}</p>
          </InfoBanner>
        </div>
      )
    },
    {
      id: 'relabels', icon: Sparkles, color: 'text-violet-400', title: t.gRelabels,
      body: (
        <div className="flex flex-col gap-2">
          {t.relabels.map((r) => (
            <div key={r.original} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <div className="text-[13px] font-medium text-white/90 mb-1">{r.original}</div>
              <p className="text-[12px] text-white/45 leading-relaxed">{r.verdict}</p>
              <p className="text-[12px] text-emerald-200/70 leading-relaxed mt-1.5">{t.relabelAs} {r.honest}</p>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'refs', icon: BookOpen, color: 'text-cyan-400', title: t.gRefs,
      body: (
        <div className="flex flex-col gap-1.5">
          {REFERENCES.map((ref) => (
            <a
              key={ref.url}
              href={ref.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-2 rounded-lg px-3 py-2 hover:bg-white/[0.04] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-500/50"
            >
              <ExternalLink size={13} className="text-white/25 group-hover:text-white/60 mt-0.5 shrink-0" />
              <span className="text-[12px] text-white/60 group-hover:text-white/90 leading-relaxed">{ref.cite}</span>
            </a>
          ))}
        </div>
      )
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
          className="fixed left-0 top-0 h-full w-full md:w-[520px] bg-[#0a0a0c]/95 backdrop-blur-2xl border-r border-white/[0.06] shadow-2xl z-50 flex flex-col"
        >
          <div className="px-5 pt-5 pb-4 border-b border-white/[0.06] flex items-center justify-between shrink-0">
            <div>
              <h2 className="text-lg font-medium text-white tracking-tight">{t.guideTitle}</h2>
              <p className="text-white/25 text-[12px] mt-0.5">{t.guideSub}</p>
            </div>
            <IconButton
              aria-label="Close"
              variant="ghost"
              size="md"
              onClick={() => setIsOpen(false)}
            >
              <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><line x1="3" y1="3" x2="15" y2="15"/><line x1="15" y1="3" x2="3" y2="15"/></svg>
            </IconButton>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
            <div className="flex flex-col gap-2">
              {sections.map((section) => {
                const Icon = section.icon;
                const isExpanded = expanded === section.id;
                return (
                  <div key={section.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                    <button
                      onClick={() => setExpanded(isExpanded ? null : section.id)}
                      className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-white/[0.03] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/20"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon size={18} className={`${section.color} shrink-0`} />
                        <span className="font-medium text-[14px] text-white/90 text-left">{section.title}</span>
                      </div>
                      <ChevronDown size={14} className={`text-white/25 transition-transform duration-300 shrink-0 ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4">{section.body}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 mb-4">
              <InfoBanner accent="warn">
                <p className="text-[12px] text-amber-200/70 leading-relaxed">
                  <strong className="text-amber-300/90">!</strong> {t.guideImportant}
                </p>
              </InfoBanner>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
