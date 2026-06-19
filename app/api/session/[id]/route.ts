import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

type Room = { state: Record<string, unknown>; v: number; ts: number; lastPoll: number };

const g = globalThis as unknown as { __emdrRooms?: Map<string, Room> };
const rooms: Map<string, Room> = g.__emdrRooms ?? (g.__emdrRooms = new Map());

const ROOM_TTL = 1000 * 60 * 60 * 2;

function gc() {
  const now = Date.now();
  for (const [id, r] of rooms) if (now - r.ts > ROOM_TTL) rooms.delete(id);
}

const PATTERNS = ['horizontal', 'vertical', 'diagonal-1', 'diagonal-2', 'lemniscate', 'dots', 'pulse', 'bars', 'zigzag'];
const FORMATS = ['continuous', 'click', 'metronome', 'white_noise', 'binaural_beats'];
const AMBIENTS = ['none', 'rain', 'ocean', 'breath', 'hz528', 'wind_harmonics', 'breathform'];
const SHAPES = ['circle', 'square', 'ring', 'butterfly'];
const BGS = ['black', 'aurora', 'stars'];
const SYM = ['ru', 'en', 'numbers'];
const LOCS = ['ru', 'en', 'es', 'it', 'de', 'fr', 'pt'];

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
  gc();
  const body = await req.json().catch(() => ({}));
  const state = sanitize(body?.state);
  const prev = rooms.get(id);
  const now = Date.now();
  const room: Room = { state, v: (prev?.v ?? 0) + 1, ts: now, lastPoll: prev?.lastPoll ?? 0 };
  rooms.set(id, room);
  return NextResponse.json({ ok: true, v: room.v, clientActive: now - room.lastPoll < 6000 });
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!validId(id)) return NextResponse.json({ error: 'bad id' }, { status: 400 });
  const room = rooms.get(id);
  if (!room) return NextResponse.json({ state: null, v: 0 });
  room.lastPoll = Date.now();
  return NextResponse.json({ state: room.state, v: room.v });
}
