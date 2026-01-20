import PageLayout from '@/components/layout/PageLayout'
import ServiceCard from '@/components/ui/ServiceCard'

export const metadata = {
  title: 'Услуги | Portfolio',
  description: 'Полный спектр услуг по разработке и дизайну веб-проектов',
}

// Временные данные (заменить на Prisma когда БД будет настроена)
const services = [
  {
    id: '1',
    title: 'Веб-разработка',
    description: 'Создание современных веб-приложений с использованием передовых технологий',
    icon: 'Code',
    price: 'от €500',
    features: [
      'Next.js и React',
      'Адаптивный дизайн',
      'SEO оптимизация',
      'Высокая производительность'
    ]
  },
  {
    id: '2',
    title: 'UI/UX Дизайн',
    description: 'Проектирование удобных интерфейсов с фокусом на пользовательский опыт',
    icon: 'Palette',
    price: 'от €300',
    features: [
      'Прототипирование',
      'Дизайн в Figma',
      'UX исследования',
      'Дизайн-система'
    ]
  },
  {
    id: '3',
    title: 'E-commerce',
    description: 'Разработка интернет-магазинов с интеграцией платежных систем',
    icon: 'Code',
    price: 'от €800',
    features: [
      'Интеграция Stripe',
      'Управление товарами',
      'Корзина и заказы',
      'Админ-панель'
    ]
  },
  {
    id: '4',
    title: 'Мобильные приложения',
    description: 'Кроссплатформенная разработка мобильных приложений',
    icon: 'Layers',
    price: 'от €1000',
    features: [
      'React Native',
      'iOS и Android',
      'Push уведомления',
      'Офлайн режим'
    ]
  }
]

export default function ServicesPage() {
  return (
    <PageLayout
      title="Мои Услуги"
      subtitle="Полный спектр услуг по разработке и дизайну веб-проектов"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <ServiceCard key={service.id} service={service} index={index} />
        ))}
      </div>

      {/* Секция "Почему я?" */}
      <div className="mt-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Почему выбирают меня
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-6 border-2 border-amber-500/30 text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-[#FFA500] to-[#FFD700] bg-clip-text text-transparent mb-2">
              5+
            </div>
            <p className="text-white/80">Лет опыта</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-6 border-2 border-amber-500/30 text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-[#FFA500] to-[#FFD700] bg-clip-text text-transparent mb-2">
              50+
            </div>
            <p className="text-white/80">Проектов</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-6 border-2 border-amber-500/30 text-center">
            <div className="text-5xl font-bold bg-gradient-to-r from-[#FFA500] to-[#FFD700] bg-clip-text text-transparent mb-2">
              100%
            </div>
            <p className="text-white/80">Довольных клиентов</p>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
