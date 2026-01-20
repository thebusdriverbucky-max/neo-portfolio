'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, ExternalLink, Github } from 'lucide-react';
import { Project } from '@/types';
import Link from 'next/link';

interface ProjectsTableProps {
  projects: Project[];
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Вы уверены, что хотите удалить проект "${title}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' });

      if (res.ok) {
        router.refresh();
      } else {
        alert('Ошибка при удалении проекта');
      }
    } catch (error) {
      alert('Ошибка при удалении проекта');
    } finally {
      setDeletingId(null);
    }
  };

  if (projects.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-xl p-8 text-center text-white/60 border-2 border-amber-500/30">
        <p>Проектов пока нет. Добавьте первый проект!</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-xl shadow-2xl overflow-hidden border-2 border-amber-500/30">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900/50 border-b border-amber-500/30">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Название
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Технологии
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Featured
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">
                Ссылки
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-white uppercase tracking-wider">
                Действия
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-amber-500/20">
            {projects.map((project) => (
              <tr key={project.id} className="hover:bg-slate-700/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold text-white text-base mb-1">{project.title}</div>
                  <div className="text-sm text-white/60 line-clamp-2 max-w-md">
                    {project.description}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-medium rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2.5 py-1 bg-slate-600/30 text-white/60 text-xs font-medium rounded-md">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      project.featured
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-slate-600/30 text-white/60'
                    }`}
                  >
                    {project.featured ? 'Да' : 'Нет'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:text-amber-300 transition-colors"
                        title="Demo"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white transition-colors"
                        title="GitHub"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/projects/edit/${project.id}`}
                      className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors border border-transparent hover:border-blue-500/30"
                      title="Редактировать"
                    >
                      <Pencil className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(project.id, project.title)}
                      disabled={deletingId === project.id}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50 border border-transparent hover:border-red-500/30"
                      title="Удалить"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
