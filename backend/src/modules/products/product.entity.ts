import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', array: true })
  images: string[];

  @Column({ type: 'varchar', length: 100 })
  price: string;

  @Column({ type: 'integer' })
  priceValue: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  period: string;

  @Column({ type: 'text', array: true })
  features: string[];

  @Column({ type: 'boolean', default: false })
  popular: boolean;

  @Column({ type: 'text', array: true, nullable: true })
  colors: string[];

  @Column({ type: 'text', array: true, nullable: true })
  attributes: string[];

  @Column({ type: 'text', array: true, nullable: true })
  functionality: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

