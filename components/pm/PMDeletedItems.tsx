'use client';

import React, { useState } from 'react';
import { Trash2, RotateCcw, FolderKanban, ListTodo, CheckCircle2 } from 'lucide-react';
import { usePMData } from '@/lib/pm-data-context';

export const PMDeletedItems: React.FC = () => {
  const { deletedItems, restoreProject, restoreTask } = usePMData();
  const [activeTab, setActiveTab] = useState<'projects' | 'tasks'>('tasks');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const handleRestoreProject = async (id: number) => {
    const res = await restoreProject(id);
    if (res.success) {
      setActionSuccess('Project restored successfully and returned to active workspace.');
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  const handleRestoreTask = async (id: number) => {
    const res = await restoreTask(id);
    if (res.success) {
      setActionSuccess('Task restored successfully and returned to active board.');
      setTimeout(() => setActionSuccess(null), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 text-rose-600 text-xs font-bold mb-1">
          <Trash2 className="w-4 h-4" />
          <span>ADMIN TRASH & RECOVERY</span>
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
          Deleted Projects & Tasks
        </h1>
        <p className="text-xs text-slate-500 mt-1 font-medium">
          Soft-deleted records are preserved with their full audit history and can be restored at any time.
        </p>
      </div>

      {actionSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center space-x-2 font-medium">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center space-x-6 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('tasks')}
          className={`pb-3 text-xs font-bold tracking-tight transition-colors flex items-center space-x-2 ${
            activeTab === 'tasks' ? 'text-rose-600 border-b-2 border-rose-600' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <ListTodo className="w-4 h-4" />
          <span>Deleted Tasks ({deletedItems?.tasks?.length || 0})</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`pb-3 text-xs font-bold tracking-tight transition-colors flex items-center space-x-2 ${
            activeTab === 'projects' ? 'text-rose-600 border-b-2 border-rose-600' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <FolderKanban className="w-4 h-4" />
          <span>Deleted Projects ({deletedItems?.projects?.length || 0})</span>
        </button>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {activeTab === 'tasks' && (
          <div>
            {!deletedItems?.tasks || deletedItems.tasks.length === 0 ? (
              <div className="p-12 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                Trash is empty. No deleted tasks.
              </div>
            ) : (
              deletedItems.tasks.map(task => (
                <div
                  key={task.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 text-sm">{task.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">#{task.id}</span>
                    </div>
                    <p className="text-slate-500 font-medium">
                      Project: <strong className="text-slate-700">{task.project_name}</strong> • Assigned to: {task.assigned_to?.name || 'Unassigned'}
                    </p>
                  </div>

                  <button
                    onClick={() => handleRestoreTask(task.id)}
                    className="flex items-center space-x-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl font-bold text-xs cursor-pointer transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Task</span>
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'projects' && (
          <div>
            {!deletedItems?.projects || deletedItems.projects.length === 0 ? (
              <div className="p-12 text-center text-xs text-slate-400 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                Trash is empty. No deleted projects.
              </div>
            ) : (
              deletedItems.projects.map(project => (
                <div
                  key={project.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-slate-900 text-sm">{project.project_name}</span>
                      <span className="text-[10px] text-slate-400 font-mono">#{project.id}</span>
                    </div>
                    <p className="text-slate-500 font-medium">
                      Client: <strong className="text-slate-700">{project.client_name || 'Internal'}</strong>
                    </p>
                  </div>

                  <button
                    onClick={() => handleRestoreProject(project.id)}
                    className="flex items-center space-x-1.5 px-4 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl font-bold text-xs cursor-pointer transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Project</span>
                  </button>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
