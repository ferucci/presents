import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';

const API_URL = process.env.API_URL || 'http://localhost:3001';

interface OrderSession {
  productId?: number;
  productName?: string;
  step: 'product' | 'name' | 'phone' | 'confirm';
  name?: string;
  phone?: string;
}

const orderSessions: Map<number, OrderSession> = new Map();

export function handleOrder(bot: TelegramBot, msg: TelegramBot.Message) {
  const chatId = msg.chat.id;
  const session = orderSessions.get(chatId);

  if (!session) {
    // Если нет активной сессии, предлагаем выбрать товар
    bot.sendMessage(chatId,
      'Для оформления заказа сначала выберите товар командой /products',
      {
        reply_markup: {
          inline_keyboard: [
            [{ text: '🛍 Посмотреть товары', callback_data: 'show_products' }],
          ],
        },
      }
    );
    return;
  }

  // Обработка шагов заказа
  if (session.step === 'name') {
    session.name = msg.text;
    session.step = 'phone';
    bot.sendMessage(chatId,
      '📱 Отлично! Теперь укажите ваш номер телефона:\n\n' +
      'Например: +7 999 123-45-67'
    );
  } else if (session.step === 'phone') {
    session.phone = msg.text;
    session.step = 'confirm';

    const confirmMessage = `
✅ *Проверьте ваш заказ:*

📦 Товар: ${session.productName}
👤 Имя: ${session.name}
📱 Телефон: ${session.phone}

Всё верно?
    `.trim();

    bot.sendMessage(chatId, confirmMessage, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [
            { text: '✅ Да, всё верно', callback_data: 'confirm_order' },
            { text: '❌ Отменить', callback_data: 'cancel_order' },
          ],
        ],
      },
    });
  }
}

export function startOrderProcess(bot: TelegramBot, chatId: number, productId: number, productName: string) {
  orderSessions.set(chatId, {
    productId,
    productName,
    step: 'name',
  });

  bot.sendMessage(chatId,
    `🛒 *Оформление заказа*\n\n` +
    `Товар: *${productName}*\n\n` +
    `👤 Как вас зовут?`,
    { parse_mode: 'Markdown' }
  );
}

export async function confirmOrder(bot: TelegramBot, chatId: number) {
  const session = orderSessions.get(chatId);
  console.log('session in the order.ts==========', session)
  if (!session || !session.name || !session.phone) {
    bot.sendMessage(chatId, '❌ Ошибка: данные заказа не найдены.');
    return;
  }

  try {
    // Отправляем заявку на backend
    await axios.post(`${API_URL}/contact`, {
      name: session.name,
      phone: session.phone,
      email: 'telegram@bot.com', // Для telegram заказов
      message: `Заказ через Telegram бота: ${session.productName}`,
      productName: session.productName,
      pageSource: 'Telegram Bot',
    });

    bot.sendMessage(chatId,
      '🎉 *Заказ успешно оформлен!*\n\n' +
      `Наш менеджер свяжется с вами в ближайшее время по телефону: ${session.phone}\n\n` +
      `Спасибо за ваш заказ! 💝`,
      { parse_mode: 'Markdown' }
    );

    // Очищаем сессию
    orderSessions.delete(chatId);

    // Возвращаем главное меню
    setTimeout(() => {
      bot.sendMessage(chatId, 'Чем ещё могу помочь?', {
        reply_markup: {
          inline_keyboard: [
            [{ text: '🛍 Посмотреть товары', callback_data: 'show_products' }],
            [{ text: '📞 Связаться с менеджером', callback_data: 'contact_manager' }],
          ],
        },
      });
    }, 2000);

  } catch (error) {
    console.error('Ошибка отправки заказа:', error);
    bot.sendMessage(chatId,
      '❌ К сожалению, произошла ошибка при отправке заказа.\n\n' +
      'Пожалуйста, свяжитесь с нами напрямую:\n' +
      '📞 +7 (985) 165-55-85\n' +
      '📧 offers@usoltev.ru'
    );
  }
}

export function cancelOrder(bot: TelegramBot, chatId: number) {
  orderSessions.delete(chatId);
  bot.sendMessage(chatId, '❌ Заказ отменён. Чем могу помочь?', {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🛍 Посмотреть товары', callback_data: 'show_products' }],
        [{ text: '◀️ Главное меню', callback_data: 'main_menu' }],
      ],
    },
  });
}

