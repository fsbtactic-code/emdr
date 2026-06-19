<div align="center">

<b>Русский</b> &nbsp;|&nbsp; <a href="README.en.md">English</a> &nbsp;|&nbsp; <a href="README.es.md">Espanol</a> &nbsp;|&nbsp; <a href="README.it.md">Italiano</a> &nbsp;|&nbsp; <a href="README.de.md">Deutsch</a> &nbsp;|&nbsp; <a href="README.fr.md">Francais</a> &nbsp;|&nbsp; <a href="README.pt.md">Portugues</a>

</div>

<div align="center">

<img src="https://s3.twcstorage.ru/strelo/emdr/og.jpg" width="840" alt="EMDR Trainer" />

# EMDR Trainer

### Free EMDR tool for specialists and their clients

Тренажер билатеральной стимуляции для заземления, ресурсирования и релаксации.<br/>
С режимом сессии под управлением специалиста, честной доказательной базой и поддержкой 7 языков.

<br/>

[![License](https://img.shields.io/badge/License-MIT-7c5cff?style=for-the-badge)](LICENSE)
[![Live demo](https://img.shields.io/badge/Demo-bananamaster.ru%2Femdr-10b981?style=for-the-badge)](https://bananamaster.ru/emdr)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Languages](https://img.shields.io/badge/Языки-7-f59e0b?style=for-the-badge)

<a href="https://bananamaster.ru/emdr"><b>Открыть тренажер</b></a> &nbsp;|&nbsp;
<a href="https://s3.twcstorage.ru/strelo/emdr/preview.mp4"><b>Видео-демо</b></a> &nbsp;|&nbsp;
<a href="https://t.me/hackmemasters"><b>Связаться</b></a>

</div>

<br/>

> Это инструмент самопомощи, а не замена психотерапии. Полноценную переработку травмы ведет сертифицированный EMDR-терапевт. Тренажер помогает на этапе стабилизации и как поддержка между сессиями.

<br/>

## Возможности

<table>
<tr>
<td width="50%" valign="top">

### Сессия со специалистом
Терапевт создает сессию и отправляет клиенту ссылку. Клиент видит чистый экран только со стимуляцией, без настроек. Специалист запускает и останавливает стимуляцию, меняет режимы, а у клиента все обновляется синхронно. Кнопка заземления у клиента остается всегда.

</td>
<td width="50%" valign="top">

### Визуальная стимуляция
9 паттернов движения (горизонталь, вертикаль, диагонали, лемниската, точки, пульс, столбы, зигзаг), плавное слежение или саккады, регулировка скорости, размаха, размера, формы и цвета мишени.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### Звук и фоны
Билатеральный стимул (мягкий тон, щелчки, метроном, белый шум, бинауральные ритмы) и 10 процедурных фонов: дождь, волны, ветер, дыхание, розовый и коричневый шум, дрон и другие. Все генерируется в браузере, без внешних файлов. Есть режим без звука.

</td>
<td width="50%" valign="top">

### Когнитивная нагрузка
Опциональный поток символов на мишени, который нагружает рабочую память, с выбором алфавита. Скорость и интенсивность настраиваются под клиента.

</td>
</tr>
<tr>
<td width="50%" valign="top">

### Безопасность
Информированное согласие и короткий скрининг противопоказаний перед стартом, постоянная кнопка "Стоп и заземление" с техникой 5-4-3-2-1 и квадратным дыханием, режим снижения движения для людей с фоточувствительностью.

</td>
<td width="50%" valign="top">

### Доказательная база
Встроенное руководство с честной оценкой эффективности по состояниям и ссылками на источники: ВОЗ, NICE, ISTSS, APA, Cochrane. Без переоценки и без обещаний лечения.

</td>
</tr>
</table>

## Демо

[![Видео-демо](https://s3.twcstorage.ru/strelo/emdr/preview.jpg)](https://s3.twcstorage.ru/strelo/emdr/preview.mp4)

Полное видео: [preview.mp4](https://s3.twcstorage.ru/strelo/emdr/preview.mp4) &nbsp;|&nbsp; Живая версия: [bananamaster.ru/emdr](https://bananamaster.ru/emdr)

## Быстрый старт

```bash
npm install
npm run dev
```

Откройте http://localhost:3000

Продакшен:

```bash
npm run build
npm start
```

### Docker

```bash
docker compose up -d --build
```

## Обратная связь в приложении (опционально)

Форма обратной связи может отправлять сообщения в Telegram. Без настройки она просто принимает ввод и ничего не отправляет. Чтобы включить доставку:

```bash
TELEGRAM_TOKEN=...
TELEGRAM_CHAT_ID=...
```

## Языки

Русский, English, Espanol, Italiano, Deutsch, Francais, Portugues. Выбор языка на старте и в настройках.

## Технологии

Next.js 16, React 19, TypeScript, Tailwind CSS, Web Audio API, Framer Motion, Zustand.

## Лицензия

[MIT](LICENSE). Используйте, изменяйте и распространяйте свободно.

## Благодарность

Спасибо психологам, которые каждый день помогают людям справляться с травмой и возвращаться к нормальной жизни. Этот инструмент сделан, чтобы поддержать вашу работу, а не заменить ее.

<div align="center">

<br/>

[![Telegram](https://img.shields.io/badge/Telegram-@hackmemasters-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/hackmemasters)
[![Threads](https://img.shields.io/badge/Threads-@hackmemasters-000000?style=for-the-badge&logo=threads&logoColor=white)](https://www.threads.com/@hackmemasters)

Любые запросы, идеи и предложения по сотрудничеству пишите в Telegram.

</div>
