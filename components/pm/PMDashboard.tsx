'use client';

import React from 'react';
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  Flame,
  ArrowUpRight,
  TrendingUp,
  UserCheck,
  UserX,
  Calendar,
  Sparkles,
  ChevronRight,
  Plus
} from 'lucide-react';
import { usePMAuth } from '@/lib/pm-auth-context';
import { usePMData } from '@/lib/pm-data-context';
import { PMTask, PMProject } from '@/lib/pm-types';

interface PMDashboardProps {
  onSelectProject: (p: PMProject) => void;
  onSelectTask: (t: PMTask) => void;
  openCreateTask: () => void;
  openCreateProject: () => void;
  onNavigateView: (view: any) => void;
}

export const PMDashboard: React.FC<PMDashboardProps> = ({
  onSelectProject,
  onSelectTask,
  openCreateTask,
  openCreateProject,
  onNavigateView
}) => {
  const { user, isAdmin } = usePMAuth();
  const {
    projects,
    tasks,
    users,
    statistics,
    isLoading,
    setSelectedStatus,
    setSelectedPriority,
    setSelectedProjectId,
    setSelectedMemberId
  } = usePMData();

  const isInitialLoading = isLoading && tasks.length === 0;

  const totalProjects = statistics?.projects.total ?? projects.length;
  const activeProjects = statistics?.projects.active ?? projects.filter(p => p.status === 'Active').length;
  const completedProjects = statistics?.projects.completed ?? projects.filter(p => p.status === 'Completed').length;

  const totalTasks = statistics?.tasks.total ?? tasks.length;
  const inProgressTasks = statistics?.tasks.in_progress ?? tasks.filter(t => t.status === 'In Progress').length;
  const reviewTasks = statistics?.tasks.review ?? tasks.filter(t => t.status === 'Review').length;
  const completedTasks = statistics?.tasks.completed ?? tasks.filter(t => t.status === 'Completed').length;
  const overdueTasks = statistics?.tasks.overdue ?? tasks.filter(t => t.due_date && new Date(t.due_date) < new Date() && t.status !== 'Completed').length;
  const unassignedTasks = tasks.filter(t => (!t.assigned_to_id || t.assigned_to_id === 0) && t.status !== 'Completed').length;

  const myTasks = [...tasks]
    .filter(t => t.assigned_to_id === user?.id && t.status !== 'Completed')
    .sort((a, b) => {
      const timeA = a.created_at ? new Date(a.created_at).getTime() : a.id;
      const timeB = b.created_at ? new Date(b.created_at).getTime() : b.id;
      return timeB - timeA;
    });

  return (
    <div className="space-y-6">
      {/* Hero Welcome Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 md:p-8 text-white shadow-lg shadow-blue-500/10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-blue-100 text-xs font-semibold mb-2 tracking-wide">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>PROJECT TRACK DASHBOARD</span>
              <span>•</span>
              <span className="bg-white/20 text-white px-2.5 py-0.5 rounded-full backdrop-blur-xs font-bold text-[10px]">
                {user ? `${user.role} ACCESS` : 'GUEST VIEW'}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Welcome back, {user ? user.name : 'to Project Track'}
            </h1>
            <p className="text-xs md:text-sm text-blue-100 mt-1.5 max-w-xl leading-relaxed">
              Track active deliverables, manage team assignments, and synchronize project progress in real time.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={openCreateTask}
              className="px-4 py-2.5 bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center space-x-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Create Task</span>
            </button>
            {isAdmin && (
              <button
                onClick={openCreateProject}
                className="px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all cursor-pointer"
              >
                + New Project
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Unassigned Tasks */}
        <div
          onClick={() => {
            setSelectedStatus('');
            setSelectedPriority('');
            setSelectedProjectId(null);
            setSelectedMemberId(0);
            onNavigateView('tasks_list');
          }}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-md transition-all cursor-pointer group shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
            <span className="text-xs font-semibold">Unassigned Tasks</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
              <UserX className="w-4 h-4" />
            </div>
          </div>
          {isInitialLoading ? (
            <div className="h-8 w-20 bg-slate-200 animate-pulse rounded-lg my-1"></div>
          ) : (
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100">{unassignedTasks}</span>
              <span className="text-xs text-slate-400">/ {totalTasks} total</span>
            </div>
          )}
          <p className="text-[11px] text-amber-600 dark:text-amber-400 mt-2 flex items-center space-x-1 font-semibold">
            <span>{unassignedTasks > 0 ? `${unassignedTasks} need assignment` : 'All active tasks assigned'}</span>
            <ArrowUpRight className="w-3 h-3" />
          </p>
        </div>

        {/* Tasks in Progress */}
        <div
          onClick={() => {
            setSelectedStatus('In Progress');
            setSelectedPriority('');
            setSelectedProjectId(null);
            setSelectedMemberId(null);
            onNavigateView('tasks_list');
          }}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all cursor-pointer group shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
            <span className="text-xs font-semibold">In Progress Tasks</span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          {isInitialLoading ? (
            <div className="h-8 w-20 bg-slate-200 animate-pulse rounded-lg my-1"></div>
          ) : (
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100">{inProgressTasks}</span>
              <span className="text-xs text-slate-400">/ {totalTasks} total</span>
            </div>
          )}
          <p 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedStatus('Review');
              setSelectedPriority('');
              setSelectedProjectId(null);
              setSelectedMemberId(null);
              onNavigateView('tasks_list');
            }}
            className="text-[11px] text-indigo-600 dark:text-indigo-400 mt-2 flex items-center space-x-1 font-semibold hover:underline"
          >
            <span>{reviewTasks} in review</span>
            <ArrowUpRight className="w-3 h-3" />
          </p>
        </div>

        {/* Completed Tasks */}
        <div
          onClick={() => {
            setSelectedStatus('Completed');
            setSelectedPriority('');
            setSelectedProjectId(null);
            setSelectedMemberId(null);
            onNavigateView('tasks_list');
          }}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer group shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
            <span className="text-xs font-semibold">Completed Tasks</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          {isInitialLoading ? (
            <div className="h-8 w-20 bg-slate-200 animate-pulse rounded-lg my-1"></div>
          ) : (
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100">{completedTasks}</span>
              <span className="text-xs text-slate-400 font-semibold">
                ({totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0}%)
              </span>
            </div>
          )}
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-2 flex items-center space-x-1 font-semibold">
            <span>Click to view all completed tasks</span>
            <ArrowUpRight className="w-3 h-3" />
          </p>
        </div>

        {/* Overdue / Urgent Alert */}
        <div
          onClick={() => {
            setSelectedStatus('');
            setSelectedPriority('overdue_urgent');
            setSelectedProjectId(null);
            setSelectedMemberId(null);
            onNavigateView('tasks_list');
          }}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-400 dark:hover:border-rose-500 hover:shadow-md transition-all cursor-pointer group shadow-xs"
        >
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-3">
            <span className="text-xs font-semibold">Overdue / Urgent</span>
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          {isInitialLoading ? (
            <div className="h-8 w-20 bg-slate-200 animate-pulse rounded-lg my-1"></div>
          ) : (
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-slate-100">{overdueTasks}</span>
              <span className="text-xs text-rose-600 dark:text-rose-400 font-bold">needs attention</span>
            </div>
          )}
          <p 
            onClick={(e) => {
              e.stopPropagation();
              setSelectedStatus('');
              setSelectedPriority('');
              setSelectedProjectId(null);
              setSelectedMemberId(user?.id ?? null);
              onNavigateView('tasks_list');
            }}
            className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 font-medium hover:text-rose-600 transition-colors"
          >
            My active tasks: {myTasks.length} ↗
          </p>
        </div>
      </div>

      {/* Main Split: Projects Overview & My Assigned Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Projects Overview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <FolderKanban className="w-4 h-4 text-blue-600" />
              <span>Active Projects & Deliverables</span>
            </h2>
            <button
              onClick={() => onNavigateView('projects')}
              className="text-xs text-blue-600 hover:text-blue-700 font-bold flex items-center space-x-1"
            >
              <span>View all</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 4).map(p => (
              <div
                key={p.id}
                onClick={() => onSelectProject(p)}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group space-y-3 shadow-2xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                      {p.client_name || 'Internal Deliverable'}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-1.5 group-hover:text-blue-600 transition-colors">
                      {p.project_name}
                    </h3>
                  </div>
                  <span
                    className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${
                      p.priority === 'Urgent'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : p.priority === 'High'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                    }`}
                  >
                    {p.priority} Priority
                  </span>
                </div>

                {/* Meta footer */}
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <div className="flex items-center space-x-2">
                    <img
                      src={p.project_manager?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
                      alt={p.project_manager?.name}
                      className="w-5 h-5 rounded-full object-cover border border-slate-200"
                    />
                    <span className="font-medium text-slate-700">PM: {p.project_manager?.name || 'Unassigned'}</span>
                  </div>

                  <div className="flex items-center space-x-3 text-[10px] font-medium">
                    <span className="text-slate-500">{p.task_stats.completed}/{p.task_stats.total} Tasks</span>
                    {p.deadline && (
                      <span className="text-blue-700 font-bold flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{p.deadline}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Assigned to Me & Team Workload */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center space-x-2">
              <UserCheck className="w-4 h-4 text-blue-600" />
              <span>Assigned to Me ({myTasks.length})</span>
            </h2>
            <button
              onClick={() => onNavigateView('tasks_my')}
              className="text-xs text-blue-600 hover:text-blue-700 font-bold"
            >
              See all
            </button>
          </div>

          <div className="space-y-2.5">
            {myTasks.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-xs text-slate-400 shadow-2xs">
                <CheckCircle2 className="w-6 h-6 mx-auto mb-2 text-emerald-500" />
                All assigned tasks completed!
              </div>
            ) : (
              myTasks.slice(0, 5).map(t => (
                <div
                  key={t.id}
                  onClick={() => onSelectTask(t)}
                  className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group space-y-2"
                >
                  <div className="flex items-start justify-between">
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                      {t.title}
                    </h4>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-bold ${
                        t.status === 'In Progress'
                          ? 'bg-blue-50 text-blue-700'
                          : t.status === 'Review'
                          ? 'bg-purple-50 text-purple-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>

                  <p className="text-[10px] text-slate-500 truncate">{t.project_name}</p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100 font-medium">
                    <span>Due: {t.due_date || 'No deadline'}</span>
                    <span className="font-bold text-blue-600">{t.progress}% done</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Team Workload Card */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3 shadow-2xs">
            <h3 className="text-xs font-bold text-slate-900 flex items-center justify-between">
              <span>Team Workload Distribution</span>
              <button
                onClick={() => onNavigateView('team')}
                className="text-[10px] text-blue-600 font-bold hover:underline"
              >
                Manage
              </button>
            </h3>

            <div className="space-y-2">
              {users.slice(0, 4).map(u => {
                const assignedCount = tasks.filter(t => t.assigned_to_id === u.id && t.status !== 'Completed').length;
                return (
                  <div key={u.id} className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="w-5 h-5 rounded-full object-cover border border-slate-200"
                      />
                      <span className="text-slate-700 text-[11px] font-semibold truncate max-w-[110px]">{u.name}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold font-mono">
                      {assignedCount} active
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
