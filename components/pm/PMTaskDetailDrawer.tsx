'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  AlertCircle,
  Clock,
  ArrowRight,
  UserCheck,
  Edit3,
  History,
  Camera,
  Image as ImageIcon,
  Download,
  Loader2,
  ExternalLink,
  Eye,
  Plus,
  CheckSquare,
  Square,
  ListTodo
} from 'lucide-react';
import { usePMAuth } from '@/lib/pm-auth-context';
import { usePMData } from '@/lib/pm-data-context';
import { PMTask, PMComment, PMAttachment, PMActivityLog, PMSubtask, TaskStatus, PriorityLevel, normalizeTaskStatus, normalizePriority } from '@/lib/pm-types';
import { pmApi } from '@/lib/pm-api';

interface PMTaskDetailDrawerProps {
  task: PMTask;
  onClose: () => void;
}

export const PMTaskDetailDrawer: React.FC<PMTaskDetailDrawerProps> = ({ task, onClose }) => {
  const { user, isAdmin } = usePMAuth();
  const { 
    users, 
    updateTask, 
    deleteTask, 
    addComment, 
    uploadAttachment, 
    deleteAttachment,
    createSubtask,
    updateSubtask,
    deleteSubtask
  } = usePMData();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<TaskStatus>(normalizeTaskStatus(task.status));
  const [priority, setPriority] = useState<PriorityLevel>(normalizePriority(task.priority));
  const [assignedToId, setAssignedToId] = useState<number>(task.assigned_to_id);
  const [startDate, setStartDate] = useState(task.start_date || '');
  const [dueDate, setDueDate] = useState(task.due_date || '');
  const [estimatedHours, setEstimatedHours] = useState(task.estimated_hours);
  const [actualHours, setActualHours] = useState(task.actual_hours);
  const [progress, setProgress] = useState(task.progress);

  const [activeTab, setActiveTab] = useState<'comments' | 'attachments' | 'subtasks' | 'audit'>('comments');
  const [subtasks, setSubtasks] = useState<PMSubtask[]>([]);
  const [comments, setComments] = useState<PMComment[]>([]);
  const [attachments, setAttachments] = useState<PMAttachment[]>([]);
  const [taskActivities, setTaskActivities] = useState<PMActivityLog[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Subtask Create Form States
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [newSubtaskAssigneeId, setNewSubtaskAssigneeId] = useState<number | null>(null);
  const [newSubtaskDueDate, setNewSubtaskDueDate] = useState('');
  const [isCreatingSubtask, setIsCreatingSubtask] = useState(false);
  const [showAddSubtaskForm, setShowAddSubtaskForm] = useState(false);

  // File Upload States
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const [uploadStatusText, setUploadStatusText] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

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
      const [sRes, cRes, aRes, actRes] = await Promise.all([
        pmApi.getTaskSubtasks(taskId),
        pmApi.getTaskComments(taskId),
        pmApi.getTaskAttachments(taskId),
        pmApi.getTaskActivity(taskId)
      ]);

      if (sRes.success && sRes.data) setSubtasks(sRes.data);
      if (cRes.success && cRes.data) setComments(cRes.data);
      if (aRes.success && aRes.data) setAttachments(aRes.data);
      if (actRes.success && actRes.data) setTaskActivities(actRes.data as PMActivityLog[]);
    } catch (err) {
      console.error('Error loading task extras:', err);
    }
  };

  const handleCreateSubtask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubtaskTitle.trim()) return;

    setIsCreatingSubtask(true);
    setErrorMessage(null);

    const res = await createSubtask(task.id, {
      title: newSubtaskTitle.trim(),
      assigned_to: newSubtaskAssigneeId ? Number(newSubtaskAssigneeId) : null,
      due_date: newSubtaskDueDate || null
    });

    setIsCreatingSubtask(false);

    if (res.success && res.data) {
      setSubtasks(prev => [...prev, res.data!]);
      setNewSubtaskTitle('');
      setNewSubtaskDueDate('');
      setNewSubtaskAssigneeId(null);
      setShowAddSubtaskForm(false);
      await loadTaskExtras(task.id);
    } else {
      setErrorMessage(res.message || 'Failed to create subtask');
    }
  };

  const handleToggleSubtaskStatus = async (subtaskId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'todo' : 'completed';
    // Optimistic update
    setSubtasks(prev => prev.map(s => s.id === subtaskId ? { ...s, status: newStatus } : s));

    const res = await updateSubtask(subtaskId, { status: newStatus }, task.id);
    if (!res.success) {
      // Revert on failure
      setSubtasks(prev => prev.map(s => s.id === subtaskId ? { ...s, status: currentStatus as any } : s));
      setErrorMessage(res.message || 'Failed to update subtask status');
    } else {
      await loadTaskExtras(task.id);
    }
  };

  const handleUpdateSubtaskAssignee = async (subtaskId: number, newAssigneeId: number | null) => {
    const res = await updateSubtask(subtaskId, { assigned_to: newAssigneeId }, task.id);
    if (res.success && res.data) {
      setSubtasks(prev => prev.map(s => s.id === subtaskId ? res.data! : s));
      await loadTaskExtras(task.id);
    } else {
      setErrorMessage(res.message || 'Failed to reassign subtask');
    }
  };

  const handleDeleteSubtask = async (subtaskId: number, subtaskTitle: string) => {
    if (!confirm(`Delete subtask "${subtaskTitle}"?`)) return;

    const res = await deleteSubtask(subtaskId, task.id);
    if (res.success) {
      setSubtasks(prev => prev.filter(s => s.id !== subtaskId));
      await loadTaskExtras(task.id);
    } else {
      setErrorMessage(res.message || 'Failed to delete subtask');
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
      assigned_to_id: Number(assignedToId),
      start_date: startDate || null,
      due_date: dueDate || null,
      estimated_hours: Number(estimatedHours) || 0,
      actual_hours: Number(actualHours) || 0,
      progress: Number(progress) || 0
    };

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

  // File Upload Handlers (Optimized for Mobile Phone Cameras & Desktop)
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    processAndUploadFile(files[0]);
    e.target.value = '';
  };

  const processAndUploadFile = (file: File) => {
    if (file.size > 25 * 1024 * 1024) {
      setErrorMessage('File size exceeds 25MB limit. Please choose a smaller file.');
      return;
    }

    setIsUploadingFile(true);
    setUploadStatusText(`Uploading ${file.name}...`);
    setErrorMessage(null);

    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64Data = reader.result as string;
        const res = await uploadAttachment(task.id, {
          file_name: file.name,
          file_type: file.type || 'application/octet-stream',
          file_base64: base64Data
        });

        setIsUploadingFile(false);
        setUploadStatusText('');

        if (res.success && res.data) {
          setAttachments(prev => [res.data!, ...prev]);
          await loadTaskExtras(task.id);
        } else {
          setErrorMessage(res.message || 'Failed to upload file.');
        }
      } catch (err: any) {
        setIsUploadingFile(false);
        setUploadStatusText('');
        setErrorMessage(err?.message || 'Error processing file upload.');
      }
    };

    reader.onerror = () => {
      setIsUploadingFile(false);
      setUploadStatusText('');
      setErrorMessage('Failed to read file from your device.');
    };

    reader.readAsDataURL(file);
  };

  const handleDeleteAttachment = async (attId: number, fileName: string) => {
    if (!confirm(`Delete attachment '${fileName}'?`)) return;

    const res = await deleteAttachment(task.id, attId);
    if (res.success) {
      setAttachments(prev => prev.filter(a => a.id !== attId));
      await loadTaskExtras(task.id);
    } else {
      setErrorMessage(res.message || 'Failed to delete attachment.');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes || bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const isImageAttachment = (att: PMAttachment) => {
    return (
      (att.file_type && att.file_type.startsWith('image/')) ||
      (att.file_url && att.file_url.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i)) ||
      (att.file_name && att.file_name.match(/\.(jpeg|jpg|gif|png|webp|svg)$/i))
    );
  };

  const getActivityDetails = (act: PMActivityLog) => {
    const action = act.action;

    if (action === 'created') {
      return {
        title: 'Created task',
        description: null,
        icon: <FileText className="w-3.5 h-3.5 text-blue-600" />,
        tag: 'Created',
        tagColor: 'bg-blue-50 text-blue-700 border-blue-200'
      };
    }
    if (action === 'reassigned') {
      return {
        title: 'Reassigned task',
        description: (
          <span className="inline-flex items-center space-x-1 font-medium">
            <span className="text-slate-500 line-through">{act.old_value || 'Unassigned'}</span>
            <ArrowRight className="w-3 h-3 text-slate-400 inline mx-0.5" />
            <span className="text-indigo-700 font-bold">{act.new_value}</span>
          </span>
        ),
        icon: <UserCheck className="w-3.5 h-3.5 text-indigo-600" />,
        tag: 'Reassigned',
        tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
      };
    }
    if (action === 'status_changed') {
      return {
        title: 'Updated status',
        description: (
          <span className="inline-flex items-center space-x-1 font-medium">
            <span className="text-slate-500 line-through">{act.old_value}</span>
            <ArrowRight className="w-3 h-3 text-slate-400 inline mx-0.5" />
            <span className="text-emerald-700 font-bold">{act.new_value}</span>
          </span>
        ),
        icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
        tag: 'Status',
        tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      };
    }
    if (action === 'priority_changed') {
      return {
        title: 'Updated priority',
        description: (
          <span className="inline-flex items-center space-x-1 font-medium">
            <span className="text-slate-500 line-through">{act.old_value}</span>
            <ArrowRight className="w-3 h-3 text-slate-400 inline mx-0.5" />
            <span className="text-amber-700 font-bold">{act.new_value}</span>
          </span>
        ),
        icon: <AlertCircle className="w-3.5 h-3.5 text-amber-600" />,
        tag: 'Priority',
        tagColor: 'bg-amber-50 text-amber-700 border-amber-200'
      };
    }
    if (action === 'due_date_changed') {
      return {
        title: 'Updated due date',
        description: (
          <span className="inline-flex items-center space-x-1 font-medium">
            <span className="text-slate-500 line-through">{act.old_value || 'None'}</span>
            <ArrowRight className="w-3 h-3 text-slate-400 inline mx-0.5" />
            <span className="text-purple-700 font-bold">{act.new_value || 'None'}</span>
          </span>
        ),
        icon: <Calendar className="w-3.5 h-3.5 text-purple-600" />,
        tag: 'Schedule',
        tagColor: 'bg-purple-50 text-purple-700 border-purple-200'
      };
    }
    if (action === 'commented') {
      return {
        title: 'Added a comment',
        description: null,
        icon: <MessageSquare className="w-3.5 h-3.5 text-blue-600" />,
        tag: 'Comment',
        tagColor: 'bg-blue-50 text-blue-700 border-blue-200'
      };
    }
    if (action === 'attachment_added') {
      return {
        title: 'Uploaded an attachment',
        description: <span className="font-bold text-slate-800">{act.new_value}</span>,
        icon: <Paperclip className="w-3.5 h-3.5 text-violet-600" />,
        tag: 'Attachment',
        tagColor: 'bg-violet-50 text-violet-700 border-violet-200'
      };
    }
    if (action === 'attachment_deleted') {
      return {
        title: 'Deleted attachment',
        description: <span className="line-through text-slate-500">{act.old_value}</span>,
        icon: <Trash2 className="w-3.5 h-3.5 text-rose-600" />,
        tag: 'Removed',
        tagColor: 'bg-rose-50 text-rose-700 border-rose-200'
      };
    }
    if (action === 'updated_details') {
      return {
        title: 'Updated task title / description',
        description: null,
        icon: <Edit3 className="w-3.5 h-3.5 text-slate-600" />,
        tag: 'Details',
        tagColor: 'bg-slate-100 text-slate-700 border-slate-200'
      };
    }
    if (action === 'updated_progress') {
      return {
        title: 'Updated progress',
        description: (
          <span className="inline-flex items-center space-x-1 font-medium">
            <span className="text-slate-500 line-through">{act.old_value}%</span>
            <ArrowRight className="w-3 h-3 text-slate-400 inline mx-0.5" />
            <span className="text-cyan-700 font-bold">{act.new_value}%</span>
          </span>
        ),
        icon: <Activity className="w-3.5 h-3.5 text-cyan-600" />,
        tag: 'Progress',
        tagColor: 'bg-cyan-50 text-cyan-700 border-cyan-200'
      };
    }
    if (action === 'updated_estimated_hours' || action === 'updated_actual_hours') {
      return {
        title: action === 'updated_estimated_hours' ? 'Estimated hours' : 'Logged hours',
        description: (
          <span className="inline-flex items-center space-x-1 font-medium">
            <span className="text-slate-500 line-through">{act.old_value}h</span>
            <ArrowRight className="w-3 h-3 text-slate-400 inline mx-0.5" />
            <span className="text-slate-800 font-bold">{act.new_value}h</span>
          </span>
        ),
        icon: <Clock className="w-3.5 h-3.5 text-slate-600" />,
        tag: 'Hours',
        tagColor: 'bg-slate-100 text-slate-700 border-slate-200'
      };
    }
    if (action === 'subtask_created') {
      return {
        title: 'Added a subtask',
        description: <span className="font-bold text-slate-800">{act.new_value}</span>,
        icon: <CheckSquare className="w-3.5 h-3.5 text-blue-600" />,
        tag: 'Subtask',
        tagColor: 'bg-blue-50 text-blue-700 border-blue-200'
      };
    }
    if (action === 'subtask_status_changed') {
      return {
        title: 'Updated subtask status',
        description: (
          <span className="inline-flex items-center space-x-1 font-medium">
            <span className="text-slate-500 line-through">{act.old_value}</span>
            <ArrowRight className="w-3 h-3 text-slate-400 inline mx-0.5" />
            <span className="text-emerald-700 font-bold">{act.new_value}</span>
          </span>
        ),
        icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
        tag: 'Subtask',
        tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      };
    }
    if (action === 'subtask_reassigned') {
      return {
        title: 'Reassigned subtask',
        description: (
          <span className="inline-flex items-center space-x-1 font-medium">
            <span className="text-slate-500 line-through">{act.old_value || 'Unassigned'}</span>
            <ArrowRight className="w-3 h-3 text-slate-400 inline mx-0.5" />
            <span className="text-indigo-700 font-bold">{act.new_value}</span>
          </span>
        ),
        icon: <UserCheck className="w-3.5 h-3.5 text-indigo-600" />,
        tag: 'Subtask',
        tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
      };
    }
    if (action === 'subtask_deleted') {
      return {
        title: 'Deleted subtask',
        description: <span className="line-through text-slate-500">{act.old_value}</span>,
        icon: <Trash2 className="w-3.5 h-3.5 text-rose-600" />,
        tag: 'Subtask',
        tagColor: 'bg-rose-50 text-rose-700 border-rose-200'
      };
    }
    if (action === 'deleted') {
      return {
        title: 'Moved to trash',
        description: null,
        icon: <Trash2 className="w-3.5 h-3.5 text-rose-600" />,
        tag: 'Deleted',
        tagColor: 'bg-rose-50 text-rose-700 border-rose-200'
      };
    }
    if (action === 'restored') {
      return {
        title: 'Restored from trash',
        description: null,
        icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
        tag: 'Restored',
        tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      };
    }

    return {
      title: action.replace(/_/g, ' '),
      description: act.new_value ? (
        <span>{act.old_value ? `${act.old_value} → ` : ''}{act.new_value}</span>
      ) : null,
      icon: <History className="w-3.5 h-3.5 text-slate-600" />,
      tag: 'Activity',
      tagColor: 'bg-slate-100 text-slate-700 border-slate-200'
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Mobile/Desktop Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-out Drawer */}
      <div className="relative z-10 w-full max-w-full sm:max-w-xl md:max-w-2xl bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between h-full animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-900/80">
          <div className="flex items-center space-x-3 overflow-hidden">
            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-400 flex items-center justify-center font-bold shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center space-x-2 text-[10px] text-slate-500 dark:text-slate-400 font-bold">
                <span>TASK #{task.id}</span>
                <span>•</span>
                <span className="text-blue-700 dark:text-blue-400 truncate">{task.project_name}</span>
              </div>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 truncate">{task.title}</h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer border border-slate-200 dark:border-slate-700 shadow-2xs shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Drawer Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
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
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:border-blue-500 bg-slate-50/50"
            />
          </div>

          {/* Task Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-500 bg-slate-50/50 resize-none"
              placeholder="Add detailed task instructions, scope, or context..."
            />
          </div>

          {/* Assignment, Status & Priority Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600">Status</label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as TaskStatus)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Review">Review</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>

            {/* Priority */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600">Priority</label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as PriorityLevel)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            {/* Reassignment Dropdown */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600 flex items-center justify-between">
                <span>Assigned To</span>
                <span className="text-[10px] text-indigo-600 font-semibold">Tracked</span>
              </label>
              <select
                value={assignedToId}
                onChange={e => setAssignedToId(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-indigo-900 bg-indigo-50/40 focus:outline-none focus:border-indigo-500"
              >
                <option value="0">-- Unassigned --</option>
                {users
                  .filter(u => {
                    const uRole = (u.role || '').toLowerCase();
                    const uName = (u.name || '').toLowerCase();
                    const uLogin = (u.username || '').toLowerCase();
                    return uRole !== 'admin' && uRole !== 'administrator' && uName !== 'shootside' && uLogin !== 'shootside';
                  })
                  .map(u => (
                    <option key={u.id} value={u.id}>
                      {u.name || u.username} ({u.role || 'Member'})
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Dates & Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600 flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Start Date</span>
              </label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-600 flex items-center space-x-1">
                <Calendar className="w-3 h-3 text-slate-400" />
                <span>Due Date</span>
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Progress & Hours Log */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Progress ({progress}%)</label>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={progress}
                onChange={e => setProgress(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Estimated Hours</label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={estimatedHours}
                onChange={e => setEstimatedHours(Number(e.target.value))}
                className="w-full px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-bold text-slate-900 bg-white focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Actual Hours</label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={actualHours}
                onChange={e => setActualHours(Number(e.target.value))}
                className="w-full px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-bold text-slate-900 bg-white focus:outline-none"
              />
            </div>
          </div>

          {/* Tab Navigation (Discussion, Files, Subtasks, Audit Trail) */}
          <div className="border-b border-slate-200 dark:border-slate-800 flex items-center space-x-3 sm:space-x-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('comments')}
              className={`pb-2 text-xs font-bold transition-colors flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                activeTab === 'comments'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Discussion ({comments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('attachments')}
              className={`pb-2 text-xs font-bold transition-colors flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                activeTab === 'attachments'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Paperclip className="w-3.5 h-3.5" />
              <span>Files & Photos ({attachments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('subtasks')}
              className={`pb-2 text-xs font-bold transition-colors flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                activeTab === 'subtasks'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>
                Subtasks ({subtasks.filter(s => s.status === 'completed').length}/{subtasks.length})
              </span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`pb-2 text-xs font-bold transition-colors flex items-center space-x-1.5 shrink-0 cursor-pointer ${
                activeTab === 'audit'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Audit Trail ({taskActivities.length})</span>
            </button>
          </div>

          {/* 0. Subtasks Tab */}
          {activeTab === 'subtasks' && (
            <div className="space-y-4">
              {/* Progress Summary */}
              {subtasks.length > 0 && (
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">Subtask Completion</span>
                    <span className="font-bold text-blue-600">
                      {subtasks.filter(s => s.status === 'completed').length} of {subtasks.length} (
                      {Math.round((subtasks.filter(s => s.status === 'completed').length / subtasks.length) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.round(
                          (subtasks.filter(s => s.status === 'completed').length / subtasks.length) * 100
                        )}%`
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Subtasks List */}
              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {subtasks.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400 font-medium bg-slate-50/60 rounded-xl border border-dashed border-slate-200">
                    <ListTodo className="w-6 h-6 mx-auto mb-1 text-slate-300" />
                    No subtasks yet. Break down this task into smaller steps below.
                  </div>
                ) : (
                  subtasks.map(subtask => {
                    const isCompleted = subtask.status === 'completed';
                    return (
                      <div
                        key={subtask.id}
                        className={`p-3 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs ${
                          isCompleted
                            ? 'bg-slate-50/70 border-slate-200 text-slate-400'
                            : 'bg-white border-slate-200 shadow-2xs hover:border-slate-300'
                        }`}
                      >
                        {/* Title & Checkbox */}
                        <div className="flex items-start sm:items-center space-x-2.5 min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() => handleToggleSubtaskStatus(subtask.id, subtask.status)}
                            className="text-slate-400 hover:text-blue-600 transition-colors cursor-pointer mt-0.5 sm:mt-0 shrink-0"
                            title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-400" />
                            )}
                          </button>

                          <span
                            className={`font-semibold leading-snug break-words ${
                              isCompleted ? 'line-through text-slate-400' : 'text-slate-800'
                            }`}
                          >
                            {subtask.title}
                          </span>
                        </div>

                        {/* Assignee, Due Date, and Delete Controls */}
                        <div className="flex items-center space-x-2 shrink-0 pl-6 sm:pl-0">
                          {/* Assignee Dropdown */}
                          <select
                            value={
                              typeof subtask.assigned_to === 'object'
                                ? subtask.assigned_to?.id || ''
                                : subtask.assigned_to_id || subtask.assigned_to || ''
                            }
                            onChange={e =>
                              handleUpdateSubtaskAssignee(
                                subtask.id,
                                e.target.value ? Number(e.target.value) : null
                              )
                            }
                            className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-medium text-slate-700 focus:outline-none cursor-pointer hover:bg-white"
                          >
                            <option value="">Unassigned</option>
                            {users.map(u => (
                              <option key={u.id} value={u.id}>
                                {u.name}
                              </option>
                            ))}
                          </select>

                          {/* Due Date */}
                          {subtask.due_date && (
                            <span className="flex items-center space-x-1 text-[10px] text-slate-500 bg-slate-50 px-2 py-1 rounded-lg border border-slate-200">
                              <Calendar className="w-3 h-3 text-slate-400" />
                              <span>{subtask.due_date}</span>
                            </span>
                          )}

                          {/* Delete Button */}
                          <button
                            type="button"
                            onClick={() => handleDeleteSubtask(subtask.id, subtask.title)}
                            className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                            title="Delete subtask"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Add Subtask Button or Expandable Form */}
              {!showAddSubtaskForm ? (
                <button
                  type="button"
                  onClick={() => setShowAddSubtaskForm(true)}
                  className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border border-dashed border-blue-300 dark:border-blue-800/80 bg-blue-50/60 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Subtask</span>
                </button>
              ) : (
                <form
                  onSubmit={handleCreateSubtask}
                  className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5 animate-in fade-in duration-200"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] font-bold text-slate-700 dark:text-slate-200 flex items-center space-x-1.5">
                      <Plus className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>Add New Subtask</span>
                    </p>
                    <button
                      type="button"
                      onClick={() => setShowAddSubtaskForm(false)}
                      className="text-[10px] font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="What subtask needs to be completed?..."
                    value={newSubtaskTitle}
                    onChange={e => setNewSubtaskTitle(e.target.value)}
                    autoFocus
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <select
                      value={newSubtaskAssigneeId || ''}
                      onChange={e => setNewSubtaskAssigneeId(e.target.value ? Number(e.target.value) : null)}
                      className="flex-1 min-w-[140px] px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-700 dark:text-slate-200 focus:outline-none"
                    >
                      <option value="">Assign To (Optional)</option>
                      {users.map(u => (
                        <option key={u.id} value={u.id}>
                          {u.name}
                        </option>
                      ))}
                    </select>

                    <input
                      type="date"
                      value={newSubtaskDueDate}
                      onChange={e => setNewSubtaskDueDate(e.target.value)}
                      className="px-2.5 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-700 dark:text-slate-200 focus:outline-none"
                      placeholder="Due Date"
                    />

                    <button
                      type="submit"
                      disabled={!newSubtaskTitle.trim() || isCreatingSubtask}
                      className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs disabled:opacity-40 transition-all cursor-pointer"
                    >
                      {isCreatingSubtask ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Save className="w-3.5 h-3.5" />
                      )}
                      <span>Save Subtask</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowAddSubtaskForm(false)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* 1. Comments Tab */}
          {activeTab === 'comments' && (
            <div className="space-y-4">
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {comments.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4 font-medium">
                    No comments yet. Start the discussion below.
                  </p>
                ) : (
                  comments.map(c => (
                    <div key={c.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {c.user?.avatar ? (
                            <img
                              src={c.user.avatar}
                              alt={c.user?.name}
                              className="w-5 h-5 rounded-full object-cover border border-slate-200"
                            />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-[10px] flex items-center justify-center uppercase">
                              {c.user?.name ? c.user.name.charAt(0) : 'U'}
                            </div>
                          )}
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
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer disabled:opacity-40 transition-all shadow-xs shrink-0"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

          {/* 2. Files & Photos Tab (Fully Mobile Optimized + Desktop Drag-and-Drop) */}
          {activeTab === 'attachments' && (
            <div className="space-y-4">
              {/* Hidden File Inputs */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="*/*"
              />
              <input
                type="file"
                ref={cameraInputRef}
                onChange={handleFileSelect}
                className="hidden"
                accept="image/*"
                capture="environment"
              />

              {/* Upload Card / Dropzone */}
              <div
                onDragOver={e => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={e => {
                  e.preventDefault();
                  setIsDragging(false);
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    processAndUploadFile(e.dataTransfer.files[0]);
                  }
                }}
                className={`p-5 rounded-2xl border-2 border-dashed transition-all text-center space-y-3 ${
                  isDragging
                    ? 'border-blue-500 bg-blue-50/80 scale-99'
                    : 'border-slate-300 bg-slate-50/80 hover:bg-slate-50 hover:border-slate-400'
                }`}
              >
                {isUploadingFile ? (
                  <div className="py-4 flex flex-col items-center justify-center space-y-2">
                    <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                    <p className="text-xs font-bold text-slate-800">{uploadStatusText || 'Uploading file...'}</p>
                    <p className="text-[10px] text-slate-400">Please wait while the file is processed...</p>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 mx-auto rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                      <UploadCloud className="w-5 h-5" />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-900">Upload Task Files, Documents & Photos</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">Supports images, PDFs, documents, screenshots (Up to 25MB)</p>
                    </div>

                    {/* Dual Action Buttons (Specifically friendly for Mobile Touch & Phones) */}
                    <div className="flex items-center justify-center gap-2 pt-1 flex-wrap">
                      <button
                        type="button"
                        onClick={() => cameraInputRef.current?.click()}
                        className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 shadow-2xs cursor-pointer active:scale-95 transition-all"
                      >
                        <Camera className="w-3.5 h-3.5 text-blue-600" />
                        <span>Take Photo / Camera</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs cursor-pointer active:scale-95 transition-all"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Choose File / Gallery</span>
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Uploaded Files List */}
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {attachments.length === 0 ? (
                  <div className="p-5 text-center text-xs text-slate-400 font-medium bg-slate-50/50 rounded-xl border border-slate-200">
                    <Paperclip className="w-5 h-5 mx-auto mb-1 text-slate-300" />
                    No files or photos uploaded for this task yet.
                  </div>
                ) : (
                  attachments.map(att => {
                    const isImg = isImageAttachment(att);
                    const canDelete = isAdmin || (user && user.id === att.user_id);

                    return (
                      <div
                        key={att.id}
                        className="p-3 rounded-xl bg-slate-50/90 border border-slate-200 hover:bg-white hover:border-slate-300 transition-all flex items-center justify-between gap-3 text-xs"
                      >
                        {/* File Thumbnail & Name */}
                        <div className="flex items-center space-x-3 min-w-0">
                          {isImg ? (
                            <button
                              type="button"
                              onClick={() => setPreviewImageUrl(att.file_url)}
                              className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100 group cursor-pointer"
                            >
                              <img
                                src={att.file_url}
                                alt={att.file_name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                              />
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <Eye className="w-3.5 h-3.5 text-white" />
                              </div>
                            </button>
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold">
                              <FileText className="w-5 h-5" />
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 truncate" title={att.file_name}>
                              {att.file_name}
                            </p>
                            <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                              {formatFileSize(att.file_size)} • {att.user?.name || 'Member'} • <span className="font-mono">{att.created_at.substring(0, 10)}</span>
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-1 shrink-0">
                          {isImg && (
                            <button
                              type="button"
                              onClick={() => setPreviewImageUrl(att.file_url)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              title="Preview"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <a
                            href={att.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={att.file_name}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Open / Download"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          {canDelete && (
                            <button
                              type="button"
                              onClick={() => handleDeleteAttachment(att.id, att.file_name)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete file"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* 3. Audit Trail - Small line layout with full details */}
          {activeTab === 'audit' && (
            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {taskActivities.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400 font-medium bg-slate-50 rounded-xl border border-slate-200">
                  <Clock className="w-6 h-6 mx-auto mb-1 text-slate-300" />
                  No audit trail recorded yet for this task.
                </div>
              ) : (
                taskActivities.map(act => {
                  const details = getActivityDetails(act);
                  return (
                    <div
                      key={act.id}
                      className="p-2.5 rounded-xl bg-slate-50/80 border border-slate-200 hover:bg-white transition-colors flex items-start space-x-3 text-xs"
                    >
                      {/* Avatar / Icon */}
                      <div className="mt-0.5 relative shrink-0">
                        {act.user_avatar ? (
                          <img
                            src={act.user_avatar}
                            alt={act.user_name}
                            className="w-7 h-7 rounded-full object-cover border border-slate-200"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-extrabold flex items-center justify-center text-[10px] uppercase">
                            {act.user_name ? act.user_name.substring(0, 2) : 'SY'}
                          </div>
                        )}
                        <div className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-white border border-slate-200 shadow-2xs">
                          {details.icon}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center space-x-1.5 flex-wrap">
                            <span className="font-bold text-slate-900">{act.user_name}</span>
                            {act.user_role && (
                              <span className="text-[9px] px-1.5 py-0.2 font-bold uppercase rounded bg-slate-200 text-slate-700">
                                {act.user_role}
                              </span>
                            )}
                            <span className="text-slate-400 text-[11px]">•</span>
                            <span className={`text-[10px] px-1.5 py-0.2 rounded border font-semibold ${details.tagColor}`}>
                              {details.tag}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono shrink-0">
                            {act.created_at}
                          </span>
                        </div>

                        <div className="text-[11px] text-slate-700 flex items-center space-x-1 flex-wrap">
                          <span className="font-medium text-slate-600">{details.title}:</span>
                          {details.description ? (
                            <span>{details.description}</span>
                          ) : (
                            <span className="text-slate-500 italic">Updated</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between gap-3">
          {isAdmin ? (
            <button
              onClick={handleDeleteTask}
              className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/50 text-rose-700 dark:text-rose-400 text-xs font-bold cursor-pointer transition-all border border-rose-200 dark:border-rose-800 shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete (Admin)</span>
            </button>
          ) : <div />}

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onClose}
              className="px-3 sm:px-4 py-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-bold border border-slate-200 dark:border-slate-700 cursor-pointer shadow-2xs"
            >
              Close
            </button>

            <button
              onClick={handleSaveChanges}
              disabled={isSaving}
              className="flex items-center space-x-1.5 px-4 sm:px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-600/20 cursor-pointer transition-all shrink-0"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Image Preview Lightbox Modal */}
      {previewImageUrl && (
        <div 
          className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewImageUrl(null)}
        >
          <div 
            className="relative max-w-3xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl p-2 flex flex-col items-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setPreviewImageUrl(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black text-white cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <img
              src={previewImageUrl}
              alt="Attachment Preview"
              className="max-h-[80vh] w-auto object-contain rounded-lg"
            />
            <div className="mt-3 flex items-center space-x-3">
              <a
                href={previewImageUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center space-x-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Open / Download Full Size</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
