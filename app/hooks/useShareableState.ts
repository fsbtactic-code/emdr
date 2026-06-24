'use client';

import { useStore, type EmdrState } from '../store/useStore';

export const useShareableState = () => {
  const state = useStore();

  const getShareableConfig = () => {
    const config: Partial<EmdrState> = {
      speed: state.speed,
      color: state.color,
      size: state.size,
      pattern: state.pattern,
      audioFormat: state.audioFormat,
      audioVolume: state.audioVolume,
      ambientSound: state.ambientSound,
      isSaccadic: state.isSaccadic,
      showSymbols: state.showSymbols,
      symbolLanguage: state.symbolLanguage,
      targetShape: state.targetShape,
      visualBackground: state.visualBackground,
      isDesync: state.isDesync,
      randomness: state.randomness,
      amplitude: state.amplitude,
    };
    return config;
  };

  const generateShareLink = () => {
    const config = getShareableConfig();
    const jsonString = JSON.stringify(config);
    const base64 = btoa(encodeURIComponent(jsonString));
    
    const url = new URL(window.location.href);
    url.searchParams.set('p', base64);
    return url.toString();
  };

  const sanitizeConfig = (raw: unknown): Partial<EmdrState> => {
    const c = (raw ?? {}) as Record<string, unknown>;
    const out: Partial<EmdrState> = {};
    const clamp = (v: unknown, min: number, max: number) =>
      typeof v === 'number' && isFinite(v) ? Math.min(max, Math.max(min, v)) : undefined;
    const oneOf = <T extends string>(v: unknown, set: readonly T[]) =>
      typeof v === 'string' && (set as readonly string[]).includes(v) ? (v as T) : undefined;

    const speed = clamp(c.speed, 0.5, 3.0); if (speed !== undefined) out.speed = speed;
    const size = clamp(c.size, 20, 150); if (size !== undefined) out.size = size;
    const vol = clamp(c.audioVolume, 0, 1); if (vol !== undefined) out.audioVolume = vol;
    const rnd = clamp(c.randomness, 0, 100); if (rnd !== undefined) out.randomness = rnd;
    const ampl = clamp(c.amplitude, 20, 100); if (ampl !== undefined) out.amplitude = ampl;
    if (typeof c.color === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(c.color)) out.color = c.color;
    const pattern = oneOf(c.pattern, ['horizontal', 'vertical', 'diagonal-1', 'diagonal-2', 'lemniscate', 'dots', 'pulse', 'bars', 'zigzag'] as const); if (pattern) out.pattern = pattern;
    const fmt = oneOf(c.audioFormat, ['continuous', 'click', 'metronome', 'white_noise', 'binaural_beats'] as const); if (fmt) out.audioFormat = fmt;
    const amb = oneOf(c.ambientSound, ['none', 'rain', 'ocean', 'breath', 'hz528', 'wind_harmonics', 'breathform', 'pink', 'brown', 'drone'] as const); if (amb) out.ambientSound = amb;
    const shape = oneOf(c.targetShape, ['circle', 'square', 'ring', 'butterfly'] as const); if (shape) out.targetShape = shape;
    const bg = oneOf(c.visualBackground, ['black', 'aurora', 'stars'] as const); if (bg) out.visualBackground = bg;
    const lang = oneOf(c.symbolLanguage, ['ru', 'en', 'numbers'] as const); if (lang) out.symbolLanguage = lang;
    if (typeof c.isSaccadic === 'boolean') out.isSaccadic = c.isSaccadic;
    if (typeof c.showSymbols === 'boolean') out.showSymbols = c.showSymbols;
    if (typeof c.isDesync === 'boolean') out.isDesync = c.isDesync;
    return out;
  };

  const decodeConfig = (base64: string): Partial<EmdrState> | null => {
    try {
      const jsonString = decodeURIComponent(atob(base64));
      return sanitizeConfig(JSON.parse(jsonString));
    } catch (e) {
      console.error('Failed to decode preset:', e);
      return null;
    }
  };

  return {
    generateShareLink,
    decodeConfig,
  };
};
