import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 🔍 ВРЕМЕННО - для отладки
  console.log('=== MIDDLEWARE ===');
  console.log('pathname:', pathname);
  console.log('includes /admin:', pathname.includes('/admin'));
  console.log('includes /admin/login:', pathname.includes('/admin/login'));

  // Для /admin/* пропускаем без intl
  if (pathname.includes('/admin')) {
    return NextResponse.next();
  }

  // Для остальных страниц применяем intl
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};
