import cron from 'node-cron';
import { ArticleScheduler } from './scheduledArticles';

// Хранилище активных пользователей
const activeUsers = new Set<number>();

export function setupCronJobs(bot: any, articleScheduler: ArticleScheduler) {

  console.log('⏰ Настройка планировщика...');

  // Регистрация пользователя как активного при любом взаимодействии
  const registerUser = (userId: number) => {
    if (userId && !activeUsers.has(userId)) {
      activeUsers.add(userId);
      console.log(`👤 Зарегистрирован новый пользователь: ${userId}`);
    }
  };

  // Обработка всех сообщений
  bot.on('message', (msg: any) => {
    if (msg.chat?.id) {
      registerUser(msg.chat.id);
    }
  });

  // Обработка callback запросов
  bot.on('callback_query', (query: any) => {
    if (query.message?.chat?.id) {
      registerUser(query.message.chat.id);
    }
  });

  // Обработка inline запросов
  bot.on('inline_query', (query: any) => {
    if (query.from?.id) {
      registerUser(query.from.id);
    }
  });

  // Ежедневная отправка статей в 10:00 утра
  cron.schedule('0 10 * * *', async () => {
    console.log('⏰ Запуск ежедневной отправки статей в 10:00...');

    const usersArray = Array.from(activeUsers);
    console.log(`👥 Активных пользователей: ${usersArray.length}`);

    await articleScheduler.checkAndSendToAllUsers(usersArray);

    console.log('✅ Ежедневная рассылка завершена');
  }, {
    timezone: "Europe/Moscow"
  });

  // Тестовая отправка каждую минуту (для отладки)
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Для отладки - отправляем в определенные минуты
    if (currentMinute === 0 || currentMinute === 30) {
      console.log(`🕐 Тестовая проверка в ${currentHour}:${currentMinute}`);

      const usersArray = Array.from(activeUsers);
      if (usersArray.length > 0) {
        console.log(`👥 Активных пользователей для теста: ${usersArray.length}`);
        // Для теста отправляем только первому пользователю
        await articleScheduler.sendDailyArticle(usersArray[0]);
      }
    }
  });

  // Проверка каждый час на случай пропуска
  cron.schedule('0 * * * *', async () => {
    console.log('🔄 Ежечасная проверка...');

    const usersArray = Array.from(activeUsers);
    console.log(`👥 Всего активных пользователей: ${usersArray.length}`);
  });

  console.log('✅ Планировщик статей настроен');
}