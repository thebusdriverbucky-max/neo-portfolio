import PageLayout from '@/components/layout/PageLayout'
import ProjectCard from '@/components/ui/ProjectCard'
import { prisma } from '@/lib/prisma'
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Portfolio.meta' });
  return {
    title: t('title'),
    description: t('description')
  };
}

async function getProjects() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    })
    return projects
  } catch (error) {
    console.error('Ошибка загрузки проектов:', error)
    return []
  }
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Portfolio' });
  const projects = await getProjects()

  return (
    <PageLayout
      title={t('title')}
      subtitle={t('subtitle')}
    >
      {projects.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-white/60 text-xl">{t('empty')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      )}

      {/* Фильтры */}
      <div className="mt-16 flex justify-center gap-4 flex-wrap">
        {[
          t('filters.all'),
          t('filters.websites'),
          t('filters.apps'),
          t('filters.design')
        ].map((filter) => (
          <button
            key={filter}
            className="px-6 py-3 bg-slate-700/50 text-white rounded-lg border border-amber-500/30 hover:border-amber-500/60 hover:bg-slate-600/50 transition-all"
          >
            {filter}
          </button>
        ))}
      </div>
    </PageLayout>
  )
}
