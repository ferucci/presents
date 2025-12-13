#!/bin/bash

#######################################
# Автоматический деплой First Present
# Frontend + Backend + Telegram Bot
#######################################

set -e  # Остановка при ошибке

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функции для вывода
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_header() {
    echo -e "${BLUE}"
    echo "╔════════════════════════════════════════╗"
    echo "║     First Present Deploy Script       ║"
    echo "╚════════════════════════════════════════╝"
    echo -e "${NC}"
}

# Проверка наличия необходимых утилит
check_requirements() {
    print_info "Проверка требований..."
    
    if ! command -v docker &> /dev/null; then
        print_error "Docker не установлен. Установите Docker."
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose не установлен. Установите Docker Compose."
        exit 1
    fi
    
    print_success "Все требования выполнены"
}

# Проверка наличия .env файлов
check_env_files() {
    print_info "Проверка файлов окружения..."
    
    if [ ! -f ".env.production" ]; then
        print_warning ".env.production не найден"
        print_info "Создайте файл .env.production на основе .env.production.example"
        read -p "Хотите создать базовый .env.production? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            cp .env.production.example .env.production
            print_success ".env.production создан. Пожалуйста, отредактируйте его."
            exit 0
        else
            print_error "Деплой невозможен без .env.production"
            exit 1
        fi
    fi
    
    if [ ! -f "backend/.env" ]; then
        print_warning "backend/.env не найден. Используем переменные из .env.production"
    fi
    
    if [ ! -f "telegram-bot/.env" ]; then
        print_warning "telegram-bot/.env не найден. Используем переменные из .env.production"
    fi
    
    print_success "Файлы окружения проверены"
}

# Загрузка переменных окружения
load_env() {
    if [ -f ".env.production" ]; then
        export $(cat .env.production | grep -v '^#' | xargs)
        print_success "Переменные окружения загружены"
    fi
}

# Остановка существующих контейнеров
stop_containers() {
    print_info "Остановка существующих контейнеров..."
    docker-compose down 2>/dev/null || true
    print_success "Контейнеры остановлены"
}

# Очистка старых образов (опционально)
cleanup_images() {
    if [ "$CLEANUP" = "true" ]; then
        print_info "Очистка старых Docker образов..."
        docker system prune -af --volumes 2>/dev/null || true
        print_success "Старые образы очищены"
    fi
}

# Сборка образов
build_images() {
    print_info "Сборка Docker образов..."
    print_info "Это может занять несколько минут..."
    
    docker-compose build --no-cache
    
    print_success "Образы собраны"
}

# Запуск seed скрипта для БД
seed_database() {
    print_info "Ожидание запуска БД..."
    sleep 10
    
    print_info "Заполнение базы данных начальными данными..."
    docker-compose exec -T backend npm run seed || {
        print_warning "Не удалось выполнить seed автоматически"
        print_info "Выполните вручную: docker-compose exec backend npm run seed"
    }
    
    print_success "База данных заполнена"
}

# Запуск контейнеров
start_containers() {
    print_info "Запуск контейнеров..."
    
    docker-compose up -d
    
    print_success "Контейнеры запущены"
}

# Проверка здоровья сервисов
check_health() {
    print_info "Проверка здоровья сервисов..."
    
    sleep 5
    
    # Проверка PostgreSQL
    if docker-compose ps postgres | grep -q "Up"; then
        print_success "PostgreSQL работает"
    else
        print_error "PostgreSQL не запустился"
        return 1
    fi
    
    # Проверка Backend
    if docker-compose ps backend | grep -q "Up"; then
        print_success "Backend работает"
    else
        print_error "Backend не запустился"
        return 1
    fi
    
    # Проверка Frontend
    if docker-compose ps frontend | grep -q "Up"; then
        print_success "Frontend работает"
    else
        print_error "Frontend не запустился"
        return 1
    fi
    
    # Проверка Telegram Bot
    if docker-compose ps telegram-bot | grep -q "Up"; then
        print_success "Telegram Bot работает"
    else
        print_warning "Telegram Bot может не работать (проверьте BOT_TOKEN)"
    fi
}

# Вывод информации о сервисах
print_services_info() {
    echo
    print_success "╔════════════════════════════════════════════╗"
    print_success "║     Деплой завершён успешно! 🎉           ║"
    print_success "╚════════════════════════════════════════════╝"
    echo
    print_info "📊 Статус сервисов:"
    docker-compose ps
    echo
    print_info "🌐 Доступные сервисы:"
    echo "  Frontend:  http://localhost:3000"
    echo "  Backend:   http://localhost:3001"
    echo "  API Docs:  http://localhost:3001/api/docs"
    echo "  Postgres:  localhost:5432"
    echo
    print_info "📝 Полезные команды:"
    echo "  Логи всех сервисов:      docker-compose logs -f"
    echo "  Логи backend:            docker-compose logs -f backend"
    echo "  Логи frontend:           docker-compose logs -f frontend"
    echo "  Логи telegram-bot:       docker-compose logs -f telegram-bot"
    echo "  Остановить:              docker-compose down"
    echo "  Перезапустить:           docker-compose restart"
    echo "  Seed БД:                 docker-compose exec backend npm run seed"
    echo
}

# Показать логи при ошибке
show_logs_on_error() {
    print_error "Произошла ошибка при деплое!"
    print_info "Логи сервисов:"
    docker-compose logs --tail=50
}

# Главная функция
main() {
    print_header
    
    # Обработка аргументов
    CLEANUP=false
    SEED_DB=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --cleanup)
                CLEANUP=true
                shift
                ;;
            --seed)
                SEED_DB=true
                shift
                ;;
            --help)
                echo "Использование: ./deploy.sh [опции]"
                echo
                echo "Опции:"
                echo "  --cleanup    Очистить старые Docker образы перед сборкой"
                echo "  --seed       Заполнить БД начальными данными после запуска"
                echo "  --help       Показать эту справку"
                exit 0
                ;;
            *)
                print_error "Неизвестная опция: $1"
                exit 1
                ;;
        esac
    done
    
    # Trap для обработки ошибок
    trap show_logs_on_error ERR
    
    # Выполнение шагов
    check_requirements
    check_env_files
    load_env
    stop_containers
    cleanup_images
    build_images
    start_containers
    check_health
    
    if [ "$SEED_DB" = "true" ]; then
        seed_database
    fi
    
    print_services_info
}

# Запуск
main "$@"

