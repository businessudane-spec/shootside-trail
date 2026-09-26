'use client';

import React, { useState } from 'react';
import {
  Bell,
  Check,
  CheckCheck,
  AtSign,
  MessageSquare,
  CheckCircle2,
  ExternalLink,
  Inbox,
  Filter,
  UserCheck,
  Sparkles
} from 'lucide-react';
import { usePMData } from '@/lib/pm-data-context';
import { pmApi } from '@/lib/pm-api';

interface PMNotificationsViewProps {
  onSelectTask?: (task: any) => void;
}

export const PMNotificationsView: React.FC<PMNotificationsViewProps> = ({ onSelectTask }) => {
  const {
    notifications,
    unreadNotificationsCount,
    markNotificationRead,
    markAllNotificationsRead,
    tasks,
    setSelectedTask
  } = usePMData();

  const [filterType, setFilterType] = useState<'all' | 'unread' | 'mentions'>('all');

  const filteredNotifications = notifications.filter(n => {
    if (filterType === 'unread') return !n.is_read;
    if (filterType === 'mentions') return n.type === 'mention';
    return true;
  });

  const mentionsCount = notifications.filter(n => n.type === 'mention' && !n.is_read).length;

  const handleOpenTask = async (n: typeof notifications[0]) => {
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
        if (onSelectTask) {
          onSelectTask(targetTask);
        } else {
          setSelectedTask(targetTask);
        }
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Header Card */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs border border-blue-100 dark:border-blue-900">
            <Bell className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Notifications & Mentions</h1>
              {unreadNotificationsCount > 0 && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-600 text-white shadow-xs">
                  {unreadNotificationsCount} Unread
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live updates when team members mention you, assign tasks, or comment.
            </p>
          </div>
        </div>

        {/* Mark All Read Button */}
        {notifications.length > 0 && (
          <button
            type="button"
            onClick={() => markAllNotificationsRead()}
            className="flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 font-bold text-xs border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shrink-0"
          >
            <CheckCheck className="w-4 h-4" />
            <span>Mark All as Read</span>
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 dark:border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterType === 'all'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Inbox className="w-3.5 h-3.5" />
          <span>All ({notifications.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterType('unread')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterType === 'unread'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Unread ({unreadNotificationsCount})</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterType('mentions')}
          className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterType === 'mentions'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <AtSign className="w-3.5 h-3.5" />
          <span>@ Mentions ({notifications.filter(n => n.type === 'mention').length})</span>
          {mentionsCount > 0 && (
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          )}
        </button>
      </div>

      {/* Notifications List Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
              {filterType === 'mentions' ? (
                <AtSign className="w-7 h-7" />
              ) : filterType === 'unread' ? (
                <CheckCircle2 className="w-7 h-7 text-emerald-500" />
              ) : (
                <Inbox className="w-7 h-7" />
              )}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {filterType === 'unread'
                  ? 'All caught up!'
                  : filterType === 'mentions'
                  ? 'No @ mentions yet'
                  : 'No notifications found'}
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                {filterType === 'unread'
                  ? 'You have read all pending notifications.'
                  : filterType === 'mentions'
                  ? 'When team members mention your name with @, it will show up right here.'
                  : 'Updates will appear as activity occurs across tasks and projects.'}
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {filteredNotifications.map(n => {
              const isMention = n.type === 'mention';
              return (
                <div
                  key={n.id}
                  onClick={() => handleOpenTask(n)}
                  className={`p-4 sm:p-5 transition-all flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 ${
                    n.is_read
                      ? 'opacity-70 bg-white dark:bg-slate-900'
                      : isMention
                      ? 'bg-amber-50/50 dark:bg-amber-950/20'
                      : 'bg-blue-50/40 dark:bg-blue-950/20'
                  }`}
                >
                  <div className="flex items-start space-x-3.5 flex-1 min-w-0">
                    {/* Icon Pill */}
                    <div
                      className={`mt-0.5 p-2 rounded-xl shrink-0 ${
                        isMention
                          ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300'
                          : 'bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300'
                      }`}
                    >
                      {isMention ? <AtSign className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                        <p className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {n.title}
                        </p>
                        {isMention && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100">
                            @ Mention
                          </span>
                        )}
                        {!n.is_read && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                        )}
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed break-words">
                        {n.message}
                      </p>

                      <div className="flex items-center space-x-4 pt-1">
                        <span className="text-[10px] text-slate-400 font-mono">{n.created_at}</span>
                        {n.entity_type === 'task' && (
                          <span className="inline-flex items-center space-x-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline">
                            <span>Open Task</span>
                            <ExternalLink className="w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mark as Read Button */}
                  <div className="shrink-0 pt-0.5">
                    {!n.is_read ? (
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          markNotificationRead(n.id);
                        }}
                        className="flex items-center space-x-1 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-600 text-slate-500 font-bold text-[11px] border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                        title="Mark as read"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Mark read</span>
                      </button>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-medium px-2 py-1">Read</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
