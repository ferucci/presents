import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAboutStatsDto {
  @ApiProperty({ description: 'Число (статистика)', example: '5' })
  @IsString()
  @IsNotEmpty()
  number: string;

  @ApiProperty({ description: 'Описание', example: 'Уникальных дизайнов' })
  @IsString()
  @IsNotEmpty()
  label: string;

  @ApiPropertyOptional({ description: 'Порядок отображения', example: 0 })
  @IsNumber()
  @IsOptional()
  order?: number;
}

export class CreateAboutTeamDto {
  @ApiProperty({ description: 'Имя', example: 'Мария' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Роль', example: 'Основатель и мастер' })
  @IsString()
  @IsNotEmpty()
  role: string;

  @ApiProperty({ 
    description: 'Описание', 
    example: 'Создает уникальные дизайны и следит за качеством...' 
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Иконка', example: '👩‍🎨' })
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ApiPropertyOptional({ description: 'Порядок отображения', example: 0 })
  @IsNumber()
  @IsOptional()
  order?: number;
}

export class CreateAboutValuesDto {
  @ApiProperty({ description: 'Иконка', example: '🎨' })
  @IsString()
  @IsNotEmpty()
  icon: string;

  @ApiProperty({ description: 'Заголовок', example: 'Творчество' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ 
    description: 'Описание', 
    example: 'Каждый румбокс — это произведение искусства...' 
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({ description: 'Порядок отображения', example: 0 })
  @IsNumber()
  @IsOptional()
  order?: number;
}

