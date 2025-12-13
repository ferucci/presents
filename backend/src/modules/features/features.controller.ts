import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { FeaturesService } from './features.service';
import { CreateFeatureDto } from './dto/create-feature.dto';
import { UpdateFeatureDto } from './dto/update-feature.dto';
import { Feature } from './feature.entity';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';

@ApiTags('features')
@Controller('features')
export class FeaturesController {
  constructor(private readonly featuresService: FeaturesService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Получить все features (публичный)' })
  @ApiResponse({ status: 200, description: 'Список features успешно получен', type: [Feature] })
  async findAll(): Promise<Feature[]> {
    return this.featuresService.findAll();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Получить feature по ID (публичный)' })
  @ApiParam({ name: 'id', description: 'ID feature', type: Number })
  @ApiResponse({ status: 200, description: 'Feature успешно получен', type: Feature })
  @ApiResponse({ status: 404, description: 'Feature не найден' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Feature> {
    return this.featuresService.findOne(id);
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создать новый feature (только admin/moderator)' })
  @ApiResponse({ status: 201, description: 'Feature успешно создан', type: Feature })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async create(@Body() createFeatureDto: CreateFeatureDto): Promise<Feature> {
    return this.featuresService.create(createFeatureDto);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить feature (только admin/moderator)' })
  @ApiParam({ name: 'id', description: 'ID feature', type: Number })
  @ApiResponse({ status: 200, description: 'Feature успешно обновлен', type: Feature })
  @ApiResponse({ status: 404, description: 'Feature не найден' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFeatureDto: UpdateFeatureDto,
  ): Promise<Feature> {
    return this.featuresService.update(id, updateFeatureDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить feature (только admin)' })
  @ApiParam({ name: 'id', description: 'ID feature', type: Number })
  @ApiResponse({ status: 200, description: 'Feature успешно удален' })
  @ApiResponse({ status: 404, description: 'Feature не найден' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.featuresService.remove(id);
    return { message: `Feature с ID ${id} успешно удален` };
  }
}

