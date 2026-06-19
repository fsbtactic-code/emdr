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

export const DICTS: Record<Locale, Dict> = { ru, en, es, it, de, fr, pt };

export const LOCALES = Object.keys(DICTS) as Locale[];

export function getDict(lang: Locale): Dict {
  return DICTS[lang] ?? ru;
}

export function isLocale(v: unknown): v is Locale {
  return typeof v === "string" && (LOCALES as string[]).includes(v);
}
