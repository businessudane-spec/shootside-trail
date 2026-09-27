'use client';

import React from 'react';
import {
  Menu,
  Search,
  RefreshCw,
  Database,
  LogIn,
  LogOut,
  UserCheck,
  Moon,
  Sun
} from 'lucide-react';
import { usePMAuth } from '@/lib/pm-auth-context';
import { usePMData } from '@/lib/pm-data-context';
import { usePMTheme } from '@/lib/pm-theme-context';
import { PMNotificationsDropdown } from './PMNotificationsDropdown';
import { pmApi } from '@/lib/pm-api';

interface PMHeaderProps {
  onToggleSidebar: () => void;
  openLoginModal: () => void;
  openProfileModal: () => void;
}

export const PMHeader: React.FC<PMHeaderProps> = ({ onToggleSidebar, openLoginModal, openProfileModal }) => {
  const { user, logout, isAdmin } = usePMAuth();
  const { isDark, toggleTheme } = usePMTheme();
  const {
    searchQuery,
    setSearchQuery,
    projects,
    selectedProjectId,
    setSelectedProjectId,
    selectedStatus,
    setSelectedStatus,
    refreshAll,
    isLoading
  } = usePMData();

  const apiUrl = pmApi.getApiBaseUrl();

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-2.5 sm:px-4 md:px-8 flex items-center justify-between gap-2 shadow-2xs transition-colors duration-200">
      {/* Left: Mobile-only Hamburger & Brand Indicator */}
      <div className="flex items-center space-x-3 shrink-0">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 shrink-0"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden sm:flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
          <span className="text-xs font-bold tracking-wider uppercase text-slate-800 dark:text-slate-200">
            Project Track
          </span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 shrink-0">
        {/* Live DB Endpoint Indicator */}
        <div
          className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold shrink-0"
          title={`Connected to Live REST API: ${apiUrl}`}
        >
          <Database className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
          <span className="truncate max-w-[150px]">Live DB: shootside.in</span>
        </div>

        {/* Quick Project Filter */}
        <div className="hidden lg:flex items-center space-x-2 shrink-0">
          <select
            value={selectedProjectId || ''}
            onChange={e => setSelectedProjectId(e.target.value ? Number(e.target.value) : null)}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Projects</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>
                {p.project_name}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>

        {/* Dark Mode Switch Button */}
        <button
          onClick={toggleTheme}
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer flex items-center space-x-1.5 shadow-2xs shrink-0"
        >
          {isDark ? (
            <>
              <Sun className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="hidden md:inline text-[11px] font-bold text-amber-300">Light</span>
            </>
          ) : (
            <>
              <Moon className="w-4 h-4 text-slate-600 shrink-0" />
              <span className="hidden md:inline text-[11px] font-bold text-slate-700">Dark</span>
            </>
          )}
        </button>

        {/* Refresh Button */}
        <button
          onClick={() => refreshAll()}
          disabled={isLoading}
          title="Refresh Data"
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-blue-600' : ''}`} />
        </button>

        {/* Notifications */}
        <div className="relative shrink-0">
          <PMNotificationsDropdown />
        </div>

        {/* User Auth Section (Logged In / Logged Out) */}
        <div className="flex items-center pl-1.5 sm:pl-3 border-l border-slate-200 dark:border-slate-800 shrink-0">
          {user ? (
            <div className="flex items-center space-x-1.5 sm:space-x-3">
              <button
                onClick={openProfileModal}
                className="flex items-center space-x-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer text-left group shrink-0"
                title="Edit Profile & Credentials"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-200 dark:border-slate-700 object-cover shrink-0 group-hover:ring-2 group-hover:ring-blue-500/30 transition-all"
                  />
                ) : (
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0 uppercase shadow-2xs">
                    {user.name ? user.name.charAt(0) : user.username.charAt(0)}
                  </div>
                )}
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 leading-tight truncate max-w-[120px] transition-colors">
                    {user.name}
                  </div>
                  <div className="text-[10px] font-semibold mt-0.5">
                    {isAdmin ? (
                      <span className="text-rose-700 dark:text-rose-400 font-bold bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 px-1.5 py-0.5 rounded-md">
                        Admin
                      </span>
                    ) : (
                      <span className="text-blue-700 dark:text-blue-400 font-bold bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 px-1.5 py-0.5 rounded-md">
                        Member
                      </span>
                    )}
                  </div>
                </div>
              </button>

              <button
                onClick={() => logout()}
                className="text-xs p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/50 hover:text-rose-700 dark:hover:text-rose-400 hover:border-rose-200 dark:hover:border-rose-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer font-semibold flex items-center space-x-1.5 shrink-0"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 hover:text-rose-600 shrink-0" />
                <span className="hidden md:inline">Log Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={openLoginModal}
              className="text-xs px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all cursor-pointer flex items-center space-x-1.5 shadow-xs shrink-0"
            >
              <LogIn className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden xs:inline">Log In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
