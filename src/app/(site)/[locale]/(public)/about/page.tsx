import PageLayout from '@/components/layout/PageLayout'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About.meta' });
  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'About' });

  return (
    <PageLayout
      title={t('title')}
      subtitle={t('subtitle')}
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Карточка с фото и текстом */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-[562/500] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/aboutpage.png"
              alt="Developer workspace"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">{t('greeting')}</h2>
            <p className="text-white/80 leading-relaxed">
              {t('description1')}
            </p>
            <p className="text-white/80 leading-relaxed">
              {t('description2')}
            </p>
          </div>
        </div>

        {/* Навыки */}
        <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-8 border-2 border-amber-500/30 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6">{t('skills.title')}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Prisma', 'And More...'].map((skill) => (
              <div key={skill} className="bg-slate-600/30 rounded-lg p-4 text-center border border-amber-500/20 hover:border-amber-500/50 transition-all">
                <span className="text-white font-semibold">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Опыт */}
        <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-8 border-2 border-amber-500/30 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6">{t('experience.title')}</h3>
          <div className="space-y-6">
            <div className="border-l-4 border-amber-500 pl-6">
              <h4 className="text-xl font-bold text-white mb-2">{t('experience.freelance.title')}</h4>
              <p className="text-amber-400 mb-2">{t('experience.freelance.period')}</p>
              <p className="text-white/80">{t('experience.freelance.description')}</p>
            </div>
            <div className="border-l-4 border-amber-500 pl-6">
              <h4 className="text-xl font-bold text-white mb-2">{t('experience.frontend.title')}</h4>
              <p className="text-amber-400 mb-2">{t('experience.frontend.period')}</p>
              <p className="text-white/80">{t('experience.frontend.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
