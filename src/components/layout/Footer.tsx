import { Mail } from 'lucide-react';
import { FaWhatsapp, FaTelegramPlane } from 'react-icons/fa';
import { Link } from '../../i18n/routing';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <FaWhatsapp size={24} />,
      href: 'https://wa.me/your-phone',
      label: 'WhatsApp',
    },
    {
      icon: <FaTelegramPlane size={24} />,
      href: 'https://t.me/your-username',
      label: 'Telegram',
    },
    {
      icon: <Mail size={24} />,
      href: 'mailto:your-email@example.com',
      label: 'Email',
    },
  ];

  const navLinks = [
    { href: '/', label: 'home' },
    { href: '/about', label: 'about' },
    { href: '/services', label: 'services' },
    { href: '/portfolio', label: 'portfolio' },
    { href: '/contact', label: 'contact' },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 border-t-2 border-amber-500/30 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl xl:max-w-6xl 2xl:max-w-7xl py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FFA500] to-[#FFD700] bg-clip-text text-transparent mb-4">
              Portfolio
            </h3>
            <p className="text-white/70 leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">{t('navigation')}</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-[#FFD700] transition-colors"
                  >
                    {tNav(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">{t('contact')}</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 rounded-lg hover:bg-amber-500/20 hover:scale-110 transition-all duration-300 border border-amber-500/30 hover:border-amber-500/60"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-amber-500/20 pt-8 text-center">
          <p className="text-white/60 text-sm">&copy; {currentYear} Portfolio. {t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
