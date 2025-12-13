import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { handleCallbackQuery } from './handlers/callback';
import { handleContact } from './handlers/contact';
import { handleOrder } from './handlers/order';
import { handleProducts } from './handlers/products';
import { handleStart } from './handlers/start';

import { setupCronJobs } from './articlePlanner/cronJobs';
import { ArticleScheduler } from './articlePlanner/scheduledArticles';
import { handleArticle, handleForDevelop, handleStats, initArticleService } from './handlers/articles';

dotenv.config();

const token = process.env.BOT_TOKEN;

if (!token) {
  console.error('❌ BOT_TOKEN не найден в .env файле');
  process.exit(1);
}

// Создаём экземпляр бота
const bot = new TelegramBot(token, { polling: true });

console.log('🤖 Telegram бот запущен успешно!');

// Инициализируем сервис статей
initArticleService(bot);

// Инициализируем планировщик статей
const articleScheduler = new ArticleScheduler(bot);

// Настраиваем крон-задачи
setupCronJobs(bot, articleScheduler);

// Команда /start
bot.onText(/\/start/, (msg) => handleStart(bot, msg));

// Команда /products - показать товары
bot.onText(/\/products/, (msg) => handleProducts(bot, msg));

// Команда /help - помощь
bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id,
    '📚 *Доступные команды:*\n\n' +
    '/start - Начать диалог\n' +
    '/products - Посмотреть товары\n' +
    '/contact - Связаться с нами\n' +
    '/help - Показать помощь' +
    '/article - Получить статью дня',
    { parse_mode: 'Markdown' }
  );
});

// Команда получить статью дня
bot.onText(/\/article/, async (msg) => handleArticle(bot, msg));

// Команда для тестирования статей (только для разработчика)
bot.onText(/\/test_article/, async (msg) => handleForDevelop(bot, msg));

// Команда для просмотра статистики
bot.onText(/\/stats/, async (msg) => handleStats(bot, msg));

// Команда /contact - связаться
bot.onText(/\/contact/, (msg) => handleContact(bot, msg));

// Обработка callback кнопок
bot.on('callback_query', (query) => handleCallbackQuery(bot, query));

// Обработка текстовых сообщений
bot.on('message', (msg) => {
  if (msg.text && !msg.text.startsWith('/')) {
    handleOrder(bot, msg);
  }
});

// Обработка ошибок
bot.on('polling_error', (error) => {
  console.error('❌ Ошибка polling:', error);
});


export default bot;

