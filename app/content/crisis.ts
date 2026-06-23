// Crisis contact data for the EMDR trainer safety overlay.
// These are general public helplines compiled from official sources.
// Verify each number before relying on it - lines change, merge, or close.
// This file is NOT a substitute for local emergency services.
// If life is in immediate danger, call the local emergency number (112 in EU, 911 in US/CA, etc.).

import type { Locale } from '../i18n/dict';

export type CrisisContact = {
  name: string;
  phone?: string;
  url?: string;
  note?: string;
};

export const CRISIS_CONTACTS: Record<Locale, CrisisContact[]> = {
  ru: [
    {
      name: 'Телефон неотложной психологической помощи',
      phone: '8-800-2000-122',
      note: 'Бесплатно, круглосуточно. Федеральный телефон доверия для взрослых и детей.',
    },
    {
      name: 'Скорая помощь / Единая служба спасения',
      phone: '112',
      note: 'При непосредственной угрозе жизни звоните 112.',
    },
    {
      name: 'Московский телефон доверия',
      phone: '8-800-100-49-94',
      note: 'Психологическая помощь, бесплатно.',
    },
    {
      name: 'Международные линии помощи',
      url: 'https://www.iasp.info/resources/Crisis_Centres/',
      note: 'Каталог кризисных служб по всему миру (IASP).',
    },
  ],

  en: [
    {
      name: '988 Suicide and Crisis Lifeline (US)',
      phone: '988',
      url: 'https://988lifeline.org',
      note: 'Call or text 988, available 24/7 in the United States.',
    },
    {
      name: 'Crisis Text Line (US)',
      phone: 'Text HOME to 741741',
      url: 'https://www.crisistextline.org',
      note: 'Free text-based crisis support, 24/7 in the US.',
    },
    {
      name: 'Samaritans (UK and Ireland)',
      phone: '116 123',
      url: 'https://www.samaritans.org',
      note: 'Free, 24/7, available in the UK and Ireland.',
    },
    {
      name: 'Crisis Services Canada',
      phone: '1-833-456-4566',
      url: 'https://www.crisisservicescanada.ca',
      note: 'National suicide prevention line, Canada.',
    },
    {
      name: 'International Association for Suicide Prevention',
      url: 'https://www.iasp.info/resources/Crisis_Centres/',
      note: 'Directory of crisis centres worldwide.',
    },
    {
      name: 'Emergency services',
      phone: '911 (US/CA) / 999 (UK) / 112 (EU)',
      note: 'If life is in immediate danger, call your local emergency number.',
    },
  ],

  es: [
    {
      name: 'Línea de atención a la conducta suicida (España)',
      phone: '024',
      note: 'Línea nacional de prevención del suicidio, gratuita, disponible 24h.',
    },
    {
      name: 'Teléfono de la Esperanza',
      phone: '717 003 717',
      url: 'https://www.telefonodelaesperanza.org',
      note: 'Apoyo emocional y prevención del suicidio, disponible 24h.',
    },
    {
      name: 'Emergencias',
      phone: '112',
      note: 'Si hay peligro inmediato para la vida, llama al 112.',
    },
    {
      name: 'Directorio internacional de centros de crisis',
      url: 'https://www.iasp.info/resources/Crisis_Centres/',
      note: 'Recursos en otros países hispanohablantes (IASP).',
    },
  ],

  it: [
    {
      name: 'Telefono Amico',
      phone: '02 2327 2327',
      url: 'https://www.telefonoamico.it',
      note: 'Ascolto e supporto emotivo, disponibile la sera e il fine settimana.',
    },
    {
      name: 'Telefono Azzurro (minori)',
      phone: '19696',
      url: 'https://www.azzurro.it',
      note: 'Supporto per bambini e adolescenti, gratuito, 24h.',
    },
    {
      name: 'Sportello Amico',
      phone: '800 274 274',
      note: 'Linea di ascolto per situazioni di disagio psicologico.',
    },
    {
      name: 'Emergenze',
      phone: '112',
      note: "Se la vita è in pericolo immediato, chiama il 112.",
    },
    {
      name: 'Elenco internazionale centri di crisi',
      url: 'https://www.iasp.info/resources/Crisis_Centres/',
      note: 'Risorse internazionali (IASP).',
    },
  ],

  de: [
    {
      name: 'Telefonseelsorge',
      phone: '0800 111 0 111',
      url: 'https://www.telefonseelsorge.de',
      note: 'Kostenlos, anonym, 24h erreichbar. Zweite Leitung: 0800 111 0 222.',
    },
    {
      name: 'Telefonseelsorge (zweite Leitung)',
      phone: '0800 111 0 222',
      note: 'Kostenlos, anonym, 24h erreichbar.',
    },
    {
      name: 'Nummer gegen Kummer (Kinder und Jugendliche)',
      phone: '116 111',
      url: 'https://www.nummergegenkummer.de',
      note: 'Kostenlos für Kinder und Jugendliche.',
    },
    {
      name: 'Notruf',
      phone: '112',
      note: 'Bei unmittelbarer Lebensgefahr bitte 112 anrufen.',
    },
    {
      name: 'Internationale Krisenanlaufstellen',
      url: 'https://www.iasp.info/resources/Crisis_Centres/',
      note: 'Verzeichnis internationaler Krisenzentren (IASP).',
    },
  ],

  fr: [
    {
      name: '3114 - Numéro national de prévention du suicide',
      phone: '3114',
      url: 'https://www.3114.fr',
      note: 'Ligne nationale gratuite, disponible 24h/24, 7j/7.',
    },
    {
      name: 'SOS Amitié',
      phone: '09 72 39 40 50',
      url: 'https://www.sos-amitie.com',
      note: 'Écoute anonyme, 24h/24.',
    },
    {
      name: 'Urgences',
      phone: '15 (SAMU) / 112',
      note: 'En cas de danger immédiat pour la vie, appelez le 15 ou le 112.',
    },
    {
      name: 'Annuaire international des centres de crise',
      url: 'https://www.iasp.info/resources/Crisis_Centres/',
      note: "Ressources dans d'autres pays (IASP).",
    },
  ],

  pt: [
    {
      name: 'SOS Voz Amiga',
      phone: '213 544 545',
      url: 'https://www.sosvozamiga.org',
      note: 'Apoio emocional, disponível das 16h à meia-noite todos os dias.',
    },
    {
      name: 'Voz de Apoio',
      phone: '225 506 070',
      url: 'https://vozdeapoio.pt',
      note: 'Apoio emocional e prevenção do suicídio, Porto.',
    },
    {
      name: 'Centro de Apoio ao Luto e Crise (CALC)',
      phone: '800 202 664',
      note: 'Linha de apoio em situação de crise, gratuita.',
    },
    {
      name: 'Emergência',
      phone: '112',
      note: 'Se a vida está em perigo imediato, ligue para o 112.',
    },
    {
      name: 'Diretório internacional de centros de crise',
      url: 'https://www.iasp.info/resources/Crisis_Centres/',
      note: 'Recursos em outros países (IASP).',
    },
  ],
};

/**
 * Returns crisis contacts for the given locale.
 * Falls back to English if the locale array is empty or missing.
 */
export function getCrisisContacts(lang: Locale): CrisisContact[] {
  const contacts = CRISIS_CONTACTS[lang];
  if (contacts && contacts.length > 0) {
    return contacts;
  }
  return CRISIS_CONTACTS['en'];
}
