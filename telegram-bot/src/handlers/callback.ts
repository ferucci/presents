import TelegramBot from 'node-telegram-bot-api';
import { getProduct } from '../shared/api';
import { getArticleService } from './articles';
import { showFAQ, showGiftSelection } from './faq';
import { cancelOrder, confirmOrder, startOrderProcess } from './order';
import { handleProductDetails, handleProducts } from './products';
import { handleStart } from './start';

export async function handleCallbackQuery(bot: TelegramBot, query: TelegramBot.CallbackQuery) {
  try {
    const chatId = query.message!.chat.id;
    const data = query.data!;

    if (!chatId || !data) return;

    // Подтверждаем получение callback
    bot.answerCallbackQuery(query.id);

    // Обработка разных callback данных
    if (data === 'show_products') {
      handleProducts(bot, query.message!);
    }
    else if (data === 'show_faq') {
      showFAQ(bot, chatId);
    }
    else if (data === 'gift_selection') {
      showGiftSelection(bot, chatId);
    }
    else if (data === 'contact_manager') {
      bot.sendMessage(chatId,
        '📞 *Связаться с нами:*\n\n' +
        '📱 Телефон: ' + process.env.PHONE_COMPANY + '\n' +
        '📧 Email: \n' + process.env.EMAIL_COMPANY + '\n' +
        '📍 Адрес:' + process.env.ADDRESS_COMPANY + '\n\n' +
        '⏰ Режим работы: Пн-Пт 9:00 - 21:00\n\n' +
        'Наши менеджеры с радостью ответят на все ваши вопросы! 😊',
        { parse_mode: 'Markdown' }
      );
    }
    else if (data === 'main_menu') {
      handleStart(bot, query.message!);
    }
    else if (data.startsWith('details_')) {
      const productId = parseInt(data.split('_')[1]);
      handleProductDetails(bot, chatId, productId);
    }
    else if (data.startsWith('order_')) {
      const productId = parseInt(data.split('_')[1]);
      // Логи, дальше заменить на анимацию
      const tempMessage = await bot.sendMessage(chatId, '⏳ Загружаю информацию о товаре...');

      try {
        const res = await getProduct(productId);
        const productName = res.name;
        startOrderProcess(bot, chatId, productId, productName);
        // Удаляем сообщение о загрузке при успехе
        await bot.deleteMessage(chatId, tempMessage.message_id).catch(() => { });
      } catch (error) {
        console.error('Ошибка загрузки товара:', error);
        // Удаляем сообщение о загрузке
        await bot.deleteMessage(chatId, tempMessage.message_id).catch(() => { });
        bot.sendMessage(chatId, '❌ Ошибка загрузки товара. Попробуйте позже.');
      }


    }
    else if (data === 'confirm_order') {
      confirmOrder(bot, chatId);
    }
    else if (data === 'cancel_order') {
      cancelOrder(bot, chatId);
    }
    else if (data === 'show_phone') {
      bot.sendMessage(chatId,
        `📞 *Номер телефона:*\n` +
        process.env.PHONE_COMPANY + '\n\n' +
        `_Нажмите на номер, чтобы скопировать_`,
        {
          parse_mode: 'Markdown',
          reply_markup: {
            inline_keyboard: [[
              { text: '◀️ Назад', callback_data: 'back_to_contacts' }
            ]]
          }
        }
      );
    }

    else if (data === 'back_to_contacts') {
      // Здесь можно вернуться к контактам
      // или просто удалить сообщение
      bot.deleteMessage(chatId!, query.message?.message_id!);
    }

    else if (data === 'daily_article') {
      const service = getArticleService();
      const result = await service.sendDailyArticle(chatId);

      if (!result.success && result.message) {
        await bot.sendMessage(chatId, result.message, { parse_mode: 'Markdown' });
      }

      // Уведомляем, что кнопка нажата
      await bot.answerCallbackQuery(query.id, { text: '✅ Статья отправлена!' });
      return;
    }
  } catch (error: unknown) {
    console.error('Ошибка в handleCallbackQuery:', error);
    try {
      await bot.answerCallbackQuery(query.id, { text: '❌ Произошла ошибка' });
    } catch (e) {
      // Игнорируем ошибку ответа на callback
    }
  }


}

