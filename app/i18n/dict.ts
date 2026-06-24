import type { EvidenceLevel, EvidenceKey } from "../content";

export type Locale = "ru" | "en" | "es" | "it" | "de" | "fr" | "pt";

export interface EvidenceRowT { level: EvidenceLevel; condition: string; note: string }
export interface PhaseT { n: number; name: string; desc: string }
export interface RelabelT { original: string; verdict: string; honest: string }
export interface PresetT { label: string; desc: string }

export interface Dict {
  start: string;
  next: string;
  back: string;
  understand: string;
  contact: string;

  presetApplied: string;
  presetAppliedSub: string;

  navSettings: string;
  navGuide: string;
  navFeedback: string;
  navGrounding: string;
  navExit: string;

  finish: string;
  stopGround: string;
  series: string;

  settingsTitle: string;
  settingsSub: string;
  test: string;
  pause: string;
  programs: string;
  catCalm: string;
  catResource: string;
  catFocus: string;
  catProfiles: string;
  profilesHint: string;
  presets: Record<string, PresetT>;
  patternLabel: string;
  patterns: Record<string, string>;
  shapeLabel: string;
  shapes: Record<string, string>;
  colorLabel: string;
  speedLabel: string;
  amplitudeLabel: string;
  amplitudeHint: string;
  seriesLabel: string;
  sizeLabel: string;
  hzUnit: string;
  cyclesUnit: string;
  pxUnit: string;
  reduceMotion: string;
  reduceMotionDesc: string;
  saccades: string;
  saccadesDesc: string;
  saccadesOffSafe: string;
  cogLoad: string;
  cogLoadDesc: string;
  mute: string;
  muteDesc: string;
  stimSound: string;
  audioFormats: Record<string, string>;
  ambientLabel: string;
  ambientNames: Record<string, string>;
  ambientNote: string;
  bgLabel: string;
  bgNames: Record<string, string>;
  langNames: Record<string, string>;
  sessionsToday: string;
  sharePreset: string;
  linkCopied: string;
  languageSection: string;

  guideTitle: string;
  guideSub: string;
  gWhat: string;
  gHow: string;
  gEvidence: string;
  gProtocol: string;
  gPositioning: string;
  gSafety: string;
  gRelabels: string;
  gRefs: string;
  whatIs: string;
  mechanism: string;
  positioning: string;
  evidenceIntro: string;
  evidence: Record<EvidenceKey, EvidenceRowT>;
  levelLabels: Record<EvidenceLevel, string>;
  protocolIntro: string;
  phases: PhaseT[];
  positioningTitle: string;
  safetyStop: string;
  safetyPhoto: string;
  openGrounding: string;
  notStartAlone: string;
  contraindications: string[];
  relabelsTitle: string;
  relabelAs: string;
  relabels: RelabelT[];
  refsTitle: string;
  guideImportant: string;

  discTitle1: string;
  discIntro: string;
  discBox: string;
  discPhoto: string;
  discTitle2: string;
  discScreenIntro: string;
  discConfirm: string;
  discAccept: string;

  groundBadge: string;
  groundTitle: string;
  groundStopped: string;
  breathPhases: string[];
  boxBreathHint: string;
  nameAloud: string;
  grounding5432: string[];
  groundDone: string;

  installTitle: string;
  installSub: string;
  installIosStep1Pre: string;
  installShare: string;
  installIosStep2Pre: string;
  installIosHome: string;
  installAndroidStep1Pre: string;
  installMenu: string;
  installAndroidStep2: string;
  installThanks: string;

  fbTitle: string;
  fbContact: string;
  fbIntro: string;
  fbThanksTitle: string;
  fbThanksSub: string;
  fbHadTherapy: string;
  fbYes: string;
  fbNo: string;
  fbVisualRating: string;
  fbSettingsRating: string;
  fbFeaturesQ: string;
  fbFeaturesPh: string;
  fbProblemsQ: string;
  fbProblemsPh: string;
  fbStopReasonQ: string;
  fbReasonExpensive: string;
  fbReasonUnclear: string;
  fbReasonAfraid: string;
  fbReasonOther: string;
  fbOtherPh: string;
  fbWhatHelpQ: string;
  fbWhatHelpPh: string;
  fbSubmit: string;
  fbError: string;

  pickTitle: string;
  pickSub: string;

  sessHost: string;
  sessHostSub: string;
  sessCreate: string;
  sessClientLink: string;
  sessCopyLink: string;
  sessLive: string;
  sessConnecting: string;
  sessClientBadge: string;
  sessClientWaiting: string;
  sessClientHint: string;
  sessEnd: string;

  navResources: string;
  navJournal: string;

  channelsSection: string;
  blsVolume: string;
  ambientVolumeLabel: string;
  hapticLabel: string;
  hapticDesc: string;
  hapticUnsupported: string;
  visualStim: string;
  visualStimDesc: string;
  vestibular: string;
  vestibularDesc: string;

  groundBeforeExit: string;
  groundBeforeExitSub: string;
  closeAnyway: string;
  connLost: string;

  sigOk: string;
  sigPause: string;
  sigStop: string;
  sigBadge: string;
  sigHeading: string;
  sigNone: string;
  sigOkH: string;
  sigPauseH: string;
  sigStopH: string;
  sigClear: string;

  tpTitle: string;
  tpSub: string;
  tpPhaseLabel: string;
  tpTarget: string;
  tpNeg: string;
  tpPos: string;
  tpEmotions: string;
  tpBody: string;
  tpSuds: string;
  tpVoc: string;
  tpVocInit: string;
  tpStartSet: string;
  tpStopSet: string;
  tpNoticePrompt: string;
  tpLogObs: string;
  tpObsPh: string;
  tpNextSet: string;
  tpNotes: string;
  tpNotesPh: string;
  tpSaveSession: string;
  tpSaved: string;
  tpReset: string;
  tpSudsTrend: string;
  tpSoloLock: string;
  tpHostOnly: string;

  modeChooseTitle: string;
  modeChooseSub: string;
  modeSpecialist: string;
  modeSpecialistDesc: string;
  modeSelfHelp: string;
  modeSelfHelpDesc: string;
  modeSwitch: string;
  modeContinue: string;
  specIntroTitle: string;
  specStep1: string;
  specStep2: string;
  specStep3: string;
  specStartBtn: string;
  selfIntroTitle: string;
  selfIntro1: string;
  selfIntro2: string;
  selfIntro3: string;
  selfStartBtn: string;

  navOnboarding: string;
  tpQuick: string;
  tpLocalMute: string;
  tpLocalMuteHint: string;

  cueTitle: string;
  cueHint: string;
  cueButterfly: string;
  cueBreathing: string;
  cueGrounding: string;
  cueClear: string;
  crisisHeading: string;
}

export const ru: Dict = {
  start: "Начать",
  next: "Далее",
  back: "Назад",
  understand: "Понимаю и принимаю",
  contact: "Связаться",

  presetApplied: "Конфигурация применена",
  presetAppliedSub: "Параметры из ссылки загружены",

  navSettings: "Настройки сессии",
  navGuide: "Руководство и доказательная база",
  navFeedback: "Обратная связь",
  navGrounding: "Стоп и заземление",
  navExit: "К bananamaster",

  finish: "Завершить",
  stopGround: "Стоп и заземление",
  series: "Серий",

  settingsTitle: "Настройки сессии",
  settingsSub: "Параметры сессии",
  test: "Тест",
  pause: "Пауза",
  programs: "Программы",
  catCalm: "Заземление и тревога",
  catResource: "Ресурс и расслабление",
  catFocus: "Фокус и саморегуляция",
  catProfiles: "Профили стимуляции",
  profilesHint: "Интенсивные профили. Не для самостоятельной переработки травмы, только стиль стимуляции.",
  presets: {
    anxiety: { label: "Заземление", desc: "Медленный, успокаивающий" },
    panic: { label: "При тревоге", desc: "Ритм для собранности" },
    resource: { label: "Безопасное место", desc: "Ресурсирование" },
    focus: { label: "Концентрация", desc: "Точки, белый шум" },
    sleep: { label: "Спокойный фон", desc: "Для отдыха, эффект мягкий" },
    grounding_528: { label: "Тон 528 Гц", desc: "Звук для расслабления, не лечит" },
    adhd_focus: { label: "Собранность", desc: "Ровный ритм для концентрации" },
    adhd_impulse: { label: "Темп", desc: "Активная стимуляция" },
    adhd_calm: { label: "Замедление", desc: "Снижение возбуждения" },
    adhd_body: { label: "Тело", desc: "Внимание на ощущения" },
    trauma_smooth: { label: "Плавный", desc: "Мягкие движения" },
    trauma_deep: { label: "Медленный", desc: "Диагональ, низкая скорость" },
    trauma_saccadic: { label: "Саккадический", desc: "Резкие прыжки, символы" },
    trauma_acute: { label: "Быстрый", desc: "Высокая скорость" },
    trauma_flashback: { label: "Максимум", desc: "Самый интенсивный" }
  },
  patternLabel: "Паттерн",
  patterns: {
    horizontal: "Горизонталь",
    vertical: "Вертикаль",
    "diagonal-1": "Диагональ 1",
    "diagonal-2": "Диагональ 2",
    lemniscate: "Лемниската",
    dots: "Точки",
    pulse: "Пульс",
    bars: "Столбы",
    zigzag: "Зигзаг"
  },
  shapeLabel: "Форма",
  shapes: { circle: "Круг", square: "Квадрат", ring: "Кольцо", butterfly: "Бабочка" },
  colorLabel: "Цвет",
  speedLabel: "Скорость",
  amplitudeLabel: "Размах",
  amplitudeHint: "Дальность движения от центра. 100% почти до краев, 40% ближе к центру.",
  seriesLabel: "Серия",
  sizeLabel: "Размер",
  hzUnit: "Гц",
  cyclesUnit: "цикл.",
  pxUnit: "px",
  reduceMotion: "Снижение движения",
  reduceMotionDesc: "Плавно, без саккад, лимит скорости 1.5 Гц. Для фоточувствительности",
  saccades: "Саккады",
  saccadesDesc: "Резкая смена позиций",
  saccadesOffSafe: " (выкл. в режиме снижения движения)",
  cogLoad: "Когн. нагрузка",
  cogLoadDesc: "Символы на объекте",
  mute: "Без звука",
  muteDesc: "Отключить весь звук",
  stimSound: "Звук стимула",
  audioFormats: {
    continuous: "Мягкий",
    click: "Щелчки",
    metronome: "Метроном",
    white_noise: "Белый шум",
    binaural_beats: "Бинаурал"
  },
  ambientLabel: "Эмбиент",
  ambientNames: {
    none: "Выкл",
    rain: "Дождь",
    ocean: "Волны",
    breath: "Дыхание",
    hz528: "528 Гц",
    wind_harmonics: "Ветер",
    breathform: "Бризформ",
    pink: "Розовый шум",
    brown: "Коричневый шум",
    drone: "Гул"
  },
  ambientNote: "Звуки и тон 528 Гц - для расслабления и настроя, без лечебного эффекта.",
  bgLabel: "Фон",
  bgNames: { black: "Черный", aurora: "Aurora", stars: "Пульс" },
  langNames: { ru: "Рус", en: "Eng", numbers: "123" },
  sessionsToday: "Сессий сегодня",
  sharePreset: "Поделиться пресетом",
  linkCopied: "Ссылка скопирована!",
  languageSection: "Язык",

  guideTitle: "Руководство и доказательная база",
  guideSub: "Честно, со ссылками на исследования",
  gWhat: "Что такое EMDR?",
  gHow: "Как это работает",
  gEvidence: "Доказательная база по состояниям",
  gProtocol: "Стандартный протокол: 8 фаз",
  gPositioning: "Что инструмент может и НЕ может",
  gSafety: "Безопасность: стоп и заземление",
  gRelabels: 'Честно про звуки и "частоты"',
  gRefs: "Источники",
  whatIs: `EMDR (Eye Movement Desensitization and Reprocessing, десенсибилизация и переработка движением глаз) - структурированный метод психотерапии, разработанный Франсин Шапиро в конце 1980-х для работы с последствиями психической травмы. На сессии человек удерживает в сознании травмирующее воспоминание и одновременно выполняет задачу с двойным вниманием: чаще всего следит глазами за движущимся объектом, реже слушает чередующиеся звуки или ощущает поочередные касания. Работа идет по стандартному протоколу из 8 фаз и ведется обученным терапевтом.

При ПТСР EMDR входит в число рекомендованных методов, но без преувеличений. ВОЗ (2013) рекомендует EMDR и травма-фокусированную КПТ как первую линию при ПТСР, оценивая качество данных как низкое-умеренное. NICE (NG116, 2018) рекомендует EMDR взрослым как первую линию с оговорками. ISTSS дает сильную рекомендацию. APA (2017) - условную, ставя EMDR во вторую линию после КПТ. По эффективности при ПТСР метод примерно равен травма-фокусированной КПТ, не выше. За пределами ПТСР доказательства заметно слабее.`,
  mechanism: `Механизм EMDR объясняют двумя моделями, и их важно не путать со статусом "доказано".

Модель адаптивной переработки информации (AIP). Это клиническая, теоретическая рамка, а не подтвержденная нейробиология. Идея: мозг перерабатывает опыт, травма перегружает эту систему, и воспоминание остается "дисфункционально сохраненным"; метод помогает довести переработку до спокойного разрешения. Даже профессиональное сообщество описывает AIP как модель для планирования терапии, а не как установленный механизм.

Гипотеза нагрузки на рабочую память. Лучше всего подтвержденное объяснение для движений глаз. Рабочая память ограничена: если одновременно вспоминать яркий образ и выполнять вторую задачу, они конкурируют за ресурсы, и воспоминание становится менее ярким и менее эмоциональным. Это надежно показано в лаборатории начиная с Andrade, Kavanagh и Baddeley (1997).

Что честно сказать о спорном: вклад самих движений глаз надежен в лаборатории, но в клинике слабее и оспаривается (Lee и Cuijpers 2013; Sack 2016). А вот "билатеральность" как чередование полушарий наукой не подтверждена: вертикальные движения и не-чередующиеся задачи (тэппинг, счет, даже Tetris) работают похоже. Поэтому формулировку про "активацию правого и левого полушарий" мы не используем: действующим фактором, скорее, является общая нагрузка двойного внимания.`,
  positioning: `Это веб-инструмент для самопомощи, а не EMDR-терапия и не замена терапевту.

Честно он может: давать ритмичную визуальную, звуковую или тактильную стимуляцию и таймер серий; помогать осваивать навыки стабилизации (фаза 2) - безопасное место, заземление 5-4-3-2-1, дыхание, контейнирование; служить фоном для расслабления и настройки. При наличии своего терапевта может быть вспомогательным средством между сессиями.

Чего он не делает: он НЕ проводит полноценную переработку травмы. Самостоятельная переработка травматических воспоминаний без обученного специалиста не доказана как эффективная (контролируемых данных по приложениям почти нет) и несет реальные риски: усиление симптомов, ретравматизация, диссоциация, незавершенная переработка, которую некому закрыть. Франсин Шапиро предупреждала, что самостоятельная переработка без должного скрининга может иметь тяжелые последствия. При ПТСР, тяжелой или детской травме, диссоциации, суицидальных мыслях, психозе - только сертифицированный EMDR-терапевт.

Звуки и "частоты" здесь (включая 528 Гц и бинауральные ритмы) - инструменты расслабления, а не лечение. Они не восстанавливают ДНК, не лечат болезни и не заменяют врача.`,
  evidenceIntro: "Руководства (ВОЗ, NICE) рекомендуют EMDR прежде всего при ПТСР. Ниже честная оценка по состояниям.",
  evidence: {
    ptsd: { level: "strong", condition: "ПТСР у взрослых", note: "Единственное состояние с сильной базой и поддержкой руководств: ВОЗ и NICE (первая линия, с оговорками), ISTSS (сильная рекомендация), APA (условно, вторая линия). Примерно равен травма-фокусированной КПТ." },
    phobias: { level: "moderate", condition: "Специфические фобии", note: "Лучшее из не-ПТСР направлений. РКИ показывают значимый эффект до 1 года. В руководствах по фобиям первой линией не закреплен." },
    panic: { level: "emerging", condition: "Паническое расстройство", note: "Мета-анализ показывает снижение симптомов, но РКИ противоречивы; данные ограничены." },
    anxiety: { level: "emerging", condition: "Тревожные расстройства", note: "Один мета-анализ (Yunitri 2020) с эффектом, но малые выборки и без поддержки руководств." },
    depression: { level: "emerging", condition: "Депрессия", note: "Умеренный эффект в мета-анализах, чаще как добавка к лечению; качество исследований невысокое. Руководствами при депрессии не рекомендован." },
    pain: { level: "insufficient", condition: "Хроническая боль", note: "Только пилоты и одно малое РКИ. Надежной базы нет." },
    grief: { level: "insufficient", condition: "Горе и утрата", note: "В основном теория и серии случаев. Не установленный метод лечения." },
    addiction: { level: "insufficient", condition: "Зависимости", note: "Два малых РКИ, сигналы по тяге и сопутствующей травме; доказательства слабые." },
    psychosis: { level: "insufficient", condition: "Психоз и биполярное расстройство", note: "Работает на симптомы травмы, не на основное расстройство. Острый психоз и мания - противопоказание к переработке." },
    adhd: { level: "insufficient", condition: "СДВГ", note: "Прямых РКИ EMDR как лечения СДВГ нет. Заявлять помощь при СДВГ нельзя." },
    sleep: { level: "insufficient", condition: "Нарушения сна", note: "Отдельных РКИ нет; улучшение сна - вторичный эффект лечения ПТСР. Доказательный метод при бессоннице - КПТ-Б (CBT-I)." }
  },
  levelLabels: {
    strong: "Сильные данные",
    moderate: "Умеренные",
    emerging: "Предварительные",
    insufficient: "Недостаточно"
  },
  protocolIntro: "Полный протокол ведет обученный терапевт. Самопомощь уместна только на фазе 2 (стабилизация).",
  phases: [
    { n: 1, name: "Сбор анамнеза и план", desc: "История, оценка готовности, выбор воспоминаний-мишеней и триггеров." },
    { n: 2, name: "Подготовка и стабилизация", desc: "Объяснение метода и навыки саморегуляции: безопасное место, заземление, дыхание, контейнирование. Только здесь уместна самопомощь." },
    { n: 3, name: "Оценка мишени", desc: "Образ, негативное и желаемое позитивное убеждение, эмоции и телесные ощущения; замер по шкалам SUD (0-10) и VOC." },
    { n: 4, name: "Десенсибилизация", desc: "Удержание мишени с сериями стимуляции до снижения дистресса (SUD) к 0-1." },
    { n: 5, name: "Инсталляция", desc: "Закрепление позитивного убеждения вместе с воспоминанием." },
    { n: 6, name: "Сканирование тела", desc: "Поиск остаточного телесного напряжения и доработка при необходимости." },
    { n: 7, name: "Завершение", desc: "Возврат к стабильному состоянию, безопасное место, инструкции между сессиями." },
    { n: 8, name: "Переоценка", desc: "В начале следующей сессии: проверка результата и план дальнейшей работы." }
  ],
  positioningTitle: "",
  safetyStop: `Немедленно остановите стимуляцию, если дистресс становится непереносимым, появилось головокружение или тошнота, ощущение диссоциации (отключения от реальности) или мысли о самоповреждении. Что делать: откройте глаза и осмотритесь; пройдите технику 5-4-3-2-1; квадратное дыхание (вдох 4, задержка 4, выдох 4, задержка 4); вернитесь в заранее установленное безопасное место. Эти навыки лучше освоить ДО любой переработки.`,
  safetyPhoto: `Фотосенситивная эпилепсия: около 3% людей с эпилепсией чувствительны к мельканию (опасный диапазон 3-30 Гц). Стандартная мишень EMDR движется медленно и плавно, поэтому сама по себе риск низкий. Тем не менее, если у вас были судороги, выберите режим снижения движения или не-визуальную стимуляцию (звук или касания) и избегайте быстрых высококонтрастных пресетов.`,
  openGrounding: "Открыть заземление 5-4-3-2-1",
  notStartAlone: "Не начинать самостоятельно",
  contraindications: [
    "Острый психоз или неконтролируемая мания",
    "Тяжелое диссоциативное расстройство (в т.ч. ДРИ)",
    "Острые суицидальные мысли или самоповреждение",
    "Продолжающаяся опасная или насильственная среда",
    "Употребление ПАВ, мешающее саморегуляции"
  ],
  relabelsTitle: "",
  relabelAs: "Как есть:",
  relabels: [
    { original: "Исцеление 528 Гц / Частота восстановления", verdict: "Псевдонаука. Solfeggio-частоты придуманы через нумерологию в 1970-х, не из физики. Слышимый звук не восстанавливает ДНК или клетки.", honest: "Расслабляющий тон 528 Гц: приятный многим звук для медитации. Не лечит и не восстанавливает ДНК." },
    { original: "Бинауральные ритмы для сна", verdict: "Переоценено. Данные слабые и противоречивые; синхронизация мозговых волн не подтверждена (Ingendoh 2023).", honest: "Спокойный фоновый звук для отдыха. Эффект мягкий и индивидуальный; это не лечение бессонницы." },
    { original: "Чередование активации правого и левого полушарий", verdict: "Не подтверждено. Вертикальные движения и не-чередующиеся задачи работают так же.", honest: "Задача с двойным вниманием, нагружающая рабочую память. Это рабочая гипотеза, а не активация полушарий." },
    { original: "Целебные частоты (общая рамка)", verdict: "Псевдонаучно приписывать конкретным Гц лечебные свойства; польза - от общего расслабления и плацебо.", honest: "Звуки здесь нужны для расслабления и настроя, а не как медицинская процедура." }
  ],
  refsTitle: "Источники",
  guideImportant: "это инструмент самопомощи, а не психотерапия и не замена специалисту. При ПТСР, тяжелой травме, диссоциации, суицидальных мыслях или психозе обратитесь к сертифицированному EMDR-терапевту.",

  discTitle1: "Прежде чем начать",
  discIntro: "Это инструмент самопомощи, а не EMDR-терапия и не замена специалисту.",
  discBox: "Самостоятельная переработка травматических воспоминаний без обученного терапевта не доказана как безопасная и может усилить симптомы. Используйте инструмент для заземления, ресурсирования и расслабления. Полноценную работу с травмой ведет сертифицированный EMDR-терапевт.",
  discPhoto: "Стимуляция может вызывать эмоциональные и телесные реакции. Если были судороги или фоточувствительность, выберите режим снижения движения или звуковую стимуляцию.",
  discTitle2: "Короткий скрининг",
  discScreenIntro: "Если что-то из этого есть прямо сейчас, не начинайте самостоятельно. Обратитесь к специалисту.",
  discConfirm: "Подтверждаю: ничего из перечисленного у меня нет прямо сейчас, и я использую инструмент для заземления и расслабления, а не для самостоятельной переработки травмы.",
  discAccept: "Понимаю и принимаю",

  groundBadge: "Заземление",
  groundTitle: "Вернитесь в здесь и сейчас",
  groundStopped: "Стимуляция остановлена. Сделайте паузу.",
  breathPhases: ["Вдох", "Задержка", "Выдох", "Задержка"],
  boxBreathHint: "Квадратное дыхание: вдох 4, задержка 4, выдох 4, задержка 4",
  nameAloud: "Назовите вслух",
  grounding5432: [
    "5 предметов, которые вы видите",
    "4 предмета, которые можете потрогать",
    "3 звука, которые слышите",
    "2 запаха, которые ощущаете",
    "1 вкус во рту"
  ],
  groundDone: "Мне спокойнее",

  installTitle: "Установить EMDR",
  installSub: "Для работы без границ браузера",
  installIosStep1Pre: "Нажмите кнопку",
  installShare: "Поделиться",
  installIosStep2Pre: "Прокрутите и выберите",
  installIosHome: 'На экран "Домой"',
  installAndroidStep1Pre: "Нажмите",
  installMenu: "Меню",
  installAndroidStep2: "Выберите Установить или Добавить",
  installThanks: "Понятно, спасибо",

  fbTitle: "Обратная связь",
  fbContact: "Связаться с создателем",
  fbIntro: "Это инструмент самопомощи, а не терапия. Мне важна ваша обратная связь, чтобы сделать его понятнее, честнее и полезнее. Это не сбор медицинских данных.",
  fbThanksTitle: "Спасибо за ваш отзыв!",
  fbThanksSub: "Ваше мнение очень важно для развития платформы.",
  fbHadTherapy: "Проходили ли вы терапию EMDR?",
  fbYes: "Да",
  fbNo: "Нет",
  fbVisualRating: "Насколько визуально вам нравится сервис?",
  fbSettingsRating: "Насколько удобно сейчас реализованы настройки?",
  fbFeaturesQ: "Что бы вам хотелось добавить?",
  fbFeaturesPh: "Новые функции, пресеты, звуки...",
  fbProblemsQ: "С какими проблемами вы сталкивались в начале терапии EMDR?",
  fbProblemsPh: "Сложности с поиском специалиста, страх, непонимание процесса...",
  fbStopReasonQ: "Что вас останавливает от начала терапии?",
  fbReasonExpensive: "Это слишком дорого",
  fbReasonUnclear: "Непонятно как начать",
  fbReasonAfraid: "Боюсь процесса",
  fbReasonOther: "Другое",
  fbOtherPh: "Опишите вашу причину...",
  fbWhatHelpQ: "Что помогло бы вам начать такую терапию?",
  fbWhatHelpPh: "Бесплатное демо, больше информации, гарантии...",
  fbSubmit: "Отправить результат",
  fbError: "Произошла ошибка при отправке. Пожалуйста, попробуйте позже.",

  pickTitle: "Выберите язык",
  pickSub: "Язык можно сменить в настройках в любой момент",

  sessHost: "Сессия со специалистом",
  sessHostSub: "Вы ведущий. Клиент видит стимуляцию без настроек.",
  sessCreate: "Создать сессию",
  sessClientLink: "Ссылка для клиента",
  sessCopyLink: "Скопировать ссылку",
  sessLive: "Клиент подключен",
  sessConnecting: "Ожидание клиента...",
  sessClientBadge: "Сеанс ведет специалист",
  sessClientWaiting: "Ожидание ведущего. Расслабьтесь и дышите ровно.",
  sessClientHint: "Настройками управляет специалист. Вам ничего не нужно нажимать.",
  sessEnd: "Завершить сессию",

  navResources: "Ресурсы и стабилизация",
  navJournal: "Журнал сессий",

  channelsSection: "Каналы и доступность",
  blsVolume: "Громкость стимула",
  ambientVolumeLabel: "Громкость фона",
  hapticLabel: "Вибро-стимуляция",
  hapticDesc: "Попеременная вибрация телефона как тактильный канал БЛС",
  hapticUnsupported: "Вибрация не поддерживается этим устройством",
  visualStim: "Визуальный стимул",
  visualStimDesc: "Выключите для аудио/тактильного режима: слабое зрение, укачивание, особенности зрения",
  vestibular: "Защита от укачивания",
  vestibularDesc: "Ограничивает скорость и размах при тошноте или головокружении",

  groundBeforeExit: "Сначала заземлитесь",
  groundBeforeExitSub: "Уровень дистресса еще высокий. Перед выходом стоит вернуться в спокойное состояние.",
  closeAnyway: "Все равно завершить",
  connLost: "Связь со специалистом прервалась. Стимуляция остановлена. Дышите ровно, при необходимости заземлитесь.",

  sigOk: "Все хорошо",
  sigPause: "Нужна пауза",
  sigStop: "Стоп",
  sigBadge: "Ваш сигнал виден специалисту",
  sigHeading: "Сигнал клиента",
  sigNone: "Сигналов нет",
  sigOkH: "Клиент: все хорошо",
  sigPauseH: "Клиент просит паузу",
  sigStopH: "Клиент просит СТОП",
  sigClear: "Сбросить",

  tpTitle: "Ведение сессии",
  tpSub: "Протокол по фазам. Только для специалиста",
  tpPhaseLabel: "Фаза",
  tpTarget: "Мишень (образ или воспоминание)",
  tpNeg: "Негативное убеждение (NC)",
  tpPos: "Позитивное убеждение (PC)",
  tpEmotions: "Эмоции",
  tpBody: "Телесные ощущения, где",
  tpSuds: "SUD (0-10)",
  tpVoc: "VOC (1-7)",
  tpVocInit: "VOC начальный",
  tpStartSet: "Запустить сет",
  tpStopSet: "Остановить и спросить",
  tpNoticePrompt: "Что ты сейчас замечаешь?",
  tpLogObs: "Записать наблюдение",
  tpObsPh: "Кратко: образ, мысль, ощущение",
  tpNextSet: "Следующий сет",
  tpNotes: "Заметки специалиста (без персональных данных)",
  tpNotesPh: "Только клинические наблюдения, без имени клиента",
  tpSaveSession: "Сохранить в журнал",
  tpSaved: "Сохранено в журнал",
  tpReset: "Новая сессия",
  tpSudsTrend: "Динамика SUD",
  tpSoloLock: "Полный протокол с десенсибилизацией доступен только в режиме сессии со специалистом. В одиночку доступны подготовка, ресурсные упражнения и заземление.",
  tpHostOnly: "Создайте сессию (панель слева), чтобы вести протокол с клиентом",

  modeChooseTitle: "Как вы будете работать?",
  modeChooseSub: "Режим можно сменить в любой момент в боковом меню",
  modeSpecialist: "Для специалиста",
  modeSpecialistDesc: "Веду сессию с клиентом: создаю комнату, отправляю ссылку, провожу протокол по фазам с замерами SUD и VOC.",
  modeSelfHelp: "Для самопомощи",
  modeSelfHelpDesc: "Сам для себя: стабилизация, ресурсные упражнения, заземление и расслабление. Без самостоятельной переработки травмы.",
  modeSwitch: "Сменить режим",
  modeContinue: "Продолжить",
  specIntroTitle: "Как провести сессию",
  specStep1: "Откройте панель Сессия со специалистом и нажмите Создать сессию.",
  specStep2: "Скопируйте ссылку и отправьте ее клиенту. Когда он подключится, появится статус Клиент подключен.",
  specStep3: "Откройте Ведение сессии: протокол по фазам с замерами SUD и VOC разблокируется, когда вы стали ведущим.",
  specStartBtn: "Создать сессию",
  selfIntroTitle: "С чего начать",
  selfIntro1: "Начните с ресурсов и стабилизации: безопасное место, контейнер, дыхание.",
  selfIntro2: "В любой момент доступна кнопка Стоп и заземление.",
  selfIntro3: "Это инструмент самопомощи. Переработку травмы ведет специалист, а не приложение.",
  selfStartBtn: "Открыть ресурсы",

  navOnboarding: "Обучение",
  tpQuick: "Быстрые настройки",
  tpLocalMute: "Звук только у меня",
  tpLocalMuteHint: "Заглушить звук на вашем устройстве. У клиента звук продолжает воспроизводиться.",

  cueTitle: "Показать клиенту",
  cueHint: "Выводит спокойную механику на экран клиента поверх стимуляции.",
  cueButterfly: "Бабочка",
  cueBreathing: "Дыхание",
  cueGrounding: "Заземление",
  cueClear: "Убрать",
  crisisHeading: "Кризисная помощь"
};
