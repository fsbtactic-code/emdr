import type { Dict } from "./dict";

export const pt: Partial<Dict> = {
  start: "Iniciar",
  next: "Avançar",
  back: "Voltar",
  understand: "Entendo e aceito",
  contact: "Entrar em contato",

  presetApplied: "Configuração aplicada",
  presetAppliedSub: "Os parâmetros do link foram carregados",

  navSettings: "Configurações da sessão",
  navGuide: "Guia e base de evidências",
  navFeedback: "Feedback",
  navGrounding: "Parar e se aterrar",
  navExit: "Para o bananamaster",

  finish: "Encerrar",
  stopGround: "Parar e se aterrar",
  series: "Séries",

  settingsTitle: "Configurações da sessão",
  settingsSub: "Parâmetros da sessão",
  test: "Teste",
  pause: "Pausa",
  programs: "Programas",
  catCalm: "Aterramento e ansiedade",
  catResource: "Recurso e relaxamento",
  catFocus: "Foco e autorregulação",
  catProfiles: "Perfis de estimulação",
  profilesHint: "Perfis intensos. Não servem para o processamento autônomo do trauma, apenas definem o estilo de estimulação.",
  presets: {
    anxiety: { label: "Aterramento", desc: "Lento, calmante" },
    panic: { label: "Para a ansiedade", desc: "Ritmo para se concentrar" },
    resource: { label: "Lugar seguro", desc: "Construção de recursos" },
    focus: { label: "Concentração", desc: "Pontos, ruído branco" },
    sleep: { label: "Fundo tranquilo", desc: "Para descansar, efeito suave" },
    grounding_528: { label: "Tom 528 Hz", desc: "Som para relaxar, não cura" },
    adhd_focus: { label: "Concentração", desc: "Ritmo uniforme para concentrar" },
    adhd_impulse: { label: "Ritmo", desc: "Estimulação ativa" },
    adhd_calm: { label: "Desaceleração", desc: "Redução da excitação" },
    adhd_body: { label: "Corpo", desc: "Atenção às sensações" },
    trauma_smooth: { label: "Suave", desc: "Movimentos suaves" },
    trauma_deep: { label: "Lento", desc: "Diagonal, baixa velocidade" },
    trauma_saccadic: { label: "Sacádico", desc: "Saltos bruscos, símbolos" },
    trauma_acute: { label: "Rápido", desc: "Alta velocidade" },
    trauma_flashback: { label: "Máximo", desc: "O mais intenso" }
  },
  patternLabel: "Padrão",
  patterns: {
    horizontal: "Horizontal",
    vertical: "Vertical",
    "diagonal-1": "Diagonal 1",
    "diagonal-2": "Diagonal 2",
    lemniscate: "Lemniscata",
    dots: "Pontos",
    pulse: "Pulso",
    bars: "Barras",
    zigzag: "Ziguezague"
  },
  shapeLabel: "Forma",
  shapes: { circle: "Círculo", square: "Quadrado", ring: "Anel", butterfly: "Borboleta" },
  colorLabel: "Cor",
  speedLabel: "Velocidade",
  amplitudeLabel: "Amplitude",
  amplitudeHint: "Distância do movimento a partir do centro. 100% quase até as bordas, 40% mais perto do centro.",
  seriesLabel: "Série",
  sizeLabel: "Tamanho",
  hzUnit: "Hz",
  cyclesUnit: "ciclos",
  pxUnit: "px",
  reduceMotion: "Redução de movimento",
  reduceMotionDesc: "Suave, sem sacadas, limite de velocidade de 1.5 Hz. Para fotossensibilidade",
  saccades: "Sacadas",
  saccadesDesc: "Mudança brusca de posição",
  saccadesOffSafe: " (desativado no modo de redução de movimento)",
  cogLoad: "Carga cogn.",
  cogLoadDesc: "Símbolos no objeto",
  mute: "Sem som",
  muteDesc: "Desligar todo o som",
  stimSound: "Som do estímulo",
  audioFormats: {
    continuous: "Suave",
    click: "Cliques",
    metronome: "Metrônomo",
    white_noise: "Ruído branco",
    binaural_beats: "Binaural"
  },
  ambientLabel: "Ambiente",
  ambientNames: {
    none: "Desativado",
    rain: "Chuva",
    ocean: "Ondas",
    breath: "Respiração",
    hz528: "528 Hz",
    wind_harmonics: "Vento",
    breathform: "Breathform",
    pink: "Ruído rosa",
    brown: "Ruído marrom",
    drone: "Drone"
  },
  ambientNote: "Os sons e o tom de 528 Hz servem para relaxar e se preparar, sem efeito terapêutico.",
  bgLabel: "Fundo",
  bgNames: { black: "Preto", aurora: "Aurora", stars: "Pulso" },
  langNames: { ru: "Cir", en: "Lat", numbers: "123" },
  sessionsToday: "Sessões hoje",
  sharePreset: "Compartilhar predefinição",
  linkCopied: "Link copiado!",
  languageSection: "Idioma",

  guideTitle: "Guia e base de evidências",
  guideSub: "Com honestidade e com referências a estudos",
  gWhat: "O que é EMDR?",
  gHow: "Como funciona",
  gEvidence: "Base de evidências por condição",
  gProtocol: "Protocolo padrão: 8 fases",
  gPositioning: "O que a ferramenta pode e NÃO pode fazer",
  gSafety: "Segurança: parar e se aterrar",
  gRelabels: 'Com honestidade sobre sons e "frequências"',
  gRefs: "Fontes",
  whatIs: `EMDR (Eye Movement Desensitization and Reprocessing, dessensibilização e reprocessamento por movimentos oculares) é um método estruturado de psicoterapia, desenvolvido por Francine Shapiro no final dos anos 1980 para trabalhar as consequências do trauma psíquico. Na sessão, a pessoa mantém na mente uma lembrança traumática e, ao mesmo tempo, executa uma tarefa de dupla atenção: na maioria das vezes acompanha com os olhos um objeto em movimento, mais raramente escuta sons alternados ou sente toques alternados. O trabalho segue um protocolo padrão de 8 fases e é conduzido por um terapeuta treinado.

No TEPT, o EMDR está entre os métodos recomendados, mas sem exageros. A OMS (2013) recomenda o EMDR e a TCC focada no trauma como primeira linha no TEPT, avaliando a qualidade das evidências como baixa a moderada. O NICE (NG116, 2018) recomenda o EMDR para adultos como primeira linha, com ressalvas. A ISTSS dá uma recomendação forte. A APA (2017) dá uma recomendação condicional, colocando o EMDR em segunda linha, depois da TCC. Em termos de eficácia no TEPT, o método é aproximadamente equivalente à TCC focada no trauma, não superior. Fora do TEPT, as evidências são consideravelmente mais fracas.`,
  mechanism: `O mecanismo do EMDR é explicado por dois modelos, e é importante não confundi-los com algo "comprovado".

Modelo de processamento adaptativo da informação (AIP). Trata-se de um arcabouço clínico e teórico, não de uma neurobiologia confirmada. A ideia: o cérebro processa as experiências, o trauma sobrecarrega esse sistema e a lembrança permanece "armazenada de forma disfuncional"; o método ajuda a levar esse processamento a uma resolução tranquila. A própria comunidade profissional descreve o AIP como um modelo para o planejamento da terapia, e não como um mecanismo estabelecido.

Hipótese da carga sobre a memória de trabalho. É a explicação mais bem fundamentada para os movimentos oculares. A memória de trabalho é limitada: se você evoca uma imagem vívida e executa uma segunda tarefa ao mesmo tempo, elas competem por recursos, e a lembrança fica menos vívida e menos emocional. Isso foi demonstrado de forma consistente em laboratório a partir de Andrade, Kavanagh e Baddeley (1997).

O que é honesto dizer sobre o que é controverso: a contribuição dos próprios movimentos oculares é consistente em laboratório, mas na clínica é mais fraca e contestada (Lee e Cuijpers 2013; Sack 2016). Já a "bilateralidade" como alternância entre os hemisférios não é confirmada pela ciência: movimentos verticais e tarefas não alternadas (tapping, contagem, até mesmo Tetris) funcionam de forma semelhante. Por isso não usamos a formulação sobre a "ativação dos hemisférios direito e esquerdo": o fator atuante é, mais provavelmente, a carga geral da dupla atenção.`,
  positioning: `Esta é uma ferramenta web de autoajuda, não uma terapia EMDR e não uma substituta do terapeuta.

Com honestidade, ela pode: oferecer estimulação visual, sonora ou tátil rítmica e um cronômetro de séries; ajudar a aprender habilidades de estabilização (fase 2): lugar seguro, aterramento 5-4-3-2-1, respiração, contenção; servir de pano de fundo para relaxamento e preparação. Se você tem o seu próprio terapeuta, pode ser um recurso auxiliar entre as sessões.

O que ela não faz: ela NÃO realiza um processamento completo do trauma. O processamento autônomo de lembranças traumáticas sem um especialista treinado não tem eficácia comprovada (quase não há dados controlados sobre aplicativos) e traz riscos reais: agravamento dos sintomas, retraumatização, dissociação, processamento inacabado que ninguém poderá encerrar. Francine Shapiro alertava que o processamento autônomo sem a devida triagem pode ter consequências graves. No TEPT, no trauma grave ou infantil, na dissociação, em pensamentos suicidas, na psicose: somente um terapeuta EMDR certificado.

Os sons e as "frequências" aqui (incluindo 528 Hz e batimentos binaurais) são ferramentas de relaxamento, não tratamento. Eles não restauram o DNA, não curam doenças e não substituem o médico.`,
  evidenceIntro: "As diretrizes (OMS, NICE) recomendam o EMDR sobretudo no TEPT. Abaixo, uma avaliação honesta por condição.",
  evidence: {
    ptsd: { level: "strong", condition: "TEPT em adultos", note: "A única condição com base sólida e apoio das diretrizes: OMS e NICE (primeira linha, com ressalvas), ISTSS (recomendação forte), APA (condicional, segunda linha). Aproximadamente equivalente à TCC focada no trauma." },
    phobias: { level: "moderate", condition: "Fobias específicas", note: "O melhor entre as áreas fora do TEPT. ECRs mostram efeito significativo por até 1 ano. Não está consagrado como primeira linha nas diretrizes sobre fobias." },
    panic: { level: "emerging", condition: "Transtorno de pânico", note: "A metanálise mostra redução dos sintomas, mas os ECRs são contraditórios; os dados são limitados." },
    anxiety: { level: "emerging", condition: "Transtornos de ansiedade", note: "Uma metanálise (Yunitri 2020) mostra efeito, mas com amostras pequenas e sem apoio das diretrizes." },
    depression: { level: "emerging", condition: "Depressão", note: "Efeito moderado nas metanálises, mais frequentemente como complemento ao tratamento; a qualidade dos estudos é baixa. Não recomendado pelas diretrizes na depressão." },
    pain: { level: "insufficient", condition: "Dor crônica", note: "Apenas estudos-piloto e um pequeno ECR. Não há uma base confiável." },
    grief: { level: "insufficient", condition: "Luto e perda", note: "Em sua maior parte, teoria e séries de casos. Não é um método de tratamento estabelecido." },
    addiction: { level: "insufficient", condition: "Dependências", note: "Dois pequenos ECRs, com sinais relativos à fissura (craving) e ao trauma associado; as evidências são fracas." },
    psychosis: { level: "insufficient", condition: "Psicose e transtorno bipolar", note: "Atua sobre os sintomas do trauma, não sobre o transtorno de base. Psicose aguda e mania são contraindicação ao processamento." },
    adhd: { level: "insufficient", condition: "TDAH", note: "Não há ECRs diretos do EMDR como tratamento do TDAH. Não se pode alegar que ajuda no TDAH." },
    sleep: { level: "insufficient", condition: "Distúrbios do sono", note: "Não há ECRs específicos; a melhora do sono é um efeito secundário do tratamento do TEPT. O método baseado em evidências para a insônia é a TCC-I (CBT-I)." }
  },
  levelLabels: {
    strong: "Evidências fortes",
    moderate: "Moderadas",
    emerging: "Preliminares",
    insufficient: "Insuficientes"
  },
  protocolIntro: "O protocolo completo é conduzido por um terapeuta treinado. A autoajuda cabe apenas na fase 2 (estabilização).",
  phases: [
    { n: 1, name: "Coleta da história e plano", desc: "História, avaliação do preparo, escolha das lembranças-alvo e dos gatilhos." },
    { n: 2, name: "Preparação e estabilização", desc: "Explicação do método e habilidades de autorregulação: lugar seguro, aterramento, respiração, contenção. Somente aqui a autoajuda cabe." },
    { n: 3, name: "Avaliação do alvo", desc: "Imagem, crença negativa e crença positiva desejada, emoções e sensações corporais; medição pelas escalas SUD (0-10) e VOC." },
    { n: 4, name: "Dessensibilização", desc: "Manutenção do alvo com séries de estimulação até a redução do sofrimento (SUD) para 0-1." },
    { n: 5, name: "Instalação", desc: "Fixação da crença positiva junto com a lembrança." },
    { n: 6, name: "Escaneamento corporal", desc: "Busca de tensão corporal residual e ajuste adicional, se necessário." },
    { n: 7, name: "Encerramento", desc: "Retorno a um estado estável, lugar seguro, instruções entre as sessões." },
    { n: 8, name: "Reavaliação", desc: "No início da sessão seguinte: verificação do resultado e plano do trabalho posterior." }
  ],
  positioningTitle: "",
  safetyStop: `Pare a estimulação imediatamente se o sofrimento se tornar insuportável, se surgir tontura ou náusea, uma sensação de dissociação (desconexão da realidade) ou pensamentos de autolesão. O que fazer: abra os olhos e olhe ao redor; faça a técnica 5-4-3-2-1; respiração quadrada (inspire 4, segure 4, expire 4, segure 4); volte ao lugar seguro previamente estabelecido. É melhor aprender essas habilidades ANTES de qualquer processamento.`,
  safetyPhoto: `Epilepsia fotossensível: cerca de 3% das pessoas com epilepsia são sensíveis à cintilação (faixa perigosa de 3-30 Hz). O alvo padrão do EMDR se move de forma lenta e suave, por isso, em si, o risco é baixo. Ainda assim, se você já teve convulsões, escolha o modo de redução de movimento ou uma estimulação não visual (som ou toques) e evite predefinições rápidas e de alto contraste.`,
  openGrounding: "Abrir aterramento 5-4-3-2-1",
  notStartAlone: "Não começar sozinho",
  contraindications: [
    "Psicose aguda ou mania não controlada",
    "Transtorno dissociativo grave (inclusive TDID)",
    "Pensamentos suicidas agudos ou autolesão",
    "Ambiente perigoso ou violento em curso",
    "Uso de substâncias psicoativas que prejudica a autorregulação"
  ],
  relabelsTitle: "",
  relabelAs: "Como de fato é:",
  relabels: [
    { original: "Cura 528 Hz / Frequência de restauração", verdict: "Pseudociência. As frequências Solfeggio foram inventadas por meio da numerologia nos anos 1970, não a partir da física. O som audível não restaura o DNA nem as células.", honest: "Tom relaxante de 528 Hz: um som agradável para muitos, usado em meditação. Não cura nem restaura o DNA." },
    { original: "Batimentos binaurais para dormir", verdict: "Superestimado. Os dados são fracos e contraditórios; a sincronização das ondas cerebrais não é confirmada (Ingendoh 2023).", honest: "Som de fundo tranquilo para descansar. O efeito é suave e individual; não é um tratamento para a insônia." },
    { original: "Alternância da ativação dos hemisférios direito e esquerdo", verdict: "Não confirmado. Movimentos verticais e tarefas não alternadas funcionam da mesma forma.", honest: "Uma tarefa de dupla atenção que sobrecarrega a memória de trabalho. É uma hipótese de trabalho, não a ativação dos hemisférios." },
    { original: "Frequências curativas (arcabouço geral)", verdict: "É pseudocientífico atribuir propriedades curativas a Hz específicos; o benefício vem do relaxamento geral e do efeito placebo.", honest: "Os sons aqui servem para relaxar e se preparar, não como um procedimento médico." }
  ],
  refsTitle: "Fontes",
  guideImportant: "esta é uma ferramenta de autoajuda, não uma psicoterapia e não uma substituta do especialista. No TEPT, no trauma grave, na dissociação, em pensamentos suicidas ou na psicose, procure um terapeuta EMDR certificado.",

  discTitle1: "Antes de começar",
  discIntro: "Esta é uma ferramenta de autoajuda, não uma terapia EMDR e não uma substituta do especialista.",
  discBox: "O processamento autônomo de lembranças traumáticas sem um terapeuta treinado não tem segurança comprovada e pode agravar os sintomas. Use a ferramenta para aterramento, construção de recursos e relaxamento. O trabalho completo com o trauma é conduzido por um terapeuta EMDR certificado.",
  discPhoto: "A estimulação pode provocar reações emocionais e corporais. Se você já teve convulsões ou fotossensibilidade, escolha o modo de redução de movimento ou a estimulação sonora.",
  discTitle2: "Triagem breve",
  discScreenIntro: "Se algo disto estiver presente agora mesmo, não comece sozinho. Procure um especialista.",
  discConfirm: "Confirmo: nada do que foi listado está presente em mim agora mesmo, e eu uso a ferramenta para aterramento e relaxamento, não para o processamento autônomo do trauma.",
  discAccept: "Entendo e aceito",

  groundBadge: "Aterramento",
  groundTitle: "Volte para o aqui e agora",
  groundStopped: "A estimulação foi interrompida. Faça uma pausa.",
  breathPhases: ["Inspire", "Segure", "Expire", "Segure"],
  boxBreathHint: "Respiração quadrada: inspire 4, segure 4, expire 4, segure 4",
  nameAloud: "Diga em voz alta",
  grounding5432: [
    "5 objetos que você vê",
    "4 objetos que você pode tocar",
    "3 sons que você ouve",
    "2 cheiros que você sente",
    "1 sabor na boca"
  ],
  groundDone: "Estou mais calmo",

  installTitle: "Instalar o EMDR",
  installSub: "Para usar sem os limites do navegador",
  installIosStep1Pre: "Toque no botão",
  installShare: "Compartilhar",
  installIosStep2Pre: "Role e selecione",
  installIosHome: "Adicionar à Tela de Início",
  installAndroidStep1Pre: "Toque em",
  installMenu: "Menu",
  installAndroidStep2: "Selecione Instalar ou Adicionar",
  installThanks: "Entendi, obrigado",

  fbTitle: "Feedback",
  fbContact: "Entrar em contato com o criador",
  fbIntro: "Esta é uma ferramenta de autoajuda, não uma terapia. O seu feedback é importante para mim, para torná-la mais clara, mais honesta e mais útil. Isto não é uma coleta de dados médicos.",
  fbThanksTitle: "Obrigado pelo seu feedback!",
  fbThanksSub: "A sua opinião é muito importante para o desenvolvimento da plataforma.",
  fbHadTherapy: "Você fez terapia EMDR?",
  fbYes: "Sim",
  fbNo: "Não",
  fbVisualRating: "O quanto você gosta visualmente do serviço?",
  fbSettingsRating: "O quanto as configurações estão práticas no momento?",
  fbFeaturesQ: "O que você gostaria de adicionar?",
  fbFeaturesPh: "Novas funções, predefinições, sons...",
  fbProblemsQ: "Com quais problemas você se deparou no início da terapia EMDR?",
  fbProblemsPh: "Dificuldades para encontrar um especialista, medo, incompreensão do processo...",
  fbStopReasonQ: "O que impede você de começar a terapia?",
  fbReasonExpensive: "É caro demais",
  fbReasonUnclear: "Não está claro como começar",
  fbReasonAfraid: "Tenho medo do processo",
  fbReasonOther: "Outro",
  fbOtherPh: "Descreva o seu motivo...",
  fbWhatHelpQ: "O que ajudaria você a começar uma terapia dessas?",
  fbWhatHelpPh: "Demonstração gratuita, mais informações, garantias...",
  fbSubmit: "Enviar o resultado",
  fbError: "Ocorreu um erro ao enviar. Por favor, tente novamente mais tarde.",

  pickTitle: "Escolha o idioma",
  pickSub: "Você pode mudar o idioma nas configurações a qualquer momento",

  sessHost: "Sessão com especialista",
  sessHostSub: "Você é o condutor. O cliente vê a estimulação sem as configurações.",
  sessCreate: "Criar sessão",
  sessClientLink: "Link para o cliente",
  sessCopyLink: "Copiar o link",
  sessLive: "Cliente conectado",
  sessConnecting: "Aguardando o cliente...",
  sessClientBadge: "A sessão é conduzida por um especialista",
  sessClientWaiting: "Aguardando o condutor. Relaxe e respire com calma.",
  sessClientHint: "As configurações são controladas pelo especialista. Você não precisa apertar nada.",
  sessEnd: "Encerrar a sessão",

  navResources: "Recursos e estabilização",
  navJournal: "Diário de sessões",

  channelsSection: "Canais e acessibilidade",
  blsVolume: "Volume do estímulo",
  ambientVolumeLabel: "Volume do ambiente",
  hapticLabel: "Estimulação por vibração",
  hapticDesc: "Vibração alternada do telefone como canal tátil de EBL",
  hapticUnsupported: "A vibração não é suportada neste dispositivo",
  visualStim: "Estímulo visual",
  visualStimDesc: "Desative para um modo de áudio/tátil: baixa visão, enjoo, condições visuais",
  vestibular: "Proteção contra enjoo",
  vestibularDesc: "Limita a velocidade e a amplitude se você sentir náusea ou tontura",

  groundBeforeExit: "Aterre-se primeiro",
  groundBeforeExitSub: "O sofrimento ainda está alto. Vale a pena voltar a um estado calmo antes de sair.",
  closeAnyway: "Encerrar mesmo assim",
  connLost: "A conexão com o especialista foi perdida. A estimulação foi interrompida. Respire com calma e aterre-se se for preciso.",

  sigOk: "Estou bem",
  sigPause: "Preciso de uma pausa",
  sigStop: "Parar",
  sigBadge: "O especialista pode ver o seu sinal",
  sigHeading: "Sinal do cliente",
  sigNone: "Sem sinais",
  sigOkH: "Cliente: tudo bem",
  sigPauseH: "O cliente pede uma pausa",
  sigStopH: "O cliente pede para PARAR",
  sigClear: "Limpar",

  tpTitle: "Condução da sessão",
  tpSub: "Protocolo por fases. Apenas para o especialista",
  tpPhaseLabel: "Fase",
  tpTarget: "Alvo (imagem ou lembrança)",
  tpNeg: "Crença negativa (NC)",
  tpPos: "Crença positiva (PC)",
  tpEmotions: "Emoções",
  tpBody: "Sensações corporais, onde",
  tpSuds: "SUD (0-10)",
  tpVoc: "VOC (1-7)",
  tpVocInit: "VOC inicial",
  tpStartSet: "Iniciar série",
  tpStopSet: "Parar e perguntar",
  tpNoticePrompt: "O que você nota agora?",
  tpLogObs: "Registrar observação",
  tpObsPh: "Em poucas palavras: imagem, pensamento, sensação",
  tpNextSet: "Próxima série",
  tpNotes: "Notas do especialista (sem dados pessoais)",
  tpNotesPh: "Apenas observações clínicas, sem o nome do cliente",
  tpSaveSession: "Salvar no diário",
  tpSaved: "Salvo no diário",
  tpReset: "Nova sessão",
  tpSudsTrend: "Evolução do SUD",
  tpSoloLock: "O protocolo completo com dessensibilização está disponível apenas em uma sessão com especialista. No modo individual estão disponíveis a preparação, os exercícios de recursos e o aterramento.",
  tpHostOnly: "Crie uma sessão (painel à esquerda) para conduzir o protocolo com um cliente",

  modeChooseTitle: "Como você vai trabalhar?",
  modeChooseSub: "Você pode mudar o modo a qualquer momento no menu lateral",
  modeSpecialist: "Para o especialista",
  modeSpecialistDesc: "Conduzo uma sessão com um cliente: crio uma sala, envio o link, conduzo o protocolo por fases com medições de SUD e VOC.",
  modeSelfHelp: "Para autoajuda",
  modeSelfHelpDesc: "Para mim mesmo: estabilização, exercícios de recursos, aterramento e relaxamento. Sem o processamento autônomo do trauma.",
  modeSwitch: "Mudar de modo",
  modeContinue: "Continuar",
  specIntroTitle: "Como conduzir uma sessão",
  specStep1: "Abra o painel Sessão com especialista e toque em Criar sessão.",
  specStep2: "Copie o link e envie ao cliente. Quando ele se conectar, aparecerá o status Cliente conectado.",
  specStep3: "Abra Condução da sessão: o protocolo por fases com medições de SUD e VOC é desbloqueado quando você se torna o condutor.",
  specStartBtn: "Criar sessão",
  selfIntroTitle: "Por onde começar",
  selfIntro1: "Comece pelos recursos e pela estabilização: lugar seguro, recipiente, respiração.",
  selfIntro2: "O botão Parar e se aterrar está disponível a qualquer momento.",
  selfIntro3: "Esta é uma ferramenta de autoajuda. O processamento do trauma é conduzido por um especialista, não por um aplicativo.",
  selfStartBtn: "Abrir recursos",

  navOnboarding: "Tutorial",
  tpQuick: "Configurações rápidas",
  tpLocalMute: "Silenciar só do meu lado",
  tpLocalMuteHint: "Silenciar o áudio no seu dispositivo. O cliente continua ouvindo o som.",

  cueTitle: "Mostrar ao cliente",
  cueHint: "Exibe uma técnica calma na tela do cliente sobre a estimulação.",
  cueButterfly: "Abraço da borboleta",
  cueBreathing: "Respiração",
  cueGrounding: "Aterramento",
  cueClear: "Remover",
  crisisHeading: "Apoio em crise",

  close: "Fechar",
  stepLabel: "Passo",
  ofLabel: "de",

  aboutNav: "Sobre",
  aboutTitle: "O treinador de EMDR é um projeto livre",
  aboutDesc: "Use gratuitamente. O código é aberto, então você pode hospedar o serviço no seu próprio servidor.",
  aboutGithub: "Abrir no GitHub",
  aboutDonate: "Apoiar o projeto",
  aboutContact: "Entrar em contato com o autor",

  cueLightstream: "Fluxo de luz",
  cueContent: {
    butterfly: {
      title: "Abraço da borboleta",
      steps: [
        "Sente-se confortavelmente. Cruze os braços sobre o peito, com as palmas nos ombros.",
        "Feche os olhos ou baixe suavemente o olhar. Uma respiração calma.",
        "Dê leves toques nos ombros, um de cada vez: à esquerda, depois à direita.",
        "Respire com calma e de forma uniforme. Mantenha um ritmo de cerca de um toque por segundo.",
        "Faça 20-30 toques alternados em um ritmo calmo.",
        "Pare. Baixe os braços e respire fundo."
      ]
    },
    breathing: {
      title: "Respiração quadrada",
      steps: [
        "Sente-se confortavelmente, relaxe os ombros. Acompanhe o círculo na tela.",
        "Respire junto com o círculo: inspire quando ele se expande, expire quando ele se contrai.",
        "Mantenha um ritmo uniforme: inspire 4, segure 4, expire 4, segure 4."
      ]
    },
    grounding: {
      title: "Aterramento 5-4-3-2-1",
      steps: [
        "Nomeie para si mesmo 5 coisas que você vê ao redor.",
        "Nomeie 4 coisas que você pode tocar.",
        "Nomeie 3 sons que você ouve.",
        "Nomeie 2 cheiros que você sente.",
        "Nomeie 1 sabor que você percebe. Respire com calma."
      ]
    },
    lightstream: {
      title: "Fluxo de luz",
      steps: [
        "Acomode-se confortavelmente e feche os olhos. Três respirações lentas e calmas.",
        "Imagine uma luz quente e suave, de qualquer cor que lhe pareça curativa e tranquila.",
        "Deixe essa luz entrar pelo topo da sua cabeça. Sinta um calor suave.",
        "A luz desce lentamente: testa, rosto, pescoço, ombros. Por onde passa, a tensão se dissolve.",
        "A luz flui pelo peito, pela barriga, pelas costas. Cada expiração traz um pouco mais de relaxamento.",
        "Agora a luz passa pelos quadris, joelhos, panturrilhas, descendo em direção aos pés.",
        "A luz chega aos pés e flui para a terra, levando embora tudo o que você não precisa mais. O corpo está calmo e leve."
      ]
    }
  },

  sjBadge: "Diário de sessões",
  sjTitle: "Histórico de sessões",
  sjSubtitle: "Os registros são armazenados apenas neste dispositivo",
  sjEmpty: "Ainda não há sessões salvas.",
  sjDuration: "Duração",
  sjMode: "Modo",
  sjModeSolo: "individual",
  sjModeHost: "especialista",
  sjModeClient: "cliente",
  sjPhase: "Fase",
  sjSuds: "SUD",
  sjSudsTo: "para",
  sjObservations: "observações",
  sjClient: "Código do cliente",
  sjDeleteOne: "Excluir",
  sjClearAll: "Limpar tudo",
  sjClearConfirm: "Excluir permanentemente todos os registros do diário?",
  sjDownloadJson: "Baixar JSON",
  sjDownloadCsv: "Baixar CSV",
  sjPrivacyTitle: "Privacidade",
  sjPrivacyBody: "Os dados são armazenados apenas neste dispositivo e pseudonimizados (sem nomes, apenas código). Você é o responsável pelos dados. Obtenha o consentimento do cliente antes de registrar.",

  gateBadge: "Antes de começar",
  gateTitle: "Verificação rápida",
  gateSub: "Leva menos de um minuto. Ajuda a confirmar que a ferramenta é adequada para você agora.",
  gateScreenTitle: "Marque o que for verdadeiro agora mesmo",
  gateScreenIntro: 'Por padrão, todos os itens estão como "não". Marque qualquer um que se aplique a você neste momento.',
  gateScreenItems: [
    "Sensação de irrealidade ou de desligamento de si mesmo ou do ambiente",
    "Pensamentos agudos de autolesão ou suicídio",
    "Psicose ou mania agora mesmo",
    "Transtorno dissociativo grave conhecido (diagnosticado)",
    "Sob efeito de substâncias que prejudicam a autorregulação"
  ],
  gateStopTitle: "Agora, procurar um especialista seria o passo certo",
  gateStopBody: "Um ou mais itens indicam que o trabalho de dupla atenção feito sozinho não é seguro agora. Isto não é uma crítica, apenas um sinal: o apoio profissional ajudaria.",
  gateStopHint: "Abra o painel de recursos para encontrar linhas de crise e contatos de especialistas.",
  gateOpenResources: "Abrir recursos de apoio",
  gateConsentTitle: "Compreensão e consentimento",
  gateConsentItems: [
    "Entendo que esta é uma ferramenta de autoajuda, não uma terapia e não uma substituta do especialista.",
    "Posso parar a qualquer momento e usarei o aterramento / 5-4-3-2-1 se me sentir mal.",
    "Para o trabalho efetivo com o trauma, deve haver por perto um especialista treinado: eu uso isto para aterramento e relaxamento."
  ],
  gateAccept: "Iniciar",

  obSkip: "Pular",
  obDone: "Concluído",
  obSpecialist: [
    { title: "Modo especialista", body: "Um tour rápido pela interface. Você guia o cliente, o aplicativo fornece a estimulação bilateral." },
    { title: "Sessão com um cliente", body: "Crie uma sala e envie o link ao cliente. Quando ele se conectar, a tela dele espelha a sua estimulação, sem controles." },
    { title: "Condução da sessão", body: "O protocolo de 8 fases, medições de SUD e VOC, início de séries. Aqui também há configurações rápidas em tempo real e técnicas para mostrar ao cliente: borboleta, respiração, aterramento. E o botão para silenciar o som só do seu lado." },
    { title: "Configurações da sessão", body: "Padrão de movimento, velocidade, amplitude, som do estímulo e fundo. Você pode montar uma predefinição e compartilhar um link." },
    { title: "Parar e se aterrar", body: "Sempre à mão. Interrompe a estimulação e ajuda a voltar ao aqui e agora. Os contatos de crise também ficam aqui." },
    { title: "Diário de sessões", body: "Histórico local: configurações, séries, evolução do SUD. Armazenado apenas no seu dispositivo, sem nomes." },
    { title: "Mudar de modo", body: "Alterne entre o modo especialista e o de autoajuda a qualquer momento." },
    { title: "Tudo pronto", body: "Comece criando uma sessão. Você pode rever este tutorial pelo botão de tutorial no menu." }
  ],
  obSelfhelp: [
    { title: "Modo autoajuda", body: "Uma olhada rápida no que está onde. Esta é uma ferramenta de estabilização e calma, não uma substituta da terapia." },
    { title: "Recursos e estabilização", body: "Lugar seguro, recipiente, fluxo de luz, abraço da borboleta, respiração. Seguro para praticar sozinho." },
    { title: "Configurações", body: "Padrão de movimento, velocidade, amplitude, som e fundo do seu jeito." },
    { title: "Parar e se aterrar", body: "Interrompe a estimulação a qualquer momento e ajuda você a se acalmar com o 5-4-3-2-1 e a respiração." },
    { title: "Tudo pronto", body: "O processamento do trauma é conduzido por um especialista, não por um aplicativo. Reveja este tutorial pelo menu." }
  ],

  drawerVisual: "Visual",
  drawerSound: "Som",
  drawerChannels: "Canais",
  drawerTiming: "Tempo",

  previewPaused: "em pausa",
  previewVisualOff: "visual desligado",

  resNote: "Estabilização",
  resTitle: "Exercícios de recursos",
  resSubtitle: "Estabilização e aterramento - EMDR fase 2",
  resDisclaimer: "Estes exercícios são de estabilização e aterramento, não de processamento do trauma. Seguros sem um terapeuta.",
  resBackToList: "Voltar à lista",
  resExercises: {
    safe_place: {
      name: "Lugar seguro / tranquilo",
      tagline: "Visualização guiada de um espaço de paz",
      steps: [
        "Acomode-se confortavelmente. Feche os olhos ou baixe suavemente o olhar. Faça três respirações lentas e profundas.",
        "Imagine um lugar onde você se sente calmo e seguro. Pode ser real ou totalmente imaginado.",
        "Olhe ao redor nesse lugar. O que você vê? Note as cores, a luz, as formas.",
        "Escute. Que sons existem ali, ou é silêncio?",
        "Sinta o ar na sua pele. A temperatura, talvez um aroma. Sinta o chão ou a superfície sob você.",
        "Permita-se estar plenamente presente ali. Sinta o corpo relaxar. Guarde essa sensação.",
        "Dê um nome a este lugar - uma palavra ou imagem à qual você pode voltar a qualquer momento. Abra os olhos devagar."
      ]
    },
    container: {
      name: "Recipiente",
      tagline: "Guardar mentalmente o material perturbador",
      steps: [
        "Sente-se confortavelmente. Faça algumas respirações calmas. Lembre-se: você está seguro neste momento.",
        "Imagine um recipiente resistente - um cofre, um baú, uma caixa. Algo sólido, com tampa ou fechadura segura.",
        "Examine-o: o material, o tamanho, a fechadura ou o trinco. Certifique-se de que parece firme o bastante.",
        "Nomeie o que está incomodando você - apenas uma palavra ou imagem. Não mergulhe nos detalhes.",
        "Imagine-se colocando isso dentro do recipiente. Feche a tampa. Tranque. O recipiente está seguro.",
        "Coloque o recipiente em algum lugar seguro na sua imaginação - em uma prateleira, em um cofre. Ele vai ficar ali.",
        "Respire. Você pode voltar a este material mais tarde, quando estiver pronto - e com apoio."
      ]
    },
    light_stream: {
      name: "Fluxo de luz",
      tagline: "Luz quente percorrendo o corpo",
      steps: [
        "Sente-se ou deite-se confortavelmente. Feche os olhos. Três respirações lentas.",
        "Imagine uma luz quente e suave - qualquer cor que lhe pareça curativa e tranquila.",
        "Deixe essa luz entrar pelo topo da sua cabeça. Sinta um calor suave.",
        "Aos poucos a luz desce: testa, rosto, pescoço. Por onde a luz passa, a tensão se dissolve.",
        "A luz flui pelos ombros, braços, peito. Cada expiração traz um pouco mais de relaxamento.",
        "Agora a luz percorre a barriga, a região lombar, os quadris, os joelhos, as panturrilhas.",
        "A luz chega aos pés e flui para a terra, levando embora tudo o que você não precisa mais."
      ]
    },
    butterfly_hug: {
      name: "Abraço da borboleta",
      tagline: "Toques alternados em si mesmo para se acalmar",
      steps: [
        "Sente-se ereto. Cruze os braços sobre o peito: a mão direita no ombro esquerdo, a mão esquerda no ombro direito.",
        "Feche os olhos ou baixe suavemente o olhar. Faça uma respiração profunda.",
        "Acompanhe a animação abaixo. Comece a dar toques de forma lenta e alternada: primeiro a mão direita, depois a esquerda.",
        "Continue em um ritmo lento - cerca de um por segundo. Respire de forma estável e calma.",
        "Pense em algo neutro ou levemente agradável enquanto dá os toques.",
        "Faça 20-30 toques alternados. Depois pare. Respire fundo.",
        "Baixe os braços. Como você se sente? Note quaisquer mudanças no seu corpo ou no seu humor."
      ]
    }
  }
};
