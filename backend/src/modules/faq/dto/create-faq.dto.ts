import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateFaqDto {
  @ApiProperty({ 
    description: 'Вопрос', 
    example: 'Что такое румбокс и чем он отличается от обычного конструктора?' 
  })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({ 
    description: 'Ответ', 
    example: 'Румбокс — это миниатюрная композиция...' 
  })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiPropertyOptional({ description: 'Порядок отображения', example: 0 })
  @IsNumber()
  @IsOptional()
  order?: number;
}

