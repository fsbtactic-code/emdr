'use client';

import { useStore } from '@/store/useStore';
import { motion } from 'framer-motion';
import { useBilateralAudio } from '@/hooks/useBilateralAudio';

export const StimulationEngine = () => {
  const { speed, color, size, pattern, isPlaying } = useStore();
  
  useBilateralAudio();

  const glowShadow = `0 0 20px ${color}80, 0 0 40px ${color}40`;
  const tripDuration = 1 / (2 * speed);

  return (
    <div className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden pointer-events-none z-0">
      <div className="relative w-full max-w-5xl h-64 flex items-center justify-center mx-12">
        
        {pattern === 'linear' && (
          <motion.div
            className="rounded-full absolute"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              boxShadow: glowShadow,
            }}
            animate={isPlaying ? { x: ['-45vw', '45vw'] } : { x: 0 }}
            transition={{
              x: isPlaying ? {
                duration: tripDuration,
                ease: 'linear',
                repeat: Infinity,
                repeatType: 'mirror',
              } : {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }
            }}
          />
        )}

        {pattern === 'dots' && isPlaying && (
          <DotsPattern size={size} color={color} shadow={glowShadow} tripDuration={tripDuration} />
        )}

        {pattern === 'lemniscate' && isPlaying && (
          <LemniscatePattern size={size} color={color} shadow={glowShadow} tripDuration={tripDuration} />
        )}

        {pattern === 'pulse' && isPlaying && (
          <PulsePattern size={size} color={color} shadow={glowShadow} tripDuration={tripDuration} />
        )}

        {pattern === 'bars' && isPlaying && (
          <BarsPattern size={size} color={color} shadow={glowShadow} tripDuration={tripDuration} />
        )}

      </div>
    </div>
  );
};

const DotsPattern = ({ size, color, shadow, tripDuration }: { size: number, color: string, shadow: string, tripDuration: number }) => {
  return (
    <div className="w-full flex justify-between absolute px-12">
      <motion.div
        className="rounded-full"
        style={{ width: size, height: size, backgroundColor: color, boxShadow: shadow }}
        animate={{ opacity: [1, 0], scale: [1, 0.8] }}
        transition={{ duration: tripDuration, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
      />
      <motion.div
        className="rounded-full"
        style={{ width: size, height: size, backgroundColor: color, boxShadow: shadow }}
        animate={{ opacity: [0, 1], scale: [0.8, 1] }}
        transition={{ duration: tripDuration, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
      />
    </div>
  );
};

const LemniscatePattern = ({ size, color, shadow, tripDuration }: { size: number, color: string, shadow: string, tripDuration: number }) => {
  return (
    <motion.div
      className="rounded-full absolute"
      style={{ width: size, height: size, backgroundColor: color, boxShadow: shadow }}
      animate={{ 
        x: [0, '40vw', 0, '-40vw', 0], 
        y: [0, '-20vh', 0, '20vh', 0] 
      }}
      transition={{ 
        x: { duration: tripDuration * 2, repeat: Infinity, ease: 'linear' },
        y: { duration: tripDuration * 2, repeat: Infinity, ease: 'linear' } 
      }}
    />
  );
};

const PulsePattern = ({ size, color, shadow, tripDuration }: { size: number, color: string, shadow: string, tripDuration: number }) => {
  return (
    <div className="w-full h-full absolute inset-0 flex items-center justify-between px-24">
      <div className="relative flex items-center justify-center">
        <motion.div
          className="rounded-full absolute border"
          style={{ borderColor: color, boxShadow: shadow }}
          animate={{ width: [size, size * 4], height: [size, size * 4], opacity: [0.8, 0] }}
          transition={{ duration: tripDuration, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
        />
      </div>
      <div className="relative flex items-center justify-center">
        <motion.div
          className="rounded-full absolute border"
          style={{ borderColor: color, boxShadow: shadow }}
          animate={{ width: [size * 4, size], height: [size * 4, size], opacity: [0, 0.8] }}
          transition={{ duration: tripDuration, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
        />
      </div>
    </div>
  );
};

const BarsPattern = ({ size, color, shadow, tripDuration }: { size: number, color: string, shadow: string, tripDuration: number }) => {
  const barWidth = Math.max(10, size / 2);
  const barHeight = '60vh';

  return (
    <div className="w-full flex justify-between absolute px-12 top-1/2 -translate-y-1/2 z-0">
      <motion.div
        className="rounded-full"
        style={{ width: barWidth, height: barHeight, backgroundColor: color, boxShadow: shadow }}
        animate={{ opacity: [1, 0] }}
        transition={{ duration: tripDuration, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
      />
      <motion.div
        className="rounded-full"
        style={{ width: barWidth, height: barHeight, backgroundColor: color, boxShadow: shadow }}
        animate={{ opacity: [0, 1] }}
        transition={{ duration: tripDuration, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
      />
    </div>
  );
};

