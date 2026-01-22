'use client';

import { Link as NextIntlLink } from '@/i18n/routing';
import { useLoader } from '@/contexts/LoaderContext';
import { usePathname } from '@/i18n/routing';
import { ComponentProps, useTransition } from 'react';

type LinkProps = ComponentProps<typeof NextIntlLink>;

export function Link({ href, onClick, ...props }: LinkProps) {
  const { showLoader, hideLoader } = useLoader();
  const currentPathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Вызываем оригинальный onClick если есть
    onClick?.(e);

    // Если клик отменен или это внешняя ссылка - не показываем loader
    if (e.defaultPrevented) return;
    
    // Проверяем не та ли это же страница
    const targetHref = typeof href === 'string' ? href : href.pathname || '';
    if (currentPathname === targetHref) return;

    // Показываем loader
    showLoader();

    // Скрываем loader через 2 секунды максимум (fallback)
    const fallbackTimer = setTimeout(() => {
      hideLoader();
    }, 2000);

    // Transition для отслеживания завершения навигации
    startTransition(() => {
      // Навигация произойдет автоматически через next-intl Link
      // После завершения transition скрываем loader
      Promise.resolve().then(() => {
        clearTimeout(fallbackTimer);
        // Минимальное время показа 300мс
        setTimeout(() => {
          hideLoader();
        }, 300);
      });
    });
  };

  return <NextIntlLink href={href} onClick={handleClick} {...props} />;
}

// Экспортируем остальное из i18n/routing
export { redirect, usePathname, useRouter, getPathname } from '@/i18n/routing';
