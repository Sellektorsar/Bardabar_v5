import { serve } from 'std/http/server.ts';

/**
 * Supabase Edge Function: notify_telegram
 * Вызывается триггером insert на таблице бронирований (table_bookings).
 * Отправляет сообщение в Telegram-чат о новом бронировании.
 * Параметры окружения:
 *   TELEGRAM_BOT_TOKEN  – токен Telegram-бота
 *   TELEGRAM_CHAT_ID    – ID чата (группы/канала) для уведомлений
 */
serve(async (req: Request) => {
  try {
    // Тело запроса, отправляемое триггером – содержит объект record
    const { record } = await req.json();

    const botToken = Deno.env.get('TELEGRAM_BOT_TOKEN');
    const chatId = Deno.env.get('TELEGRAM_CHAT_ID');

    if (!botToken || !chatId) {
      console.error('TELEGRAM_* env vars not set');
      return new Response('Telegram env vars not configured', { status: 500 });
    }

    // Формируем текст сообщения
    const message =
      `🍽 Новое бронирование\n` +
      `Имя: ${record.name}\n` +
      `Дата: ${record.date} ${record.time}\n` +
      `Гостей: ${record.guests}\n` +
      `Телефон: ${record.phone}`;

    const tgResp = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const tgData = await tgResp.json();

    if (!tgData.ok) {
      console.error('Telegram API error', tgData);
      return new Response('Telegram API error', { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('notify_telegram error', error);
    return new Response(JSON.stringify({ error: 'Internal error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
