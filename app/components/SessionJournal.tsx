'use client';

import { useCallback, useEffect, useState } from 'react';
import { BookOpen, Trash2, Download, FileJson, ShieldCheck } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { Locale } from '../i18n/dict';
import {
  listSessions,
  deleteSession,
  clearSessions,
  exportJSON,
  exportCSV,
  type JournalEntry,
} from '../lib/journal';
import { OverlayShell } from './ui/OverlayShell';
import { IconButton } from './ui/IconButton';
import { Button } from './ui/Button';
import { Chip } from './ui/Chip';
import { InfoBanner } from './ui/InfoBanner';

type Strings = {
  badge: string;
  title: string;
  subtitle: string;
  empty: string;
  duration: string;
  mode: string;
  modeSolo: string;
  modeHost: string;
  modeClient: string;
  phase: string;
  suds: string;
  sudsTo: string;
  observations: string;
  client: string;
  deleteOne: string;
  clearAll: string;
  clearConfirm: string;
  downloadJson: string;
  downloadCsv: string;
  close: string;
  privacyTitle: string;
  privacyBody: string;
};

const STRINGS: Record<'ru' | 'en', Strings> = {
  ru: {
    badge: 'Zhurnal sessij',
    title: 'Istoriya sessij',
    subtitle: 'Zapisi khranitsya tol\'ko na etom ustrojstve',
    empty: 'Poka net sokhranyonnykh sessij.',
    duration: 'Dlitel\'nost\'',
    mode: 'Rezhim',
    modeSolo: 'samostoyatel\'no',
    modeHost: 'spetsialist',
    modeClient: 'klient',
    phase: 'Etap',
    suds: 'SUD',
    sudsTo: 'do',
    observations: 'nablyudenij',
    client: 'Kod klienta',
    deleteOne: 'Udalit\'',
    clearAll: 'Ochistit\' vse',
    clearConfirm: 'Udalit\' vse zapisi zhurnala bez vozmozhnosti vosstanovleniya?',
    downloadJson: 'Skachat\' JSON',
    downloadCsv: 'Skachat\' CSV',
    close: 'Zakryt\'',
    privacyTitle: 'Privatnost\'',
    privacyBody:
      'Dannye khranitsya tol\'ko na etom ustrojstve i psevdonimizirovany (bez imen, tol\'ko kod). Vy yavlyaetes\' operatorom etikh dannykh. Poluchite soglasie klienta pered zapisyu.',
  },
  en: {
    badge: 'Session journal',
    title: 'Session history',
    subtitle: 'Records are stored only on this device',
    empty: 'No saved sessions yet.',
    duration: 'Duration',
    mode: 'Mode',
    modeSolo: 'solo',
    modeHost: 'practitioner',
    modeClient: 'client',
    phase: 'Phase',
    suds: 'SUD',
    sudsTo: 'to',
    observations: 'observations',
    client: 'Client code',
    deleteOne: 'Delete',
    clearAll: 'Clear all',
    clearConfirm: 'Permanently delete all journal records?',
    downloadJson: 'Download JSON',
    downloadCsv: 'Download CSV',
    close: 'Close',
    privacyTitle: 'Privacy',
    privacyBody:
      'Data is stored only on this device and pseudonymized (no names, code only). You are the data controller. Obtain consent before recording.',
  },
};

function pickStrings(lang: Locale): Strings {
  return lang === 'en' ? STRINGS.en : STRINGS.ru;
}

function formatDate(ts: number, lang: Locale): string {
  try {
    return new Date(ts).toLocaleString(lang === 'en' ? 'en-US' : 'ru-RU', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return new Date(ts).toISOString();
  }
}

function formatDuration(sec: number, lang: Locale): string {
  const total = Math.max(0, Math.round(sec));
  const m = Math.floor(total / 60);
  const s = total % 60;
  if (lang === 'en') return m > 0 ? `${m}m ${s}s` : `${s}s`;
  return m > 0 ? `${m} min ${s} s` : `${s} s`;
}

function modeLabel(mode: JournalEntry['mode'], t: Strings): string {
  if (mode === 'host') return t.modeHost;
  if (mode === 'client') return t.modeClient;
  return t.modeSolo;
}

function download(filename: string, content: string, type: string) {
  if (typeof document === 'undefined') return;
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function SessionJournal() {
  const isJournalOpen = useStore((s) => s.isJournalOpen);
  const setIsJournalOpen = useStore((s) => s.setIsJournalOpen);
  const lang = useStore((s) => s.lang);
  const t = pickStrings(lang);

  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const list = await listSessions();
      setEntries(list);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isJournalOpen) {
      void load();
    }
  }, [isJournalOpen, load]);

  const handleDelete = useCallback(
    async (id: string) => {
      await deleteSession(id);
      await load();
    },
    [load]
  );

  const handleClearAll = useCallback(async () => {
    if (typeof window !== 'undefined' && !window.confirm(t.clearConfirm)) return;
    await clearSessions();
    await load();
  }, [load, t.clearConfirm]);

  const handleJson = useCallback(() => {
    download(`emdr-journal-${Date.now()}.json`, exportJSON(entries), 'application/json');
  }, [entries]);

  const handleCsv = useCallback(() => {
    download(`emdr-journal-${Date.now()}.csv`, exportCSV(entries), 'text/csv');
  }, [entries]);

  return (
    <OverlayShell
      open={isJournalOpen}
      onClose={() => setIsJournalOpen(false)}
      maxWidth="max-w-2xl"
      z="overlay"
      glow="info"
      ariaLabel={t.title}
      className="max-h-[92vh] overflow-y-auto no-scrollbar"
    >
      {/* Close button */}
      <div className="absolute top-3 right-3 z-20">
        <IconButton
          aria-label={t.close}
          variant="ghost"
          size="md"
          shape="round"
          onClick={() => setIsJournalOpen(false)}
        >
          <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><line x1="3" y1="3" x2="15" y2="15"/><line x1="15" y1="3" x2="3" y2="15"/></svg>
        </IconButton>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 text-cyan-200 text-[12px] font-bold uppercase tracking-[0.14em] mb-1">
          <BookOpen size={14} /> {t.badge}
        </div>
        <h2 className="text-[22px] font-bold text-white tracking-tight mb-1">{t.title}</h2>
        <p className="text-white/45 text-[13px] mb-5">{t.subtitle}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          <Button
            variant="ghost"
            size="sm"
            iconLeft={<FileJson size={14} />}
            disabled={entries.length === 0}
            onClick={handleJson}
          >
            {t.downloadJson}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            iconLeft={<Download size={14} />}
            disabled={entries.length === 0}
            onClick={handleCsv}
          >
            {t.downloadCsv}
          </Button>
          <Button
            variant="danger"
            size="sm"
            iconLeft={<Trash2 size={14} />}
            disabled={entries.length === 0}
            onClick={handleClearAll}
            className="ml-auto"
          >
            {t.clearAll}
          </Button>
        </div>

        <div className="flex flex-col gap-2.5 mb-5">
          {entries.length === 0 && !loading && (
            <p className="text-white/45 text-[13px] py-6 text-center">{t.empty}</p>
          )}
          {entries.map((e) => {
            const first = e.sudsLog.length > 0 ? e.sudsLog[0].value : null;
            const last = e.sudsLog.length > 0 ? e.sudsLog[e.sudsLog.length - 1].value : null;
            return (
              <div
                key={e.id}
                className="rounded-2xl bg-white/[0.04] border border-white/[0.06] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-white/90">
                      {formatDate(e.startedAt, lang)}
                    </p>
                    <p className="text-[12px] text-white/45 mt-0.5">
                      {t.duration}: {formatDuration(e.durationSec, lang)} {'·'} {t.mode}:{' '}
                      {modeLabel(e.mode, t)}
                      {e.clientCode ? ` ${'·'} ${t.client}: ${e.clientCode}` : ''}
                    </p>
                  </div>
                  <IconButton
                    aria-label={t.deleteOne}
                    variant="ghost"
                    size="sm"
                    shape="round"
                    onClick={() => handleDelete(e.id)}
                    className="hover:bg-rose-500/15 hover:text-rose-200"
                  >
                    <Trash2 size={14} />
                  </IconButton>
                </div>

                <div className="flex flex-wrap gap-2 mt-3">
                  {first !== null && last !== null && (
                    <Chip
                      variant="accent"
                      accent="info"
                      label={`${t.suds} ${first} ${t.sudsTo} ${last}`}
                    />
                  )}
                  {e.phaseReached && (
                    <Chip
                      variant="accent"
                      accent="primary"
                      label={`${t.phase}: ${e.phaseReached}`}
                    />
                  )}
                  {(e.vocInitial != null || e.vocCurrent != null) && (
                    <Chip
                      variant="accent"
                      accent="success"
                      label={`VOC ${e.vocInitial ?? '-'} ${t.sudsTo} ${e.vocCurrent ?? '-'}`}
                    />
                  )}
                  {e.observations.length > 0 && (
                    <Chip
                      variant="neutral"
                      label={`${e.observations.length} ${t.observations}`}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <InfoBanner accent="warn" icon={<ShieldCheck size={16} />} className="mb-6">
          <p className="text-[12px] font-semibold text-amber-200/90 uppercase tracking-[0.14em] mb-1">
            {t.privacyTitle}
          </p>
          <p className="text-[12px] text-white/60 leading-relaxed">{t.privacyBody}</p>
        </InfoBanner>

        <Button
          variant="secondary"
          size="lg"
          onClick={() => setIsJournalOpen(false)}
          className="w-full justify-center bg-white text-zinc-950 hover:bg-zinc-200 border-transparent"
        >
          {t.close}
        </Button>
      </div>
    </OverlayShell>
  );
}
