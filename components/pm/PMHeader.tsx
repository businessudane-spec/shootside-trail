'use client';

import React from 'react';
import {
  Menu,
  Search,
  RefreshCw,
  Database,
  CheckCircle2
} from 'lucide-react';
import { usePMAuth } from '@/lib/pm-auth-context';
import { usePMData } from '@/lib/pm-data-context';
import { PMNotificationsDropdown } from './PMNotificationsDropdown';
import { pmApi } from '@/lib/pm-api';

interface PMHeaderProps {
  onToggleSidebar: () => void;
  openLoginModal: () => void;
}

export const PMHeader: React.FC<PMHeaderProps> = ({ onToggleSidebar, openLoginModal }) => {
  const { user } = usePMAuth();
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
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 md:px-8 flex items-center justify-between shadow-2xs">
      {/* Left: Hamburger Toggle & Search */}
      <div className="flex items-center space-x-3 md:space-x-4 flex-1 max-w-2xl">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer border border-slate-200"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Search Bar */}
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects, tasks, deliverables..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-3">
        {/* Live DB Endpoint Indicator */}
        <div
          className="hidden xl:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold"
          title={`Connected to Live REST API: ${apiUrl}`}
        >
          <Database className="w-3 h-3 text-emerald-600" />
          <span className="truncate max-w-[150px]">Live DB: shootside.in</span>
        </div>

        {/* Quick Project Filter */}
        <div className="hidden lg:flex items-center space-x-2">
          <select
            value={selectedProjectId || ''}
            onChange={e => setSelectedProjectId(e.target.value ? Number(e.target.value) : null)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-blue-500"
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
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>
        </div>

        {/* Refresh Button */}
        <button
          onClick={() => refreshAll()}
          disabled={isLoading}
          title="Refresh Data from WordPress REST API"
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-all cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-blue-600' : ''}`} />
        </button>

        {/* Notifications */}
        <div className="relative">
          <PMNotificationsDropdown />
        </div>

        {/* WordPress Auth Button */}
        <div className="flex items-center pl-2 border-l border-slate-200">
          <button
            onClick={openLoginModal}
            className="text-xs px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-all cursor-pointer font-bold flex items-center space-x-1"
          >
            <span>WP Auth</span>
          </button>
        </div>
      </div>
    </header>
  );
};
