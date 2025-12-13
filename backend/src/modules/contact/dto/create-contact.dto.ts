import { IsString, IsNotEmpty, IsEmail, IsOptional, MinLength, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({ description: 'Имя', example: 'Иван Иванов' })
  @IsString()
  @IsNotEmpty({ message: 'Имя обязательно' })
  @MinLength(2, { message: 'Имя должно содержать минимум 2 символа' })
  @MaxLength(100, { message: 'Имя слишком длинное' })
  name: string;

  @ApiProperty({ description: 'Email', example: 'example@yandex.ru' })
  @IsEmail({}, { message: 'Некорректный email адрес' })
  @IsNotEmpty({ message: 'Email обязателен' })
  email: string;

  @ApiPropertyOptional({ description: 'Телефон', example: '+7 (999) 123-45-67' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ description: 'Сообщение', example: 'Хочу заказать румбокс...' })
  @IsString()
  @IsNotEmpty({ message: 'Сообщение обязательно' })
  @MinLength(10, { message: 'Сообщение должно содержать минимум 10 символов' })
  @MaxLength(1000, { message: 'Сообщение слишком длинное (максимум 1000 символов)' })
  message: string;

  @ApiPropertyOptional({ description: 'Источник страницы', example: 'Главная страница' })
  @IsString()
  @IsOptional()
  pageSource?: string;

  @ApiPropertyOptional({ description: 'Название продукта', example: 'Волшебный книжный дом' })
  @IsString()
  @IsOptional()
  productName?: string;
}

