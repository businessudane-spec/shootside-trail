'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  User,
  MessageSquare,
  Paperclip,
  Activity,
  Trash2,
  Send,
  Save,
  FileText,
  UploadCloud,
  AlertCircle
} from 'lucide-react';
import { usePMAuth } from '@/lib/pm-auth-context';
import { usePMData } from '@/lib/pm-data-context';
import { PMTask, PMComment, PMAttachment, PMActivityLog, TaskStatus, PriorityLevel } from '@/lib/pm-types';
import { pmApi } from '@/lib/pm-api';

interface PMTaskDetailDrawerProps {
  task: PMTask;
  onClose: () => void;
}

export const PMTaskDetailDrawer: React.FC<PMTaskDetailDrawerProps> = ({ task, onClose }) => {
  const { user, isAdmin } = usePMAuth();
  const { users, updateTask, deleteTask, addComment } = usePMData();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [priority, setPriority] = useState<PriorityLevel>(task.priority);
  const [assignedToId, setAssignedToId] = useState<number>(task.assigned_to_id);
  const [startDate, setStartDate] = useState(task.start_date || '');
  const [dueDate, setDueDate] = useState(task.due_date || '');
  const [estimatedHours, setEstimatedHours] = useState(task.estimated_hours);
  const [actualHours, setActualHours] = useState(task.actual_hours);
  const [progress, setProgress] = useState(task.progress);

  const [activeTab, setActiveTab] = useState<'comments' | 'attachments' | 'audit'>('comments');
  const [comments, setComments] = useState<PMComment[]>([]);
  const [attachments, setAttachments] = useState<PMAttachment[]>([]);
  const [taskActivities, setTaskActivities] = useState<PMActivityLog[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setStatus(task.status);
    setPriority(task.priority);
    setAssignedToId(task.assigned_to_id);
    setStartDate(task.start_date || '');
    setDueDate(task.due_date || '');
    setEstimatedHours(task.estimated_hours);
    setActualHours(task.actual_hours);
    setProgress(task.progress);

    loadTaskExtras(task.id);
  }, [task]);

  const loadTaskExtras = async (taskId: number) => {
    try {
      const [cRes, aRes, actRes] = await Promise.all([
        pmApi.getTaskComments(taskId),
        pmApi.getTaskAttachments(taskId),
        pmApi.getTaskActivity(taskId)
      ]);

      if (cRes.success && cRes.data) setComments(cRes.data);
      if (aRes.success && aRes.data) setAttachments(aRes.data);
      if (actRes.success && actRes.data) setTaskActivities(actRes.data as PMActivityLog[]);
    } catch (err) {
      console.error('Error loading task extras:', err);
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    setErrorMessage(null);
    setSaveSuccess(false);

    const payload: Partial<PMTask> = {
      title,
      description,
      status,
      priority,
      start_date: startDate || null,
      due_date: dueDate || null,
      estimated_hours: Number(estimatedHours) || 0,
      actual_hours: Number(actualHours) || 0,
      progress: Number(progress) || 0
    };

    if (isAdmin) {
      payload.assigned_to_id = Number(assignedToId);
    }

    const res = await updateTask(task.id, payload);
    setIsSaving(false);

    if (res.success) {
      setSaveSuccess(true);
      await loadTaskExtras(task.id);
      setTimeout(() => setSaveSuccess(false), 3000);
    } else {
      setErrorMessage(res.message || 'Failed to update task');
    }
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const res = await addComment(task.id, newCommentText.trim());
    if (res.success && res.data) {
      setComments(prev => [...prev, res.data!]);
      setNewCommentText('');
      await loadTaskExtras(task.id);
    }
  };

  const handleDeleteTask = async () => {
    if (!isAdmin) return;
    if (confirm(`Move task '${task.title}' to trash? (Admin can restore it later)`)) {
      await deleteTask(task.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full max-w-2xl bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-bold">
              <span>TASK #{task.id}</span>
              <span>•</span>
              <span className="text-blue-700">{task.project_name}</span>
            </div>
            <h2 className="text-sm font-extrabold text-slate-900 truncate max-w-md">{task.title}</h2>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-xl bg-white hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer border border-slate-200 shadow-2xs"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Drawer Content */}
      <div className="p-6 overflow-y-auto flex-1 space-y-6">
        {errorMessage && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2 font-medium">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {saveSuccess && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center space-x-2 font-medium">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Task updated successfully! Audit log created.</span>
          </div>
        )}

        {/* Task Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>

        {/* REASSIGNMENT CONTROL */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5">
              <User className="w-4 h-4 text-blue-600" />
              <label className="text-xs font-bold text-slate-900">Assigned Member</label>
            </div>

            {isAdmin ? (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3" />
                <span>Admin Reassignment Allowed</span>
              </span>
            ) : (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center space-x-1">
                <Lock className="w-3 h-3" />
                <span>Reassignment Locked (Member)</span>
              </span>
            )}
          </div>

          {isAdmin ? (
            <select
              value={assignedToId}
              onChange={e => setAssignedToId(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-500 font-medium"
            >
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.role}) - {u.email}
                </option>
              ))}
            </select>
          ) : (
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center space-x-2.5">
                <img
                  src={task.assigned_to?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
                  alt={task.assigned_to?.name}
                  className="w-6 h-6 rounded-full object-cover border border-slate-200"
                />
                <span className="text-xs font-bold text-slate-900">
                  {task.assigned_to?.name || 'Unassigned'}
                </span>
              </div>
              <span className="text-[10px] text-slate-500 italic">
                Only Admin can reassign existing tasks
              </span>
            </div>
          )}
        </div>

        {/* Status & Priority */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as TaskStatus)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Review">Review</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Priority</label>
            <select
              value={priority}
              onChange={e => setPriority(e.target.value as PriorityLevel)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:bg-white"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
        </div>

        {/* Progress Slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Progress Completion</span>
            <span className="font-extrabold text-blue-600">{progress}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={e => setProgress(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
          />
        </div>

        {/* Dates & Hours */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:bg-white"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={e => setDueDate(e.target.value)}
              className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:bg-white"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600">Est. Hours</label>
            <input
              type="number"
              step="0.5"
              value={estimatedHours}
              onChange={e => setEstimatedHours(Number(e.target.value))}
              className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:bg-white"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600">Actual Hours</label>
            <input
              type="number"
              step="0.5"
              value={actualHours}
              onChange={e => setActualHours(Number(e.target.value))}
              className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 text-xs focus:outline-none focus:bg-white"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="pt-4 border-t border-slate-200 space-y-4">
          <div className="flex items-center space-x-6 border-b border-slate-200">
            <button
              onClick={() => setActiveTab('comments')}
              className={`pb-2 text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                activeTab === 'comments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Discussion ({comments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('attachments')}
              className={`pb-2 text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                activeTab === 'attachments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Paperclip className="w-3.5 h-3.5" />
              <span>Files ({attachments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`pb-2 text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                activeTab === 'audit' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Audit Trail</span>
            </button>
          </div>

          {/* Comments */}
          {activeTab === 'comments' && (
            <div className="space-y-4">
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {comments.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4 font-medium">
                    No comments yet. Start the discussion below.
                  </p>
                ) : (
                  comments.map(c => (
                    <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <img
                            src={c.user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'}
                            alt={c.user?.name}
                            className="w-5 h-5 rounded-full object-cover border border-slate-200"
                          />
                          <span className="font-bold text-slate-900">{c.user?.name || 'User'}</span>
                          <span className="text-[10px] text-slate-500 font-bold">({c.user?.role || 'MEMBER'})</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">{c.created_at}</span>
                      </div>
                      <p className="text-slate-700 text-xs leading-relaxed pl-7">{c.comment}</p>
                    </div>
                  ))
                )}
              </div>

              <form onSubmit={handlePostComment} className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={newCommentText}
                  onChange={e => setNewCommentText(e.target.value)}
                  className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer disabled:opacity-40 transition-all shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

          {/* Files */}
          {activeTab === 'attachments' && (
            <div className="space-y-3">
              <div className="p-6 border border-dashed border-slate-300 bg-slate-50 rounded-xl text-center space-y-2">
                <UploadCloud className="w-8 h-8 mx-auto text-blue-600" />
                <p className="text-xs text-slate-700 font-bold">Upload deliverable files or screenshots</p>
                <p className="text-[10px] text-slate-400">Stored securely via WordPress Media API</p>
              </div>

              {attachments.map(att => (
                <div key={att.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2">
                    <Paperclip className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-bold text-slate-900">{att.file_name}</p>
                      <p className="text-[10px] text-slate-500 font-medium">By {att.user?.name} • {Math.round(att.file_size / 1024)} KB</p>
                    </div>
                  </div>
                  <a
                    href={att.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-600 font-bold hover:underline"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          )}

          {/* Audit */}
          {activeTab === 'audit' && (
            <div className="space-y-2.5 max-h-60 overflow-y-auto">
              {taskActivities.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4 font-medium">No audit entries yet.</p>
              ) : (
                taskActivities.map(act => (
                  <div key={act.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span className="font-bold text-slate-900">{act.user_name}</span>
                      <span className="font-mono">{act.created_at}</span>
                    </div>
                    <p className="text-blue-700 font-bold">{act.action}</p>
                    {act.old_value && act.new_value && (
                      <p className="text-[11px] text-slate-700 font-mono">
                        {act.old_value} → {act.new_value}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-5 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
        {isAdmin ? (
          <button
            onClick={handleDeleteTask}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold cursor-pointer transition-all border border-rose-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete (Admin)</span>
          </button>
        ) : <div />}

        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-bold border border-slate-200 cursor-pointer shadow-2xs"
          >
            Close
          </button>

          <button
            onClick={handleSaveChanges}
            disabled={isSaving}
            className="flex items-center space-x-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 cursor-pointer transition-all"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
