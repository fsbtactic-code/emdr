import { create } from 'zustand';

export type PatternType = 'horizontal' | 'vertical' | 'diagonal-1' | 'diagonal-2' | 'lemniscate' | 'dots' | 'pulse' | 'bars' | 'zigzag';
export type AudioFormat = 'continuous' | 'click' | 'metronome' | 'white_noise' | 'binaural_beats';
export type AmbientSound = 'none' | 'rain' | 'ocean' | 'breath' | 'hz528' | 'wind_harmonics' | 'breathform';
export type TargetShape = 'circle' | 'square' | 'ring' | 'butterfly';
export type VisualBackground = 'black' | 'aurora' | 'stars';
export type SymbolLanguage = 'ru' | 'en' | 'numbers';

export enum SessionPhase {
  Idle = 'idle',
  History = 'history',
  Preparation = 'preparation',
  Assessment = 'assessment',
  Desensitization = 'desensitization',
  Installation = 'installation',
  BodyScan = 'body_scan',
  Closure = 'closure'
}

export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

export interface EmdrState {
  speed: number;
  color: string;
  size: number;
  pattern: PatternType;
  isPlaying: boolean;
  audioEnabled: boolean;
  audioVolume: number;
  audioFormat: AudioFormat;
  ambientSound: AmbientSound;
  isDesync: boolean; // Desynchronize audio and visual
  randomness: number; // 0 to 100%
  cyclesPerSet: number; // Default 24 cycles per set
  setsCompleted: number;
  isSettingsOpen: boolean;
  
  // New Mechanics
  isSaccadic: boolean; // Smooth pursuit vs Saccadic (jumps)
  showSymbols: boolean; // EMDR 2.0 dual task symbol flash
  symbolLanguage: SymbolLanguage;
  targetShape: TargetShape;
  visualBackground: VisualBackground;
  activePreset: string | null;

  setSpeed: (speed: number) => void;
  setColor: (color: string) => void;
  setSize: (size: number) => void;
  setPattern: (pattern: PatternType) => void;
  togglePlaying: () => void;
  setPlaying: (isPlaying: boolean) => void;
  setAudioEnabled: (enabled: boolean) => void;
  setAudioVolume: (volume: number) => void;
  setAudioFormat: (format: AudioFormat) => void;
  setAmbientSound: (sound: AmbientSound) => void;
  setIsDesync: (isDesync: boolean) => void;
  setRandomness: (val: number) => void;
  setCyclesPerSet: (cycles: number) => void;
  incrementSets: () => void;
  setIsSettingsOpen: (isOpen: boolean) => void;
  
  setIsSaccadic: (isSaccadic: boolean) => void;
  setShowSymbols: (showSymbols: boolean) => void;
  setSymbolLanguage: (lang: SymbolLanguage) => void;
  setTargetShape: (shape: TargetShape) => void;
  setVisualBackground: (bg: VisualBackground) => void;
  applyPreset: (presetId: string) => void;
}

export interface SessionState {
  currentPhase: SessionPhase;
  suds: number | null; // Subjective Units of Disturbance 0-10
  setPhase: (phase: SessionPhase) => void;
  setSuds: (suds: number) => void;
}

export interface AiState {
  messages: Message[];
  isTyping: boolean;
  addMessage: (message: Message) => void;
  setIsTyping: (isTyping: boolean) => void;
}

export type RootState = EmdrState & SessionState & AiState;

export const useStore = create<RootState>((set) => ({
  // EMDR Slice
  speed: 1.0, // Hz
  color: '#cbd5e1', // Slate 300 base
  size: 48,
  pattern: 'horizontal',
  isPlaying: false,
  audioEnabled: true,
  audioVolume: 0.2,
  audioFormat: 'continuous',
  ambientSound: 'none',
  isDesync: false,
  randomness: 0,
  cyclesPerSet: 24, // Стандарт EMDR: 24 движения на подход
  setsCompleted: 0,
  isSettingsOpen: true, // Показываем настройки при старте сразу
  
  isSaccadic: false,
  showSymbols: false,
  symbolLanguage: 'ru',
  targetShape: 'circle',
  visualBackground: 'aurora',
  activePreset: null,
  
  setSpeed: (speed) => set({ speed, activePreset: null }),
  setColor: (color) => set({ color, activePreset: null }),
  setSize: (size) => set({ size }),
  setPattern: (pattern) => set({ pattern, activePreset: null }),
  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setPlaying: (isPlaying) => set({ isPlaying }),
  setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
  setAudioVolume: (audioVolume) => set({ audioVolume }),
  setAudioFormat: (audioFormat) => set({ audioFormat, activePreset: null }),
  setAmbientSound: (ambientSound) => set({ ambientSound, activePreset: null }),
  setIsDesync: (isDesync) => set({ isDesync, activePreset: null }),
  setRandomness: (randomness) => set({ randomness, activePreset: null }),
  setCyclesPerSet: (cyclesPerSet) => set({ cyclesPerSet }),
  incrementSets: () => set((state) => ({ setsCompleted: state.setsCompleted + 1 })),
  setIsSettingsOpen: (isSettingsOpen) => set({ isSettingsOpen }),
  
  setIsSaccadic: (isSaccadic) => set({ isSaccadic, activePreset: null }),
  setShowSymbols: (showSymbols) => set({ showSymbols, activePreset: null }),
  setSymbolLanguage: (symbolLanguage) => set({ symbolLanguage }),
  setTargetShape: (targetShape) => set({ targetShape }),
  setVisualBackground: (visualBackground) => set({ visualBackground }),
  
  applyPreset: (presetId) => {
    const presets: Record<string, Partial<EmdrState>> = {
      'anxiety': { speed: 0.8, color: '#10b981', pattern: 'horizontal', targetShape: 'circle', isSaccadic: false, isDesync: false, randomness: 0, audioFormat: 'continuous', ambientSound: 'rain', showSymbols: false, visualBackground: 'aurora' },
      'trauma_smooth': { speed: 1.0, color: '#f43f5e', pattern: 'diagonal-1', targetShape: 'circle', isSaccadic: false, isDesync: true, randomness: 10, audioFormat: 'continuous', ambientSound: 'none', showSymbols: false, visualBackground: 'black' },
      'trauma_saccadic': { speed: 1.4, color: '#f59e0b', pattern: 'diagonal-2', targetShape: 'square', isSaccadic: true, isDesync: true, randomness: 20, audioFormat: 'click', ambientSound: 'none', showSymbols: true, symbolLanguage: 'numbers', visualBackground: 'black' },
      'trauma_acute': { speed: 1.6, color: '#ef4444', pattern: 'horizontal', targetShape: 'square', isSaccadic: true, isDesync: true, randomness: 30, audioFormat: 'click', ambientSound: 'none', showSymbols: true, symbolLanguage: 'numbers', visualBackground: 'black' },
      'trauma_deep': { speed: 0.7, color: '#be185d', pattern: 'diagonal-1', targetShape: 'circle', isSaccadic: false, isDesync: false, randomness: 5, audioFormat: 'continuous', ambientSound: 'breath', showSymbols: false, visualBackground: 'aurora' },
      'trauma_body': { speed: 0.9, color: '#fb923c', pattern: 'lemniscate', targetShape: 'ring', isSaccadic: false, isDesync: false, randomness: 0, audioFormat: 'continuous', ambientSound: 'breathform', showSymbols: false, visualBackground: 'aurora' },
      'focus': { speed: 1.2, color: '#06b6d4', pattern: 'dots', targetShape: 'square', isSaccadic: false, isDesync: false, randomness: 0, audioFormat: 'white_noise', ambientSound: 'none', showSymbols: false, visualBackground: 'aurora' },
      'resource': { speed: 0.6, color: '#eab308', pattern: 'horizontal', targetShape: 'ring', isSaccadic: false, isDesync: false, randomness: 5, audioFormat: 'continuous', ambientSound: 'ocean', showSymbols: false, visualBackground: 'aurora' },
      'sleep': { speed: 0.4, color: '#8b5cf6', pattern: 'lemniscate', targetShape: 'circle', isSaccadic: false, isDesync: false, randomness: 0, audioFormat: 'binaural_beats', ambientSound: 'hz528', showSymbols: false, visualBackground: 'stars' },
      'panic': { speed: 0.8, color: '#3b82f6', pattern: 'horizontal', targetShape: 'square', isSaccadic: true, isDesync: true, randomness: 50, audioFormat: 'click', ambientSound: 'ocean', showSymbols: true, symbolLanguage: 'ru', visualBackground: 'black' },
      'adhd_focus': { speed: 1.3, color: '#22d3ee', pattern: 'horizontal', targetShape: 'square', isSaccadic: false, isDesync: false, randomness: 0, audioFormat: 'metronome', ambientSound: 'wind_harmonics', showSymbols: true, symbolLanguage: 'numbers', visualBackground: 'black' },
      'adhd_calm': { speed: 0.6, color: '#a78bfa', pattern: 'lemniscate', targetShape: 'circle', isSaccadic: false, isDesync: false, randomness: 0, audioFormat: 'binaural_beats', ambientSound: 'breathform', showSymbols: false, visualBackground: 'stars' },
      'adhd_body': { speed: 0.8, color: '#34d399', pattern: 'vertical', targetShape: 'ring', isSaccadic: false, isDesync: false, randomness: 10, audioFormat: 'continuous', ambientSound: 'breath', showSymbols: false, visualBackground: 'aurora' },
      'grounding_528': { speed: 0.5, color: '#fbbf24', pattern: 'horizontal', targetShape: 'circle', isSaccadic: false, isDesync: false, randomness: 0, audioFormat: 'continuous', ambientSound: 'hz528', showSymbols: false, visualBackground: 'aurora' },
    };
    if (presets[presetId]) {
      set({ ...presets[presetId], activePreset: presetId });
    }
  },

  // Session Slice
  currentPhase: SessionPhase.Idle,
  suds: null,
  setPhase: (currentPhase) => set({ currentPhase }),
  setSuds: (suds) => set({ suds }),

  // AI Slice
  messages: [
    {
      id: '1',
      role: 'assistant',
      content: 'Здравствуйте. Я ваш ИИ-ассистент по EMDR-терапии. Как вы себя чувствуете сейчас? Оцените свой уровень беспокойства от 0 до 10 (SUDs).',
    }
  ],
  isTyping: false,
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  setIsTyping: (isTyping) => set({ isTyping })
}));
