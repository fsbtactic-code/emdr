import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const clean = (v: unknown, max = 600): string =>
  String(v ?? '')
    .slice(0, max)
    .replace(/[_*`\[\]]/g, (m) => `\\${m}`);

const stars = (v: unknown) => '⭐'.repeat(Math.min(5, Math.max(0, Number(v) || 0)));

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    let message = `🔔 *Новый отзыв EMDR-тренажер*\n\n`;

    if (data.hasTherapy === 'yes') {
      message += `👤 *Опыт в EMDR:* Да\n`;
      message += `✨ *Визуал:* ${stars(data.visualRating)}\n`;
      message += `⚙️ *Настройки:* ${stars(data.settingsRating)}\n`;
      if (data.featuresToAdd) message += `\n🛠 *Что добавить:* \n${clean(data.featuresToAdd)}\n`;
      if (data.initialProblems) message += `\n❓ *Проблемы в начале:* \n${clean(data.initialProblems)}\n`;
    } else {
      message += `👤 *Опыт в EMDR:* Нет\n`;
      message += `🛑 *Почему не начал:* ${clean(data.stoppingReason, 120) || '-'}\n`;
      if (data.otherReason) message += `📝 *Другое:* ${clean(data.otherReason, 200)}\n`;
      if (data.whatWouldHelp) message += `\n💡 *Что помогло бы:* \n${clean(data.whatWouldHelp)}\n`;
    }

    if (!TELEGRAM_TOKEN || !CHAT_ID) {
      console.warn('[feedback] TELEGRAM_TOKEN/CHAT_ID не заданы, отзыв не доставлен:\n', message);
      return NextResponse.json({ success: true, delivered: false });
    }

    const tgUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    const response = await fetch(tgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'Markdown' })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error('Telegram API error:', errData);
      return NextResponse.json({ success: false, error: 'Telegram API error' }, { status: 500 });
    }

    return NextResponse.json({ success: true, delivered: true });
  } catch (error) {
    console.error('Feedback API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
