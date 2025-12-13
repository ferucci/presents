import TelegramBot from 'node-telegram-bot-api';

export function handleStart(bot: TelegramBot, msg: TelegramBot.Message) {
  const chatId = msg.chat.id;
  const firstName = msg.from?.first_name || 'друг';

  const welcomeMessage = `
👋 Привет, ${firstName}!

Я бот магазина румбоксов *"First Present"* - миниатюрных миров из ваших любимых книг!

🎁 *Что я могу:*
• Показать наши товары
• Помочь с выбором подарка
• Ответить на вопросы
• Принять заказ
• Связать вас с менеджером
• Присылать полезные статьи каждый день

Что вас интересует?
  `;

  const keyboard = {
    inline_keyboard: [
      [
        { text: '🛍 Посмотреть товары', callback_data: 'show_products' },
      ],
      [
        { text: '📰 Статья дня', callback_data: 'daily_article' },
      ],
      [
        { text: '❓ Часто задаваемые вопросы', callback_data: 'show_faq' },
      ],
      [
        { text: '🎁 Подобрать подарок', callback_data: 'gift_selection' },
      ],
      [
        { text: '📞 Связаться с менеджером', callback_data: 'contact_manager' },
      ],
    ],
  };

  bot.sendMessage(chatId, welcomeMessage, {
    parse_mode: 'Markdown',
    reply_markup: keyboard,
  });
}

