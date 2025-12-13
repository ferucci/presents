import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service } from './service.entity';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';

@ApiTags('services')
@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Получить все услуги (публичный)' })
  @ApiResponse({ status: 200, description: 'Список услуг успешно получен', type: [Service] })
  async findAll(): Promise<Service[]> {
    return this.servicesService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Получить услугу по ID (публичный)' })
  @ApiParam({ name: 'id', description: 'ID услуги', type: Number })
  @ApiResponse({ status: 200, description: 'Услуга успешно получена', type: Service })
  @ApiResponse({ status: 404, description: 'Услуга не найдена' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Service> {
    return this.servicesService.findOne(id);
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создать новую услугу (только admin/moderator)' })
  @ApiResponse({ status: 201, description: 'Услуга успешно создана', type: Service })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async create(@Body() createServiceDto: CreateServiceDto): Promise<Service> {
    return this.servicesService.create(createServiceDto);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить услугу (только admin/moderator)' })
  @ApiParam({ name: 'id', description: 'ID услуги', type: Number })
  @ApiResponse({ status: 200, description: 'Услуга успешно обновлена', type: Service })
  @ApiResponse({ status: 404, description: 'Услуга не найдена' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ): Promise<Service> {
    return this.servicesService.update(id, updateServiceDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить услугу (только admin)' })
  @ApiParam({ name: 'id', description: 'ID услуги', type: Number })
  @ApiResponse({ status: 200, description: 'Услуга успешно удалена' })
  @ApiResponse({ status: 404, description: 'Услуга не найдена' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.servicesService.remove(id);
    return { message: `Услуга с ID ${id} успешно удалена` };
  }
}

