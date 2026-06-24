// Stepped, specialist-driven cue content shown to the client.
// The specialist advances steps from the operator panel; the client sees the
// current step only (no navigation). cueStep is broadcast clamped to 0-30,
// so keep step counts well within that range.

export type CueTechnique = 'butterfly' | 'breathing' | 'grounding';

export interface CueStep {
  ru: string;
  en: string;
}

export interface CueContent {
  id: CueTechnique;
  titleRu: string;
  titleEn: string;
  steps: CueStep[];
}

export const CUE_CONTENT: Record<CueTechnique, CueContent> = {
  butterfly: {
    id: 'butterfly',
    titleRu: 'Объятие бабочки',
    titleEn: 'Butterfly hug',
    steps: [
      {
        ru: 'Сядьте удобно. Скрестите руки на груди, ладони на плечах.',
        en: 'Sit comfortably. Cross your arms over your chest, palms on your shoulders.',
      },
      {
        ru: 'Закройте глаза или мягко опустите взгляд. Один спокойный вдох.',
        en: 'Close your eyes or soften your gaze downward. One calm breath.',
      },
      {
        ru: 'Медленно постукивайте по плечам по очереди: слева, потом справа.',
        en: 'Tap your shoulders slowly, one at a time: left, then right.',
      },
      {
        ru: 'Дышите ровно и спокойно. Держите ритм примерно раз в секунду.',
        en: 'Breathe steadily and calmly. Keep a pace of about one tap per second.',
      },
      {
        ru: 'Сделайте 20-30 попеременных постукиваний в спокойном темпе.',
        en: 'Do 20-30 alternating taps at a calm pace.',
      },
      {
        ru: 'Остановитесь. Опустите руки и сделайте глубокий вдох.',
        en: 'Stop. Lower your arms and take a deep breath.',
      },
    ],
  },
  breathing: {
    id: 'breathing',
    titleRu: 'Дыхание по квадрату',
    titleEn: 'Box breathing',
    steps: [
      {
        ru: 'Сядьте удобно, расслабьте плечи. Следите за кругом на экране.',
        en: 'Sit comfortably, relax your shoulders. Follow the circle on screen.',
      },
      {
        ru: 'Дышите вместе с кругом: вдох на расширении, выдох на сжатии.',
        en: 'Breathe with the circle: inhale as it grows, exhale as it shrinks.',
      },
      {
        ru: 'Держите ровный ритм: вдох 4, задержка 4, выдох 4, задержка 4.',
        en: 'Keep an even rhythm: inhale 4, hold 4, exhale 4, hold 4.',
      },
    ],
  },
  grounding: {
    id: 'grounding',
    titleRu: 'Заземление 5-4-3-2-1',
    titleEn: 'Grounding 5-4-3-2-1',
    steps: [
      {
        ru: 'Назовите про себя 5 вещей, которые вы видите вокруг.',
        en: 'Name to yourself 5 things you can see around you.',
      },
      {
        ru: 'Назовите 4 вещи, которые вы можете потрогать.',
        en: 'Name 4 things you can touch.',
      },
      {
        ru: 'Назовите 3 звука, которые вы слышите.',
        en: 'Name 3 sounds you can hear.',
      },
      {
        ru: 'Назовите 2 запаха, которые вы чувствуете.',
        en: 'Name 2 smells you can notice.',
      },
      {
        ru: 'Назовите 1 вкус, который вы ощущаете. Сделайте спокойный вдох.',
        en: 'Name 1 taste you can sense. Take a calm breath.',
      },
    ],
  },
};

export const cueTitle = (tech: CueTechnique, lang: string): string =>
  lang === 'ru' ? CUE_CONTENT[tech].titleRu : CUE_CONTENT[tech].titleEn;

export const cueStepCount = (tech: CueTechnique): number => CUE_CONTENT[tech].steps.length;

// Clamp an arbitrary (possibly broadcast) step index into the technique range.
export const clampCueStep = (tech: CueTechnique, step: number): number => {
  const max = cueStepCount(tech) - 1;
  if (Number.isNaN(step)) return 0;
  return Math.max(0, Math.min(max, Math.floor(step)));
};

export const cueStepText = (tech: CueTechnique, step: number, lang: string): string => {
  const idx = clampCueStep(tech, step);
  const s = CUE_CONTENT[tech].steps[idx];
  return lang === 'ru' ? s.ru : s.en;
};
