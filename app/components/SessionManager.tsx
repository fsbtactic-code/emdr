'use client';

import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { isLocale } from '../i18n';

const validRoom = (r: string) => /^[a-z0-9]{4,32}$/i.test(r);

export const SessionManager = () => {
  const s = useStore();
  const {
    isHost, isClient, roomId,
    setIsHost, setIsClient, setRoomId, setClientActive,
    applyConfig, setPlaying, setIsGroundingOpen, setLang
  } = s;

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const room = p.get('room');
    if (room && validRoom(room)) {
      setRoomId(room);
      if (p.get('host') === '1') setIsHost(true);
      else setIsClient(true);
    }
  }, []);

  const broadcastKey = JSON.stringify({
    speed: s.speed, color: s.color, size: s.size, pattern: s.pattern,
    audioFormat: s.audioFormat, audioVolume: s.audioVolume, ambientSound: s.ambientSound,
    isSaccadic: s.isSaccadic, showSymbols: s.showSymbols, symbolLanguage: s.symbolLanguage,
    targetShape: s.targetShape, visualBackground: s.visualBackground, isDesync: s.isDesync,
    randomness: s.randomness, amplitude: s.amplitude, safeMode: s.safeMode,
    isPlaying: s.isPlaying, isGroundingOpen: s.isGroundingOpen, lang: s.lang
  });

  useEffect(() => {
    if (!isHost || !roomId) return;
    const tid = setTimeout(() => {
      fetch(`/api/session/${roomId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ state: JSON.parse(broadcastKey) })
      })
        .then((r) => r.json())
        .then((d) => setClientActive(!!d?.clientActive))
        .catch(() => {});
    }, 200);
    return () => clearTimeout(tid);
  }, [isHost, roomId, broadcastKey, setClientActive]);

  useEffect(() => {
    if (!isClient || !roomId) return;
    let lastV = -1;
    const tick = async () => {
      try {
        const r = await fetch(`/api/session/${roomId}`, { cache: 'no-store' });
        const d = await r.json();
        if (d && typeof d.v === 'number' && d.v !== lastV && d.state) {
          lastV = d.v;
          const { isPlaying, isGroundingOpen, lang, ...cfg } = d.state as Record<string, unknown>;
          applyConfig(cfg);
          if (typeof isPlaying === 'boolean') setPlaying(isPlaying);
          if (typeof isGroundingOpen === 'boolean') setIsGroundingOpen(isGroundingOpen);
          if (isLocale(lang)) setLang(lang);
        }
      } catch {}
    };
    tick();
    const iv = setInterval(tick, 700);
    return () => clearInterval(iv);
  }, [isClient, roomId, applyConfig, setPlaying, setIsGroundingOpen, setLang]);

  return null;
};
