import { prisma } from '@/lib/prisma';
import MessageCard from '@/components/admin/MessageCard';

export default async function MessagesPage() {
  const messages = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const unreadCount = messages.filter(m => !m.read).length;

  return (
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
        
        {messages.filter(m => m.read).length > 0 && (
          <button className="px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 hover:bg-red-500/30 transition-all">
            Delete All Read
          </button>
        )}
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
  );
}
