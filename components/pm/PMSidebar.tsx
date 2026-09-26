'use client';

import React from 'react';
import {
  LayoutDashboard,
  FolderKanban,
  ListTodo,
  Kanban,
  Calendar,
  Users,
  Bell,
  BarChart3,
  ShieldAlert,
  Trash2,
  PlusCircle,
  Sparkles,
  ShieldCheck,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Menu,
  CheckCircle2,
  KeyRound
} from 'lucide-react';
import { usePMAuth } from '@/lib/pm-auth-context';
import { usePMData } from '@/lib/pm-data-context';

export type PMView =
  | 'dashboard'
  | 'projects'
  | 'tasks_list'
  | 'tasks_my'
  | 'tasks_kanban'
  | 'calendar'
  | 'team'
  | 'vault'
  | 'notifications'
  | 'reports'
  | 'admin_activity'
  | 'admin_trash';

interface PMSidebarProps {
  currentView: PMView;
  setCurrentView: (v: PMView) => void;
  openCreateTask: () => void;
  openCreateProject: () => void;
  openProfileModal: () => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
}

export const PMSidebar: React.FC<PMSidebarProps> = ({
  currentView,
  setCurrentView,
  openCreateTask,
  openCreateProject,
  openProfileModal,
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen
}) => {
  const { user, isAdmin, isMember, switchUserRole } = usePMAuth();
  const { unreadNotificationsCount } = usePMData();

  const handleNav = (v: PMView) => {
    setCurrentView(v);
    setIsMobileOpen(false);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 shadow-sm ${
        isCollapsed ? 'w-20' : 'w-64'
      } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
    >
      {/* Top Brand Header */}
      <div>
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <FolderKanban className="w-5 h-5" />
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <span className="font-bold text-slate-900 dark:text-slate-100 text-base tracking-tight block">
                  Project Track
                </span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold tracking-wider uppercase">
                  ShootSide Workspace
                </span>
              </div>
            )}
          </div>

          {/* Collapse Hamburger / Toggle button on Desktop */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Quick Action Button */}
        <div className="p-3">
          <button
            onClick={() => {
              openCreateTask();
              setIsMobileOpen(false);
            }}
            className={`w-full flex items-center justify-center space-x-2 py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer ${
              isCollapsed ? 'px-0' : ''
            }`}
            title="Create Task"
          >
            <PlusCircle className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span>Create Task</span>}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="px-3 py-1 space-y-5 overflow-y-auto max-h-[calc(100vh-280px)]">
          {/* Main Views */}
          <div className="space-y-1">
            {!isCollapsed && (
              <span className="px-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Overview
              </span>
            )}
            <button
              onClick={() => handleNav('dashboard')}
              title="Dashboard"
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'space-x-3 px-3'} py-2 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'dashboard'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>Dashboard</span>}
            </button>

            <button
              onClick={() => handleNav('projects')}
              title="Projects"
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'space-x-3 px-3'} py-2 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'projects'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <FolderKanban className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>Projects</span>}
            </button>
          </div>

          {/* Tasks Section */}
          <div className="space-y-1">
            {!isCollapsed && (
              <span className="px-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Task Management
              </span>
            )}
            <button
              onClick={() => handleNav('tasks_list')}
              title="All Tasks"
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'space-x-3 px-3'} py-2 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'tasks_list'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ListTodo className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>All Tasks</span>}
            </button>

            <button
              onClick={() => handleNav('tasks_my')}
              title="My Tasks"
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'space-x-3 px-3'} py-2 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'tasks_my'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <UserCheck className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>My Tasks</span>}
            </button>

            <button
              onClick={() => handleNav('tasks_kanban')}
              title="Kanban Board"
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'space-x-3 px-3'} py-2 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'tasks_kanban'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Kanban className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>Kanban Board</span>}
            </button>

            <button
              onClick={() => handleNav('calendar')}
              title="Deadlines Calendar"
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'space-x-3 px-3'} py-2 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'calendar'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Calendar className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>Deadlines Calendar</span>}
            </button>
          </div>

          {/* Team & Analytics */}
          <div className="space-y-1">
            {!isCollapsed && (
              <span className="px-3 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Collaboration
              </span>
            )}
            <button
              onClick={() => handleNav('team')}
              title="Team Workload"
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'space-x-3 px-3'} py-2 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'team'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>Team Workload</span>}
            </button>

            <button
              onClick={() => handleNav('vault')}
              title="Company Password Store"
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'space-x-3 px-3'} py-2 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'vault'
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/80 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <KeyRound className="w-4 h-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
              {!isCollapsed && <span>Company Vault</span>}
            </button>

            <button
              onClick={() => handleNav('notifications')}
              title="Notifications"
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'justify-between px-3'} py-2 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'notifications'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Bell className="w-4 h-4 shrink-0" />
                {!isCollapsed && <span>Notifications</span>}
              </div>
              {!isCollapsed && unreadNotificationsCount > 0 && (
                <span className="bg-blue-600 text-white font-bold text-[10px] px-1.5 py-0.5 rounded-full">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNav('reports')}
              title="Reports & Analytics"
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'space-x-3 px-3'} py-2 rounded-xl text-xs font-semibold transition-all ${
                currentView === 'reports'
                  ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              {!isCollapsed && <span>Reports</span>}
            </button>
          </div>

          {/* Admin Zone */}
          {isAdmin && (
            <div className="space-y-1 pt-2 border-t border-slate-200 dark:border-slate-800">
              {!isCollapsed && (
                <span className="px-3 text-[10px] font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 inline" />
                  <span>Admin Zone</span>
                </span>
              )}

              <button
                onClick={() => handleNav('admin_activity')}
                title="Activity & Audit Log"
                className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'space-x-3 px-3'} py-2 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'admin_activity'
                    ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/80 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <ShieldAlert className="w-4 h-4 shrink-0 text-rose-500" />
                {!isCollapsed && <span>Audit Log</span>}
              </button>

              <button
                onClick={() => handleNav('admin_trash')}
                title="Deleted Items"
                className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'space-x-3 px-3'} py-2 rounded-xl text-xs font-semibold transition-all ${
                  currentView === 'admin_trash'
                    ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800/80 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <Trash2 className="w-4 h-4 shrink-0 text-rose-500" />
                {!isCollapsed && <span>Deleted Items</span>}
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* Bottom Profile Information */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900">
        {user ? (
          <button
            onClick={openProfileModal}
            className={`w-full flex items-center ${
              isCollapsed ? 'justify-center px-0' : 'space-x-2.5 px-1.5'
            } py-1.5 rounded-xl hover:bg-white dark:hover:bg-slate-800 hover:shadow-2xs border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer text-left group`}
            title="Edit Profile & Password"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt="User avatar"
                className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 object-cover shrink-0 group-hover:ring-2 group-hover:ring-blue-500/30 transition-all"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 uppercase shadow-2xs">
                {user?.name ? user.name.charAt(0) : (user?.username ? user.username.charAt(0) : 'U')}
              </div>
            )}
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 truncate transition-colors">
                    {user?.name}
                  </p>
                  <span
                    className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                      isAdmin
                        ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                        : 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                    }`}
                  >
                    {isAdmin ? 'ADMIN' : 'MEMBER'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
              </div>
            )}
          </button>
        ) : (
          <div className="px-1 py-1 text-center">
            {!isCollapsed && (
              <p className="text-xs text-slate-500 font-medium">Guest (Not Logged In)</p>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
