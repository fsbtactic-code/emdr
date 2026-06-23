import type { Dict, Locale } from "./dict";
import { ru } from "./dict";
import { en } from "./en";
import { es } from "./es";
import { it } from "./it";
import { de } from "./de";
import { fr } from "./fr";
import { pt } from "./pt";

export type { Locale, Dict };

export const LOCALE_META: Record<Locale, { native: string; flag: string }> = {
  ru: { native: "Русский", flag: "🇷🇺" },
  en: { native: "English", flag: "🇬🇧" },
  es: { native: "Español", flag: "🇪🇸" },
  it: { native: "Italiano", flag: "🇮🇹" },
  de: { native: "Deutsch", flag: "🇩🇪" },
  fr: { native: "Français", flag: "🇫🇷" },
  pt: { native: "Português", flag: "🇵🇹" }
};

export const DICTS: Record<Locale, Partial<Dict>> = { ru, en, es, it, de, fr, pt };

export const LOCALES = Object.keys(DICTS) as Locale[];

// Fallback chain: ru is the type-source and always complete; en is the
// secondary base for new keys not yet translated; the requested locale
// overrides on top. This lets us add new UI strings without breaking the
// typecheck on the 6 partially-translated locales.
export function getDict(lang: Locale): Dict {
  if (lang === "ru") return ru;
  const base = { ...ru, ...en } as Dict;
  if (lang === "en") return base;
  return { ...base, ...DICTS[lang] } as Dict;
}

export function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (LOCALES as string[]).includes(v);
}
