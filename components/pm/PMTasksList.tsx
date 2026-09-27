'use client';

import React, { useState } from 'react';
import {
  ListTodo,
  Plus,
  Search,
  Calendar,
  User,
  Clock,
  CheckCircle2,
  Trash2,
  MessageSquare,
  Paperclip,
  Flame,
  CheckSquare
} from 'lucide-react';
import { usePMAuth } from '@/lib/pm-auth-context';
import { usePMData } from '@/lib/pm-data-context';
import { PMTask } from '@/lib/pm-types';

interface PMTasksListProps {
  filterMyTasksOnly?: boolean;
  onSelectTask: (task: PMTask) => void;
  openCreateTask: () => void;
}

export const PMTasksList: React.FC<PMTasksListProps> = ({
  filterMyTasksOnly = false,
  onSelectTask,
  openCreateTask
}) => {
  const { user, isAdmin } = usePMAuth();
  const {
    tasks,
    projects,
    deleteTask,
    searchQuery,
    setSearchQuery,
    selectedStatus,
    setSelectedStatus,
    selectedPriority,
    setSelectedPriority,
    selectedProjectId,
    setSelectedProjectId
  } = usePMData();

  const [sortBy, setSortBy] = useState<'due_date' | 'priority' | 'progress' | 'created_at'>('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredTasks = tasks.filter(task => {
    const isAssignedToUser = 
      task.assigned_to_id === user?.id || 
      (task.subtasks && task.subtasks.some(st => (typeof st.assigned_to === 'object' ? st.assigned_to?.id : st.assigned_to) === user?.id || st.assigned_to_id === user?.id));
    if (filterMyTasksOnly && !isAssignedToUser) return false;
    if (selectedProjectId && task.project_id !== selectedProjectId) return false;
    if (selectedStatus && task.status !== selectedStatus) return false;
    if (selectedPriority && task.priority !== selectedPriority) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchDesc = task.description.toLowerCase().includes(q);
      const matchProj = task.project_name.toLowerCase().includes(q);
      const matchUser = task.assigned_to?.name.toLowerCase().includes(q) || false;
      if (!matchTitle && !matchDesc && !matchProj && !matchUser) return false;
    }
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'priority') {
      const pMap: Record<string, number> = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
      const valA = pMap[a.priority] || 0;
      const valB = pMap[b.priority] || 0;
      return sortOrder === 'asc' ? valB - valA : valA - valB;
    }
    if (sortBy === 'due_date') {
      const dateA = a.due_date ? new Date(a.due_date).getTime() : Infinity;
      const dateB = b.due_date ? new Date(b.due_date).getTime() : Infinity;
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }
    if (sortBy === 'progress') {
      return sortOrder === 'asc' ? a.progress - b.progress : b.progress - a.progress;
    }
    return sortOrder === 'asc'
      ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  const handleDelete = async (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (!isAdmin) return;
    if (confirm('Are you sure you want to move this task to trash?')) {
      await deleteTask(id);
    }
  };

  const isOverdue = (dueDate: string | null, status: string) => {
    if (!dueDate || status === 'Completed') return false;
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <ListTodo className="w-5 h-5 text-blue-600" />
            <span>{filterMyTasksOnly ? 'My Assigned Tasks' : 'All Tasks'}</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            {filterMyTasksOnly
              ? 'Tasks assigned directly to your account.'
              : 'Collaborative task board with live progress tracking and audit logs.'}
          </p>
        </div>

        <button
          onClick={openCreateTask}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Create Task</span>
        </button>
      </div>

      {/* Filter and Search Controls */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={selectedProjectId || ''}
            onChange={e => setSelectedProjectId(e.target.value ? Number(e.target.value) : null)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none"
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
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Completed">Completed</option>
            <option value="On Hold">On Hold</option>
          </select>

          <select
            value={selectedPriority}
            onChange={e => setSelectedPriority(e.target.value)}
            className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none"
          >
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>
      </div>

      {/* Task Table */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Task Details</th>
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Assignee</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Progress</th>
                <th className="py-3 px-4">Due Date</th>
                {isAdmin && <th className="py-3 px-4 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sortedTasks.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-xs text-slate-400">
                    <ListTodo className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    No tasks found matching your filters.
                  </td>
                </tr>
              ) : (
                sortedTasks.map(task => {
                  const overdue = isOverdue(task.due_date, task.status);
                  return (
                    <tr
                      key={task.id}
                      onClick={() => onSelectTask(task)}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      {/* Title */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2 flex-wrap">
                            <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {task.title}
                            </p>
                            {task.parent_task_id && Number(task.parent_task_id) > 0 && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                                🔗 Child of #{task.parent_task_id}
                              </span>
                            )}
                            {task.child_tasks && task.child_tasks.length > 0 && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                                🔀 {task.child_tasks.length} Merged
                              </span>
                            )}
                            {user && task.assigned_to_id !== user.id && task.subtasks && task.subtasks.some(st => (typeof st.assigned_to === 'object' ? st.assigned_to?.id : st.assigned_to) === user.id || st.assigned_to_id === user.id) && (
                              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                                Subtask assigned to you
                              </span>
                            )}
                          </div>
                          <div className="flex items-center space-x-3 text-[10px] text-slate-400 flex-wrap gap-y-1">
                            <span className="font-mono">#{task.id}</span>
                            {task.subtasks_count !== undefined && task.subtasks_count > 0 && (
                              <span className="flex items-center space-x-1 text-slate-600 font-semibold bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                                <CheckSquare className="w-3 h-3 text-blue-600" />
                                <span>{task.subtasks_completed_count || 0}/{task.subtasks_count} Subtasks</span>
                              </span>
                            )}
                            {task.comments_count > 0 && (
                              <span className="flex items-center space-x-1 text-slate-500 font-medium">
                                <MessageSquare className="w-3 h-3" />
                                <span>{task.comments_count}</span>
                              </span>
                            )}
                            {task.attachments_count > 0 && (
                              <span className="flex items-center space-x-1 text-slate-500 font-medium">
                                <Paperclip className="w-3 h-3" />
                                <span>{task.attachments_count}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Project */}
                      <td className="py-3.5 px-4">
                        <span className="text-slate-600 font-medium max-w-[140px] truncate block">
                          {task.project_name}
                        </span>
                      </td>

                      {/* Assignee */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-2">
                          {task.assigned_to ? (
                            task.assigned_to.avatar ? (
                              <img
                                src={task.assigned_to.avatar}
                                alt={task.assigned_to.name}
                                className="w-5 h-5 rounded-full object-cover border border-slate-200 shrink-0"
                              />
                            ) : (
                              <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center shrink-0 uppercase">
                                {task.assigned_to.name ? task.assigned_to.name.charAt(0) : 'U'}
                              </div>
                            )
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 font-black text-[10px] flex items-center justify-center shrink-0">
                              U
                            </div>
                          )}
                          <span className="text-slate-700 font-medium truncate max-w-[100px]">
                            {task.assigned_to?.name || 'Unassigned'}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-block text-[10px] px-2.5 py-0.5 rounded-full font-bold ${
                            task.status === 'Completed'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : task.status === 'In Progress'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : task.status === 'Review'
                              ? 'bg-purple-50 text-purple-700 border border-purple-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {task.status}
                        </span>
                      </td>

                      {/* Priority */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center space-x-1 text-[10px] px-2 py-0.5 rounded-md font-bold ${
                            task.priority === 'Urgent'
                              ? 'bg-rose-50 text-rose-700'
                              : task.priority === 'High'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {task.priority === 'Urgent' && <Flame className="w-3 h-3 text-rose-500" />}
                          <span>{task.priority}</span>
                        </span>
                      </td>

                      {/* Progress */}
                      <td className="py-3.5 px-4">
                        <div className="w-24 space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                            <span>{task.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Due Date */}
                      <td className="py-3.5 px-4 font-mono text-[11px]">
                        <span className={overdue ? 'text-rose-600 font-bold flex items-center space-x-1' : 'text-slate-600'}>
                          {overdue && <Flame className="w-3 h-3 inline" />}
                          <span>{task.due_date || 'None'}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      {isAdmin && (
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={e => handleDelete(e, task.id)}
                            title="Delete Task (Admin)"
                            className="p-1 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
