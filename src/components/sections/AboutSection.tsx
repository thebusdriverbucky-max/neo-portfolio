'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import WaveDivider from '@/components/ui/WaveDivider';
import { useTranslations } from 'next-intl';

export function AboutSection() {
  const t = useTranslations('HomePage');

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" id="about">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Фото */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden md:block relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/mainpage.png"
              alt={t('imageAlt')}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent" />
          </motion.div>

          {/* Текст */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {t('title')}
            </h2>
            <p className="text-lg mb-6 leading-relaxed text-white/90">
              {t('description1')}
            </p>
            <p className="text-lg mb-8 leading-relaxed text-white/90">
              {t('description2')}
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="text-4xl font-bold mb-2">{t('stats.experience.value')}</div>
                <div className="text-sm text-white/80">{t('stats.experience.label')}</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="text-4xl font-bold mb-2">{t('stats.projects.value')}</div>
                <div className="text-sm text-white/80">{t('stats.projects.label')}</div>
              </div>
              <div className="text-center bg-white/10 backdrop-blur-sm p-4 rounded-xl">
                <div className="text-4xl font-bold mb-2">{t('stats.clients.value')}</div>
                <div className="text-sm text-white/80">{t('stats.clients.label')}</div>
              </div>
            </div>

            <div className="flex justify-center md:justify-start">
              <Button href="/about" variant="secondary" size="lg">
                {t('more')} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>


      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <WaveDivider color="dark" />
      </div>
    </section>
  );
}
