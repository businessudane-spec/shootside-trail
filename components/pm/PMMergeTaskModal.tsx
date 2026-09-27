'use client';

import React, { useState, useMemo } from 'react';
import {
  X,
  GitMerge,
  Search,
  ArrowRight,
  ArrowLeftRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
  MessageSquare,
  Layers,
  FolderKanban,
  Check
} from 'lucide-react';
import { usePMData } from '@/lib/pm-data-context';
import { PMTask, PriorityLevel, TaskStatus } from '@/lib/pm-types';

interface PMMergeTaskModalProps {
  currentTask: PMTask;
  isOpen: boolean;
  onClose: () => void;
  onMerged?: (primaryTask: PMTask) => void;
}

export const PMMergeTaskModal: React.FC<PMMergeTaskModalProps> = ({
  currentTask,
  isOpen,
  onClose,
  onMerged
}) => {
  const { tasks, mergeTasks, refreshAll } = usePMData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTargetTaskId, setSelectedTargetTaskId] = useState<number | null>(null);
  const [mergeRole, setMergeRole] = useState<'current_is_primary' | 'current_is_child'>('current_is_primary');
  const [closeChildTasks, setCloseChildTasks] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [filterProjectOnly, setFilterProjectOnly] = useState(true);

  // Available tasks to merge with (exclude self and already child of self)
  const availableTasks = useMemo(() => {
    return tasks.filter(t => {
      if (t.id === currentTask.id) return false;
      if (filterProjectOnly && t.project_id !== currentTask.project_id) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchTitle = t.title.toLowerCase().includes(q);
        const matchDesc = t.description?.toLowerCase().includes(q);
        const matchId = String(t.id).includes(q);
        const matchProject = t.project_name?.toLowerCase().includes(q);
        return matchTitle || matchDesc || matchId || matchProject;
      }
      return true;
    });
  }, [tasks, currentTask, filterProjectOnly, searchTerm]);

  const targetTask = useMemo(() => {
    return tasks.find(t => t.id === selectedTargetTaskId) || null;
  }, [tasks, selectedTargetTaskId]);

  if (!isOpen) return null;

  const primaryTask = mergeRole === 'current_is_primary' ? currentTask : targetTask;
  const childTask = mergeRole === 'current_is_primary' ? targetTask : currentTask;

  const handleMerge = async () => {
    if (!selectedTargetTaskId || !primaryTask || !childTask) {
      setErrorMsg('Please select a task to merge with.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    const primaryId = primaryTask.id;
    const childId = childTask.id;

    const res = await mergeTasks(primaryId, [childId], { closeChildTasks });
    setIsSubmitting(false);

    if (res.success) {
      await refreshAll();
      if (onMerged && res.data) {
        onMerged(res.data);
      }
      onClose();
    } else {
      setErrorMsg(res.message || 'Failed to merge tasks.');
    }
  };

  const getPriorityBadgeClass = (priority: PriorityLevel) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30';
      case 'High':
        return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'Medium':
        return 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30';
      case 'Low':
      default:
        return 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30';
    }
  };

  const getStatusBadgeClass = (status: TaskStatus) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30';
      case 'In Progress':
        return 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border-indigo-500/30';
      case 'Review':
        return 'bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30';
      case 'On Hold':
        return 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30';
      case 'To Do':
      default:
        return 'bg-zinc-500/15 text-zinc-600 dark:text-zinc-400 border-zinc-500/30';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#12141a] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
              <GitMerge className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                Merge Tasks
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300">
                  Primary & Child
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Consolidate duplicate or related tasks into a single parent task with linked child details.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          {errorMsg && (
            <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Current Task Box */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Current Active Task
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  #{currentTask.id}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${getPriorityBadgeClass(currentTask.priority)}`}>
                    {currentTask.priority}
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${getStatusBadgeClass(currentTask.status)}`}>
                    {currentTask.status}
                  </span>
                </div>
              </div>
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mt-1.5 line-clamp-1">
                {currentTask.title}
              </h4>
              <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <FolderKanban className="w-3.5 h-3.5" />
                  {currentTask.project_name}
                </span>
                {currentTask.assigned_to && (
                  <span className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {currentTask.assigned_to.name}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" />
                  {currentTask.comments_count || 0} comments
                </span>
              </div>
            </div>
          </div>

          {/* Role Selection (Which is Primary) */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Merge Direction & Role
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMergeRole('current_is_primary')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between relative ${
                  mergeRole === 'current_is_primary'
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100 ring-1 ring-blue-500'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                      Option A (Recommended)
                    </span>
                    {mergeRole === 'current_is_primary' && (
                      <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    Make Current Task PRIMARY
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    The selected task will be merged into this task as a child task.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMergeRole('current_is_child')}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between relative ${
                  mergeRole === 'current_is_child'
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 text-blue-900 dark:text-blue-100 ring-1 ring-blue-500'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-purple-600 dark:text-purple-400">
                      Option B
                    </span>
                    {mergeRole === 'current_is_child' && (
                      <Check className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white">
                    Make Selected Task PRIMARY
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Current task will be merged as a child task under the selected task.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Target Task Picker */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {mergeRole === 'current_is_primary' ? 'Select Child Task to Merge Into Current' : 'Select Primary Task to Merge Into'}
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="filter_project"
                  checked={filterProjectOnly}
                  onChange={(e) => setFilterProjectOnly(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 h-3.5 w-3.5 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                />
                <label htmlFor="filter_project" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
                  Same project only
                </label>
              </div>
            </div>

            {/* Search Box */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search tasks by title, ID, or project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Tasks List Box */}
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl max-h-48 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-950 custom-scrollbar">
              {availableTasks.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  No matching tasks found. Try adjusting your search.
                </div>
              ) : (
                availableTasks.map(t => {
                  const isSelected = selectedTargetTaskId === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setSelectedTargetTaskId(t.id)}
                      className={`w-full text-left p-3 transition-colors flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-blue-50/80 dark:bg-blue-900/30 border-l-4 border-blue-500'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-900/60'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                            #{t.id}
                          </span>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${getPriorityBadgeClass(t.priority)}`}>
                            {t.priority}
                          </span>
                          <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded border ${getStatusBadgeClass(t.status)}`}>
                            {t.status}
                          </span>
                          {t.project_name && (
                            <span className="text-[10px] text-slate-400 truncate max-w-[120px]">
                              • {t.project_name}
                            </span>
                          )}
                        </div>
                        <div className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                          {t.title}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[11px] text-slate-400 flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {t.comments_count || 0}
                        </span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500 text-white'
                            : 'border-slate-300 dark:border-slate-700'
                        }`}>
                          {isSelected && <Check className="w-3 h-3" />}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Merge Visual Summary */}
          {targetTask && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/20 dark:to-indigo-950/20 border border-blue-200 dark:border-blue-900/50 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-300">
                <Layers className="w-4 h-4" />
                Merge Preview Summary
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                {/* Primary Card */}
                <div className="w-full sm:w-1/2 p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-blue-300 dark:border-blue-800">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 mb-1">
                    Primary / Parent Task
                  </span>
                  <div className="font-semibold text-slate-900 dark:text-white truncate">
                    #{primaryTask?.id}: {primaryTask?.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Will display child details, discussions & subtasks.
                  </div>
                </div>

                <div className="text-slate-400 shrink-0">
                  <ArrowRight className="w-4 h-4 hidden sm:block text-blue-500" />
                  <ArrowLeftRight className="w-4 h-4 sm:hidden text-blue-500" />
                </div>

                {/* Child Card */}
                <div className="w-full sm:w-1/2 p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="inline-block text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 mb-1">
                    Merged / Child Task
                  </span>
                  <div className="font-semibold text-slate-900 dark:text-white truncate">
                    #{childTask?.id}: {childTask?.title}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    Will link to parent #{primaryTask?.id}. Can be unmerged anytime.
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="pt-2 border-t border-blue-200/60 dark:border-blue-900/40">
                <label className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={closeChildTasks}
                    onChange={(e) => setCloseChildTasks(e.target.checked)}
                    className="rounded text-blue-600 focus:ring-blue-500 h-3.5 w-3.5"
                  />
                  <span>Mark child task (#{childTask?.id}) as &ldquo;Completed&rdquo; upon merging</span>
                </label>
              </div>
            </div>
          )}

        </div>

        {/* Modal Actions Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!selectedTargetTaskId || isSubmitting}
            onClick={handleMerge}
            className="px-5 py-2 text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-all"
          >
            <GitMerge className="w-4 h-4" />
            <span>{isSubmitting ? 'Merging Tasks...' : 'Confirm & Merge Tasks'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
