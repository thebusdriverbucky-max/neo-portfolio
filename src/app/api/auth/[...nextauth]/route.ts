import { handlers } from '@/auth'

export const { GET, POST } = handlers

// ✅ КРИТИЧНО! Запрещаем статическую генерацию
export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'
