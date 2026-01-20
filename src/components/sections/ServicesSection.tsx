import { prisma } from '@/lib/prisma';
import ServiceCard from '@/components/ui/ServiceCard';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import WaveDivider from '@/components/ui/WaveDivider';

export async function ServicesSection() {
  // Тестовые данные (fallback если БД недоступна)
  const fallbackServices = [
    {
      id: '1',
      title: 'Веб-разработка',
      description: 'Создание современных веб-сайтов и приложений',
      icon: 'code',
    },
    {
      id: '2',
      title: 'UI/UX Дизайн',
      description: 'Проектирование удобных интерфейсов',
      icon: 'palette',
    },
    {
      id: '3',
      title: 'Backend',
      description: 'Разработка серверной части и API',
      icon: 'server',
    },
    {
      id: '4',
      title: 'SEO Оптимизация',
      description: 'Продвижение сайтов в поисковых системах',
      icon: 'trending-up',
    },
  ];

  let services = fallbackServices;

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
              Мои <span className="bg-gradient-to-r from-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">Услуги</span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Полный спектр услуг по разработке и дизайну веб-проектов
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
              Все услуги
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
