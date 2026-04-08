import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

export const useAmbientAudio = () => {
  const { ambientSound, isPlaying, audioEnabled, audioVolume } = useStore();
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  useEffect(() => {
    if (!audioEnabled || !isPlaying || ambientSound === 'none') {
      if (sourceRef.current) {
        sourceRef.current.stop();
        sourceRef.current.disconnect();
        sourceRef.current = null;
      }
      if (lfoRef.current) {
        lfoRef.current.stop();
        lfoRef.current.disconnect();
        lfoRef.current = null;
      }
      return;
    }

    if (!audioCtxRef.current) {
      const AudioContextCtor = window.AudioContext || (window as unknown as any).webkitAudioContext;
      audioCtxRef.current = new AudioContextCtor();
    }
    
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const ctx = audioCtxRef.current;

    // Cleanup previous before starting new
    if (sourceRef.current) { sourceRef.current.stop(); sourceRef.current.disconnect(); }
    if (lfoRef.current) { lfoRef.current.stop(); lfoRef.current.disconnect(); }

    const bufferSize = ctx.sampleRate * 2; 
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate White Noise
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }

    sourceRef.current = ctx.createBufferSource();
    sourceRef.current.buffer = buffer;
    sourceRef.current.loop = true;

    gainRef.current = ctx.createGain();
    // Ambient should be a bit quieter than main therapeutic tones
    gainRef.current.gain.value = audioVolume * 0.4;

    if (ambientSound === 'ocean') {
      // Ocean Waves: Pinkish noise + LowPass + LFO
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 400; // Base muffled frequency

      lfoRef.current = ctx.createOscillator();
      lfoRef.current.type = 'sine';
      lfoRef.current.frequency.value = 0.15; // Slow wave cycle (approx 6.5s)

      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 800; // Sweep up to 1200hz

      lfoRef.current.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      sourceRef.current.connect(filter);
      filter.connect(gainRef.current);
      
      lfoRef.current.start();
    } else if (ambientSound === 'rain') {
      // Rain: White noise + HighPass to sound like sizzle
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 1000;

      sourceRef.current.connect(filter);
      filter.connect(gainRef.current);
    } else {
      sourceRef.current.connect(gainRef.current);
    }

    gainRef.current.connect(ctx.destination);
    sourceRef.current.start();

    return () => {
      if (sourceRef.current) { sourceRef.current.stop(); sourceRef.current.disconnect(); }
      if (lfoRef.current) { lfoRef.current.stop(); lfoRef.current.disconnect(); }
    };
  }, [ambientSound, isPlaying, audioEnabled, audioVolume]);
};
