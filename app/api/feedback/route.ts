import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_TOKEN = 'TOKEN_REMOVED';
const CHAT_ID = 'ID_REMOVED';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    let message = `🔔 *Новый отзыв NeuroEMDR*\n\n`;
    
    if (data.hasTherapy === 'yes') {
      message += `👤 *Опыт в EMDR:* Да\n`;
      message += `✨ *Визуал:* ${'⭐'.repeat(data.visualRating)}\n`;
      message += `⚙️ *Настройки:* ${'⭐'.repeat(data.settingsRating)}\n`;
      if (data.featuresToAdd) message += `\n🛠 *Что добавить:* \n${data.featuresToAdd}\n`;
      if (data.initialProblems) message += `\n❓ *Проблемы в начале:* \n${data.initialProblems}\n`;
    } else {
      message += `👤 *Опыт в EMDR:* Нет\n`;
      message += `🛑 *Почему не начал:* ${data.stoppingReason}\n`;
      if (data.otherReason) message += `📝 *Другое:* ${data.otherReason}\n`;
      if (data.whatWouldHelp) message += `\n💡 *Что помогло бы:* \n${data.whatWouldHelp}\n`;
    }

    const tgUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    
    const response = await fetch(tgUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errData = await response.json();
      console.error('Telegram API error:', errData);
      return NextResponse.json({ success: false, error: 'Telegram API error' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Feedback API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
