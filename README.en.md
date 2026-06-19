<div align="center">

<a href="README.md">Русский</a> &nbsp;|&nbsp; <b>English</b> &nbsp;|&nbsp; <a href="README.es.md">Espanol</a> &nbsp;|&nbsp; <a href="README.it.md">Italiano</a> &nbsp;|&nbsp; <a href="README.de.md">Deutsch</a> &nbsp;|&nbsp; <a href="README.fr.md">Francais</a> &nbsp;|&nbsp; <a href="README.pt.md">Portugues</a>

</div>

<div align="center">

<img src="https://s3.twcstorage.ru/strelo/emdr/og.jpg" width="840" alt="EMDR Trainer" />

# EMDR Trainer

### Free EMDR tool for specialists and their clients

A bilateral stimulation trainer for grounding, resourcing and relaxation.<br/>
With a specialist-controlled session mode, an honest evidence base and support for 7 languages.

<br/>

[![License](https://img.shields.io/badge/License-MIT-7c5cff?style=for-the-badge)](LICENSE)
[![Live demo](https://img.shields.io/badge/Demo-bananamaster.ru%2Femdr-10b981?style=for-the-badge)](https://bananamaster.ru/emdr)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Languages](https://img.shields.io/badge/Languages-7-f59e0b?style=for-the-badge)

<a href="https://bananamaster.ru/emdr"><b>Open the trainer</b></a> &nbsp;|&nbsp;
<a href="https://s3.twcstorage.ru/strelo/emdr/preview.mp4"><b>Video demo</b></a> &nbsp;|&nbsp;
<a href="https://t.me/hackmemasters"><b>Get in touch</b></a>

</div>

<br/>

> This is a self-help tool, not a replacement for psychotherapy. Full trauma reprocessing is led by a certified EMDR therapist. The trainer helps during the stabilization phase and as support between sessions.

<br/>

## Features

<table>
<tr>
<td width="50%" valign="top">

### Session with a specialist
The therapist creates a session and sends the client a link. The client sees a clean screen with the stimulation only, no settings. The specialist starts and stops the stimulation and switches modes, and everything updates on the client's side in sync. The grounding button always stays available to the client.

</td>
<td width="50%" valign="top">

### Visual stimulation
9 movement patterns (horizontal, vertical, diagonals, lemniscate, dots, pulse, bars, zigzag), smooth pursuit or saccades, and adjustable speed, amplitude, size, shape and target color.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### Sound and backgrounds
A bilateral stimulus (soft tone, clicks, metronome, white noise, binaural beats) and 10 procedural backgrounds: rain, waves, wind, breathing, pink and brown noise, drone and more. Everything is generated in the browser, with no external files. There is also a silent mode.

</td>
<td width="50%" valign="top">

### Cognitive load
An optional stream of symbols on the target that loads working memory, with a choice of alphabet. Speed and intensity can be tuned to the client.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### Safety
Informed consent and a short contraindication screening before you start, an always-available "Stop and ground" button with the 5-4-3-2-1 technique and box breathing, and a reduced-motion mode for people with photosensitivity.

</td>
<td width="50%" valign="top">

### Evidence base
A built-in guide with an honest assessment of effectiveness by condition and links to sources: WHO, NICE, ISTSS, APA, Cochrane. No overstating and no promises of a cure.

</td>
</tr>
</table>

## Demo

[![Video demo](https://s3.twcstorage.ru/strelo/emdr/preview.jpg)](https://s3.twcstorage.ru/strelo/emdr/preview.mp4)

Full video: [preview.mp4](https://s3.twcstorage.ru/strelo/emdr/preview.mp4) &nbsp;|&nbsp; Live version: [bananamaster.ru/emdr](https://bananamaster.ru/emdr)

## Quick start

```bash
npm install
npm run dev
```

Open http://localhost:3000

Production:

```bash
npm run build
npm start
```

### Docker

```bash
docker compose up -d --build
```

## In-app feedback (optional)

The feedback form can send messages to Telegram. Without configuration it simply accepts input and sends nothing. To enable delivery:

```bash
TELEGRAM_TOKEN=...
TELEGRAM_CHAT_ID=...
```

## Languages

Русский, English, Espanol, Italiano, Deutsch, Francais, Portugues. Language can be selected at startup and in the settings.

## Tech stack

Next.js 16, React 19, TypeScript, Tailwind CSS, Web Audio API, Framer Motion, Zustand.

## License

[MIT](LICENSE). Use, modify and distribute freely.

## Acknowledgements

Thank you to the psychologists who help people cope with trauma and return to normal life every day. This tool was built to support your work, not to replace it.

<div align="center">

<br/>

[![Telegram](https://img.shields.io/badge/Telegram-@hackmemasters-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/hackmemasters)
[![Threads](https://img.shields.io/badge/Threads-@hackmemasters-000000?style=for-the-badge&logo=threads&logoColor=white)](https://www.threads.com/@hackmemasters)

For any inquiries, ideas or collaboration proposals, message us on Telegram.

</div>
