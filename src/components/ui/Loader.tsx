'use client';

interface LoaderProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Loader({ 
  message = 'Loading...', 
  size = 'md' 
}: LoaderProps) {
  const sizes = {
    sm: { spinner: 'w-8 h-8', border: 'border-2', text: 'text-sm' },
    md: { spinner: 'w-16 h-16', border: 'border-4', text: 'text-lg' },
    lg: { spinner: 'w-24 h-24', border: 'border-[6px]', text: 'text-xl' }
  };

  const currentSize = sizes[size];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner с золотым градиентом */}
        <div className="relative">
          {/* Основной спиннер */}
          <div 
            className={`${currentSize.spinner} ${currentSize.border} rounded-full animate-spin`}
            style={{
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: '#FFD700',
              borderLeftColor: '#FFA500',
              animationDuration: '0.8s'
            }}
          />
          
          {/* Внутреннее свечение */}
          <div className={`absolute inset-0 ${currentSize.spinner} rounded-full bg-gradient-to-r from-[#FFA500]/30 to-[#FFD700]/30 blur-xl animate-pulse`} />
          
          {/* Дополнительное кольцо */}
          <div 
            className={`absolute inset-0 ${currentSize.spinner} border-2 rounded-full animate-spin`}
            style={{
              borderTopColor: 'transparent',
              borderRightColor: '#FFA500',
              borderBottomColor: '#FFD700',
              borderLeftColor: 'transparent',
              animationDirection: 'reverse',
              animationDuration: '1.5s'
            }}
          />
        </div>

        {/* Сообщение */}
        {message && (
          <div className="text-center">
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
