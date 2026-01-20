'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import Navigation from './Navigation'
import { cn } from '@/lib/utils'

export default function Header() {
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4',
        isScrolled
          ? 'bg-slate-900/95 backdrop-blur-md shadow-2xl shadow-amber-500/20'
          : 'bg-gradient-to-r from-[#FFA500]/90 via-[#FFB84D]/90 to-[#FFD700]/90 backdrop-blur-sm'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              'text-2xl font-bold transition-all duration-300',
              isScrolled
                ? 'bg-gradient-to-r from-[#FFA500] to-[#FFD700] bg-clip-text text-transparent'
                : 'text-slate-900'
            )}
          >
            Portfolio
          </Link>

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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className={cn(
            'md:hidden transition-colors duration-300',
            isScrolled
              ? 'bg-slate-900/95'
              : 'bg-gradient-to-r from-[#FFA500]/90 via-[#FFB84D]/90 to-[#FFD700]/90'
          )}>
            <div className="container mx-auto px-4 py-6">
              <Navigation
                mobile
                isScrolled={isScrolled}
                onLinkClick={() => setIsMobileMenuOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
