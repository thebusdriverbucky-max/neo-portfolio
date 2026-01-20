import PageLayout from '@/components/layout/PageLayout'
import { Mail, MessageCircle, Send } from 'lucide-react'

export const metadata = {
  title: 'Контакты | Portfolio',
  description: 'Свяжитесь со мной для обсуждения проекта',
}

export default function ContactPage() {
  return (
    <PageLayout
      title="Свяжитесь со мной"
      subtitle="Готов обсудить ваш проект. Выберите удобный способ связи!"
    >
      <div className="max-w-4xl mx-auto">
        {/* Карточки контактов */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <a
            href="https://wa.me/357XXXXXXXX"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-8 text-center border-2 border-amber-500/30 hover:border-amber-500/60 hover:scale-105 transition-all shadow-2xl"
          >
            <div className="bg-gradient-to-br from-[#FFA500] to-[#FFD700] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-slate-900" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">WhatsApp</h3>
            <p className="text-white/80">+357 XX XXX XXX</p>
          </a>

          <a
            href="https://t.me/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-8 text-center border-2 border-amber-500/30 hover:border-amber-500/60 hover:scale-105 transition-all shadow-2xl"
          >
            <div className="bg-gradient-to-br from-[#FFA500] to-[#FFD700] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-slate-900" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Telegram</h3>
            <p className="text-white/80">@yourusername</p>
          </a>

          <a
            href="mailto:your@email.com"
            className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-8 text-center border-2 border-amber-500/30 hover:border-amber-500/60 hover:scale-105 transition-all shadow-2xl"
          >
            <div className="bg-gradient-to-br from-[#FFA500] to-[#FFD700] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-slate-900" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Email</h3>
            <p className="text-white/80">your@email.com</p>
          </a>
        </div>

        {/* Форма обратной связи */}
        <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-8 border-2 border-amber-500/30 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Или напишите мне</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-white mb-2">Имя</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-slate-600/30 border border-amber-500/30 rounded-lg text-white focus:border-amber-500/60 focus:outline-none"
                placeholder="Ваше имя"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 bg-slate-600/30 border border-amber-500/30 rounded-lg text-white focus:border-amber-500/60 focus:outline-none"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Сообщение</label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 bg-slate-600/30 border border-amber-500/30 rounded-lg text-white focus:border-amber-500/60 focus:outline-none resize-none"
                placeholder="Расскажите о вашем проекте"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#FFA500] to-[#FFD700] text-slate-900 font-bold rounded-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Отправить
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  )
}
