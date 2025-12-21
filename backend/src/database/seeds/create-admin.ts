import * as bcrypt from 'bcrypt';
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { typeOrmConfig } from '../../config/typeorm.config';
import { User, UserRole } from '../../modules/auth/entities/user.entity';

async function createAdmin() {
  const dataSource = new DataSource(typeOrmConfig as any);

  try {
    await dataSource.initialize();
    console.log('Подключение к БД успешно!');

    // Синхронизация схемы (создание таблиц)
    await dataSource.synchronize();
    console.log('Схема БД синхронизирована!');

    const userRepository = dataSource.getRepository(User);

    // Проверяем, существует ли админ
    const existingAdmin = await userRepository.findOne({
      where: { username: process.env.ADM_USER },
    });

    if (existingAdmin) {
      console.log('Администратор уже существует!');
      await dataSource.destroy();
      return;
    }

    const password = process.env.ADM_PASS;
    // Создаем админа
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = userRepository.create({
      username: process.env.ADM_USER,
      email: process.env.ADM_EMAIL,
      password: hashedPassword,
      role: UserRole.ADMIN,
      isActive: true,
    });

    await userRepository.save(admin);

    console.log('\n✅ Администратор успешно создан!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Username: process.env.ADM_USER');
    console.log('Password: process.env.ADM_PASS');
    console.log('Email: process.env.ADM_EMAIL');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n📝 Для входа используется endpoint: POST /api/auth/login');
    console.log('   Body: { "username": "process.env.ADM_USER", "password": "process.env.ADM_PASS" }');

    await dataSource.destroy();
  } catch (error) {
    console.error('Ошибка при создании администратора:', error);
    process.exit(1);
  }
}

createAdmin();

