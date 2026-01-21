'use client';

interface LoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Loader({ 
  message = 'Загрузка...', 
  size = 'md' 
}: LoaderProps) {
  const sizes = {
    sm: { spinner: 'w-8 h-8 border-2', text: 'text-sm' },
    md: { spinner: 'w-16 h-16 border-4', text: 'text-lg' },
    lg: { spinner: 'w-24 h-24 border-[6px]', text: 'text-xl' }
  };

  const currentSize = sizes[size];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm animate-fadeIn">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner с золотым градиентом */}
        <div className="relative">
          {/* Основной спиннер */}
          <div 
            className={`${currentSize.spinner} rounded-full border-t-transparent border-r-transparent animate-spin`}
            style={{
              borderImage: 'linear-gradient(45deg, #FFA500, #FFD700) 1',
              borderImageSlice: 1,
              borderWidth: '4px',
              borderStyle: 'solid',
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: '#FFD700',
              borderLeftColor: '#FFA500'
            }}
          />
          
          {/* Внутреннее свечение */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFA500]/30 to-[#FFD700]/30 blur-xl animate-pulse" />
          
          {/* Дополнительное кольцо (опционально) */}
          <div 
            className={`absolute inset-0 ${currentSize.spinner} rounded-full border-t-transparent border-l-transparent animate-spin`}
            style={{
              animationDirection: 'reverse',
              animationDuration: '1.5s',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderTopColor: 'transparent',
              borderRightColor: '#FFA500',
              borderBottomColor: '#FFD700',
              borderLeftColor: 'transparent'
            }}
          />
        </div>

        {/* Сообщение */}
        {message && (
          <div className="text-center animate-fadeIn">
            <p className={`text-white font-bold ${currentSize.text} mb-2`}>
              {message}
            </p>
            <div className="flex gap-1 justify-center">
              <span className="w-2 h-2 bg-gradient-to-r from-[#FFA500] to-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-gradient-to-r from-[#FFA500] to-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-gradient-to-r from-[#FFA500] to-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
