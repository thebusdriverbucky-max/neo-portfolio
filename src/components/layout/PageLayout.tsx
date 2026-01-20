import { ReactNode } from 'react'

interface PageLayoutProps {
  children: ReactNode
  title: string
  subtitle?: string
}

export default function PageLayout({ children, title, subtitle }: PageLayoutProps) {
  // Разделяем title на слова
  const words = title.split(' ')
  const lastWord = words[words.length - 1]
  const firstWords = words.slice(0, -1).join(' ')

  return (
    <main className="mt-20">
      <section className="relative min-h-screen py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700">
        <div className="container mx-auto px-4">
          {/* Заголовок секции */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {firstWords}{' '}
              <span className="bg-gradient-to-r from-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">
                {lastWord}
              </span>
            </h1>
            {subtitle && (
              <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </div>

          {/* Контент страницы */}
          {children}
        </div>
      </section>
    </main>
  )
}
