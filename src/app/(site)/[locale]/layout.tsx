import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import NavigationLoader from '@/components/ui/NavigationLoader';
import { LoaderProvider } from '@/contexts/LoaderContext';
import type { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.vercel.app'),
  title: {
    default: 'Svyatoslav G - Full Stack Web Developer',
    template: '%s | Svyatoslav G'
  },
  description: 'Professional web development services. Next.js, React, TypeScript. Creating modern, fast and beautiful websites.',
  keywords: ['web development', 'next.js', 'react', 'full stack developer', 'cyprus', 'portfolio'],
  authors: [{ name: 'Svyatoslav G' }],
  creator: 'Svyatoslav G',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.vercel.app',
    siteName: 'Svyatoslav G Portfolio',
    title: 'Svyatoslav G - Full Stack Web Developer',
    description: 'Professional web development services',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Проверка валидности локали
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <LoaderProvider>
          <NextIntlClientProvider messages={messages}>
            <NavigationLoader />
            {children}
          </NextIntlClientProvider>
        </LoaderProvider>
      </body>
    </html>
  );
}
