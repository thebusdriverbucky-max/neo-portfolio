'use client'

import { Link } from '@/components/navigation/CustomLink'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Navigation from './Navigation'
import { cn } from '@/lib/utils'
import { useTranslations } from 'next-intl'

export default function Header() {
  const t = useTranslations('Navigation')
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-2xl shadow-amber-500/20'
          : 'bg-gradient-to-r from-[#FFA500]/90 via-[#FFB84D]/90 to-[#FFD700]/90 backdrop-blur-sm'
      )}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link
            href="/"
            className="font-bold transition-all duration-300 flex items-center gap-3 group"
          >
            <img
              src="/images/logo/favicon.png"
              alt="Logo"
              className={cn(
                "h-10 w-auto transition-all duration-300",
                isScrolled
                  ? "drop-shadow-[0_0_8px_rgba(255,215,0,1)] group-hover:drop-shadow-[0_0_12px_rgba(255,215,0,1)]"
                  : "drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_3px_6px_rgba(0,0,0,1)]"
              )}
            />
            <div className="flex flex-col leading-none items-center -space-y-1">
              <span className={cn(
                "text-2xl transition-all duration-300",
                isScrolled
                  ? 'bg-gradient-to-r from-[#FFA500] to-[#FFD700] bg-clip-text text-transparent'
                  : 'text-slate-900'
              )}>
                Web Dev
              </span>
              <span className={cn(
                "text-[9px] tracking-widest font-semibold transition-all duration-300",
                isScrolled
                  ? 'bg-gradient-to-r from-[#FFA500] to-[#FFD700] bg-clip-text text-transparent'
                  : 'text-slate-900'
              )}>
                SVYATOSLAV G
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {/* Desktop Navigation */}
            <Navigation isScrolled={isScrolled} />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'md:hidden p-2 transition-colors duration-300',
                isScrolled ? 'text-white/90 hover:text-[#FFD700]' : 'text-slate-900'
              )}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={cn(
            'md:hidden mt-4 pb-4 transition-colors duration-300'
          )}>
            <Navigation
              mobile
              isScrolled={isScrolled}
              onLinkClick={() => setIsMobileMenuOpen(false)}
            />
          </div>
        )}
      </div>
    </header>
  )
}
