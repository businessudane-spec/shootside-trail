'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bell, Check, CheckCheck, AtSign, MessageSquare, CheckCircle2, ExternalLink } from 'lucide-react';
import { usePMData } from '@/lib/pm-data-context';
import { pmApi } from '@/lib/pm-api';

export const PMNotificationsDropdown: React.FC = () => {
  const { 
    notifications, 
    unreadNotificationsCount, 
    markNotificationRead, 
    markAllNotificationsRead,
    tasks,
    setSelectedTask
  } = usePMData();
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

  const handleNotificationClick = async (n: typeof notifications[0]) => {
    if (!n.is_read) {
      markNotificationRead(n.id);
    }
    if (n.entity_type === 'task' && n.entity_id) {
      let targetTask = tasks.find(t => t.id === n.entity_id);
      if (!targetTask) {
        try {
          const res = await pmApi.getTask(n.entity_id);
          if (res.success && res.data) {
            targetTask = res.data;
          }
        } catch (e) {
          console.error('Error fetching task for notification:', e);
        }
      }
      if (targetTask) {
        setSelectedTask(targetTask);
        setIsOpen(false);
      }
    }
  };

  return (
    <div className="relative shrink-0" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shrink-0"
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
        <div className="absolute right-0 mt-2 w-80 sm:w-96 max-w-[calc(100vw-1.5rem)] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden">
          <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Notifications</span>
              {unreadNotificationsCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-semibold">
                  {unreadNotificationsCount} new
                </span>
              )}
            </div>

            {notifications.length > 0 && (
              <button
                onClick={() => markAllNotificationsRead()}
                className="text-[11px] text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center space-x-1 cursor-pointer transition-colors"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400 dark:text-slate-500">
                <Bell className="w-6 h-6 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
                No notifications right now
              </div>
            ) : (
              notifications.map(n => {
                const isMention = n.type === 'mention';
                return (
                  <div
                    key={n.id}
                    onClick={() => handleNotificationClick(n)}
                    className={`p-3 text-xs transition-colors flex items-start justify-between space-x-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
                      n.is_read ? 'opacity-60 bg-white' : isMention ? 'bg-amber-50/60 dark:bg-amber-950/20' : 'bg-blue-50/40'
                    }`}
                  >
                    <div className="flex items-start space-x-2.5 flex-1 min-w-0">
                      <div className={`mt-0.5 p-1 rounded-lg shrink-0 ${
                        isMention 
                          ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300' 
                          : 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300'
                      }`}>
                        {isMention ? <AtSign className="w-3.5 h-3.5" /> : <MessageSquare className="w-3.5 h-3.5" />}
                      </div>

                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center space-x-1.5 flex-wrap">
                          <p className="font-semibold text-slate-900 dark:text-white truncate">{n.title}</p>
                          {isMention && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100">
                              Mention
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed break-words">{n.message}</p>
                        <div className="flex items-center justify-between pt-0.5">
                          <p className="text-[10px] text-slate-400 font-mono">{n.created_at}</p>
                          {n.entity_type === 'task' && (
                            <span className="inline-flex items-center space-x-1 text-[10px] text-blue-600 dark:text-blue-400 font-semibold group-hover:underline">
                              <span>Open Task</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {!n.is_read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markNotificationRead(n.id);
                        }}
                        className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-blue-600 cursor-pointer shrink-0"
                        title="Mark as read"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
