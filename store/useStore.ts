import { create } from 'zustand';

export type PatternType = 'horizontal' | 'vertical' | 'diagonal-1' | 'diagonal-2' | 'lemniscate' | 'dots' | 'pulse' | 'bars' | 'zigzag';
export type AudioFormat = 'continuous' | 'click' | 'metronome';

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
  isDesync: boolean; // Desynchronize audio and visual
  randomness: number; // 0 to 100%
  
  setSpeed: (speed: number) => void;
  setColor: (color: string) => void;
  setSize: (size: number) => void;
  setPattern: (pattern: PatternType) => void;
  togglePlaying: () => void;
  setPlaying: (isPlaying: boolean) => void;
  setAudioEnabled: (enabled: boolean) => void;
  setAudioVolume: (volume: number) => void;
  setAudioFormat: (format: AudioFormat) => void;
  setIsDesync: (isDesync: boolean) => void;
  setRandomness: (val: number) => void;
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
  isDesync: false,
  randomness: 0,
  setSpeed: (speed) => set({ speed }),
  setColor: (color) => set({ color }),
  setSize: (size) => set({ size }),
  setPattern: (pattern) => set({ pattern }),
  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setPlaying: (isPlaying) => set({ isPlaying }),
  setAudioEnabled: (audioEnabled) => set({ audioEnabled }),
  setAudioVolume: (audioVolume) => set({ audioVolume }),
  setAudioFormat: (audioFormat) => set({ audioFormat }),
  setIsDesync: (isDesync) => set({ isDesync }),
  setRandomness: (randomness) => set({ randomness }),

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
