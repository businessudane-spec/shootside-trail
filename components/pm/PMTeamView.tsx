'use client';

import React from 'react';
import { Users, Mail } from 'lucide-react';
import { usePMData } from '@/lib/pm-data-context';

export const PMTeamView: React.FC = () => {
  const { users, tasks } = usePMData();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
          <Users className="w-5 h-5 text-blue-600" />
          <span>Team Members & Workload</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Synchronized WordPress users and active task distribution across deliverables.
        </p>
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {users.map(u => {
          const userTasks = tasks.filter(t => t.assigned_to_id === u.id);
          const activeTasks = userTasks.filter(t => t.status !== 'Completed');
          const completedTasks = userTasks.filter(t => t.status === 'Completed');

          return (
            <div
              key={u.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all space-y-4 shadow-2xs"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={u.avatar}
                    alt={u.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-slate-200 shadow-xs"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{u.name}</h3>
                    <p className="text-xs text-slate-500 flex items-center space-x-1 mt-0.5 font-medium">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span className="truncate max-w-[130px]">{u.email}</span>
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase ${
                    u.role === 'ADMIN'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-blue-50 text-blue-700 border border-blue-200'
                  }`}
                >
                  {u.role}
                </span>
              </div>

              {/* Workload Stats */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[10px] text-slate-500 font-semibold">Active Tasks</span>
                  <p className="text-xl font-extrabold text-blue-600">{activeTasks.length}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-[10px] text-slate-500 font-semibold">Completed</span>
                  <p className="text-xl font-extrabold text-emerald-600">{completedTasks.length}</p>
                </div>
              </div>

              {/* Recent Tasks List */}
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Current Deliverables ({activeTasks.length})
                </span>
                <div className="space-y-1 max-h-24 overflow-y-auto">
                  {activeTasks.length === 0 ? (
                    <p className="text-[11px] text-slate-400 italic">No pending tasks</p>
                  ) : (
                    activeTasks.map(t => (
                      <div key={t.id} className="text-xs text-slate-700 font-medium truncate p-1.5 rounded-lg bg-slate-50">
                        • {t.title}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
