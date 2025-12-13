import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { FaqService } from './faq.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { Faq } from './faq.entity';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';

@ApiTags('faq')
@Controller('faq')
export class FaqController {
  constructor(private readonly faqService: FaqService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Получить все FAQ (публичный)' })
  @ApiResponse({ status: 200, description: 'Список FAQ успешно получен', type: [Faq] })
  async findAll(): Promise<Faq[]> {
    return this.faqService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Получить FAQ по ID (публичный)' })
  @ApiParam({ name: 'id', description: 'ID FAQ', type: Number })
  @ApiResponse({ status: 200, description: 'FAQ успешно получен', type: Faq })
  @ApiResponse({ status: 404, description: 'FAQ не найден' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Faq> {
    return this.faqService.findOne(id);
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создать новый FAQ (только admin/moderator)' })
  @ApiResponse({ status: 201, description: 'FAQ успешно создан', type: Faq })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async create(@Body() createFaqDto: CreateFaqDto): Promise<Faq> {
    return this.faqService.create(createFaqDto);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить FAQ (только admin/moderator)' })
  @ApiParam({ name: 'id', description: 'ID FAQ', type: Number })
  @ApiResponse({ status: 200, description: 'FAQ успешно обновлен', type: Faq })
  @ApiResponse({ status: 404, description: 'FAQ не найден' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFaqDto: UpdateFaqDto,
  ): Promise<Faq> {
    return this.faqService.update(id, updateFaqDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить FAQ (только admin)' })
  @ApiParam({ name: 'id', description: 'ID FAQ', type: Number })
  @ApiResponse({ status: 200, description: 'FAQ успешно удален' })
  @ApiResponse({ status: 404, description: 'FAQ не найден' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.faqService.remove(id);
    return { message: `FAQ с ID ${id} успешно удален` };
  }
}

