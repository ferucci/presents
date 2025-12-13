import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'), // Добавлено значение по умолчанию
  username: process.env.DB_USERNAME || '', // Добавлено значение по умолчанию
  password: process.env.DB_PASSWORD || '', // Добавлено значение по умолчанию
  database: process.env.DB_DATABASE || '',
  schema: 'first_present_schema', // Используем свою схему вместо public
  entities: [join(__dirname, '..', 'modules', '**', '*.entity{.ts,.js}')],
  migrations: [join(__dirname, '..', 'database', 'migrations', '*{.ts,.js}')],
  synchronize: process.env.NODE_ENV === 'development', // Только для разработки!
  logging: process.env.NODE_ENV === 'development',
};

// Для CLI миграций
export const dataSource = new DataSource(typeOrmConfig as DataSourceOptions);