'use client';

import { Link } from '@/components/navigation/CustomLink'; // ИЗМЕНЕНО
import { usePathname } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '../ui/LanguageSwitcher';

export interface NavigationProps {
  onLinkClick?: () => void;
  mobile?: boolean;
  isScrolled?: boolean;
}

export default function Navigation({ onLinkClick, mobile = false, isScrolled = false }: NavigationProps) {
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: t('home') },
    { href: '/about', label: t('about') },
    { href: '/services', label: t('services') },
    { href: '/portfolio', label: t('portfolio') },
    { href: '/contact', label: t('contact') },
  ];

  return (
    <nav className={mobile ? 'flex flex-col space-y-4' : 'hidden md:flex md:items-center md:gap-8'}>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={onLinkClick}
            className={cn(
              'relative font-bold transition-all duration-300 hover:scale-105 group',
              mobile && 'text-xl py-2',
              mobile && isScrolled && 'text-white/90 hover:text-[#FFD700]',
              mobile && !isScrolled && 'text-slate-900 hover:text-slate-700',
              !mobile && isScrolled && 'text-base text-white/90 hover:text-[#FFD700]',
              !mobile && !isScrolled && 'text-base text-slate-900 hover:text-slate-700'
            )}
          >
            {link.label}
            <span className={cn(
              "absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full",
              isScrolled
                ? 'bg-gradient-to-r from-[#FFA500] to-[#FFD700]'
                : 'bg-slate-900'
            )} />
          </Link>
        );
      })}
      <LanguageSwitcher isScrolled={isScrolled} />
    </nav>
  );
}
