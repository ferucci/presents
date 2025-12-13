import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faq } from './faq.entity';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq)
    private readonly faqRepository: Repository<Faq>,
  ) {}

  async findAll(): Promise<Faq[]> {
    return await this.faqRepository.find({
      order: { order: 'ASC', createdAt: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Faq> {
    const faq = await this.faqRepository.findOne({ where: { id } });
    
    if (!faq) {
      throw new NotFoundException(`FAQ с ID ${id} не найден`);
    }
    
    return faq;
  }

  async create(createFaqDto: CreateFaqDto): Promise<Faq> {
    const faq = this.faqRepository.create(createFaqDto);
    return await this.faqRepository.save(faq);
  }

  async update(id: number, updateFaqDto: UpdateFaqDto): Promise<Faq> {
    const faq = await this.findOne(id);
    Object.assign(faq, updateFaqDto);
    return await this.faqRepository.save(faq);
  }

  async remove(id: number): Promise<void> {
    const faq = await this.findOne(id);
    await this.faqRepository.remove(faq);
  }
}

