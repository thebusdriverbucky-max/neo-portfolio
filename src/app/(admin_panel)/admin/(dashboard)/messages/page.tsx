'use client';

import { useState, useEffect } from 'react';
import MessageCard from '@/components/admin/MessageCard';
import { Contact } from '@prisma/client';
import Loader from '@/components/ui/Loader'; // ДОБАВЛЕНО

export default function MessagesPage() {
  const [messages, setMessages] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch('/api/contacts');
        const data = await response.json();
        if (data.success) {
          setMessages(data.data);
        }
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const handleDeleteAll = async () => {
    if (!confirm('Удалить все сообщения?')) return;

    setIsDeleting(true);

    try {
      const response = await fetch('/api/contacts/delete-all', {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        alert(`Удалено ${data.count} сообщений`);
        window.location.reload();
      } else {
        alert('Ошибка: ' + data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка при удалении');
    } finally {
      setIsDeleting(false);
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  // ИЗМЕНЕНО: вместо <div>Loading...</div>
  if (loading) {
    return <Loader message="Загрузка сообщений..." size="md" />;
  }

  return (
    <>
      {/* ДОБАВЛЕНО: Loader при удалении всех сообщений */}
      {isDeleting && <Loader message="Удаление сообщений..." size="md" />}

      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Messages
            </h1>
            <p className="text-slate-400">
              {unreadCount > 0 ? (
                <span className="text-amber-400 font-bold">{unreadCount} new messages</span>
              ) : (
                'All messages read'
              )}
            </p>
          </div>

          <button
            onClick={handleDeleteAll}
            disabled={messages.length === 0 || isDeleting}
            className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? 'Удаление...' : 'Delete All'}
          </button>
        </div>

        {/* Messages List */}
        {messages.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-400 text-xl">No messages yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}