'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, Mail, Copy } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Alert } from '../ui/Alert';

// Контактный раздел с анимацией и копированием email
export function ContactSection() {
  const t = useTranslations('Contact');
  const [showAlert, setShowAlert] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('neodesignengineering@gmail.com');
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const contacts = [
    {
      icon: MessageCircle,
      label: t('items.whatsapp.label'),
      value: '+357 9779 5295',
      href: 'https://wa.me/35797795295',
      color: 'bg-green-500',
    },
    {
      icon: Send,
      label: t('items.telegram.label'),
      value: '@neofullstackdev',
      href: 'https://t.me/neofullstackdev',
      color: 'bg-blue-500',
    },
    {
      icon: Mail,
      label: t('items.email.label'),
      value: 'neodesigneng...',
      fullValue: 'neodesignengineering@gmail.com',
      color: 'bg-orange-500',
    },
  ];

  return (
    <>
      {showAlert && <Alert message="Email copied!" onClose={() => setShowAlert(false)} />}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" id="contacts">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('title')}
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contacts.map((contact, index) => {
              const Icon = contact.icon;
              if (contact.label === t('items.email.label')) {
                return (
                  <motion.div
                    key={index}
                    onClick={handleCopyEmail}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
                    className="bg-gradient-to-br from-[#FFA500] via-[#FFB84D] to-[#FFD700] rounded-2xl p-6 text-center shadow-2xl cursor-pointer"
                  >
                    <div className={`${contact.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{contact.label}</h3>
                    <div className="flex items-center justify-center">
                      <Copy className="w-4 h-4 mr-2 text-slate-800" />
                      <p className="text-slate-800 font-semibold truncate">{contact.value}</p>
                    </div>
                  </motion.div>
                );
              }
              return (
                <motion.a
                  key={index}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
                  className="bg-gradient-to-br from-[#FFA500] via-[#FFB84D] to-[#FFD700] rounded-2xl p-6 text-center shadow-2xl"
                >
                  <div className={`${contact.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{contact.label}</h3>
                  <p className="text-slate-800 font-semibold">{contact.value}</p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
