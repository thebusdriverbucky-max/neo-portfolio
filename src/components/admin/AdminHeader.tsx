'use client'

interface AdminHeaderProps {
  user: {
    name?: string | null
    email?: string | null
  }
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm border-b border-amber-500/30 px-6 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          Панель <span className="bg-gradient-to-r from-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">управления</span>
        </h1>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-white leading-tight">
              {user.name || 'Admin'}
            </p>
            <p className="text-xs text-white/60 mt-0.5 leading-tight">
              {user.email}
            </p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-[#FFA500] to-[#FFD700] rounded-full flex items-center justify-center text-slate-900 font-bold text-base flex-shrink-0 border-2 border-amber-400/30 shadow-lg">
            {user.name?.[0]?.toUpperCase() || 'A'}
          </div>
        </div>
      </div>
    </header>
  )
}
