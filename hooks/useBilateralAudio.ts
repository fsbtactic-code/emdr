import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

export const useBilateralAudio = () => {
  const { speed, isPlaying, audioEnabled, audioVolume, audioFormat } = useStore();
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  // Continuous audio node refs
  const pannerRef = useRef<StereoPannerNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  
  // Discrete audio interval ref
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isLeftClickRef = useRef<boolean>(true);

  // Function to play a discrete beep
  const playClick = (ctx: AudioContext, isLeft: boolean, volume: number, type: OscillatorType) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = ctx.createStereoPanner();

    osc.type = type;
    osc.frequency.value = type === 'sine' ? 600 : 800;

    // envelope
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    panner.pan.value = isLeft ? -1 : 1;
    if (type === 'square') { // For metronome, center it slightly more
      panner.pan.value = isLeft ? -0.5 : 0.5;
    }

    osc.connect(panner);
    panner.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  };

  useEffect(() => {
    if (!audioEnabled || !isPlaying) {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    if (!audioCtxRef.current) {
      const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContextCtor();
    }
    
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const ctx = audioCtxRef.current;

    // Cleanup previous nodes
    if (oscillatorRef.current) {
      oscillatorRef.current.stop();
      oscillatorRef.current.disconnect();
      oscillatorRef.current = null;
    }
    if (lfoRef.current) {
      lfoRef.current.stop();
      lfoRef.current.disconnect();
      lfoRef.current = null;
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (audioFormat === 'continuous') {
      oscillatorRef.current = ctx.createOscillator();
      oscillatorRef.current.type = 'sine';
      oscillatorRef.current.frequency.value = 432;

      pannerRef.current = ctx.createStereoPanner();
      
      lfoRef.current = ctx.createOscillator();
      lfoRef.current.type = 'sine'; 
      lfoRef.current.frequency.value = speed;
      
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
    else if (audioFormat === 'click' || audioFormat === 'metronome') {
      // For discrete clicks, tripDuration is 1 / (2 * speed) seconds
      const halfCycleMs = (1 / (2 * speed)) * 1000;
      isLeftClickRef.current = true;
      
      // Play first click immediately
      playClick(ctx, isLeftClickRef.current, audioVolume, audioFormat === 'click' ? 'sine' : 'square');
      isLeftClickRef.current = !isLeftClickRef.current;

      intervalRef.current = setInterval(() => {
        playClick(ctx, isLeftClickRef.current, audioVolume, audioFormat === 'click' ? 'sine' : 'square');
        isLeftClickRef.current = !isLeftClickRef.current;
      }, halfCycleMs);
    }

    return () => {
      // Cleanup to prevent duplicate loops when dependencies change
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (oscillatorRef.current) {
        try { oscillatorRef.current.stop(); } catch(e){}
      }
      if (lfoRef.current) {
        try { lfoRef.current.stop(); } catch(e){}
      }
    };
  }, [isPlaying, audioEnabled, audioFormat, speed]);

  useEffect(() => {
    if (gainRef.current && audioFormat === 'continuous') {
      gainRef.current.gain.value = audioVolume;
    }
  }, [audioVolume, audioFormat]);

  return null;
};
