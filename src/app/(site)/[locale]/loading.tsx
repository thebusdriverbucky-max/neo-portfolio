export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div 
            className="w-16 h-16 rounded-full border-4 animate-spin"
            style={{
              borderTopColor: 'transparent',
              borderRightColor: 'transparent',
              borderBottomColor: '#FFD700',
              borderLeftColor: '#FFA500'
            }}
          />
          <div className="absolute inset-0 w-16 h-16 rounded-full bg-gradient-to-r from-[#FFA500]/30 to-[#FFD700]/30 blur-xl animate-pulse" />
        </div>
        <div className="text-center">
          <p className="text-white text-lg font-bold mb-2">Загрузка страницы...</p>
          <div className="flex gap-1 justify-center">
            <span className="w-2 h-2 bg-gradient-to-r from-[#FFA500] to-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-gradient-to-r from-[#FFA500] to-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-gradient-to-r from-[#FFA500] to-[#FFD700] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
