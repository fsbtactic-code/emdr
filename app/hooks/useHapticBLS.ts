'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

/**
 * Returns true if the Vibration API is available in this environment.
 * Safe to call during SSR (typeof navigator guard).
 */
export function isHapticSupported(): boolean {
  return typeof navigator !== 'undefined' && 'vibrate' in navigator;
}

/**
 * Fires alternating haptic taps synced to the bilateral stimulation rhythm.
 * Call once inside StimulationEngine (or any component that mounts for the
 * duration of a session). Produces no UI output.
 *
 * Tap timing mirrors StimulationEngine effSpeed logic:
 *   effSpeed = (safeMode || vestibularSafe) ? Math.min(speed, 1.5) : speed
 * One tap per half-cycle, so interval = 1000 / (2 * effSpeed) ms.
 */
export function useHapticBLS(): void {
  const isPlaying = useStore((s) => s.isPlaying);
  const hapticEnabled = useStore((s) => s.hapticEnabled);
  const speed = useStore((s) => s.speed);
  const safeMode = useStore((s) => s.safeMode);
  const vestibularSafe = useStore((s) => s.vestibularSafe);
  const isClient = useStore((s) => s.isClient);

  // Track interval id so we can clear on cleanup without stale closures.
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

    // Only activate when all conditions are met.
    // isClient means this instance is the remote client receiver - still
    // allow haptics so the client can feel the BLS even without visuals.
    if (!isPlaying || !hapticEnabled || !supported) {
      clearVibration();
      return;
    }

    // Mirror StimulationEngine effSpeed cap.
    const effSpeed = safeMode || vestibularSafe ? Math.min(speed, 1.5) : speed;

    // One tap per half-cycle.
    const intervalMs = 1000 / (2 * effSpeed);

    intervalRef.current = setInterval(() => {
      navigator.vibrate(60);
    }, intervalMs);

    return () => {
      clearVibration();
    };
  }, [isPlaying, hapticEnabled, speed, safeMode, vestibularSafe, isClient]);
}
