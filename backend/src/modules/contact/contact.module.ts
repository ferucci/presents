import { TelegramNotifierService } from '@/common/services/telegram-notifier.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from './contact.controller';
import { ContactRequest } from './contact.entity';
import { ContactService } from './contact.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactRequest])],
  controllers: [ContactController],
  providers: [ContactService, TelegramNotifierService],
  exports: [ContactService],
})
export class ContactModule { }

