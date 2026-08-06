import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Начинаем заполнение базы данных...')

  // Проверка наличия env переменных для админа
  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    console.warn('⚠️  ADMIN_EMAIL или ADMIN_PASSWORD не указаны в .env - пропускаем создание админа')
  }

  // Очистка существующих данных перед заполнением
  console.log('🧹 Очищаем существующие данные...')
  await prisma.contact.deleteMany()
  await prisma.project.deleteMany()
  await prisma.service.deleteMany()

  // Создание администратора
  if (adminEmail && adminPassword) {
    console.log('👤 Создаем администратора...')
    const hashedPassword = await bcrypt.hash(adminPassword, 10)

    await prisma.user.upsert({
      where: { email: adminEmail },
      update: {
        password: hashedPassword,
        role: 'admin',
      },
      create: {
        email: adminEmail,
        name: 'Admin',
        password: hashedPassword,
        role: 'admin',
        emailVerified: new Date(),
      },
    })
    console.log(`✅ Админ создан: ${adminEmail}`)
  }

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
        title: 'Template Marketplace',
        description: 'Template marketplace with no subscription fees: buy and sell high-performance templates',
        longDescription: 'Template Marketplace - A premium platform allowing developers and businesses to purchase and deploy exceptional web templates with single-time payments and zero recurring subscription fees.',
        imageUrl: 'https://i.imgur.com/yxafenk.png',
        demoUrl: 'https://www.ownyourwebsite.app/',
        githubUrl: null,
        technologies: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Stripe', 'React', 'Prisma'],
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
  console.log(`   - Пользователей: ${await prisma.user.count()}`)
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
