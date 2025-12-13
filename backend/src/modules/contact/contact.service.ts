import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
import { ContactRequest } from './contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactRequest)
    private readonly contactRepository: Repository<ContactRequest>,
  ) { }

  // Защита от спама: проверка количества заявок с одного email за последние 15 минут
  async checkSpam(email: string): Promise<void> {
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

    const recentRequests = await this.contactRepository.count({
      where: {
        email,
        createdAt: MoreThan(fifteenMinutesAgo),
      },
    });

    if (recentRequests >= 3) {
      throw new BadRequestException(
        'Слишком много заявок с этого email адреса. Пожалуйста, подождите 15 минут.'
      );
    }
  }

  async create(createContactDto: CreateContactDto): Promise<ContactRequest> {
    // Проверка на спам
    await this.checkSpam(createContactDto.email);

    // Создание заявки
    const contactRequest = this.contactRepository.create(createContactDto);
    const saved = await this.contactRepository.save(contactRequest);

    // Здесь можно добавить отправку email уведомления администратору
    // await this.emailService.sendNewContactNotification(saved);

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

