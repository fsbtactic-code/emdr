import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

const AMBIENT_URLS: Record<string, string> = {
  rain: '', // procedural
  ocean: '', // procedural
  breath: 'https://storage.yandexcloud.net/neurolab/Audio/freepik-earthflow-breath.mp3',
  hz528: 'https://storage.yandexcloud.net/neurolab/Audio/freepik-sacred-528-hz-celestial-repair.mp3',
  wind_harmonics: 'https://storage.yandexcloud.net/neurolab/Audio/freepik-harmonics-in-the-wind.mp3',
  breathform: 'https://storage.yandexcloud.net/neurolab/Audio/freepik-breathform.mp3',
};

export const useAmbientAudio = () => {
  const { ambientSound, isPlaying, audioEnabled, audioVolume } = useStore();
  
  // Procedural audio refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);
  
  // File-based audio ref
  const audioElRef = useRef<HTMLAudioElement | null>(null);

  const stopProcedural = () => {
    if (sourceRef.current) { try { sourceRef.current.stop(); } catch {} sourceRef.current.disconnect(); sourceRef.current = null; }
    if (lfoRef.current) { try { lfoRef.current.stop(); } catch {} lfoRef.current.disconnect(); lfoRef.current = null; }
  };

  const stopFileAudio = () => {
    if (audioElRef.current) {
      audioElRef.current.pause();
      audioElRef.current.currentTime = 0;
      audioElRef.current.src = '';
      audioElRef.current = null;
    }
  };

  useEffect(() => {
    const isFileBased = ambientSound in AMBIENT_URLS && AMBIENT_URLS[ambientSound] !== '';
    
    if (!audioEnabled || !isPlaying || ambientSound === 'none') {
      stopProcedural();
      stopFileAudio();
      return;
    }

    // ── File-based playback ──
    if (isFileBased) {
      stopProcedural();
      
      const audioUrl = AMBIENT_URLS[ambientSound];
      
      // If already playing this track, just update volume
      if (audioElRef.current && audioElRef.current.dataset.src === audioUrl) {
        audioElRef.current.volume = audioVolume * 0.5;
        if (audioElRef.current.paused && isPlaying) {
           audioElRef.current.play().catch(e => console.warn('Audio play failed:', e));
        }
        return;
      }
      
      stopFileAudio();
      
      const el = new Audio();
      el.src = audioUrl;
      el.dataset.src = audioUrl; // Track the source for comparison
      el.loop = true;
      el.crossOrigin = "anonymous";
      el.volume = audioVolume * 0.5;
      
      // Attempt to play
      const playPromise = el.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.warn("Autoplay was prevented or audio failed to load:", error);
          // Retry on next interaction is handled by browser native behavior usually,
          // but we keep the element around so it can be resumed.
        });
      }
      
      audioElRef.current = el;
      return;
    }

    // ── Procedural audio ──
    stopFileAudio();

    if (!audioCtxRef.current) {
      const AudioContextCtor = window.AudioContext || (window as unknown as any).webkitAudioContext;
      audioCtxRef.current = new AudioContextCtor();
    }
    
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const ctx = audioCtxRef.current;
    stopProcedural();

    const bufferSize = ctx.sampleRate * 2; 
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    sourceRef.current = ctx.createBufferSource();
    sourceRef.current.buffer = buffer;
    sourceRef.current.loop = true;

    gainRef.current = ctx.createGain();
    gainRef.current.gain.value = audioVolume * 0.4;

    if (ambientSound === 'ocean') {
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 400;

      lfoRef.current = ctx.createOscillator();
      lfoRef.current.type = 'sine';
      lfoRef.current.frequency.value = 0.15;

      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 800;

      lfoRef.current.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      sourceRef.current.connect(filter);
      filter.connect(gainRef.current);
      
      lfoRef.current.start();
    } else if (ambientSound === 'rain') {
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
      stopProcedural();
    };
  }, [ambientSound, isPlaying, audioEnabled, audioVolume]);

  // Update volume on file audio when audioVolume changes
  useEffect(() => {
    if (audioElRef.current) {
      audioElRef.current.volume = audioVolume * 0.5;
    }
  }, [audioVolume]);
};
