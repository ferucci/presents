import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Получить все продукты
  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({
      order: { popular: 'DESC', createdAt: 'DESC' },
    });
  }

  // Получить один продукт по ID
  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    
    if (!product) {
      throw new NotFoundException(`Продукт с ID ${id} не найден`);
    }
    
    return product;
  }

  // Получить популярные продукты
  async findPopular(): Promise<Product[]> {
    return await this.productRepository.find({
      where: { popular: true },
      order: { createdAt: 'DESC' },
    });
  }

  // Создать продукт
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return await this.productRepository.save(product);
  }

  // Обновить продукт
  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  // Удалить продукт
  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}

