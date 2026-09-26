'use client';

import React from 'react';
import { BarChart3, Clock, Flame, FolderKanban } from 'lucide-react';
import { usePMData } from '@/lib/pm-data-context';

export const PMReports: React.FC = () => {
  const { projects, tasks } = usePMData();

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const reviewTasks = tasks.filter(t => t.status === 'Review').length;
  const todoTasks = tasks.filter(t => t.status === 'To Do').length;

  const urgentTasks = tasks.filter(t => t.priority === 'Urgent').length;
  const highTasks = tasks.filter(t => t.priority === 'High').length;
  const mediumTasks = tasks.filter(t => t.priority === 'Medium').length;
  const lowTasks = tasks.filter(t => t.priority === 'Low').length;

  const overdueTasks = tasks.filter(t => t.due_date && new Date(t.due_date) < new Date() && t.status !== 'Completed');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <span>System Analytics & Reports</span>
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Detailed metrics on project milestones, team productivity, and deliverable health.
        </p>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Project Delivery */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <FolderKanban className="w-4 h-4 text-blue-600" />
              <span>Project Delivery Rate</span>
            </h3>
            <span className="text-xs font-bold text-blue-600">{projects.length} Active</span>
          </div>

          <div className="space-y-3">
            {projects.map(p => (
              <div key={p.id} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-700 font-semibold truncate max-w-[170px]">{p.project_name}</span>
                  <span className="font-bold text-blue-600">{p.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${p.progress}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tasks by Status */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Tasks by Status</span>
            </h3>
            <span className="text-xs font-bold text-slate-500">{totalTasks} total</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-emerald-700 font-bold flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>Completed</span>
              </span>
              <span className="font-extrabold text-slate-900">{completedTasks}</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-blue-700 font-bold flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>In Progress</span>
              </span>
              <span className="font-extrabold text-slate-900">{inProgressTasks}</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-purple-700 font-bold flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-purple-600" />
                <span>Review</span>
              </span>
              <span className="font-extrabold text-slate-900">{reviewTasks}</span>
            </div>

            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600 font-bold flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>To Do</span>
              </span>
              <span className="font-extrabold text-slate-900">{todoTasks}</span>
            </div>
          </div>
        </div>

        {/* Tasks by Priority */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center space-x-2">
              <Flame className="w-4 h-4 text-rose-600" />
              <span>Priority Breakdown</span>
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-bold">
              <span>Urgent Priority</span>
              <span className="font-extrabold">{urgentTasks}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 font-bold">
              <span>High Priority</span>
              <span className="font-extrabold">{highTasks}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-bold">
              <span>Medium Priority</span>
              <span className="font-extrabold">{mediumTasks}</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 font-bold">
              <span>Low Priority</span>
              <span className="font-extrabold text-slate-900">{lowTasks}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overdue Alert Table */}
      {overdueTasks.length > 0 && (
        <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 space-y-3 shadow-2xs">
          <h3 className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center space-x-2">
            <Flame className="w-4 h-4 text-rose-600" />
            <span>Overdue Tasks Requiring Attention ({overdueTasks.length})</span>
          </h3>

          <div className="divide-y divide-rose-200">
            {overdueTasks.map(t => (
              <div key={t.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-900">{t.title}</p>
                  <p className="text-[10px] text-slate-500 font-medium">{t.project_name} • Assigned to: {t.assigned_to?.name}</p>
                </div>
                <span className="text-rose-700 font-extrabold text-xs">Due: {t.due_date}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
