import { IsString, IsNotEmpty, IsArray, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateServiceDto {
  @ApiProperty({ description: 'Иконка (эмодзи)', example: '🎁' })
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ApiProperty({ description: 'Название услуги', example: 'Подарочная упаковка' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ 
    description: 'Описание услуги', 
    example: 'Элегантная упаковка с лентами и именной открыткой.' 
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Цена', example: 'от 999 ₽' })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({ 
    description: 'Список возможностей', 
    type: [String],
    example: ['Премиальная коробка', 'Именная открытка']
  })
  @IsArray()
  @IsString({ each: true })
  features: string[];

  @ApiProperty({ description: 'Градиент для стиля', example: 'gradient1' })
  @IsString()
  @IsNotEmpty()
  gradient: string;

  @ApiPropertyOptional({ description: 'Порядок отображения', example: 0 })
  @IsNumber()
  @IsOptional()
  order?: number;
}

