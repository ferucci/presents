import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Включаем CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  // Глобальная валидация
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger документация
  const config = new DocumentBuilder()
    .setTitle('First Present API')
    .setDescription('API для магазина румбоксов с защитой от несанкционированного доступа')
    .setVersion('1.0')
    .addTag('auth', 'Аутентификация')
    .addTag('products', 'Управление товарами')
    .addTag('features', 'Функции и преимущества')
    .addTag('faq', 'Часто задаваемые вопросы')
    .addTag('services', 'Услуги')
    .addTag('about', 'О компании')
    .addTag('contact', 'Обратная связь')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  
  console.log(`🚀 Сервер запущен на http://localhost:${port}`);
  console.log(`📚 Swagger документация: http://localhost:${port}/api/docs`);
}

bootstrap();

