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
        description: 'AI Self-Discovery platform: Personality Tests, Tarot, Natal Chart & Fate Matrix',
        longDescription: 'Quadro Arcane - Mystical self-discovery platform combining Tarot readings, natal charts, Fate Matrix, and AI-powered personality tests with stunning visualizations',
        imageUrl: '/images/projects/quadroarcane.png',
        demoUrl: 'https://quadro-arcane.com',
        githubUrl: 'https://github.com/yourusername/sorry-private-project',
        technologies: ['Next.js', 'Tailwind CSS', 'Firebase', 'D3.js', 'Groq AI', 'TypeScript', 'React'],
        featured: true,
        order: 1,
      },
      {
        title: 'Restaurant Template',
        description: 'Luxury restaurant site: smooth animations, booking system & map integration',
        longDescription: 'Luxury Greek-Cypriot restaurant in Larnaca: Bookings & smooth animations',
        imageUrl: '/images/projects/restaurant.png',
        demoUrl: 'https://dionysos-larnaca.vercel.app',
        githubUrl: 'https://github.com/thebusdriverbucky-max/dionysos',
        technologies: ['React', 'TypeScript', 'CSS Modules', 'Vite'],
        featured: true,
        order: 2,
      },
      {
        title: 'Admin Panel',
        description: 'SupPros: Admin panel for inventory, orders, analytics & real-time updates',
        longDescription: 'SupPros - Supplement Store Admin Panel/Dashboard for managing supplement store inventory, orders, customers, and analytics with real-time updates',
        imageUrl: '/images/projects/admin-panel.png',
        demoUrl: 'https://suppros.vercel.app',
        githubUrl: 'https://github.com/thebusdriverbucky-max/suppros',
        technologies: ['Vite', 'TypeScript', 'React'],
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
