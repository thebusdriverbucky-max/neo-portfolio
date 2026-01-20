# Portfolio Website

Профессиональный мультистраничный сайт-портфолио для веб-разработчика с админкой для управления контентом.

## Технологический стек

- **Next.js 14+** (App Router)
- **TypeScript** (строгая типизация)
- **Tailwind CSS** для стилизации
- **Framer Motion** для анимаций
- **Prisma ORM + PostgreSQL** (для админки)
- **NextAuth.js** для аутентификации
- **React Hook Form + Zod** для форм
- **Lucide React** для иконок
- **Inter** шрифт (Google Fonts)

## Цветовая схема

- Primary: #FFA500 (оранжевый)
- Secondary: #FFD700 (золотисто-желтый)
- Dark: #1E3A8A (темно-синий)
- Background: градиенты от #FFA500 до #FFD700
- Accent: #FFFFFF (белый)

## Структура проекта

```
portfolio-website/
├── src/
│ ├── app/
│ │ ├── (public)/          # Публичные страницы
│ │ │ ├── page.tsx          # Главная страница
│ │ │ ├── about/            # Обо мне
│ │ │ ├── services/         # Услуги
│ │ │ ├── portfolio/        # Портфолио
│ │ │ └── contact/          # Контакты
│ │ ├── (admin)/            # Админ-панель
│ │ │ └── admin/            # Дашборд и управление
│ │ ├── api/                # API Routes
│ │ │ ├── auth/             # NextAuth аутентификация
│ │ │ ├── projects/         # CRUD проекты
│ │ │ ├── services/         # CRUD услуги
│ │ │ └── contacts/         # Сообщения
│ │ ├── layout.tsx          # Главный layout
│ │ └── globals.css         # Глобальные стили
│ ├── components/
│ │ ├── layout/             # Header, Footer, Navigation
│ │ ├── ui/                 # UI компоненты (Button, Card, etc.)
│ │ ├── animations/         # FadeIn, ScrollReveal
│ │ ├── sections/           # Секции страниц
│ │ └── admin/              # Компоненты админки
│ ├── lib/
│ │ ├── prisma.ts           # Prisma client
│ │ └── utils.ts            # Утилиты
│ └── types/
│     └── index.ts          # TypeScript типы
├── prisma/
│ └── schema.prisma         # Схема базы данных
└── public/                 # Статические файлы
```

## Установка и запуск

### 1. Клонирование и установка зависимостей

```bash
npm install
```

### 2. Настройка базы данных

Создайте файл `.env.local` в корне проекта:

```env
# Database - Neon PostgreSQL
DATABASE_URL="postgresql://username:password@ep-xxx.region.aws.neon.tech/database?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-generate-with-openssl-rand-base64-32"

# Admin credentials (по умолчанию)
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="change-this-password"
```

### 3. Генерация Prisma Client

```bash
npx prisma generate
```

### 4. Применение миграций (создание таблиц)

```bash
npx prisma db push
```

### 5. Создание администратора (опционально)

```bash
npx prisma db seed
```

Или через Prisma Studio:

```bash
npx prisma studio
```

Создайте пользователя в таблице `User` с захешированным паролем:

```typescript
import bcrypt from 'bcryptjs';

const hashedPassword = await bcrypt.hash('your-password', 10);
```

### 6. Запуск development сервера

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Доступные страницы

### Публичные страницы

- **/** - Главная страница с Hero секцией
- **/about** - Обо мне
- **/services** - Услуги
- **/portfolio** - Портфолио с проектами
- **/contact** - Контакты

### Админ-панель

- **/admin** - Дашборд (требуется авторизация)
- **/admin/projects** - Управление проектами
- **/admin/services** - Управление услугами
- **/admin/contacts** - Просмотр сообщений

## API Routes

### Projects
- `GET /api/projects` - Получить все проекты
- `POST /api/projects` - Создать проект
- `PUT /api/projects/[id]` - Обновить проект
- `DELETE /api/projects/[id]` - Удалить проект

### Services
- `GET /api/services` - Получить все услуги
- `POST /api/services` - Создать услугу
- `PUT /api/services/[id]` - Обновить услугу
- `DELETE /api/services/[id]` - Удалить услугу

### Contacts
- `GET /api/contacts` - Получить все сообщения
- `POST /api/contacts` - Отправить сообщение

### Auth
- `/api/auth/signin` - Вход
- `/api/auth/signout` - Выход

## Компоненты

### UI Components
- `Button` - Кнопка с вариантами (primary, secondary, ghost, outline)
- `Card` - Карточка с hover эффектами
- `Section` - Wrapper для секций
- `Input` - Стилизованный input
- `Textarea` - Текстовая область

### Layout Components
- `Header` - Хедер с навигацией
- `Footer` - Футер с социальными ссылками
- `Navigation` - Навигационное меню

### Animation Components
- `FadeIn` - Fade-in анимация
- `ScrollReveal` - Анимация при скролле

## Примечания

### Build с Turbopack

Возможна проблема с сборкой при использовании Turbopack и Prisma на Windows. Для решения используйте dev сервер или отключите Turbopack в `next.config.ts`.

### Neon PostgreSQL

Для использования Neon PostgreSQL:
1. Создайте аккаунт на [neon.tech](https://neon.tech)
2. Создайте новый проект
3. Скопируйте connection string в `.env.local`

### Deployment

Для деплоя на Vercel:

1. Push код в GitHub
2. Импортируйте проект в Vercel
3. Добавьте переменные окружения в Vercel Dashboard
4. Deploy!

## Лицензия

MIT
