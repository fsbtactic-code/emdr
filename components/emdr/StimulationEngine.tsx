'use client';

import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { useBilateralAudio } from '@/hooks/useBilateralAudio';
import { useEffect, useState } from 'react';

const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export const StimulationEngine = () => {
  const { speed, color, size, pattern, isPlaying, randomness, cyclesPerSet, setPlaying, incrementSets, isSaccadic, showSymbols } = useStore();
  const [symbol, setSymbol] = useState('');
  
  useBilateralAudio();

  // Auto-stop after standard EMDR set
  useEffect(() => {
    if (!isPlaying) return;
    const durationMs = 1000 * (cyclesPerSet / speed);
    const timer = setTimeout(() => {
      setPlaying(false);
      incrementSets();
    }, durationMs);
    return () => clearTimeout(timer);
  }, [isPlaying, speed, cyclesPerSet, setPlaying, incrementSets]);

  // Symbol generator
  useEffect(() => {
    if (!isPlaying || !showSymbols) {
      setSymbol('');
      return;
    }
    const intervalMs = (1 / speed) * 1000;
    const interval = setInterval(() => {
      setSymbol(CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]);
    }, intervalMs / 2); // Change at every edge
    
    // Initial symbol
    setSymbol(CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]);
    return () => clearInterval(interval);
  }, [isPlaying, showSymbols, speed]);

  const glowShadow = `0 0 20px ${color}80, 0 0 40px ${color}40`;
  const tripDuration = 1 / (2 * speed);
  
  const jX = 20 * (randomness / 100);
  const jY = 20 * (randomness / 100);

  const easing = isSaccadic ? "circInOut" : "linear";

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none z-0">
      <motion.div 
        className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center mx-12"
        animate={isPlaying && randomness > 0 ? { x: [0, jX, 0, -jX, 0], y: [0, jY, 0, -jY, 0] } : { x: 0, y: 0 }}
        transition={{ duration: tripDuration * 0.83, repeat: Infinity, ease: 'easeInOut' }}
      >
        
        {pattern === 'horizontal' && (
          <motion.div
            className="rounded-full absolute flex items-center justify-center text-white font-bold"
            style={{ width: size, height: size, backgroundColor: color, boxShadow: glowShadow, fontSize: size * 0.5 }}
            animate={isPlaying ? { x: ['-45vw', '45vw'] } : { x: 0 }}
            transition={{
              x: isPlaying ? { duration: tripDuration, ease: easing, repeat: Infinity, repeatType: 'mirror' } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }}
          >
            {showSymbols && <span className="mix-blend-difference">{symbol}</span>}
          </motion.div>
        )}

        {pattern === 'vertical' && (
          <motion.div
            className="rounded-full absolute flex items-center justify-center text-white font-bold"
            style={{ width: size, height: size, backgroundColor: color, boxShadow: glowShadow, fontSize: size * 0.5 }}
            animate={isPlaying ? { y: ['-35vh', '35vh'] } : { y: 0 }}
            transition={{
              y: isPlaying ? { duration: tripDuration, ease: easing, repeat: Infinity, repeatType: 'mirror' } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }}
          >
            {showSymbols && <span className="mix-blend-difference">{symbol}</span>}
          </motion.div>
        )}

        {pattern === 'diagonal-1' && (
          <motion.div
             className="rounded-full absolute flex items-center justify-center text-white font-bold"
             style={{ width: size, height: size, backgroundColor: color, boxShadow: glowShadow, fontSize: size * 0.5 }}
            animate={isPlaying ? { x: ['-45vw', '45vw'], y: ['-35vh', '35vh'] } : { x: 0, y: 0 }}
            transition={{
              x: isPlaying ? { duration: tripDuration, ease: easing, repeat: Infinity, repeatType: 'mirror' } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              y: isPlaying ? { duration: tripDuration, ease: easing, repeat: Infinity, repeatType: 'mirror' } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }}
          >
            {showSymbols && <span className="mix-blend-difference">{symbol}</span>}
          </motion.div>
        )}

        {pattern === 'diagonal-2' && (
          <motion.div
             className="rounded-full absolute flex items-center justify-center text-white font-bold"
             style={{ width: size, height: size, backgroundColor: color, boxShadow: glowShadow, fontSize: size * 0.5 }}
            animate={isPlaying ? { x: ['-45vw', '45vw'], y: ['35vh', '-35vh'] } : { x: 0, y: 0 }}
            transition={{
              x: isPlaying ? { duration: tripDuration, ease: easing, repeat: Infinity, repeatType: 'mirror' } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              y: isPlaying ? { duration: tripDuration, ease: easing, repeat: Infinity, repeatType: 'mirror' } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }}
          >
            {showSymbols && <span className="mix-blend-difference">{symbol}</span>}
          </motion.div>
        )}

        {pattern === 'dots' && isPlaying && (
          <DotsPattern size={size} color={color} shadow={glowShadow} tripDuration={tripDuration} symbol={symbol} showSymbols={showSymbols} isSaccadic={isSaccadic} />
        )}

        {pattern === 'lemniscate' && isPlaying && (
          <LemniscatePattern size={size} color={color} shadow={glowShadow} tripDuration={tripDuration} symbol={symbol} showSymbols={showSymbols} isSaccadic={isSaccadic} />
        )}

        {pattern === 'pulse' && isPlaying && (
          <PulsePattern size={size} color={color} shadow={glowShadow} tripDuration={tripDuration} symbol={symbol} showSymbols={showSymbols} isSaccadic={isSaccadic} />
        )}

        {pattern === 'bars' && isPlaying && (
          <BarsPattern size={size} color={color} shadow={glowShadow} tripDuration={tripDuration} symbol={symbol} showSymbols={showSymbols} isSaccadic={isSaccadic} />
        )}
        
        {pattern === 'zigzag' && isPlaying && (
          <ZigZagPattern size={size} color={color} shadow={glowShadow} tripDuration={tripDuration} symbol={symbol} showSymbols={showSymbols} isSaccadic={isSaccadic} />
        )}

      </motion.div>
    </div>
  );
};

const DotsPattern = ({ size, color, shadow, tripDuration, symbol, showSymbols, isSaccadic }: any) => {
  const easing = isSaccadic ? "circInOut" : "linear";
  return (
    <div className="w-full h-64 flex items-center justify-between absolute px-12 z-0">
      <motion.div
        className="rounded-full flex items-center justify-center text-white font-bold"
        style={{ width: size, height: size, backgroundColor: color, boxShadow: shadow, fontSize: size * 0.5 }}
        animate={{ opacity: [1, 0], scale: [1, 0.8] }}
        transition={{ duration: tripDuration, repeat: Infinity, repeatType: 'reverse', ease: easing }}
      >
        {showSymbols && <span className="mix-blend-difference">{symbol}</span>}
      </motion.div>
      <motion.div
        className="rounded-full flex items-center justify-center text-white font-bold"
        style={{ width: size, height: size, backgroundColor: color, boxShadow: shadow, fontSize: size * 0.5 }}
        animate={{ opacity: [0, 1], scale: [0.8, 1] }}
        transition={{ duration: tripDuration, repeat: Infinity, repeatType: 'reverse', ease: easing }}
      >
        {showSymbols && <span className="mix-blend-difference">{symbol}</span>}
      </motion.div>
    </div>
  );
};

const LemniscatePattern = ({ size, color, shadow, tripDuration, symbol, showSymbols, isSaccadic }: any) => {
  const easing = isSaccadic ? "circInOut" : "linear";
  return (
    <motion.div
      className="rounded-full absolute flex items-center justify-center text-white font-bold"
      style={{ width: size, height: size, backgroundColor: color, boxShadow: shadow, fontSize: size * 0.5 }}
      animate={{ 
        x: [0, '40vw', 0, '-40vw', 0], 
        y: [0, '-20vh', 0, '20vh', 0] 
      }}
      transition={{ 
        x: { duration: tripDuration * 2, repeat: Infinity, ease: easing },
        y: { duration: tripDuration * 2, repeat: Infinity, ease: easing } 
      }}
    >
      {showSymbols && <span className="mix-blend-difference">{symbol}</span>}
    </motion.div>
  );
};

const PulsePattern = ({ size, color, shadow, tripDuration, symbol, showSymbols, isSaccadic }: any) => {
  const easing = isSaccadic ? "steps(1, start)" : "linear";
  return (
    <div className="w-full h-full absolute inset-0 flex items-center justify-between px-24">
      <div className="relative flex items-center justify-center">
        <motion.div
          className="rounded-full absolute border flex items-center justify-center text-white font-bold"
          style={{ borderColor: color, boxShadow: shadow, fontSize: size * 0.5 }}
          animate={{ width: [size, size * 4], height: [size, size * 4], opacity: [0.8, 0] }}
          transition={{ duration: tripDuration, repeat: Infinity, repeatType: 'reverse', ease: easing }}
        >
          {showSymbols && <span className="mix-blend-difference">{symbol}</span>}
        </motion.div>
      </div>
      <div className="relative flex items-center justify-center">
        <motion.div
          className="rounded-full absolute border flex items-center justify-center text-white font-bold"
          style={{ borderColor: color, boxShadow: shadow, fontSize: size * 0.5 }}
          animate={{ width: [size * 4, size], height: [size * 4, size], opacity: [0, 0.8] }}
          transition={{ duration: tripDuration, repeat: Infinity, repeatType: 'reverse', ease: easing }}
        >
          {showSymbols && <span className="mix-blend-difference">{symbol}</span>}
        </motion.div>
      </div>
    </div>
  );
};

const BarsPattern = ({ size, color, shadow, tripDuration, symbol, showSymbols, isSaccadic }: any) => {
  const barWidth = Math.max(10, size / 2);
  const barHeight = '60vh';
  const easing = isSaccadic ? "steps(1, start)" : "linear";

  return (
    <div className="w-full flex justify-between absolute px-12 top-1/2 -translate-y-1/2 z-0">
      <motion.div
        className="rounded-full flex items-center justify-center text-white font-bold"
        style={{ width: barWidth, height: barHeight, backgroundColor: color, boxShadow: shadow, fontSize: barWidth * 0.8 }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: tripDuration, repeat: Infinity, repeatType: 'reverse', ease: easing }}
      >
        {showSymbols && <span className="mix-blend-difference">{symbol}</span>}
      </motion.div>
      <motion.div
        className="rounded-full flex items-center justify-center text-white font-bold"
        style={{ width: barWidth, height: barHeight, backgroundColor: color, boxShadow: shadow, fontSize: barWidth * 0.8 }}
        animate={{ opacity: [0, 1] }}
        transition={{ duration: tripDuration, repeat: Infinity, repeatType: 'reverse', ease: easing }}
      >
        {showSymbols && <span className="mix-blend-difference">{symbol}</span>}
      </motion.div>
    </div>
  );
};

const ZigZagPattern = ({ size, color, shadow, tripDuration, symbol, showSymbols, isSaccadic }: any) => {
  const easing = isSaccadic ? "steps(1, start)" : "linear";
  return (
    <motion.div
      className="rounded-full absolute flex items-center justify-center text-white font-bold"
      style={{ width: size, height: size, backgroundColor: color, boxShadow: shadow, fontSize: size * 0.5 }}
      animate={{ 
        x: ['-45vw', '45vw'], 
        y: ['-20vh', '20vh', '-20vh', '20vh', '-20vh'] 
      }}
      transition={{ 
        x: { duration: tripDuration, repeat: Infinity, repeatType: 'mirror', ease: easing },
        y: { duration: tripDuration * 5, repeat: Infinity, ease: 'linear' } 
      }}
    >
      {showSymbols && <span className="mix-blend-difference">{symbol}</span>}
    </motion.div>
  );
};
