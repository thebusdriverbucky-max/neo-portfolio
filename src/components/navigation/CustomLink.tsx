'use client';

import { Link as NextIntlLink } from '@/i18n/routing';
import { useLoader } from '@/contexts/LoaderContext';
import { usePathname } from 'next/navigation';
import { ComponentProps, useEffect, useRef } from 'react';

type LinkProps = ComponentProps<typeof NextIntlLink>;

export function Link({ href, onClick, ...props }: LinkProps) {
  const { showLoader, hideLoader } = useLoader();
  const pathname = usePathname();
  const isNavigatingRef = useRef(false);
  const minDisplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Вызываем оригинальный onClick если есть
    onClick?.(e);

    // Если клик отменен - не показываем loader
    if (e.defaultPrevented) return;

    // Получаем целевой путь
    const targetHref = typeof href === 'string' ? href : href.pathname || '';
    
    // Нормализуем пути для сравнения (убираем locale prefix)
    const currentPath = pathname.replace(/^\/(en|ru)/, '') || '/';
    const targetPath = targetHref.replace(/^\/(en|ru)/, '') || '/';

    // Если это та же страница - не показываем loader
    if (currentPath === targetPath) return;

    // Показываем loader
    showLoader();
    isNavigatingRef.current = true;
    startTimeRef.current = Date.now();
  };

  // Отслеживаем изменение pathname (завершение навигации)
  useEffect(() => {
    if (isNavigatingRef.current) {
      const elapsedTime = Date.now() - startTimeRef.current;
      const minDisplayTime = 300; // минимальное время показа
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);

      // Скрываем loader с учетом минимального времени показа
      minDisplayTimerRef.current = setTimeout(() => {
        hideLoader();
        isNavigatingRef.current = false;
      }, remainingTime);
    }

    return () => {
      if (minDisplayTimerRef.current) {
        clearTimeout(minDisplayTimerRef.current);
      }
    };
  }, [pathname, hideLoader]);

  return <NextIntlLink href={href} onClick={handleClick} {...props} />;
}

// Экспортируем остальное из i18n/routing
export { redirect, usePathname, useRouter, getPathname } from '@/i18n/routing';
