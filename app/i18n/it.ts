import type { Dict } from "./dict";

export const it: Partial<Dict> = {
  start: "Inizia",
  next: "Avanti",
  back: "Indietro",
  understand: "Ho capito e accetto",
  contact: "Contatta",

  presetApplied: "Configurazione applicata",
  presetAppliedSub: "Parametri caricati dal link",

  navSettings: "Impostazioni della sessione",
  navGuide: "Guida e basi scientifiche",
  navFeedback: "Feedback",
  navGrounding: "Stop e radicamento",
  navExit: "Vai a bananamaster",

  finish: "Termina",
  stopGround: "Stop e radicamento",
  series: "Serie",

  settingsTitle: "Impostazioni della sessione",
  settingsSub: "Parametri della sessione",
  test: "Prova",
  pause: "Pausa",
  programs: "Programmi",
  catCalm: "Radicamento e ansia",
  catResource: "Risorsa e rilassamento",
  catFocus: "Concentrazione e autoregolazione",
  catProfiles: "Profili di stimolazione",
  profilesHint: "Profili intensi. Non per l'elaborazione autonoma del trauma, solo come stile di stimolazione.",
  presets: {
    anxiety: { label: "Radicamento", desc: "Lento, calmante" },
    panic: { label: "In caso di ansia", desc: "Ritmo per ritrovare la concentrazione" },
    resource: { label: "Luogo sicuro", desc: "Costruzione di risorse" },
    focus: { label: "Concentrazione", desc: "Punti, rumore bianco" },
    sleep: { label: "Sottofondo tranquillo", desc: "Per il riposo, effetto delicato" },
    grounding_528: { label: "Tono 528 Hz", desc: "Suono per il rilassamento, non una cura" },
    adhd_focus: { label: "Concentrazione", desc: "Ritmo regolare per la concentrazione" },
    adhd_impulse: { label: "Tempo", desc: "Stimolazione attiva" },
    adhd_calm: { label: "Rallentamento", desc: "Riduzione dell'attivazione" },
    adhd_body: { label: "Corpo", desc: "Attenzione alle sensazioni" },
    trauma_smooth: { label: "Fluido", desc: "Movimenti delicati" },
    trauma_deep: { label: "Lento", desc: "Diagonale, bassa velocità" },
    trauma_saccadic: { label: "Saccadico", desc: "Scatti bruschi, simboli" },
    trauma_acute: { label: "Veloce", desc: "Alta velocità" },
    trauma_flashback: { label: "Massimo", desc: "Il più intenso" }
  },
  patternLabel: "Schema",
  patterns: {
    horizontal: "Orizzontale",
    vertical: "Verticale",
    "diagonal-1": "Diagonale 1",
    "diagonal-2": "Diagonale 2",
    lemniscate: "Lemniscata",
    dots: "Punti",
    pulse: "Pulsazione",
    bars: "Barre",
    zigzag: "Zigzag"
  },
  shapeLabel: "Forma",
  shapes: { circle: "Cerchio", square: "Quadrato", ring: "Anello", butterfly: "Farfalla" },
  colorLabel: "Colore",
  speedLabel: "Velocità",
  amplitudeLabel: "Ampiezza",
  amplitudeHint: "Distanza del movimento dal centro. 100% quasi fino ai bordi, 40% più vicino al centro.",
  seriesLabel: "Serie",
  sizeLabel: "Dimensione",
  hzUnit: "Hz",
  cyclesUnit: "cicli",
  pxUnit: "px",
  reduceMotion: "Movimento ridotto",
  reduceMotionDesc: "Fluido, senza saccadi, limite di velocità 1.5 Hz. Per la fotosensibilità",
  saccades: "Saccadi",
  saccadesDesc: "Cambio brusco di posizione",
  saccadesOffSafe: " (disattivate in modalità movimento ridotto)",
  cogLoad: "Carico cogn.",
  cogLoadDesc: "Simboli sull'oggetto",
  mute: "Muto",
  muteDesc: "Disattiva tutto l'audio",
  stimSound: "Suono dello stimolo",
  audioFormats: {
    continuous: "Morbido",
    click: "Clic",
    metronome: "Metronomo",
    white_noise: "Rumore bianco",
    binaural_beats: "Binaurale"
  },
  ambientLabel: "Ambiente",
  ambientNames: {
    none: "Off",
    rain: "Pioggia",
    ocean: "Onde",
    breath: "Respiro",
    hz528: "528 Hz",
    wind_harmonics: "Vento",
    breathform: "Breathform",
    pink: "Rumore rosa",
    brown: "Rumore marrone",
    drone: "Drone"
  },
  ambientNote: "I suoni e il tono 528 Hz servono per il rilassamento e la predisposizione, senza effetto terapeutico.",
  bgLabel: "Sfondo",
  bgNames: { black: "Nero", aurora: "Aurora", stars: "Pulsazione" },
  langNames: { ru: "Cir", en: "Lat", numbers: "123" },
  sessionsToday: "Sessioni di oggi",
  sharePreset: "Condividi il preset",
  linkCopied: "Link copiato!",
  languageSection: "Lingua",

  guideTitle: "Guida e basi scientifiche",
  guideSub: "In modo onesto, con riferimenti agli studi",
  gWhat: "Che cos'è l'EMDR?",
  gHow: "Come funziona",
  gEvidence: "Basi scientifiche per i diversi disturbi",
  gProtocol: "Protocollo standard: 8 fasi",
  gPositioning: "Cosa lo strumento può e NON può fare",
  gSafety: "Sicurezza: stop e radicamento",
  gRelabels: 'In modo onesto su suoni e "frequenze"',
  gRefs: "Fonti",
  whatIs: `L'EMDR (Eye Movement Desensitization and Reprocessing, desensibilizzazione e rielaborazione attraverso i movimenti oculari) è un metodo strutturato di psicoterapia, sviluppato da Francine Shapiro alla fine degli anni '80 per trattare le conseguenze del trauma psichico. Durante la seduta la persona mantiene nella coscienza un ricordo traumatico ed esegue contemporaneamente un compito a doppia attenzione: il più delle volte segue con gli occhi un oggetto in movimento, più raramente ascolta suoni alternati o avverte tocchi alternati. Il lavoro segue un protocollo standard in 8 fasi e viene condotto da un terapeuta formato.

Nel DPTS l'EMDR rientra tra i metodi raccomandati, ma senza esagerazioni. L'OMS (2013) raccomanda l'EMDR e la TCC focalizzata sul trauma come prima linea nel DPTS, valutando la qualità dei dati come bassa-moderata. Il NICE (NG116, 2018) raccomanda l'EMDR negli adulti come prima linea, con riserve. L'ISTSS formula una raccomandazione forte. L'APA (2017) una raccomandazione condizionata, collocando l'EMDR in seconda linea dopo la TCC. Per efficacia nel DPTS il metodo è all'incirca pari alla TCC focalizzata sul trauma, non superiore. Al di fuori del DPTS le evidenze sono nettamente più deboli.`,
  mechanism: `Il meccanismo dell'EMDR viene spiegato attraverso due modelli, ed è importante non confonderli con qualcosa di "dimostrato".

Il modello dell'elaborazione adattiva dell'informazione (AIP). È un quadro clinico e teorico, non una neurobiologia confermata. L'idea: il cervello elabora l'esperienza, il trauma sovraccarica questo sistema e il ricordo resta "immagazzinato in modo disfunzionale"; il metodo aiuta a portare l'elaborazione a una risoluzione serena. La stessa comunità professionale descrive l'AIP come un modello per la pianificazione della terapia, e non come un meccanismo accertato.

L'ipotesi del carico sulla memoria di lavoro. È la spiegazione meglio supportata per i movimenti oculari. La memoria di lavoro ha una capacità limitata: se contemporaneamente si richiama un'immagine vivida e si svolge un secondo compito, questi competono per le risorse e il ricordo diventa meno vivido e meno emotivo. Questo è dimostrato in modo affidabile in laboratorio a partire da Andrade, Kavanagh e Baddeley (1997).

Cosa è onesto dire sul punto controverso: il contributo dei movimenti oculari in sé è affidabile in laboratorio, ma in clinica è più debole e dibattuto (Lee e Cuijpers 2013; Sack 2016). La "bilateralità" intesa come alternanza degli emisferi, invece, non è confermata dalla scienza: i movimenti verticali e i compiti non alternati (tapping, conteggio, persino Tetris) funzionano in modo simile. Per questo non usiamo la formulazione sull'"attivazione dell'emisfero destro e sinistro": il fattore attivo è, più probabilmente, il carico complessivo della doppia attenzione.`,
  positioning: `Questo è uno strumento web di auto-aiuto, non una terapia EMDR e non un sostituto del terapeuta.

Onestamente, può: fornire una stimolazione visiva, sonora o tattile ritmica e un timer delle serie; aiutare ad apprendere le abilità di stabilizzazione (fase 2), luogo sicuro, radicamento 5-4-3-2-1, respirazione, contenimento; fare da sottofondo per il rilassamento e la predisposizione. Se hai già un tuo terapeuta, può essere un supporto integrativo tra una seduta e l'altra.

Cosa non fa: NON conduce una vera e propria elaborazione del trauma. L'elaborazione autonoma dei ricordi traumatici senza uno specialista formato non è di provata efficacia (i dati controllati sulle app sono quasi inesistenti) e comporta rischi reali: aggravamento dei sintomi, ritraumatizzazione, dissociazione, elaborazione incompleta che nessuno può chiudere. Francine Shapiro avvertiva che l'elaborazione autonoma senza un adeguato screening può avere gravi conseguenze. In caso di DPTS, trauma grave o infantile, dissociazione, pensieri suicidari, psicosi, rivolgiti solo a un terapeuta EMDR certificato.

I suoni e le "frequenze" qui presenti (incluse 528 Hz e i battiti binaurali) sono strumenti di rilassamento, non una cura. Non riparano il DNA, non curano malattie e non sostituiscono il medico.`,
  evidenceIntro: "Le linee guida (OMS, NICE) raccomandano l'EMDR soprattutto nel DPTS. Di seguito una valutazione onesta per i diversi disturbi.",
  evidence: {
    ptsd: { level: "strong", condition: "DPTS negli adulti", note: "L'unico disturbo con una base solida e il sostegno delle linee guida: OMS e NICE (prima linea, con riserve), ISTSS (raccomandazione forte), APA (condizionata, seconda linea). All'incirca pari alla TCC focalizzata sul trauma." },
    phobias: { level: "moderate", condition: "Fobie specifiche", note: "L'ambito migliore al di fuori del DPTS. Gli RCT mostrano un effetto significativo fino a 1 anno. Non è consolidato come prima linea nelle linee guida sulle fobie." },
    panic: { level: "emerging", condition: "Disturbo di panico", note: "La meta-analisi mostra una riduzione dei sintomi, ma gli RCT sono contraddittori; i dati sono limitati." },
    anxiety: { level: "emerging", condition: "Disturbi d'ansia", note: "Una meta-analisi (Yunitri 2020) evidenzia un effetto, ma con campioni piccoli e senza il sostegno delle linee guida." },
    depression: { level: "emerging", condition: "Depressione", note: "Effetto moderato nelle meta-analisi, più spesso come integrazione al trattamento; la qualità degli studi è bassa. Non raccomandato dalle linee guida per la depressione." },
    pain: { level: "insufficient", condition: "Dolore cronico", note: "Solo studi pilota e un piccolo RCT. Non esiste una base affidabile." },
    grief: { level: "insufficient", condition: "Lutto e perdita", note: "Per lo più teoria e serie di casi. Non è un metodo di trattamento consolidato." },
    addiction: { level: "insufficient", condition: "Dipendenze", note: "Due piccoli RCT, segnali sul craving e sul trauma concomitante; le evidenze sono deboli." },
    psychosis: { level: "insufficient", condition: "Psicosi e disturbo bipolare", note: "Agisce sui sintomi del trauma, non sul disturbo di base. La psicosi acuta e la mania sono una controindicazione all'elaborazione." },
    adhd: { level: "insufficient", condition: "ADHD", note: "Non esistono RCT diretti sull'EMDR come trattamento dell'ADHD. Non si può affermare che sia utile nell'ADHD." },
    sleep: { level: "insufficient", condition: "Disturbi del sonno", note: "Non esistono RCT specifici; il miglioramento del sonno è un effetto secondario del trattamento del DPTS. Il metodo basato sulle evidenze per l'insonnia è la TCC-I (CBT-I)." }
  },
  levelLabels: {
    strong: "Dati solidi",
    moderate: "Moderati",
    emerging: "Preliminari",
    insufficient: "Insufficienti"
  },
  protocolIntro: "Il protocollo completo viene condotto da un terapeuta formato. L'auto-aiuto è appropriato solo nella fase 2 (stabilizzazione).",
  phases: [
    { n: 1, name: "Raccolta dell'anamnesi e piano", desc: "Storia, valutazione della prontezza, scelta dei ricordi-bersaglio e dei trigger." },
    { n: 2, name: "Preparazione e stabilizzazione", desc: "Spiegazione del metodo e abilità di autoregolazione: luogo sicuro, radicamento, respirazione, contenimento. Solo qui è appropriato l'auto-aiuto." },
    { n: 3, name: "Valutazione del bersaglio", desc: "Immagine, convinzione negativa e convinzione positiva desiderata, emozioni e sensazioni corporee; misurazione con le scale SUD (0-10) e VOC." },
    { n: 4, name: "Desensibilizzazione", desc: "Mantenimento del bersaglio con serie di stimolazione fino alla riduzione del disagio (SUD) a 0-1." },
    { n: 5, name: "Installazione", desc: "Consolidamento della convinzione positiva insieme al ricordo." },
    { n: 6, name: "Scansione corporea", desc: "Ricerca di tensione corporea residua e ulteriore lavoro se necessario." },
    { n: 7, name: "Chiusura", desc: "Ritorno a uno stato stabile, luogo sicuro, indicazioni tra una seduta e l'altra." },
    { n: 8, name: "Rivalutazione", desc: "All'inizio della seduta successiva: verifica del risultato e piano del lavoro successivo." }
  ],
  positioningTitle: "",
  safetyStop: `Interrompi immediatamente la stimolazione se il disagio diventa insopportabile, se compaiono vertigini o nausea, una sensazione di dissociazione (distacco dalla realtà) o pensieri di autolesionismo. Cosa fare: apri gli occhi e guardati intorno; esegui la tecnica 5-4-3-2-1; respirazione quadrata (inspira 4, trattieni 4, espira 4, trattieni 4); torna al luogo sicuro stabilito in precedenza. Queste abilità andrebbero apprese PRIMA di qualunque elaborazione.`,
  safetyPhoto: `Epilessia fotosensibile: circa il 3% delle persone con epilessia è sensibile al lampeggio (intervallo pericoloso 3-30 Hz). Il bersaglio standard dell'EMDR si muove lentamente e in modo fluido, perciò di per sé il rischio è basso. Tuttavia, se hai avuto crisi convulsive, scegli la modalità movimento ridotto o una stimolazione non visiva (suono o tocchi) ed evita i preset rapidi ad alto contrasto.`,
  openGrounding: "Apri il radicamento 5-4-3-2-1",
  notStartAlone: "Non iniziare da soli",
  contraindications: [
    "Psicosi acuta o mania non controllata",
    "Disturbo dissociativo grave (incluso il DID)",
    "Pensieri suicidari acuti o autolesionismo",
    "Ambiente pericoloso o violento in corso",
    "Uso di sostanze psicoattive che ostacola l'autoregolazione"
  ],
  relabelsTitle: "",
  relabelAs: "Come stanno le cose:",
  relabels: [
    { original: "Guarigione 528 Hz / Frequenza della riparazione", verdict: "Pseudoscienza. Le frequenze Solfeggio sono state inventate attraverso la numerologia negli anni '70, non dalla fisica. Il suono udibile non ripara il DNA o le cellule.", honest: "Tono rilassante 528 Hz: un suono piacevole per molti, adatto alla meditazione. Non cura e non ripara il DNA." },
    { original: "Battiti binaurali per il sonno", verdict: "Sopravvalutati. I dati sono deboli e contraddittori; la sincronizzazione delle onde cerebrali non è confermata (Ingendoh 2023).", honest: "Suono di sottofondo tranquillo per il riposo. L'effetto è delicato e soggettivo; non è una cura per l'insonnia." },
    { original: "Alternanza dell'attivazione dell'emisfero destro e sinistro", verdict: "Non confermata. I movimenti verticali e i compiti non alternati funzionano allo stesso modo.", honest: "Un compito a doppia attenzione che carica la memoria di lavoro. È un'ipotesi di lavoro, non un'attivazione degli emisferi." },
    { original: "Frequenze curative (quadro generale)", verdict: "È pseudoscientifico attribuire a specifici Hz proprietà curative; il beneficio deriva dal rilassamento generale e dall'effetto placebo.", honest: "Qui i suoni servono per il rilassamento e la predisposizione, non come procedura medica." }
  ],
  refsTitle: "Fonti",
  guideImportant: "è uno strumento di auto-aiuto, non una psicoterapia e non un sostituto dello specialista. In caso di DPTS, trauma grave, dissociazione, pensieri suicidari o psicosi rivolgiti a un terapeuta EMDR certificato.",

  discTitle1: "Prima di iniziare",
  discIntro: "Questo è uno strumento di auto-aiuto, non una terapia EMDR e non un sostituto dello specialista.",
  discBox: "L'elaborazione autonoma dei ricordi traumatici senza un terapeuta formato non è di provata sicurezza e può aggravare i sintomi. Usa lo strumento per il radicamento, la costruzione di risorse e il rilassamento. Il lavoro completo sul trauma viene condotto da un terapeuta EMDR certificato.",
  discPhoto: "La stimolazione può provocare reazioni emotive e corporee. Se hai avuto crisi convulsive o fotosensibilità, scegli la modalità movimento ridotto o la stimolazione sonora.",
  discTitle2: "Breve screening",
  discScreenIntro: "Se una di queste condizioni è presente proprio ora, non iniziare da solo. Rivolgiti a uno specialista.",
  discConfirm: "Confermo: nessuna delle condizioni elencate è presente in me proprio ora, e uso lo strumento per il radicamento e il rilassamento, non per l'elaborazione autonoma del trauma.",
  discAccept: "Ho capito e accetto",

  groundBadge: "Radicamento",
  groundTitle: "Torna al qui e ora",
  groundStopped: "Stimolazione interrotta. Fai una pausa.",
  breathPhases: ["Inspira", "Trattieni", "Espira", "Trattieni"],
  boxBreathHint: "Respirazione quadrata: inspira 4, trattieni 4, espira 4, trattieni 4",
  nameAloud: "Nomina ad alta voce",
  grounding5432: [
    "5 oggetti che vedi",
    "4 oggetti che puoi toccare",
    "3 suoni che senti",
    "2 odori che percepisci",
    "1 sapore in bocca"
  ],
  groundDone: "Mi sento più tranquillo",

  installTitle: "Installa EMDR",
  installSub: "Per usarlo senza i limiti del browser",
  installIosStep1Pre: "Premi il pulsante",
  installShare: "Condividi",
  installIosStep2Pre: "Scorri e seleziona",
  installIosHome: 'Aggiungi alla schermata Home',
  installAndroidStep1Pre: "Premi",
  installMenu: "Menu",
  installAndroidStep2: "Seleziona Installa o Aggiungi",
  installThanks: "Ho capito, grazie",

  fbTitle: "Feedback",
  fbContact: "Contatta il creatore",
  fbIntro: "Questo è uno strumento di auto-aiuto, non una terapia. Per me è importante il tuo feedback, per renderlo più chiaro, onesto e utile. Non si tratta di raccolta di dati medici.",
  fbThanksTitle: "Grazie per il tuo feedback!",
  fbThanksSub: "La tua opinione è molto importante per lo sviluppo della piattaforma.",
  fbHadTherapy: "Hai seguito una terapia EMDR?",
  fbYes: "Sì",
  fbNo: "No",
  fbVisualRating: "Quanto ti piace il servizio dal punto di vista visivo?",
  fbSettingsRating: "Quanto sono comode le impostazioni attuali?",
  fbFeaturesQ: "Cosa ti piacerebbe aggiungere?",
  fbFeaturesPh: "Nuove funzioni, preset, suoni...",
  fbProblemsQ: "Quali problemi hai incontrato all'inizio della terapia EMDR?",
  fbProblemsPh: "Difficoltà a trovare uno specialista, paura, scarsa comprensione del processo...",
  fbStopReasonQ: "Cosa ti trattiene dall'iniziare la terapia?",
  fbReasonExpensive: "È troppo costoso",
  fbReasonUnclear: "Non è chiaro come iniziare",
  fbReasonAfraid: "Ho paura del processo",
  fbReasonOther: "Altro",
  fbOtherPh: "Descrivi il tuo motivo...",
  fbWhatHelpQ: "Cosa ti aiuterebbe a iniziare questa terapia?",
  fbWhatHelpPh: "Demo gratuita, più informazioni, garanzie...",
  fbSubmit: "Invia il risultato",
  fbError: "Si è verificato un errore durante l'invio. Riprova più tardi.",

  pickTitle: "Scegli la lingua",
  pickSub: "La lingua può essere cambiata in qualsiasi momento nelle impostazioni",

  sessHost: "Sessione con uno specialista",
  sessHostSub: "Sei tu il conduttore. Il cliente vede la stimolazione senza le impostazioni.",
  sessCreate: "Crea sessione",
  sessClientLink: "Link per il cliente",
  sessCopyLink: "Copia il link",
  sessLive: "Cliente connesso",
  sessConnecting: "In attesa del cliente...",
  sessClientBadge: "La seduta è condotta da uno specialista",
  sessClientWaiting: "In attesa del conduttore. Rilassati e respira in modo regolare.",
  sessClientHint: "Le impostazioni sono gestite dallo specialista. Non devi premere nulla.",
  sessEnd: "Termina la sessione",

  navResources: "Risorse e stabilizzazione",
  navJournal: "Diario delle sessioni",

  channelsSection: "Canali e accessibilità",
  blsVolume: "Volume dello stimolo",
  ambientVolumeLabel: "Volume del sottofondo",
  hapticLabel: "Stimolazione con vibrazione",
  hapticDesc: "Vibrazione alternata del telefono come canale tattile della BLS",
  hapticUnsupported: "La vibrazione non è supportata da questo dispositivo",
  visualStim: "Stimolo visivo",
  visualStimDesc: "Disattivalo per una modalità audio/tattile: ipovisione, cinetosi, particolarità della vista",
  vestibular: "Protezione dalla cinetosi",
  vestibularDesc: "Limita velocità e ampiezza in caso di nausea o vertigini",

  groundBeforeExit: "Prima radicati",
  groundBeforeExitSub: "Il livello di disagio è ancora alto. Prima di uscire conviene tornare a uno stato di calma.",
  closeAnyway: "Termina comunque",
  connLost: "La connessione con lo specialista si è interrotta. Stimolazione interrotta. Respira in modo regolare e, se necessario, radicati.",

  sigOk: "Va tutto bene",
  sigPause: "Mi serve una pausa",
  sigStop: "Stop",
  sigBadge: "Il tuo segnale è visibile allo specialista",
  sigHeading: "Segnale del cliente",
  sigNone: "Nessun segnale",
  sigOkH: "Cliente: tutto bene",
  sigPauseH: "Il cliente chiede una pausa",
  sigStopH: "Il cliente chiede lo STOP",
  sigClear: "Azzera",

  tpTitle: "Conduzione della sessione",
  tpSub: "Protocollo per fasi. Solo per lo specialista",
  tpPhaseLabel: "Fase",
  tpTarget: "Bersaglio (immagine o ricordo)",
  tpNeg: "Convinzione negativa (NC)",
  tpPos: "Convinzione positiva (PC)",
  tpEmotions: "Emozioni",
  tpBody: "Sensazioni corporee, dove",
  tpSuds: "SUD (0-10)",
  tpVoc: "VOC (1-7)",
  tpVocInit: "VOC iniziale",
  tpStartSet: "Avvia il set",
  tpStopSet: "Ferma e chiedi",
  tpNoticePrompt: "Cosa noti adesso?",
  tpLogObs: "Registra osservazione",
  tpObsPh: "In breve: immagine, pensiero, sensazione",
  tpNextSet: "Set successivo",
  tpNotes: "Note dello specialista (senza dati personali)",
  tpNotesPh: "Solo osservazioni cliniche, senza il nome del cliente",
  tpSaveSession: "Salva nel diario",
  tpSaved: "Salvato nel diario",
  tpReset: "Nuova sessione",
  tpSudsTrend: "Andamento del SUD",
  tpSoloLock: "Il protocollo completo con la desensibilizzazione è disponibile solo nella modalità sessione con uno specialista. Da soli sono disponibili la preparazione, gli esercizi di risorsa e il radicamento.",
  tpHostOnly: "Crea una sessione (pannello a sinistra) per condurre il protocollo con un cliente",

  modeChooseTitle: "Come lavorerai?",
  modeChooseSub: "Puoi cambiare modalità in qualsiasi momento dal menu laterale",
  modeSpecialist: "Per lo specialista",
  modeSpecialistDesc: "Conduco una sessione con un cliente: creo una stanza, invio il link, conduco il protocollo per fasi con le misurazioni SUD e VOC.",
  modeSelfHelp: "Per l'auto-aiuto",
  modeSelfHelpDesc: "Da solo per me stesso: stabilizzazione, esercizi di risorsa, radicamento e rilassamento. Senza elaborazione autonoma del trauma.",
  modeSwitch: "Cambia modalità",
  modeContinue: "Continua",
  specIntroTitle: "Come condurre una sessione",
  specStep1: "Apri il pannello Sessione con uno specialista e premi Crea sessione.",
  specStep2: "Copia il link e invialo al cliente. Quando si connette, compare lo stato Cliente connesso.",
  specStep3: "Apri Conduzione della sessione: il protocollo per fasi con le misurazioni SUD e VOC si sblocca quando diventi il conduttore.",
  specStartBtn: "Crea sessione",
  selfIntroTitle: "Da dove iniziare",
  selfIntro1: "Inizia dalle risorse e dalla stabilizzazione: luogo sicuro, contenitore, respirazione.",
  selfIntro2: "Il pulsante Stop e radicamento è disponibile in qualsiasi momento.",
  selfIntro3: "Questo è uno strumento di auto-aiuto. L'elaborazione del trauma è condotta da uno specialista, non da un'app.",
  selfStartBtn: "Apri le risorse",

  navOnboarding: "Tutorial",
  tpQuick: "Impostazioni rapide",
  tpLocalMute: "Audio solo da me",
  tpLocalMuteHint: "Silenzia l'audio sul tuo dispositivo. Il cliente continua a sentire il suono.",

  cueTitle: "Mostra al cliente",
  cueHint: "Mostra una meccanica tranquilla sullo schermo del cliente, sopra la stimolazione.",
  cueButterfly: "Abbraccio della farfalla",
  cueBreathing: "Respirazione",
  cueGrounding: "Radicamento",
  cueClear: "Rimuovi",
  crisisHeading: "Aiuto in caso di crisi",

  close: "Chiudi",
  stepLabel: "Passo",
  ofLabel: "di",

  aboutNav: "Informazioni",
  aboutTitle: "EMDR Trainer è un progetto libero",
  aboutDesc: "Usalo gratuitamente. Il codice è aperto, perciò puoi ospitare il servizio sul tuo server.",
  aboutGithub: "Apri su GitHub",
  aboutDonate: "Sostieni il progetto",
  aboutContact: "Contatta l'autore",

  cueLightstream: "Flusso di luce",
  cueContent: {
    butterfly: {
      title: "Abbraccio della farfalla",
      steps: [
        "Siediti comodamente. Incrocia le braccia sul petto, i palmi sulle spalle.",
        "Chiudi gli occhi o abbassa dolcemente lo sguardo. Un respiro tranquillo.",
        "Picchietta le spalle lentamente, una alla volta: prima a sinistra, poi a destra.",
        "Respira in modo regolare e tranquillo. Mantieni un ritmo di circa un tocco al secondo.",
        "Esegui 20-30 tocchi alternati a ritmo tranquillo.",
        "Fermati. Abbassa le braccia e fai un respiro profondo."
      ]
    },
    breathing: {
      title: "Respirazione quadrata",
      steps: [
        "Siediti comodamente, rilassa le spalle. Segui il cerchio sullo schermo.",
        "Respira insieme al cerchio: inspira mentre si espande, espira mentre si contrae.",
        "Mantieni un ritmo regolare: inspira 4, trattieni 4, espira 4, trattieni 4."
      ]
    },
    grounding: {
      title: "Radicamento 5-4-3-2-1",
      steps: [
        "Nomina tra te e te 5 cose che vedi intorno a te.",
        "Nomina 4 cose che puoi toccare.",
        "Nomina 3 suoni che senti.",
        "Nomina 2 odori che percepisci.",
        "Nomina 1 sapore che avverti. Fai un respiro tranquillo."
      ]
    },
    lightstream: {
      title: "Flusso di luce",
      steps: [
        "Mettiti comodo e chiudi gli occhi. Tre respiri lenti e tranquilli.",
        "Immagina una luce calda e delicata - del colore che senti curativo e calmante.",
        "Lascia che questa luce entri dalla sommità del capo. Senti un dolce tepore.",
        "La luce scende lentamente: fronte, viso, collo, spalle. Dove passa, la tensione si dissolve.",
        "La luce scorre attraverso petto, pancia, schiena. Ogni espirazione porta un po' più di rilassamento.",
        "Ora la luce attraversa fianchi, ginocchia, polpacci - verso i piedi.",
        "La luce raggiunge i piedi e scorre nella terra, portando via tutto ciò che non ti serve più. Corpo calmo e leggero."
      ]
    }
  },

  sjBadge: "Diario delle sessioni",
  sjTitle: "Cronologia delle sessioni",
  sjSubtitle: "Le registrazioni sono conservate solo su questo dispositivo",
  sjEmpty: "Ancora nessuna sessione salvata.",
  sjDuration: "Durata",
  sjMode: "Modalità",
  sjModeSolo: "da solo",
  sjModeHost: "specialista",
  sjModeClient: "cliente",
  sjPhase: "Fase",
  sjSuds: "SUD",
  sjSudsTo: "a",
  sjObservations: "osservazioni",
  sjClient: "Codice cliente",
  sjDeleteOne: "Elimina",
  sjClearAll: "Cancella tutto",
  sjClearConfirm: "Eliminare definitivamente tutte le registrazioni del diario?",
  sjDownloadJson: "Scarica JSON",
  sjDownloadCsv: "Scarica CSV",
  sjPrivacyTitle: "Privacy",
  sjPrivacyBody: "I dati sono conservati solo su questo dispositivo e pseudonimizzati (senza nomi, solo codice). Sei tu il titolare del trattamento di questi dati. Ottieni il consenso del cliente prima di registrare.",

  gateBadge: "Prima di iniziare",
  gateTitle: "Verifica rapida",
  gateSub: "Richiede meno di un minuto. Aiuta a confermare che lo strumento sia adatto a te in questo momento.",
  gateScreenTitle: "Seleziona ciò che è vero proprio ora",
  gateScreenIntro: 'Per impostazione predefinita tutte le voci sono "no". Seleziona quelle che valgono per te in questo momento.',
  gateScreenItems: [
    "Sensazione di irrealtà o di distacco da te stesso o da ciò che ti circonda",
    "Pensieri acuti di farti del male o di suicidio",
    "Psicosi o mania proprio ora",
    "Disturbo dissociativo grave (diagnosticato)",
    "Sotto l'effetto di sostanze che compromettono l'autoregolazione"
  ],
  gateStopTitle: "Ora il passo giusto sarebbe rivolgersi a uno specialista",
  gateStopBody: "Una o più voci indicano che il lavoro autonomo a doppia attenzione non è sicuro in questo momento. Non è un giudizio - solo un segnale: serve un supporto professionale.",
  gateStopHint: "Apri la sezione delle risorse per trovare linee di aiuto in caso di crisi e contatti di specialisti.",
  gateOpenResources: "Apri le risorse di supporto",
  gateConsentTitle: "Comprensione e consenso",
  gateConsentItems: [
    "Capisco che questo è uno strumento di auto-aiuto, non una terapia e non un sostituto dello specialista.",
    "Posso interrompere la sessione in qualsiasi momento e userò il radicamento / 5-4-3-2-1 se proverò disagio.",
    "Per un vero lavoro sul trauma deve essere presente uno specialista formato - io uso lo strumento per il radicamento e il rilassamento."
  ],
  gateAccept: "Inizia",

  obSkip: "Salta",
  obDone: "Fatto",
  obSpecialist: [
    { title: "Modalità specialista", body: "Un breve tour dell'interfaccia. Tu guidi il cliente, l'app fornisce la stimolazione bilaterale." },
    { title: "Sessione con un cliente", body: "Crea una stanza e invia il link al cliente. Quando si connette, il suo schermo rispecchia la tua stimolazione senza comandi." },
    { title: "Conduzione della sessione", body: "Il protocollo in 8 fasi, le misurazioni SUD e VOC, l'avvio dei set. Impostazioni rapide al volo, invio di meccaniche al cliente (farfalla, respirazione, radicamento) e silenziamento dell'audio solo dalla tua parte." },
    { title: "Impostazioni della sessione", body: "Schema di movimento, velocità, ampiezza, suono dello stimolo e sfondo. Puoi creare un preset e condividere un link." },
    { title: "Stop e radicamento", body: "Sempre a portata di mano. Ferma la stimolazione e aiuta a tornare al qui e ora. Qui ci sono anche i contatti per le crisi." },
    { title: "Diario delle sessioni", body: "Cronologia locale: impostazioni, set, andamento del SUD. Conservata solo sul tuo dispositivo, senza nomi." },
    { title: "Cambia modalità", body: "Passa in qualsiasi momento tra la modalità specialista e quella di auto-aiuto." },
    { title: "Tutto pronto", body: "Inizia creando una sessione. Puoi riavviare questo tutorial dal pulsante del tutorial nel menu." }
  ],
  obSelfhelp: [
    { title: "Modalità auto-aiuto", body: "Una breve panoramica di cosa c'è e dove. Questo è uno strumento per la stabilizzazione e la calma, non un sostituto della terapia." },
    { title: "Risorse e stabilizzazione", body: "Luogo sicuro, contenitore, flusso di luce, abbraccio della farfalla, respirazione. Sicuro da praticare da soli." },
    { title: "Impostazioni", body: "Schema di movimento, velocità, ampiezza, suono e sfondo a tuo piacimento." },
    { title: "Stop e radicamento", body: "Ferma la stimolazione in qualsiasi momento e ti aiuta a calmarti con il 5-4-3-2-1 e la respirazione." },
    { title: "Tutto pronto", body: "L'elaborazione del trauma è condotta da uno specialista, non da un'app. Puoi riavviare questo tutorial dal menu." }
  ],

  drawerVisual: "Visivo",
  drawerSound: "Suono",
  drawerChannels: "Canali",
  drawerTiming: "Tempi",

  previewPaused: "in pausa",
  previewVisualOff: "visivo disattivato",

  resNote: "Stabilizzazione",
  resTitle: "Esercizi di risorsa",
  resSubtitle: "Stabilizzazione e radicamento - EMDR fase 2",
  resDisclaimer: "Questi esercizi servono alla stabilizzazione e al radicamento, non al ritrattamento del trauma. Sicuri anche senza un terapeuta.",
  resBackToList: "Torna all'elenco",
  resExercises: {
    safe_place: {
      name: "Luogo sicuro / calmo",
      tagline: "Visualizzazione guidata di uno spazio sereno",
      steps: [
        "Mettiti comodo. Chiudi gli occhi o abbassa dolcemente lo sguardo. Fai tre respiri lenti e profondi.",
        "Immagina un luogo in cui ti senti calmo e al sicuro. Può essere reale o del tutto immaginario.",
        "Guardati intorno in quel luogo. Cosa vedi? Nota i colori, la luce, le forme.",
        "Ascolta. Quali suoni ci sono - oppure regna il silenzio?",
        "Senti l'aria sulla pelle. La temperatura, forse un profumo. Percepisci il terreno o la superficie sotto di te.",
        "Lasciati essere pienamente presente lì. Senti il corpo che si rilassa. Ricorda questa sensazione.",
        "Dai un nome a questo luogo - una parola o un'immagine a cui puoi tornare in qualsiasi momento. Apri lentamente gli occhi."
      ]
    },
    container: {
      name: "Contenitore",
      tagline: "Metti mentalmente da parte il materiale disturbante",
      steps: [
        "Siediti comodamente. Fai qualche respiro calmo. Ricorda a te stesso: in questo momento sei al sicuro.",
        "Immagina un contenitore robusto - una cassaforte, un baule, una scatola. Qualcosa di solido con un coperchio o una serratura sicura.",
        "Esaminalo: il materiale, le dimensioni, la serratura o il chiavistello. Assicurati che sembri abbastanza resistente.",
        "Dai un nome a ciò che ti disturba - solo una parola o un'immagine. Non addentrarti nei dettagli.",
        "Immagina di riporlo dentro il contenitore. Chiudi il coperchio. Chiudilo a chiave. Il contenitore è sicuro.",
        "Colloca il contenitore in un luogo sicuro nella tua immaginazione - su uno scaffale, in un caveau. Resterà lì.",
        "Fai un respiro. Potrai tornare a questo materiale più tardi, quando sarai pronto - e con un supporto."
      ]
    },
    light_stream: {
      name: "Flusso di luce",
      tagline: "Luce calda che attraversa il corpo",
      steps: [
        "Siediti o sdraiati comodamente. Chiudi gli occhi. Tre respiri lenti.",
        "Immagina una luce calda e delicata - di qualsiasi colore che per te sia curativo e calmante.",
        "Lascia che questa luce entri dalla sommità della testa. Senti un dolce tepore.",
        "Lentamente la luce scende: fronte, viso, collo. Dove passa la luce, la tensione si dissolve.",
        "La luce scorre attraverso spalle, braccia, petto. A ogni espirazione, un po' più di rilassamento.",
        "Ora la luce attraversa la pancia, la parte bassa della schiena, i fianchi, le ginocchia, i polpacci.",
        "La luce raggiunge i piedi e fluisce nella terra, portando via tutto ciò di cui non hai più bisogno."
      ]
    },
    butterfly_hug: {
      name: "Abbraccio della farfalla",
      tagline: "Auto-tapping alternato per calmarsi",
      steps: [
        "Siediti dritto. Incrocia le braccia sul petto: mano destra sulla spalla sinistra, mano sinistra sulla spalla destra.",
        "Chiudi gli occhi o abbassa dolcemente lo sguardo. Fai un respiro profondo.",
        "Segui l'animazione qui sotto. Inizia a picchiettare lentamente e in modo alternato: prima la mano destra, poi la sinistra.",
        "Continua a ritmo lento - circa una volta al secondo. Respira in modo regolare e calmo.",
        "Pensa a qualcosa di neutro o lievemente piacevole mentre picchietti.",
        "Esegui 20-30 picchiettii alternati. Poi fermati. Fai un respiro profondo.",
        "Abbassa le braccia. Come ti senti? Nota eventuali cambiamenti nel corpo o nell'umore."
      ]
    }
  }
};
