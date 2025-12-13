import TelegramBot from 'node-telegram-bot-api';

export function handleContact(bot: TelegramBot, msg: TelegramBot.Message) {
  const chatId = msg.chat.id;

  const message = `
📞 *Контактная информация*

Будем рады ответить на ваши вопросы!

📱 *Телефон:* ${process.env.PHONE_COMPANY}
📧 *Email:* ${process.env.EMAIL_COMPANY}
📍 *Адрес:* ${process.env.ADDRESS_COMPANY}

⏰ *Режим работы:*
Пн-Пт: 9:00 - 21:00

🌐 *Сайт:* ${process.env.SITE_URL}

Выберите удобный способ связи! 😊
  `.trim();

  const keyboard = {
    inline_keyboard: [
      [
        { text: '📱 Позвонить', callback_data: 'show_phone' },
      ],
      // [
      //   { text: '📧 Написать email', url: 'mailto:offers@site.ru' },
      // ],
      [
        { text: '🌐 Открыть сайт', url: `${process.env.SITE_URL}` },
      ],
      [
        { text: '◀️ Главное меню', callback_data: 'main_menu' },
      ],
    ],
  };

  bot.sendMessage(chatId, message, {
    parse_mode: 'Markdown',
    reply_markup: keyboard,
  });
}

