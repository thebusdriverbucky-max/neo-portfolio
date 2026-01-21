'use client';

import { FaTrash, FaEnvelopeOpen, FaEnvelope } from 'react-icons/fa';
import { Contact } from '@prisma/client';
import { format } from 'date-fns';
import Loader from '@/components/ui/Loader';
import { useLoader } from '@/hooks/useLoader'; // Импортируем хук

interface MessageCardProps {
  message: Contact;
}

export default function MessageCard({ message }: MessageCardProps) {
  const { isLoading, withLoader } = useLoader(); // Используем хук

  const handleDelete = () => {
    if (!confirm('Вы уверены, что хотите удалить это сообщение?')) return;

    withLoader(async () => {
      try {
        const response = await fetch(`/api/contacts?id=${message.id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          window.location.reload();
        } else {
          alert('Ошибка при удалении сообщения.');
        }
      } catch (error) {
        console.error('Failed to delete message:', error);
        alert('Ошибка при удалении сообщения.');
      }
    });
  };

  const handleMarkAsRead = () => {
    if (message.read) return;

    withLoader(async () => {
      try {
        const response = await fetch('/api/contacts', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: message.id, read: true }),
        });
        if (response.ok) {
          window.location.reload();
        } else {
          alert('Ошибка при обновлении сообщения.');
        }
      } catch (error) {
        console.error('Failed to mark as read:', error);
        alert('Ошибка при обновлении сообщения.');
      }
    });
  };

  return (
    <>
      {isLoading && <Loader message="Обработка..." size="sm" />}
      <div
        className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${
          message.read
            ? 'bg-slate-800 border-slate-700'
            : 'bg-gradient-to-br from-slate-700 to-slate-800 border-amber-500 border-2 shadow-amber-500/10'
        }`}
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-white">{message.name}</h3>
            <a
              href={`mailto:${message.email}`}
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              {message.email}
            </a>
          </div>
          <span className="text-xs text-slate-400">
            {format(new Date(message.createdAt), 'dd MMM yyyy, HH:mm')}
          </span>
        </div>
        <p className="mt-4 text-slate-300 whitespace-pre-wrap">
          {message.message}
        </p>
        <div className="mt-6 flex items-center justify-end gap-4">
          <button
            onClick={handleMarkAsRead}
            disabled={message.read || isLoading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-700 rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title={message.read ? 'Прочитано' : 'Пометить как прочитанное'}
          >
            {message.read ? <FaEnvelopeOpen /> : <FaEnvelope />}
            <span>{message.read ? 'Прочитано' : 'Прочитать'}</span>
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Удалить сообщение"
          >
            <FaTrash />
            <span>Удалить</span>
          </button>
        </div>
      </div>
    </>
  );
}
