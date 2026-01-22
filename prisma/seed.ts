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
        technologies: ['Vite', 'TypeScript', 'React', 'Firebase'],
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
        title: 'Website Development',
        description: 'Next.js, React, TypeScript: High-performance custom websites & design',
        price: 'from $300',
        icon: 'Code',
        features: ['Next.js', 'TypeScript', 'React', 'SEO Optimized', 'Responsive Design'],
        order: 1,
      },
      {
        title: 'Web Applications',
        description: 'Custom SaaS: CMS, Payment gateways & E-commerce Business logic ready',
        price: 'from $700',
        icon: 'Layers',
        features: ['Database Integration', 'User Authentication', 'API Development', 'Payment Integration', 'Admin Panel (CMS)'],
        order: 2,
      },
      {
        title: 'UI/UX Design',
        description: 'Modern UI/UX design: clean, fast, user-focused & mobile-first responsive with smooth animations',
        price: 'from $300',
        icon: 'Palette',
        features: ['Figma Prototypes', 'Mobile-First', 'Tailwind CSS + D3.js', 'Custom Design', 'Framer Motion'],
        order: 3,
      },
      {
        title: 'Support & Enhancement',
        description: 'Ongoing support: Bug fixes, new features, API & performance optimization',
        price: 'from $20/hour',
        icon: 'Wrench',
        features: ['Bug Fixes', 'Feature Updates', 'Performance Boost', 'Security Patches', 'Consultations'],
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
