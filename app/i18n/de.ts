import type { Dict } from "./dict";

export const de: Partial<Dict> = {
  start: "Starten",
  next: "Weiter",
  back: "Zurück",
  understand: "Ich verstehe und stimme zu",
  contact: "Kontakt aufnehmen",

  presetApplied: "Konfiguration angewendet",
  presetAppliedSub: "Die Parameter aus dem Link wurden geladen",

  navSettings: "Sitzungseinstellungen",
  navGuide: "Leitfaden und Evidenzlage",
  navFeedback: "Rückmeldung",
  navGrounding: "Stopp und Erdung",
  navExit: "Zu bananamaster",

  finish: "Beenden",
  stopGround: "Stopp und Erdung",
  series: "Serien",

  settingsTitle: "Sitzungseinstellungen",
  settingsSub: "Sitzungsparameter",
  test: "Test",
  pause: "Pause",
  programs: "Programme",
  catCalm: "Erdung und Angst",
  catResource: "Ressource und Entspannung",
  catFocus: "Fokus und Selbstregulation",
  catProfiles: "Stimulationsprofile",
  profilesHint: "Intensive Profile. Nicht für die eigenständige Traumaverarbeitung gedacht, sondern nur als Stimulationsstil.",
  presets: {
    anxiety: { label: "Erdung", desc: "Langsam, beruhigend" },
    panic: { label: "Bei Angst", desc: "Rhythmus zum Sammeln" },
    resource: { label: "Sicherer Ort", desc: "Ressourcenaufbau" },
    focus: { label: "Konzentration", desc: "Punkte, weißes Rauschen" },
    sleep: { label: "Ruhiger Hintergrund", desc: "Zum Ausruhen, sanfter Effekt" },
    grounding_528: { label: "Ton 528 Hz", desc: "Klang zur Entspannung, keine Heilwirkung" },
    adhd_focus: { label: "Sammlung", desc: "Gleichmäßiger Rhythmus zur Konzentration" },
    adhd_impulse: { label: "Tempo", desc: "Aktive Stimulation" },
    adhd_calm: { label: "Verlangsamung", desc: "Senkung der Erregung" },
    adhd_body: { label: "Körper", desc: "Aufmerksamkeit auf Empfindungen" },
    trauma_smooth: { label: "Sanft", desc: "Weiche Bewegungen" },
    trauma_deep: { label: "Langsam", desc: "Diagonal, niedrige Geschwindigkeit" },
    trauma_saccadic: { label: "Sakkadisch", desc: "Abrupte Sprünge, Symbole" },
    trauma_acute: { label: "Schnell", desc: "Hohe Geschwindigkeit" },
    trauma_flashback: { label: "Maximum", desc: "Am intensivsten" }
  },
  patternLabel: "Muster",
  patterns: {
    horizontal: "Horizontal",
    vertical: "Vertikal",
    "diagonal-1": "Diagonale 1",
    "diagonal-2": "Diagonale 2",
    lemniscate: "Lemniskate",
    dots: "Punkte",
    pulse: "Puls",
    bars: "Balken",
    zigzag: "Zickzack"
  },
  shapeLabel: "Form",
  shapes: { circle: "Kreis", square: "Quadrat", ring: "Ring", butterfly: "Schmetterling" },
  colorLabel: "Farbe",
  speedLabel: "Geschwindigkeit",
  amplitudeLabel: "Amplitude",
  amplitudeHint: "Bewegungsreichweite vom Zentrum aus. 100% fast bis zum Rand, 40% näher am Zentrum.",
  seriesLabel: "Serie",
  sizeLabel: "Größe",
  hzUnit: "Hz",
  cyclesUnit: "Zykl.",
  pxUnit: "px",
  reduceMotion: "Bewegungsreduktion",
  reduceMotionDesc: "Sanft, ohne Sakkaden, Geschwindigkeitsgrenze 1,5 Hz. Für Lichtempfindlichkeit",
  saccades: "Sakkaden",
  saccadesDesc: "Abrupter Positionswechsel",
  saccadesOffSafe: " (aus im Modus Bewegungsreduktion)",
  cogLoad: "Kogn. Belastung",
  cogLoadDesc: "Symbole auf dem Objekt",
  mute: "Stumm",
  muteDesc: "Allen Ton ausschalten",
  stimSound: "Reizton",
  audioFormats: {
    continuous: "Sanft",
    click: "Klicks",
    metronome: "Metronom",
    white_noise: "Weißes Rauschen",
    binaural_beats: "Binaural"
  },
  ambientLabel: "Ambiente",
  ambientNames: {
    none: "Aus",
    rain: "Regen",
    ocean: "Wellen",
    breath: "Atem",
    hz528: "528 Hz",
    wind_harmonics: "Wind",
    breathform: "Breathform",
    pink: "Rosa Rauschen",
    brown: "Braunes Rauschen",
    drone: "Drone"
  },
  ambientNote: "Die Klänge und der Ton 528 Hz dienen der Entspannung und Einstimmung, ohne Heilwirkung.",
  bgLabel: "Hintergrund",
  bgNames: { black: "Schwarz", aurora: "Aurora", stars: "Puls" },
  langNames: { ru: "Kyr", en: "Lat", numbers: "123" },
  sessionsToday: "Sitzungen heute",
  sharePreset: "Preset teilen",
  linkCopied: "Link kopiert!",
  languageSection: "Sprache",

  guideTitle: "Leitfaden und Evidenzlage",
  guideSub: "Ehrlich, mit Verweisen auf Studien",
  gWhat: "Was ist EMDR?",
  gHow: "Wie es funktioniert",
  gEvidence: "Evidenzlage nach Störungsbildern",
  gProtocol: "Standardprotokoll: 8 Phasen",
  gPositioning: "Was das Werkzeug kann und was NICHT",
  gSafety: "Sicherheit: Stopp und Erdung",
  gRelabels: 'Ehrlich über Klänge und "Frequenzen"',
  gRefs: "Quellen",
  whatIs: `EMDR (Eye Movement Desensitization and Reprocessing, Desensibilisierung und Verarbeitung durch Augenbewegungen) ist eine strukturierte Psychotherapiemethode, die Ende der 1980er Jahre von Francine Shapiro für die Arbeit mit den Folgen psychischer Traumata entwickelt wurde. In der Sitzung hält die Person eine belastende Erinnerung im Bewusstsein und führt gleichzeitig eine Aufgabe mit dualer Aufmerksamkeit aus: Meist folgt sie mit den Augen einem sich bewegenden Objekt, seltener hört sie wechselnde Töne oder spürt wechselnde Berührungen. Die Arbeit erfolgt nach einem Standardprotokoll aus 8 Phasen und wird von einer geschulten Therapeutin oder einem geschulten Therapeuten geleitet.

Bei PTBS gehört EMDR zu den empfohlenen Methoden, aber ohne Übertreibung. Die WHO (2013) empfiehlt EMDR und traumafokussierte KVT als Mittel der ersten Wahl bei PTBS und bewertet die Datenqualität als niedrig bis moderat. NICE (NG116, 2018) empfiehlt EMDR für Erwachsene als Mittel der ersten Wahl, mit Einschränkungen. Die ISTSS spricht eine starke Empfehlung aus. Die APA (2017) gibt eine bedingte Empfehlung und ordnet EMDR als Mittel der zweiten Wahl nach KVT ein. In der Wirksamkeit bei PTBS ist die Methode der traumafokussierten KVT etwa gleichwertig, nicht überlegen. Außerhalb von PTBS ist die Evidenz deutlich schwächer.`,
  mechanism: `Der Wirkmechanismus von EMDR wird mit zwei Modellen erklärt, und es ist wichtig, sie nicht mit dem Status "belegt" zu verwechseln.

Das Modell der adaptiven Informationsverarbeitung (AIP). Dies ist ein klinischer, theoretischer Rahmen, keine bestätigte Neurobiologie. Die Idee: Das Gehirn verarbeitet Erfahrungen, ein Trauma überlastet dieses System, und die Erinnerung bleibt "dysfunktional gespeichert"; die Methode hilft, die Verarbeitung zu einer ruhigen Auflösung zu führen. Selbst die Fachwelt beschreibt AIP als Modell für die Therapieplanung, nicht als gesicherten Mechanismus.

Die Hypothese der Arbeitsgedächtnisbelastung. Dies ist die am besten bestätigte Erklärung für die Augenbewegungen. Das Arbeitsgedächtnis ist begrenzt: Wenn man sich gleichzeitig ein lebhaftes Bild vorstellt und eine zweite Aufgabe ausführt, konkurrieren beide um Ressourcen, und die Erinnerung wird weniger lebhaft und weniger emotional. Das ist im Labor seit Andrade, Kavanagh und Baddeley (1997) zuverlässig gezeigt worden.

Was man ehrlich zum Strittigen sagen sollte: Der Beitrag der Augenbewegungen selbst ist im Labor zuverlässig, in der Klinik aber schwächer und umstritten (Lee und Cuijpers 2013; Sack 2016). Die "Bilateralität" im Sinne eines Wechsels zwischen den Hirnhälften ist hingegen wissenschaftlich nicht bestätigt: Vertikale Bewegungen und nicht-wechselseitige Aufgaben (Tapping, Zählen, sogar Tetris) wirken ähnlich. Deshalb verwenden wir die Formulierung von der "Aktivierung der rechten und linken Hirnhälfte" nicht: Der wirksame Faktor ist eher die allgemeine Belastung durch die duale Aufmerksamkeit.`,
  positioning: `Dies ist ein Web-Werkzeug zur Selbsthilfe, keine EMDR-Therapie und kein Ersatz für eine Therapeutin oder einen Therapeuten.

Ehrlich gesagt kann es: rhythmische visuelle, akustische oder taktile Stimulation und einen Serientimer bieten; helfen, Stabilisierungsfertigkeiten zu erlernen (Phase 2), sicherer Ort, Erdung 5-4-3-2-1, Atmung, Containment; als Hintergrund für Entspannung und Einstimmung dienen. Wenn man eine eigene Therapeutin oder einen eigenen Therapeuten hat, kann es ein Hilfsmittel zwischen den Sitzungen sein.

Was es nicht leistet: Es führt KEINE vollständige Traumaverarbeitung durch. Die eigenständige Verarbeitung traumatischer Erinnerungen ohne geschulte Fachperson ist nicht als wirksam belegt (kontrollierte Daten zu Apps gibt es kaum) und birgt reale Risiken: Verstärkung der Symptome, Retraumatisierung, Dissoziation, unvollständige Verarbeitung, die niemand abschließen kann. Francine Shapiro warnte davor, dass eine eigenständige Verarbeitung ohne angemessenes Screening schwerwiegende Folgen haben kann. Bei PTBS, schwerem oder frühkindlichem Trauma, Dissoziation, Suizidgedanken oder Psychose gilt: nur eine zertifizierte EMDR-Therapeutin oder ein zertifizierter EMDR-Therapeut.

Die Klänge und "Frequenzen" hier (einschließlich 528 Hz und binauraler Beats) sind Werkzeuge zur Entspannung, keine Heilbehandlung. Sie stellen keine DNA wieder her, heilen keine Krankheiten und ersetzen keine Ärztin und keinen Arzt.`,
  evidenceIntro: "Die Leitlinien (WHO, NICE) empfehlen EMDR vor allem bei PTBS. Unten finden Sie eine ehrliche Einschätzung nach Störungsbildern.",
  evidence: {
    ptsd: { level: "strong", condition: "PTBS bei Erwachsenen", note: "Das einzige Störungsbild mit starker Datenlage und Leitlinienunterstützung: WHO und NICE (erste Wahl, mit Einschränkungen), ISTSS (starke Empfehlung), APA (bedingt, zweite Wahl). Etwa gleichwertig mit traumafokussierter KVT." },
    phobias: { level: "moderate", condition: "Spezifische Phobien", note: "Das beste Ergebnis außerhalb von PTBS. RCTs zeigen einen signifikanten Effekt über bis zu 1 Jahr. In den Leitlinien zu Phobien nicht als erste Wahl verankert." },
    panic: { level: "emerging", condition: "Panikstörung", note: "Eine Metaanalyse zeigt eine Symptomreduktion, doch die RCTs sind widersprüchlich; die Datenlage ist begrenzt." },
    anxiety: { level: "emerging", condition: "Angststörungen", note: "Eine Metaanalyse (Yunitri 2020) zeigt einen Effekt, aber mit kleinen Stichproben und ohne Leitlinienunterstützung." },
    depression: { level: "emerging", condition: "Depression", note: "Moderater Effekt in Metaanalysen, meist als Ergänzung zur Behandlung; die Studienqualität ist gering. Von den Leitlinien bei Depression nicht empfohlen." },
    pain: { level: "insufficient", condition: "Chronischer Schmerz", note: "Nur Pilotstudien und ein kleines RCT. Es gibt keine belastbare Datenlage." },
    grief: { level: "insufficient", condition: "Trauer und Verlust", note: "Überwiegend Theorie und Fallserien. Keine etablierte Behandlungsmethode." },
    addiction: { level: "insufficient", condition: "Abhängigkeiten", note: "Zwei kleine RCTs, Hinweise auf Effekte bei Verlangen und begleitendem Trauma; die Evidenz ist schwach." },
    psychosis: { level: "insufficient", condition: "Psychose und bipolare Störung", note: "Wirkt auf Traumasymptome, nicht auf die Grunderkrankung. Akute Psychose und Manie sind eine Kontraindikation für die Verarbeitung." },
    adhd: { level: "insufficient", condition: "ADHS", note: "Es gibt keine direkten RCTs zu EMDR als Behandlung von ADHS. Eine Wirkung bei ADHS darf nicht behauptet werden." },
    sleep: { level: "insufficient", condition: "Schlafstörungen", note: "Es gibt keine eigenständigen RCTs; eine Verbesserung des Schlafs ist ein sekundärer Effekt der PTBS-Behandlung. Die evidenzbasierte Methode bei Insomnie ist KVT-I (CBT-I)." }
  },
  levelLabels: {
    strong: "Starke Datenlage",
    moderate: "Moderat",
    emerging: "Vorläufig",
    insufficient: "Unzureichend"
  },
  protocolIntro: "Das vollständige Protokoll leitet eine geschulte Therapeutin oder ein geschulter Therapeut. Selbsthilfe ist nur in Phase 2 (Stabilisierung) angebracht.",
  phases: [
    { n: 1, name: "Anamnese und Behandlungsplan", desc: "Vorgeschichte, Einschätzung der Bereitschaft, Auswahl von Zielerinnerungen und Auslösern." },
    { n: 2, name: "Vorbereitung und Stabilisierung", desc: "Erklärung der Methode und Fertigkeiten der Selbstregulation: sicherer Ort, Erdung, Atmung, Containment. Nur hier ist Selbsthilfe angebracht." },
    { n: 3, name: "Bewertung des Ziels", desc: "Bild, negative und gewünschte positive Überzeugung, Emotionen und Körperempfindungen; Messung mit den Skalen SUD (0-10) und VOC." },
    { n: 4, name: "Desensibilisierung", desc: "Halten des Ziels mit Stimulationsserien, bis der Distress (SUD) auf 0-1 sinkt." },
    { n: 5, name: "Installation", desc: "Verankerung der positiven Überzeugung zusammen mit der Erinnerung." },
    { n: 6, name: "Körper-Scan", desc: "Suche nach restlicher körperlicher Anspannung und Nachbearbeitung bei Bedarf." },
    { n: 7, name: "Abschluss", desc: "Rückkehr in einen stabilen Zustand, sicherer Ort, Anweisungen für die Zeit zwischen den Sitzungen." },
    { n: 8, name: "Überprüfung", desc: "Zu Beginn der nächsten Sitzung: Überprüfung des Ergebnisses und Plan für die weitere Arbeit." }
  ],
  positioningTitle: "",
  safetyStop: `Stoppen Sie die Stimulation sofort, wenn der Distress unerträglich wird, wenn Schwindel oder Übelkeit auftreten, ein Gefühl der Dissoziation (Abkopplung von der Realität) oder Gedanken an Selbstverletzung. Was zu tun ist: Öffnen Sie die Augen und sehen Sie sich um; gehen Sie die Technik 5-4-3-2-1 durch; üben Sie die quadratische Atmung (4 einatmen, 4 halten, 4 ausatmen, 4 halten); kehren Sie an Ihren zuvor festgelegten sicheren Ort zurück. Diese Fertigkeiten lernt man am besten VOR jeder Verarbeitung.`,
  safetyPhoto: `Fotosensible Epilepsie: Etwa 3% der Menschen mit Epilepsie reagieren empfindlich auf Flackern (gefährlicher Bereich 3-30 Hz). Das Standardziel von EMDR bewegt sich langsam und gleichmäßig, daher ist das Risiko an sich gering. Wenn Sie dennoch bereits Krampfanfälle hatten, wählen Sie den Modus der Bewegungsreduktion oder eine nicht-visuelle Stimulation (Klang oder Berührungen) und vermeiden Sie schnelle, kontrastreiche Presets.`,
  openGrounding: "Erdung 5-4-3-2-1 öffnen",
  notStartAlone: "Nicht eigenständig beginnen",
  contraindications: [
    "Akute Psychose oder unkontrollierte Manie",
    "Schwere dissoziative Störung (u.a. DIS)",
    "Akute Suizidgedanken oder Selbstverletzung",
    "Anhaltend gefährliche oder gewalttätige Umgebung",
    "Substanzkonsum, der die Selbstregulation beeinträchtigt"
  ],
  relabelsTitle: "",
  relabelAs: "Ehrlich gesagt:",
  relabels: [
    { original: "Heilung 528 Hz / Frequenz der Regeneration", verdict: "Pseudowissenschaft. Die Solfeggio-Frequenzen wurden in den 1970er Jahren über Numerologie ersonnen, nicht aus der Physik abgeleitet. Hörbarer Schall stellt keine DNA und keine Zellen wieder her.", honest: "Entspannender Ton 528 Hz: ein für viele angenehmer Klang zur Meditation. Heilt nicht und stellt keine DNA wieder her." },
    { original: "Binaurale Beats für den Schlaf", verdict: "Überbewertet. Die Datenlage ist schwach und widersprüchlich; eine Synchronisation der Hirnwellen ist nicht bestätigt (Ingendoh 2023).", honest: "Ruhiger Hintergrundklang zum Ausruhen. Der Effekt ist sanft und individuell; das ist keine Behandlung von Insomnie." },
    { original: "Wechselseitige Aktivierung der rechten und linken Hirnhälfte", verdict: "Nicht bestätigt. Vertikale Bewegungen und nicht-wechselseitige Aufgaben wirken genauso.", honest: "Eine Aufgabe mit dualer Aufmerksamkeit, die das Arbeitsgedächtnis belastet. Das ist eine Arbeitshypothese, keine Aktivierung von Hirnhälften." },
    { original: "Heilende Frequenzen (allgemeiner Rahmen)", verdict: "Es ist pseudowissenschaftlich, bestimmten Hz-Werten heilende Eigenschaften zuzuschreiben; der Nutzen entsteht durch allgemeine Entspannung und Placebo.", honest: "Die Klänge dienen hier der Entspannung und Einstimmung, nicht als medizinische Behandlung." }
  ],
  refsTitle: "Quellen",
  guideImportant: "Dies ist ein Selbsthilfewerkzeug, keine Psychotherapie und kein Ersatz für eine Fachperson. Bei PTBS, schwerem Trauma, Dissoziation, Suizidgedanken oder Psychose wenden Sie sich an eine zertifizierte EMDR-Therapeutin oder einen zertifizierten EMDR-Therapeuten.",

  discTitle1: "Bevor Sie beginnen",
  discIntro: "Dies ist ein Selbsthilfewerkzeug, keine EMDR-Therapie und kein Ersatz für eine Fachperson.",
  discBox: "Die eigenständige Verarbeitung traumatischer Erinnerungen ohne geschulte Therapeutin oder geschulten Therapeuten ist nicht als sicher belegt und kann Symptome verstärken. Nutzen Sie das Werkzeug zur Erdung, zum Ressourcenaufbau und zur Entspannung. Die vollständige Arbeit mit dem Trauma leitet eine zertifizierte EMDR-Therapeutin oder ein zertifizierter EMDR-Therapeut.",
  discPhoto: "Die Stimulation kann emotionale und körperliche Reaktionen auslösen. Wenn Sie Krampfanfälle hatten oder lichtempfindlich sind, wählen Sie den Modus der Bewegungsreduktion oder eine akustische Stimulation.",
  discTitle2: "Kurzes Screening",
  discScreenIntro: "Wenn etwas davon gerade jetzt auf Sie zutrifft, beginnen Sie nicht eigenständig. Wenden Sie sich an eine Fachperson.",
  discConfirm: "Ich bestätige: Nichts vom Aufgeführten trifft gerade jetzt auf mich zu, und ich nutze das Werkzeug zur Erdung und Entspannung, nicht zur eigenständigen Traumaverarbeitung.",
  discAccept: "Ich verstehe und stimme zu",

  groundBadge: "Erdung",
  groundTitle: "Kehren Sie ins Hier und Jetzt zurück",
  groundStopped: "Die Stimulation wurde gestoppt. Machen Sie eine Pause.",
  breathPhases: ["Einatmen", "Halten", "Ausatmen", "Halten"],
  boxBreathHint: "Quadratische Atmung: 4 einatmen, 4 halten, 4 ausatmen, 4 halten",
  nameAloud: "Benennen Sie laut",
  grounding5432: [
    "5 Dinge, die Sie sehen",
    "4 Dinge, die Sie berühren können",
    "3 Geräusche, die Sie hören",
    "2 Gerüche, die Sie wahrnehmen",
    "1 Geschmack im Mund"
  ],
  groundDone: "Mir geht es ruhiger",

  installTitle: "EMDR installieren",
  installSub: "Für die Nutzung ohne die Grenzen des Browsers",
  installIosStep1Pre: "Tippen Sie auf die Schaltfläche",
  installShare: "Teilen",
  installIosStep2Pre: "Scrollen Sie und wählen Sie",
  installIosHome: 'Zum Home-Bildschirm',
  installAndroidStep1Pre: "Tippen Sie auf",
  installMenu: "Menü",
  installAndroidStep2: "Wählen Sie Installieren oder Hinzufügen",
  installThanks: "Verstanden, danke",

  fbTitle: "Rückmeldung",
  fbContact: "Den Entwickler kontaktieren",
  fbIntro: "Dies ist ein Selbsthilfewerkzeug, keine Therapie. Ihre Rückmeldung ist mir wichtig, um es verständlicher, ehrlicher und nützlicher zu machen. Dies ist keine Erhebung medizinischer Daten.",
  fbThanksTitle: "Danke für Ihre Rückmeldung!",
  fbThanksSub: "Ihre Meinung ist für die Weiterentwicklung der Plattform sehr wichtig.",
  fbHadTherapy: "Haben Sie eine EMDR-Therapie gemacht?",
  fbYes: "Ja",
  fbNo: "Nein",
  fbVisualRating: "Wie gut gefällt Ihnen der Dienst optisch?",
  fbSettingsRating: "Wie benutzerfreundlich sind die Einstellungen derzeit umgesetzt?",
  fbFeaturesQ: "Was würden Sie sich zusätzlich wünschen?",
  fbFeaturesPh: "Neue Funktionen, Presets, Klänge...",
  fbProblemsQ: "Auf welche Probleme sind Sie zu Beginn der EMDR-Therapie gestoßen?",
  fbProblemsPh: "Schwierigkeiten bei der Suche nach einer Fachperson, Angst, Unverständnis des Prozesses...",
  fbStopReasonQ: "Was hält Sie davon ab, mit der Therapie zu beginnen?",
  fbReasonExpensive: "Es ist zu teuer",
  fbReasonUnclear: "Es ist unklar, wie man beginnt",
  fbReasonAfraid: "Ich habe Angst vor dem Prozess",
  fbReasonOther: "Sonstiges",
  fbOtherPh: "Beschreiben Sie Ihren Grund...",
  fbWhatHelpQ: "Was würde Ihnen helfen, eine solche Therapie zu beginnen?",
  fbWhatHelpPh: "Kostenlose Demo, mehr Informationen, Garantien...",
  fbSubmit: "Ergebnis senden",
  fbError: "Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.",

  pickTitle: "Wählen Sie die Sprache",
  pickSub: "Die Sprache kann jederzeit in den Einstellungen geändert werden",

  sessHost: "Sitzung mit einer Fachperson",
  sessHostSub: "Sie leiten. Die Klientin oder der Klient sieht die Stimulation ohne Einstellungen.",
  sessCreate: "Sitzung erstellen",
  sessClientLink: "Link für die Klientin oder den Klienten",
  sessCopyLink: "Link kopieren",
  sessLive: "Klient verbunden",
  sessConnecting: "Warten auf den Klienten...",
  sessClientBadge: "Die Sitzung leitet eine Fachperson",
  sessClientWaiting: "Warten auf die leitende Person. Entspannen Sie sich und atmen Sie gleichmäßig.",
  sessClientHint: "Die Einstellungen steuert die Fachperson. Sie müssen nichts drücken.",
  sessEnd: "Sitzung beenden",

  navResources: "Ressourcen und Stabilisierung",
  navJournal: "Sitzungsjournal",

  channelsSection: "Kanäle und Barrierefreiheit",
  blsVolume: "Lautstärke des Reizes",
  ambientVolumeLabel: "Lautstärke des Hintergrunds",
  hapticLabel: "Vibrationsstimulation",
  hapticDesc: "Wechselnde Vibration des Telefons als taktiler BLS-Kanal",
  hapticUnsupported: "Vibration wird von diesem Gerät nicht unterstützt",
  visualStim: "Visueller Reiz",
  visualStimDesc: "Ausschalten für einen Audio-/taktilen Modus: Sehschwäche, Reisekrankheit, Sehbesonderheiten",
  vestibular: "Schutz vor Reisekrankheit",
  vestibularDesc: "Begrenzt Geschwindigkeit und Amplitude bei Übelkeit oder Schwindel",

  groundBeforeExit: "Erden Sie sich zuerst",
  groundBeforeExitSub: "Der Distress ist noch hoch. Vor dem Verlassen lohnt es sich, in einen ruhigen Zustand zurückzukehren.",
  closeAnyway: "Trotzdem beenden",
  connLost: "Die Verbindung zur Fachperson wurde unterbrochen. Die Stimulation wurde gestoppt. Atmen Sie gleichmäßig und erden Sie sich bei Bedarf.",

  sigOk: "Alles in Ordnung",
  sigPause: "Brauche eine Pause",
  sigStop: "Stopp",
  sigBadge: "Ihr Signal ist für die Fachperson sichtbar",
  sigHeading: "Signal des Klienten",
  sigNone: "Keine Signale",
  sigOkH: "Klient: alles in Ordnung",
  sigPauseH: "Klient bittet um eine Pause",
  sigStopH: "Klient bittet um STOPP",
  sigClear: "Zurücksetzen",

  tpTitle: "Sitzungsführung",
  tpSub: "Protokoll nach Phasen. Nur für Fachpersonen",
  tpPhaseLabel: "Phase",
  tpTarget: "Ziel (Bild oder Erinnerung)",
  tpNeg: "Negative Überzeugung (NC)",
  tpPos: "Positive Überzeugung (PC)",
  tpEmotions: "Emotionen",
  tpBody: "Körperempfindungen, wo",
  tpSuds: "SUD (0-10)",
  tpVoc: "VOC (1-7)",
  tpVocInit: "VOC anfangs",
  tpStartSet: "Set starten",
  tpStopSet: "Stoppen und fragen",
  tpNoticePrompt: "Was nimmst du gerade wahr?",
  tpLogObs: "Beobachtung notieren",
  tpObsPh: "Kurz: Bild, Gedanke, Empfindung",
  tpNextSet: "Nächstes Set",
  tpNotes: "Notizen der Fachperson (ohne personenbezogene Daten)",
  tpNotesPh: "Nur klinische Beobachtungen, ohne Name des Klienten",
  tpSaveSession: "Im Journal speichern",
  tpSaved: "Im Journal gespeichert",
  tpReset: "Neue Sitzung",
  tpSudsTrend: "Verlauf des SUD",
  tpSoloLock: "Das vollständige Protokoll mit Desensibilisierung ist nur im Modus der Sitzung mit einer Fachperson verfügbar. Allein stehen Vorbereitung, Ressourcenübungen und Erdung zur Verfügung.",
  tpHostOnly: "Erstellen Sie eine Sitzung (Panel links), um das Protokoll mit einem Klienten zu führen",

  modeChooseTitle: "Wie werden Sie arbeiten?",
  modeChooseSub: "Der Modus lässt sich jederzeit im Seitenmenü wechseln",
  modeSpecialist: "Für Fachpersonen",
  modeSpecialistDesc: "Ich führe eine Sitzung mit einem Klienten: Ich erstelle einen Raum, sende den Link und führe das Phasenprotokoll mit Messungen von SUD und VOC.",
  modeSelfHelp: "Für Selbsthilfe",
  modeSelfHelpDesc: "Für mich selbst: Stabilisierung, Ressourcenübungen, Erdung und Entspannung. Ohne eigenständige Traumaverarbeitung.",
  modeSwitch: "Modus wechseln",
  modeContinue: "Fortfahren",
  specIntroTitle: "Wie man eine Sitzung führt",
  specStep1: "Öffnen Sie das Panel Sitzung mit einer Fachperson und tippen Sie auf Sitzung erstellen.",
  specStep2: "Kopieren Sie den Link und senden Sie ihn dem Klienten. Sobald er sich verbindet, erscheint der Status Klient verbunden.",
  specStep3: "Öffnen Sie Sitzungsführung: Das Phasenprotokoll mit Messungen von SUD und VOC wird freigeschaltet, sobald Sie die leitende Person geworden sind.",
  specStartBtn: "Sitzung erstellen",
  selfIntroTitle: "Womit beginnen",
  selfIntro1: "Beginnen Sie mit Ressourcen und Stabilisierung: sicherer Ort, Container, Atmung.",
  selfIntro2: "Die Schaltfläche Stopp und Erdung ist jederzeit verfügbar.",
  selfIntro3: "Dies ist ein Selbsthilfewerkzeug. Die Traumaverarbeitung leitet eine Fachperson, nicht eine App.",
  selfStartBtn: "Ressourcen öffnen",

  navOnboarding: "Einführung",
  tpQuick: "Schnelleinstellungen",
  tpLocalMute: "Ton nur bei mir",
  tpLocalMuteHint: "Den Ton auf Ihrem Gerät stummschalten. Beim Klienten wird der Ton weiterhin abgespielt.",

  cueTitle: "Dem Klienten zeigen",
  cueHint: "Zeigt eine ruhige Übung auf dem Bildschirm des Klienten über der Stimulation an.",
  cueButterfly: "Schmetterlingsumarmung",
  cueBreathing: "Atmung",
  cueGrounding: "Erdung",
  cueClear: "Entfernen",
  crisisHeading: "Krisenhilfe",

  close: "Schließen",
  stepLabel: "Schritt",
  ofLabel: "von",

  aboutNav: "Über das Projekt",
  aboutTitle: "EMDR-Trainer ist ein freies Projekt",
  aboutDesc: "Kostenlos nutzbar. Der Code ist offen, Sie können den Dienst auf Ihrem eigenen Server betreiben.",
  aboutGithub: "Auf GitHub öffnen",
  aboutDonate: "Das Projekt unterstützen",
  aboutContact: "Den Autor kontaktieren",

  cueLightstream: "Lichtstrom",
  cueContent: {
    butterfly: {
      title: "Schmetterlingsumarmung",
      steps: [
        "Setzen Sie sich bequem hin. Kreuzen Sie die Arme vor der Brust, die Handflächen auf den Schultern.",
        "Schließen Sie die Augen oder senken Sie sanft den Blick. Ein ruhiger Atemzug.",
        "Klopfen Sie langsam abwechselnd auf die Schultern: links, dann rechts.",
        "Atmen Sie gleichmäßig und ruhig. Halten Sie einen Rhythmus von etwa einmal pro Sekunde.",
        "Machen Sie 20-30 abwechselnde Klopfbewegungen in ruhigem Tempo.",
        "Halten Sie inne. Senken Sie die Arme und atmen Sie tief ein."
      ]
    },
    breathing: {
      title: "Quadratische Atmung",
      steps: [
        "Setzen Sie sich bequem hin, entspannen Sie die Schultern. Folgen Sie dem Kreis auf dem Bildschirm.",
        "Atmen Sie mit dem Kreis: einatmen beim Größerwerden, ausatmen beim Kleinerwerden.",
        "Halten Sie einen gleichmäßigen Rhythmus: 4 einatmen, 4 halten, 4 ausatmen, 4 halten."
      ]
    },
    grounding: {
      title: "Erdung 5-4-3-2-1",
      steps: [
        "Benennen Sie für sich 5 Dinge, die Sie um sich herum sehen.",
        "Benennen Sie 4 Dinge, die Sie berühren können.",
        "Benennen Sie 3 Geräusche, die Sie hören.",
        "Benennen Sie 2 Gerüche, die Sie wahrnehmen.",
        "Benennen Sie 1 Geschmack, den Sie wahrnehmen. Atmen Sie ruhig ein."
      ]
    },
    lightstream: {
      title: "Lichtstrom",
      steps: [
        "Machen Sie es sich bequem und schließen Sie die Augen. Drei langsame, ruhige Atemzüge.",
        "Stellen Sie sich ein warmes, sanftes Licht vor - in einer Farbe, die sich heilsam und ruhig anfühlt.",
        "Lassen Sie das Licht durch den Scheitel eintreten. Spüren Sie eine sanfte Wärme.",
        "Das Licht bewegt sich langsam nach unten: Stirn, Gesicht, Hals, Schultern. Wo es vorbeizieht, löst sich Anspannung.",
        "Das Licht fließt durch Brust, Bauch, Rücken. Mit jedem Ausatmen etwas mehr Entspannung.",
        "Nun zieht das Licht durch Hüften, Knie, Waden - hinunter zu den Füßen.",
        "Das Licht erreicht die Füße und fließt in die Erde, trägt alles Überflüssige fort. Der Körper ist leicht und ruhig."
      ]
    }
  },

  sjBadge: "Sitzungsjournal",
  sjTitle: "Sitzungsverlauf",
  sjSubtitle: "Aufzeichnungen werden nur auf diesem Gerät gespeichert",
  sjEmpty: "Noch keine gespeicherten Sitzungen.",
  sjDuration: "Dauer",
  sjMode: "Modus",
  sjModeSolo: "allein",
  sjModeHost: "Fachperson",
  sjModeClient: "Klient",
  sjPhase: "Phase",
  sjSuds: "SUD",
  sjSudsTo: "auf",
  sjObservations: "Beobachtungen",
  sjClient: "Klientencode",
  sjDeleteOne: "Löschen",
  sjClearAll: "Alles löschen",
  sjClearConfirm: "Alle Journaleinträge unwiderruflich löschen?",
  sjDownloadJson: "JSON herunterladen",
  sjDownloadCsv: "CSV herunterladen",
  sjPrivacyTitle: "Datenschutz",
  sjPrivacyBody: "Die Daten werden nur auf diesem Gerät gespeichert und pseudonymisiert (ohne Namen, nur Code). Sie sind die verantwortliche Stelle für diese Daten. Holen Sie vor der Aufzeichnung die Einwilligung des Klienten ein.",

  gateBadge: "Bevor Sie beginnen",
  gateTitle: "Kurze Überprüfung",
  gateSub: "Dauert weniger als eine Minute. Hilft sicherzustellen, dass das Werkzeug gerade für Sie geeignet ist.",
  gateScreenTitle: "Markieren Sie, was gerade jetzt zutrifft",
  gateScreenIntro: 'Standardmäßig sind alle Punkte "nein". Markieren Sie jeden, der gerade auf Sie zutrifft.',
  gateScreenItems: [
    "Gefühl der Unwirklichkeit oder Abkopplung von sich selbst und der Umgebung",
    "Akute Gedanken, sich selbst zu schaden, oder Suizidgedanken",
    "Psychose oder Manie gerade jetzt",
    "Schwere dissoziative Störung (Diagnose)",
    "Substanzen, die die Fähigkeit zur Selbstregulation beeinträchtigen"
  ],
  gateStopTitle: "Jetzt ist es besser, sich an eine Fachperson zu wenden",
  gateStopBody: "Einer oder mehrere Punkte weisen darauf hin, dass eigenständige Arbeit mit dualer Aufmerksamkeit gerade nicht sicher ist. Das ist keine Kritik, nur ein Signal: Es braucht professionelle Unterstützung.",
  gateStopHint: "Öffnen Sie den Ressourcenbereich, um Krisenhilfe und Kontakte zu Fachpersonen zu finden.",
  gateOpenResources: "Unterstützungsressourcen öffnen",
  gateConsentTitle: "Verständnis und Einwilligung",
  gateConsentItems: [
    "Ich verstehe, dass dies ein Selbsthilfewerkzeug ist, keine Therapie und kein Ersatz für eine Fachperson.",
    "Ich kann die Sitzung jederzeit stoppen und nutze Erdung / 5-4-3-2-1, wenn ich Unbehagen verspüre.",
    "Für die vollständige Arbeit mit dem Trauma sollte eine geschulte Fachperson dabei sein - ich nutze das Werkzeug zur Erdung und Entspannung."
  ],
  gateAccept: "Starten",

  obSkip: "Überspringen",
  obDone: "Fertig",
  obSpecialist: [
    { title: "Modus für Fachpersonen", body: "Eine kurze Tour durch die Oberfläche. Sie führen den Klienten, die App liefert die bilaterale Stimulation." },
    { title: "Sitzung mit einem Klienten", body: "Erstellen Sie einen Raum und senden Sie den Link an den Klienten. Sobald er sich verbindet, spiegelt sein Bildschirm Ihre Stimulation ohne Einstellungen." },
    { title: "Sitzungsführung", body: "Das Protokoll nach 8 Phasen, Messungen von SUD und VOC, Starten von Sets. Hier gibt es auch Schnelleinstellungen unterwegs und das Anzeigen von Übungen beim Klienten: Schmetterling, Atmung, Erdung. Und eine Schaltfläche, um den Ton nur bei sich selbst stummzuschalten." },
    { title: "Sitzungseinstellungen", body: "Bewegungsmuster, Geschwindigkeit, Amplitude, Reizton und Hintergrund. Sie können ein Preset zusammenstellen und einen Link teilen." },
    { title: "Stopp und Erdung", body: "Immer griffbereit. Stoppt die Stimulation und hilft, ins Hier und Jetzt zurückzukehren. Hier finden sich auch die Krisenkontakte." },
    { title: "Sitzungsjournal", body: "Lokaler Verlauf: Einstellungen, Sets, Verlauf des SUD. Wird nur auf Ihrem Gerät gespeichert, ohne Namen." },
    { title: "Modus wechseln", body: "Jederzeit zwischen dem Modus für Fachpersonen und dem Selbsthilfemodus umschalten." },
    { title: "Fertig", body: "Beginnen Sie mit dem Erstellen einer Sitzung. Diese Einführung lässt sich über die Einführungsschaltfläche im Menü neu starten." }
  ],
  obSelfhelp: [
    { title: "Selbsthilfemodus", body: "Ein kurzer Überblick, was wo ist. Dies ist ein Werkzeug zur Stabilisierung und Entspannung, kein Ersatz für eine Therapie." },
    { title: "Ressourcen und Stabilisierung", body: "Sicherer Ort, Container, Lichtstrom, Schmetterlingsumarmung, Atmung. Sicher, eigenständig zu üben." },
    { title: "Einstellungen", body: "Bewegungsmuster, Geschwindigkeit, Amplitude, Ton und Hintergrund nach eigenem Geschmack." },
    { title: "Stopp und Erdung", body: "Stoppt die Stimulation jederzeit und hilft Ihnen, sich mit der Technik 5-4-3-2-1 und der Atmung zu beruhigen." },
    { title: "Fertig", body: "Die Traumaverarbeitung leitet eine Fachperson, nicht eine App. Diese Einführung lässt sich über das Menü neu starten." }
  ],

  drawerVisual: "Visuell",
  drawerSound: "Ton",
  drawerChannels: "Kanäle",
  drawerTiming: "Timing",

  previewPaused: "Pause",
  previewVisualOff: "Visuell aus",

  resNote: "Stabilisierung",
  resTitle: "Ressourcenübungen",
  resSubtitle: "Stabilisierung und Erdung - EMDR-Phase 2",
  resDisclaimer: "Diese Übungen dienen der Stabilisierung und Erdung, nicht der Traumaverarbeitung. Sicher auch ohne Therapeutin oder Therapeuten.",
  resBackToList: "Zurück zur Liste",
  resExercises: {
    safe_place: {
      name: "Sicherer / ruhiger Ort",
      tagline: "Geführte Vorstellung eines friedvollen Ortes",
      steps: [
        "Machen Sie es sich bequem. Schließen Sie die Augen oder senken Sie sanft den Blick. Drei langsame, tiefe Atemzüge.",
        "Stellen Sie sich einen Ort vor, an dem Sie sich ruhig und sicher fühlen. Er kann real oder ganz erdacht sein.",
        "Sehen Sie sich an diesem Ort um. Was sehen Sie? Achten Sie auf Farben, Licht, Formen.",
        "Hören Sie hin. Welche Geräusche gibt es - oder ist es still?",
        "Spüren Sie die Luft auf Ihrer Haut. Die Temperatur, vielleicht einen Duft. Fühlen Sie den Boden oder die Fläche unter sich.",
        "Lassen Sie sich ganz darauf ein, dort zu sein. Spüren Sie, wie Ihr Körper sich entspannt. Merken Sie sich dieses Gefühl.",
        "Geben Sie diesem Ort einen Namen - ein Wort oder Bild, zu dem Sie jederzeit zurückkehren können. Öffnen Sie langsam die Augen."
      ]
    },
    container: {
      name: "Container",
      tagline: "Belastendes Material gedanklich beiseitelegen",
      steps: [
        "Sitzen Sie bequem. Ein paar ruhige Atemzüge. Erinnern Sie sich: Gerade jetzt sind Sie sicher.",
        "Stellen Sie sich einen stabilen Behälter vor - einen Tresor, eine Truhe, eine Kiste. Etwas Festes mit sicherem Deckel oder Schloss.",
        "Betrachten Sie ihn: das Material, die Größe, das Schloss oder den Riegel. Vergewissern Sie sich, dass er stabil genug wirkt.",
        "Benennen Sie, was Sie belastet - nur ein Wort oder Bild. Tauchen Sie nicht in Einzelheiten ein.",
        "Stellen Sie sich vor, wie Sie es in den Behälter legen. Schließen Sie den Deckel. Verriegeln Sie ihn. Der Behälter ist sicher.",
        "Stellen Sie den Behälter in Ihrer Vorstellung an einen sicheren Ort - auf ein Regal, in einen Tresorraum. Er bleibt dort.",
        "Atmen Sie durch. Sie können später zu diesem Material zurückkehren, wenn Sie bereit sind - und mit Unterstützung."
      ]
    },
    light_stream: {
      name: "Lichtstrom",
      tagline: "Warmes Licht, das durch den Körper zieht",
      steps: [
        "Sitzen oder liegen Sie bequem. Schließen Sie die Augen. Drei langsame Atemzüge.",
        "Stellen Sie sich ein warmes, sanftes Licht vor - in einer Farbe, die sich für Sie heilsam und ruhig anfühlt.",
        "Lassen Sie dieses Licht durch den Scheitel eintreten. Spüren Sie eine sanfte Wärme.",
        "Langsam zieht das Licht nach unten: Stirn, Gesicht, Hals. Wo das Licht vorbeizieht, löst sich Anspannung.",
        "Das Licht fließt durch Schultern, Arme, Brust. Mit jedem Ausatmen etwas mehr Entspannung.",
        "Nun zieht das Licht durch Bauch, unteren Rücken, Hüften, Knie, Waden.",
        "Das Licht erreicht die Füße und fließt in die Erde, trägt alles fort, was Sie nicht mehr brauchen."
      ]
    },
    butterfly_hug: {
      name: "Schmetterlingsumarmung",
      tagline: "Abwechselndes Selbstklopfen zur Selbstberuhigung",
      steps: [
        "Sitzen Sie aufrecht. Kreuzen Sie die Arme vor der Brust: rechte Hand auf der linken Schulter, linke Hand auf der rechten Schulter.",
        "Schließen Sie die Augen oder senken Sie sanft den Blick. Ein tiefer Atemzug.",
        "Folgen Sie der Animation unten. Beginnen Sie langsam und abwechselnd zu klopfen: zuerst die rechte Hand, dann die linke.",
        "Halten Sie ein langsames Tempo - etwa einmal pro Sekunde. Atmen Sie gleichmäßig und ruhig.",
        "Denken Sie an etwas Neutrales oder leicht Angenehmes, während Sie klopfen.",
        "Machen Sie 20-30 abwechselnde Klopfbewegungen. Halten Sie dann inne. Atmen Sie tief ein.",
        "Senken Sie die Arme. Wie fühlen Sie sich? Achten Sie auf Veränderungen in Ihrem Körper oder Ihrer Stimmung."
      ]
    }
  }
};
