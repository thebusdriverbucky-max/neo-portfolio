'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Service } from '@/types';

const ICON_OPTIONS = [
  { value: 'Code', label: 'Code (разработка)' },
  { value: 'Layers', label: 'Layers (дизайн)' },
  { value: 'Palette', label: 'Palette (цвета)' },
  { value: 'Wrench', label: 'Wrench (настройка)' },
];

const serviceSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  description: z.string().min(1, 'Описание обязательно'),
  price: z.string().optional(),
  icon: z.string().optional(),
  features: z.string().min(1, 'Добавьте особенности через запятую'),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

interface ServiceFormProps {
  service?: Service;
  mode: 'create' | 'edit';
}

export default function ServiceForm({ service, mode }: ServiceFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: service
      ? {
          title: service.title,
          description: service.description,
          price: service.price || undefined,
          icon: service.icon || 'Code',
          features: service.features.join(', '),
        }
      : {
          icon: 'Code',
        },
  });

  const onSubmit = async (data: ServiceFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const payload = {
        ...data,
        features: data.features.split(',').map((t) => t.trim()).filter(Boolean),
      };

      const url = mode === 'create' ? '/api/services' : `/api/services/${service!.id}`;
      const method = mode === 'create' ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Ошибка при сохранении');
      }

      router.push('/admin/services');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">
        {/* Название */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Название услуги *
          </label>
          <input
            {...register('title')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Веб-разработка"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Описание */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Описание услуги *
          </label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Подробное описание услуги..."
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Цена */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Цена
          </label>
          <input
            {...register('price')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="от $500"
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Иконка */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Иконка
          </label>
          <select
            {...register('icon')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {ICON_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.icon && (
            <p className="text-red-500 text-sm mt-1">{errors.icon.message}</p>
          )}
        </div>

        {/* Особенности */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Особенности *
          </label>
          <textarea
            {...register('features')}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Кастомный дизайн, SEO оптимизация, Техподдержка"
          />
          {errors.features && (
            <p className="text-red-500 text-sm mt-1">{errors.features.message}</p>
          )}
          <p className="text-gray-500 text-sm mt-1">
            Перечислите через запятую
          </p>
        </div>

        {/* Кнопки */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isLoading ? 'Сохранение...' : mode === 'create' ? 'Создать' : 'Сохранить'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Отмена
          </button>
        </div>
      </div>
    </form>
  );
}
