'use client';

/**
 * Design system showcase - a calm, clinical-wellness gallery of every UI
 * primitive in app/components/ui. Dark theme, soft springs, one dominant
 * accent per section. Route: /design-system.
 *
 * Everything below is a live example wired to local useState so the
 * interactive primitives behave exactly as they do in the product.
 */

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Activity,
  BookOpen,
  Check,
  Eye,
  Gauge,
  Heart,
  Layers,
  Pause,
  Play,
  Plus,
  RotateCcw,
  Settings,
  Sparkles,
  Square,
  Waves,
} from 'lucide-react';

import { cn } from '../components/ui/cn';
import {
  ACCENTS,
  COLORS,
  RADIUS,
  SHADOW,
  TYPE,
  type AccentName,
} from '../components/ui/tokens';
import { fadeRise, reduceVariants, SPRING, staggerContainer } from '../components/ui/motion';

import { Button } from '../components/ui/Button';
import { IconButton } from '../components/ui/IconButton';
import { Panel } from '../components/ui/Panel';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Drawer } from '../components/ui/Drawer';
import { Slider } from '../components/ui/Slider';
import { Toggle } from '../components/ui/Toggle';
import { Field } from '../components/ui/Field';
import { SegmentedControl, type SegmentedOption } from '../components/ui/SegmentedControl';
import { Chip } from '../components/ui/Chip';
import { Tabs, type TabItem } from '../components/ui/Tabs';
import { SectionLabel } from '../components/ui/SectionLabel';
import { Badge } from '../components/ui/Badge';
import { ProgressDots } from '../components/ui/ProgressDots';
import { Divider } from '../components/ui/Divider';
import { ScaleRow } from '../components/ui/ScaleRow';
import { PhaseRail, type PhaseItem } from '../components/ui/PhaseRail';
import { ColorSwatches, type SwatchItem } from '../components/ui/ColorSwatches';
import { Tooltip } from '../components/ui/Tooltip';
import { Spinner } from '../components/ui/Spinner';
import { EmptyState, EmptyStateCard } from '../components/ui/EmptyState';

/* ================================================================== *
 * Layout helpers - section frame, label-tagged example wells.
 * ================================================================== */

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={reduceVariants(fadeRise, reduced)}
      transition={SPRING}
      className="scroll-mt-24"
    >
      <div className="mb-6">
        <div className={cn(TYPE.label, 'text-indigo-300/70 mb-2')}>{eyebrow}</div>
        <h2 className={cn('text-[22px] font-medium tracking-tight text-white/90')}>{title}</h2>
        {description && (
          <p className={cn(TYPE.bodyMuted, 'mt-1.5 max-w-2xl')}>{description}</p>
        )}
      </div>
      {children}
    </motion.section>
  );
}

/** A labelled well that frames a single live example. */
function Demo({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        RADIUS.lg,
        COLORS.surface.subtle,
        'border',
        COLORS.border.faint,
        'p-5',
        className,
      )}
    >
      <div className={cn(TYPE.label, 'mb-4 text-white/35')}>{label}</div>
      {children}
    </div>
  );
}

/* ================================================================== *
 * Shared example data
 * ================================================================== */

const PALETTE: { name: string; role: string; accent: AccentName }[] = [
  { name: 'Primary', role: 'CTA, фокус, основное действие', accent: 'primary' },
  { name: 'Success', role: 'старт сета, готово, подтверждение', accent: 'success' },
  { name: 'Danger', role: 'стоп, прерывание, ошибка', accent: 'danger' },
  { name: 'Warn', role: 'внимание, незавершенная фаза', accent: 'warn' },
  { name: 'Calm', role: 'терапевтический ориентир, заземление', accent: 'calm' },
  { name: 'Info', role: 'канал стимуляции, подсказка', accent: 'info' },
];

const FEELING_COLORS: SwatchItem[] = [
  { value: 'calm', hex: ACCENTS.calm.hex, label: 'Спокойствие' },
  { value: 'tense', hex: ACCENTS.danger.hex, label: 'Напряжение' },
  { value: 'focus', hex: ACCENTS.info.hex, label: 'Фокус' },
  { value: 'warm', hex: ACCENTS.warn.hex, label: 'Тепло' },
  { value: 'numb', hex: '#94a3b8', label: 'Отстраненность' },
];

const PHASES: PhaseItem[] = [
  { name: 'История и план', status: 'done' },
  { name: 'Подготовка', status: 'done' },
  { name: 'Оценка цели', status: 'current' },
  { name: 'Десенсибилизация', status: 'has-data' },
  { name: 'Инсталляция', status: 'empty' },
  { name: 'Сканирование тела', status: 'empty' },
];

const PATTERN_OPTIONS: SegmentedOption[] = [
  { value: 'horizontal', label: 'Горизонталь', icon: <Waves size={13} strokeWidth={1.8} /> },
  { value: 'circle', label: 'Круг', icon: <RotateCcw size={13} strokeWidth={1.8} /> },
  { value: 'infinity', label: 'Бесконечность', icon: <Activity size={13} strokeWidth={1.8} /> },
];

const TABS: TabItem[] = [
  { id: 'session', label: 'Сессия', icon: <Play size={13} strokeWidth={1.8} /> },
  { id: 'log', label: 'Журнал', icon: <BookOpen size={13} strokeWidth={1.8} /> },
  { id: 'settings', label: 'Настройки', icon: <Settings size={13} strokeWidth={1.8} /> },
];

/* ================================================================== *
 * Page
 * ================================================================== */

export default function DesignSystemPage() {
  const reduced = useReducedMotion();

  // Interactive state
  const [speed, setSpeed] = React.useState(45);
  const [size, setSize] = React.useState(28);
  const [sound, setSound] = React.useState(true);
  const [haptics, setHaptics] = React.useState(false);
  const [pattern, setPattern] = React.useState<string>('horizontal');
  const [activeTab, setActiveTab] = React.useState('session');
  const [step, setStep] = React.useState(2);
  const [sud, setSud] = React.useState<number | undefined>(7);
  const [voc, setVoc] = React.useState<number | undefined>(4);
  const [phase, setPhase] = React.useState(2);
  const [feeling, setFeeling] = React.useState<string | undefined>('calm');
  const [tags, setTags] = React.useState<string[]>(['тревога']);
  const [name, setName] = React.useState('');
  const [modalOpen, setModalOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [iconActive, setIconActive] = React.useState(true);

  const TAG_LIBRARY = ['тревога', 'безопасность', 'ресурс', 'триггер'];

  const toggleTag = (tag: string) =>
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));

  return (
    <main className="h-[100dvh] overflow-y-auto bg-[#09090b] text-white/90 antialiased">
      {/* subtle top glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 h-[420px]"
        style={{
          background:
            'radial-gradient(900px 420px at 50% -120px, rgba(99,102,241,0.10), transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 py-20 md:px-10">
        {/* ---------------------------------------------------------- *
         * Header
         * ---------------------------------------------------------- */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={reduceVariants(staggerContainer, reduced)}
          className="mb-20"
        >
          <motion.div variants={reduceVariants(fadeRise, reduced)}>
            <Badge variant="calm">EMDR Trainer</Badge>
          </motion.div>
          <motion.h1
            variants={reduceVariants(fadeRise, reduced)}
            className="mt-5 text-[40px] font-medium leading-[1.05] tracking-tight text-white md:text-[52px]"
          >
            Дизайн-система
          </motion.h1>
          <motion.p
            variants={reduceVariants(fadeRise, reduced)}
            className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/55"
          >
            Спокойный клинический инструмент. Темная основа, тонкие границы, мягкое движение.
            Один смысловой акцент на контекст, ничего лишнего, ничего кричащего.
          </motion.p>
          <motion.div
            variants={reduceVariants(fadeRise, reduced)}
            className="mt-7 flex flex-wrap items-center gap-2"
          >
            <Chip label="24 примитива" icon={<Layers size={12} strokeWidth={1.8} />} />
            <Chip label="Темная тема" icon={<Eye size={12} strokeWidth={1.8} />} />
            <Chip label="Reduced motion" icon={<Sparkles size={12} strokeWidth={1.8} />} />
          </motion.div>
        </motion.header>

        <div className="flex flex-col gap-24">
          {/* -------------------------------------------------------- *
           * Palette
           * -------------------------------------------------------- */}
          <Section
            id="palette"
            eyebrow="Основа"
            title="Палитра"
            description="Семантические акценты. Цвет несет роль, выбор задается заливкой акцента с прозрачностью, а не белым кольцом."
          >
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {PALETTE.map((c) => {
                const tokens = ACCENTS[c.accent];
                return (
                  <div
                    key={c.accent}
                    className={cn(RADIUS.lg, COLORS.surface.base, 'border', COLORS.border.base, 'p-4')}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="h-9 w-9 shrink-0 rounded-xl"
                        style={{ background: tokens.hex }}
                        aria-hidden
                      />
                      <div className="min-w-0">
                        <div className="text-[13px] font-medium text-white/90">{c.name}</div>
                        <div className={cn(TYPE.mono, 'text-[11px] text-white/40')}>{tokens.hex}</div>
                      </div>
                    </div>
                    <p className={cn(TYPE.caption, 'mt-3 leading-snug')}>{c.role}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-4">
              {(
                [
                  { label: 'Canvas', hex: COLORS.bg },
                  { label: 'Panel', hex: COLORS.bgPanel },
                  { label: 'Raised', hex: COLORS.bgRaised },
                  { label: 'White CTA', hex: ACCENTS.white.hex },
                ] as const
              ).map((s) => (
                <div
                  key={s.label}
                  className={cn(RADIUS.md, COLORS.surface.base, 'border', COLORS.border.faint, 'flex items-center gap-2.5 p-3')}
                >
                  <span
                    className="h-6 w-6 shrink-0 rounded-lg border border-white/[0.06]"
                    style={{ background: s.hex }}
                    aria-hidden
                  />
                  <div className="min-w-0">
                    <div className="text-[12px] text-white/80">{s.label}</div>
                    <div className={cn(TYPE.mono, 'text-[10px] text-white/40')}>{s.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          {/* -------------------------------------------------------- *
           * Typography
           * -------------------------------------------------------- */}
          <Section
            id="typography"
            eyebrow="Основа"
            title="Типографика"
            description="Системный шрифт. Лейблы в верхнем регистре с широким трекингом, заголовки с поджатым, числа табличные."
          >
            <Panel animate={false}>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <span className={TYPE.label}>Section label</span>
                  <span className={cn(TYPE.caption, 'text-white/30')}>TYPE.label, 11px, tracking 0.14em</span>
                </div>
                <Divider />
                <div className="flex flex-col gap-1">
                  <span className={TYPE.heading}>Заголовок панели</span>
                  <span className={cn(TYPE.caption, 'text-white/30')}>TYPE.heading, 18px, tracking-tight</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className={TYPE.headingSm}>Подзаголовок в консоли</span>
                  <span className={cn(TYPE.caption, 'text-white/30')}>TYPE.headingSm, 15px</span>
                </div>
                <Divider />
                <div className="flex flex-col gap-1">
                  <p className={cn(TYPE.body, 'max-w-lg')}>
                    Основной текст. Спокойный ритм, увеличенная высота строки, читается без напряжения
                    в течение сессии.
                  </p>
                  <p className={cn(TYPE.bodyMuted, 'max-w-lg')}>
                    Вторичный текст для пояснений и подсказок терапевту.
                  </p>
                </div>
                <Divider />
                <div className="flex items-baseline gap-4">
                  <span className={cn(TYPE.mono, 'text-[28px] font-medium text-white/90')}>00:45</span>
                  <span className={cn(TYPE.mono, 'text-[28px] font-medium text-white/90')}>1.20</span>
                  <span className={cn(TYPE.caption, 'text-white/30')}>tabular-nums</span>
                </div>
              </div>
            </Panel>
          </Section>

          {/* -------------------------------------------------------- *
           * Radius and shadow
           * -------------------------------------------------------- */}
          <Section
            id="radius"
            eyebrow="Основа"
            title="Радиусы и тени"
            description="Одна шкала скруглений. Тени мягкие и тонированные, без чисто-черных слоев."
          >
            <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
              {(
                [
                  { label: 'sm', cls: RADIUS.sm },
                  { label: 'md', cls: RADIUS.md },
                  { label: 'lg', cls: RADIUS.lg },
                  { label: 'xl', cls: RADIUS.xl },
                  { label: 'full', cls: RADIUS.full },
                ] as const
              ).map((r) => (
                <div key={r.label} className="flex flex-col items-center gap-2">
                  <div
                    className={cn('h-16 w-full border border-white/[0.06] bg-white/[0.04]', r.cls)}
                  />
                  <span className={cn(TYPE.mono, 'text-[11px] text-white/45')}>{r.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
              {(
                [
                  { label: 'panel', cls: SHADOW.panel },
                  { label: 'soft', cls: SHADOW.soft },
                  { label: 'cta white', cls: SHADOW.ctaWhite },
                ] as const
              ).map((s) => (
                <div
                  key={s.label}
                  className={cn('flex h-20 items-center justify-center bg-white/[0.04] border border-white/[0.06]', RADIUS.lg, s.cls)}
                >
                  <span className={cn(TYPE.mono, 'text-[11px] text-white/45')}>{s.label}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* -------------------------------------------------------- *
           * Buttons
           * -------------------------------------------------------- */}
          <Section
            id="button"
            eyebrow="Действия"
            title="Button"
            description="Шесть вариантов, три размера, иконки, загрузка и отключенное состояние. Тап дает мягкую пружинную отдачу."
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Demo label="Варианты">
                <div className="flex flex-wrap gap-2.5">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="success" iconLeft={<Play size={15} strokeWidth={1.8} />}>
                    Старт
                  </Button>
                  <Button variant="danger" iconLeft={<Square size={14} strokeWidth={1.8} />}>
                    Стоп
                  </Button>
                  <Button variant="accent">Accent</Button>
                </div>
              </Demo>
              <Demo label="Размеры">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Button size="sm" variant="primary">
                    Small
                  </Button>
                  <Button size="md" variant="primary">
                    Medium
                  </Button>
                  <Button size="lg" variant="primary">
                    Large
                  </Button>
                </div>
              </Demo>
              <Demo label="Состояния">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Button variant="success" loading>
                    Загрузка
                  </Button>
                  <Button variant="secondary" disabled>
                    Отключено
                  </Button>
                  <Button
                    variant="primary"
                    iconRight={<Plus size={15} strokeWidth={1.8} />}
                  >
                    С иконкой
                  </Button>
                </div>
              </Demo>
              <Demo label="IconButton">
                <div className="flex flex-wrap items-center gap-2.5">
                  <IconButton aria-label="Воспроизвести" variant="success">
                    <Play strokeWidth={1.8} />
                  </IconButton>
                  <IconButton aria-label="Пауза" variant="default">
                    <Pause strokeWidth={1.8} />
                  </IconButton>
                  <IconButton aria-label="Стоп" variant="danger" shape="round">
                    <Square strokeWidth={1.8} />
                  </IconButton>
                  <IconButton
                    aria-label="Звук"
                    variant="primary"
                    active={iconActive}
                    onClick={() => setIconActive((v) => !v)}
                  >
                    <Waves strokeWidth={1.8} />
                  </IconButton>
                  <IconButton aria-label="Заземление" variant="accent" size="lg" shape="round">
                    <Heart strokeWidth={1.8} />
                  </IconButton>
                  <IconButton aria-label="Маленькая" variant="ghost" size="sm">
                    <Settings strokeWidth={1.8} />
                  </IconButton>
                </div>
              </Demo>
            </div>
          </Section>

          {/* -------------------------------------------------------- *
           * Surfaces
           * -------------------------------------------------------- */}
          <Section
            id="surface"
            eyebrow="Поверхности"
            title="Panel и Card"
            description="Стеклянные контейнеры с тонкой границей. Карточки выбора используют заливку акцента в активном состоянии."
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Panel
                title="Параметры сессии"
                description="Базовая панель с шапкой"
                headerTrailing={<Badge variant="success" pulse>Активна</Badge>}
              >
                <p className={cn(TYPE.bodyMuted)}>
                  Контент панели. Шапка отделена тонким разделителем, тело имеет согласованный отступ.
                </p>
              </Panel>
              <Panel variant="raised" title="Raised" description="Чуть приподнятая поверхность">
                <div className="flex items-center gap-2">
                  <Spinner size="sm" accent="calm" />
                  <span className={TYPE.bodyMuted}>Подготовка стимуляции</span>
                </div>
              </Panel>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
              <Card
                icon={<Waves strokeWidth={1.8} />}
                title="Билатеральная"
                description="Движение по горизонтали"
                accent="info"
                selected={pattern === 'horizontal'}
                onClick={() => setPattern('horizontal')}
              />
              <Card
                icon={<RotateCcw strokeWidth={1.8} />}
                title="Круговая"
                description="Плавный круг"
                accent="calm"
                selected={pattern === 'circle'}
                onClick={() => setPattern('circle')}
              />
              <Card
                icon={<Activity strokeWidth={1.8} />}
                title="Бесконечность"
                description="Восьмерка"
                accent="primary"
                selected={pattern === 'infinity'}
                onClick={() => setPattern('infinity')}
              />
            </div>
          </Section>

          {/* -------------------------------------------------------- *
           * Overlays
           * -------------------------------------------------------- */}
          <Section
            id="overlay"
            eyebrow="Слои"
            title="Modal и Drawer"
            description="Блокирующее окно и боковая панель. Открываются мягкой пружиной, закрываются по Esc, клику по фону и крестику."
          >
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" onClick={() => setModalOpen(true)}>
                Открыть Modal
              </Button>
              <Button variant="secondary" onClick={() => setDrawerOpen(true)}>
                Открыть Drawer
              </Button>
            </div>

            <Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Завершить сессию"
              footer={
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => setModalOpen(false)}>
                    Отмена
                  </Button>
                  <Button variant="success" onClick={() => setModalOpen(false)}>
                    Сохранить
                  </Button>
                </div>
              }
            >
              <p className={TYPE.bodyMuted}>
                Данные текущей фазы будут записаны в журнал. Это безопасное действие, его можно
                отменить позже.
              </p>
            </Modal>

            <Drawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              side="right"
              title="Настройки стимуляции"
              footer={
                <Button variant="primary" className="w-full" onClick={() => setDrawerOpen(false)}>
                  Готово
                </Button>
              }
            >
              <div className="flex flex-col gap-6">
                <Slider label="Скорость" value={speed} min={10} max={90} unit="bpm" onChange={setSpeed} accent="info" />
                <Toggle label="Звук" checked={sound} onChange={setSound} accent="info" />
                <Toggle label="Вибрация" checked={haptics} onChange={setHaptics} accent="calm" />
              </div>
            </Drawer>
          </Section>

          {/* -------------------------------------------------------- *
           * Inputs
           * -------------------------------------------------------- */}
          <Section
            id="inputs"
            eyebrow="Ввод"
            title="Slider, Toggle, Field"
            description="Регуляторы параметров. Фокус подсвечивается тинтом акцента, а не белым кольцом."
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Demo label="Slider">
                <div className="flex flex-col gap-6">
                  <Slider
                    label="Скорость"
                    value={speed}
                    min={10}
                    max={90}
                    unit="bpm"
                    accent="info"
                    description="Частота смены направления"
                    onChange={setSpeed}
                  />
                  <Slider
                    label="Размер цели"
                    value={size}
                    min={8}
                    max={64}
                    unit="px"
                    accent="calm"
                    onChange={setSize}
                  />
                </div>
              </Demo>
              <Demo label="Toggle">
                <div className="flex flex-col gap-5">
                  <Toggle
                    label="Звуковое сопровождение"
                    description="Тон чередуется между каналами"
                    checked={sound}
                    onChange={setSound}
                    accent="info"
                  />
                  <Toggle
                    label="Тактильная отдача"
                    description="Вибрация на каждом проходе"
                    checked={haptics}
                    onChange={setHaptics}
                    accent="calm"
                  />
                </div>
              </Demo>
              <Demo label="Field" className="md:col-span-2">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field
                    label="Имя клиента"
                    placeholder="Введите имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    hint="Хранится локально"
                  />
                  <Field
                    label="Код сессии"
                    placeholder="000"
                    error="Код должен содержать 4 цифры"
                    accent="danger"
                  />
                  <Field
                    as="textarea"
                    label="Целевое воспоминание"
                    placeholder="Краткое описание"
                    accent="calm"
                    className="md:col-span-2"
                  />
                </div>
              </Demo>
            </div>
          </Section>

          {/* -------------------------------------------------------- *
           * Segmented / Chip / Tabs
           * -------------------------------------------------------- */}
          <Section
            id="segmented"
            eyebrow="Выбор"
            title="SegmentedControl, Chip, Tabs"
            description="Группы взаимоисключающего выбора и теги. Активный элемент получает заливку акцента и плавный переход."
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Demo label="SegmentedControl">
                <div className="flex flex-col gap-4">
                  <SegmentedControl
                    options={PATTERN_OPTIONS}
                    value={pattern}
                    onChange={setPattern}
                    accent="info"
                    fullWidth
                    aria-label="Паттерн движения"
                  />
                </div>
              </Demo>
              <Demo label="Chip">
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    <Chip label="Только чтение" />
                    <Chip label="С иконкой" icon={<Heart size={12} strokeWidth={1.8} />} variant="accent" accent="calm" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {TAG_LIBRARY.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        selectable
                        selected={tags.includes(tag)}
                        accent="primary"
                        onClick={() => toggleTag(tag)}
                      />
                    ))}
                  </div>
                </div>
              </Demo>
            </div>
            <div className="mt-4">
              <Demo label="Tabs">
                <Tabs
                  tabs={TABS}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  variant="fill"
                  accent="primary"
                  aria-label="Разделы консоли"
                >
                  {(id) => (
                    <p className={cn(TYPE.bodyMuted, 'pt-1')}>
                      {id === 'session' && 'Активная сессия: управление стимуляцией и фазами.'}
                      {id === 'log' && 'Журнал: записи SUD/VOC по каждой фазе.'}
                      {id === 'settings' && 'Настройки: скорость, размер цели, звук и вибрация.'}
                    </p>
                  )}
                </Tabs>
              </Demo>
            </div>
          </Section>

          {/* -------------------------------------------------------- *
           * Labels and feedback markers
           * -------------------------------------------------------- */}
          <Section
            id="labels"
            eyebrow="Маркеры"
            title="SectionLabel, Badge, ProgressDots, Divider"
            description="Заголовки секций, статусы и индикаторы прогресса."
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Demo label="SectionLabel">
                <div className="flex flex-col gap-3">
                  <SectionLabel icon={Gauge}>Параметры</SectionLabel>
                  <SectionLabel icon={Heart} accent="calm">
                    Заземление
                  </SectionLabel>
                  <SectionLabel icon={Activity} accent="info">
                    Стимуляция
                  </SectionLabel>
                </div>
              </Demo>
              <Demo label="Badge">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success" pulse>
                    Клиент подключен
                  </Badge>
                  <Badge variant="warn">Фаза не завершена</Badge>
                  <Badge variant="danger">Сессия остановлена</Badge>
                  <Badge variant="info">Стимуляция</Badge>
                  <Badge variant="calm">Заземление</Badge>
                  <Badge variant="neutral">Черновик</Badge>
                </div>
              </Demo>
              <Demo label="ProgressDots">
                <div className="flex flex-col gap-4">
                  <ProgressDots total={6} current={step} accent="primary" />
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))}>
                      Назад
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setStep((s) => Math.min(5, s + 1))}>
                      Вперед
                    </Button>
                  </div>
                </div>
              </Demo>
              <Demo label="Divider">
                <div className="flex flex-col gap-4">
                  <Divider />
                  <Divider label="или" />
                  <div className="flex h-10 items-center gap-3">
                    <span className={TYPE.bodyMuted}>Слева</span>
                    <Divider orientation="vertical" />
                    <span className={TYPE.bodyMuted}>Справа</span>
                  </div>
                </div>
              </Demo>
            </div>
          </Section>

          {/* -------------------------------------------------------- *
           * Clinical primitives
           * -------------------------------------------------------- */}
          <Section
            id="clinical"
            eyebrow="Клиника"
            title="ScaleRow, PhaseRail, ColorSwatches"
            description="Специализированные элементы протокола EMDR: шкалы SUD и VOC, навигация по фазам и выбор состояния цветом."
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Demo label="ScaleRow">
                <div className="flex flex-col gap-6">
                  <ScaleRow
                    from={0}
                    to={10}
                    value={sud}
                    onPick={setSud}
                    accent="danger"
                    label="SUD"
                    description="0 - спокойствие, 10 - максимальный дистресс"
                  />
                  <ScaleRow
                    from={1}
                    to={7}
                    value={voc}
                    onPick={setVoc}
                    accent="calm"
                    label="VOC"
                    description="1 - не верю, 7 - полностью верю"
                  />
                </div>
              </Demo>
              <Demo label="PhaseRail">
                <PhaseRail phases={PHASES} currentIndex={phase} onJump={setPhase} accent="primary" />
              </Demo>
              <Demo label="ColorSwatches" className="md:col-span-2">
                <ColorSwatches
                  colors={FEELING_COLORS}
                  value={feeling}
                  onChange={setFeeling}
                  label="Что вы чувствуете сейчас"
                  size="lg"
                />
              </Demo>
            </div>
          </Section>

          {/* -------------------------------------------------------- *
           * Feedback
           * -------------------------------------------------------- */}
          <Section
            id="feedback"
            eyebrow="Обратная связь"
            title="Tooltip, Spinner, EmptyState"
            description="Подсказки, индикаторы загрузки и пустые состояния."
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Demo label="Tooltip">
                <div className="flex flex-wrap items-center gap-6 py-4">
                  <Tooltip content="Сверху" side="top">
                    <Button size="sm" variant="secondary">
                      Top
                    </Button>
                  </Tooltip>
                  <Tooltip content="Справа" side="right">
                    <Button size="sm" variant="secondary">
                      Right
                    </Button>
                  </Tooltip>
                  <Tooltip content="Снизу" side="bottom">
                    <Button size="sm" variant="secondary">
                      Bottom
                    </Button>
                  </Tooltip>
                  <Tooltip content="Запустить стимуляцию" side="left">
                    <IconButton aria-label="Старт" variant="success">
                      <Play strokeWidth={1.8} />
                    </IconButton>
                  </Tooltip>
                </div>
              </Demo>
              <Demo label="Spinner">
                <div className="flex flex-wrap items-center gap-5 py-2">
                  <Spinner size="xs" />
                  <Spinner size="sm" accent="info" />
                  <Spinner size="md" accent="calm" />
                  <Spinner size="lg" accent="success" />
                  <Spinner size="xl" accent="warn" />
                </div>
              </Demo>
              <Demo label="EmptyState">
                <EmptyState
                  icon={<BookOpen />}
                  heading="Журнал пуст"
                  description="Записи появятся после первой завершенной фазы сессии."
                  accent="calm"
                  action={
                    <Button variant="primary" size="sm" iconLeft={<Plus size={14} strokeWidth={1.8} />}>
                      Начать сессию
                    </Button>
                  }
                />
              </Demo>
              <Demo label="EmptyStateCard">
                <EmptyStateCard
                  icon={<Check />}
                  heading="Все цели обработаны"
                  description="Можно перейти к сканированию тела."
                  accent="success"
                  size="sm"
                />
              </Demo>
            </div>
          </Section>
        </div>

        {/* footer */}
        <footer className="mt-24 border-t border-white/[0.06] pt-8">
          <p className={cn(TYPE.caption, 'text-white/30')}>
            EMDR Trainer, дизайн-система. Спокойно, чисто, по делу.
          </p>
        </footer>
      </div>
    </main>
  );
}
