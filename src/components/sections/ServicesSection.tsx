import { prisma } from '@/lib/prisma';
import ServiceCard from '@/components/ui/ServiceCard';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/Button';
import { Link } from '@/i18n/routing';
import WaveDivider from '@/components/ui/WaveDivider';
import { getTranslations } from 'next-intl/server';
import type { Service } from '@prisma/client';

export async function ServicesSection() {
  const t = await getTranslations('Services');

  // Тестовые данные (fallback если БД недоступна)
  const fallbackServices: Service[] = [
    {
      id: '1',
      title: t('items.webDev.title'),
      description: t('items.webDev.description'),
      icon: 'Code',
      price: null,
      features: [],
      order: 1,
      createdAt: new Date(),
    },
    {
      id: '2',
      title: t('items.uiUx.title'),
      description: t('items.uiUx.description'),
      icon: 'Palette',
      price: null,
      features: [],
      order: 2,
      createdAt: new Date(),
    },
    {
      id: '3',
      title: t('items.backend.title'),
      description: t('items.backend.description'),
      icon: 'Layers',
      price: null,
      features: [],
      order: 3,
      createdAt: new Date(),
    },
    {
      id: '4',
      title: t('items.seo.title'),
      description: t('items.seo.description'),
      icon: 'Wrench',
      price: null,
      features: [],
      order: 4,
      createdAt: new Date(),
    },
  ];

  let services: Service[] = fallbackServices;

  try {
    services = await prisma.service.findMany({
      orderBy: { order: 'asc' },
      take: 4,
    });
  } catch (error) {
    console.warn('База данных недоступна, используются тестовые данные:', error);
  }

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" id="services">
      <div className="container relative z-10">
        {/* Заголовок секции */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t.rich('title', {
                highlight: (chunks) => (
                  <span className="bg-gradient-to-r from-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">
                    {chunks}
                  </span>
                ),
              })}
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* Карточки услуг */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>

        {/* Кнопка */}
        <div className="text-center mt-12">
          <Link href="/services">
            <Button variant="outline" size="lg">
              {t('allServices')}
            </Button>
          </Link>
        </div>
      </div>

      {/* Волна в конце секции */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <WaveDivider color="dark" />
      </div>
    </section>
  );
}
