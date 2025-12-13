import TelegramBot from 'node-telegram-bot-api';
import { ArticleService } from '../services/ArticleService';

// Единый экземпляр сервиса на весь бот
let articleService: ArticleService | null = null;

/**
 * Инициализировать сервис статей
 */
export function initArticleService(bot: TelegramBot): ArticleService {
  if (!articleService) {
    articleService = new ArticleService(bot);
    console.log('📚 ArticleService инициализирован');
  }
  return articleService;
}

/**
 * Получить экземпляр сервиса
 */
export function getArticleService(): ArticleService {
  if (!articleService) {
    throw new Error('ArticleService не инициализирован. Сначала вызовите initArticleService()');
  }
  return articleService;
}

/**
 * Обработчик команды /stats
 */
export async function handleStats(bot: TelegramBot, msg: TelegramBot.Message) {
  try {
    const service = getArticleService();
    const statsMessage = await service.getStats(msg.chat.id, msg.from?.id);

    await bot.sendMessage(msg.chat.id, statsMessage, { parse_mode: 'Markdown' });
  } catch (error: unknown) {
    console.error('Ошибка в handleStats:', error);
    await bot.sendMessage(msg.chat.id, '❌ Произошла ошибка при получении статистики');
  }
}

/**
 * Обработчик команды /article
 */
export async function handleArticle(bot: TelegramBot, msg: TelegramBot.Message) {
  try {
    const service = getArticleService();
    const result = await service.sendDailyArticle(msg.chat.id);

    if (!result.success && result.message) {
      await bot.sendMessage(msg.chat.id, result.message, { parse_mode: 'Markdown' });
    }
  } catch (error: unknown) {
    console.error('Ошибка в handleArticle:', error);
    await bot.sendMessage(msg.chat.id, '❌ Произошла ошибка при отправке статьи');
  }
}

/**
 * Обработчик команды /test_article (для разработчиков)
 */
export async function handleForDevelop(bot: TelegramBot, msg: TelegramBot.Message) {
  try {
    const service = getArticleService();
    const result = await service.sendTestArticle(msg.chat.id, msg.from?.id);

    await bot.sendMessage(msg.chat.id, result.message);
  } catch (error: unknown) {
    console.error('Ошибка в handleForDevelop:', error);
    await bot.sendMessage(msg.chat.id, '❌ Произошла ошибка');
  }
}

/**
 * Обработчик команды /admin_stats (для разработчиков)
 */
export async function handleAdminStats(bot: TelegramBot, msg: TelegramBot.Message) {
  try {
    const service = getArticleService();
    const userId = msg.from?.id;

    // Проверка на разработчика
    const developerIds = [Number(process.env.USERID)].filter(id => !isNaN(id));
    const isDeveloper = userId !== undefined && developerIds.includes(userId);

    if (!isDeveloper) {
      await bot.sendMessage(msg.chat.id, '⛔ Эта команда только для разработчиков');
      return;
    }

    // Здесь можно добавить получение глобальной статистики
    const scheduler = (service as any).articleScheduler;
    const globalStats = scheduler.getGlobalStats?.();

    if (globalStats) {
      const message = `📊 *Глобальная статистика:*\n\n` +
        `👥 Всего пользователей: ${globalStats.totalUsers}\n` +
        `📰 Всего отправлено статей: ${globalStats.totalArticlesSent}\n` +
        `📈 Среднее на пользователя: ${globalStats.averageArticlesPerUser}`;

      await bot.sendMessage(msg.chat.id, message, { parse_mode: 'Markdown' });
    } else {
      await bot.sendMessage(msg.chat.id, 'Статистика временно недоступна');
    }
  } catch (error: unknown) {
    console.error('Ошибка в handleAdminStats:', error);
  }
}