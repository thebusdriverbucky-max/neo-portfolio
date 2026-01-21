'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  isScrolled?: boolean;
}

export default function LanguageSwitcher({ isScrolled = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const nextLocale = locale === 'ru' ? 'en' : 'ru';

  const handleSwitch = () => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <motion.button
      onClick={handleSwitch}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative px-5 py-3 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center min-w-[4rem] shadow-lg overflow-hidden group",
        isScrolled
          ? "bg-gradient-to-r from-[#FFA500] to-[#FFD700] text-slate-900 shadow-amber-500/20 hover:shadow-amber-500/40"
          : "bg-slate-900 text-[#FFA500] shadow-slate-900/20 hover:bg-slate-800"
      )}
      aria-label={`Switch to ${nextLocale === 'ru' ? 'Russian' : 'English'}`}
    >
      {/* Hover Effect Overlay */}
      <div className={cn(
        "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300",
        isScrolled ? "bg-white" : "bg-[#FFA500]"
      )} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={locale}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative z-10 block"
        >
          {locale.toUpperCase()}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
