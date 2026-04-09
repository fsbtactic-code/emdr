'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, ChevronDown, Shield, Target, Brain, Eye, Heart, CheckCircle2, AlertTriangle } from 'lucide-react';

const sections = [
  {
    id: 'what',
    icon: Brain,
    title: 'Что такое EMDR?',
    color: 'text-cyan-400',
    content: `EMDR (Eye Movement Desensitization and Reprocessing) — это научно обоснованный метод психотерапии, разработанный Франсин Шапиро в 1987 году. Метод помогает переработать травмирующие воспоминания с помощью билатеральной стимуляции — ритмичного чередования активации правого и левого полушарий мозга.

Билатеральная стимуляция может быть визуальной (движение глаз за объектом), акустической (чередующиеся звуки) или тактильной (похлопывания по коленям).

EMDR признан эффективным методом Всемирной организацией здравоохранения (ВОЗ) и Американской психологической ассоциацией (APA).`,
  },
  {
    id: 'when',
    icon: Target,
    title: 'При каких состояниях помогает?',
    color: 'text-emerald-400',
    content: `• ПТСР и травматический опыт
• Тревожные расстройства и панические атаки
• Фобии и навязчивые страхи
• Депрессия
• Горе и утрата
• Низкая самооценка
• Хроническая боль
• Зависимости
• Нарушения сна
• СДВГ (как вспомогательный инструмент для самоорганизации)

Важно: при серьёзных травмах рекомендуется работать со специалистом. Самостоятельная практика подходит для лёгких тревожных состояний и ресурсирования.`,
  },
  {
    id: 'prepare',
    icon: Shield,
    title: 'Подготовка к сессии',
    color: 'text-amber-400',
    content: `1. Найдите тихое, безопасное место, где вас никто не потревожит
2. Убедитесь, что у вас есть 20–30 минут свободного времени
3. Сядьте удобно, ноги на полу, руки расслаблены
4. Выберите предмет работы — конкретное воспоминание или ощущение
5. Оцените уровень тревоги по шкале 0–10 (SUD Scale)
6. Определите «безопасное место» — приятное воспоминание или образ, куда можно вернуться при дискомфорте

Ваше «безопасное место» — это виртуальный якорь стабильности. Перед началом представьте его вживую: место, звуки, запахи, ощущения в теле.`,
  },
  {
    id: 'framework',
    icon: Eye,
    title: 'Фреймворк самостоятельной сессии',
    color: 'text-indigo-400',
    content: `Пошаговый план сессии EMDR:

Шаг 1 — Безопасное место (2–3 мин)
Включите пресет «Ресурс». Представьте ваше безопасное место. Следите глазами за объектом 2–3 серии по 24 движения.

Шаг 2 — Определение мишени (1–2 мин)
Остановите стимуляцию. Сформулируйте:
• Образ: что вы видите в воспоминании?
• Негативное убеждение: «Я беспомощен», «Я в опасности»
• Позитивное убеждение: «Я в безопасности», «Я справлюсь»
• Телесные ощущения: где в теле чувствуете напряжение?

Шаг 3 — Десенсибилизация (10–15 мин)
Выберите пресет ПТСР (подходящий формат). Удерживайте в сознании образ, негативное убеждение и ощущения в теле. Следите за объектом. После каждой серии:
• Глубокий вдох
• Замечайте, что изменилось
• Оцените уровень тревоги (0–10)
Повторяйте до снижения тревоги до 0–2.

Шаг 4 — Установка (3–5 мин)
Теперь вспомните позитивное убеждение. Удерживая его, проделайте 2–3 серии стимуляции в медленном режиме.

Шаг 5 — Сканирование тела (2–3 мин)
Закройте глаза. Просканируйте тело от головы до ног. Если обнаружите напряжение — проделайте ещё серию стимуляции, направив внимание на эту область.

Шаг 6 — Завершение (2–3 мин)
Вернитесь в «безопасное место». Проделайте 1–2 серии на медленном пресете «Ресурс». Глубоко подышите. Запишите наблюдения.`,
  },
  {
    id: 'presets',
    icon: Heart,
    title: 'Какой пресет выбрать?',
    color: 'text-rose-400',
    content: `Для новичков (первые 1–3 сессии):
→ Используйте «Заземление» или «ПТСР · Плавный»
→ Скорость 0.8–1.0 Гц, горизонтальный паттерн

Для работы с тревогой:
→ «Заземление» — медленный, с дождём
→ «Паника» — экстренный режим с быстрыми саккадами

Для работы с травмой:
→ «ПТСР · Плавный» для мягкого начала
→ «ПТСР · Саккадический» для интенсивной переработки
→ «ПТСР · Глубокая работа» для длительных сессий

Для СДВГ:
→ «СДВГ · Фокус» — нейростимуляция внимания
→ «СДВГ · Спокойствие» — снижение гиперактивности

Для завершения и ресурсирования:
→ «Ресурс» — безопасное место
→ «Глубокий сон» — перед сном, бинауральные ритмы`,
  },
  {
    id: 'safety',
    icon: AlertTriangle,
    title: 'Правила безопасности',
    color: 'text-orange-400',
    content: `⚠ Останавливайте сессию, если:
• Тревога резко возросла и не снижается 3+ серии
• Появилось головокружение или тошнота
• Вы чувствуете диссоциацию (ощущение отключения от реальности)
• Возникло желание причинить себе вред

Что делать при дискомфорте:
1. Остановите стимуляцию
2. Откройте глаза, посмотрите по сторонам
3. Назовите 5 предметов, которые вы видите
4. Сделайте 4 глубоких вдоха (4 сек вдох — 7 сек задержка — 8 сек выдох)
5. Вернитесь к «безопасному месту»

Не рекомендуется самостоятельно работать с:
• Тяжёлыми детскими травмами
• Суицидальными мыслями
• Острыми психотическими состояниями
• Диссоциативными расстройствами

В этих случаях обязательно обратитесь к сертифицированному EMDR-терапевту.`,
  },
];

export const EmdrGuide = () => {
  const { isGuideOpen: isOpen, setIsGuideOpen: setIsOpen } = useStore();
  const [expandedSection, setExpandedSection] = useState<string | null>('what');

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.4 }}
            className="fixed left-0 top-0 h-full w-full md:w-[500px] bg-[#0a0a0c]/95 backdrop-blur-2xl border-r border-white/[0.06] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-4 border-b border-white/5 flex items-center justify-between shrink-0">
              <div>
                <h2 className="text-lg font-medium text-white tracking-tight">Руководство EMDR</h2>
                <p className="text-white/25 text-[12px] mt-0.5">Самостоятельная практика</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-xl hover:bg-white/[0.08] text-white/40 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-5 py-4">
              <div className="flex flex-col gap-2">
                {sections.map(section => {
                  const Icon = section.icon;
                  const isExpanded = expandedSection === section.id;
                  return (
                    <div key={section.id} className="rounded-2xl border border-white/[0.06] bg-white/[0.01] overflow-hidden">
                      <button
                        onClick={() => setExpandedSection(isExpanded ? null : section.id)}
                        className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-white/[0.03] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={18} className={section.color} />
                          <span className="font-medium text-[14px] text-white/90">{section.title}</span>
                        </div>
                        <ChevronDown size={14} className={`text-white/25 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 pb-4 text-[13px] text-white/55 leading-[1.7] whitespace-pre-line">
                              {section.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Disclaimer */}
              <div className="mt-6 mb-4 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/15">
                <p className="text-amber-200/70 text-[12px] leading-relaxed">
                  <strong className="text-amber-300/80">Дисклеймер:</strong> Данное приложение не является заменой профессиональной психотерапии. При тяжёлых состояниях обратитесь к сертифицированному специалисту по EMDR-терапии.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
