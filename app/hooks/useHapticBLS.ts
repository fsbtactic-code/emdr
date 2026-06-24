'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

export function isHapticSupported(): boolean {
  return typeof navigator !== 'undefined' && 'vibrate' in navigator;
}

export function useHapticBLS(): void {
  const isPlaying = useStore((s) => s.isPlaying);
  const hapticEnabled = useStore((s) => s.hapticEnabled);
  const speed = useStore((s) => s.speed);
  const safeMode = useStore((s) => s.safeMode);
  const vestibularSafe = useStore((s) => s.vestibularSafe);
  const isClient = useStore((s) => s.isClient);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const supported = isHapticSupported();

    const clearVibration = () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (supported) {
        navigator.vibrate(0);
      }
    };

    if (!isPlaying || !hapticEnabled || !supported) {
      clearVibration();
      return;
    }

    const effSpeed = safeMode || vestibularSafe ? Math.min(speed, 1.5) : speed;
    const intervalMs = 1000 / (2 * effSpeed);

    intervalRef.current = setInterval(() => {
      navigator.vibrate(60);
    }, intervalMs);

    return () => {
      clearVibration();
    };
  }, [isPlaying, hapticEnabled, speed, safeMode, vestibularSafe, isClient]);
}
