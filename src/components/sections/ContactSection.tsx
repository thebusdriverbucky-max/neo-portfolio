'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import SectionTitle from '@/components/ui/SectionTitle';
import { FaPaperPlane } from 'react-icons/fa';
import Loader from '@/components/ui/Loader';
import { useLoader } from '@/hooks/useLoader'; // Импортируем хук

export function ContactSection() {
  const t = useTranslations('ContactSection');
  const { isLoading, withLoader } = useLoader(); // Используем хук

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [alert, setAlert] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAlert(null);

    withLoader(async () => {
      try {
        const response = await fetch('/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.success) {
          setAlert({ type: 'success', message: t('alert.success') });
          setFormData({ name: '', email: '', message: '' });
        } else {
          setAlert({ type: 'error', message: t('alert.error') });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setAlert({ type: 'error', message: t('alert.error') });
      }
    });
  };

  return (
    <>
      {isLoading && <Loader message={t('loaderMessage')} />}

      <section id="contact" className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <SectionTitle title={t('title')} />
          <div className="max-w-3xl mx-auto">
            {alert && (
              <div
                className={`p-4 mb-6 rounded-lg text-center ${
                  alert.type === 'success'
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-red-500/20 text-red-300'
                }`}
              >
                {alert.message}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder={t('form.name')}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all disabled:opacity-50"
                />
                <input
                  type="email"
                  name="email"
                  placeholder={t('form.email')}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all disabled:opacity-50"
                />
              </div>
              <textarea
                name="message"
                placeholder={t('form.message')}
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all disabled:opacity-50"
              ></textarea>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-bold rounded-lg hover:shadow-xl hover:shadow-amber-500/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? t('form.sending') : t('form.sendButton')}
                {!isLoading && <FaPaperPlane />}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
