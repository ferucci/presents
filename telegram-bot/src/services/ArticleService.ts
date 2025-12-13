import TelegramBot from 'node-telegram-bot-api';
import { ArticleScheduler } from '../articlePlanner/scheduledArticles';

export class ArticleService {
  private articleScheduler: ArticleScheduler;
  private developerIds: number[];

  constructor(bot: TelegramBot) {
    this.articleScheduler = new ArticleScheduler(bot);
    this.developerIds = [Number(process.env.USERID)].filter(id => !isNaN(id));
  }

  /**
   * Получить статистику пользователя
   */
  public async getStats(chatId: number, userId?: number): Promise<string> {
    try {
      const stats = this.articleScheduler.getUserStats(chatId);

      return `📊 *Ваша статистика:*\n\n` +
        `📚 Прочитано статей: ${stats.readArticles}/${stats.totalArticles}\n` +
        `📈 Прогресс: ${stats.progressPercentage}%\n` +
        `📅 Последнее чтение: ${stats.lastReadDate || 'еще не читали'}\n` +
        `🔜 Следующая статья: #${stats.nextArticleId}\n\n` +
        `Используйте /article чтобы получить статью сейчас!`;
    } catch (error: unknown) {
      console.error('Ошибка получения статистики:', error);
      return '❌ Произошла ошибка при получении статистики. Попробуйте позже.';
    }
  }

  /**
   * Отправить ежедневную статью пользователю
   */
  public async sendDailyArticle(chatId: number): Promise<{
    success: boolean;
    message?: string;
    stats?: any;
  }> {
    try {
      console.log(`👤 Пользователь ${chatId} запросил статью вручную`);

      const sent = await this.articleScheduler.sendDailyArticle(chatId);

      if (!sent) {
        const stats = this.articleScheduler.getUserStats(chatId);

        if (stats.readArticles >= stats.totalArticles) {
          return {
            success: false,
            message: '🎉 Вы прочитали все наши статьи! Мы готовим новые материалы для вас.\n\n' +
              'А пока можете посмотреть наши товары или задать вопрос менеджеру!',
            stats
          };
        } else {
          return {
            success: false,
            message: '📖 Вы уже получили статью на сегодня. Завтра будет новая!\n\n' +
              `📊 Ваш прогресс: ${stats.readArticles}/${stats.totalArticles} статей прочитано`,
            stats
          };
        }
      }

      return { success: true };
    } catch (error: unknown) {
      console.error('Ошибка отправки статьи:', error);
      return {
        success: false,
        message: '❌ Произошла ошибка при отправке статьи. Попробуйте позже.'
      };
    }
  }

  /**
   * Для разработчиков: принудительная отправка статьи
   */
  public async sendTestArticle(chatId: number, userId?: number): Promise<{
    success: boolean;
    message: string;
    isDeveloper: boolean;
  }> {
    try {
      // Проверка на разработчика
      const isDeveloper = userId !== undefined && this.developerIds.includes(userId);

      if (!isDeveloper) {
        return {
          success: false,
          message: '⛔ Эта команда только для разработчиков',
          isDeveloper: false
        };
      }

      console.log(`🧪 Тестовая отправка статьи для разработчика ${userId}`);

      // Отправляем первую статью
      const success = await this.articleScheduler.sendSpecificArticle(chatId, 1);

      return {
        success,
        message: success ? '✅ Тестовая статья отправлена!' : '❌ Ошибка отправки тестовой статьи',
        isDeveloper: true
      };
    } catch (error: unknown) {
      console.error('Ошибка тестовой отправки:', error);
      return {
        success: false,
        message: '❌ Произошла ошибка при тестовой отправке',
        isDeveloper: userId !== undefined && this.developerIds.includes(userId)
      };
    }
  }

  /**
   * Получить список статей (для админ-панели)
   */
  public getArticlesList(): Array<{ id: number; title: string; hasImage: boolean }> {
    // Этот метод нужно будет реализовать в ArticleScheduler
    return this.articleScheduler['getArticlesList']?.() || [];
  }

  /**
   * Сбросить прогресс пользователя (для разработчиков)
   */
  public resetUserProgress(chatId: number, userId?: number): boolean {
    if (!userId || !this.developerIds.includes(userId)) {
      return false;
    }

    return this.articleScheduler['resetUserProgress']?.(chatId) || false;
  }
}