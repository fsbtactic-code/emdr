import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { startAmbient, setAmbientBusVolume, type AmbientHandle } from '../lib/audio';

export const useAmbientAudio = () => {
  const { ambientSound, isPlaying, audioEnabled, ambientVolume } = useStore();
  const handleRef = useRef<AmbientHandle | null>(null);

  useEffect(() => {
    if (handleRef.current) {
      handleRef.current.stop();
      handleRef.current = null;
    }
    if (!audioEnabled || !isPlaying || ambientSound === 'none') return;

    setAmbientBusVolume(ambientVolume);
    handleRef.current = startAmbient(ambientSound);

    return () => {
      if (handleRef.current) {
        handleRef.current.stop();
        handleRef.current = null;
      }
    };
  }, [ambientSound, isPlaying, audioEnabled]);

  useEffect(() => {
    setAmbientBusVolume(ambientVolume);
  }, [ambientVolume]);
};
