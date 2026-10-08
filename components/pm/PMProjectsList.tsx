'use client';

import React, { useState } from 'react';
import {
  FolderKanban,
  Plus,
  Search,
  Calendar,
  User,
  Users,
  CheckCircle2,
  Clock,
  Trash2,
  ChevronRight
} from 'lucide-react';
import { usePMAuth } from '@/lib/pm-auth-context';
import { usePMData } from '@/lib/pm-data-context';
import { PMProject } from '@/lib/pm-types';

interface PMProjectsListProps {
  onSelectProject: (project: PMProject) => void;
  openCreateProject: () => void;
}

export const PMProjectsList: React.FC<PMProjectsListProps> = ({
  onSelectProject,
  openCreateProject
}) => {
  const { isAdmin } = usePMAuth();
  const { projects, deleteProject } = usePMData();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const filteredProjects = projects.filter(p => {
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    if (filterPriority !== 'all' && p.priority !== filterPriority) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = p.project_name.toLowerCase().includes(q);
      const matchClient = p.client_name.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      if (!matchName && !matchClient && !matchDesc) return false;
    }
    return true;
  });

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!isAdmin) return;
    if (confirm('Are you sure you want to move this project to trash? (Admins can restore it later)')) {
      await deleteProject(id);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <FolderKanban className="w-5 h-5 text-blue-600" />
            <span>Projects & Deliverables</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Manage organization client projects, milestones, and deliverable health.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={openCreateProject}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer w-fit"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects by name, client..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>

        <div className="flex items-center space-x-2">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="Planning">Planning</option>
            <option value="Active">Active</option>
            <option value="On Hold">On Hold</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={filterPriority}
            onChange={e => setFilterPriority(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full p-12 text-center text-xs text-slate-500 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
              <FolderKanban className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">No Projects Found</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
                Get started by creating your first client deliverable or internal campaign project.
              </p>
            </div>
            {isAdmin && (
              <button
                onClick={openCreateProject}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Project</span>
              </button>
            )}
          </div>
        ) : (
          filteredProjects.map(project => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between space-y-4 shadow-2xs"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                    {project.client_name || 'Internal Deliverable'}
                  </span>

                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      project.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : project.status === 'Completed'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {project.project_name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
              </div>



              {/* Team avatars & Task counter */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center space-x-1">
                  <div className="flex -space-x-1.5 overflow-hidden">
                    {project.members && project.members.length > 0 ? (
                      project.members.slice(0, 3).map((m, i) => (
                        <img
                          key={i}
                          src={m.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
                          alt={m.name}
                          title={m.name}
                          className="w-5 h-5 rounded-full border border-white object-cover"
                        />
                      ))
                    ) : (
                      <span className="text-[10px] text-slate-400">No members</span>
                    )}
                  </div>
                  {project.members && project.members.length > 3 && (
                    <span className="text-[10px] text-slate-500 font-bold">+{project.members.length - 3}</span>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-semibold text-slate-600">
                    {project.task_stats.completed}/{project.task_stats.total} Tasks
                  </span>

                  {isAdmin && (
                    <button
                      onClick={e => handleDelete(e, project.id)}
                      title="Move to Trash"
                      className="p-1 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
