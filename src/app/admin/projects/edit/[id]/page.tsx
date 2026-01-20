import { prisma } from '@/lib/prisma';
import ProjectForm from '@/components/admin/forms/ProjectForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    notFound();
  }

  return (
    <div>
      <Link
        href="/admin/projects"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Назад к проектам
      </Link>

      <h2 className="text-3xl font-bold text-dark mb-6">Редактировать проект</h2>

      <ProjectForm project={project} mode="edit" />
    </div>
  );
}
