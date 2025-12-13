import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { FeaturesModule } from './modules/features/features.module';
import { FaqModule } from './modules/faq/faq.module';
import { ServicesModule } from './modules/services/services.module';
import { AboutModule } from './modules/about/about.module';
import { ContactModule } from './modules/contact/contact.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from './modules/auth/guards/roles.guard';

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
      ttl: parseInt(process.env.THROTTLE_TTL) || 60000, // 60 секунд
      limit: parseInt(process.env.THROTTLE_LIMIT) || 100, // 100 запросов
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
export class AppModule {}

