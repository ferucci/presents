import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export interface TelegramMessage {
  chatId: string;
  text: string;
  parseMode?: 'HTML' | 'Markdown' | 'MarkdownV2';
  disableNotification?: boolean;
}

@Injectable()
export class TelegramNotifierService implements OnModuleInit {
  private readonly logger = new Logger(TelegramNotifierService.name);
  private botToken: string;
  private adminChatIds: string[];
  private isConfigured = false;

  constructor(private readonly configService: ConfigService) { }

  onModuleInit() {
    const botToken = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
    if (!botToken) {
      throw new Error('TELEGRAM_BOT_TOKEN is not defined');
    }
    this.botToken = botToken;
    const chatIds = this.configService.get<string>('TELEGRAM_ADMIN_CHAT_IDS');

    if (this.botToken && chatIds) {
      this.adminChatIds = chatIds.split(',').map(id => id.trim());
      this.isConfigured = true;
      this.logger.log('Telegram notifier configured successfully');
      this.logger.log(`Admin chats: ${this.adminChatIds.join(', ')}`);
    } else {
      this.logger.warn('Telegram bot token or admin chat IDs not configured. Notifications will not be sent.');
    }
  }

  private async sendToTelegram(chatId: string, text: string, parseMode: 'HTML' | 'Markdown' = 'HTML'): Promise<boolean> {
    if (!this.isConfigured) {
      this.logger.warn('Attempted to send Telegram notification but service is not configured');
      return false;
    }

    try {
      const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;

      const response = await axios.post(url, {
        chat_id: chatId,
        text,
        parse_mode: parseMode,
        disable_web_page_preview: true,
      });

      this.logger.log(`Notification sent to chat ${chatId}`);
      return response.data.ok;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to send Telegram notification to ${chatId}:`, errorMessage);
      return false;
    }
  }

  async notifyAdmins(text: string, parseMode: 'HTML' | 'Markdown' = 'HTML'): Promise<void> {
    if (!this.isConfigured) {
      return;
    }

    const promises = this.adminChatIds.map(chatId =>
      this.sendToTelegram(chatId, text, parseMode)
    );

    await Promise.allSettled(promises);
  }

  async notifySingleAdmin(chatId: string, text: string, parseMode: 'HTML' | 'Markdown' = 'HTML'): Promise<boolean> {
    return await this.sendToTelegram(chatId, text, parseMode);
  }

  // Специализированный метод для уведомлений о новых заявках
  async notifyNewContactRequest(contactData: {
    id: number;
    name: string;
    phone: string;
    email: string;
    message?: string;
    productName?: string;
    pageSource?: string;
    createdAt: Date;
    telegramChatId: string
  }): Promise<void> {
    const isFromTelegram = contactData.email === 'telegram@bot.com';
    const source = isFromTelegram ? 'Telegram Bot' : contactData.pageSource || 'Веб-сайт';

    const productInfo = contactData.productName ?
      `\n🛒 <b>Товар:</b> ${contactData.productName}` : '';

    const messageText = contactData.message ?
      `\n💬 <b>Сообщение:</b> ${contactData.message.substring(0, 200)}${contactData.message.length > 200 ? '...' : ''}` : '';

    const text = `
🚀 <b>НОВАЯ ЗАЯВКА #${contactData.id}</b>

👤 <b>Имя:</b> ${contactData.name}
📱 <b>Телефон:</b> <code>${contactData.phone}</code>
📧 <b>Email:</b> ${contactData.email}
📅 <b>Время:</b> ${new Date(contactData.createdAt).toLocaleString('ru-RU')}
🌐 <b>Источник:</b> ${source}${productInfo}${messageText}

⏰ <i>Заявка получена только что</i>
    `.trim();

    await this.notifyAdmins(text, 'HTML');
  }
}