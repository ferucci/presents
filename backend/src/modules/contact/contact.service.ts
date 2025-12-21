import { TelegramNotifierService } from '@/common/services/telegram-notifier.service';
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { ContactRequest } from './contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private readonly TELEGRAM_BOT_EMAIL = 'telegram@bot.com';
  private readonly MAX_REQUESTS_PER_PERIOD = 3;
  private readonly SPAM_CHECK_PERIOD_MS = 15 * 60 * 1000;
  constructor(
    @InjectRepository(ContactRequest)
    private readonly contactRepository: Repository<ContactRequest>,
    private readonly telegramNotifier: TelegramNotifierService,
  ) { }


  // Умная проверка спама: для обычных email - по email, для телеграма - по chatId
  async checkSpam(email: string, telegramChatId?: string): Promise<void> {
    const fifteenMinutesAgo = new Date(Date.now() - this.SPAM_CHECK_PERIOD_MS);

    // Если это телеграм-заявка и есть chatId, проверяем по chatId
    if (email === this.TELEGRAM_BOT_EMAIL && telegramChatId) {
      await this.checkTelegramSpam(telegramChatId, fifteenMinutesAgo);
    } else {
      // Для обычных email проверяем по email
      await this.checkEmailSpam(email, fifteenMinutesAgo);
    }
  }

  private async checkEmailSpam(email: string, timeLimit: Date): Promise<void> {
    const recentRequests = await this.contactRepository.count({
      where: {
        email,
        createdAt: MoreThan(timeLimit),
      },
    });

    if (recentRequests >= this.MAX_REQUESTS_PER_PERIOD) {
      throw new BadRequestException(
        `Слишком много заявок с email ${email}. Пожалуйста, подождите 15 минут.`
      );
    }
  }

  private async checkTelegramSpam(telegramChatId: string, timeLimit: Date): Promise<void> {
    // Ищем в message поле информацию о chatId телеграма
    const recentRequests = await this.contactRepository
      .createQueryBuilder('contact')
      .where('contact.email = :email', { email: this.TELEGRAM_BOT_EMAIL })
      .andWhere('contact.createdAt > :timeLimit', { timeLimit })
      .andWhere('contact.message LIKE :chatIdPattern', {
        chatIdPattern: `%chatId:${telegramChatId}%`
      })
      .getCount();

    if (recentRequests >= this.MAX_REQUESTS_PER_PERIOD) {
      throw new BadRequestException(
        `Слишком много заявок с вашего Telegram-аккаунта. Пожалуйста, подождите 15 минут.`
      );
    }
  }

  async create(createContactDto: CreateContactDto, telegramChatId?: string): Promise<ContactRequest> {
    // Проверка на спам с учетом типа заявки
    await this.checkSpam(createContactDto.email, telegramChatId);

    // Для телеграм-заявок сохраняем chatId в message для последующей проверки
    if (createContactDto.email === this.TELEGRAM_BOT_EMAIL && telegramChatId) {
      if (!createContactDto.message) {
        createContactDto.message = '';
      }
      // Добавляем chatId в конец сообщения для отслеживания
      createContactDto.message += `\n\n[Telegram chatId: ${telegramChatId}]`;
    }

    // Создание заявки
    const contactRequest = this.contactRepository.create(createContactDto);
    const saved = await this.contactRepository.save(contactRequest);

    try {
      await this.telegramNotifier.notifyNewContactRequest({
        id: saved.id,
        name: saved.name,
        phone: saved.phone,
        email: saved.email,
        message: saved.message,
        productName: saved.productName,
        pageSource: saved.pageSource,
        createdAt: saved.createdAt,
        telegramChatId: telegramChatId
      });
      this.logger.log(`Уведомление отправлено для заявки #${saved.id}`);
    } catch (error) {
      // Логируем ошибку, но не прерываем выполнение
      this.logger.error('Не удалось отправить Telegram уведомление:', error.message);
      // Заявка уже сохранена, поэтому не выбрасываем исключение
    }

    return saved;
  }

  async findAll(): Promise<ContactRequest[]> {
    return await this.contactRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<ContactRequest> {
    const contact = await this.contactRepository.findOne({ where: { id } });

    if (!contact) {
      throw new NotFoundException(`Contact request with ID ${id} not found`);
    }

    return contact;
  }

  async updateStatus(id: number, status: string): Promise<ContactRequest> {
    const request = await this.findOne(id);
    if (!request) {
      throw new BadRequestException(`Заявка с ID ${id} не найдена`);
    }
    request.status = status;
    return await this.contactRepository.save(request);
  }
}

