'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';
import { FaPaperPlane } from 'react-icons/fa';
import Loader from '@/components/ui/Loader';

export default function ContactSection() {
  const t = useTranslations('Contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert('✅ ' + t('successMessage', { default: 'Сообщение отправлено успешно!' }));
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('❌ ' + (data.error || 'Ошибка отправки'));
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('❌ Ошибка отправки. Попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Loader Overlay */}
      {isLoading && (
        <Loader 
          message={t('sending', { default: 'Отправка сообщения...' })} 
          size="md" 
        />
      )}

      <section id="contact" className="relative py-24 bg-slate-900">
        {/* Форма */}
        <div className="container mx-auto px-4">
          <SectionTitle 
            title={t('title')}
            subtitle={t('subtitle')}
          />

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div>
              <label className="block text-white mb-2">{t('nameLabel')}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t('namePlaceholder')}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border-2 border-slate-700 text-white focus:border-amber-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>

            <div>
              <label className="block text-white mb-2">{t('emailLabel')}</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder={t('emailPlaceholder')}
                required
                disabled={isLoading}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border-2 border-slate-700 text-white focus:border-amber-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              />
            </div>

            <div>
              <label className="block text-white mb-2">{t('messageLabel')}</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={t('messagePlaceholder')}
                required
                disabled={isLoading}
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border-2 border-slate-700 text-white focus:border-amber-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-[#FFA500] to-[#FFD700] text-slate-900 font-bold rounded-lg hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>Отправка...</>
              ) : (
                <>
                  <FaPaperPlane />
                  {t('submitButton')}
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
