import ProjectForm from '@/components/admin/forms/ProjectForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewProjectPage() {
  return (
    <div>
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Назад к проектам
      </Link>

      <h2 className="text-3xl font-bold text-dark mb-6">Создать новый проект</h2>

      <ProjectForm mode="create" />
    </div>
  );
}
