'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Trash2,
  Clock,
  Plus
} from 'lucide-react';
import { usePMAuth } from '@/lib/pm-auth-context';
import { usePMData } from '@/lib/pm-data-context';
import { PMProject, PMTask } from '@/lib/pm-types';

interface PMProjectDetailProps {
  project: PMProject;
  onBack: () => void;
  onSelectTask: (t: PMTask) => void;
  openCreateTask: () => void;
}

export const PMProjectDetail: React.FC<PMProjectDetailProps> = ({
  project,
  onBack,
  onSelectTask,
  openCreateTask
}) => {
  const { isAdmin } = usePMAuth();
  const { tasks, activityLogs, deleteProject } = usePMData();
  const [activeTab, setActiveTab] = useState<'tasks' | 'overview' | 'activity'>('tasks');

  const projectTasks = [...tasks]
    .filter(t => t.project_id === project.id)
    .sort((a, b) => {
      const timeA = a.created_at ? new Date(a.created_at).getTime() : a.id;
      const timeB = b.created_at ? new Date(b.created_at).getTime() : b.id;
      return timeB - timeA;
    });
  const projectActivities = activityLogs.filter(a => a.entity_type === 'project' && a.entity_id === project.id);

  const handleDelete = async () => {
    if (!isAdmin) return;
    if (confirm(`Are you sure you want to move project '${project.project_name}' to trash?`)) {
      await deleteProject(project.id);
      onBack();
    }
  };

  return (
    <div className="space-y-6">
      {/* Back button & Actions header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-blue-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </button>

        {isAdmin && (
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDelete}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold cursor-pointer transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Project (Admin)</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Project Hero Card */}
      <div className="p-6 md:p-8 rounded-2xl bg-white border border-slate-200 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs mb-2">
              <span className="text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full font-bold border border-blue-100">
                {project.client_name || 'ShootSide Deliverable'}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 font-mono font-semibold">ID #{project.id}</span>
            </div>
            <h1 className="text-xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {project.project_name}
            </h1>
            <p className="text-xs md:text-sm text-slate-600 mt-2 max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex md:flex-col items-start md:items-end justify-between gap-3">
            <span
              className={`text-xs px-3 py-1 rounded-full font-bold ${
                project.status === 'Active'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : project.status === 'Completed'
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}
            >
              {project.status} • {project.priority} Priority
            </span>

            {project.deadline && (
              <span className="text-xs text-slate-600 flex items-center space-x-1.5 font-bold">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span>Deadline: {project.deadline}</span>
              </span>
            )}
          </div>
        </div>

        {/* Progress and metrics bar */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-500 font-medium">Project Manager</span>
            <p className="text-sm font-bold text-slate-900 truncate">{project.project_manager?.name || 'None'}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] text-slate-500 font-medium">Total Tasks</span>
            <p className="text-2xl font-extrabold text-slate-900">{projectTasks.length}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] text-slate-500 font-medium">Completed Tasks</span>
            <p className="text-2xl font-extrabold text-emerald-600">
              {projectTasks.filter(t => t.status === 'Completed').length}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`pb-3 text-xs font-bold tracking-tight transition-colors relative ${
              activeTab === 'tasks' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Tasks ({projectTasks.length})
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 text-xs font-bold tracking-tight transition-colors relative ${
              activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Project Info & Team
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`pb-3 text-xs font-bold tracking-tight transition-colors relative ${
              activeTab === 'activity' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Activity Audit
          </button>
        </div>

        {activeTab === 'tasks' && (
          <button
            onClick={openCreateTask}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-bold transition-all mb-2 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Task</span>
          </button>
        )}
      </div>

      {/* Tab 1: Tasks List */}
      {activeTab === 'tasks' && (
        <div className="space-y-3">
          {projectTasks.length === 0 ? (
            <div className="p-12 rounded-2xl bg-white border border-slate-200 text-center text-xs text-slate-400 shadow-2xs">
              <Clock className="w-6 h-6 mx-auto mb-2 text-slate-300" />
              No tasks assigned to this project yet. Click &quot;Add Task&quot; above.
            </div>
          ) : (
            projectTasks.map(task => (
              <div
                key={task.id}
                onClick={() => onSelectTask(task)}
                className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full uppercase font-bold ${
                        task.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700'
                          : task.status === 'In Progress'
                          ? 'bg-blue-50 text-blue-700'
                          : task.status === 'Review'
                          ? 'bg-purple-50 text-purple-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {task.status}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-medium">#{task.id}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {task.title}
                  </h3>
                </div>

                <div className="flex items-center space-x-4 text-xs text-slate-500 font-medium">
                  <div className="flex items-center space-x-2">
                    <img
                      src={task.assigned_to?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
                      alt={task.assigned_to?.name}
                      className="w-5 h-5 rounded-full object-cover border border-slate-200"
                    />
                    <span className="text-[11px] text-slate-700 font-semibold">{task.assigned_to?.name || 'Unassigned'}</span>
                  </div>

                  <span className="font-bold text-blue-600">{task.progress}% done</span>
                  <span className="text-slate-400">Due: {task.due_date || 'None'}</span>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Overview & Team */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-2xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Assigned Team Members</h3>
            <div className="space-y-3">
              {project.members && project.members.length > 0 ? (
                project.members.map(m => (
                  <div key={m.id} className="flex items-center justify-between text-xs p-2 rounded-xl bg-slate-50">
                    <div className="flex items-center space-x-3">
                      <img src={m.avatar} alt={m.name} className="w-7 h-7 rounded-full object-cover border border-slate-200" />
                      <div>
                        <p className="font-bold text-slate-900">{m.name}</p>
                        <p className="text-[10px] text-slate-500">{m.email}</p>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-bold">
                      {m.role}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">No members directly assigned.</p>
              )}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-3 text-xs shadow-2xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Project Timeline</h3>
            <p className="text-slate-600"><strong className="text-slate-900">Start Date:</strong> {project.start_date || 'Not specified'}</p>
            <p className="text-slate-600"><strong className="text-slate-900">Deadline:</strong> {project.deadline || 'Not specified'}</p>
            <p className="text-slate-600"><strong className="text-slate-900">Created At:</strong> {project.created_at}</p>
            <p className="text-slate-600"><strong className="text-slate-900">Created By:</strong> {project.created_by?.name || 'Administrator'}</p>
          </div>
        </div>
      )}

      {/* Tab 3: Activity Audit Log */}
      {activeTab === 'activity' && (
        <div className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-2xs">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Audit Log for Project #{project.id}</h3>
          <div className="space-y-3">
            {projectActivities.length === 0 ? (
              <p className="text-xs text-slate-400">No project level activity recorded yet.</p>
            ) : (
              projectActivities.map(a => (
                <div key={a.id} className="p-3 rounded-xl bg-slate-50 text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-500 text-[10px]">
                    <span className="font-bold text-slate-900">{a.user_name}</span>
                    <span className="font-mono">{a.created_at}</span>
                  </div>
                  <p className="text-blue-700 font-semibold">Action: {a.action}</p>
                  {a.new_value && <p className="text-slate-700">Value: {a.new_value}</p>}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
