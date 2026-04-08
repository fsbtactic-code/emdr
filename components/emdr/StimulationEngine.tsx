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
                ease: [0.22, 1, 0.36, 1] // fluid stop
              }
            }}
          />
        )}

        {pattern === 'dots' && isPlaying && (
          <DotsPattern size={size} color={color} shadow={glowShadow} tripDuration={tripDuration} />
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
