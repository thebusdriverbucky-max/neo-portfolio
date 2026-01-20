import { prisma } from '@/lib/prisma'
import { Briefcase, ShoppingBag, TrendingUp, Clock } from 'lucide-react'
import Link from 'next/link'

export default async function DashboardPage() {
  const [projectsCount, servicesCount, featuredProjectsCount] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.project.count({ where: { featured: true } }),
  ])

  const recentProjects = await prisma.project.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  })

  const stats = [
    {
      label: 'Всего проектов',
      value: projectsCount,
      icon: Briefcase,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Активных услуг',
      value: servicesCount,
      icon: ShoppingBag,
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Featured проектов',
      value: featuredProjectsCount,
      icon: TrendingUp,
      color: 'from-amber-500 to-amber-600',
    },
    {
      label: 'Последнее обновление',
      value: 'Сегодня',
      icon: Clock,
      color: 'from-purple-500 to-purple-600',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">
          Обзор <span className="bg-gradient-to-r from-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">системы</span>
        </h2>
        <p className="text-white/70">Добро пожаловать в панель управления</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-6 border-2 border-amber-500/30 hover:border-amber-500/60 transition-all shadow-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`bg-gradient-to-br ${stat.color} w-14 h-14 rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
              </div>
              <p className="text-white/60 text-sm font-medium mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-white">{stat.value}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Projects */}
      <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-6 border-2 border-amber-500/30 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6">Последние проекты</h3>
        {recentProjects.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-white/60 mb-4">Проектов пока нет</p>
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#FFA500] to-[#FFD700] text-slate-900 rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all"
            >
              Добавить первый проект
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-4 border-2 border-amber-500/20 rounded-xl hover:border-amber-500/40 hover:bg-slate-700/50 transition-all"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <p className="font-semibold text-white text-base mb-1">{project.title}</p>
                  <p className="text-sm text-white/60 line-clamp-1">{project.description}</p>
                </div>
                {project.featured && (
                  <span className="px-3 py-1.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold rounded-full whitespace-nowrap">
                    Featured
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-6 border-2 border-amber-500/30 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6">Быстрые действия</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin/projects"
            className="group flex items-start gap-4 p-6 border-2 border-amber-500/20 rounded-xl hover:border-amber-500/50 hover:shadow-xl transition-all"
          >
            <div className="bg-blue-500/20 p-3 rounded-xl group-hover:bg-blue-500/30 transition-colors flex-shrink-0 border border-blue-500/30">
              <Briefcase className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white text-base mb-1">Управление проектами</p>
              <p className="text-sm text-white/60">Добавить или редактировать проекты</p>
            </div>
          </Link>
          <Link
            href="/admin/services"
            className="group flex items-start gap-4 p-6 border-2 border-amber-500/20 rounded-xl hover:border-amber-500/50 hover:shadow-xl transition-all"
          >
            <div className="bg-green-500/20 p-3 rounded-xl group-hover:bg-green-500/30 transition-colors flex-shrink-0 border border-green-500/30">
              <ShoppingBag className="w-6 h-6 text-green-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white text-base mb-1">Управление услугами</p>
              <p className="text-sm text-white/60">Добавить или редактировать услуги</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
