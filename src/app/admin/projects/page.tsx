import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import ProjectsTable from '@/components/admin/ProjectsTable';

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { order: 'asc' },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-white">
          Управление <span className="bg-gradient-to-r from-[#FFA500] to-[#FFD700] bg-clip-text text-transparent">проектами</span>
        </h2>
        <Link
          href="/admin/projects/new"
          className="flex items-center gap-2 bg-gradient-to-r from-[#FFA500] to-[#FFD700] text-slate-900 px-6 py-3 rounded-lg font-bold hover:shadow-lg hover:scale-105 transition-all"
        >
          <Plus className="w-5 h-5" />
          Добавить проект
        </Link>
      </div>

      <ProjectsTable projects={projects} />
    </div>
  );
}
