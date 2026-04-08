import { useStore, SessionPhase } from '../store/useStore';

export const change_stimulation_speed = (targetHz: number) => {
  console.log(`[AI Agent] Изменение скорости на ${targetHz} Hz`);
  useStore.getState().setSpeed(targetHz);
};

export const pause_stimulation = (reason: string) => {
  console.log(`[AI Agent] Пауза стимуляции, причина: ${reason}`);
  useStore.getState().setPlaying(false);
};

export const start_stimulation = () => {
    console.log(`[AI Agent] Запуск стимуляции`);
    useStore.getState().setPlaying(true);
};

export const change_phase = (newPhase: SessionPhase) => {
  console.log(`[AI Agent] Смена фазы на ${newPhase}`);
  useStore.getState().setPhase(newPhase);
};

export const trigger_grounding_exercise = () => {
  console.log(`[AI Agent] Упражнение на заземление`);
  useStore.getState().setPlaying(false);
};
