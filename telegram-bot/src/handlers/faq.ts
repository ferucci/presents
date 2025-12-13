import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';

const API_URL = process.env.API_URL || 'http://localhost:3001';

interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export async function showFAQ(bot: TelegramBot, chatId: number) {
  try {
    await bot.sendMessage(chatId, '⏳ Загружаю FAQ...');

    const response = await axios.get<FAQ[]>(`${API_URL}/faq`);
    const faqs = response.data;

    if (faqs.length === 0) {
      bot.sendMessage(chatId, '😔 FAQ временно недоступны.');
      return;
    }

    bot.sendMessage(chatId, '❓ *Часто задаваемые вопросы:*', { parse_mode: 'Markdown' });

    // Показываем первые 5 вопросов
    for (const faq of faqs.slice(0, 5)) {
      const message = `
*${faq.question}*

${faq.answer}
      `.trim();

      bot.sendMessage(chatId, message, { parse_mode: 'Markdown' });
    }

    if (faqs.length > 5) {
      bot.sendMessage(chatId,
        `\n📚 Больше вопросов и ответов на сайте:\n` +
        `${process.env.SITE_URL}/faq`
      );
    }

    // Меню после FAQ
    setTimeout(() => {
      bot.sendMessage(chatId, 'Остались вопросы?', {
        reply_markup: {
          inline_keyboard: [
            [{ text: '📞 Связаться с менеджером', callback_data: 'contact_manager' }],
            [{ text: '◀️ Главное меню', callback_data: 'main_menu' }],
          ],
        },
      });
    }, 1000);

  } catch (error) {
    console.error('Ошибка загрузки FAQ:', error);
    bot.sendMessage(chatId, '❌ Ошибка загрузки FAQ. Попробуйте позже.');
  }
}

export function showGiftSelection(bot: TelegramBot, chatId: number) {
  const message = `
🎁 *Подбор подарка*

Помогу подобрать идеальный румбокс!

Ответьте на несколько вопросов:

1️⃣ *Для кого подарок?*
  `.trim();

  const keyboard = {
    inline_keyboard: [
      [
        { text: '👧 Для ребёнка', callback_data: 'gift_child' },
        { text: '👩 Для взрослого', callback_data: 'gift_adult' },
      ],
      [
        { text: '👨‍👩‍👧 Для семьи', callback_data: 'gift_family' },
      ],
      [
        { text: '◀️ Назад', callback_data: 'main_menu' },
      ],
    ],
  };

  bot.sendMessage(chatId, message, {
    parse_mode: 'Markdown',
    reply_markup: keyboard,
  });
}

