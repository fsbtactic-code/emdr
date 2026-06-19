import { useEffect, useRef } from 'react';
import { useStore } from '../store/useStore';
import { ensureAudio } from '../lib/audio';

export const useBilateralAudio = () => {
  const { speed, isPlaying, audioEnabled, audioVolume, audioFormat, isDesync, randomness, safeMode } = useStore();
  const effSpeed = safeMode ? Math.min(speed, 1.5) : speed;
  const effRandomness = safeMode ? 0 : randomness;

  const nodesRef = useRef<AudioNode[]>([]);
  const sourcesRef = useRef<AudioScheduledSourceNode[]>([]);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const genRef = useRef(0);

  const dispose = () => {
    genRef.current++;
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
    sourcesRef.current.forEach((n) => { try { n.stop(); } catch {} });
    nodesRef.current.forEach((n) => { try { n.disconnect(); } catch {} });
    sourcesRef.current = [];
    nodesRef.current = [];
  };

  useEffect(() => {
    if (!audioEnabled || !isPlaying) {
      dispose();
      return;
    }

    const { ctx, bilateral } = ensureAudio();
    dispose();
    const myGen = ++genRef.current;

    const track = <T extends AudioNode>(n: T): T => { nodesRef.current.push(n); return n; };
    const trackSrc = <T extends AudioScheduledSourceNode>(n: T): T => { sourcesRef.current.push(n); nodesRef.current.push(n); return n; };

    const createWhiteNoise = () => {
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      return buffer;
    };

    const playClick = (isLeft: boolean, volume: number, type: OscillatorType) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const panner = ctx.createStereoPanner();
      osc.type = type;
      osc.frequency.value = type === 'sine' ? 600 : 800;
      if (effRandomness > 0) osc.frequency.value += (Math.random() * 200 - 100) * (effRandomness / 100);
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      let panVal = isLeft ? -1 : 1;
      if (isDesync) panVal *= -1;
      if (type === 'square') panVal *= 0.5;
      panner.pan.value = panVal;
      osc.connect(panner);
      panner.connect(gain);
      gain.connect(bilateral);
      osc.start();
      osc.stop(ctx.currentTime + 0.15);
      osc.onended = () => { try { osc.disconnect(); panner.disconnect(); gain.disconnect(); } catch {} };
    };

    const isLfoFormat = audioFormat === 'continuous' || audioFormat === 'white_noise';

    if (isLfoFormat) {
      const panner = track(ctx.createStereoPanner());
      const lfo = trackSrc(ctx.createOscillator());
      lfo.type = 'sine';
      lfo.frequency.value = effSpeed;
      const lfoGain = track(ctx.createGain());
      lfoGain.gain.value = isDesync ? -1 : 1;
      lfo.connect(lfoGain);
      lfoGain.connect(panner.pan);

      const gain = track(ctx.createGain());
      gain.gain.value = audioVolume;

      if (audioFormat === 'white_noise') {
        const noise = trackSrc(ctx.createBufferSource());
        noise.buffer = createWhiteNoise();
        noise.loop = true;
        noise.connect(panner);
        noise.start();
      } else {
        const osc = trackSrc(ctx.createOscillator());
        osc.type = 'sine';
        osc.frequency.value = 432;
        osc.connect(panner);
        osc.start();
      }
      panner.connect(gain);
      gain.connect(bilateral);
      lfo.start();
    } else if (audioFormat === 'binaural_beats') {
      const baseFreq = 200;
      const beatFreq = effSpeed * 2;
      const lOsc = trackSrc(ctx.createOscillator());
      lOsc.type = 'sine';
      lOsc.frequency.value = baseFreq;
      const rOsc = trackSrc(ctx.createOscillator());
      rOsc.type = 'sine';
      rOsc.frequency.value = baseFreq + beatFreq;
      const lPan = track(ctx.createStereoPanner());
      lPan.pan.value = isDesync ? 1 : -1;
      const rPan = track(ctx.createStereoPanner());
      rPan.pan.value = isDesync ? -1 : 1;
      const gain = track(ctx.createGain());
      gain.gain.value = audioVolume * 0.5;
      lOsc.connect(lPan);
      rOsc.connect(rPan);
      lPan.connect(gain);
      rPan.connect(gain);
      gain.connect(bilateral);
      lOsc.start();
      rOsc.start();
    } else if (audioFormat === 'click' || audioFormat === 'metronome') {
      const halfCycleMs = (1 / (2 * effSpeed)) * 1000;
      let isLeftClick = true;
      const type: OscillatorType = audioFormat === 'click' ? 'sine' : 'square';
      playClick(isLeftClick, audioVolume, type);
      isLeftClick = !isLeftClick;
      const runInterval = () => {
        if (genRef.current !== myGen) return;
        const jitter = (Math.random() * 0.4 - 0.2) * halfCycleMs * (effRandomness / 100);
        timerRef.current = setTimeout(() => {
          if (genRef.current !== myGen) return;
          playClick(isLeftClick, audioVolume, type);
          isLeftClick = !isLeftClick;
          runInterval();
        }, halfCycleMs + jitter);
      };
      runInterval();
    }

    return () => {
      dispose();
    };
  }, [isPlaying, audioEnabled, effSpeed, audioVolume, audioFormat, isDesync, effRandomness]);
};
