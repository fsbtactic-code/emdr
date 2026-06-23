# Contributing to EMDR Trainer

Thank you for your interest in contributing. This document explains the rules and
expectations that keep the project safe, honest, and accessible. Please read it
fully before opening a pull request.

---

## 1. Project framing

EMDR Trainer is a **self-help and practitioner-assist tool**. It is NOT a medical
device and NOT a replacement for psychotherapy.

- The tool supports stabilization, resourcing, and relaxation exercises, and
  provides bilateral stimulation under practitioner control.
- Full trauma reprocessing (desensitization, phases 3-6 of the standard 8-phase
  EMDR protocol) is a clinical procedure. Solo users do not have access to it.
- Evidence claims in any PR must be traceable to a citable source: WHO, NICE,
  ISTSS, APA, or a peer-reviewed Cochrane-indexed review. Do not extrapolate
  beyond what those sources actually say.

When in doubt about scope, ask: "Would a licensed EMDR therapist be comfortable
recommending this to a solo client as a between-session support tool?" If no,
it does not belong in solo mode.

---

## 2. No-pseudoscience rule (hard)

This rule is non-negotiable. Violating it blocks a PR.

### What is banned

- Health claims in preset names, sound names, feature names, or UI copy.
- The words "cures", "heals", "treats", "repairs", "fixes" applied to any
  physiological or psychological condition.
- "Balances hemispheres" or "left-right hemisphere activation" as a mechanism
  explanation. The alternating-hemisphere model is not confirmed by neuroimaging.
  Use the working-memory / dual-attention / orienting-response hypotheses instead.
- "Healing frequency", "raises vibration", "repairs DNA", "resonance healing",
  "solfeggio", or any claim that a specific Hz value has a therapeutic effect
  beyond general relaxation.
- Binaural beats described as "synchronizing brainwaves" or as a sleep/focus
  treatment. Current evidence (e.g., Ingendoh 2023) is weak and contradictory.

### What is required for any new sound or frequency preset

Every new sound or frequency MUST ship with an honest relabel entry, following
the existing pattern in `app/i18n/dict.ts` (`relabels`, `gRelabels`, `ambientNote`).

The relabel entry must contain:
1. The original marketing/colloquial label (field `original`).
2. An honest `verdict`: what the evidence actually shows (or does not show),
   with a citation if one exists.
3. An honest `honest` label: what the sound actually does in this context
   (e.g., "background sound for relaxation; not a medical procedure").

**Example pattern already in use:**

```
// 528 Hz ambient
grounding_528: { label: "Ton 528 Hz", desc: "Sound for relaxation, not a cure" }
ambientNote: "Sounds and 528 Hz tone - for relaxation and focus, no therapeutic effect."
```

```
// Binaural beats relabel entry
{
  original: "Binaural beats for sleep",
  verdict: "Overstated. Evidence is weak and contradictory; brainwave entrainment
            is unconfirmed (Ingendoh 2023).",
  honest: "Calm background sound for rest. Effect is mild and individual; not a
           treatment for insomnia."
}
```

### Explaining the EMDR mechanism

Only use the following framing, which is consistent with current evidence:

- Working-memory hypothesis: bilateral stimulation taxes working memory,
  reducing the vividness and distress of traumatic imagery.
- Dual-attention hypothesis: simultaneously attending to an external stimulus and
  an internal representation reduces emotional load.
- Orienting response: rhythmic stimulation activates the orienting response,
  which competes with the threat response.

Do NOT write "activates left and right hemispheres alternately". Vertical
movements and non-alternating tasks show similar effects, which rules out
simple hemisphere alternation as the mechanism.

---

## 3. Safety rules (hard)

These rules protect users. Removing or weakening them blocks a PR.

### Reprocessing gate

Full trauma reprocessing controls (SUDS tracking, VOC scales, target image
description, negative/positive cognitions, set loop controls) are visible ONLY
when the user is in host/practitioner mode (`isHost === true`). In solo mode, the
TherapistPanel must show the `tpSoloLock` message and hide all reprocessing
controls.

Rationale: unsupported solo reprocessing can destabilize clients, particularly
those with dissociative tendencies or complex trauma. This is the consensus
position of ISTSS and EMDR International Association guidelines.

### Pre-session gate

The PreSessionGate component (contraindication screening and informed consent)
must run before any stimulation session begins. Do not add code paths that bypass
it. The gate sets `consentGiven` and `dissociationScreenPassed` in the store; no
stimulation should start while either is false.

Contraindications that must remain in the screening list include at minimum:
- Active psychosis or recent psychotic episode
- Unmedicated seizure disorder or photosensitivity epilepsy
- Acute dissociative episode or high dissociation scores
- Current ongoing dangerous or violent environment
- Substance use that impairs self-regulation

### Grounding and stop affordance

The "Stop and ground" button must remain visible and accessible at all times
during stimulation, for both solo users and clients in a remote session. The
GroundingOverlay (5-4-3-2-1 technique + box breathing) must not be removable or
hidden behind an option. Crisis contacts (from `app/content/crisis.ts`) must
appear inside the grounding overlay.

---

## 4. Privacy rules (hard)

### No PII or clinical data to any server

The session journal stores data locally in IndexedDB only. It is pseudonymized
(initials or a short code, never a full name). Do not add any server-side
write path for journal data, SUDS logs, clinical observations, therapist notes,
or target descriptions.

The remote session room state (the object broadcast through
`/api/session/[id]/route.ts`) must carry only an enum describing stimulation
state, never free-text clinical fields. If you touch the session API, verify
that no clinical or PII field is included in `room.state`.

### Telegram feedback channel

The in-app feedback form may send messages to a Telegram channel for product
analytics (feature requests, usability notes). It must NEVER transmit:
- Any text the user typed in a clinical context (target description, cognitions,
  SUDS scores, journal entries, therapist notes).
- Device identifiers, session IDs, or any data that could link a submission to
  a clinical session.

If you add or modify the feedback path, add a comment in the code confirming
which fields are sent and that none are clinical.

### Third-party services

The app generates all audio in the browser (Web Audio API). Do not introduce
external audio CDNs, analytics SDKs, or any third-party request that fires
during a session. All network activity during a session must be limited to the
app's own `/api/session/*` route.

---

## 5. Accessibility

### Motion

Respect the `prefers-reduced-motion` media query. Any new animation or
stimulation pattern must respond to this preference by reducing or eliminating
motion. The `vestibularSafe` store flag provides a runtime toggle that should
also gate vestibular-heavy patterns.

### Photosensitivity

Do not introduce flashing or flickering content in the range of 3 to 30 Hz
(WCAG Success Criterion 2.3.1). This applies to the stimulation dot, background
effects, and any pulsing UI element. Visual patterns must be tested at all speed
settings to confirm no frequency falls in the prohibited range.

### Non-visual stimulation paths

Users with photosensitivity or other visual impairments must be able to run a
full session using audio-only or haptic-only bilateral stimulation. Contributions
that gate important functionality behind a visual-only path will be rejected.
The `visualEnabled`, `hapticEnabled`, and `audioVolume` store flags must remain
respected by all stimulation code.

---

## 6. Typography rule

This rule applies to all code, comments, UI strings, i18n dictionary entries,
and documentation.

- **Never** use an em dash (U+2014) or en dash (U+2013). Use a plain hyphen,
  a comma, a colon, or start a new sentence.
- **Never** use arrow glyphs (U+2192 and similar). Write direction in words:
  "from A to B", "A, then B".
- **Never** use the Russian letter "yo" (U+0451). Write "e" instead.

Linting for this rule is not yet automated. Reviewers will reject PRs that
introduce violations.

---

## 7. Dev workflow

### Type checking

`npm run typecheck` must pass with zero errors before any PR is opened. The CI
check is the final authority; fix errors locally before pushing.

### Dependencies

Do not add new npm dependencies without justification in the PR description.
The project deliberately minimizes its dependency surface. If you need a utility,
prefer implementing it inline or using a Web API directly. If a dependency is
genuinely needed, explain: what it does, why an existing dependency or native API
cannot cover the use case, and what the bundle-size impact is.

Existing stack: Next.js 16 (app router), React 19, TypeScript, Tailwind v4,
framer-motion, lucide-react, zustand.

### i18n

- `app/i18n/dict.ts` defines the `Dict` interface and the full `ru` dictionary.
- `en` and the five other locales are `Partial<Dict>` and fall back to `ru`.
- New keys added to `ru` must also be added to `en` in the same commit.
- New standalone components should keep their own local strings keyed by locale
  (read `useStore(s => s.lang)`) to avoid merge conflicts with parallel work.
  Use `useT()` only for keys that already exist in the shared dict.

### Evidence claims in UI text

Any text that makes a factual claim about EMDR effectiveness must cite the source
in a code comment adjacent to the string. Acceptable sources: WHO guidelines,
NICE guidelines, ISTSS guidelines, APA guidelines, Cochrane systematic reviews.
Do not paraphrase beyond what the cited source states.

---

## 8. PR checklist

Before requesting review, confirm every item below:

- [ ] `npm run typecheck` passes locally with zero errors.
- [ ] No new npm dependency is added without explanation in the PR description.
- [ ] No em dash, en dash, arrow glyph, or Russian "yo" appears in any changed
      file (code, comments, strings, documentation).
- [ ] No health claim (cures, heals, treats, repairs) appears in any UI text,
      preset name, sound name, or feature label.
- [ ] Any new sound or frequency preset has a corresponding honest relabel entry
      in `app/i18n/dict.ts` following the existing `relabels` pattern.
- [ ] The EMDR mechanism is not described as "hemisphere balancing" or "left-right
      hemisphere activation". Working-memory / dual-attention / orienting-response
      framing is used instead.
- [ ] Reprocessing controls (SUDS, VOC, set loop, target description) are not
      exposed to solo users; they remain gated by `isHost`.
- [ ] The PreSessionGate is not bypassed by any new code path.
- [ ] The grounding and stop affordance remains visible during stimulation.
- [ ] No PII or clinical text is written to any server endpoint or to the Telegram
      feedback channel.
- [ ] The session journal remains local-only (IndexedDB) and pseudonymized.
- [ ] `prefers-reduced-motion` is respected by any new animation or stimulation
      pattern.
- [ ] No new flashing content at 3-30 Hz is introduced (WCAG 2.3.1).
- [ ] Non-visual stimulation paths (audio, haptic) remain fully functional.
- [ ] Any evidence claim in UI text has a source citation in an adjacent comment.

---

## Kratko (RU) - kratkoe izlozhenie zhestkih pravil

Etot razdel - kratkaya shpargalka dlya russkoyazychnyh kontributorov. Polnye
pravila vyshe imeyut prioritet.

**Instrument, ne ustrojstvo.** Trenazer - eto instrument samopomoshchi i
podderzhki specialista, a ne medicinskoe ustrojstvo i ne zamena terapii.
Polnuyu pererabotku travmy vedet sertificirovannyj EMDR-terapevt.

**Nikakogo psevdonauchnego frejminga.** Zapreshcheno: "lechit", "vosstanavlivaet",
"balans polusharij", "celyashchie chastoty", "vosstanovlenie DNK", "solyfeggio".
Lyuboj novyj zvuk ili chastotnyj preset obyazan imet chestandartnyj relabel
po obrazcu sushchestvuyushchih zapisej `relabels` v `dict.ts`. Mehanizm EMDR
opisyvaem tol'ko cherez gipotezy rabochej pamyati, dvojnogo vnimaniya i
orientirovochnogo refleksa.

**Bezopasnost' - neotstupaemo.** Kontrol' pererabotki (SUDS, VOC, set loop)
vidat' tol'ko hostu/specialistu. PreSessionGate ne obhodit'sya. Knopka
"Stop i zazemlenie" vidna vsegda.

**Privatnost'.** Nikakikh PII i klinicheskih dannyh na server ili v Telegram.
Dnevnik sessii - tol'ko lokal'no (IndexedDB), psevdonimizirovanno.

**Dostupnost'.** Uvazhat' `prefers-reduced-motion`. Nikakogo morganiya 3-30 Hz
(WCAG 2.3.1). Zvukovoj i haptic-put' stimulyacii dolzhny ostavat'sya
rabochimi.

**Tipografika.** Nikogda dlinnoe tire, strelki-simvoly. Tol'ko defis, zapyataya,
ili novoe predlozhenie. Nikogda bukva "yo" (pisat' "e").

**CI.** `npm run typecheck` dolzhen byt' zelenyj pered lyubym PR.
