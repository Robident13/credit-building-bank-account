import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Bell, BellOff, Check, CheckCheck, Trash2 } from 'lucide-react';
import { NOTIFICATIONS } from '../data/mockData';
import type { AppNotification } from '../data/types';

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<AppNotification[]>(NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = filter === 'unread'
    ? notifications.filter(n => !n.read)
    : notifications;

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getTypeBadgeColor = (type: AppNotification['type']) => {
    const colors: Record<string, string> = {
      transaction: 'bg-blue-100 text-blue-700',
      task: 'bg-green-100 text-green-700',
      alert: 'bg-red-100 text-red-700',
      limit: 'bg-amber-100 text-amber-700',
      credit: 'bg-purple-100 text-purple-700',
      safety: 'bg-rose-100 text-rose-700',
      system: 'bg-slate-100 text-slate-700',
    };
    return colors[type] || 'bg-slate-100 text-slate-700';
  };

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <header className="px-6 pt-8 pb-4 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-600 text-sm font-medium" aria-label="Go back">
            <ArrowLeft size={18} />
            Back
          </button>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="flex items-center gap-1 text-blue-600 text-sm font-medium" aria-label="Mark all as read">
              <CheckCheck size={16} />
              Mark all read
            </button>
          )}
        </div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{unreadCount}</span>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mt-4" role="tablist">
          <button
            role="tab"
            aria-selected={filter === 'all'}
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            role="tab"
            aria-selected={filter === 'unread'}
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'unread' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <BellOff size={28} className="text-slate-400" />
            </div>
            <p className="text-lg font-semibold text-slate-700 mb-1">All caught up!</p>
            <p className="text-sm text-slate-500 text-center">No {filter === 'unread' ? 'unread ' : ''}notifications right now</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {filteredNotifications.map((notification) => (
              <li
                key={notification.id}
                className={`px-6 py-4 transition-colors ${
                  !notification.read ? 'bg-blue-50/50' : 'bg-white'
                }`}
              >
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-lg flex-shrink-0" aria-hidden="true">
                    {notification.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`text-sm font-semibold ${!notification.read ? 'text-slate-900' : 'text-slate-700'}`}>
                          {notification.title}
                        </h3>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${getTypeBadgeColor(notification.type)}`}>
                          {notification.type}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 flex-shrink-0 whitespace-nowrap">{notification.time}</span>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{notification.message}</p>
                    {notification.child && (
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{notification.child}</span>
                    )}
                    <div className="flex gap-2 mt-2">
                      {!notification.read && (
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                          aria-label={`Mark "${notification.title}" as read`}
                        >
                          <Check size={12} /> Mark read
                        </button>
                      )}
                      <button
                        onClick={() => deleteNotification(notification.id)}
                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-600"
                        aria-label={`Delete notification: ${notification.title}`}
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                  {!notification.read && (
                    <div className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" aria-label="Unread" />
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>

      {/* Notification Settings Footer */}
      <div className="px-6 py-4 bg-white border-t border-slate-200">
        <button
          onClick={() => navigate('/settings')}
          className="w-full flex items-center justify-center gap-2 text-sm text-slate-600 hover:text-slate-800 transition-colors"
        >
          <Bell size={16} />
          Notification Settings
        </button>
      </div>
    </div>
  );
}
