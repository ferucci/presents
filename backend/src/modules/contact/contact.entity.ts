import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contact_requests')
export class ContactRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 30, nullable: true })
  phone: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pageSource: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  productName: string;

  @Column({
    type: 'enum',
    enum: ['new', 'processing', 'completed', 'cancelled'],
    default: 'new'
  })
  status: string;

  @Column({ type: 'text', nullable: true })
  topic: string | null;

  @CreateDateColumn()
  createdAt: Date;
}

