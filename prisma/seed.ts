import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Начинаем заполнение базы данных...')

  // Очистка существующих данных перед заполнением
  console.log('🧹 Очищаем существующие данные...')
  await prisma.project.deleteMany()
  await prisma.service.deleteMany()

  // Создание проектов
  console.log('📁 Создаем проекты...')
  await prisma.project.createMany({
    data: [
      {
        title: 'Quadro Arcane',
        description: 'Test',
        longDescription: 'Quadro Arcane - современная платформа на Next.js 14+ с TypeScript. Включает аутентификацию, дашборды с графиками, интеграцию с API и адаптивный дизайн.',
        imageUrl: '/images/projects/quadroarcane.png',
        demoUrl: 'https://quadro-arcane-demo.vercel.app',
        githubUrl: 'https://github.com/yourusername/quadro-arcane',
        technologies: ['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
        featured: true,
        order: 1,
      },
      {
        title: 'Restaurant Template',
        description: 'Элегантный адаптивный шаблон для ресторанов с системой бронирования',
        longDescription: 'Современный шаблон с анимациями, галереей блюд, формой бронирования и интеграцией Google Maps.',
        imageUrl: '/images/projects/restaurant.png',
        demoUrl: 'https://restaurant-template-demo.vercel.app',
        githubUrl: 'https://github.com/yourusername/restaurant-template',
        technologies: ['React', 'TypeScript', 'CSS Modules', 'Framer Motion'],
        featured: true,
        order: 2,
      },
      {
        title: 'Admin Panel',
        description: 'Мощная панель администратора для управления проектами, пользователями и контентом',
        longDescription: 'Современная админ-панель с полной CRUD функциональностью, аутентификацией, ролевой системой доступа, аналитикой в реальном времени и адаптивным дизайном для всех устройств.',
        imageUrl: '/images/projects/admin-panel.png',
        demoUrl: 'https://suppros.vercel.app/',
        githubUrl: 'https://github.com/yourusername/admin-panel',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'NextAuth'],
        featured: true,
        order: 3,
      },
    ],
  })

  // Создание услуг
  console.log('🛠️  Создаем услуги...')
  await prisma.service.createMany({
    data: [
      {
        title: 'Разработка веб-сайтов',
        description: 'Создание современных адаптивных сайтов на Next.js и React',
        price: 'от $500',
        icon: 'Code',
        features: ['Next.js 14', 'TypeScript', 'SEO-оптимизация', 'Адаптивный дизайн', 'Быстрая загрузка'],
        order: 1,
      },
      {
        title: 'Веб-приложения',
        description: 'Полнофункциональные SaaS приложения с админ-панелью',
        price: 'от $1500',
        icon: 'Layers',
        features: ['Аутентификация', 'База данных', 'API разработка', 'Панель управления', 'Интеграции'],
        order: 2,
      },
      {
        title: 'UI/UX Дизайн',
        description: 'Современный дизайн интерфейсов с фокусом на UX',
        price: 'от $300',
        icon: 'Palette',
        features: ['Figma прототипы', 'Адаптивная верстка', 'Анимации', 'Брендинг', 'Дизайн-система'],
        order: 3,
      },
      {
        title: 'Поддержка и доработка',
        description: 'Техническая поддержка и развитие существующих проектов',
        price: 'от $50/час',
        icon: 'Wrench',
        features: ['Исправление багов', 'Добавление функций', 'Оптимизация', 'Обновления', 'Консультации'],
        order: 4,
      },
    ],
  })

  console.log('✅ База данных успешно заполнена начальными данными!')
  console.log('📊 Статистика:')
  console.log(`   - Проектов: ${await prisma.project.count()}`)
  console.log(`   - Услуг: ${await prisma.service.count()}`)
}

main()
  .catch((e) => {
    console.error('❌ Ошибка при заполнении БД:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
