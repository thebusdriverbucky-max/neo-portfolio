import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/auth'

const prisma = new PrismaClient()

async function createAdmin() {
  const email = process.env.ADMIN_EMAIL || 'admin@example.com'
  const password = process.env.ADMIN_PASSWORD || 'admin123'

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })

  if (existingUser) {
    console.log('❌ Админ с таким email уже существует')
    return
  }

  const hashedPassword = await hashPassword(password)
  const admin = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
    },
  })

  console.log('✅ Админ успешно создан!')
  console.log(`   Email: ${admin.email}`)
  console.log(`   Password: ${password}`)
  console.log('\n⚠️  Сохраните эти данные!')
}

createAdmin()
  .catch((e) => {
    console.error('❌ Ошибка:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
