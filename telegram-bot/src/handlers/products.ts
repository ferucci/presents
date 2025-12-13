import axios from 'axios';
import TelegramBot from 'node-telegram-bot-api';

const API_URL = process.env.API_URL || 'http://localhost:3001';

interface Product {
  id: number;
  name: string;
  price: string;
  priceValue: number;
  images: string[];
  features: string[];
  popular: boolean;
}

export async function handleProducts(bot: TelegramBot, msg: TelegramBot.Message) {
  const chatId = msg.chat.id;
  const loadingMessage = await bot.sendMessage(
    chatId,
    '⏳ Загружаю товары...'
  );
  try {


    const response = await axios.get<Product[]>(`${API_URL}/products`);
    const products = response.data;

    if (products.length === 0) {
      bot.sendMessage(chatId, '😔 К сожалению, товары временно недоступны.');
      return;
    }

    bot.sendMessage(chatId, '🛍 *Наши румбоксы:*', { parse_mode: 'Markdown' });

    for (const product of products.slice(0, 10)) {
      const message = formatProductMessage(product);
      const keyboard = {
        inline_keyboard: [
          [
            { text: '🛒 Заказать', callback_data: `order_${product.id}` },
            { text: '📝 Подробнее', callback_data: `details_${product.id}` },
          ],
        ],
      };

      bot.sendMessage(chatId, message, {
        parse_mode: 'Markdown',
        reply_markup: keyboard,
      });
    }

    // Удаляем сообщение о загрузке
    await bot.deleteMessage(chatId, loadingMessage.message_id).catch(() => { });

    if (products.length > 10) {
      bot.sendMessage(chatId, `\n📦 Всего товаров: ${products.length}\n\nПосмотреть все: https://first-present.ru/catalog`);
    }
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error);
    // Удаляем сообщение о загрузке
    await bot.deleteMessage(chatId, loadingMessage.message_id).catch(() => { });
    bot.sendMessage(chatId, '❌ Ошибка загрузки товаров. Попробуйте позже.');
  }
}

function formatProductMessage(product: Product): string {
  const popular = product.popular ? '⭐ *ПОПУЛЯРНЫЙ* ⭐\n\n' : '';
  const features = product.features.slice(0, 3).map(f => `  ✓ ${f}`).join('\n');

  return `
${popular}*${product.name}*

💰 Цена: *${product.price}*

Особенности:
${features}
  `.trim();
}

export async function handleProductDetails(bot: TelegramBot, chatId: number, productId: number) {
  try {
    const response = await axios.get<Product>(`${API_URL}/products/${productId}`);
    const product = response.data;

    const features = product.features.map(f => `  ✓ ${f}`).join('\n');
    const message = `
📦 *${product.name}*

💰 Цена: *${product.price}*

✨ *Что входит в набор:*
${features}

${product.popular ? '⭐ Это наш самый популярный товар!\n\n' : ''}
Хотите заказать этот румбокс?
    `.trim();

    const keyboard = {
      inline_keyboard: [
        [
          { text: '🛒 Да, заказать', callback_data: `order_${product.id}` },
          { text: '◀️ Назад к товарам', callback_data: 'show_products' },
        ],
      ],
    };

    bot.sendMessage(chatId, message, {
      parse_mode: 'Markdown',
      reply_markup: keyboard,
    });
  } catch (error) {
    bot.sendMessage(chatId, '❌ Ошибка загрузки товара.');
  }
}

