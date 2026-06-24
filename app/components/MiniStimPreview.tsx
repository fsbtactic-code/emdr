'use client';

import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import { Wind, Anchor, Leaf } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Shape rendering for the miniature target. Mirrors StimulationEngine.getShapeClasses
// but sized for the small preview box (no symbols, no audio, host-local).
const shapeClass = (shape: string) => {
  switch (shape) {
    case 'square': return 'rounded-[4px]';
    case 'ring': return 'rounded-full border-[3px] bg-transparent';
    case 'butterfly': return 'rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%]';
    default: return 'rounded-full';
  }
};

// Resource techniques the host can push onto the client screen. Each has a local
// (ru/en) label and an icon, so the practitioner immediately recognises what the
// client is currently looking at instead of the stimulation.
const CUE_META: Record<
  'butterfly' | 'breathing' | 'grounding',
  { ru: string; en: string; Icon: typeof Wind; tint: string; ring: string }
> = {
  butterfly: { ru: 'Бабочка', en: 'Butterfly', Icon: Wind, tint: 'text-violet-200', ring: 'bg-violet-500/15' },
  breathing: { ru: 'Дыхание', en: 'Breathing', Icon: Anchor, tint: 'text-cyan-200', ring: 'bg-cyan-500/15' },
  grounding: { ru: 'Заземление', en: 'Grounding', Icon: Leaf, tint: 'text-emerald-200', ring: 'bg-emerald-500/15' },
};

// A faithful but compact replica of what the client sees. Reads the SAME live
// store params that get broadcast to the client (speed, pattern, color, amplitude,
// isPlaying, targetShape, clientCue), so this is a true reflection of the client
// screen.
//
// IMPORTANT: framer-motion percentage strings on x/y resolve against the ELEMENT's
// own box (14px here), not the container, which is why the old preview barely moved.
// We measure the box and animate in PIXELS so the travel is wide and visible.
export function MiniStimPreview() {
  const speed = useStore((s) => s.speed);
  const pattern = useStore((s) => s.pattern);
  const color = useStore((s) => s.color);
  const amplitude = useStore((s) => s.amplitude);
  const isPlaying = useStore((s) => s.isPlaying);
  const targetShape = useStore((s) => s.targetShape);
  const isSaccadic = useStore((s) => s.isSaccadic);
  const clientCue = useStore((s) => s.clientCue);
  const lang = useStore((s) => s.lang);

  // Measure the preview box so motion can be expressed in pixels.
  const boxRef = useRef<HTMLDivElement>(null);
  const [box, setBox] = useState({ w: 360, h: 160 });
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const measure = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // seconds per one-way sweep, matching StimulationEngine (tripDuration = 1 / (2*speed))
  const trip = 1 / (2 * Math.max(0.1, speed));
  const ease = isSaccadic ? ('circInOut' as const) : ('linear' as const);

  // amplitude 40..100 -> how wide the target travels across the box. At 100% it
  // sweeps almost the full width (about 6%..94%), at 40% it stays nearer the centre.
  const amp = Math.max(20, Math.min(100, amplitude)) / 100;
  const dotSize = 14;
  // half-ranges in PIXELS, leaving a small margin (and room for the dot itself).
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
        // two static targets near each edge, alternating opacity/scale
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
        // single expanding ring from centre
        return (
          <motion.div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${shapeClass(targetShape)}`}
            style={dotStyle}
            animate={{ scale: [1, 3.4], opacity: [0.85, 0] }}
            transition={{ duration: trip, repeat: Infinity, repeatType: 'reverse', ease }}
          />
        );
      case 'bars':
        // two vertical bars near the edges, alternating opacity
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
        // horizontal
        return <motion.div {...common} animate={{ x: [-hx, hx] }} transition={{ x: sweep }} />;
    }
  };

  // Soft, low-key representation of the active resource technique, shown to the
  // practitioner so they SEE the client is on a calming exercise, not the stimulation.
  const renderCue = () => {
    if (clientCue === 'butterfly') {
      // two gently flapping wings (butterfly hug)
      return (
        <div className="absolute inset-0 flex items-center justify-center gap-1.5">
          {[-1, 1].map((dir) => (
            <motion.div
              key={dir}
              className="w-10 h-12 rounded-[60%_40%_50%_50%_/_60%_60%_40%_40%]"
              style={{ background: 'rgba(167,139,250,0.22)', transformOrigin: dir < 0 ? 'right center' : 'left center' }}
              animate={{ scaleX: [1, 0.7, 1], opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          ))}
        </div>
      );
    }
    if (clientCue === 'breathing') {
      // a single slow breathing circle
      return (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-16 h-16 rounded-full"
            style={{ background: 'rgba(34,211,238,0.16)', border: '1px solid rgba(34,211,238,0.4)' }}
            animate={{ scale: [0.7, 1.25, 1.25, 0.7], opacity: [0.4, 0.8, 0.8, 0.4] }}
            transition={{ duration: 8, times: [0, 0.25, 0.75, 1], repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      );
    }
    // grounding: soft settled glow at the base
    return (
      <div className="absolute inset-0 flex items-end justify-center pb-6">
        <motion.div
          className="w-28 h-10 rounded-full blur-md"
          style={{ background: 'rgba(16,185,129,0.22)' }}
          animate={{ opacity: [0.35, 0.6, 0.35] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    );
  };

  const cueActive = clientCue !== 'none';
  const cueMeta = cueActive ? CUE_META[clientCue] : null;
  const cuePrefix = lang === 'ru' ? 'Клиенту' : 'Client';
  const pausedLabel = lang === 'ru' ? 'пауза' : 'paused';

  return (
    <div ref={boxRef} className="relative w-full h-[160px] rounded-2xl overflow-hidden bg-zinc-950 border border-transparent">
      {/* soft ambient glow, echoes the aurora background without the heavy blur layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-8 -left-6 w-32 h-32 bg-blue-600/10 blur-[40px] rounded-full" />
        <div className="absolute -bottom-8 -right-6 w-32 h-32 bg-emerald-600/10 blur-[40px] rounded-full" />
      </div>

      {/* When a resource technique is pushed to the client, it REPLACES the
          stimulation on the client screen, so we mirror that here. */}
      {cueActive ? (
        <div className="absolute inset-0">{renderCue()}</div>
      ) : (
        <div className="absolute inset-0">
          {isPlaying ? renderMoving() : <div className={dotClass} style={dotStyle} />}
        </div>
      )}

      {/* Cue badge: top-center, always legible while a technique is active. */}
      {cueActive && cueMeta && (
        <div className="absolute top-2.5 left-1/2 -translate-x-1/2">
          <div className={`flex items-center gap-1.5 ${cueMeta.ring} ${cueMeta.tint} pl-2 pr-2.5 py-1 rounded-full text-[11px] font-medium`}>
            <cueMeta.Icon size={12} className="shrink-0" />
            <span className="whitespace-nowrap">{cuePrefix}: {lang === 'ru' ? cueMeta.ru : cueMeta.en}</span>
          </div>
        </div>
      )}

      {/* Paused hint, only when not playing and no cue is shown. */}
      {!isPlaying && !cueActive && (
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.18em] font-semibold text-white/25">
          {pausedLabel}
        </div>
      )}
    </div>
  );
}
