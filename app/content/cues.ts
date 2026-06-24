// Stepped, specialist-driven cue mechanics shown to the client.
// The specialist advances steps from the operator panel; the client sees the
// current step only (no navigation). cueStep is broadcast clamped to 0-30,
// so step counts stay well within that range.
//
// The visible text (titles and step prompts) lives in the i18n dictionary under
// `cueContent` so it gets translated per locale. The step COUNTS here are
// structural and language-independent; keep them in sync with cueContent.

export type CueTechnique = 'butterfly' | 'breathing' | 'grounding' | 'lightstream';

export const CUE_STEP_COUNTS: Record<CueTechnique, number> = {
  butterfly: 6,
  breathing: 3,
  grounding: 5,
  lightstream: 7,
};

export const cueStepCount = (tech: CueTechnique): number => CUE_STEP_COUNTS[tech];

// Clamp an arbitrary (possibly broadcast) step index into the technique range.
export const clampCueStep = (tech: CueTechnique, step: number): number => {
  const max = cueStepCount(tech) - 1;
  if (Number.isNaN(step)) return 0;
  return Math.max(0, Math.min(max, Math.floor(step)));
};
