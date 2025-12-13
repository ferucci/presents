-- Инициализация БД для Docker
-- Создание схемы с правильными правами

-- Создаём схему для приложения
CREATE SCHEMA IF NOT EXISTS first_present_schema;

-- Даём права пользователю
GRANT ALL ON SCHEMA first_present_schema TO first_user;
ALTER SCHEMA first_present_schema OWNER TO first_user;

-- Устанавливаем схему по умолчанию
ALTER ROLE first_user SET search_path TO first_present_schema, public;

