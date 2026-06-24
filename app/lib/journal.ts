export type JournalEntry = {
  id: string;
  startedAt: number;
  endedAt: number;
  durationSec: number;
  mode: 'solo' | 'host' | 'client';
  clientCode?: string;
  phaseReached?: string;
  sudsLog: { t: number; phase: string; value: number }[];
  vocInitial?: number | null;
  vocCurrent?: number | null;
  observations: { set: number; note: string; suds: number | null }[];
  notes?: string;
  config?: Record<string, unknown>;
};

const DB_NAME = 'emdr-journal';
const DB_VERSION = 1;
const STORE = 'sessions';

function hasIDB(): boolean {
  return typeof indexedDB !== 'undefined';
}

function genId(): string {
  try {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
  } catch {
    // fall through
  }
  return 's-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' });
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function saveSession(
  entry: Omit<JournalEntry, 'id'> & { id?: string }
): Promise<string> {
  const id = entry.id || genId();
  const full: JournalEntry = { ...entry, id };
  if (!hasIDB()) return id;
  const db = await openDB();
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(full);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
  return id;
}

export async function listSessions(): Promise<JournalEntry[]> {
  if (!hasIDB()) return [];
  const db = await openDB();
  try {
    const entries = await new Promise<JournalEntry[]>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).getAll();
      req.onsuccess = () => resolve((req.result as JournalEntry[]) || []);
      req.onerror = () => reject(req.error);
    });
    return entries.sort((a, b) => b.startedAt - a.startedAt);
  } finally {
    db.close();
  }
}

export async function deleteSession(id: string): Promise<void> {
  if (!hasIDB()) return;
  const db = await openDB();
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}

export async function clearSessions(): Promise<void> {
  if (!hasIDB()) return;
  const db = await openDB();
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}

export function exportJSON(entries: JournalEntry[]): string {
  return JSON.stringify(entries, null, 2);
}

// neutralizes leading formula chars to prevent csv injection
function csvCell(value: unknown): string {
  let s = value === null || value === undefined ? '' : String(value);
  if (/^[=+\-@]/.test(s)) {
    s = "'" + s;
  }
  if (/[",\n\r]/.test(s)) {
    s = '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

export function exportCSV(entries: JournalEntry[]): string {
  const headers = [
    'id',
    'startedAt',
    'endedAt',
    'durationSec',
    'mode',
    'clientCode',
    'phaseReached',
    'sudsFirst',
    'sudsLast',
    'sudsCount',
    'vocInitial',
    'vocCurrent',
    'observations',
    'notes',
  ];
  const rows = entries.map((e) => {
    const first = e.sudsLog.length > 0 ? e.sudsLog[0].value : '';
    const last = e.sudsLog.length > 0 ? e.sudsLog[e.sudsLog.length - 1].value : '';
    return [
      e.id,
      new Date(e.startedAt).toISOString(),
      new Date(e.endedAt).toISOString(),
      e.durationSec,
      e.mode,
      e.clientCode ?? '',
      e.phaseReached ?? '',
      first,
      last,
      e.sudsLog.length,
      e.vocInitial ?? '',
      e.vocCurrent ?? '',
      e.observations.length,
      e.notes ?? '',
    ].map(csvCell).join(',');
  });
  return [headers.map(csvCell).join(','), ...rows].join('\r\n');
}
