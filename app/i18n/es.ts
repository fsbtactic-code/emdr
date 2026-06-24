import type { Dict } from "./dict";

export const es: Partial<Dict> = {
  start: "Empezar",
  next: "Siguiente",
  back: "Atrás",
  understand: "Entiendo y acepto",
  contact: "Contactar",

  presetApplied: "Configuración aplicada",
  presetAppliedSub: "Parámetros del enlace cargados",

  navSettings: "Ajustes de la sesión",
  navGuide: "Guía y base de evidencia",
  navFeedback: "Comentarios",
  navGrounding: "Parar y arraigar",
  navExit: "A bananamaster",

  finish: "Finalizar",
  stopGround: "Parar y arraigar",
  series: "Series",

  settingsTitle: "Ajustes de la sesión",
  settingsSub: "Parámetros de la sesión",
  test: "Prueba",
  pause: "Pausa",
  programs: "Programas",
  catCalm: "Arraigo y ansiedad",
  catResource: "Recursos y relajación",
  catFocus: "Concentración y autorregulación",
  catProfiles: "Perfiles de estimulación",
  profilesHint: "Perfiles intensos. No sirven para el procesamiento autónomo del trauma, solo definen el estilo de estimulación.",
  presets: {
    anxiety: { label: "Arraigo", desc: "Lento y calmante" },
    panic: { label: "Contra la ansiedad", desc: "Ritmo para recuperar la calma" },
    resource: { label: "Lugar seguro", desc: "Trabajo de recursos" },
    focus: { label: "Concentración", desc: "Puntos, ruido blanco" },
    sleep: { label: "Fondo tranquilo", desc: "Para descansar, efecto suave" },
    grounding_528: { label: "Tono de 528 Hz", desc: "Sonido para relajarse, no cura nada" },
    adhd_focus: { label: "Calma", desc: "Ritmo uniforme para concentrarse" },
    adhd_impulse: { label: "Ritmo", desc: "Estimulación activa" },
    adhd_calm: { label: "Desaceleración", desc: "Reducción de la activación" },
    adhd_body: { label: "Cuerpo", desc: "Atención a las sensaciones" },
    trauma_smooth: { label: "Suave", desc: "Movimientos suaves" },
    trauma_deep: { label: "Lento", desc: "Diagonal, baja velocidad" },
    trauma_saccadic: { label: "Sacádico", desc: "Saltos bruscos, símbolos" },
    trauma_acute: { label: "Rápido", desc: "Alta velocidad" },
    trauma_flashback: { label: "Máximo", desc: "El más intenso" }
  },
  patternLabel: "Patrón",
  patterns: {
    horizontal: "Horizontal",
    vertical: "Vertical",
    "diagonal-1": "Diagonal 1",
    "diagonal-2": "Diagonal 2",
    lemniscate: "Lemniscata",
    dots: "Puntos",
    pulse: "Pulso",
    bars: "Barras",
    zigzag: "Zigzag"
  },
  shapeLabel: "Forma",
  shapes: { circle: "Círculo", square: "Cuadrado", ring: "Anillo", butterfly: "Mariposa" },
  colorLabel: "Color",
  speedLabel: "Velocidad",
  amplitudeLabel: "Amplitud",
  amplitudeHint: "Distancia del movimiento desde el centro. Al 100%, casi hasta los bordes; al 40%, más cerca del centro.",
  seriesLabel: "Serie",
  sizeLabel: "Tamaño",
  hzUnit: "Hz",
  cyclesUnit: "ciclos",
  pxUnit: "px",
  reduceMotion: "Reducción de movimiento",
  reduceMotionDesc: "Suave, sin sacadas, con límite de velocidad de 1,5 Hz. Indicado en caso de fotosensibilidad",
  saccades: "Sacadas",
  saccadesDesc: "Cambio brusco de posición",
  saccadesOffSafe: " (desactivadas en el modo de reducción de movimiento)",
  cogLoad: "Carga cogn.",
  cogLoadDesc: "Símbolos sobre el objeto",
  mute: "Silencio",
  muteDesc: "Desactivar todo el sonido",
  stimSound: "Sonido del estímulo",
  audioFormats: {
    continuous: "Suave",
    click: "Clics",
    metronome: "Metrónomo",
    white_noise: "Ruido blanco",
    binaural_beats: "Binaural"
  },
  ambientLabel: "Ambiente",
  ambientNames: {
    none: "Apagado",
    rain: "Lluvia",
    ocean: "Olas",
    breath: "Respiración",
    hz528: "528 Hz",
    wind_harmonics: "Viento",
    breathform: "Breathform",
    pink: "Ruido rosa",
    brown: "Ruido marrón",
    drone: "Drone"
  },
  ambientNote: "Los sonidos y el tono de 528 Hz sirven para relajarse y predisponerse, no tienen efecto terapéutico.",
  bgLabel: "Fondo",
  bgNames: { black: "Negro", aurora: "Aurora", stars: "Pulso" },
  langNames: { ru: "Cir", en: "Lat", numbers: "123" },
  sessionsToday: "Sesiones de hoy",
  sharePreset: "Compartir preset",
  linkCopied: "¡Enlace copiado!",
  languageSection: "Idioma",

  guideTitle: "Guía y base de evidencia",
  guideSub: "Con honestidad y con referencias a estudios",
  gWhat: "¿Qué es el EMDR?",
  gHow: "Cómo funciona",
  gEvidence: "Base de evidencia por trastornos",
  gProtocol: "Protocolo estándar: 8 fases",
  gPositioning: "Lo que la herramienta puede y NO puede hacer",
  gSafety: "Seguridad: parar y arraigar",
  gRelabels: 'Con honestidad sobre los sonidos y las "frecuencias"',
  gRefs: "Fuentes",
  whatIs: `El EMDR (Eye Movement Desensitization and Reprocessing, desensibilización y reprocesamiento por movimientos oculares) es un método estructurado de psicoterapia desarrollado por Francine Shapiro a finales de los años ochenta para abordar las secuelas del trauma psíquico. Durante la sesión, la persona mantiene en su mente un recuerdo traumático y, al mismo tiempo, realiza una tarea de doble atención: lo más habitual es seguir con la mirada un objeto en movimiento y, con menos frecuencia, escuchar sonidos alternos o sentir toques alternados. El trabajo sigue un protocolo estándar de 8 fases y lo dirige un terapeuta formado.

En el TEPT, el EMDR figura entre los métodos recomendados, pero sin exageraciones. La OMS (2013) recomienda el EMDR y la TCC centrada en el trauma como primera línea para el TEPT, y valora la calidad de la evidencia como baja a moderada. NICE (NG116, 2018) recomienda el EMDR en adultos como primera línea, con matices. La ISTSS le otorga una recomendación fuerte. La APA (2017) le da una recomendación condicional y sitúa el EMDR en segunda línea, tras la TCC. En cuanto a la eficacia en el TEPT, el método es aproximadamente equivalente a la TCC centrada en el trauma, no superior. Fuera del TEPT, la evidencia es notablemente más débil.`,
  mechanism: `El mecanismo del EMDR se explica con dos modelos, y es importante no confundirlos con algo "demostrado".

Modelo de procesamiento adaptativo de la información (AIP). Es un marco clínico y teórico, no una neurobiología confirmada. La idea: el cerebro procesa la experiencia, el trauma sobrecarga ese sistema y el recuerdo queda "almacenado de forma disfuncional"; el método ayuda a llevar el procesamiento hasta una resolución tranquila. La propia comunidad profesional describe el AIP como un modelo para planificar la terapia, no como un mecanismo establecido.

Hipótesis de la carga sobre la memoria de trabajo. Es la explicación mejor respaldada para los movimientos oculares. La memoria de trabajo es limitada: si se recuerda al mismo tiempo una imagen vívida y se realiza una segunda tarea, ambas compiten por los recursos, y el recuerdo se vuelve menos vívido y menos emocional. Esto se ha demostrado de forma fiable en el laboratorio desde Andrade, Kavanagh y Baddeley (1997).

Lo que es honesto decir sobre lo que sigue en discusión: la contribución de los propios movimientos oculares es fiable en el laboratorio, pero en la clínica es más débil y se cuestiona (Lee y Cuijpers, 2013; Sack, 2016). En cambio, la "bilateralidad" entendida como alternancia entre hemisferios no está respaldada por la ciencia: los movimientos verticales y las tareas no alternantes (tapping, contar, incluso el Tetris) funcionan de forma parecida. Por eso no empleamos la formulación de la "activación del hemisferio derecho y el izquierdo": el factor activo es, más bien, la carga general de la doble atención.`,
  positioning: `Es una herramienta web de autoayuda, no terapia EMDR ni un sustituto del terapeuta.

Lo que sí puede hacer, con honestidad: ofrecer estimulación visual, sonora o táctil rítmica y un temporizador de series; ayudar a aprender habilidades de estabilización (fase 2): lugar seguro, arraigo 5-4-3-2-1, respiración, contención; servir de fondo para relajarse y predisponerse. Si la persona tiene su propio terapeuta, puede ser un apoyo entre sesiones.

Lo que no hace: NO realiza un procesamiento completo del trauma. El procesamiento autónomo de recuerdos traumáticos sin un profesional formado no ha demostrado ser eficaz (apenas hay datos controlados sobre las aplicaciones) y conlleva riesgos reales: agravamiento de los síntomas, retraumatización, disociación, un procesamiento inacabado que nadie puede cerrar. Francine Shapiro advirtió de que el procesamiento autónomo sin un cribado adecuado puede tener consecuencias graves. En caso de TEPT, trauma grave o infantil, disociación, ideación suicida o psicosis, acuda solo a un terapeuta EMDR certificado.

Los sonidos y las "frecuencias" de aquí (incluidos los 528 Hz y los ritmos binaurales) son herramientas de relajación, no un tratamiento. No reparan el ADN, no curan enfermedades y no sustituyen al médico.`,
  evidenceIntro: "Las guías (OMS, NICE) recomiendan el EMDR sobre todo para el TEPT. A continuación, una valoración honesta por trastornos.",
  evidence: {
    ptsd: { level: "strong", condition: "TEPT en adultos", note: "El único trastorno con una base sólida y el respaldo de las guías: OMS y NICE (primera línea, con matices), ISTSS (recomendación fuerte), APA (condicional, segunda línea). Aproximadamente equivalente a la TCC centrada en el trauma." },
    phobias: { level: "moderate", condition: "Fobias específicas", note: "Lo mejor entre las indicaciones que no son TEPT. Los ECA muestran un efecto significativo hasta 1 año. En las guías sobre fobias no está fijado como primera línea." },
    panic: { level: "emerging", condition: "Trastorno de pánico", note: "El metaanálisis muestra una reducción de los síntomas, pero los ECA son contradictorios; los datos son limitados." },
    anxiety: { level: "emerging", condition: "Trastornos de ansiedad", note: "Un metaanálisis (Yunitri, 2020) muestra efecto, pero con muestras pequeñas y sin respaldo de las guías." },
    depression: { level: "emerging", condition: "Depresión", note: "Efecto moderado en los metaanálisis, casi siempre como complemento del tratamiento; la calidad de los estudios es baja. Las guías no lo recomiendan para la depresión." },
    pain: { level: "insufficient", condition: "Dolor crónico", note: "Solo estudios piloto y un ECA pequeño. No hay una base sólida." },
    grief: { level: "insufficient", condition: "Duelo y pérdida", note: "Sobre todo teoría y series de casos. No es un método de tratamiento establecido." },
    addiction: { level: "insufficient", condition: "Adicciones", note: "Dos ECA pequeños, con indicios sobre el craving y el trauma asociado; la evidencia es débil." },
    psychosis: { level: "insufficient", condition: "Psicosis y trastorno bipolar", note: "Actúa sobre los síntomas del trauma, no sobre el trastorno de base. La psicosis aguda y la manía son una contraindicación para el procesamiento." },
    adhd: { level: "insufficient", condition: "TDAH", note: "No hay ECA directos del EMDR como tratamiento del TDAH. No se puede afirmar que ayude en el TDAH." },
    sleep: { level: "insufficient", condition: "Trastornos del sueño", note: "No hay ECA específicos; la mejora del sueño es un efecto secundario del tratamiento del TEPT. El método basado en la evidencia para el insomnio es la TCC-I (CBT-I)." }
  },
  levelLabels: {
    strong: "Evidencia sólida",
    moderate: "Moderada",
    emerging: "Preliminar",
    insufficient: "Insuficiente"
  },
  protocolIntro: "El protocolo completo lo dirige un terapeuta formado. La autoayuda solo es adecuada en la fase 2 (estabilización).",
  phases: [
    { n: 1, name: "Anamnesis y plan", desc: "Historia, evaluación de la disposición, elección de los recuerdos diana y de los desencadenantes." },
    { n: 2, name: "Preparación y estabilización", desc: "Explicación del método y habilidades de autorregulación: lugar seguro, arraigo, respiración, contención. Solo aquí es adecuada la autoayuda." },
    { n: 3, name: "Evaluación de la diana", desc: "Imagen, creencia negativa y creencia positiva deseada, emociones y sensaciones corporales; medición con las escalas SUD (0-10) y VOC." },
    { n: 4, name: "Desensibilización", desc: "Mantener la diana con series de estimulación hasta que el malestar (SUD) baje a 0-1." },
    { n: 5, name: "Instalación", desc: "Fijación de la creencia positiva junto con el recuerdo." },
    { n: 6, name: "Exploración corporal", desc: "Búsqueda de la tensión corporal residual y trabajo adicional si es necesario." },
    { n: 7, name: "Cierre", desc: "Regreso a un estado estable, lugar seguro, instrucciones entre sesiones." },
    { n: 8, name: "Reevaluación", desc: "Al inicio de la siguiente sesión: comprobación del resultado y plan del trabajo posterior." }
  ],
  positioningTitle: "",
  safetyStop: `Detenga la estimulación de inmediato si el malestar se vuelve insoportable, si aparece mareo o náuseas, una sensación de disociación (desconexión de la realidad) o pensamientos de autolesión. Qué hacer: abra los ojos y mire a su alrededor; realice la técnica 5-4-3-2-1; respiración cuadrada (inspire 4, retenga 4, espire 4, retenga 4); regrese al lugar seguro establecido de antemano. Es mejor aprender estas habilidades ANTES de cualquier procesamiento.`,
  safetyPhoto: `Epilepsia fotosensible: alrededor del 3% de las personas con epilepsia son sensibles al parpadeo (rango peligroso de 3-30 Hz). La diana estándar del EMDR se mueve de forma lenta y suave, por lo que el riesgo en sí es bajo. Aun así, si ha tenido convulsiones, elija el modo de reducción de movimiento o una estimulación no visual (sonido o toques) y evite los presets rápidos y de alto contraste.`,
  openGrounding: "Abrir el arraigo 5-4-3-2-1",
  notStartAlone: "No empezar por cuenta propia",
  contraindications: [
    "Psicosis aguda o manía no controlada",
    "Trastorno disociativo grave (incluido el TID)",
    "Ideación suicida aguda o autolesión",
    "Entorno peligroso o violento en curso",
    "Consumo de sustancias que interfiere con la autorregulación"
  ],
  relabelsTitle: "",
  relabelAs: "Lo que es en realidad:",
  relabels: [
    { original: "Sanación con 528 Hz / Frecuencia de la reparación", verdict: "Pseudociencia. Las frecuencias Solfeggio se idearon mediante numerología en los años setenta, no a partir de la física. El sonido audible no repara el ADN ni las células.", honest: "Tono relajante de 528 Hz: un sonido agradable para muchas personas y útil para meditar. No cura ni repara el ADN." },
    { original: "Ritmos binaurales para dormir", verdict: "Sobrevalorado. Los datos son débiles y contradictorios; la sincronización de las ondas cerebrales no está confirmada (Ingendoh, 2023).", honest: "Sonido de fondo tranquilo para descansar. El efecto es suave e individual; no es un tratamiento del insomnio." },
    { original: "Alternancia de la activación del hemisferio derecho y el izquierdo", verdict: "No confirmado. Los movimientos verticales y las tareas no alternantes funcionan igual.", honest: "Una tarea de doble atención que carga la memoria de trabajo. Es una hipótesis de trabajo, no una activación de los hemisferios." },
    { original: "Frecuencias curativas (marco general)", verdict: "Es pseudocientífico atribuir propiedades terapéuticas a unos Hz concretos; el beneficio procede de la relajación general y del efecto placebo.", honest: "Aquí los sonidos sirven para relajarse y predisponerse, no como un procedimiento médico." }
  ],
  refsTitle: "Fuentes",
  guideImportant: "es una herramienta de autoayuda, no psicoterapia ni un sustituto del profesional. En caso de TEPT, trauma grave, disociación, ideación suicida o psicosis, acuda a un terapeuta EMDR certificado.",

  discTitle1: "Antes de empezar",
  discIntro: "Es una herramienta de autoayuda, no terapia EMDR ni un sustituto del profesional.",
  discBox: "El procesamiento autónomo de recuerdos traumáticos sin un terapeuta formado no ha demostrado ser seguro y puede agravar los síntomas. Utilice la herramienta para el arraigo, el trabajo de recursos y la relajación. El trabajo completo con el trauma lo dirige un terapeuta EMDR certificado.",
  discPhoto: "La estimulación puede provocar reacciones emocionales y corporales. Si ha tenido convulsiones o fotosensibilidad, elija el modo de reducción de movimiento o la estimulación sonora.",
  discTitle2: "Cribado breve",
  discScreenIntro: "Si algo de esto está presente ahora mismo, no empiece por cuenta propia. Acuda a un profesional.",
  discConfirm: "Confirmo: nada de lo enumerado me ocurre ahora mismo, y utilizo la herramienta para el arraigo y la relajación, no para el procesamiento autónomo del trauma.",
  discAccept: "Entiendo y acepto",

  groundBadge: "Arraigo",
  groundTitle: "Vuelva al aquí y ahora",
  groundStopped: "Estimulación detenida. Haga una pausa.",
  breathPhases: ["Inspire", "Retenga", "Espire", "Retenga"],
  boxBreathHint: "Respiración cuadrada: inspire 4, retenga 4, espire 4, retenga 4",
  nameAloud: "Nombre en voz alta",
  grounding5432: [
    "5 objetos que ve",
    "4 objetos que puede tocar",
    "3 sonidos que oye",
    "2 olores que percibe",
    "1 sabor en la boca"
  ],
  groundDone: "Estoy más tranquilo",

  installTitle: "Instalar EMDR",
  installSub: "Para usarlo sin los límites del navegador",
  installIosStep1Pre: "Pulse el botón",
  installShare: "Compartir",
  installIosStep2Pre: "Desplácese y seleccione",
  installIosHome: 'Añadir a la pantalla de inicio',
  installAndroidStep1Pre: "Pulse",
  installMenu: "Menú",
  installAndroidStep2: "Seleccione Instalar o Añadir",
  installThanks: "Entendido, gracias",

  fbTitle: "Comentarios",
  fbContact: "Contactar con el creador",
  fbIntro: "Es una herramienta de autoayuda, no terapia. Sus comentarios me importan para hacerla más clara, honesta y útil. Esto no es una recopilación de datos médicos.",
  fbThanksTitle: "¡Gracias por su opinión!",
  fbThanksSub: "Su opinión es muy importante para el desarrollo de la plataforma.",
  fbHadTherapy: "¿Ha hecho terapia EMDR?",
  fbYes: "Sí",
  fbNo: "No",
  fbVisualRating: "¿Cuánto le gusta el servicio a nivel visual?",
  fbSettingsRating: "¿Qué tan cómodos le resultan ahora los ajustes?",
  fbFeaturesQ: "¿Qué le gustaría añadir?",
  fbFeaturesPh: "Nuevas funciones, presets, sonidos...",
  fbProblemsQ: "¿Con qué problemas se encontró al empezar la terapia EMDR?",
  fbProblemsPh: "Dificultades para encontrar un profesional, miedo, no entender el proceso...",
  fbStopReasonQ: "¿Qué le frena a la hora de empezar la terapia?",
  fbReasonExpensive: "Es demasiado caro",
  fbReasonUnclear: "No está claro cómo empezar",
  fbReasonAfraid: "Tengo miedo del proceso",
  fbReasonOther: "Otro",
  fbOtherPh: "Describa su motivo...",
  fbWhatHelpQ: "¿Qué le ayudaría a empezar esta terapia?",
  fbWhatHelpPh: "Una demo gratuita, más información, garantías...",
  fbSubmit: "Enviar el resultado",
  fbError: "Se ha producido un error al enviar. Por favor, inténtelo de nuevo más tarde.",

  pickTitle: "Elija el idioma",
  pickSub: "El idioma se puede cambiar en los ajustes en cualquier momento",

  sessHost: "Sesión con un profesional",
  sessHostSub: "Usted dirige. El cliente ve la estimulación sin los ajustes.",
  sessCreate: "Crear sesión",
  sessClientLink: "Enlace para el cliente",
  sessCopyLink: "Copiar el enlace",
  sessLive: "Cliente conectado",
  sessConnecting: "Esperando al cliente...",
  sessClientBadge: "La sesión la dirige un profesional",
  sessClientWaiting: "Esperando al responsable. Relájese y respire con calma.",
  sessClientHint: "El profesional controla los ajustes. Usted no tiene que pulsar nada.",
  sessEnd: "Finalizar la sesión",

  navResources: "Recursos y estabilización",
  navJournal: "Diario de sesiones",

  channelsSection: "Canales y accesibilidad",
  blsVolume: "Volumen del estímulo",
  ambientVolumeLabel: "Volumen del ambiente",
  hapticLabel: "Estimulación por vibración",
  hapticDesc: "Vibración alterna del teléfono como canal táctil de EBL",
  hapticUnsupported: "Este dispositivo no admite la vibración",
  visualStim: "Estímulo visual",
  visualStimDesc: "Desactívelo para un modo de audio o táctil: baja visión, mareo por movimiento, condiciones visuales",
  vestibular: "Protección contra el mareo",
  vestibularDesc: "Limita la velocidad y la amplitud si siente náuseas o mareo",

  groundBeforeExit: "Primero arráiguese",
  groundBeforeExitSub: "El malestar sigue siendo alto. Conviene volver a un estado de calma antes de salir.",
  closeAnyway: "Finalizar de todos modos",
  connLost: "Se perdió la conexión con el profesional. La estimulación se ha detenido. Respire con calma y arráiguese si lo necesita.",

  sigOk: "Estoy bien",
  sigPause: "Necesito una pausa",
  sigStop: "Parar",
  sigBadge: "El profesional puede ver su señal",
  sigHeading: "Señal del cliente",
  sigNone: "Sin señales",
  sigOkH: "Cliente: todo bien",
  sigPauseH: "El cliente pide una pausa",
  sigStopH: "El cliente pide PARAR",
  sigClear: "Borrar",

  tpTitle: "Conducción de la sesión",
  tpSub: "Protocolo por fases. Solo para el profesional",
  tpPhaseLabel: "Fase",
  tpTarget: "Diana (imagen o recuerdo)",
  tpNeg: "Creencia negativa (NC)",
  tpPos: "Creencia positiva (PC)",
  tpEmotions: "Emociones",
  tpBody: "Sensaciones corporales, dónde",
  tpSuds: "SUD (0-10)",
  tpVoc: "VOC (1-7)",
  tpVocInit: "VOC inicial",
  tpStartSet: "Iniciar serie",
  tpStopSet: "Parar y preguntar",
  tpNoticePrompt: "¿Qué nota ahora?",
  tpLogObs: "Registrar observación",
  tpObsPh: "En breve: imagen, pensamiento, sensación",
  tpNextSet: "Siguiente serie",
  tpNotes: "Notas del profesional (sin datos personales)",
  tpNotesPh: "Solo observaciones clínicas, sin el nombre del cliente",
  tpSaveSession: "Guardar en el diario",
  tpSaved: "Guardado en el diario",
  tpReset: "Nueva sesión",
  tpSudsTrend: "Evolución del SUD",
  tpSoloLock: "El protocolo completo con desensibilización solo está disponible en una sesión con un profesional. En el modo individual están disponibles la preparación, los ejercicios de recursos y el arraigo.",
  tpHostOnly: "Cree una sesión (panel de la izquierda) para llevar el protocolo con un cliente",

  modeChooseTitle: "¿Cómo va a trabajar?",
  modeChooseSub: "Puede cambiar el modo en cualquier momento desde el menú lateral",
  modeSpecialist: "Para profesional",
  modeSpecialistDesc: "Llevo una sesión con un cliente: creo una sala, envío el enlace, conduzco el protocolo por fases con mediciones de SUD y VOC.",
  modeSelfHelp: "Para autoayuda",
  modeSelfHelpDesc: "Por mi cuenta: estabilización, ejercicios de recursos, arraigo y relajación. Sin procesamiento autónomo del trauma.",
  modeSwitch: "Cambiar de modo",
  modeContinue: "Continuar",
  specIntroTitle: "Cómo llevar una sesión",
  specStep1: "Abra el panel Sesión con un profesional y pulse Crear sesión.",
  specStep2: "Copie el enlace y envíeselo al cliente. Cuando se conecte, aparecerá el estado Cliente conectado.",
  specStep3: "Abra Conducción de la sesión: el protocolo por fases con mediciones de SUD y VOC se desbloquea cuando usted es el responsable.",
  specStartBtn: "Crear sesión",
  selfIntroTitle: "Por dónde empezar",
  selfIntro1: "Empiece por los recursos y la estabilización: lugar seguro, contenedor, respiración.",
  selfIntro2: "En cualquier momento está disponible el botón Parar y arraigar.",
  selfIntro3: "Es una herramienta de autoayuda. El procesamiento del trauma lo dirige un profesional, no una aplicación.",
  selfStartBtn: "Abrir los recursos",

  navOnboarding: "Tutorial",
  tpQuick: "Ajustes rápidos",
  tpLocalMute: "Silencio solo para mí",
  tpLocalMuteHint: "Silencia el audio en su dispositivo. El cliente sigue oyendo el sonido.",

  cueTitle: "Mostrar al cliente",
  cueHint: "Muestra una mecánica de calma en la pantalla del cliente sobre la estimulación.",
  cueButterfly: "Abrazo de la mariposa",
  cueBreathing: "Respiración",
  cueGrounding: "Arraigo",
  cueClear: "Quitar",
  crisisHeading: "Ayuda en crisis",

  close: "Cerrar",
  stepLabel: "Paso",
  ofLabel: "de",

  aboutNav: "Acerca de",
  aboutTitle: "El entrenador EMDR es un proyecto libre",
  aboutDesc: "Úselo gratis. El código es abierto, así que puede desplegar el servicio en su propio servidor.",
  aboutGithub: "Abrir en GitHub",
  aboutDonate: "Apoyar el proyecto",
  aboutContact: "Contactar con el autor",

  cueLightstream: "Flujo de luz",
  cueContent: {
    butterfly: {
      title: "Abrazo de la mariposa",
      steps: [
        "Siéntese cómodamente. Cruce los brazos sobre el pecho, las palmas en los hombros.",
        "Cierre los ojos o baje suavemente la mirada. Una respiración tranquila.",
        "Dese golpecitos lentos en los hombros, uno a la vez: izquierdo, luego derecho.",
        "Respire con calma y de forma constante. Mantenga un ritmo de aproximadamente un golpecito por segundo.",
        "Realice de 20 a 30 golpecitos alternos a un ritmo tranquilo.",
        "Pare. Baje los brazos y haga una respiración profunda."
      ]
    },
    breathing: {
      title: "Respiración cuadrada",
      steps: [
        "Siéntese cómodamente, relaje los hombros. Siga el círculo en la pantalla.",
        "Respire con el círculo: inspire cuando crece, espire cuando se encoge.",
        "Mantenga un ritmo uniforme: inspire 4, retenga 4, espire 4, retenga 4."
      ]
    },
    grounding: {
      title: "Arraigo 5-4-3-2-1",
      steps: [
        "Nombre para sí mismo 5 cosas que ve a su alrededor.",
        "Nombre 4 cosas que puede tocar.",
        "Nombre 3 sonidos que oye.",
        "Nombre 2 olores que percibe.",
        "Nombre 1 sabor que percibe. Haga una respiración tranquila."
      ]
    },
    lightstream: {
      title: "Flujo de luz",
      steps: [
        "Acomódese y cierre los ojos. Tres respiraciones lentas y tranquilas.",
        "Imagine una luz cálida y suave, de cualquier color que le resulte sanador y tranquilo.",
        "Deje que esa luz entre por la parte superior de la cabeza. Sienta un calor suave.",
        "La luz desciende despacio: frente, cara, cuello, hombros. Por donde pasa, la tensión se disuelve.",
        "La luz fluye por el pecho, el vientre, la espalda. Cada espiración trae un poco más de relajación.",
        "Ahora la luz recorre las caderas, las rodillas, las pantorrillas, hacia los pies.",
        "La luz llega a los pies y fluye hacia la tierra, llevándose todo lo que ya no necesita. El cuerpo, ligero y tranquilo."
      ]
    }
  },

  sjBadge: "Diario de sesiones",
  sjTitle: "Historial de sesiones",
  sjSubtitle: "Los registros se guardan solo en este dispositivo",
  sjEmpty: "Aún no hay sesiones guardadas.",
  sjDuration: "Duración",
  sjMode: "Modo",
  sjModeSolo: "individual",
  sjModeHost: "profesional",
  sjModeClient: "cliente",
  sjPhase: "Fase",
  sjSuds: "SUD",
  sjSudsTo: "a",
  sjObservations: "observaciones",
  sjClient: "Código del cliente",
  sjDeleteOne: "Eliminar",
  sjClearAll: "Borrar todo",
  sjClearConfirm: "¿Eliminar de forma permanente todos los registros del diario?",
  sjDownloadJson: "Descargar JSON",
  sjDownloadCsv: "Descargar CSV",
  sjPrivacyTitle: "Privacidad",
  sjPrivacyBody: "Los datos se guardan solo en este dispositivo y están seudonimizados (sin nombres, solo código). Usted es el responsable de los datos. Obtenga el consentimiento antes de registrar.",

  gateBadge: "Antes de empezar",
  gateTitle: "Comprobación rápida",
  gateSub: "Lleva menos de un minuto. Ayuda a confirmar que la herramienta es adecuada para usted ahora mismo.",
  gateScreenTitle: "Marque lo que sea cierto ahora mismo",
  gateScreenIntro: 'Todos los puntos están en "no" por defecto. Marque los que se apliquen a usted en este momento.',
  gateScreenItems: [
    "Sensación de irrealidad o de desconexión de sí mismo o del entorno",
    "Pensamientos agudos de autolesión o suicidio",
    "Psicosis o manía en este momento",
    "Trastorno disociativo grave conocido (diagnosticado)",
    "Bajo el efecto de sustancias que afectan la autorregulación"
  ],
  gateStopTitle: "Ahora lo mejor sería acudir a un profesional",
  gateStopBody: "Uno o más puntos indican que el trabajo de doble atención por cuenta propia no es seguro ahora mismo. No es una crítica, solo una señal: el apoyo profesional sería de ayuda.",
  gateStopHint: "Abra el panel de recursos para encontrar líneas de crisis y contactos de profesionales.",
  gateOpenResources: "Abrir recursos de apoyo",
  gateConsentTitle: "Comprensión y consentimiento",
  gateConsentItems: [
    "Entiendo que es una herramienta de autoayuda, no terapia ni un sustituto del profesional.",
    "Puedo parar en cualquier momento y usaré el arraigo / 5-4-3-2-1 si siento malestar.",
    "Para el procesamiento real del trauma debe estar presente un profesional formado: yo lo uso para el arraigo y la relajación."
  ],
  gateAccept: "Empezar",

  obSkip: "Omitir",
  obDone: "Listo",
  obSpecialist: [
    { title: "Modo profesional", body: "Un recorrido rápido por la interfaz. Usted guía al cliente, la aplicación ofrece la estimulación bilateral." },
    { title: "Sesión con un cliente", body: "Cree una sala y envíe el enlace a su cliente. Cuando se conecte, su pantalla refleja su estimulación sin controles." },
    { title: "Conducción de la sesión", body: "El protocolo de 8 fases, mediciones de SUD y VOC, lanzamiento de series. Ajustes rápidos sobre la marcha, mostrar mecánicas al cliente (mariposa, respiración, arraigo) y silenciar el sonido solo para usted." },
    { title: "Ajustes de la sesión", body: "Patrón de movimiento, velocidad, amplitud, sonido del estímulo y fondo. Cree un preset y comparta un enlace." },
    { title: "Parar y arraigar", body: "Siempre disponible. Detiene la estimulación y ayuda a volver al aquí y ahora. Los contactos de crisis también están aquí." },
    { title: "Diario de sesiones", body: "Historial local: ajustes, series, evolución del SUD. Se guarda solo en su dispositivo, sin nombres." },
    { title: "Cambiar de modo", body: "Cambie entre el modo profesional y el de autoayuda en cualquier momento." },
    { title: "Todo listo", body: "Empiece creando una sesión. Puede repetir este recorrido desde el botón de tutorial del menú." }
  ],
  obSelfhelp: [
    { title: "Modo de autoayuda", body: "Un vistazo rápido a dónde está cada cosa. Es una herramienta de estabilización y calma, no un sustituto de la terapia." },
    { title: "Recursos y estabilización", body: "Lugar seguro, contenedor, flujo de luz, abrazo de la mariposa, respiración. Es seguro practicarlos por cuenta propia." },
    { title: "Ajustes", body: "Patrón de movimiento, velocidad, amplitud, sonido y fondo a su gusto." },
    { title: "Parar y arraigar", body: "Detiene la estimulación en cualquier momento y le ayuda a calmarse con el 5-4-3-2-1 y la respiración." },
    { title: "Todo listo", body: "El procesamiento del trauma lo dirige un profesional, no una aplicación. Puede repetir este recorrido desde el menú." }
  ],

  drawerVisual: "Visual",
  drawerSound: "Sonido",
  drawerChannels: "Canales",
  drawerTiming: "Tiempo",

  previewPaused: "en pausa",
  previewVisualOff: "visual desactivado",

  resNote: "Estabilización",
  resTitle: "Ejercicios de recursos",
  resSubtitle: "Estabilización y arraigo - fase 2 del EMDR",
  resDisclaimer: "Estos ejercicios son de estabilización y arraigo, no de reprocesamiento del trauma. Seguros sin un terapeuta.",
  resBackToList: "Volver a la lista",
  resExercises: {
    safe_place: {
      name: "Lugar seguro o tranquilo",
      tagline: "Visualización guiada de un espacio en calma",
      steps: [
        "Póngase cómodo. Cierre los ojos o baje suavemente la mirada. Haga tres respiraciones lentas y profundas.",
        "Imagine un lugar donde se sienta tranquilo y seguro. Puede ser real o completamente imaginario.",
        "Mire a su alrededor en ese lugar. ¿Qué ve? Fíjese en los colores, la luz, las formas.",
        "Escuche. ¿Qué sonidos hay, o es un lugar silencioso?",
        "Note el aire sobre su piel. La temperatura, quizá un aroma. Sienta el suelo o la superficie bajo usted.",
        "Permítase estar plenamente presente ahí. Sienta cómo su cuerpo se relaja. Recuerde esta sensación.",
        "Póngale un nombre a este lugar: una palabra o una imagen a la que pueda volver cuando quiera. Abra los ojos despacio."
      ]
    },
    container: {
      name: "Contenedor",
      tagline: "Apartar mentalmente el material perturbador",
      steps: [
        "Siéntese cómodamente. Haga unas respiraciones tranquilas. Recuerde: ahora mismo está a salvo.",
        "Imagine un contenedor resistente: una caja fuerte, un cofre, una caja. Algo sólido con una tapa o un cierre seguro.",
        "Examínelo: el material, el tamaño, el cierre o el pestillo. Asegúrese de que se sienta lo bastante firme.",
        "Nombre lo que le inquieta: solo una palabra o una imagen. No se adentre en los detalles.",
        "Imagine que lo coloca dentro del contenedor. Cierre la tapa. Échele el cierre. El contenedor queda seguro.",
        "Coloque el contenedor en algún lugar seguro de su imaginación: en una estantería, en una bóveda. Se quedará ahí.",
        "Respire. Puede volver a este material más adelante, cuando esté preparado, y con apoyo."
      ]
    },
    light_stream: {
      name: "Flujo de luz",
      tagline: "Luz cálida que recorre el cuerpo",
      steps: [
        "Siéntese o recuéstese cómodamente. Cierre los ojos. Tres respiraciones lentas.",
        "Imagine una luz cálida y suave, de cualquier color que le resulte sanador y tranquilo.",
        "Deje que esa luz entre por la parte superior de la cabeza. Sienta un calor suave.",
        "Despacio, la luz desciende: frente, cara, cuello. Por donde pasa la luz, la tensión se disuelve.",
        "La luz fluye por los hombros, los brazos, el pecho. Con cada espiración, un poco más de relajación.",
        "Ahora la luz recorre el vientre, la zona lumbar, las caderas, las rodillas, las pantorrillas.",
        "La luz llega a los pies y fluye hacia la tierra, llevándose todo lo que ya no necesita."
      ]
    },
    butterfly_hug: {
      name: "Abrazo de la mariposa",
      tagline: "Toques alternos sobre uno mismo para autocalmarse",
      steps: [
        "Siéntese erguido. Cruce los brazos sobre el pecho: la mano derecha en el hombro izquierdo, la mano izquierda en el hombro derecho.",
        "Cierre los ojos o baje suavemente la mirada. Haga una respiración profunda.",
        "Siga la animación de abajo. Empiece a dar golpecitos despacio y de forma alterna: primero la mano derecha, luego la izquierda.",
        "Continúe a un ritmo lento, alrededor de uno por segundo. Respire de forma constante y tranquila.",
        "Piense en algo neutro o ligeramente agradable mientras da los golpecitos.",
        "Haga de 20 a 30 golpecitos alternos. Después pare. Haga una respiración profunda.",
        "Baje los brazos. ¿Cómo se siente? Note cualquier cambio en su cuerpo o en su estado de ánimo."
      ]
    }
  }
};
