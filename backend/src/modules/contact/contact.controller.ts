import { BadRequestException, Body, Controller, Get, Headers, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';
import { ContactRequest } from './contact.entity';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@ApiTags('contact')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) { }

  @Public()
  @Post()
  @Throttle({ default: { limit: 5, ttl: 60000 } }) // 5 запросов в минуту
  @ApiOperation({ summary: 'Отправить заявку (публичный)' })
  @ApiHeader({
    name: 'X-Telegram-ChatId',
    description: 'ID чата Telegram (только для заявок из Telegram)',
    required: false,
  })
  @ApiResponse({
    status: 201,
    description: 'Заявка успешно отправлена',
    type: ContactRequest
  })
  @ApiResponse({
    status: 400,
    description: 'Некорректные данные или превышен лимит заявок'
  })
  @ApiResponse({
    status: 429,
    description: 'Слишком много запросов. Попробуйте позже.'
  })
  async create(
    @Body() createContactDto: CreateContactDto,
    @Headers('X-Telegram-ChatId') telegramChatId?: string,
  ): Promise<{
    success: boolean;
    message: string;
    data?: ContactRequest;
  }> {
    // Проверяем, что для телеграм-заявок chatId обязателен
    if (createContactDto.email === 'telegram@bot.com' && !telegramChatId) {
      throw new BadRequestException(
        'Для Telegram-заявок обязателен заголовок X-Telegram-ChatId'
      );
    }

    const request = await this.contactService.create(createContactDto, telegramChatId);
    return {
      success: true,
      message: 'Спасибо! Мы свяжемся с вами в ближайшее время.',
      data: request,
    };
  }

  @Get()
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить все заявки (только admin/moderator)' })
  @ApiResponse({ status: 200, type: [ContactRequest] })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async findAll(): Promise<ContactRequest[]> {
    return this.contactService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить заявку по ID (только admin/moderator)' })
  @ApiParam({ name: 'id', description: 'ID заявки', type: Number })
  @ApiResponse({ status: 200, type: ContactRequest })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ContactRequest> {
    return this.contactService.findOne(id);
  }

  @Put(':id/status')
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить статус заявки (только admin/moderator)' })
  @ApiParam({ name: 'id', description: 'ID заявки', type: Number })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: string,
  ): Promise<ContactRequest> {
    return this.contactService.updateStatus(id, status);
  }
}

