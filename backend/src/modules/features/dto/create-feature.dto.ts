import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFeatureDto {
  @ApiProperty({ description: 'Иконка (эмодзи)', example: '🧠' })
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ApiProperty({ description: 'Заголовок', example: 'Развитие моторики и интеллекта' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ 
    description: 'Описание', 
    example: 'Сборка мелких деталей тренирует ловкость пальцев...' 
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ description: 'Порядок отображения', example: 0 })
  @IsNumber()
  @IsOptional()
  order?: number;
}

