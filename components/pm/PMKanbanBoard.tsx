'use client';

import React, { useState, useRef } from 'react';
import {
  Kanban,
  Plus,
  Flame,
  Calendar,
  ChevronRight,
  ChevronLeft,
  Columns,
  Rows,
  Layers,
  Sparkles,
  CheckSquare,
  GitMerge
} from 'lucide-react';
import { usePMAuth } from '@/lib/pm-auth-context';
import { usePMData } from '@/lib/pm-data-context';
import { PMTask, TaskStatus } from '@/lib/pm-types';

interface PMKanbanBoardProps {
  onSelectTask: (task: PMTask) => void;
  openCreateTask: () => void;
}

const COLUMNS: { status: TaskStatus; label: string; color: string; dot: string; bgBadge: string }[] = [
  { status: 'To Do', label: 'To Do', color: 'text-slate-700', dot: 'bg-slate-400', bgBadge: 'bg-slate-100 text-slate-700 border-slate-200' },
  { status: 'In Progress', label: 'In Progress', color: 'text-blue-700', dot: 'bg-blue-600', bgBadge: 'bg-blue-50 text-blue-700 border-blue-200' },
  { status: 'Review', label: 'In Review', color: 'text-purple-700', dot: 'bg-purple-600', bgBadge: 'bg-purple-50 text-purple-700 border-purple-200' },
  { status: 'Completed', label: 'Completed', color: 'text-emerald-700', dot: 'bg-emerald-600', bgBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { status: 'On Hold', label: 'On Hold', color: 'text-amber-700', dot: 'bg-amber-600', bgBadge: 'bg-amber-50 text-amber-700 border-amber-200' }
];

export const PMKanbanBoard: React.FC<PMKanbanBoardProps> = ({ onSelectTask, openCreateTask }) => {
  const { tasks, updateTask, selectedProjectId, selectedStatus, selectedPriority, searchQuery, isLoading } = usePMData();
  const [viewMode, setViewMode] = useState<'scroll' | 'stacked'>('scroll');
  const [activeStageFilter, setActiveStageFilter] = useState<string>('all');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const sortedFilteredTasks = [...filteredTasks].sort((a, b) => {
    const timeA = a.created_at ? new Date(a.created_at).getTime() : a.id;
    const timeB = b.created_at ? new Date(b.created_at).getTime() : b.id;
    return timeB - timeA;
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

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const displayedColumns = activeStageFilter === 'all'
    ? COLUMNS
    : COLUMNS.filter(c => c.status === activeStageFilter);

  return (
    <div className="space-y-5 w-full max-w-full overflow-hidden">
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

        <div className="flex items-center space-x-2.5 flex-wrap">
          {/* View Mode Toggle (Horizontal Scroll vs Stacked Down) */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('scroll')}
              title="Horizontal Scroll Columns"
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'scroll'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Scroll Columns</span>
            </button>

            <button
              onClick={() => setViewMode('stacked')}
              title="Stacked Vertical Grid (Come Down)"
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'stacked'
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Rows className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Stacked Down</span>
            </button>
          </div>

          {/* Create Task Button */}
          <button
            onClick={openCreateTask}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Task</span>
          </button>
        </div>
      </div>

      {/* Stage Filter Pills (Responsive navigation) */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        <button
          onClick={() => setActiveStageFilter('all')}
          className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer text-xs border ${
            activeStageFilter === 'all'
              ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          All Stages ({filteredTasks.length})
        </button>

        {COLUMNS.map(col => {
          const count = filteredTasks.filter(t => t.status === col.status).length;
          const isSelected = activeStageFilter === col.status;
          return (
            <button
              key={col.status}
              onClick={() => setActiveStageFilter(col.status)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer text-xs border ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${col.dot}`} />
              <span>{col.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {count}
              </span>
            </button>
          );
        })}

        {viewMode === 'scroll' && activeStageFilter === 'all' && (
          <div className="hidden lg:flex items-center space-x-1 ml-auto shrink-0">
            <button
              onClick={scrollLeft}
              className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 cursor-pointer"
              title="Scroll left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={scrollRight}
              className="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 cursor-pointer"
              title="Scroll right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Kanban Board Display */}
      {viewMode === 'scroll' ? (
        /* HORIZONTAL SCROLLING CONTAINER: Fixed width columns, smooth scrolling, zero overlapping */
        <div
          ref={scrollContainerRef}
          className="flex items-start gap-4 overflow-x-auto pb-6 pt-1 px-0.5 scroll-smooth w-full"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {displayedColumns.map(col => {
            const colTasks = sortedFilteredTasks.filter(t => t.status === col.status);
            return (
              <div
                key={col.status}
                style={{ scrollSnapAlign: 'start' }}
                className="bg-slate-100/90 border border-slate-200/90 rounded-2xl p-3.5 space-y-3 w-[280px] sm:w-[310px] shrink-0 flex flex-col max-h-[calc(100vh-250px)] shadow-2xs"
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
                <div className="space-y-3 overflow-y-auto pr-1 flex-1 min-h-[140px]">
                  {isLoading && tasks.length === 0 ? (
                    <div className="space-y-3 animate-pulse">
                      <div className="h-28 bg-white/70 rounded-xl border border-slate-200/60 p-3.5 space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                      </div>
                      <div className="h-28 bg-white/70 rounded-xl border border-slate-200/60 p-3.5 space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                        <div className="h-3 bg-slate-100 rounded w-1/3"></div>
                      </div>
                    </div>
                  ) : colTasks.length === 0 ? (
                    <div className="py-10 text-center text-[11px] text-slate-400 border border-dashed border-slate-300 rounded-xl bg-white/50 font-medium">
                      No tasks in this stage
                    </div>
                  ) : (
                    colTasks.map(task => renderTaskCard(task, handleStatusChange, getNextStatus, getPrevStatus, onSelectTask))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* STACKED / COME DOWN GRID VIEW: Wraps neatly into responsive grid / vertical sections */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 w-full">
          {displayedColumns.map(col => {
            const colTasks = sortedFilteredTasks.filter(t => t.status === col.status);
            return (
              <div
                key={col.status}
                className="bg-slate-100/90 border border-slate-200 rounded-2xl p-4 space-y-3 shadow-2xs"
              >
                {/* Column Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${col.dot}`} />
                    <span className={`text-xs font-extrabold ${col.color}`}>{col.label}</span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                    {colTasks.length} {colTasks.length === 1 ? 'task' : 'tasks'}
                  </span>
                </div>

                {/* Tasks List */}
                <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                  {isLoading && tasks.length === 0 ? (
                    <div className="space-y-3 animate-pulse">
                      <div className="h-28 bg-white/70 rounded-xl border border-slate-200/60 p-3.5 space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                        <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                      </div>
                      <div className="h-28 bg-white/70 rounded-xl border border-slate-200/60 p-3.5 space-y-2">
                        <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                        <div className="h-3 bg-slate-100 rounded w-1/3"></div>
                      </div>
                    </div>
                  ) : colTasks.length === 0 ? (
                    <div className="py-8 text-center text-[11px] text-slate-400 border border-dashed border-slate-300 rounded-xl bg-white/50 font-medium">
                      No tasks in this stage
                    </div>
                  ) : (
                    colTasks.map(task => renderTaskCard(task, handleStatusChange, getNextStatus, getPrevStatus, onSelectTask))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* Reusable Task Card Renderer */
function renderTaskCard(
  task: PMTask,
  handleStatusChange: (e: React.MouseEvent, taskId: number, newStatus: TaskStatus) => void,
  getNextStatus: (curr: TaskStatus) => TaskStatus | null,
  getPrevStatus: (curr: TaskStatus) => TaskStatus | null,
  onSelectTask: (task: PMTask) => void
) {
  const nextSt = getNextStatus(task.status);
  const prevSt = getPrevStatus(task.status);

  return (
    <div
      key={task.id}
      onClick={() => onSelectTask(task)}
      className="p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer group space-y-3 shadow-2xs"
    >
      {/* Project & Priority Badge */}
      <div className="flex items-center justify-between text-[10px] gap-2">
        <span className="text-slate-500 font-bold truncate max-w-[130px]">
          {task.project_name || 'ShootSide'}
        </span>
        <span
          className={`px-2 py-0.5 rounded-md font-bold shrink-0 ${
            task.priority === 'Urgent'
              ? 'bg-rose-50 text-rose-700 border border-rose-200'
              : task.priority === 'High'
              ? 'bg-amber-50 text-amber-700 border border-amber-200'
              : 'bg-slate-100 text-slate-700 border border-slate-200'
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
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full transition-all duration-300"
            style={{ width: `${task.progress}%` }}
          />
        </div>
      </div>

      {/* Subtasks Count / Merged indicator if any */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {(task.subtasks_count !== undefined && task.subtasks_count > 0) && (
          <div className="flex items-center space-x-1 text-[10px] font-semibold text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
            <CheckSquare className="w-3 h-3 text-blue-600" />
            <span>{task.subtasks_completed_count || 0}/{task.subtasks_count} Subtasks</span>
          </div>
        )}

        {Number(task.parent_task_id) > 0 && (
          <div className="flex items-center space-x-1 text-[9px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
            <GitMerge className="w-3 h-3 text-purple-600" />
            <span>Child of #{task.parent_task_id}</span>
          </div>
        )}

        {task.child_tasks && task.child_tasks.length > 0 && (
          <div className="flex items-center space-x-1 text-[9px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
            <GitMerge className="w-3 h-3 text-indigo-600" />
            <span>{task.child_tasks.length} Merged</span>
          </div>
        )}
      </div>

      {/* Assignee & Due Date Footer */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
        <div className="flex items-center space-x-1.5 min-w-0">
          {task.assigned_to ? (
            task.assigned_to.avatar ? (
              <img
                src={task.assigned_to.avatar}
                alt={task.assigned_to.name}
                className="w-4 h-4 rounded-full object-cover border border-slate-200 shrink-0"
              />
            ) : (
              <div className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 font-bold text-[9px] flex items-center justify-center shrink-0 uppercase">
                {task.assigned_to.name ? task.assigned_to.name.charAt(0) : 'U'}
              </div>
            )
          ) : (
            <div className="w-4 h-4 rounded-full bg-slate-200 text-slate-600 font-extrabold text-[9px] flex items-center justify-center shrink-0">
              U
            </div>
          )}
          <span className="truncate max-w-[80px] text-slate-700 font-medium">
            {task.assigned_to?.name || 'Unassigned'}
          </span>
        </div>

        <div className="flex items-center space-x-2 font-medium shrink-0">
          {task.due_date && (
            <span className="flex items-center space-x-0.5 text-[9px] text-slate-500 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
              <Calendar className="w-2.5 h-2.5 text-slate-400" />
              <span>{task.due_date.slice(5)}</span>
            </span>
          )}
        </div>
      </div>

      {/* Shift Progression Buttons */}
      <div className="flex items-center justify-between pt-1 text-[10px] gap-2">
        {prevSt ? (
          <button
            onClick={e => handleStatusChange(e, task.id, prevSt)}
            title={`Move back to ${prevSt}`}
            className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center space-x-0.5 font-bold cursor-pointer transition-colors border border-slate-200"
          >
            <ChevronLeft className="w-3 h-3" />
            <span className="text-[9px]">{prevSt}</span>
          </button>
        ) : <div />}

        {nextSt && (
          <button
            onClick={e => handleStatusChange(e, task.id, nextSt)}
            title={`Advance to ${nextSt}`}
            className="px-2 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold flex items-center space-x-0.5 ml-auto cursor-pointer transition-colors border border-blue-200"
          >
            <span className="text-[9px]">{nextSt}</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
}
