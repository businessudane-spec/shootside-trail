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
  ListTodo,
  AtSign
} from 'lucide-react';
import { usePMAuth } from '@/lib/pm-auth-context';
import { usePMData } from '@/lib/pm-data-context';
import { PMUser, PMTask, PMComment, PMAttachment, PMActivityLog, PMSubtask, TaskStatus, PriorityLevel, normalizeTaskStatus, normalizePriority } from '@/lib/pm-types';
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
    deleteComment,
    uploadAttachment, 
    deleteAttachment,
    createSubtask,
    updateSubtask,
    deleteSubtask,
    getSubtaskComments,
    addSubtaskComment
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
  const [isPostingComment, setIsPostingComment] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Mentions State
  const [showMentionSuggestions, setShowMentionSuggestions] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [mentionIndex, setMentionIndex] = useState(0);
  const [mentionCursorPos, setMentionCursorPos] = useState<number>(0);
  const commentInputRef = useRef<HTMLInputElement>(null);

  // Subtask Create Form States
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [newSubtaskAssigneeId, setNewSubtaskAssigneeId] = useState<number | null>(null);
  const [newSubtaskDueDate, setNewSubtaskDueDate] = useState('');
  const [isCreatingSubtask, setIsCreatingSubtask] = useState(false);
  const [showAddSubtaskForm, setShowAddSubtaskForm] = useState(false);

  // Subtask Comments State
  const [expandedSubtaskId, setExpandedSubtaskId] = useState<number | null>(null);
  const [subtaskCommentsMap, setSubtaskCommentsMap] = useState<Record<number, PMComment[]>>({});
  const [loadingSubtaskCommentsMap, setLoadingSubtaskCommentsMap] = useState<Record<number, boolean>>({});
  const [isPostingSubtaskCommentMap, setIsPostingSubtaskCommentMap] = useState<Record<number, boolean>>({});
  const [subtaskCommentInputMap, setSubtaskCommentInputMap] = useState<Record<number, string>>({});
  const [subtaskMentionQuery, setSubtaskMentionQuery] = useState('');
  const [showSubtaskMentionSuggestions, setShowSubtaskMentionSuggestions] = useState<number | null>(null);
  const [subtaskMentionIndex, setSubtaskMentionIndex] = useState(0);
  const [subtaskMentionCursorPos, setSubtaskMentionCursorPos] = useState(0);

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

  // Mention Handlers
  const filteredMentionUsers = users.filter(u => {
    const q = mentionQuery.toLowerCase();
    return u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q);
  });

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const pos = e.target.selectionStart || val.length;
    setNewCommentText(val);
    setMentionCursorPos(pos);

    // Look back from current cursor position for '@'
    const textBeforeCursor = val.slice(0, pos);
    const match = textBeforeCursor.match(/(?:^|\s)@([a-zA-Z0-9_\.\-]*)$/);
    if (match) {
      setMentionQuery(match[1]);
      setShowMentionSuggestions(true);
      setMentionIndex(0);
    } else {
      setShowMentionSuggestions(false);
    }
  };

  const insertMention = (targetUser: PMUser) => {
    const textBeforeCursor = newCommentText.slice(0, mentionCursorPos);
    const textAfterCursor = newCommentText.slice(mentionCursorPos);

    // Replace the '@...' with '@Name '
    const mentionTag = `@${targetUser.name.replace(/\s+/g, '')} `;
    const updatedBefore = textBeforeCursor.replace(/(?:^|\s)@([a-zA-Z0-9_\.\-]*)$/, (match) => {
      return match.startsWith(' ') ? ` ${mentionTag}` : mentionTag;
    });

    const newText = updatedBefore + textAfterCursor;
    setNewCommentText(newText);
    setShowMentionSuggestions(false);

    setTimeout(() => {
      if (commentInputRef.current) {
        commentInputRef.current.focus();
        const nextPos = updatedBefore.length;
        commentInputRef.current.setSelectionRange(nextPos, nextPos);
      }
    }, 10);
  };

  const handleCommentKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (showMentionSuggestions && filteredMentionUsers.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setMentionIndex(prev => (prev + 1) % filteredMentionUsers.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setMentionIndex(prev => (prev - 1 + filteredMentionUsers.length) % filteredMentionUsers.length);
        return;
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        insertMention(filteredMentionUsers[mentionIndex]);
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setShowMentionSuggestions(false);
        return;
      }
    }
  };

  const renderCommentContent = (text: string) => {
    const parts = text.split(/(@[a-zA-Z0-9_\.\-]+)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('@')) {
        return (
          <span
            key={idx}
            className="inline-flex items-center space-x-0.5 px-1.5 py-0.2 mx-0.5 rounded-md text-[11px] font-bold bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
          >
            <AtSign className="w-2.5 h-2.5 inline mr-0.5" />
            <span>{part.slice(1)}</span>
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    const commentText = newCommentText.trim();
    if (!commentText || isPostingComment) return;

    // 1. Instantly clear input, close mention suggestions, lock against duplicate clicks
    setNewCommentText('');
    setShowMentionSuggestions(false);
    setIsPostingComment(true);

    // 2. Optimistic instant UI update (0ms latency for user)
    const tempId = Date.now();
    const optimisticComment: PMComment = {
      id: tempId,
      task_id: task.id,
      user_id: user?.id || 1,
      user: user || null,
      comment: commentText,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
      updated_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    setComments(prev => [...prev, optimisticComment]);

    try {
      const res = await addComment(task.id, commentText);
      if (res.success && res.data) {
        // Swap optimistic placeholder with confirmed server object
        setComments(prev => prev.map(c => c.id === tempId ? res.data! : c));
      } else {
        // Rollback on error
        setComments(prev => prev.filter(c => c.id !== tempId));
        setNewCommentText(commentText);
        setErrorMessage(res.message || 'Failed to save comment.');
      }
    } catch (err: any) {
      setComments(prev => prev.filter(c => c.id !== tempId));
      setNewCommentText(commentText);
      setErrorMessage(err?.message || 'Error saving comment.');
    } finally {
      setIsPostingComment(false);
    }
  };

  // Subtask Comments Handlers
  const handleToggleSubtaskComments = async (subtaskId: number) => {
    if (expandedSubtaskId === subtaskId) {
      setExpandedSubtaskId(null);
      return;
    }

    setExpandedSubtaskId(subtaskId);
    setLoadingSubtaskCommentsMap(prev => ({ ...prev, [subtaskId]: true }));
    try {
      const res = await getSubtaskComments(subtaskId);
      if (res.success && res.data) {
        setSubtaskCommentsMap(prev => ({ ...prev, [subtaskId]: res.data! }));
      }
    } finally {
      setLoadingSubtaskCommentsMap(prev => ({ ...prev, [subtaskId]: false }));
    }
  };

  const handleSubtaskCommentChange = (subtaskId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const pos = e.target.selectionStart || val.length;
    setSubtaskCommentInputMap(prev => ({ ...prev, [subtaskId]: val }));
    setSubtaskMentionCursorPos(pos);

    const textBeforeCursor = val.slice(0, pos);
    const match = textBeforeCursor.match(/(?:^|\s)@([a-zA-Z0-9_\.\-]*)$/);
    if (match) {
      setSubtaskMentionQuery(match[1]);
      setShowSubtaskMentionSuggestions(subtaskId);
      setSubtaskMentionIndex(0);
    } else {
      setShowSubtaskMentionSuggestions(null);
    }
  };

  const insertSubtaskMention = (subtaskId: number, targetUser: PMUser) => {
    const currentText = subtaskCommentInputMap[subtaskId] || '';
    const textBeforeCursor = currentText.slice(0, subtaskMentionCursorPos);
    const textAfterCursor = currentText.slice(subtaskMentionCursorPos);

    const mentionTag = `@${targetUser.name.replace(/\s+/g, '')} `;
    const updatedBefore = textBeforeCursor.replace(/(?:^|\s)@([a-zA-Z0-9_\.\-]*)$/, (match) => {
      return match.startsWith(' ') ? ` ${mentionTag}` : mentionTag;
    });

    const newText = updatedBefore + textAfterCursor;
    setSubtaskCommentInputMap(prev => ({ ...prev, [subtaskId]: newText }));
    setShowSubtaskMentionSuggestions(null);
  };

  const handleSubtaskCommentKeyDown = (subtaskId: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    const filteredUsers = users.filter(u => {
      const q = subtaskMentionQuery.toLowerCase();
      return u.name.toLowerCase().includes(q) || u.username.toLowerCase().includes(q);
    });

    if (showSubtaskMentionSuggestions === subtaskId && filteredUsers.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSubtaskMentionIndex(prev => (prev + 1) % filteredUsers.length);
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSubtaskMentionIndex(prev => (prev - 1 + filteredUsers.length) % filteredUsers.length);
        return;
      }
      if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault();
        insertSubtaskMention(subtaskId, filteredUsers[subtaskMentionIndex]);
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setShowSubtaskMentionSuggestions(null);
        return;
      }
    }
  };

  const handlePostSubtaskComment = async (subtaskId: number, e: React.FormEvent) => {
    e.preventDefault();
    const commentText = (subtaskCommentInputMap[subtaskId] || '').trim();
    if (!commentText || isPostingSubtaskCommentMap[subtaskId]) return;

    // 1. Instantly clear input, close suggestions, lock subtask button
    setSubtaskCommentInputMap(prev => ({ ...prev, [subtaskId]: '' }));
    setShowSubtaskMentionSuggestions(null);
    setIsPostingSubtaskCommentMap(prev => ({ ...prev, [subtaskId]: true }));

    // 2. Optimistic instant UI update (0ms)
    const tempId = Date.now();
    const optimisticComment: PMComment = {
      id: tempId,
      task_id: subtaskId,
      user_id: user?.id || 1,
      user: user || null,
      comment: commentText,
      created_at: new Date().toISOString().replace('T', ' ').substring(0, 19),
      updated_at: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };

    setSubtaskCommentsMap(prev => ({
      ...prev,
      [subtaskId]: [...(prev[subtaskId] || []), optimisticComment]
    }));

    setSubtasks(prev => prev.map(st => st.id === subtaskId ? {
      ...st,
      comments_count: (st.comments_count || 0) + 1
    } : st));

    try {
      const res = await addSubtaskComment(subtaskId, commentText);
      if (res.success && res.data) {
        setSubtaskCommentsMap(prev => ({
          ...prev,
          [subtaskId]: (prev[subtaskId] || []).map(c => c.id === tempId ? res.data! : c)
        }));
      } else {
        // Rollback on error
        setSubtaskCommentsMap(prev => ({
          ...prev,
          [subtaskId]: (prev[subtaskId] || []).filter(c => c.id !== tempId)
        }));
        setSubtaskCommentInputMap(prev => ({ ...prev, [subtaskId]: commentText }));
        setSubtasks(prev => prev.map(st => st.id === subtaskId ? {
          ...st,
          comments_count: Math.max(0, (st.comments_count || 1) - 1)
        } : st));
      }
    } catch (err: any) {
      setSubtaskCommentsMap(prev => ({
        ...prev,
        [subtaskId]: (prev[subtaskId] || []).filter(c => c.id !== tempId)
      }));
      setSubtaskCommentInputMap(prev => ({ ...prev, [subtaskId]: commentText }));
    } finally {
      setIsPostingSubtaskCommentMap(prev => ({ ...prev, [subtaskId]: false }));
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    // Optimistic removal (0ms)
    setComments(prev => prev.filter(c => c.id !== commentId));
    try {
      const res = await deleteComment(commentId, task.id);
      if (!res.success) {
        setErrorMessage(res.message || 'Failed to delete comment');
        await loadTaskExtras(task.id);
      }
    } catch (e: any) {
      setErrorMessage(e?.message || 'Failed to delete comment');
      await loadTaskExtras(task.id);
    }
  };

  const handleDeleteSubtaskComment = async (subtaskId: number, commentId: number) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    // Optimistic removal (0ms)
    setSubtaskCommentsMap(prev => ({
      ...prev,
      [subtaskId]: (prev[subtaskId] || []).filter(c => c.id !== commentId)
    }));
    setSubtasks(prev => prev.map(st => st.id === subtaskId ? {
      ...st,
      comments_count: Math.max(0, (st.comments_count || 1) - 1)
    } : st));

    try {
      const res = await deleteComment(commentId, task.id, subtaskId);
      if (!res.success) {
        setErrorMessage(res.message || 'Failed to delete comment');
      }
    } catch (e: any) {
      setErrorMessage(e?.message || 'Failed to delete comment');
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

  const getAttachmentUrl = (att: PMAttachment) => {
    if (att.id) {
      return `https://shootside-in-gpnm.bom1.mystaging.site/index.php?rest_route=/shootside-pm/v1/attachments/${att.id}/file`;
    }
    let url = att.stream_url || att.file_url || '';
    if (url.includes('wp-content/uploads/')) {
      return url.replace(/^https?:\/\/[^\/]+/, 'https://shootside-in-gpnm.bom1.mystaging.site');
    }
    return url;
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
                    const isCommentsOpen = expandedSubtaskId === subtask.id;
                    const commentsCount = subtask.comments_count ?? (subtaskCommentsMap[subtask.id]?.length ?? 0);

                    return (
                      <div
                        key={subtask.id}
                        className={`p-3 rounded-xl border transition-all flex flex-col gap-2.5 text-xs ${
                          isCompleted
                            ? 'bg-slate-50/70 border-slate-200 text-slate-400'
                            : 'bg-white border-slate-200 shadow-2xs hover:border-slate-300'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
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

                          {/* Assignee, Due Date, Comments Toggle, and Delete Controls */}
                          <div className="flex items-center space-x-2 shrink-0 pl-6 sm:pl-0 flex-wrap">
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

                            {/* Subtask Discussion Button */}
                            <button
                              type="button"
                              onClick={() => handleToggleSubtaskComments(subtask.id)}
                              className={`flex items-center space-x-1 px-2 py-1 rounded-lg border text-[11px] transition-colors cursor-pointer ${
                                isCommentsOpen
                                  ? 'bg-blue-600 text-white font-bold border-blue-600'
                                  : commentsCount > 0
                                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-bold'
                                  : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100'
                              }`}
                              title="Subtask Discussion / Comments"
                            >
                              <MessageSquare className="w-3 h-3" />
                              <span>{commentsCount}</span>
                            </button>

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

                        {/* Collapsible Subtask Discussion Thread */}
                        {isCommentsOpen && (
                          <div className="mt-2 pt-2.5 border-t border-slate-100 dark:border-slate-800 space-y-2.5 w-full">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                                <MessageSquare className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                                <span>Subtask Discussion</span>
                              </span>
                              <span className="text-[10px] text-slate-400 font-mono">
                                {(subtaskCommentsMap[subtask.id]?.length || 0)} comments
                              </span>
                            </div>

                            {/* Comments List */}
                            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                              {loadingSubtaskCommentsMap[subtask.id] ? (
                                <div className="py-4 flex justify-center">
                                  <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                                </div>
                              ) : (subtaskCommentsMap[subtask.id]?.length || 0) === 0 ? (
                                <p className="text-[11px] text-slate-400 text-center py-2">
                                  No comments on this subtask yet. Start below.
                                </p>
                              ) : (
                                subtaskCommentsMap[subtask.id].map(c => (
                                  <div key={c.id} className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-1.5 min-w-0">
                                        {c.user?.avatar ? (
                                          <img src={c.user.avatar} alt={c.user.name} className="w-4 h-4 rounded-full object-cover shrink-0" />
                                        ) : (
                                          <div className="w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-[9px] flex items-center justify-center uppercase shrink-0">
                                            {c.user?.name ? c.user.name.charAt(0) : 'U'}
                                          </div>
                                        )}
                                        <span className="font-bold text-slate-900 dark:text-white text-[11px] truncate">{c.user?.name || 'User'}</span>
                                        <span className="text-[9px] text-slate-500 font-medium">({c.user?.role || 'MEMBER'})</span>
                                      </div>
                                      <div className="flex items-center space-x-1.5 shrink-0">
                                        <span className="text-[9px] text-slate-400 font-mono">{c.created_at}</span>
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteSubtaskComment(subtask.id, c.id)}
                                          className="p-1 rounded-md text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                                          title="Delete subtask comment"
                                        >
                                          <Trash2 className="w-2.5 h-2.5" />
                                        </button>
                                      </div>
                                    </div>
                                    <p className="text-slate-700 dark:text-slate-200 text-[11px] leading-relaxed pl-5 break-words">
                                      {renderCommentContent(c.comment)}
                                    </p>
                                  </div>
                                ))
                              )}
                            </div>

                            {/* Subtask Comment Input */}
                            <div className="relative">
                              {/* Subtask Mentions Popup */}
                              {showSubtaskMentionSuggestions === subtask.id && filteredMentionUsers.length > 0 && (
                                <div className="absolute bottom-full left-0 mb-1.5 w-64 max-h-44 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-50 p-1 space-y-1">
                                  <div className="px-2 py-0.5 text-[9px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <span>Mention Member</span>
                                    <span className="font-mono text-[8px]">Tab / ↵</span>
                                  </div>
                                  {filteredMentionUsers.map((u, idx) => (
                                    <button
                                      key={u.id}
                                      type="button"
                                      onClick={() => insertSubtaskMention(subtask.id, u)}
                                      className={`w-full flex items-center space-x-2 px-2 py-1 rounded-lg text-left transition-colors cursor-pointer ${
                                        idx === subtaskMentionIndex
                                          ? 'bg-blue-600 text-white font-bold'
                                          : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                                      }`}
                                    >
                                      {u.avatar ? (
                                        <img src={u.avatar} alt={u.name} className="w-4 h-4 rounded-full object-cover shrink-0" />
                                      ) : (
                                        <div className={`w-4 h-4 rounded-full font-bold text-[9px] flex items-center justify-center uppercase shrink-0 ${
                                          idx === subtaskMentionIndex ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
                                        }`}>
                                          {u.name ? u.name.charAt(0) : 'U'}
                                        </div>
                                      )}
                                      <span className="text-[11px] font-bold truncate">{u.name}</span>
                                    </button>
                                  ))}
                                </div>
                              )}

                              <form onSubmit={(e) => handlePostSubtaskComment(subtask.id, e)} className="flex items-center space-x-1.5">
                                <div className="relative flex-1">
                                  <input
                                    type="text"
                                    placeholder="Comment on this subtask... (@ to mention)"
                                    value={subtaskCommentInputMap[subtask.id] || ''}
                                    onChange={(e) => handleSubtaskCommentChange(subtask.id, e)}
                                    onKeyDown={(e) => handleSubtaskCommentKeyDown(subtask.id, e)}
                                    className="w-full pl-3 pr-7 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setSubtaskCommentInputMap(prev => ({ ...prev, [subtask.id]: (prev[subtask.id] || '') + '@' }));
                                      setSubtaskMentionQuery('');
                                      setShowSubtaskMentionSuggestions(subtask.id);
                                    }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 cursor-pointer"
                                    title="Mention member"
                                  >
                                    <AtSign className="w-3 h-3" />
                                  </button>
                                </div>

                                <button
                                  type="submit"
                                  disabled={isPostingSubtaskCommentMap[subtask.id] || !(subtaskCommentInputMap[subtask.id] || '').trim()}
                                  className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer disabled:opacity-40 transition-all shadow-xs shrink-0 flex items-center justify-center min-w-[28px]"
                                >
                                  {isPostingSubtaskCommentMap[subtask.id] ? <Loader2 className="w-3 h-3 animate-spin" /> : <Send className="w-3 h-3" />}
                                </button>
                              </form>
                            </div>
                          </div>
                        )}
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
                    <div key={c.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {c.user?.avatar ? (
                            <img
                              src={c.user.avatar}
                              alt={c.user?.name}
                              className="w-5 h-5 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                            />
                          ) : (
                            <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-bold text-[10px] flex items-center justify-center uppercase">
                              {c.user?.name ? c.user.name.charAt(0) : 'U'}
                            </div>
                          )}
                          <span className="font-bold text-slate-900 dark:text-white">{c.user?.name || 'User'}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">({c.user?.role || 'MEMBER'})</span>
                        </div>
                        <div className="flex items-center space-x-1.5 shrink-0">
                          <span className="text-[10px] text-slate-400 font-mono">{c.created_at}</span>
                          <button
                            type="button"
                            onClick={() => handleDeleteComment(c.id)}
                            className="p-1 rounded-md text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
                            title="Delete comment"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <p className="text-slate-700 dark:text-slate-200 text-xs leading-relaxed pl-7 break-words">
                        {renderCommentContent(c.comment)}
                      </p>
                    </div>
                  ))
                )}
              </div>

              <div className="relative">
                {/* Mentions Autocomplete Popup */}
                {showMentionSuggestions && filteredMentionUsers.length > 0 && (
                  <div className="absolute bottom-full left-0 mb-2 w-72 max-h-56 overflow-y-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl z-50 p-1.5 space-y-1">
                    <div className="px-2.5 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="flex items-center space-x-1">
                        <AtSign className="w-3 h-3 text-blue-500" />
                        <span>Mention Team Member</span>
                      </span>
                      <span className="font-mono text-[9px]">Tab / ↵</span>
                    </div>
                    {filteredMentionUsers.map((u, idx) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => insertMention(u)}
                        className={`w-full flex items-center space-x-2.5 px-2.5 py-1.5 rounded-xl text-left transition-colors cursor-pointer ${
                          idx === mentionIndex
                            ? 'bg-blue-600 text-white font-bold'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        {u.avatar ? (
                          <img src={u.avatar} alt={u.name} className="w-5 h-5 rounded-full object-cover shrink-0" />
                        ) : (
                          <div className={`w-5 h-5 rounded-full font-bold text-[10px] flex items-center justify-center uppercase shrink-0 ${
                            idx === mentionIndex ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700 dark:bg-slate-700 dark:text-blue-300'
                          }`}>
                            {u.name ? u.name.charAt(0) : 'U'}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs truncate font-bold">{u.name}</p>
                          <p className={`text-[10px] truncate ${idx === mentionIndex ? 'text-blue-100' : 'text-slate-400'}`}>
                            @{u.username || u.name.toLowerCase().replace(/\s+/g, '')}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                <form onSubmit={handlePostComment} className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <input
                      ref={commentInputRef}
                      type="text"
                      placeholder="Write a comment... (Type @ to mention team members)"
                      value={newCommentText}
                      onChange={handleCommentChange}
                      onKeyDown={handleCommentKeyDown}
                      className="w-full pl-3.5 pr-8 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setNewCommentText(prev => prev + '@');
                        setMentionQuery('');
                        setShowMentionSuggestions(true);
                        setTimeout(() => commentInputRef.current?.focus(), 10);
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer"
                      title="Mention a member"
                    >
                      <AtSign className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isPostingComment || !newCommentText.trim()}
                    className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer disabled:opacity-40 transition-all shadow-xs shrink-0 flex items-center justify-center min-w-[36px]"
                  >
                    {isPostingComment ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  </button>
                </form>
              </div>
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
                    const fileUrl = getAttachmentUrl(att);

                    return (
                      <div
                        key={att.id}
                        className="p-3 rounded-xl bg-slate-50/90 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all flex items-center justify-between gap-3 text-xs"
                      >
                        {/* File Thumbnail & Name */}
                        <div className="flex items-center space-x-3 min-w-0">
                          {isImg ? (
                            <button
                              type="button"
                              onClick={() => setPreviewImageUrl(fileUrl)}
                              className="relative w-10 h-10 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0 bg-slate-100 dark:bg-slate-800 group cursor-pointer"
                            >
                              <img
                                src={fileUrl}
                                alt={att.file_name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                onError={(e) => {
                                  // Fallback to direct_url or generic icon if stream fails
                                  if (att.direct_url && e.currentTarget.src !== att.direct_url) {
                                    e.currentTarget.src = att.direct_url;
                                  }
                                }}
                              />
                              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                <Eye className="w-3.5 h-3.5 text-white" />
                              </div>
                            </button>
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold">
                              <FileText className="w-5 h-5" />
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 dark:text-slate-100 truncate" title={att.file_name}>
                              {att.file_name}
                            </p>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                              {formatFileSize(att.file_size)} • {att.user?.name || 'Member'} • <span className="font-mono">{att.created_at.substring(0, 10)}</span>
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-1 shrink-0">
                          {isImg && (
                            <button
                              type="button"
                              onClick={() => setPreviewImageUrl(fileUrl)}
                              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                              title="Preview"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={att.file_name}
                            className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors"
                            title="Open / Download"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          {canDelete && (
                            <button
                              type="button"
                              onClick={() => handleDeleteAttachment(att.id, att.file_name)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
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
