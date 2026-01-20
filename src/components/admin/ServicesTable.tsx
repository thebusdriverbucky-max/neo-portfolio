'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { Service } from '@/types';
import Link from 'next/link';

interface ServicesTableProps {
  services: Service[];
}

export default function ServicesTable({ services }: ServicesTableProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Вы уверены, что хотите удалить услугу "${title}"?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });

      if (res.ok) {
        router.refresh();
      } else {
        alert('Ошибка при удалении услуги');
      }
    } catch (error) {
      alert('Ошибка при удалении услуги');
    } finally {
      setDeletingId(null);
    }
  };

  if (services.length === 0) {
    return (
      <div className="col-span-2 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-xl p-8 text-center text-white/60 border-2 border-amber-500/30">
        <p>Услуг пока нет. Добавьте первую услугу!</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {services.map((service) => (
        <div key={service.id} className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800 rounded-xl p-6 shadow-2xl border-2 border-amber-500/30 hover:border-amber-500/50 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
              <p className="text-white/70">{service.description}</p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/admin/services/edit/${service.id}`}
                className="p-2 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors border border-transparent hover:border-blue-500/30"
                title="Редактировать"
              >
                <Pencil className="w-4 h-4" />
              </Link>
              <button
                onClick={() => handleDelete(service.id, service.title)}
                disabled={deletingId === service.id}
                className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors disabled:opacity-50 border border-transparent hover:border-red-500/30"
                title="Удалить"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          {service.price && (
            <p className="bg-gradient-to-r from-[#FFA500] to-[#FFD700] bg-clip-text text-transparent font-bold text-lg mb-4">
              {service.price}
            </p>
          )}
          {service.features.length > 0 && (
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white mb-2">Особенности:</p>
              <ul className="space-y-1">
                {service.features.slice(0, 3).map((feature, index) => (
                  <li key={index} className="text-sm text-white/70 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                    {feature}
                  </li>
                ))}
                {service.features.length > 3 && (
                  <li className="text-sm text-white/50">
                    +{service.features.length - 3} еще...
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
