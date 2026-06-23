# EMDR clinical core - implementation plan and handoff

> Single source of truth for this work. Any agent (Claude, Codex, etc.) can read this
> file + `git log` + `git status` and continue from any point. Branch: `feat/clinical-core`.

## Goal

Turn the EMDR trainer from a stimulation sandbox into a clinically faithful tool for
practitioner + client, while keeping safety, privacy and honest framing. Implement every
idea from the review EXCEPT the telehealth platform (WebRTC video/audio, accounts,
scheduling, multi-client, full auth). That tier is explicitly out of scope for now.

## How to continue (handoff)

1. `cd C:/Users/Alina/Desktop/emdr-oss && git checkout feat/clinical-core`
2. Read this file, then `git log --oneline -15` and `git status` to see what is done.
3. Pick the first task in the table below whose status is TODO.
4. `npm run typecheck` must stay green. No new dependencies.
5. Commit per task: `feat(<area>): <what>` with a short body.
6. Continue in Codex if needed:
   `codex exec -C C:/Users/Alina/Desktop/emdr-oss --dangerously-bypass-approvals-and-sandbox "Read docs/CLINICAL_CORE_PLAN.md and do the next TODO task"`

## Conventions (hard rules)

- Stack: Next.js 16 (app router), React 19, TypeScript, Tailwind v4, framer-motion,
  lucide-react, zustand. Client components start with `'use client'`.
- Typography: NEVER use em dash or en dash, NEVER arrow glyphs, NEVER the letter yo.
  Plain hyphen, comma, or new sentence only. Applies to code, comments, UI text.
- Design system: dark. Base bg `#0a0a0c` / `zinc-950`, glass panels
  `bg-[#0a0a0c]/85 backdrop-blur`, white text at low opacity, rounded-2xl/3xl,
  border `border-white/[0.06]`, accent cyan/indigo/emerald/rose. Mirror existing
  panels (`SettingsPanel.tsx`, `EmdrGuide.tsx`, `GroundingOverlay.tsx`) for look.
- Framing: this is a self-help / practitioner-assist tool, NOT a medical device and NOT
  a replacement for therapy. No "treats / cures / heals" claims. Keep honest relabels for
  any frequency/sound (see `gRelabels` in dict). Full reprocessing (desensitization)
  must be gated to practitioner+client mode, never offered to a solo user.
- No clinical data or PII ever goes to the server or to Telegram. Session journal is
  local only (IndexedDB), pseudonymized (initials/code, never a name). The client->host
  signal channel is ephemeral and carries only an enum, never text.

## i18n

- `app/i18n/dict.ts` defines interface `Dict` and the full `ru` dictionary (type source).
- `getDict` falls back ru -> en -> requested locale, so adding new keys to `ru` (and ideally
  `en`) does NOT break the 6 partial locales (`en/es/it/de/fr/pt` are now `Partial<Dict>`).
- Central keys for shared UI already added (ru+en): channels, signals, closure, therapist
  panel (`tp*`, `sig*`, `channelsSection`, `blsVolume`, `ambientVolumeLabel`, `haptic*`,
  `visualStim*`, `vestibular*`, `groundBeforeExit*`, `connLost`, `navResources`, `navJournal`).
- NEW standalone components SHOULD keep their own local strings object keyed by locale
  (read `useStore(s => s.lang)`), at least ru + en, to avoid editing the shared dict and
  causing merge conflicts during parallel work. Components that only use already-defined
  `tp*`/`sig*` keys may use `useT()` directly (read-only, no conflict).

## Store API (already implemented, `app/store/useStore.ts`)

New state + setters available now:
- Audio: `ambientVolume` / `setAmbientVolume` (BLS volume is existing `audioVolume`).
- Channels/accessibility: `hapticEnabled`, `visualEnabled`, `vestibularSafe` + setters.
- Panels: `isResourcesOpen`, `isJournalOpen`, `isGateOpen`, `isClinicalOpen` + setters.
- Safety gate: `consentGiven`, `dissociationScreenPassed` + setters.
- Signal channel (ephemeral, no PII): `clientSignal` (client side), `incomingSignal`
  (host side), `signalAt`, `connectionLost` + `setClientSignal/setIncomingSignal/setConnectionLost`.
- `sessionStartedAt` / `setSessionStartedAt`.
- Clinical slice: `currentPhase` (enum `SessionPhase`), `suds`, `vocInitial`, `vocCurrent`,
  `targetDesc`, `negCognition`, `posCognition`, `emotions`, `bodyLocation`, `sudsLog`
  (`SudsEntry[]`), `observations` (`SetObservation[]`), `therapistNotes`; setters incl.
  `logSuds(value)` (sets current + pushes to log), `addObservation(obs)`, `resetClinical()`.

## Tasks

Status: DONE / WIP / TODO. Owner = who is doing it (orchestrator = main Claude).

Overall status: ALL tasks below DONE. `npm run typecheck` and `npm run build` are green
(commits f0250cd, 222debd, a29cb8c, da8a553 on feat/clinical-core). See "Follow-ups" below.

| # | Area | Files (exclusive owner) | Status |
|---|------|-------------------------|--------|
| S | spine: i18n fallback + store + dict keys | i18n/*, store/useStore.ts, dict.ts, en.ts | DONE |
| A1 | Haptic BLS channel | `app/hooks/useHapticBLS.ts` (new) | DONE |
| A2 | Resource/stabilization modules | `app/components/ResourceExercises.tsx` (new) | DONE |
| A3 | Local session journal | `app/lib/journal.ts` + `app/components/SessionJournal.tsx` (new) | DONE |
| A4 | Pre-session screening + consent gate | `app/components/PreSessionGate.tsx` (new) | DONE |
| A5 | Crisis contacts data | `app/content/crisis.ts` (new) | DONE |
| A6 | Therapist clinical panel (8 phases, SUDS/VOC, set loop) | `app/components/TherapistPanel.tsx` (new) | DONE |
| A7 | No-pseudoscience contributor guardrails | `CONTRIBUTING.md` (new) | DONE |
| A8 | Remote session: 2-way signal + room hardening + connection loss | `app/api/session/[id]/route.ts`, `SessionManager.tsx`, `SessionClientOverlay.tsx`, `SessionPanel.tsx` | DONE |
| I1 | Integration: mount new panels + nav buttons | `app/page.tsx`, `app/components/FloatingNav.tsx` | DONE |
| I2 | Settings: volume sliders, channel/accessibility toggles, surface `trauma_body` | `app/components/SettingsPanel.tsx` | DONE |
| I3 | Engine: vestibular cap, `visualEnabled` gate, call `useHapticBLS` | `app/components/StimulationEngine.tsx` | DONE |
| I4 | Forced safe closure + grounding gate + crisis contacts in grounding | `app/components/Controls.tsx`, `GroundingOverlay.tsx` | DONE |

## Follow-ups (next agent / Codex can pick up)

- Translations: new strings exist only in `ru` + `en`. es/it/de/fr/pt fall back to en. Translate the
  new dict keys (channels, signals, closure, `tp*`, `nav*`) and the local string blocks inside
  ResourceExercises/SessionJournal/PreSessionGate for full localization.
- Persist `consentGiven` for the session lifetime only (currently resets on reload, which is acceptable
  for a re-consent-each-session safety model). Do NOT persist across devices.
- Wire automatic `saveSession` to the journal on Closure/session end (TherapistPanel has a manual
  "Save to journal" button; auto-save on Closure phase would be the natural next step).
- Visual QA pass across mobile breakpoints for the new side panels (TherapistPanel md:w-[480px]).
- Consider a settings toggle to disable the start-time safety gate for returning practitioners.

## Import contracts (so integration matches)

- A1: `export function useHapticBLS(): void` - call once inside `StimulationEngine`.
- A2: `export function ResourceExercises()` - overlay shown when `isResourcesOpen`.
- A3: `app/lib/journal.ts` exports `saveSession`, `listSessions`, `deleteSession`,
  `clearSessions`, `exportJSON`, `exportCSV`, type `JournalEntry`.
  `export function SessionJournal()` - overlay shown when `isJournalOpen`.
- A4: `export function PreSessionGate()` - overlay shown when `isGateOpen`; on accept sets
  `consentGiven` + `dissociationScreenPassed` and closes.
- A5: `export const CRISIS_CONTACTS: Record<Locale, CrisisContact[]>` +
  `export function getCrisisContacts(lang): CrisisContact[]` (fallback to international).
- A6: `export function TherapistPanel()` - overlay shown when `isClinicalOpen`; reprocessing
  controls gated by `isHost` (solo shows `tpSoloLock`).
- A8: keep host POST `{state}` broadcast; add client POST `{signal:'ok'|'pause'|'stop'}`;
  GET returns `{state, v, signal}`; host POST response returns `signal`. Bump room id to
  >=12 chars CSPRNG, add per-id rate limit, never put PII/clinical fields in `room.state`.

## Out of scope (do NOT build now)

WebRTC video/audio, user accounts, login, scheduling, multi-client rooms, server-side
clinical storage, cloud sync. Revisit only after the clinical core + privacy are solid.
