import { prisma } from '@/lib/prisma';
import ProjectCard from '@/components/ui/ProjectCard';
import ScrollReveal from '@/components/animations/ScrollReveal';
import { Link } from '@/i18n/routing';
import { ArrowRight } from 'lucide-react';
import WaveDivider from '@/components/ui/WaveDivider';
import { getTranslations } from 'next-intl/server';
import type { Project } from '@/types';

export async function PortfolioSection() {
  const t = await getTranslations('Portfolio');

  // Тестовые данные (fallback если БД недоступна)
  const fallbackProjects: Project[] = [
    {
      id: '1',
      title: t('items.ecommerce.title'),
      description: t('items.ecommerce.description'),
      imageUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
      technologies: ['Next.js', 'TypeScript', 'Stripe'],
      demoUrl: null,
      githubUrl: null,
      longDescription: null,
      featured: true,
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: t('items.corporate.title'),
      description: t('items.corporate.description'),
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      technologies: ['React', 'Tailwind', 'Framer Motion'],
      demoUrl: null,
      githubUrl: null,
      longDescription: null,
      featured: true,
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      title: t('items.dashboard.title'),
      description: t('items.dashboard.description'),
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      technologies: ['Vue.js', 'Chart.js', 'Node.js'],
      demoUrl: null,
      githubUrl: null,
      longDescription: null,
      featured: true,
      order: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  let projects: Project[] = fallbackProjects;

  try {
    projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { order: 'asc' },
      take: 3,
    });
  } catch (error) {
    console.warn('База данных недоступна, используются тестовые данные:', error);
  }

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" id="portfolio">
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

        {/* Карточки проектов */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-16">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* Кнопка */}
        <div className="text-center mt-12">
          <Link
            href="/portfolio"
            className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#0f172a] text-white font-bold text-lg rounded-lg shadow-2xl overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-[0_0_60px_rgba(255,215,0,0.6)] hover:shadow-[#FFD700] border-2 border-[#FFA500]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#FFA500] via-[#FFD700] to-[#FFA500] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <span className="relative z-10 flex items-center justify-center gap-3">
              {t('allProjects')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Link>
        </div>
      </div>

      {/* Волна в конце секции */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <WaveDivider color="orange" flip />
      </div>
    </section>
  );
}
