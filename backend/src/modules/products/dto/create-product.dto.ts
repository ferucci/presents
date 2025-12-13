import { IsString, IsNotEmpty, IsArray, IsBoolean, IsOptional, IsNumber, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Название продукта', example: 'Волшебный книжный дом' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ 
    description: 'Массив URL изображений', 
    type: [String],
    example: ['/images/products/product-1.jpg', '/images/products/product-1_2.jpg']
  })
  @IsArray()
  @IsString({ each: true })
  images: string[];

  @ApiProperty({ description: 'Цена в формате строки', example: '5200 руб' })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({ description: 'Числовое значение цены', example: 5200 })
  @IsNumber()
  @Min(0)
  priceValue: number;

  @ApiPropertyOptional({ description: 'Период (если есть)', example: '' })
  @IsString()
  @IsOptional()
  period?: string;

  @ApiProperty({ 
    description: 'Список особенностей продукта', 
    type: [String],
    example: ['Светящиеся элементы', 'Ручная роспись']
  })
  @IsArray()
  @IsString({ each: true })
  features: string[];

  @ApiProperty({ description: 'Является ли товар популярным', example: true })
  @IsBoolean()
  popular: boolean;

  @ApiPropertyOptional({ 
    description: 'Доступные цвета', 
    type: [String],
    example: ['Красный', 'Золотой', 'Синий']
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  colors?: string[];

  @ApiPropertyOptional({ 
    description: 'Атрибуты товара', 
    type: [String],
    example: ['Светящиеся элементы', 'Прочные материалы']
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  attributes?: string[];

  @ApiPropertyOptional({ 
    description: 'Функциональность товара', 
    type: [String],
    example: ['Подсветка', 'Детализированный интерьер']
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  functionality?: string[];
}

