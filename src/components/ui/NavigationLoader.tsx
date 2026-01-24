'use client';

import { useLoader } from '@/contexts/LoaderContext';
import { useEffect, useState } from 'react';

export default function NavigationLoader() {
  const { isLoading } = useLoader();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    let appearanceTimer: NodeJS.Timeout;
    let hideTimer: NodeJS.Timeout;

    if (isLoading) {
      appearanceTimer = setTimeout(() => {
        setShouldRender(true);
        setTimeout(() => setIsVisible(true), 10);
      }, 150);
    } else if (shouldRender) {
      // ✅ ФИКС: используем setTimeout вместо прямого вызова
      hideTimer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setShouldRender(false), 300);
      }, 0);
    }

    return () => {
      clearTimeout(appearanceTimer);
      clearTimeout(hideTimer);
    };
  }, [isLoading, shouldRender]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/70 backdrop-blur-md transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
    >
      <div className="flex flex-col items-center gap-6">
        {/* Золотой градиентный спиннер */}
        <div className="relative">
          <div
            className="w-20 h-20 rounded-full border-4 animate-spin"
            style={{
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: '#FFD700',
              borderLeftColor: '#FFA500',
              animationDuration: '0.8s',
            }}
          />
          {/* Внутреннее свечение */}
          <div className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-r from-[#FFA500]/40 to-[#FFD700]/40 blur-2xl animate-pulse" />
        </div>
        {/* Текст */}
        <div className="text-center">
          <p className="text-white text-xl font-bold mb-2">Loading...</p>
          <div className="flex gap-1 justify-center">
            <span
              className="w-2 h-2 bg-gradient-to-r from-[#FFA500] to-[#FFD700] rounded-full animate-bounce"
              style={{ animationDelay: '0ms' }}
            />
            <span
              className="w-2 h-2 bg-gradient-to-r from-[#FFA500] to-[#FFD700] rounded-full animate-bounce"
              style={{ animationDelay: '150ms' }}
            />
            <span
              className="w-2 h-2 bg-gradient-to-r from-[#FFA500] to-[#FFD700] rounded-full animate-bounce"
              style={{ animationDelay: '300ms' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
