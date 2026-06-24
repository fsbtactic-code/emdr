'use client';

import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { Wind, Anchor, Leaf, Sun, EyeOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cueStepCount, clampCueStep, type CueTechnique } from '../content/cues';
import { useT } from '../i18n/useT';
import { ACCENTS, TYPE } from './ui/tokens';

const shapeClass = (shape: string) => {
  switch (shape) {
    case 'square': return 'rounded-[4px]';
    case 'ring': return 'rounded-full border-[3px] bg-transparent';
    case 'butterfly': return 'rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%]';
    default: return 'rounded-full';
  }
};

const CUE_META: Record<
  CueTechnique,
  { Icon: typeof Wind; tint: string; ring: string }
> = {
  butterfly: { Icon: Wind, tint: ACCENTS.calm.text, ring: ACCENTS.calm.fill },
  breathing: { Icon: Anchor, tint: ACCENTS.info.text, ring: ACCENTS.info.fill },
  grounding: { Icon: Leaf, tint: ACCENTS.success.text, ring: ACCENTS.success.fill },
  lightstream: { Icon: Sun, tint: ACCENTS.warn.text, ring: ACCENTS.warn.fill },
};

// framer-motion % on x/y resolves against the element (14px), not the container - animate in px instead
export function MiniStimPreview() {
  const speed = useStore((s) => s.speed);
  const pattern = useStore((s) => s.pattern);
  const color = useStore((s) => s.color);
  const amplitude = useStore((s) => s.amplitude);
  const isPlaying = useStore((s) => s.isPlaying);
  const targetShape = useStore((s) => s.targetShape);
  const isSaccadic = useStore((s) => s.isSaccadic);
  const visualEnabled = useStore((s) => s.visualEnabled);
  const clientCue = useStore((s) => s.clientCue);
  const cueStep = useStore((s) => s.cueStep);
  const t = useT();

  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 360, h: 200 });
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const trip = 1 / (2 * Math.max(0.1, speed));
  const ease = isSaccadic ? ('circInOut' as const) : ('linear' as const);

  const amp = Math.max(20, Math.min(100, amplitude)) / 100;
  const dotSize = 14;
  const hx = Math.max(0, (box.w / 2 - dotSize) * 0.94 * amp);
  const hy = Math.max(0, (box.h / 2 - dotSize) * 0.9 * amp);
  const lx = hx * 0.92;
  const ly = hy * 0.72;

  const isRing = targetShape === 'ring';
  const dotStyle: React.CSSProperties = {
    width: dotSize,
    height: dotSize,
    boxShadow: `0 0 8px ${color}aa, 0 0 16px ${color}55`,
    ...(isRing ? { borderColor: color } : { backgroundColor: color }),
  };
  const dotClass = `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${shapeClass(targetShape)}`;

  const sweep = { duration: trip, repeat: Infinity, repeatType: 'mirror' as const, ease };

  const renderMoving = () => {
    const common = { className: dotClass, style: dotStyle };

    switch (pattern) {
      case 'vertical':
        return <motion.div {...common} animate={{ y: [-hy, hy] }} transition={{ y: sweep }} />;
      case 'diagonal-1':
        return (
          <motion.div {...common} animate={{ x: [-hx, hx], y: [-hy, hy] }} transition={{ x: sweep, y: sweep }} />
        );
      case 'diagonal-2':
        return (
          <motion.div {...common} animate={{ x: [-hx, hx], y: [hy, -hy] }} transition={{ x: sweep, y: sweep }} />
        );
      case 'lemniscate':
        return (
          <motion.div
            {...common}
            animate={{ x: [0, lx, 0, -lx, 0], y: [0, -ly, 0, ly, 0] }}
            transition={{
              x: { duration: trip * 2, repeat: Infinity, ease },
              y: { duration: trip * 2, repeat: Infinity, ease },
            }}
          />
        );
      case 'dots':
        return (
          <>
            <motion.div
              className={`absolute top-1/2 -translate-y-1/2 ${shapeClass(targetShape)}`}
              style={{ ...dotStyle, left: '8%' }}
              animate={{ opacity: [1, 0.15], scale: [1, 0.7] }}
              transition={{ duration: trip, repeat: Infinity, repeatType: 'reverse', ease }}
            />
            <motion.div
              className={`absolute top-1/2 -translate-y-1/2 ${shapeClass(targetShape)}`}
              style={{ ...dotStyle, right: '8%' }}
              animate={{ opacity: [0.15, 1], scale: [0.7, 1] }}
              transition={{ duration: trip, repeat: Infinity, repeatType: 'reverse', ease }}
            />
          </>
        );
      case 'pulse':
        return (
          <motion.div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${shapeClass(targetShape)}`}
            style={dotStyle}
            animate={{ scale: [1, 3.4], opacity: [0.85, 0] }}
            transition={{ duration: trip, repeat: Infinity, repeatType: 'reverse', ease }}
          />
        );
      case 'bars':
        return (
          <div className="absolute inset-0 flex items-center justify-between px-[10%]">
            {[0, 1].map((i) => (
              <motion.div
                key={i}
                className="rounded-[3px]"
                style={{ width: 8, height: '64%', backgroundColor: color, boxShadow: `0 0 8px ${color}aa` }}
                animate={{ opacity: i === 0 ? [1, 0.1] : [0.1, 1] }}
                transition={{ duration: trip, repeat: Infinity, repeatType: 'reverse', ease }}
              />
            ))}
          </div>
        );
      case 'zigzag':
        return (
          <motion.div
            {...common}
            animate={{ x: [-hx, hx], y: [-hy, hy, -hy, hy, -hy] }}
            transition={{
              x: { duration: trip, repeat: Infinity, repeatType: 'mirror', ease },
              y: { duration: trip * 5, repeat: Infinity, ease: 'linear' },
            }}
          />
        );
      default:
        return <motion.div {...common} animate={{ x: [-hx, hx] }} transition={{ x: sweep }} />;
    }
  };

  const renderCueAnimation = (tech: CueTechnique) => {
    if (tech === 'butterfly') {
      return (
        <div className="absolute inset-0 flex items-center justify-center gap-1.5">
          {[-1, 1].map((dir) => (
            <motion.div
              key={dir}
              className="w-10 h-12 rounded-[60%_40%_50%_50%_/_60%_60%_40%_40%]"
              style={{ background: `${ACCENTS.calm.hex}38`, transformOrigin: dir < 0 ? 'right center' : 'left center' }}
              animate={{ scaleX: [1, 0.7, 1], opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
      );
    }
    if (tech === 'breathing') {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 rounded-full"
            style={{ background: `${ACCENTS.info.hex}29`, border: `1px solid ${ACCENTS.info.hex}66` }}
            animate={{ scale: [0.7, 1.25, 1.25, 0.7], opacity: [0.4, 0.8, 0.8, 0.4] }}
            transition={{ duration: 8, times: [0, 0.25, 0.75, 1], repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      );
    }
    if (tech === 'lightstream') {
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-20 h-20 rounded-full"
            style={{ background: `radial-gradient(circle, ${ACCENTS.warn.hex}73 0%, ${ACCENTS.warn.hex}2e 60%, transparent 85%)` }}
            animate={{ scale: [1, 1.2, 0.92, 1], opacity: [0.7, 1, 0.65, 0.7] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      );
    }
    return (
      <div className="absolute inset-0 flex items-end justify-center pb-6">
        <motion.div
          className="w-28 h-10 rounded-full blur-md"
          style={{ background: `${ACCENTS.success.hex}38` }}
          animate={{ opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    );
  };

  const cueActive = clientCue !== 'none';
  const tech = cueActive ? (clientCue as CueTechnique) : null;
  const cueMeta = tech ? CUE_META[tech] : null;
  const stepIdx = tech ? clampCueStep(tech, cueStep) : 0;
  const stepTotal = tech ? cueStepCount(tech) : 0;
  const cueName = tech ? t.cueContent[tech].title : '';
  const pausedLabel = t.previewPaused;
  const noVisualLabel = t.previewVisualOff;

  // one mode at a time: cue technique, else moving stimulation, else static/paused target
  return (
    <div ref={boxRef} className="relative w-full aspect-video rounded-2xl overflow-hidden bg-zinc-950">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-8 -left-6 w-32 h-32 bg-cyan-600/10 blur-[40px] rounded-full" />
        <div className="absolute -bottom-8 -right-6 w-32 h-32 bg-emerald-600/10 blur-[40px] rounded-full" />
      </div>

      {cueActive && tech && cueMeta ? (
        <>
          <div className="absolute inset-0">{renderCueAnimation(tech)}</div>
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2">
            <div className={`flex items-center gap-1.5 ${cueMeta.ring} ${cueMeta.tint} pl-2 pr-2.5 py-1 rounded-full text-[11px] font-medium`}>
              <cueMeta.Icon size={12} className="shrink-0" />
              <span className="whitespace-nowrap">{cueName}</span>
            </div>
          </div>
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2">
            <span className={`${TYPE.label} tabular-nums ${cueMeta.tint}`}>
              {t.stepLabel} {stepIdx + 1}/{stepTotal}
            </span>
          </div>
        </>
      ) : !visualEnabled ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
          <EyeOff size={18} className="text-white/25" />
          <span className={`${TYPE.label} text-white/25`}>{noVisualLabel}</span>
        </div>
      ) : (
        <>
          <div className="absolute inset-0">
            {isPlaying ? renderMoving() : <div className={dotClass} style={dotStyle} />}
          </div>
          {!isPlaying && (
            <div className={`absolute bottom-2.5 left-1/2 -translate-x-1/2 ${TYPE.label} text-white/25`}>
              {pausedLabel}
            </div>
          )}
        </>
      )}
    </div>
  );
}
