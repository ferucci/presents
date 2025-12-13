import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/entities/user.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Получить все продукты (публичный)' })
  @ApiResponse({ status: 200, description: 'Список продуктов успешно получен', type: [Product] })
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Public()
  @Get('popular')
  @ApiOperation({ summary: 'Получить популярные продукты (публичный)' })
  @ApiResponse({ status: 200, description: 'Популярные продукты успешно получены', type: [Product] })
  async findPopular(): Promise<Product[]> {
    return this.productsService.findPopular();
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Получить продукт по ID (публичный)' })
  @ApiParam({ name: 'id', description: 'ID продукта', type: Number })
  @ApiResponse({ status: 200, description: 'Продукт успешно получен', type: Product })
  @ApiResponse({ status: 404, description: 'Продукт не найден' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создать новый продукт (только admin/moderator)' })
  @ApiResponse({ status: 201, description: 'Продукт успешно создан', type: Product })
  @ApiResponse({ status: 400, description: 'Некорректные данные' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Put(':id')
  @Roles(UserRole.ADMIN, UserRole.MODERATOR)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить продукт (только admin/moderator)' })
  @ApiParam({ name: 'id', description: 'ID продукта', type: Number })
  @ApiResponse({ status: 200, description: 'Продукт успешно обновлен', type: Product })
  @ApiResponse({ status: 404, description: 'Продукт не найден' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить продукт (только admin)' })
  @ApiParam({ name: 'id', description: 'ID продукта', type: Number })
  @ApiResponse({ status: 200, description: 'Продукт успешно удален' })
  @ApiResponse({ status: 404, description: 'Продукт не найден' })
  @ApiResponse({ status: 401, description: 'Не авторизован' })
  @ApiResponse({ status: 403, description: 'Недостаточно прав' })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    await this.productsService.remove(id);
    return { message: `Продукт с ID ${id} успешно удален` };
  }
}

