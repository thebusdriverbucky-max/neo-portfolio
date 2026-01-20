import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/auth'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const prisma = new PrismaClient()

async function updatePassword() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    console.error('❌ ADMIN_EMAIL и ADMIN_PASSWORD должны быть в .env.local')
    process.exit(1)
  }

  // Проверяем, существует ли пользователь
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    console.log(`❌ Пользователь с email ${email} не найден`)
    console.log('Создаем нового администратора...')

    const hashedPassword = await hashPassword(password)
    const newAdmin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: 'Admin',
        role: 'admin',
      },
    })

    console.log('✅ Новый админ создан!')
    console.log(`   Email: ${newAdmin.email}`)
    console.log(`   Password: ${password}`)
    return
  }

  // Обновляем пароль
  const hashedPassword = await hashPassword(password)

  await prisma.user.update({
    where: { email },
    data: {
      password: hashedPassword,
      role: 'admin', // На всякий случай убеждаемся, что роль admin
    },
  })

  console.log('✅ Пароль успешно обновлен!')
  console.log(`   Email: ${email}`)
  console.log(`   Password: ${password}`)
  console.log('\n🔒 В БД сохранен хешированный пароль (это нормально и безопасно)')
}

updatePassword()
  .catch((e) => {
    console.error('❌ Ошибка:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
