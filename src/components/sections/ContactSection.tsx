'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Send, Mail } from 'lucide-react';

// TODO: Обновите контакты в массиве contacts ниже:
// - WhatsApp: замените номер телефона
// - Telegram: замените username
// - Email: замените email адрес
export function ContactSection() {
  const contacts = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      value: '+357 XX XXX XXX', // Пользователь обновит позже
      href: 'https://wa.me/357XXXXXXXX',
      color: 'bg-green-500',
    },
    {
      icon: Send,
      label: 'Telegram',
      value: '@yourusername', // Пользователь обновит
      href: 'https://t.me/yourusername',
      color: 'bg-blue-500',
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'your@email.com', // Пользователь обновит
      href: 'mailto:your@email.com',
      color: 'bg-orange-500',
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" id="contacts">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl xl:max-w-6xl 2xl:max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Свяжитесь со мной
          </h2>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Готов обсудить ваш проект. Выберите удобный способ связи!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contacts.map((contact, index) => {
            const Icon = contact.icon;
            return (
              <motion.a
                key={index}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#FFA500] via-[#FFB84D] to-[#FFD700] rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 shadow-2xl"
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
  );
}
