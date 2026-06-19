let _ctx: AudioContext | null = null;
let _master: GainNode | null = null;
let _bilateral: GainNode | null = null;
let _ambient: GainNode | null = null;
const _noise: Partial<Record<'white' | 'pink' | 'brown', AudioBuffer>> = {};

export interface AudioBuses {
  ctx: AudioContext;
  bilateral: GainNode;
  ambient: GainNode;
}

export function ensureAudio(): AudioBuses {
  if (!_ctx) {
    const C = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    _ctx = new C();
    _master = _ctx.createGain();
    _master.gain.value = 1;
    _master.connect(_ctx.destination);
    _bilateral = _ctx.createGain();
    _bilateral.gain.value = 1;
    _bilateral.connect(_master);
    _ambient = _ctx.createGain();
    _ambient.gain.value = 0.2;
    _ambient.connect(_master);
  }
  if (_ctx.state === 'suspended') _ctx.resume().catch(() => {});
  return { ctx: _ctx, bilateral: _bilateral!, ambient: _ambient! };
}

export function setAmbientBusVolume(v: number) {
  if (_ambient && _ctx) {
    _ambient.gain.setTargetAtTime(Math.max(0, Math.min(1, v)), _ctx.currentTime, 0.05);
  }
}

function noiseBuffer(ctx: AudioContext, kind: 'white' | 'pink' | 'brown'): AudioBuffer {
  const cached = _noise[kind];
  if (cached && cached.sampleRate === ctx.sampleRate) return cached;
  const len = ctx.sampleRate * 4;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d = buf.getChannelData(0);
  if (kind === 'white') {
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  } else if (kind === 'pink') {
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.969 * b2 + w * 0.153852;
      b3 = 0.8665 * b3 + w * 0.3104856;
      b4 = 0.55 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.016898;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.11;
      b6 = w * 0.115926;
    }
  } else {
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      last = (last + 0.02 * w) / 1.02;
      d[i] = last * 3.5;
    }
  }
  _noise[kind] = buf;
  return buf;
}

export interface AmbientHandle {
  stop: () => void;
}

export function startAmbient(type: string): AmbientHandle | null {
  if (type === 'none') return null;
  const { ctx, ambient } = ensureAudio();
  const t = ctx.currentTime;
  const nodes: AudioScheduledSourceNode[] = [];
  const all: AudioNode[] = [];

  const noiseSource = (kind: 'white' | 'pink' | 'brown') => {
    const s = ctx.createBufferSource();
    s.buffer = noiseBuffer(ctx, kind);
    s.loop = true;
    nodes.push(s);
    all.push(s);
    return s;
  };
  const filter = (kind: BiquadFilterType, freq: number, q?: number) => {
    const f = ctx.createBiquadFilter();
    f.type = kind;
    f.frequency.value = freq;
    if (q !== undefined) f.Q.value = q;
    all.push(f);
    return f;
  };
  const gain = (v: number) => {
    const g = ctx.createGain();
    g.gain.value = v;
    all.push(g);
    return g;
  };
  const lfo = (freq: number, target: AudioParam, depth: number, base: number) => {
    target.value = base;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = freq;
    const lg = ctx.createGain();
    lg.gain.value = depth;
    o.connect(lg);
    lg.connect(target);
    nodes.push(o);
    all.push(o);
    all.push(lg);
    return o;
  };
  const osc = (freq: number, type: OscillatorType = 'sine') => {
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.value = freq;
    nodes.push(o);
    all.push(o);
    return o;
  };

  const out = gain(0.5);
  out.connect(ambient);

  switch (type) {
    case 'rain': {
      const s = noiseSource('white');
      const hp = filter('highpass', 700);
      const lp = filter('lowpass', 9000);
      s.connect(hp); hp.connect(lp); lp.connect(out);
      out.gain.value = 0.7;
      break;
    }
    case 'ocean': {
      const s = noiseSource('brown');
      const hp = filter('highpass', 40);
      const lp = filter('lowpass', 500);
      s.connect(hp); hp.connect(lp); lp.connect(out);
      lfo(0.09, out.gain, 0.22, 0.45);
      lfo(0.07, lp.frequency, 250, 500);
      break;
    }
    case 'wind':
    case 'wind_harmonics': {
      const s = noiseSource('pink');
      const hp = filter('highpass', 80);
      const bp = filter('bandpass', 600, 0.8);
      const lp = filter('lowpass', 1800);
      s.connect(hp); hp.connect(bp); bp.connect(lp); lp.connect(out);
      lfo(0.05, out.gain, 0.25, 0.45);
      lfo(0.04, bp.frequency, 350, 700);
      if (type === 'wind_harmonics') {
        for (const f of [196, 294]) {
          const o = osc(f);
          const g = gain(0.02);
          o.connect(g); g.connect(ambient);
        }
      }
      break;
    }
    case 'breath':
    case 'breathform': {
      const s = noiseSource('pink');
      const hp = filter('highpass', 180);
      const lp = filter('lowpass', 1500);
      s.connect(hp); hp.connect(lp); lp.connect(out);
      lfo(0.1, out.gain, 0.32, 0.18);
      if (type === 'breathform') {
        for (const f of [132, 198, 264]) {
          const o = osc(f);
          const g = gain(0.03);
          o.connect(g); g.connect(ambient);
        }
      }
      break;
    }
    case 'hz528': {
      const o = osc(528);
      const o2 = osc(1056);
      const g2 = gain(0.06);
      o.connect(out);
      o2.connect(g2); g2.connect(out);
      out.gain.value = 0.25;
      lfo(0.05, out.gain, 0.04, 0.22);
      break;
    }
    case 'pink': {
      const s = noiseSource('pink');
      const hp = filter('highpass', 20);
      const lp = filter('lowpass', 10000);
      s.connect(hp); hp.connect(lp); lp.connect(out);
      out.gain.value = 0.7;
      break;
    }
    case 'brown': {
      const s = noiseSource('brown');
      const hp = filter('highpass', 20);
      const lp = filter('lowpass', 1200);
      s.connect(hp); hp.connect(lp); lp.connect(out);
      out.gain.value = 0.9;
      break;
    }
    case 'drone': {
      const mix = filter('lowpass', 1000);
      mix.connect(out);
      out.gain.value = 0.45;
      const freqs = [132, 198, 264, 330];
      freqs.forEach((f, i) => {
        const o = osc(f * (1 + (i % 2 === 0 ? 0.0012 : -0.0012)));
        const g = gain(0.16);
        o.connect(g); g.connect(mix);
      });
      lfo(0.03, out.gain, 0.12, 0.4);
      break;
    }
    default:
      return null;
  }

  out.gain.setValueAtTime(0.0001, t);
  const target = out.gain.value;
  out.gain.setValueAtTime(0.0001, t);
  out.gain.linearRampToValueAtTime(target, t + 0.4);

  nodes.forEach((n) => {
    try { n.start(); } catch {}
  });

  let stopped = false;
  return {
    stop() {
      if (stopped) return;
      stopped = true;
      const now = ctx.currentTime;
      try { out.gain.cancelScheduledValues(now); } catch {}
      try { out.gain.setTargetAtTime(0.0001, now, 0.05); } catch {}
      setTimeout(() => {
        nodes.forEach((n) => { try { n.stop(); } catch {} });
        all.forEach((n) => { try { n.disconnect(); } catch {} });
      }, 160);
    }
  };
}
