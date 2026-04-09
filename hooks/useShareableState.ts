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
    };
    return config;
  };

  const generateShareLink = () => {
    const config = getShareableConfig();
    const jsonString = JSON.stringify(config);
    const base64 = btoa(encodeURIComponent(jsonString));
    
    // Create the URL
    const url = new URL(window.location.href);
    url.searchParams.set('p', base64);
    return url.toString();
  };

  const decodeConfig = (base64: string): Partial<EmdrState> | null => {
    try {
      const jsonString = decodeURIComponent(atob(base64));
      return JSON.parse(jsonString);
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
