import PageLayout from '@/components/layout/PageLayout'
import Image from 'next/image'

export const metadata = {
  title: 'Обо мне | Portfolio',
  description: 'Узнайте больше о моем опыте разработки',
}

export default function AboutPage() {
  return (
    <PageLayout
      title="Обо мне"
      subtitle="Узнайте больше о моем опыте и подходе к разработке"
    >
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Карточка с фото и текстом */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/aboutpage.png"
              alt="Developer workspace"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">Привет! 👋</h2>
            <p className="text-white/80 leading-relaxed">
              Я фулл-стек разработчик с 5+ годами опыта создания современных веб-приложений.
              Специализируюсь на Next.js, React и TypeScript.
            </p>
            <p className="text-white/80 leading-relaxed">
              Помогаю бизнесу и частным клиентам воплощать идеи в жизнь через качественный код
              и продуманный дизайн.
            </p>
          </div>
        </div>

        {/* Навыки */}
        <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-8 border-2 border-amber-500/30 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6">Технологии</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL', 'Prisma', 'Vite'].map((skill) => (
              <div key={skill} className="bg-slate-600/30 rounded-lg p-4 text-center border border-amber-500/20 hover:border-amber-500/50 transition-all">
                <span className="text-white font-semibold">{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Опыт */}
        <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-8 border-2 border-amber-500/30 shadow-2xl">
          <h3 className="text-2xl font-bold text-white mb-6">Опыт работы</h3>
          <div className="space-y-6">
            <div className="border-l-4 border-amber-500 pl-6">
              <h4 className="text-xl font-bold text-white mb-2">Фриланс Разработчик</h4>
              <p className="text-amber-400 mb-2">2020 - Настоящее время</p>
              <p className="text-white/80">Разработка веб-приложений для клиентов по всему миру</p>
            </div>
            <div className="border-l-4 border-amber-500 pl-6">
              <h4 className="text-xl font-bold text-white mb-2">Frontend Разработчик</h4>
              <p className="text-amber-400 mb-2">2018 - 2020</p>
              <p className="text-white/80">Создание клиентских частей веб-приложений</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
