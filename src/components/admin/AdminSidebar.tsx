'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Briefcase, Wrench, LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

export function AdminSidebar() {
  const pathname = usePathname()

  const links = [
    { href: '/admin/dashboard', label: 'Дашборд', icon: LayoutDashboard },
    { href: '/admin/projects', label: 'Проекты', icon: Briefcase },
    { href: '/admin/services', label: 'Услуги', icon: Wrench },
  ]

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-800 to-slate-900 border-r border-amber-500/30 text-white hidden lg:flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-amber-500/30">
        <Link href="/admin/dashboard" className="block">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">
            Admin Panel
          </h2>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#FFA500] to-[#FFD700] text-slate-900 shadow-lg font-semibold'
                  : 'hover:bg-slate-700/50 text-white/70 hover:text-white border border-transparent hover:border-amber-500/30'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-sm">{link.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-amber-500/30">
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-600/80 text-white/70 hover:text-white transition-all w-full border border-transparent hover:border-red-500/30"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="font-medium text-sm">Выйти</span>
        </button>
      </div>
    </aside>
  )
}
