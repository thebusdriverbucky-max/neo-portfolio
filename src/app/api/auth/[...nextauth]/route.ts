// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from '@/auth'

export const { GET, POST } = handlers

// Указываем Node.js runtime для совместимости с bcryptjs
export const runtime = 'nodejs'
