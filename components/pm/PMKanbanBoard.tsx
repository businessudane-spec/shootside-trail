'use client';

import React from 'react';
import {
  Kanban,
  Plus,
  Flame,
  Calendar,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { usePMData } from '@/lib/pm-data-context';
import { PMTask, TaskStatus } from '@/lib/pm-types';

interface PMKanbanBoardProps {
  onSelectTask: (task: PMTask) => void;
  openCreateTask: () => void;
}

const COLUMNS: { status: TaskStatus; label: string; color: string; dot: string }[] = [
  { status: 'To Do', label: 'To Do', color: 'text-slate-700', dot: 'bg-slate-400' },
  { status: 'In Progress', label: 'In Progress', color: 'text-blue-700', dot: 'bg-blue-600' },
  { status: 'Review', label: 'In Review', color: 'text-purple-700', dot: 'bg-purple-600' },
  { status: 'Completed', label: 'Completed', color: 'text-emerald-700', dot: 'bg-emerald-600' },
  { status: 'On Hold', label: 'On Hold', color: 'text-amber-700', dot: 'bg-amber-600' }
];

export const PMKanbanBoard: React.FC<PMKanbanBoardProps> = ({ onSelectTask, openCreateTask }) => {
  const { tasks, updateTask, selectedProjectId, selectedStatus, selectedPriority, searchQuery } = usePMData();

  const filteredTasks = tasks.filter(task => {
    if (selectedProjectId && task.project_id !== selectedProjectId) return false;
    if (selectedStatus && task.status !== selectedStatus) return false;
    if (selectedPriority && task.priority !== selectedPriority) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = task.title.toLowerCase().includes(q);
      const matchDesc = task.description.toLowerCase().includes(q);
      const matchProj = task.project_name.toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchProj) return false;
    }
    return true;
  });

  const handleStatusChange = async (e: React.MouseEvent, taskId: number, newStatus: TaskStatus) => {
    e.stopPropagation();
    await updateTask(taskId, { status: newStatus });
  };

  const getNextStatus = (curr: TaskStatus): TaskStatus | null => {
    const sequence: TaskStatus[] = ['To Do', 'In Progress', 'Review', 'Completed'];
    const idx = sequence.indexOf(curr);
    return idx !== -1 && idx < sequence.length - 1 ? sequence[idx + 1] : null;
  };

  const getPrevStatus = (curr: TaskStatus): TaskStatus | null => {
    const sequence: TaskStatus[] = ['To Do', 'In Progress', 'Review', 'Completed'];
    const idx = sequence.indexOf(curr);
    return idx > 0 ? sequence[idx - 1] : null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <Kanban className="w-5 h-5 text-blue-600" />
            <span>Kanban Board</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Visual workflow pipeline with stage transitions and real-time updates.
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

      {/* Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-start overflow-x-auto pb-4">
        {COLUMNS.map(col => {
          const colTasks = filteredTasks.filter(t => t.status === col.status);
          return (
            <div
              key={col.status}
              className="bg-slate-100/90 border border-slate-200 rounded-2xl p-3.5 space-y-3 min-w-[240px] flex flex-col max-h-[calc(100vh-230px)]"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <div className="flex items-center space-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${col.dot}`} />
                  <span className={`text-xs font-bold ${col.color}`}>{col.label}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-600 border border-slate-200">
                  {colTasks.length}
                </span>
              </div>

              {/* Tasks List */}
              <div className="space-y-3 overflow-y-auto pr-1 flex-1">
                {colTasks.length === 0 ? (
                  <div className="py-8 text-center text-[11px] text-slate-400 border border-dashed border-slate-300 rounded-xl bg-white/40">
                    No tasks
                  </div>
                ) : (
                  colTasks.map(task => {
                    const nextSt = getNextStatus(task.status);
                    const prevSt = getPrevStatus(task.status);
                    return (
                      <div
                        key={task.id}
                        onClick={() => onSelectTask(task)}
                        className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group space-y-3 shadow-2xs"
                      >
                        {/* Project & Priority Badge */}
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="text-slate-500 font-medium truncate max-w-[110px]">
                            {task.project_name}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-md font-bold ${
                              task.priority === 'Urgent'
                                ? 'bg-rose-50 text-rose-700'
                                : task.priority === 'High'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                          {task.title}
                        </h4>

                        {/* Progress Bar */}
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] text-slate-500 font-medium">
                            <span>Progress</span>
                            <span className="font-bold text-slate-900">{task.progress}%</span>
                          </div>
                          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Assignee & Meta Footer */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                          <div className="flex items-center space-x-1.5">
                            <img
                              src={task.assigned_to?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
                              alt={task.assigned_to?.name}
                              className="w-4 h-4 rounded-full object-cover border border-slate-200"
                            />
                            <span className="truncate max-w-[70px] text-slate-700 font-medium">
                              {task.assigned_to?.name || 'None'}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2 font-medium">
                            {task.due_date && (
                              <span className="flex items-center space-x-0.5 text-[9px] text-slate-500">
                                <Calendar className="w-2.5 h-2.5" />
                                <span>{task.due_date.slice(5)}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Shift Progression Buttons */}
                        <div className="flex items-center justify-between pt-1 text-[10px]">
                          {prevSt ? (
                            <button
                              onClick={e => handleStatusChange(e, task.id, prevSt)}
                              title={`Move to ${prevSt}`}
                              className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center space-x-0.5 font-medium"
                            >
                              <ChevronLeft className="w-3 h-3" />
                              <span className="text-[9px]">{prevSt}</span>
                            </button>
                          ) : <div />}

                          {nextSt && (
                            <button
                              onClick={e => handleStatusChange(e, task.id, nextSt)}
                              title={`Advance to ${nextSt}`}
                              className="p-1 rounded bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold flex items-center space-x-0.5 ml-auto"
                            >
                              <span className="text-[9px]">{nextSt}</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
