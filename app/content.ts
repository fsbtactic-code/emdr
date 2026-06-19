export type EvidenceLevel = "strong" | "moderate" | "emerging" | "insufficient";

export const EVIDENCE_ORDER = [
  "ptsd", "phobias", "panic", "anxiety", "depression",
  "pain", "grief", "addiction", "psychosis", "adhd", "sleep"
] as const;
export type EvidenceKey = (typeof EVIDENCE_ORDER)[number];

export const EVIDENCE_LEVEL_COLORS: Record<
  EvidenceLevel,
  { color: string; bg: string; border: string }
> = {
  strong: { color: "#34d399", bg: "rgba(16,185,129,0.12)", border: "rgba(16,185,129,0.25)" },
  moderate: { color: "#22d3ee", bg: "rgba(6,182,212,0.12)", border: "rgba(6,182,212,0.25)" },
  emerging: { color: "#fbbf24", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.22)" },
  insufficient: { color: "#fb7185", bg: "rgba(244,63,94,0.10)", border: "rgba(244,63,94,0.20)" }
};

export const BOX_BREATH_SECONDS = [4, 4, 4, 4];
export const BREATH_SCALE = [1.6, 1.6, 1, 1];

export type Reference = { cite: string; url: string };

export const REFERENCES: Reference[] = [
  { cite: "WHO, 2013. Guidelines for the Management of Conditions Specifically Related to Stress", url: "https://www.ncbi.nlm.nih.gov/books/NBK159723/" },
  { cite: "APA, 2017. Clinical Practice Guideline for the Treatment of PTSD in Adults", url: "https://www.apa.org/ptsd-guideline/treatments" },
  { cite: "NICE NG116, 2018. Post-traumatic stress disorder", url: "https://www.nice.org.uk/guidance/ng116/chapter/recommendations" },
  { cite: "ISTSS, 2018/2019. PTSD Prevention and Treatment Guidelines", url: "https://istss.org/clinical-resources/trauma-treatment/istss-prevention-and-treatment-guidelines/" },
  { cite: "Bisson JI et al., 2013. Cochrane Review CD003388", url: "https://www.cochrane.org/evidence/CD003388_psychological-therapies-chronic-post-traumatic-stress-disorder-ptsd-adults" },
  { cite: "Watts BV, de Jongh A et al., 2017. Errors in the 2017 APA Guideline (Front. Psychol.)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5572405/" },
  { cite: "APA. 8 phases of EMDR therapy", url: "https://www.apa.org/topics/psychotherapy/emdr-phases" },
  { cite: "Andrade J, Kavanagh D, Baddeley A, 1997. Eye movements and visual imagery (Br J Clin Psychol)", url: "https://pubmed.ncbi.nlm.nih.gov/9167862/" },
  { cite: "Lee CW & Cuijpers P, 2013. Meta-analysis of the contribution of eye movements", url: "https://pubmed.ncbi.nlm.nih.gov/23266601/" },
  { cite: "Landin-Romero R et al., 2018. How Does EMDR Therapy Work? (Front. Psychol.)", url: "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2018.01395/full" },
  { cite: "Valiente-Gomez A et al., 2017. EMDR beyond PTSD (Front. Psychol.)", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5623122/" },
  { cite: "Waterman LZ & Cooper M, 2020. Self-administered EMDR: solution or unregulated recipe for disaster? (BJPsych Open)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7576659/" },
  { cite: "Ingendoh RM et al., 2023. Binaural beats to entrain the brain? A systematic review (PLOS ONE)", url: "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0286023" },
  { cite: "W3C. Understanding WCAG SC 2.3.1 Three Flashes or Below Threshold", url: "https://www.w3.org/WAI/WCAG21/Understanding/three-flashes-or-below-threshold.html" },
  { cite: "Epilepsy Foundation. Photosensitivity and Seizures", url: "https://www.epilepsy.com/what-is-epilepsy/seizure-triggers/photosensitivity" }
];
