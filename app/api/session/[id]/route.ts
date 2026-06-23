import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Signal = { value: 'ok' | 'pause' | 'stop'; at: number };
type Room = { state: Record<string, unknown>; v: number; ts: number; lastPoll: number; signal: Signal | null };

const g = globalThis as unknown as {
  __emdrRooms?: Map<string, Room>;
  __emdrHits?: Map<string, number[]>;
};
const rooms: Map<string, Room> = g.__emdrRooms ?? (g.__emdrRooms = new Map());
const hits: Map<string, number[]> = g.__emdrHits ?? (g.__emdrHits = new Map());

const ROOM_TTL = 1000 * 60 * 60 * 2;

// lightweight in-memory rate limiter: max ~150 requests per id in a 10s window
const RATE_WINDOW = 10000;
const RATE_MAX = 150;

function rateLimited(id: string): boolean {
  const now = Date.now();
  const arr = hits.get(id) ?? [];
  const recent = arr.filter((t) => now - t < RATE_WINDOW);
  recent.push(now);
  hits.set(id, recent);
  return recent.length > RATE_MAX;
}

function gc() {
  const now = Date.now();
  for (const [id, r] of rooms) if (now - r.ts > ROOM_TTL) rooms.delete(id);
  for (const [id, arr] of hits) {
    const recent = arr.filter((t) => now - t < RATE_WINDOW);
    if (recent.length === 0) hits.delete(id);
    else hits.set(id, recent);
  }
}

const PATTERNS = ['horizontal', 'vertical', 'diagonal-1', 'diagonal-2', 'lemniscate', 'dots', 'pulse', 'bars', 'zigzag'];
const FORMATS = ['continuous', 'click', 'metronome', 'white_noise', 'binaural_beats'];
const AMBIENTS = ['none', 'rain', 'ocean', 'breath', 'hz528', 'wind_harmonics', 'breathform'];
const SHAPES = ['circle', 'square', 'ring', 'butterfly'];
const BGS = ['black', 'aurora', 'stars'];
const SYM = ['ru', 'en', 'numbers'];
const LOCS = ['ru', 'en', 'es', 'it', 'de', 'fr', 'pt'];
const SIGNALS = ['ok', 'pause', 'stop'];

function sanitize(raw: any): Record<string, unknown> {
  const c = raw || {};
  const o: Record<string, unknown> = {};
  const num = (v: any, min: number, max: number) =>
    typeof v === 'number' && isFinite(v) ? Math.min(max, Math.max(min, v)) : undefined;
  const one = (v: any, set: string[]) => (typeof v === 'string' && set.includes(v) ? v : undefined);
  const b = (v: any) => (typeof v === 'boolean' ? v : undefined);
  const put = (k: string, v: any) => { if (v !== undefined) o[k] = v; };

  put('speed', num(c.speed, 0.5, 3));
  put('size', num(c.size, 20, 150));
  put('audioVolume', num(c.audioVolume, 0, 1));
  put('randomness', num(c.randomness, 0, 100));
  put('amplitude', num(c.amplitude, 20, 100));
  if (typeof c.color === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(c.color)) o.color = c.color;
  put('pattern', one(c.pattern, PATTERNS));
  put('audioFormat', one(c.audioFormat, FORMATS));
  put('ambientSound', one(c.ambientSound, AMBIENTS));
  put('targetShape', one(c.targetShape, SHAPES));
  put('visualBackground', one(c.visualBackground, BGS));
  put('symbolLanguage', one(c.symbolLanguage, SYM));
  put('lang', one(c.lang, LOCS));
  put('isSaccadic', b(c.isSaccadic));
  put('showSymbols', b(c.showSymbols));
  put('isDesync', b(c.isDesync));
  put('safeMode', b(c.safeMode));
  put('isPlaying', b(c.isPlaying));
  put('isGroundingOpen', b(c.isGroundingOpen));
  return o;
}

const validId = (id: string) => /^[a-z0-9]{4,32}$/i.test(id);

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!validId(id)) return NextResponse.json({ error: 'bad id' }, { status: 400 });
  if (rateLimited(id)) return NextResponse.json({ error: 'rate' }, { status: 429 });
  gc();
  const body = await req.json().catch(() => ({}));
  const now = Date.now();

  // client -> host signal: ephemeral enum only, counts as client activity
  if (body && typeof body.signal === 'string' && SIGNALS.includes(body.signal)) {
    const prev = rooms.get(id);
    const value = body.signal as Signal['value'];
    const room: Room = {
      state: prev?.state ?? {},
      v: prev?.v ?? 0,
      ts: now,
      lastPoll: now,
      signal: { value, at: now }
    };
    rooms.set(id, room);
    return NextResponse.json({ ok: true });
  }

  // host -> client state broadcast
  const state = sanitize(body?.state);
  const prev = rooms.get(id);
  const room: Room = {
    state,
    v: (prev?.v ?? 0) + 1,
    ts: now,
    lastPoll: prev?.lastPoll ?? 0,
    signal: prev?.signal ?? null
  };
  rooms.set(id, room);
  return NextResponse.json({
    ok: true,
    v: room.v,
    clientActive: now - room.lastPoll < 6000,
    signal: room.signal
  });
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!validId(id)) return NextResponse.json({ error: 'bad id' }, { status: 400 });
  if (rateLimited(id)) return NextResponse.json({ error: 'rate' }, { status: 429 });
  const room = rooms.get(id);
  if (!room) return NextResponse.json({ state: null, v: 0, signal: null });
  room.lastPoll = Date.now();
  return NextResponse.json({ state: room.state, v: room.v, signal: room.signal ?? null });
}
