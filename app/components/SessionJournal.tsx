'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Trash2, Download, FileJson, ShieldCheck } from 'lucide-react';
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
    badge: 'Журнал сессий',
    title: 'История сессий',
    subtitle: 'Записи хранятся только на этом устройстве',
    empty: 'Пока нет сохраненных сессий.',
    duration: 'Длительность',
    mode: 'Режим',
    modeSolo: 'самостоятельно',
    modeHost: 'специалист',
    modeClient: 'клиент',
    phase: 'Этап',
    suds: 'SUD',
    sudsTo: 'до',
    observations: 'наблюдений',
    client: 'Код клиента',
    deleteOne: 'Удалить',
    clearAll: 'Очистить все',
    clearConfirm: 'Удалить все записи журнала без возможности восстановления?',
    downloadJson: 'Скачать JSON',
    downloadCsv: 'Скачать CSV',
    close: 'Закрыть',
    privacyTitle: 'Приватность',
    privacyBody:
      'Данные хранятся только на этом устройстве и псевдонимизированы (без имен, только код). Вы являетесь оператором этих данных. Получите согласие клиента перед записью.',
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
  return m > 0 ? `${m} мин ${s} с` : `${s} с`;
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
    <AnimatePresence>
      {isJournalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsJournalOpen(false)}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-2xl"
        >
          <motion.div
            initial={{ scale: 0.96, y: 16, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.96, y: 16, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-[#0d0d0f] border border-white/[0.06] rounded-[28px] p-7 shadow-2xl relative overflow-hidden max-h-[92vh] overflow-y-auto no-scrollbar"
          >
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 bg-cyan-500/10 blur-[60px] rounded-full pointer-events-none" />

            <button
              onClick={() => setIsJournalOpen(false)}
              aria-label={t.close}
              className="absolute top-3 right-3 p-2 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all z-20"
            >
              <X size={18} />
            </button>

            <div className="relative z-10">
              <div className="flex items-center gap-2 text-cyan-300/90 text-[12px] font-bold uppercase tracking-[0.15em] mb-1">
                <BookOpen size={14} /> {t.badge}
              </div>
              <h2 className="text-[22px] font-bold text-white tracking-tight mb-1">{t.title}</h2>
              <p className="text-white/45 text-[13px] mb-5">{t.subtitle}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                <button
                  onClick={handleJson}
                  disabled={entries.length === 0}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-transparent text-[12px] font-medium text-white/70 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <FileJson size={14} /> {t.downloadJson}
                </button>
                <button
                  onClick={handleCsv}
                  disabled={entries.length === 0}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-transparent text-[12px] font-medium text-white/70 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <Download size={14} /> {t.downloadCsv}
                </button>
                <button
                  onClick={handleClearAll}
                  disabled={entries.length === 0}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-400/20 text-[12px] font-medium text-rose-200/80 transition-all disabled:opacity-30 disabled:cursor-not-allowed ml-auto"
                >
                  <Trash2 size={14} /> {t.clearAll}
                </button>
              </div>

              <div className="flex flex-col gap-2.5 mb-5">
                {entries.length === 0 && !loading && (
                  <p className="text-white/35 text-[13px] py-6 text-center">{t.empty}</p>
                )}
                {entries.map((e) => {
                  const first = e.sudsLog.length > 0 ? e.sudsLog[0].value : null;
                  const last = e.sudsLog.length > 0 ? e.sudsLog[e.sudsLog.length - 1].value : null;
                  return (
                    <div
                      key={e.id}
                      className="rounded-2xl bg-white/[0.04] border border-transparent p-4"
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
                        <button
                          onClick={() => handleDelete(e.id)}
                          aria-label={t.deleteOne}
                          className="shrink-0 w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-rose-500/20 rounded-full text-white/40 hover:text-rose-200 transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {first !== null && last !== null && (
                          <span className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-400/15 text-[12px] text-cyan-200/80 tabular-nums">
                            {t.suds} {first} {t.sudsTo} {last}
                          </span>
                        )}
                        {e.phaseReached && (
                          <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-400/15 text-[12px] text-indigo-200/80">
                            {t.phase}: {e.phaseReached}
                          </span>
                        )}
                        {(e.vocInitial != null || e.vocCurrent != null) && (
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-400/15 text-[12px] text-emerald-200/80 tabular-nums">
                            VOC {e.vocInitial ?? '-'} {t.sudsTo} {e.vocCurrent ?? '-'}
                          </span>
                        )}
                        {e.observations.length > 0 && (
                          <span className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-transparent text-[12px] text-white/55 tabular-nums">
                            {e.observations.length} {t.observations}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="rounded-2xl bg-amber-500/[0.06] border border-amber-400/15 p-4 flex gap-3">
                <ShieldCheck size={18} className="text-amber-300/80 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[12px] font-semibold text-amber-200/90 uppercase tracking-wider mb-1">
                    {t.privacyTitle}
                  </p>
                  <p className="text-[12px] text-white/55 leading-relaxed">{t.privacyBody}</p>
                </div>
              </div>

              <button
                onClick={() => setIsJournalOpen(false)}
                className="w-full mt-6 py-3.5 bg-white text-zinc-950 rounded-2xl font-semibold text-[14px] hover:bg-zinc-200 transition-all active:scale-[0.98]"
              >
                {t.close}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
