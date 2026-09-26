'use client';

import React, { useState } from 'react';
import { ShieldAlert, Search, ArrowRight } from 'lucide-react';
import { usePMData } from '@/lib/pm-data-context';

export const PMActivityLog: React.FC = () => {
  const { activityLogs, users } = usePMData();

  const [selectedUser, setSelectedUser] = useState<string>('all');
  const [selectedEntity, setSelectedEntity] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filteredLogs = activityLogs.filter(log => {
    if (selectedUser !== 'all' && String(log.user_id) !== selectedUser) return false;
    if (selectedEntity !== 'all' && log.entity_type !== selectedEntity) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchUser = log.user_name.toLowerCase().includes(q);
      const matchAction = log.action.toLowerCase().includes(q);
      const matchOld = log.old_value ? log.old_value.toLowerCase().includes(q) : false;
      const matchNew = log.new_value ? log.new_value.toLowerCase().includes(q) : false;
      if (!matchUser && !matchAction && !matchOld && !matchNew) return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-rose-600 text-xs font-bold mb-1">
          <ShieldAlert className="w-4 h-4" />
          <span>ADMIN AUDIT & GOVERNANCE</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          System Activity & Immutable Audit Log
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Permanent log of all project and task creations, status transitions, reassignments, and deletions.
        </p>
      </div>

      {/* Filter Controls */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search audit trail..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-rose-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={selectedUser}
            onChange={e => setSelectedUser(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none"
          >
            <option value="all">All Users</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          <select
            value={selectedEntity}
            onChange={e => setSelectedEntity(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none"
          >
            <option value="all">All Entities</option>
            <option value="project">Projects</option>
            <option value="task">Tasks</option>
            <option value="auth">Auth / Sessions</option>
          </select>
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="space-y-3">
        {filteredLogs.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-200 shadow-2xs">
            <ShieldAlert className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            No audit logs found.
          </div>
        ) : (
          filteredLogs.map(log => (
            <div
              key={log.id}
              className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-2xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center text-rose-700 font-extrabold text-xs border border-rose-200 shrink-0">
                  {log.user_name ? log.user_name[0] : 'S'}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">{log.user_name}</span>
                    <span className="text-[10px] px-2 py-0.2 rounded bg-slate-100 text-slate-600 font-bold">
                      {log.user_role || 'USER'}
                    </span>
                    <span className="text-[10px] text-slate-400">•</span>
                    <span className="text-[10px] text-blue-700 uppercase tracking-wider font-bold">
                      {log.entity_type} #{log.entity_id}
                    </span>
                  </div>

                  <p className="text-slate-700 font-medium">
                    Action: <strong className="text-slate-900">{log.action.replace('_', ' ')}</strong>
                  </p>

                  {(log.old_value || log.new_value) && (
                    <div className="flex items-center space-x-2 font-mono text-[11px] mt-1 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                      {log.old_value && <span className="text-rose-600 line-through font-semibold">{log.old_value}</span>}
                      {log.old_value && log.new_value && <ArrowRight className="w-3 h-3 text-slate-400" />}
                      {log.new_value && <span className="text-emerald-700 font-bold">{log.new_value}</span>}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right text-[11px] text-slate-400 font-mono sm:self-center font-medium">
                {log.created_at}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
