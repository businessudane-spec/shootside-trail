'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  PMProject,
  PMTask,
  PMUser,
  PMActivityLog,
  PMNotification,
  PMStatistics,
  DeletedItemsResponse,
  PMComment,
  PMAttachment
} from './pm-types';
import { pmApi } from './pm-api';
import { usePMAuth } from './pm-auth-context';

interface PMDataContextType {
  projects: PMProject[];
  tasks: PMTask[];
  users: PMUser[];
  notifications: PMNotification[];
  unreadNotificationsCount: number;
  activityLogs: PMActivityLog[];
  deletedItems: DeletedItemsResponse;
  statistics: PMStatistics | null;
  isLoading: boolean;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedStatus: string;
  setSelectedStatus: (s: string) => void;
  selectedPriority: string;
  setSelectedPriority: (p: string) => void;
  selectedProjectId: number | null;
  setSelectedProjectId: (id: number | null) => void;
  selectedMemberId: number | null;
  setSelectedMemberId: (id: number | null) => void;
  selectedTask: PMTask | null;
  setSelectedTask: (task: PMTask | null) => void;
  selectedProject: PMProject | null;
  setSelectedProject: (project: PMProject | null) => void;
  refreshAll: () => Promise<void>;
  createProject: (data: Partial<PMProject>) => Promise<{ success: boolean; message?: string }>;
  updateProject: (id: number, data: Partial<PMProject>) => Promise<{ success: boolean; message?: string }>;
  deleteProject: (id: number) => Promise<{ success: boolean; message?: string }>;
  restoreProject: (id: number) => Promise<{ success: boolean; message?: string }>;
  createTask: (data: Partial<PMTask>) => Promise<{ success: boolean; message?: string }>;
  updateTask: (id: number, data: Partial<PMTask>) => Promise<{ success: boolean; message?: string }>;
  deleteTask: (id: number) => Promise<{ success: boolean; message?: string }>;
  restoreTask: (id: number) => Promise<{ success: boolean; message?: string }>;
  addComment: (taskId: number, text: string) => Promise<{ success: boolean; data?: PMComment; message?: string }>;
  markNotificationRead: (id: number) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
}

const PMDataContext = createContext<PMDataContextType | undefined>(undefined);

export const PMDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin } = usePMAuth();

  const [projects, setProjects] = useState<PMProject[]>([]);
  const [tasks, setTasks] = useState<PMTask[]>([]);
  const [users, setUsers] = useState<PMUser[]>([]);
  const [notifications, setNotifications] = useState<PMNotification[]>([]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState<number>(0);
  const [activityLogs, setActivityLogs] = useState<PMActivityLog[]>([]);
  const [deletedItems, setDeletedItems] = useState<DeletedItemsResponse>({ projects: [], tasks: [] });
  const [statistics, setStatistics] = useState<PMStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filters & Selected State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  const [selectedTask, setSelectedTask] = useState<PMTask | null>(null);
  const [selectedProject, setSelectedProject] = useState<PMProject | null>(null);

  const refreshAll = useCallback(async () => {
    if (!user) {
      setProjects([]);
      setTasks([]);
      setUsers([]);
      setNotifications([]);
      setUnreadNotificationsCount(0);
      setActivityLogs([]);
      setDeletedItems({ projects: [], tasks: [] });
      setStatistics(null);
      return;
    }

    setIsLoading(true);
    try {
      const [pRes, tRes, uRes, nRes, aRes, dRes, sRes] = await Promise.all([
        pmApi.getProjects(),
        pmApi.getTasks(),
        pmApi.getUsers(),
        pmApi.getNotifications(),
        isAdmin ? pmApi.getAdminActivity() : Promise.resolve({ success: true, data: [] }),
        isAdmin ? pmApi.getDeletedItems() : Promise.resolve({ success: true, data: { projects: [], tasks: [] } }),
        pmApi.getStatistics()
      ]);

      if (pRes.success && pRes.data) setProjects(pRes.data);
      if (tRes.success && tRes.data) setTasks(tRes.data);
      if (uRes.success && uRes.data) setUsers(uRes.data);
      if (nRes.success && nRes.data) {
        setNotifications(nRes.data.items || []);
        setUnreadNotificationsCount(nRes.data.unread_count || 0);
      }
      if (aRes.success && aRes.data) setActivityLogs(aRes.data as PMActivityLog[]);
      if (dRes.success && dRes.data) setDeletedItems(dRes.data as DeletedItemsResponse);
      if (sRes.success && sRes.data) setStatistics(sRes.data);
    } catch (err) {
      console.error('Error refreshing PM data:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user, isAdmin]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  // Project Actions
  const createProject = async (data: Partial<PMProject>) => {
    if (!isAdmin) {
      return { success: false, message: 'Only Administrators can create projects.' };
    }
    const res = await pmApi.createProject(data);
    if (res.success) {
      await refreshAll();
      return { success: true };
    }
    return { success: false, message: res.message || 'Failed to create project' };
  };

  const updateProject = async (id: number, data: Partial<PMProject>) => {
    if (!isAdmin) {
      return { success: false, message: 'Only Administrators can edit projects.' };
    }
    const res = await pmApi.updateProject(id, data);
    if (res.success) {
      await refreshAll();
      return { success: true };
    }
    return { success: false, message: res.message || 'Failed to update project' };
  };

  const deleteProject = async (id: number) => {
    if (!isAdmin) {
      return { success: false, message: 'Only Administrators can delete projects.' };
    }
    const res = await pmApi.deleteProject(id);
    if (res.success) {
      await refreshAll();
      return { success: true };
    }
    return { success: false, message: res.message || 'Failed to delete project' };
  };

  const restoreProject = async (id: number) => {
    if (!isAdmin) {
      return { success: false, message: 'Only Administrators can restore projects.' };
    }
    const res = await pmApi.restoreItem('project', id);
    if (res.success) {
      await refreshAll();
      return { success: true };
    }
    return { success: false, message: res.message || 'Failed to restore project' };
  };

  // Task Actions
  const createTask = async (data: Partial<PMTask>) => {
    const res = await pmApi.createTask(data);
    if (res.success) {
      await refreshAll();
      return { success: true };
    }
    return { success: false, message: res.message || 'Failed to create task' };
  };

  const updateTask = async (id: number, data: Partial<PMTask>) => {
    const res = await pmApi.updateTask(id, data);
    if (res.success) {
      await refreshAll();
      if (selectedTask?.id === id && res.data) {
        setSelectedTask(res.data);
      }
      return { success: true };
    }
    return { success: false, message: res.message || 'Failed to update task' };
  };

  const deleteTask = async (id: number) => {
    if (!isAdmin) {
      return { success: false, message: 'Only Administrators can delete tasks.' };
    }
    const res = await pmApi.deleteTask(id);
    if (res.success) {
      await refreshAll();
      if (selectedTask?.id === id) {
        setSelectedTask(null);
      }
      return { success: true };
    }
    return { success: false, message: res.message || 'Failed to delete task' };
  };

  const restoreTask = async (id: number) => {
    if (!isAdmin) {
      return { success: false, message: 'Only Administrators can restore tasks.' };
    }
    const res = await pmApi.restoreItem('task', id);
    if (res.success) {
      await refreshAll();
      return { success: true };
    }
    return { success: false, message: res.message || 'Failed to restore task' };
  };

  const addComment = async (taskId: number, text: string) => {
    const res = await pmApi.addTaskComment(taskId, text);
    if (res.success) {
      await refreshAll();
      return { success: true, data: res.data };
    }
    return { success: false, message: res.message || 'Failed to post comment' };
  };

  const markNotificationRead = async (id: number) => {
    await pmApi.markNotificationRead(id);
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, is_read: 1 } : n));
    setUnreadNotificationsCount(prev => Math.max(0, prev - 1));
  };

  const markAllNotificationsRead = async () => {
    await pmApi.markAllNotificationsRead();
    setNotifications(prev => prev.map(n => ({ ...n, is_read: 1 })));
    setUnreadNotificationsCount(0);
  };

  return (
    <PMDataContext.Provider
      value={{
        projects,
        tasks,
        users,
        notifications,
        unreadNotificationsCount,
        activityLogs,
        deletedItems,
        statistics,
        isLoading,
        searchQuery,
        setSearchQuery,
        selectedStatus,
        setSelectedStatus,
        selectedPriority,
        setSelectedPriority,
        selectedProjectId,
        setSelectedProjectId,
        selectedMemberId,
        setSelectedMemberId,
        selectedTask,
        setSelectedTask,
        selectedProject,
        setSelectedProject,
        refreshAll,
        createProject,
        updateProject,
        deleteProject,
        restoreProject,
        createTask,
        updateTask,
        deleteTask,
        restoreTask,
        addComment,
        markNotificationRead,
        markAllNotificationsRead
      }}
    >
      {children}
    </PMDataContext.Provider>
  );
};

export const usePMData = () => {
  const context = useContext(PMDataContext);
  if (!context) {
    throw new Error('usePMData must be used within a PMDataProvider');
  }
  return context;
};
