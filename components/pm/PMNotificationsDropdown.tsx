'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, CheckCheck } from 'lucide-react';
import { usePMData } from '@/lib/pm-data-context';

export const PMNotificationsDropdown: React.FC = () => {
  const { notifications, unreadNotificationsCount, markNotificationRead, markAllNotificationsRead } = usePMData();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all cursor-pointer"
        title="Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadNotificationsCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white font-bold text-[9px] flex items-center justify-center rounded-full shadow-md">
            {unreadNotificationsCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-900">Notifications</span>
              {unreadNotificationsCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-blue-100 text-blue-700 font-semibold">
                  {unreadNotificationsCount} new
                </span>
              )}
            </div>

            {notifications.length > 0 && (
              <button
                onClick={() => markAllNotificationsRead()}
                className="text-[11px] text-slate-500 hover:text-blue-600 flex items-center space-x-1 cursor-pointer transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                <Bell className="w-6 h-6 mx-auto mb-2 text-slate-300" />
                No notifications right now
              </div>
            ) : (
              notifications.map(n => (
                <div
                  key={n.id}
                  className={`p-3 text-xs transition-colors flex items-start justify-between space-x-3 ${
                    n.is_read ? 'opacity-60 bg-white' : 'bg-blue-50/40'
                  }`}
                >
                  <div className="space-y-1 flex-1">
                    <p className="font-semibold text-slate-900">{n.title}</p>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{n.message}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{n.created_at}</p>
                  </div>

                  {!n.is_read && (
                    <button
                      onClick={() => markNotificationRead(n.id)}
                      className="p-1 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-blue-600 cursor-pointer"
                      title="Mark as read"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
