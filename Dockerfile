# Dockerfile для Frontend (Next.js) - упрощенный
FROM node:20-alpine

WORKDIR /app

# 1. Копируем package.json
COPY package*.json ./

# 2. Устанавливаем зависимости
RUN if [ -f package-lock.json ]; then npm ci --no-audit --no-fund; else npm install --no-audit --no-fund; fi

# 3. Копируем исходный код
COPY . .

# 4. Собираем приложение
RUN npm run build

# 5. Экспортируем порт
EXPOSE 3000

# 6. Запускаем приложение
CMD ["npm", "start"]