'use client';

import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { isLocale } from '../i18n';

const validRoom = (r: string) => /^[a-z0-9]{4,32}$/i.test(r);

export const SessionManager = () => {
  const s = useStore();
  const {
    isHost, isClient, roomId, clientSignal, signalAt,
    setIsHost, setIsClient, setRoomId, setClientActive,
    applyConfig, setPlaying, setIsGroundingOpen, setLang,
    setIncomingSignal, setConnectionLost
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
    isPlaying: s.isPlaying, isGroundingOpen: s.isGroundingOpen, lang: s.lang,
    clientCue: s.clientCue, cueStep: s.cueStep, ambientVolume: s.ambientVolume,
    hapticEnabled: s.hapticEnabled, visualEnabled: s.visualEnabled, vestibularSafe: s.vestibularSafe
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
        .then((d) => {
          setClientActive(!!d?.clientActive);
          setIncomingSignal(d && d.signal ? d.signal.value : null);
        })
        .catch(() => {});
    }, 200);
    return () => clearTimeout(tid);
  }, [isHost, roomId, broadcastKey, setClientActive, setIncomingSignal]);

  useEffect(() => {
    if (!isClient || !roomId) return;
    let lastV = -1;
    let lastSuccess = Date.now();
    const tick = async () => {
      try {
        const r = await fetch(`/api/session/${roomId}`, { cache: 'no-store' });
        if (r.ok) {
          const d = await r.json();
          if (d && typeof d.v === 'number') {
            lastSuccess = Date.now();
            setConnectionLost(false);
            if (d.v !== lastV && d.state) {
              lastV = d.v;
              const { isPlaying, isGroundingOpen, lang, ...cfg } = d.state as Record<string, unknown>;
              applyConfig(cfg);
              if (typeof isPlaying === 'boolean') setPlaying(isPlaying);
              if (typeof isGroundingOpen === 'boolean') setIsGroundingOpen(isGroundingOpen);
              if (isLocale(lang)) setLang(lang);
            }
          }
        }
      } catch {}
      if (Date.now() - lastSuccess > 5000) {
        setConnectionLost(true);
        setPlaying(false);
      }
    };
    tick();
    const iv = setInterval(tick, 700);
    return () => clearInterval(iv);
  }, [isClient, roomId, applyConfig, setPlaying, setIsGroundingOpen, setLang, setConnectionLost]);

  useEffect(() => {
    if (!isClient || !roomId || !clientSignal) return;
    const tid = setTimeout(() => {
      fetch(`/api/session/${roomId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signal: clientSignal })
      }).catch(() => {});
    }, 150);
    return () => clearTimeout(tid);
  }, [isClient, roomId, clientSignal, signalAt]);

  return null;
};
