'use client';

import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react';
import { usePMData } from '@/lib/pm-data-context';
import { PMTask } from '@/lib/pm-types';

interface PMCalendarViewProps {
  onSelectTask: (task: PMTask) => void;
  openCreateTask: () => void;
}

export const PMCalendarView: React.FC<PMCalendarViewProps> = ({ onSelectTask, openCreateTask }) => {
  const { tasks, selectedProjectId, selectedStatus, selectedPriority } = usePMData();

  const [currentDate, setCurrentDate] = useState(new Date('2026-09-26'));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date('2026-09-26'));
  };

  const filteredTasks = tasks.filter(task => {
    if (selectedProjectId && task.project_id !== selectedProjectId) return false;
    if (selectedStatus === 'all_with_completed') {
      // Include all statuses
    } else if (selectedStatus) {
      if (task.status !== selectedStatus) return false;
    } else {
      // Default: do not show completed tasks as due on calendar
      if (task.status === 'Completed') return false;
    }
    if (selectedPriority && task.priority !== selectedPriority) return false;
    return true;
  });

  const tasksByDate: Record<string, PMTask[]> = {};
  filteredTasks.forEach(task => {
    if (task.due_date) {
      if (!tasksByDate[task.due_date]) {
        tasksByDate[task.due_date] = [];
      }
      tasksByDate[task.due_date].push(task);
    }
  });

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight flex items-center space-x-2">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            <span>Deadlines & Milestones Calendar</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            Track deliverable schedules, milestone deadlines, and project pacing.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-white border border-slate-200 p-1 rounded-xl shadow-2xs">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-slate-900 px-3">
              {monthNames[month]} {year}
            </span>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleToday}
            className="px-3 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-2xs"
          >
            Today
          </button>

          <button
            onClick={openCreateTask}
            className="flex items-center space-x-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-2xs">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50 text-center text-[11px] font-bold text-slate-500 py-3">
          <span>Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Date cells */}
        <div className="grid grid-cols-7 divide-x divide-y divide-slate-100">
          {days.map((day, idx) => {
            if (day === null) {
              return <div key={`empty-${idx}`} className="min-h-[110px] bg-slate-50/50 p-2" />;
            }

            const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayTasks = tasksByDate[formattedDate] || [];
            const isToday = formattedDate === '2026-09-26';

            return (
              <div
                key={`day-${day}`}
                className={`min-h-[110px] p-2 space-y-1 transition-colors ${
                  isToday ? 'bg-blue-50/40' : 'hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold ${
                      isToday
                        ? 'w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs'
                        : 'text-slate-600'
                    }`}
                  >
                    {day}
                  </span>
                  {dayTasks.length > 0 && (
                    <span className="text-[9px] text-blue-600 font-bold">{dayTasks.length} due</span>
                  )}
                </div>

                <div className="space-y-1 mt-1 max-h-24 overflow-y-auto">
                  {dayTasks.map(t => (
                    <div
                      key={t.id}
                      onClick={() => onSelectTask(t)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-100/70 border border-slate-200 text-[10px] cursor-pointer transition-all truncate"
                    >
                      <div className="flex items-center space-x-1">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            t.priority === 'Urgent'
                              ? 'bg-rose-500'
                              : t.priority === 'High'
                              ? 'bg-amber-500'
                              : 'bg-blue-500'
                          }`}
                        />
                        <span className="text-slate-900 font-semibold truncate">{t.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
