import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AboutModule } from './modules/about/about.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { ContactModule } from './modules/contact/contact.module';
import { FaqModule } from './modules/faq/faq.module';
import { FeaturesModule } from './modules/features/features.module';
import { ProductsModule } from './modules/products/products.module';
import { ServicesModule } from './modules/services/services.module';

@Module({
  imports: [
    // Конфигурация
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // База данных
    TypeOrmModule.forRoot(typeOrmConfig),

    // Защита от DDoS - Rate Limiting
    ThrottlerModule.forRoot([{
      ttl: parseInt(process.env.THROTTLE_TTL || '60000'), // 60 секунд
      limit: parseInt(process.env.THROTTLE_LIMIT || '100'), // 100 запросов
    }]),

    // Аутентификация
    AuthModule,

    // Модули приложения
    ProductsModule,
    FeaturesModule,
    FaqModule,
    ServicesModule,
    AboutModule,
    ContactModule,
  ],
  providers: [
    // Глобальная защита от DDoS
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // Глобальная защита JWT (кроме @Public endpoints)
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // Глобальная проверка ролей
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule { }

