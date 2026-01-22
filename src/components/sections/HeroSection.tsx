'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Code2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/components/navigation/CustomLink'
import WaveDivider from '@/components/ui/WaveDivider'
import CodeParticles from '@/components/effects/CodeParticles'
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiReact,
  SiFramer,
  SiPrisma,
  SiD3Dotjs
} from 'react-icons/si'

const technologies = [
  { name: 'Next.js 15', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'React', icon: SiReact },
  { name: 'Framer Motion', icon: SiFramer },
  { name: 'Prisma', icon: SiPrisma },
  { name: 'D3.js', icon: SiD3Dotjs },
]

export function HeroSection() {
  const t = useTranslations('Hero')

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFA500] via-[#FFB84D] to-[#FFD700] overflow-hidden">
      {/* Анимированный фон с кодом */}
      <CodeParticles />
      {/* Декоративные элементы */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-[1000px] h-[1000px] bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/2 w-[1000px] h-[1000px] bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Контент */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="group inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-400/15 via-orange-400/15 to-[#FFD700]/15 backdrop-blur-md rounded-full border-2 border-slate-900/20 shadow-xl hover:shadow-2xl hover:bg-slate-950/70 hover:border-amber-500/50 transition-all duration-500 cursor-pointer">
              <Code2 className="w-5 h-5 text-slate-900 group-hover:text-amber-400 transition-colors duration-500" />
              <span className="font-bold text-slate-900 group-hover:text-white transition-colors duration-500">
                {t('badge')}
              </span>
            </div>
          </motion.div>

          {/* Заголовок */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#0f172a] leading-tight drop-shadow-lg break-words max-w-full">
            {t('title')}
          </h1>

          {/* Подзаголовок */}
          <p className="text-xl md:text-2xl font-semibold max-w-3xl mx-auto leading-relaxed bg-gradient-to-r from-[#6B1F1F] to-[#2A1F16] bg-clip-text text-transparent">
            {t('subtitle')}
          </p>

          {/* Технологии */}
          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto py-6">
            {technologies.map((tech, index) => {
              const Icon = tech.icon
              return (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  className="group relative px-5 py-3 bg-gradient-to-r from-red-400/15 via-orange-400/15 to-[#FFD700]/15 backdrop-blur-md rounded-xl border-2 border-slate-900/20 shadow-lg hover:shadow-2xl hover:border-amber-500/50 transition-all duration-500 cursor-pointer overflow-hidden"
                >
                  {/* Темное стекло overlay при hover */}
                  <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl" />

                  {/* Контент бейджа */}
                  <div className="relative flex items-center gap-3 z-10">
                    {/* Иконка с золотым градиентом */}
                    <div className="p-2 rounded-lg bg-gradient-to-br from-[#FFA500] to-[#FFD700] group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <Icon className="w-5 h-5 text-slate-900" />
                    </div>

                    {/* Название технологии */}
                    <span className="font-bold text-slate-900 group-hover:text-white transition-colors duration-500">
                      {tech.name}
                    </span>
                  </div>

                  {/* Свечение при hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#FFA500]/20 to-[#FFD700]/20 blur-xl" />
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Магические кнопки */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Link
              href="/contact"
              className="group relative px-10 py-5 bg-[#0f172a] text-white font-bold text-lg rounded-full shadow-2xl overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-[0_0_60px_rgba(255,215,0,0.6)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#FFA500] via-[#FFD700] to-[#FFA500] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10 flex items-center justify-center gap-3">
                {t('contact')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>

            <Link
              href="/portfolio"
              className="group relative px-10 py-5 bg-[#0f172a] text-white font-bold text-lg rounded-full shadow-2xl overflow-hidden transition-all duration-500 hover:scale-110 hover:shadow-[0_0_60px_rgba(255,215,0,0.6)]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#FFA500] via-[#FFD700] to-[#FFA500] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <span className="relative z-10 flex items-center justify-center">
                {t('portfolio')}
              </span>
            </Link>
          </div>

        </motion.div>
      </div>

      {/* Волна в конце секции */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <WaveDivider color="dark" />
      </div>
    </section>
  );
}
