import PageLayout from '@/components/layout/PageLayout'
import ServiceCard from '@/components/ui/ServiceCard'
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Services.meta' });
  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function PageName({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Services' });

  const services = [
    {
      id: '1',
      title: t('list.webDev.title'),
      description: t('list.webDev.description'),
      icon: 'Code',
      price: t('list.webDev.price'),
      features: [
        t('list.webDev.features.0'),
        t('list.webDev.features.1'),
        t('list.webDev.features.2'),
        t('list.webDev.features.3')
      ],
      order: 1,
      createdAt: new Date()
    },
    {
      id: '2',
      title: t('list.uiUx.title'),
      description: t('list.uiUx.description'),
      icon: 'Palette',
      price: t('list.uiUx.price'),
      features: [
        t('list.uiUx.features.0'),
        t('list.uiUx.features.1'),
        t('list.uiUx.features.2'),
        t('list.uiUx.features.3')
      ],
      order: 2,
      createdAt: new Date()
    },
    {
      id: '3',
      title: t('list.ecommerce.title'),
      description: t('list.ecommerce.description'),
      icon: 'Code',
      price: t('list.ecommerce.price'),
      features: [
        t('list.ecommerce.features.0'),
        t('list.ecommerce.features.1'),
        t('list.ecommerce.features.2'),
        t('list.ecommerce.features.3')
      ],
      order: 3,
      createdAt: new Date()
    },
    {
      id: '4',
      title: t('list.mobile.title'),
      description: t('list.mobile.description'),
      icon: 'Layers',
      price: t('list.mobile.price'),
      features: [
        t('list.mobile.features.0'),
        t('list.mobile.features.1'),
        t('list.mobile.features.2'),
        t('list.mobile.features.3')
      ],
      order: 4,
      createdAt: new Date()
    },
    {
      id: '5',
      title: t('list.integrations.title'),
      description: t('list.integrations.description'),
      icon: 'Link',
      price: t('list.integrations.price'),
      features: [
        t('list.integrations.features.0'),
        t('list.integrations.features.1'),
        t('list.integrations.features.2'),
        t('list.integrations.features.3'),
        t('list.integrations.features.4')
      ],
      order: 5,
      createdAt: new Date()
    },
    {
      id: '6',
      title: t('list.bugfixing.title'),
      description: t('list.bugfixing.description'),
      icon: 'Wrench',
      price: t('list.bugfixing.price'),
      features: [
        t('list.bugfixing.features.0'),
        t('list.bugfixing.features.1'),
        t('list.bugfixing.features.2'),
        t('list.bugfixing.features.3'),
        t('list.bugfixing.features.4')
      ],
      order: 6,
      createdAt: new Date()
    }
  ]

  return (
    <PageLayout
      title={t('title')}
      subtitle={t('subtitle')}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* Секция "Почему я?" */}
      <div className="mt-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          {t('whyMe.title')}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-6 border-2 border-amber-500/30 text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-[#FFA500] to-[#FFD700] bg-clip-text text-transparent mb-2">
              2+
            </div>
            <p className="text-white/80">{t('whyMe.experience')}</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-6 border-2 border-amber-500/30 text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-[#FFA500] to-[#FFD700] bg-clip-text text-transparent mb-2">
              10+
            </div>
            <p className="text-white/80">{t('whyMe.projects')}</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-6 border-2 border-amber-500/30 text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-[#FFA500] to-[#FFD700] bg-clip-text text-transparent mb-2">
              100%
            </div>
            <p className="text-white/80">{t('whyMe.clients')}</p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
