'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Project } from '@/types';

const projectSchema = z.object({
  title: z.string().min(1, 'Название обязательно'),
  description: z.string().min(1, 'Описание обязательно'),
  longDescription: z.string().optional(),
  imageUrl: z.string().url('Неверный формат URL'),
  demoUrl: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  githubUrl: z.string().url('Неверный формат URL').optional().or(z.literal('')),
  technologies: z.string().min(1, 'Добавьте технологии через запятую'),
  featured: z.boolean(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: Project;
  mode: 'create' | 'edit';
}

export default function ProjectForm({ project, mode }: ProjectFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project
      ? {
          title: project.title,
          description: project.description,
          longDescription: project.longDescription || undefined,
          imageUrl: project.imageUrl,
          demoUrl: project.demoUrl || '',
          githubUrl: project.githubUrl || '',
          technologies: project.technologies.join(', '),
          featured: project.featured,
        }
      : {
          featured: false,
        },
  });

  const onSubmit = async (data: ProjectFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const payload = {
        ...data,
        technologies: data.technologies.split(',').map((t) => t.trim()).filter(Boolean),
        demoUrl: data.demoUrl || undefined,
        githubUrl: data.githubUrl || undefined,
      };

      const url = mode === 'create' ? '/api/projects' : `/api/projects/${project!.id}`;
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

      router.push('/admin/projects');
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
            Название проекта *
          </label>
          <input
            {...register('title')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Quadro Arcane"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Краткое описание */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Краткое описание *
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Краткое описание для карточки проекта"
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* Полное описание */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Полное описание
          </label>
          <textarea
            {...register('longDescription')}
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Детальное описание проекта"
          />
        </div>

        {/* URL изображения */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            URL изображения *
          </label>
          <input
            {...register('imageUrl')}
            type="url"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="https://images.unsplash.com/..."
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
          )}
          <p className="text-gray-500 text-sm mt-1">
            Используйте Unsplash или загрузите изображение
          </p>
        </div>

        {/* Demo URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Demo URL
          </label>
          <input
            {...register('demoUrl')}
            type="url"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="https://demo.vercel.app"
          />
          {errors.demoUrl && (
            <p className="text-red-500 text-sm mt-1">{errors.demoUrl.message}</p>
          )}
        </div>

        {/* GitHub URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            GitHub URL
          </label>
          <input
            {...register('githubUrl')}
            type="url"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="https://github.com/username/repo"
          />
          {errors.githubUrl && (
            <p className="text-red-500 text-sm mt-1">{errors.githubUrl.message}</p>
          )}
        </div>

        {/* Технологии */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Технологии *
          </label>
          <input
            {...register('technologies')}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Next.js, TypeScript, Tailwind CSS"
          />
          {errors.technologies && (
            <p className="text-red-500 text-sm mt-1">{errors.technologies.message}</p>
          )}
          <p className="text-gray-500 text-sm mt-1">
            Перечислите через запятую
          </p>
        </div>

        {/* Featured */}
        <div className="flex items-center gap-3">
          <input
            {...register('featured')}
            type="checkbox"
            className="w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label className="text-sm font-medium text-gray-700">
            Показать на главной (Featured)
          </label>
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
