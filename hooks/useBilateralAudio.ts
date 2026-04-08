import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';

export const useBilateralAudio = () => {
  const { speed, isPlaying, audioEnabled, audioVolume, audioFormat, isDesync, randomness } = useStore();
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  // Continuous audio node refs
  const pannerRef = useRef<StereoPannerNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const noiseSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const lfoRef = useRef<OscillatorNode | null>(null);

  // Binaural nodes refs
  const bLeftOscRef = useRef<OscillatorNode | null>(null);
  const bRightOscRef = useRef<OscillatorNode | null>(null);
  const bLeftPannerRef = useRef<StereoPannerNode | null>(null);
  const bRightPannerRef = useRef<StereoPannerNode | null>(null);
  
  // Discrete audio interval ref
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isLeftClickRef = useRef<boolean>(true);

  // Function to create White Noise Buffer
  const createWhiteNoiseBuffer = (ctx: AudioContext) => {
    const bufferSize = ctx.sampleRate * 2; // 2 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  };

  // Function to play a discrete beep
  const playClick = (ctx: AudioContext, isLeft: boolean, volume: number, type: OscillatorType) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const panner = ctx.createStereoPanner();

    osc.type = type;
    osc.frequency.value = type === 'sine' ? 600 : 800;

    // Apply randomness to frequency if needed (pitch jitter)
    if (randomness > 0) {
      osc.frequency.value += (Math.random() * 200 - 100) * (randomness / 100);
    }

    // envelope
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

    let panVal = isLeft ? -1 : 1;
    // Apply desync: reverse the audio panning compared to visual
    if (isDesync) {
      panVal = panVal * -1;
    }

    if (type === 'square') { // For metronome, center it slightly more
      panVal = panVal * 0.5;
    }

    panner.pan.value = panVal;

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
      const AudioContextCtor = window.AudioContext || (window as unknown as any).webkitAudioContext;
      audioCtxRef.current = new AudioContextCtor();
    }
    
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    const ctx = audioCtxRef.current;

    // Cleanup previous nodes
    if (oscillatorRef.current) { oscillatorRef.current.stop(); oscillatorRef.current.disconnect(); oscillatorRef.current = null; }
    if (noiseSourceRef.current) { noiseSourceRef.current.stop(); noiseSourceRef.current.disconnect(); noiseSourceRef.current = null; }
    if (lfoRef.current) { lfoRef.current.stop(); lfoRef.current.disconnect(); lfoRef.current = null; }
    if (bLeftOscRef.current) { bLeftOscRef.current.stop(); bLeftOscRef.current.disconnect(); bLeftOscRef.current = null; }
    if (bRightOscRef.current) { bRightOscRef.current.stop(); bRightOscRef.current.disconnect(); bRightOscRef.current = null; }
    if (intervalRef.current) { clearInterval(intervalRef.current); }

    const isLfoFormat = audioFormat === 'continuous' || audioFormat === 'white_noise';

    if (isLfoFormat) {
      pannerRef.current = ctx.createStereoPanner();
      
      lfoRef.current = ctx.createOscillator();
      lfoRef.current.type = 'sine'; 
      lfoRef.current.frequency.value = speed;
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = isDesync ? -1 : 1;

      lfoRef.current.connect(lfoGain);
      lfoGain.connect(pannerRef.current.pan);

      gainRef.current = ctx.createGain();
      gainRef.current.gain.value = audioVolume;

      if (audioFormat === 'white_noise') {
        noiseSourceRef.current = ctx.createBufferSource();
        noiseSourceRef.current.buffer = createWhiteNoiseBuffer(ctx);
        noiseSourceRef.current.loop = true;
        noiseSourceRef.current.connect(pannerRef.current);
        noiseSourceRef.current.start();
      } else {
        oscillatorRef.current = ctx.createOscillator();
        oscillatorRef.current.type = 'sine';
        oscillatorRef.current.frequency.value = 432;
        oscillatorRef.current.connect(pannerRef.current);
        oscillatorRef.current.start();
      }

      pannerRef.current.connect(gainRef.current);
      gainRef.current.connect(ctx.destination);
      lfoRef.current.start();
    } 
    else if (audioFormat === 'binaural_beats') {
      const baseFreq = 200; // Hz
      const beatFreq = speed * 2; // Beats per second

      bLeftOscRef.current = ctx.createOscillator();
      bLeftOscRef.current.type = 'sine';
      bLeftOscRef.current.frequency.value = baseFreq;

      bRightOscRef.current = ctx.createOscillator();
      bRightOscRef.current.type = 'sine';
      bRightOscRef.current.frequency.value = baseFreq + beatFreq;

      bLeftPannerRef.current = ctx.createStereoPanner();
      bLeftPannerRef.current.pan.value = isDesync ? 1 : -1;

      bRightPannerRef.current = ctx.createStereoPanner();
      bRightPannerRef.current.pan.value = isDesync ? -1 : 1;

      gainRef.current = ctx.createGain();
      gainRef.current.gain.value = audioVolume * 0.5; // Reduce volume as binaural uses two continuous waves

      bLeftOscRef.current.connect(bLeftPannerRef.current);
      bRightOscRef.current.connect(bRightPannerRef.current);
      
      bLeftPannerRef.current.connect(gainRef.current);
      bRightPannerRef.current.connect(gainRef.current);
      
      gainRef.current.connect(ctx.destination);

      bLeftOscRef.current.start();
      bRightOscRef.current.start();
    }
    else if (audioFormat === 'click' || audioFormat === 'metronome') {
      const halfCycleMs = (1 / (2 * speed)) * 1000;
      isLeftClickRef.current = true;
      
      playClick(ctx, isLeftClickRef.current, audioVolume, audioFormat === 'click' ? 'sine' : 'square');
      isLeftClickRef.current = !isLeftClickRef.current;

      const runInterval = () => {
        const jitter = (Math.random() * 0.4 - 0.2) * halfCycleMs * (randomness / 100);
        const nextTick = halfCycleMs + jitter;

        intervalRef.current = setTimeout(() => {
          playClick(ctx, isLeftClickRef.current, audioVolume, audioFormat === 'click' ? 'sine' : 'square');
          isLeftClickRef.current = !isLeftClickRef.current;
          runInterval();
        }, nextTick);
      };
      
      runInterval();
    }

    // Cleanup
    return () => {
      if (oscillatorRef.current) oscillatorRef.current.stop();
      if (noiseSourceRef.current) noiseSourceRef.current.stop();
      if (lfoRef.current) lfoRef.current.stop();
      if (bLeftOscRef.current) bLeftOscRef.current.stop();
      if (bRightOscRef.current) bRightOscRef.current.stop();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, audioEnabled, speed, audioVolume, audioFormat, isDesync, randomness]);

};
