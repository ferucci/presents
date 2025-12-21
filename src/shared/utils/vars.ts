// Получаем имя бота из переменных окружения или используем значение по умолчанию
export const TELEGRAM_BOT_NAME = process.env.NEXT_PUBLIC_TELEGRAM_BOT;
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_BOT_NAME}`;