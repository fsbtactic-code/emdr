'use client';

import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { useBilateralAudio } from '@/hooks/useBilateralAudio';
import { useAmbientAudio } from '@/hooks/useAmbientAudio';
import { useEffect, useState } from 'react';

const getCharacters = (lang: string) => {
  if (lang === 'ru') return 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
  if (lang === 'en') return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lang === 'numbers') return '0123456789';
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
};

const getShapeClasses = (shape: string) => {
  switch (shape) {
    case 'square': return 'rounded-[20px]';
    case 'ring': return 'rounded-full border-[6px] bg-transparent';
    case 'butterfly': return 'rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%]';
    default: return 'rounded-full'; // circle
  }
};

const AnimatedBackground = ({ type }: { type: string }) => {
  if (type === 'black') {
    return <div className="absolute inset-0 bg-zinc-950 z-[-1]" />;
  }
  
  if (type === 'stars' || type === 'pulse') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1] bg-zinc-950">
        <motion.div
          className="absolute inset-[10%] bg-cyan-500/10 blur-[100px] rounded-full"
          animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    );
  }

  // Default: Aurora
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1] bg-zinc-950">
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-emerald-600/5 blur-[120px] rounded-full"
        animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
    </div>
  );
};

export const StimulationEngine = () => {
  const { speed, color, size, pattern, isPlaying, randomness, cyclesPerSet, setPlaying, incrementSets, isSaccadic, showSymbols, symbolLanguage, targetShape, isSettingsOpen, visualBackground } = useStore();
  const [symbol, setSymbol] = useState('');
  
  useBilateralAudio();
  useAmbientAudio();

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
    const chars = getCharacters(symbolLanguage);
    const intervalMs = (1 / speed) * 1000;
    const interval = setInterval(() => {
      setSymbol(chars[Math.floor(Math.random() * chars.length)]);
    }, intervalMs / 2); // Change at every edge
    
    // Initial symbol
    setSymbol(chars[Math.floor(Math.random() * chars.length)]);
    return () => clearInterval(interval);
  }, [isPlaying, showSymbols, speed, symbolLanguage]);

  const glowShadow = `0 0 20px ${color}80, 0 0 40px ${color}40`;
  const tripDuration = 1 / (2 * speed);
  
  const jX = 20 * (randomness / 100);
  const jY = 20 * (randomness / 100);

  const easing = isSaccadic ? "circInOut" : "linear";

  const getStyleProps = () => {
    const base = { width: size, height: size, boxShadow: glowShadow, fontSize: size * 0.5 };
    if (targetShape === 'ring') {
      return { ...base, borderColor: color };
    }
    return { ...base, backgroundColor: color };
  };

  const styleProps = getStyleProps();
  const shapeClasses = `absolute flex items-center justify-center text-white font-bold ${getShapeClasses(targetShape)}`;

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none z-0">
      <AnimatedBackground type={visualBackground} />
      <div className="w-full flex items-center justify-center">
        <motion.div 
          className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center mx-12"
          animate={isPlaying && randomness > 0 ? { x: [0, jX, 0, -jX, 0], y: [0, jY, 0, -jY, 0] } : { x: 0, y: 0 }}
          transition={{ duration: tripDuration * 0.83, repeat: Infinity, ease: 'easeInOut' }}
        >
        {pattern === 'horizontal' && (
          <motion.div
            className={shapeClasses}
            style={styleProps}
            animate={isPlaying ? { x: ['-45vw', '45vw'] } : { x: 0 }}
            transition={{
              x: isPlaying ? { duration: tripDuration, ease: easing, repeat: Infinity, repeatType: 'mirror' } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }}
          >
            {showSymbols && <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-widest">{symbol}</span>}
          </motion.div>
        )}

        {pattern === 'vertical' && (
          <motion.div
            className={shapeClasses}
            style={styleProps}
            animate={isPlaying ? { y: ['-35vh', '35vh'] } : { y: 0 }}
            transition={{
              y: isPlaying ? { duration: tripDuration, ease: easing, repeat: Infinity, repeatType: 'mirror' } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }}
          >
            {showSymbols && <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-widest">{symbol}</span>}
          </motion.div>
        )}

        {pattern === 'diagonal-1' && (
          <motion.div
            className={shapeClasses}
            style={styleProps}
            animate={isPlaying ? { x: ['-45vw', '45vw'], y: ['-35vh', '35vh'] } : { x: 0, y: 0 }}
            transition={{
              x: isPlaying ? { duration: tripDuration, ease: easing, repeat: Infinity, repeatType: 'mirror' } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              y: isPlaying ? { duration: tripDuration, ease: easing, repeat: Infinity, repeatType: 'mirror' } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }}
          >
            {showSymbols && <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-widest">{symbol}</span>}
          </motion.div>
        )}

        {pattern === 'diagonal-2' && (
          <motion.div
            className={shapeClasses}
            style={styleProps}
            animate={isPlaying ? { x: ['-45vw', '45vw'], y: ['35vh', '-35vh'] } : { x: 0, y: 0 }}
            transition={{
              x: isPlaying ? { duration: tripDuration, ease: easing, repeat: Infinity, repeatType: 'mirror' } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              y: isPlaying ? { duration: tripDuration, ease: easing, repeat: Infinity, repeatType: 'mirror' } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
            }}
          >
            {showSymbols && <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-widest">{symbol}</span>}
          </motion.div>
        )}

        {pattern === 'dots' && isPlaying && (
          <DotsPattern styleProps={styleProps} shapeClasses={shapeClasses} tripDuration={tripDuration} symbol={symbol} showSymbols={showSymbols} isSaccadic={isSaccadic} />
        )}

        {pattern === 'lemniscate' && isPlaying && (
          <LemniscatePattern styleProps={styleProps} shapeClasses={shapeClasses} tripDuration={tripDuration} symbol={symbol} showSymbols={showSymbols} isSaccadic={isSaccadic} />
        )}

        {pattern === 'pulse' && isPlaying && (
          <PulsePattern styleProps={styleProps} shapeClasses={shapeClasses} tripDuration={tripDuration} symbol={symbol} showSymbols={showSymbols} isSaccadic={isSaccadic} />
        )}

        {pattern === 'bars' && isPlaying && (
          <BarsPattern color={color} shadow={glowShadow} tripDuration={tripDuration} symbol={symbol} showSymbols={showSymbols} isSaccadic={isSaccadic} />
        )}
        
        {pattern === 'zigzag' && isPlaying && (
          <ZigZagPattern styleProps={styleProps} shapeClasses={shapeClasses} tripDuration={tripDuration} symbol={symbol} showSymbols={showSymbols} isSaccadic={isSaccadic} />
        )}

        </motion.div>
      </motion.div>
    </div>
  );
};

const DotsPattern = ({ styleProps, shapeClasses, tripDuration, symbol, showSymbols, isSaccadic }: any) => {
  const easing = isSaccadic ? "circInOut" : "linear";
  return (
    <div className="w-full h-64 flex items-center justify-between absolute px-12 z-0">
      <motion.div
        className={shapeClasses}
        style={styleProps}
        animate={{ opacity: [1, 0], scale: [1, 0.8] }}
        transition={{ duration: tripDuration, repeat: Infinity, repeatType: 'reverse', ease: easing }}
      >
        {showSymbols && <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-widest">{symbol}</span>}
      </motion.div>
      <motion.div
        className={shapeClasses}
        style={styleProps}
        animate={{ opacity: [0, 1], scale: [0.8, 1] }}
        transition={{ duration: tripDuration, repeat: Infinity, repeatType: 'reverse', ease: easing }}
      >
        {showSymbols && <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-widest">{symbol}</span>}
      </motion.div>
    </div>
  );
};

const LemniscatePattern = ({ styleProps, shapeClasses, tripDuration, symbol, showSymbols, isSaccadic }: any) => {
  const easing = isSaccadic ? "circInOut" : "linear";
  return (
    <motion.div
      className={shapeClasses}
      style={styleProps}
      animate={{ 
        x: [0, '40vw', 0, '-40vw', 0], 
        y: [0, '-20vh', 0, '20vh', 0] 
      }}
      transition={{ 
        x: { duration: tripDuration * 2, repeat: Infinity, ease: easing },
        y: { duration: tripDuration * 2, repeat: Infinity, ease: easing } 
      }}
    >
      {showSymbols && <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-widest">{symbol}</span>}
    </motion.div>
  );
};

const PulsePattern = ({ styleProps, shapeClasses, tripDuration, symbol, showSymbols, isSaccadic }: any) => {
  const easing = isSaccadic ? "circInOut" : "linear";
  return (
    <div className="w-full h-full absolute inset-0 flex items-center justify-between px-24">
      <div className="relative flex items-center justify-center">
        <motion.div
          className={shapeClasses + " border-2 border-white"}
          style={styleProps}
          animate={{ scale: [1, 4], opacity: [0.8, 0] }}
          transition={{ duration: tripDuration, repeat: Infinity, repeatType: 'reverse', ease: easing }}
        >
          {showSymbols && <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-widest">{symbol}</span>}
        </motion.div>
      </div>
      <div className="relative flex items-center justify-center">
        <motion.div
          className={shapeClasses + " border-2 border-white"}
          style={styleProps}
          animate={{ scale: [4, 1], opacity: [0, 0.8] }}
          transition={{ duration: tripDuration, repeat: Infinity, repeatType: 'reverse', ease: easing }}
        >
          {showSymbols && <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-widest">{symbol}</span>}
        </motion.div>
      </div>
    </div>
  );
};

// Bars pattern is inherently rectangles, not using targetShape
const BarsPattern = ({ size, color, shadow, tripDuration, symbol, showSymbols, isSaccadic }: any) => {
  const barWidth = Math.max(10, (size || 48) / 2);
  const barHeight = '60vh';
  const easing = isSaccadic ? "circInOut" : "linear";

  return (
    <div className="w-full flex justify-between absolute px-12 top-1/2 -translate-y-1/2 z-0">
      <motion.div
        className="rounded-[10px] flex items-center justify-center text-white font-bold"
        style={{ width: barWidth, height: barHeight, backgroundColor: color, boxShadow: shadow, fontSize: barWidth * 0.8 }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: tripDuration, repeat: Infinity, repeatType: 'reverse', ease: easing }}
      >
        {showSymbols && <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-widest">{symbol}</span>}
      </motion.div>
      <motion.div
        className="rounded-[10px] flex items-center justify-center text-white font-bold"
        style={{ width: barWidth, height: barHeight, backgroundColor: color, boxShadow: shadow, fontSize: barWidth * 0.8 }}
        animate={{ opacity: [0, 1] }}
        transition={{ duration: tripDuration, repeat: Infinity, repeatType: 'reverse', ease: easing }}
      >
        {showSymbols && <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-widest">{symbol}</span>}
      </motion.div>
    </div>
  );
};

const ZigZagPattern = ({ styleProps, shapeClasses, tripDuration, symbol, showSymbols, isSaccadic }: any) => {
  const easing = isSaccadic ? "circInOut" : "linear";
  return (
    <motion.div
      className={shapeClasses}
      style={styleProps}
      animate={{ 
        x: ['-45vw', '45vw'], 
        y: ['-20vh', '20vh', '-20vh', '20vh', '-20vh'] 
      }}
      transition={{ 
        x: { duration: tripDuration, repeat: Infinity, repeatType: 'mirror', ease: easing },
        y: { duration: tripDuration * 5, repeat: Infinity, ease: 'linear' } 
      }}
    >
      {showSymbols && <span className="text-white drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-widest">{symbol}</span>}
    </motion.div>
  );
};
