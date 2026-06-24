import { create } from 'zustand';
import type { Locale } from '../i18n/dict';

export type PatternType = 'horizontal' | 'vertical' | 'diagonal-1' | 'diagonal-2' | 'lemniscate' | 'dots' | 'pulse' | 'bars' | 'zigzag';
export type AudioFormat = 'continuous' | 'click' | 'metronome' | 'white_noise' | 'binaural_beats';
export type AmbientSound = 'none' | 'rain' | 'ocean' | 'breath' | 'hz528' | 'wind_harmonics' | 'breathform' | 'pink' | 'brown' | 'drone';
export type TargetShape = 'circle' | 'square' | 'ring' | 'butterfly';
export type VisualBackground = 'black' | 'aurora' | 'stars';
export type SymbolLanguage = 'ru' | 'en' | 'numbers';
export type ClientSignal = 'ok' | 'pause' | 'stop';
export type AppMode = 'specialist' | 'selfhelp';
export type ClientCue = 'none' | 'butterfly' | 'breathing' | 'grounding';

export interface SudsEntry { t: number; phase: string; value: number }
export interface SetObservation { set: number; note: string; suds: number | null }

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
  isDesync: boolean;
  randomness: number;
  amplitude: number;
  cyclesPerSet: number;
  setsCompleted: number;
  isSettingsOpen: boolean;
  
  isSaccadic: boolean;
  showSymbols: boolean;
  symbolLanguage: SymbolLanguage;
  targetShape: TargetShape;
  visualBackground: VisualBackground;
  activePreset: string | null;
  isFeedbackOpen: boolean;
  isGuideOpen: boolean;

  lang: Locale;

  appMode: AppMode | null;

  isClient: boolean;
  isHost: boolean;
  roomId: string | null;
  isSessionOpen: boolean;
  clientActive: boolean;

  safeMode: boolean;
  isGroundingOpen: boolean;

  ambientVolume: number;
  hapticEnabled: boolean;
  visualEnabled: boolean;
  vestibularSafe: boolean;

  isResourcesOpen: boolean;
  isJournalOpen: boolean;
  isGateOpen: boolean;
  isClinicalOpen: boolean;

  isOnboardingOpen: boolean;
  onboardingMode: AppMode | null;
  onboardingSeenSpecialist: boolean;
  onboardingSeenSelfhelp: boolean;

  consentGiven: boolean;
  dissociationScreenPassed: boolean;

  clientSignal: ClientSignal | null;
  incomingSignal: ClientSignal | null;
  signalAt: number | null;
  connectionLost: boolean;
  clientCue: ClientCue;
  cueStep: number;

  sessionStartedAt: number | null;

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
  setAmplitude: (val: number) => void;
  setCyclesPerSet: (cycles: number) => void;
  incrementSets: () => void;
  setIsSettingsOpen: (isOpen: boolean) => void;
  
  setIsSaccadic: (isSaccadic: boolean) => void;
  setShowSymbols: (showSymbols: boolean) => void;
  setSymbolLanguage: (lang: SymbolLanguage) => void;
  setTargetShape: (shape: TargetShape) => void;
  setVisualBackground: (bg: VisualBackground) => void;
  applyPreset: (presetId: string) => void;
  setIsFeedbackOpen: (isOpen: boolean) => void;
  setIsGuideOpen: (isOpen: boolean) => void;
  setSafeMode: (safeMode: boolean) => void;
  setIsGroundingOpen: (isOpen: boolean) => void;
  setLang: (lang: Locale) => void;
  setAppMode: (mode: AppMode | null) => void;
  setIsClient: (isClient: boolean) => void;
  setIsHost: (isHost: boolean) => void;
  setRoomId: (roomId: string | null) => void;
  setIsSessionOpen: (isOpen: boolean) => void;
  setClientActive: (active: boolean) => void;
  applyConfig: (config: Partial<EmdrState>) => void;
  resetSession: () => void;

  setAmbientVolume: (v: number) => void;
  setHapticEnabled: (v: boolean) => void;
  setVisualEnabled: (v: boolean) => void;
  setVestibularSafe: (v: boolean) => void;
  setIsResourcesOpen: (v: boolean) => void;
  setIsJournalOpen: (v: boolean) => void;
  setIsGateOpen: (v: boolean) => void;
  setIsClinicalOpen: (v: boolean) => void;
  setIsOnboardingOpen: (v: boolean) => void;
  setOnboardingMode: (m: AppMode | null) => void;
  markOnboardingSeen: (m: AppMode) => void;
  setConsentGiven: (v: boolean) => void;
  setDissociationScreenPassed: (v: boolean) => void;
  setClientSignal: (v: ClientSignal | null) => void;
  setIncomingSignal: (v: ClientSignal | null) => void;
  setConnectionLost: (v: boolean) => void;
  setClientCue: (v: ClientCue) => void;
  setCueStep: (v: number) => void;
  setSessionStartedAt: (v: number | null) => void;
}

export interface SessionState {
  currentPhase: SessionPhase;
  suds: number | null;
  vocInitial: number | null;
  vocCurrent: number | null;
  targetDesc: string;
  negCognition: string;
  posCognition: string;
  emotions: string;
  bodyLocation: string;
  sudsLog: SudsEntry[];
  observations: SetObservation[];
  therapistNotes: string;
  setPhase: (phase: SessionPhase) => void;
  setSuds: (suds: number | null) => void;
  setVocInitial: (v: number | null) => void;
  setVocCurrent: (v: number | null) => void;
  setTargetDesc: (v: string) => void;
  setNegCognition: (v: string) => void;
  setPosCognition: (v: string) => void;
  setEmotions: (v: string) => void;
  setBodyLocation: (v: string) => void;
  setTherapistNotes: (v: string) => void;
  logSuds: (value: number) => void;
  addObservation: (obs: SetObservation) => void;
  resetClinical: () => void;
}

export type RootState = EmdrState & SessionState;

export const useStore = create<RootState>((set) => ({
  speed: 1.0,
  color: '#cbd5e1',
  size: 48,
  pattern: 'horizontal',
  isPlaying: false,
  audioEnabled: true,
  audioVolume: 0.2,
  audioFormat: 'continuous',
  ambientSound: 'none',
  isDesync: false,
  randomness: 0,
  amplitude: 100,
  cyclesPerSet: 24,
  setsCompleted: 0,
  isSettingsOpen: true,
  
  isSaccadic: false,
  showSymbols: false,
  symbolLanguage: 'ru',
  targetShape: 'circle',
  visualBackground: 'aurora',
  activePreset: null,
  isFeedbackOpen: false,
  isGuideOpen: false,
  lang: 'ru',
  appMode: null,
  isClient: false,
  isHost: false,
  roomId: null,
  isSessionOpen: false,
  clientActive: false,
  safeMode: false,
  isGroundingOpen: false,

  ambientVolume: 0.5,
  hapticEnabled: false,
  visualEnabled: true,
  vestibularSafe: false,
  isResourcesOpen: false,
  isJournalOpen: false,
  isGateOpen: false,
  isClinicalOpen: false,
  isOnboardingOpen: false,
  onboardingMode: null,
  onboardingSeenSpecialist: false,
  onboardingSeenSelfhelp: false,
  consentGiven: false,
  dissociationScreenPassed: false,
  clientSignal: null,
  incomingSignal: null,
  signalAt: null,
  connectionLost: false,
  clientCue: 'none',
  cueStep: 0,
  sessionStartedAt: null,

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
  setAmplitude: (amplitude) => set({ amplitude }),
  setCyclesPerSet: (cyclesPerSet) => set({ cyclesPerSet }),
  incrementSets: () => set((state) => ({ setsCompleted: state.setsCompleted + 1 })),
  setIsSettingsOpen: (isSettingsOpen) => set({ isSettingsOpen }),
  
  setIsSaccadic: (isSaccadic) => set({ isSaccadic, activePreset: null }),
  setShowSymbols: (showSymbols) => set({ showSymbols, activePreset: null }),
  setSymbolLanguage: (symbolLanguage) => set({ symbolLanguage }),
  setTargetShape: (targetShape) => set({ targetShape }),
  setVisualBackground: (visualBackground) => set({ visualBackground }),
  setIsFeedbackOpen: (isFeedbackOpen) => set({ isFeedbackOpen }),
  setIsGuideOpen: (isGuideOpen) => set({ isGuideOpen }),
  setSafeMode: (safeMode) => set({ safeMode }),
  setIsGroundingOpen: (isGroundingOpen) => set({ isGroundingOpen }),
  setLang: (lang) => {
    try { localStorage.setItem('emdr_lang', lang); } catch {}
    set({ lang });
  },
  setAppMode: (appMode) => {
    try {
      if (appMode) localStorage.setItem('emdr_mode', appMode);
      else localStorage.removeItem('emdr_mode');
    } catch {}
    set({ appMode });
  },
  setIsClient: (isClient) => set({ isClient }),
  setIsHost: (isHost) => set({ isHost }),
  setRoomId: (roomId) => set({ roomId }),
  setIsSessionOpen: (isSessionOpen) => set({ isSessionOpen }),
  setClientActive: (clientActive) => set({ clientActive }),

  applyPreset: (presetId) => {
    const presets: Record<string, Partial<EmdrState>> = {
      'anxiety': { speed: 0.8, color: '#10b981', pattern: 'horizontal', targetShape: 'circle', isSaccadic: false, isDesync: false, randomness: 0, audioFormat: 'continuous', ambientSound: 'rain', showSymbols: false, visualBackground: 'aurora' },
      'trauma_smooth': { speed: 1.0, color: '#f43f5e', pattern: 'diagonal-1', targetShape: 'circle', isSaccadic: false, isDesync: true, randomness: 10, audioFormat: 'continuous', ambientSound: 'none', showSymbols: false, visualBackground: 'black' },
      'trauma_saccadic': { speed: 1.4, color: '#f59e0b', pattern: 'diagonal-2', targetShape: 'square', isSaccadic: true, isDesync: true, randomness: 20, audioFormat: 'click', ambientSound: 'none', showSymbols: true, symbolLanguage: 'numbers', visualBackground: 'black' },
      'trauma_acute': { speed: 1.6, color: '#ef4444', pattern: 'horizontal', targetShape: 'square', isSaccadic: true, isDesync: true, randomness: 30, audioFormat: 'click', ambientSound: 'none', showSymbols: true, symbolLanguage: 'numbers', visualBackground: 'black' },
      'trauma_deep': { speed: 0.7, color: '#be185d', pattern: 'diagonal-1', targetShape: 'circle', isSaccadic: false, isDesync: false, randomness: 5, audioFormat: 'continuous', ambientSound: 'breath', showSymbols: false, visualBackground: 'aurora' },
      'trauma_body': { speed: 0.9, color: '#fb923c', pattern: 'lemniscate', targetShape: 'ring', isSaccadic: false, isDesync: false, randomness: 0, audioFormat: 'continuous', ambientSound: 'breathform', showSymbols: false, visualBackground: 'aurora' },
      'trauma_flashback': { speed: 1.8, color: '#ff0000', pattern: 'zigzag', targetShape: 'square', isSaccadic: true, isDesync: true, randomness: 40, audioFormat: 'click', ambientSound: 'none', showSymbols: true, symbolLanguage: 'numbers', visualBackground: 'black' },
      'focus': { speed: 1.2, color: '#06b6d4', pattern: 'dots', targetShape: 'square', isSaccadic: false, isDesync: false, randomness: 0, audioFormat: 'white_noise', ambientSound: 'none', showSymbols: false, visualBackground: 'aurora' },
      'resource': { speed: 0.6, color: '#eab308', pattern: 'horizontal', targetShape: 'ring', isSaccadic: false, isDesync: false, randomness: 5, audioFormat: 'continuous', ambientSound: 'ocean', showSymbols: false, visualBackground: 'aurora' },
      'sleep': { speed: 0.4, color: '#8b5cf6', pattern: 'lemniscate', targetShape: 'circle', isSaccadic: false, isDesync: false, randomness: 0, audioFormat: 'binaural_beats', ambientSound: 'hz528', showSymbols: false, visualBackground: 'stars' },
      'panic': { speed: 0.8, color: '#3b82f6', pattern: 'horizontal', targetShape: 'square', isSaccadic: true, isDesync: true, randomness: 50, audioFormat: 'click', ambientSound: 'ocean', showSymbols: true, symbolLanguage: 'ru', visualBackground: 'black' },
      'adhd_focus': { speed: 1.3, color: '#22d3ee', pattern: 'horizontal', targetShape: 'square', isSaccadic: false, isDesync: false, randomness: 0, audioFormat: 'metronome', ambientSound: 'wind_harmonics', showSymbols: true, symbolLanguage: 'numbers', visualBackground: 'black' },
      'adhd_impulse': { speed: 1.5, color: '#4f46e5', pattern: 'bars', targetShape: 'square', isSaccadic: true, isDesync: false, randomness: 20, audioFormat: 'click', ambientSound: 'none', showSymbols: true, symbolLanguage: 'en', visualBackground: 'black' },
      'adhd_calm': { speed: 0.6, color: '#a78bfa', pattern: 'lemniscate', targetShape: 'circle', isSaccadic: false, isDesync: false, randomness: 0, audioFormat: 'binaural_beats', ambientSound: 'breathform', showSymbols: false, visualBackground: 'stars' },
      'adhd_body': { speed: 0.8, color: '#34d399', pattern: 'vertical', targetShape: 'ring', isSaccadic: false, isDesync: false, randomness: 10, audioFormat: 'continuous', ambientSound: 'breath', showSymbols: false, visualBackground: 'aurora' },
      'grounding_528': { speed: 0.5, color: '#fbbf24', pattern: 'horizontal', targetShape: 'circle', isSaccadic: false, isDesync: false, randomness: 0, audioFormat: 'continuous', ambientSound: 'hz528', showSymbols: false, visualBackground: 'aurora' },
    };
    if (presets[presetId]) {
      set({ ...presets[presetId], activePreset: presetId });
    }
  },
  applyConfig: (config) => set((state) => ({ ...state, ...config, activePreset: 'custom' })),
  resetSession: () => set({ setsCompleted: 0, isPlaying: false }),

  setAmbientVolume: (ambientVolume) => set({ ambientVolume }),
  setHapticEnabled: (hapticEnabled) => set({ hapticEnabled }),
  setVisualEnabled: (visualEnabled) => set({ visualEnabled }),
  setVestibularSafe: (vestibularSafe) => set({ vestibularSafe }),
  setIsResourcesOpen: (isResourcesOpen) => set({ isResourcesOpen }),
  setIsJournalOpen: (isJournalOpen) => set({ isJournalOpen }),
  setIsGateOpen: (isGateOpen) => set({ isGateOpen }),
  setIsClinicalOpen: (isClinicalOpen) => set({ isClinicalOpen }),
  setIsOnboardingOpen: (isOnboardingOpen) => set({ isOnboardingOpen }),
  setOnboardingMode: (onboardingMode) => set({ onboardingMode }),
  markOnboardingSeen: (m) => {
    try { localStorage.setItem('emdr_ob_' + m, '1'); } catch {}
    set(m === 'specialist' ? { onboardingSeenSpecialist: true } : { onboardingSeenSelfhelp: true });
  },
  setConsentGiven: (consentGiven) => set({ consentGiven }),
  setDissociationScreenPassed: (dissociationScreenPassed) => set({ dissociationScreenPassed }),
  setClientSignal: (clientSignal) => set({ clientSignal, signalAt: clientSignal ? Date.now() : null }),
  setIncomingSignal: (incomingSignal) => set({ incomingSignal }),
  setConnectionLost: (connectionLost) => set({ connectionLost }),
  setClientCue: (clientCue) => set({ clientCue, cueStep: 0 }),
  setCueStep: (cueStep) => set({ cueStep }),
  setSessionStartedAt: (sessionStartedAt) => set({ sessionStartedAt }),

  currentPhase: SessionPhase.Idle,
  suds: null,
  vocInitial: null,
  vocCurrent: null,
  targetDesc: '',
  negCognition: '',
  posCognition: '',
  emotions: '',
  bodyLocation: '',
  sudsLog: [],
  observations: [],
  therapistNotes: '',
  setPhase: (currentPhase) => set({ currentPhase }),
  setSuds: (suds) => set({ suds }),
  setVocInitial: (vocInitial) => set({ vocInitial }),
  setVocCurrent: (vocCurrent) => set({ vocCurrent }),
  setTargetDesc: (targetDesc) => set({ targetDesc }),
  setNegCognition: (negCognition) => set({ negCognition }),
  setPosCognition: (posCognition) => set({ posCognition }),
  setEmotions: (emotions) => set({ emotions }),
  setBodyLocation: (bodyLocation) => set({ bodyLocation }),
  setTherapistNotes: (therapistNotes) => set({ therapistNotes }),
  logSuds: (value) => set((s) => ({ suds: value, sudsLog: [...s.sudsLog, { t: Date.now(), phase: s.currentPhase, value }] })),
  addObservation: (obs) => set((s) => ({ observations: [...s.observations, obs] })),
  resetClinical: () => set({
    currentPhase: SessionPhase.Idle, suds: null, vocInitial: null, vocCurrent: null,
    targetDesc: '', negCognition: '', posCognition: '', emotions: '', bodyLocation: '',
    sudsLog: [], observations: [], therapistNotes: ''
  })
}));
