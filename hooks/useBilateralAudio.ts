import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

export const useBilateralAudio = () => {
  const { speed, isPlaying, audioEnabled, audioVolume } = useStore();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const pannerRef = useRef<StereoPannerNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    if (!audioEnabled || !isPlaying) {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
      return;
    }

    if (!audioCtxRef.current) {
      const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContextCtor();
      
      const ctx = audioCtxRef.current;
      
      // 432 Hz basic tone
      oscillatorRef.current = ctx.createOscillator();
      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.frequency.value = 432;

      pannerRef.current = ctx.createStereoPanner();
      
      lfoRef.current = ctx.createOscillator();
      lfoRef.current.type = 'sine'; 
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 1;

      lfoRef.current.connect(lfoGain);
      lfoGain.connect(pannerRef.current.pan);

      gainRef.current = ctx.createGain();
      gainRef.current.gain.value = audioVolume;

      oscillatorRef.current.connect(pannerRef.current);
      pannerRef.current.connect(gainRef.current);
      gainRef.current.connect(ctx.destination);

      oscillatorRef.current.start();
      lfoRef.current.start();
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

  }, [isPlaying, audioEnabled]);

  useEffect(() => {
    if (lfoRef.current) {
      lfoRef.current.frequency.value = speed;
    }
  }, [speed]);

  useEffect(() => {
    if (gainRef.current) {
      gainRef.current.gain.value = audioVolume;
    }
  }, [audioVolume]);

  return null;
};
