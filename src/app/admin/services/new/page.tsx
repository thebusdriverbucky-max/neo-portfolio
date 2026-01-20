import ServiceForm from '@/components/admin/forms/ServiceForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewServicePage() {
  return (
    <div>
      <Link
        href="/admin/services"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Назад к услугам
      </Link>

      <h2 className="text-3xl font-bold text-dark mb-6">Создать новую услугу</h2>

      <ServiceForm mode="create" />
    </div>
  );
}
