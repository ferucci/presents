# Makefile для удобного управления проектом

.PHONY: help install dev build deploy up down restart logs clean seed backup

help: ## Показать эту справку
	@echo "Доступные команды:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## Установить зависимости для всех сервисов
	@echo "📦 Установка зависимостей..."
	npm install
	cd backend && npm install
	cd telegram-bot && npm install

dev: ## Запустить все сервисы в development режиме
	@echo "🚀 Запуск в development режиме..."
	@echo "Запустите в разных терминалах:"
	@echo "  Terminal 1: cd backend && npm run start:dev"
	@echo "  Terminal 2: npm run dev"
	@echo "  Terminal 3: cd telegram-bot && npm run dev"

build: ## Собрать Docker образы
	@echo "🔨 Сборка Docker образов..."
	docker-compose build

deploy: ## Запустить полный деплой
	@echo "🚀 Запуск автоматического деплоя..."
	./deploy.sh --seed

deploy-clean: ## Деплой с очисткой старых образов
	@echo "🧹 Деплой с очисткой..."
	./deploy.sh --cleanup --seed

up: ## Запустить контейнеры
	@echo "▶️  Запуск контейнеров..."
	docker-compose up -d

down: ## Остановить контейнеры
	@echo "⏹️  Остановка контейнеров..."
	docker-compose down

restart: ## Перезапустить все контейнеры
	@echo "🔄 Перезапуск контейнеров..."
	docker-compose restart

logs: ## Показать логи всех сервисов
	@echo "📋 Логи сервисов..."
	docker-compose logs -f

logs-backend: ## Показать логи backend
	docker-compose logs -f backend

logs-frontend: ## Показать логи frontend
	docker-compose logs -f frontend

logs-bot: ## Показать логи telegram бота
	docker-compose logs -f telegram-bot

logs-db: ## Показать логи PostgreSQL
	docker-compose logs -f postgres

ps: ## Показать статус контейнеров
	docker-compose ps

clean: ## Очистить все контейнеры и volumes
	@echo "🧹 Очистка..."
	docker-compose down -v
	docker system prune -af

seed: ## Заполнить БД начальными данными
	@echo "🌱 Заполнение БД..."
	docker-compose exec backend npm run seed

backup: ## Создать backup БД
	@echo "💾 Создание backup..."
	@mkdir -p backups
	docker-compose exec postgres pg_dump -U first_user fpdb > backups/backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo "✅ Backup создан в backups/"

restore: ## Восстановить БД из последнего backup
	@echo "⚠️  Восстановление БД из последнего backup..."
	@LATEST=$$(ls -t backups/*.sql | head -1); \
	echo "Файл: $$LATEST"; \
	docker-compose exec -T postgres psql -U first_user fpdb < $$LATEST

shell-backend: ## Открыть shell в backend контейнере
	docker-compose exec backend sh

shell-frontend: ## Открыть shell в frontend контейнере
	docker-compose exec frontend sh

shell-db: ## Открыть psql shell
	docker-compose exec postgres psql -U first_user -d fpdb

health: ## Проверить здоровье всех сервисов
	@echo "🏥 Проверка здоровья сервисов..."
	@docker-compose ps
	@echo ""
	@curl -s http://localhost:3001/products > /dev/null && echo "✅ Backend работает" || echo "❌ Backend не отвечает"
	@curl -s http://localhost:3000 > /dev/null && echo "✅ Frontend работает" || echo "❌ Frontend не отвечает"

update: ## Обновить и пересобрать проект
	@echo "🔄 Обновление проекта..."
	git pull origin main
	$(MAKE) deploy-clean

stats: ## Показать статистику использования ресурсов
	docker stats --no-stream

