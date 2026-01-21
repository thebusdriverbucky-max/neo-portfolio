'use client';

import { useState } from 'react';
import PageLayout from '@/components/layout/PageLayout'
import { Alert } from '@/components/ui/Alert';
import { Mail, MessageCircle, Send, Copy } from 'lucide-react'
import { useTranslations } from 'next-intl';

export default function ContactPage() {
  const t = useTranslations('Contact');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('neodesignengineering@gmail.com');
    setAlertMessage('Email copied!');
    setAlertType('success');
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setAlertMessage('Message sent successfully!');
        setAlertType('success');
        setShowAlert(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errorData = await response.json();
        setAlertMessage(errorData.message || 'Failed to send message.');
        setAlertType('error');
        setShowAlert(true);
      }
    } catch (error) {
      setAlertMessage('An unexpected error occurred.');
      setAlertType('error');
      setShowAlert(true);
    } finally {
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    }
  };

  return (
    <>
      {showAlert && <Alert message={alertMessage} type={alertType} onClose={() => setShowAlert(false)} />}
      <PageLayout
        title={t('title')}
        subtitle={t('subtitle')}
      >
        <div className="max-w-4xl mx-auto">
          {/* Карточки контактов */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <a
              href={`https://wa.me/${t('items.whatsapp.value').replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-8 text-center border-2 border-amber-500/30 hover:border-amber-500/60 hover:scale-105 transition-all shadow-2xl"
            >
              <div className="bg-gradient-to-br from-[#FFA500] to-[#FFD700] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-slate-900" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t('items.whatsapp.label')}</h3>
              <p className="text-white/80">{t('items.whatsapp.value')}</p>
            </a>

            <a
              href={`https://t.me/${t('items.telegram.value').replace('@', '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-8 text-center border-2 border-amber-500/30 hover:border-amber-500/60 hover:scale-105 transition-all shadow-2xl"
            >
              <div className="bg-gradient-to-br from-[#FFA500] to-[#FFD700] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-slate-900" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t('items.telegram.label')}</h3>
              <p className="text-white/80">{t('items.telegram.value')}</p>
            </a>

            <div
              onClick={handleCopyEmail}
              className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-8 text-center border-2 border-amber-500/30 hover:border-amber-500/60 hover:scale-105 transition-all shadow-2xl cursor-pointer"
            >
              <div className="bg-gradient-to-br from-[#FFA500] to-[#FFD700] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-slate-900" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{t('items.email.label')}</h3>
              <div className="flex items-center justify-center">
                <Copy className="w-4 h-4 mr-2 text-white/80" />
                <p className="text-white/80 truncate">neodesigneng...</p>
              </div>
            </div>
          </div>

          {/* Форма обратной связи */}
          <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-8 border-2 border-amber-500/30 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">{t('form.title')}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white mb-2">{t('form.name')}</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-600/30 border border-amber-500/30 rounded-lg text-white focus:border-amber-500/60 focus:outline-none"
                  placeholder={t('form.namePlaceholder')}
                />
              </div>
              <div>
                <label className="block text-white mb-2">{t('form.email')}</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-600/30 border border-amber-500/30 rounded-lg text-white focus:border-amber-500/60 focus:outline-none"
                  placeholder={t('form.emailPlaceholder')}
                />
              </div>
              <div>
                <label className="block text-white mb-2">{t('form.message')}</label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-600/30 border border-amber-500/30 rounded-lg text-white focus:border-amber-500/60 focus:outline-none resize-none"
                  placeholder={t('form.messagePlaceholder')}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#FFA500] to-[#FFD700] text-slate-900 font-bold rounded-lg hover:shadow-xl hover:scale-105 transition-all"
              >
                {t('form.submit')}
              </button>
            </form>
          </div>
        </div>
      </PageLayout>
    </>
  )
}
