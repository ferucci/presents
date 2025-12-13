import TelegramBot from 'node-telegram-bot-api';

// Пример базы данных статей (без изображений или с корректными URL)
const articlesDatabase = [
  {
    id: 1,
    title: '📚 Как выбрать идеальный румбокс',
    content: `
✨ *Советы по выбору румбокса:*

1. **Тематика** - Выбирайте мир, который близок получателю
2. **Размер** - От мини (10x10см) до больших (30x30см)
3. **Детализация** - Чем больше деталей, тем интереснее
4. **Освещение** - LED-подсветка создает волшебную атмосферу

Каждый наш румбокс сделан с любовью и вниманием к деталям! 🎨
    `,
    imageUrl: 'https://avatarko.ru/kartinka/301'
  },
  {
    id: 2,
    title: '🎁 Идеи подарков для книголюбов',
    content: `
📖 *Что подарить любителю книг?*

• **Румбокс по любимой книге** - персонализированный подарок
• **Книжная полка-домик** - стильный аксессуар
• **Литературные свечи** - аромат старой библиотеки
• **BookNook** - миниатюрный книжный коридор

Наши румбоксы - это не просто подарок, это целый мир в миниатюре! ✨
    `,
    imageUrl: ''
  },
  {
    id: 3,
    title: '🏡 Уход за румбоксом',
    content: `
🧹 *Как ухаживать за румбоксом:*

1. **Очистка от пыли** - используйте мягкую кисточку
2. **Избегайте влаги** - не ставьте в ванной или кухне
3. **Прямые солнечные лучи** - могут выцветать детали
4. **Дети и животные** - размещайте на безопасной высоте

При правильном уходе румбокс будет радовать годами! 🌟
    `
  },
  // Добавьте больше статей...
];

// Хранилище для отслеживания отправленных статей
const userProgress = new Map<number, {
  lastArticleId: number;
  lastSentDate: string;
}>();

export class ArticleScheduler {
  private bot: TelegramBot;

  constructor(bot: TelegramBot) {
    this.bot = bot;
  }

  // Получить текущую дату в формате YYYY-MM-DD
  private getCurrentDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  // Получить следующую статью для пользователя
  private getNextArticle(userId: number) {
    const progress = userProgress.get(userId);
    const lastArticleId = progress?.lastArticleId || 0;

    // Если пользователь прочитал все статьи, начинаем сначала
    const nextId = lastArticleId >= articlesDatabase.length ? 1 : lastArticleId + 1;

    return articlesDatabase.find(article => article.id === nextId);
  }

  // Отправить статью пользователю
  public async sendDailyArticle(userId: number): Promise<boolean> {
    try {
      const currentDate = this.getCurrentDate();
      const progress = userProgress.get(userId);

      // Проверяем, отправляли ли сегодня статью
      if (progress?.lastSentDate === currentDate) {
        console.log(`📝 Статья уже отправлена пользователю ${userId} сегодня`);
        return false;
      }

      // Получаем следующую статью
      const article = this.getNextArticle(userId);

      if (!article) {
        console.error(`❌ Не найдена статья для пользователя ${userId}`);
        return false;
      }

      // Формируем сообщение
      let message = `📰 *${article.title}*\n\n${article.content}\n\n`;
      message += `---\n`;
      message += `_Статья ${article.id}/${articlesDatabase.length}_\n`;
      message += `_Завтра ждите новую статью!_ 📖`;

      // Проверяем наличие корректного URL изображения
      const hasValidImage = article.imageUrl &&
        (article.imageUrl.startsWith('http://') ||
          article.imageUrl.startsWith('https://'));

      if (hasValidImage) {
        try {
          await this.bot.sendPhoto(userId, article.imageUrl, {
            caption: message,
            parse_mode: 'Markdown'
          });
        } catch (photoError) {
          console.warn(`⚠️ Не удалось отправить фото, отправляем только текст`);
          await this.bot.sendMessage(userId, message, {
            parse_mode: 'Markdown'
          });
        }
      } else {
        // Отправляем только текст
        await this.bot.sendMessage(userId, message, {
          parse_mode: 'Markdown'
        });
      }

      // Обновляем прогресс пользователя
      userProgress.set(userId, {
        lastArticleId: article.id,
        lastSentDate: currentDate
      });

      console.log(`✅ Отправлена статья "${article.title}" пользователю ${userId}`);
      return true;

    } catch (error) {
      if (error instanceof Error) {
        console.error(`❌ Ошибка отправки статьи пользователю ${userId}:`, error.message);
      } else {
        console.error(`❌ Неизвестная ошибка отправки статьи пользователю ${userId}:`, error);
      }
      return false;
    }
  }

  // Проверить и отправить статьи всем активным пользователям
  public async checkAndSendToAllUsers(activeUsers: number[]): Promise<void> {
    console.log(`🔍 Проверка ежедневных статей для ${activeUsers.length} пользователей...`);

    let sentCount = 0;
    let errorCount = 0;

    for (const userId of activeUsers) {
      try {
        const sent = await this.sendDailyArticle(userId);
        if (sent) sentCount++;

        // Небольшая задержка между отправками
        await new Promise(resolve => setTimeout(resolve, 50));
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error(`❌ Ошибка отправки статьи пользователю ${userId}:`, error.message);
        } else {
          console.error(`❌ Неизвестная ошибка отправки статьи пользователю ${userId}:`, error);
        }
        return;
      }
    }

    console.log(`📊 Результат: ${sentCount} отправлено, ${errorCount} ошибок`);
  }

  // Ручная отправка статьи (для админа)
  public async sendSpecificArticle(userId: number, articleId: number): Promise<boolean> {
    const article = articlesDatabase.find(a => a.id === articleId);

    if (!article) {
      console.error(`❌ Статья с ID ${articleId} не найдена`);
      return false;
    }

    let message = `📰 *${article.title}*\n\n${article.content}`;

    try {
      // Проверяем валидность URL изображения
      const hasValidImage = article.title &&
        (article.title.startsWith('http://') ||
          article.title.startsWith('https://'));

      if (hasValidImage) {
        try {
          await this.bot.sendPhoto(userId, article.title, {
            caption: message,
            parse_mode: 'Markdown'
          });
        } catch (photoError) {
          console.warn(`⚠️ Не удалось отправить фото, отправляем текст`);
          await this.bot.sendMessage(userId, message, {
            parse_mode: 'Markdown'
          });
        }
      } else {
        await this.bot.sendMessage(userId, message, {
          parse_mode: 'Markdown'
        });
      }

      return true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`❌ Ошибка отправки статьи пользователю ${userId}:`, error.message);
      } else {
        console.error(`❌ Неизвестная ошибка отправки статьи пользователю ${userId}:`, error);
      }
      return false;
    }
  }

  // Получить статистику для пользователя
  public getUserStats(userId: number) {
    const progress = userProgress.get(userId);
    const totalArticles = articlesDatabase.length;
    const readArticles = progress ? progress.lastArticleId : 0;

    return {
      readArticles,
      totalArticles,
      progressPercentage: totalArticles > 0 ? Math.round((readArticles / totalArticles) * 100) : 0,
      lastReadDate: progress?.lastSentDate,
      nextArticleId: readArticles >= totalArticles ? 1 : readArticles + 1
    };
  }

  public getArticlesList(): Array<{ id: number; title: string; hasImage: boolean }> {
    return articlesDatabase.map(article => ({
      id: article.id,
      title: article.title,
      hasImage: !!(article.imageUrl &&
        (article.imageUrl.startsWith('http://') ||
          article.imageUrl.startsWith('https://')))
    }));
  }

  public resetUserProgress(userId: number): boolean {
    try {
      userProgress.delete(userId);
      console.log(`🔄 Прогресс пользователя ${userId} сброшен`);
      return true;
    } catch (error: unknown) {
      console.error('Ошибка сброса прогресса:', error);
      return false;
    }
  }

  /**
   * Получить статью по ID
   */
  public getArticleById(articleId: number) {
    return articlesDatabase.find(article => article.id === articleId);
  }

  /**
   * Получить общую статистику
   */
  public getGlobalStats() {
    const totalUsers = userProgress.size;
    const totalArticlesSent = Array.from(userProgress.values())
      .reduce((sum, progress) => sum + progress.lastArticleId, 0);

    return {
      totalUsers,
      totalArticlesSent,
      averageArticlesPerUser: totalUsers > 0 ? (totalArticlesSent / totalUsers).toFixed(2) : '0'
    };
  }
}