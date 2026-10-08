import {
  PMUser,
  PMProject,
  PMTask,
  PMComment,
  PMAttachment,
  PMActivityLog,
  PMNotification,
  PMStatistics,
  DeletedItemsResponse,
  PMVaultItem,
  PMSubtask
} from './pm-types';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_SHOOTSIDE_WP_API_URL ||
  '/api/wp/wp-json/shootside-pm/v1';

// Fallback dataset aligned with real WordPress database accounts
const MOCK_USERS: PMUser[] = [
  {
    id: 1,
    name: 'shootside',
    username: 'shootside',
    email: 'business.udane@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    role: 'ADMIN',
    status: 'active'
  },
  {
    id: 2,
    name: 'sujith',
    username: 'sujith',
    email: 'sujith@shootside.in',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    role: 'MEMBER',
    status: 'active'
  },
  {
    id: 3,
    name: 'Anirudh',
    username: 'anirudh',
    email: 'anirudh.shootside@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    role: 'MEMBER',
    status: 'active'
  },
  {
    id: 4,
    name: 'Karthik',
    username: 'karthik',
    email: 'team.shootside@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150',
    role: 'MEMBER',
    status: 'active'
  }
];

let mockProjects: PMProject[] = [
  {
    id: 101,
    project_name: 'ShootSide Brand Redesign & Motion Graphics',
    client_name: 'ShootSide Media Lab',
    description: 'Complete visual overhaul of marketing creatives, 3D interactive hero assets, and brand guide presentation.',
    start_date: '2026-09-01',
    deadline: '2026-10-15',
    project_manager: MOCK_USERS[0],
    project_manager_id: 1,
    status: 'Active',
    priority: 'High',
    progress: 65,
    created_by: MOCK_USERS[0],
    created_by_id: 1,
    members: [MOCK_USERS[1], MOCK_USERS[2], MOCK_USERS[3]],
    task_stats: { total: 6, completed: 3, in_progress: 2, review: 1, todo: 0, on_hold: 0 },
    created_at: '2026-09-01 10:00:00',
    updated_at: '2026-09-26 11:30:00'
  },
  {
    id: 102,
    project_name: 'E-Commerce Platform Launch (Crizpo)',
    client_name: 'Crizpo International',
    description: 'High performance headless store with Next.js front, instant checkout, and dynamic stock sync.',
    start_date: '2026-09-10',
    deadline: '2026-10-30',
    project_manager: MOCK_USERS[1],
    project_manager_id: 2,
    status: 'Active',
    priority: 'Urgent',
    progress: 40,
    created_by: MOCK_USERS[0],
    created_by_id: 1,
    members: [MOCK_USERS[2], MOCK_USERS[3]],
    task_stats: { total: 5, completed: 1, in_progress: 3, review: 0, todo: 1, on_hold: 0 },
    created_at: '2026-09-10 09:30:00',
    updated_at: '2026-09-25 16:45:00'
  },
  {
    id: 103,
    project_name: 'Corporate Identity & Mentorship Video Series',
    client_name: 'Apex Academy',
    description: '4K cinematography, multi-camera shoot and post-production color grading series.',
    start_date: '2026-08-15',
    deadline: '2026-09-28',
    project_manager: MOCK_USERS[0],
    project_manager_id: 1,
    status: 'Planning',
    priority: 'Medium',
    progress: 85,
    created_by: MOCK_USERS[0],
    created_by_id: 1,
    members: [MOCK_USERS[1]],
    task_stats: { total: 4, completed: 3, in_progress: 1, review: 0, todo: 0, on_hold: 0 },
    created_at: '2026-08-15 14:00:00',
    updated_at: '2026-09-20 12:15:00'
  }
];

let mockTasks: PMTask[] = [
  {
    id: 1001,
    project_id: 101,
    project_name: 'ShootSide Brand Redesign & Motion Graphics',
    client_name: 'ShootSide Media Lab',
    title: 'Design Spline 3D Hero Scene',
    description: 'Implement interactive 3D particle lighting for the primary landing experience.',
    assigned_to: MOCK_USERS[1],
    assigned_to_id: 2,
    created_by: MOCK_USERS[0],
    created_by_id: 1,
    status: 'Completed',
    priority: 'High',
    start_date: '2026-09-02',
    due_date: '2026-09-12',
    estimated_hours: 16,
    actual_hours: 14.5,
    progress: 100,
    comments_count: 3,
    attachments_count: 2,
    created_at: '2026-09-02 10:30:00',
    updated_at: '2026-09-12 18:00:00'
  },
  {
    id: 1002,
    project_id: 101,
    project_name: 'ShootSide Brand Redesign & Motion Graphics',
    client_name: 'ShootSide Media Lab',
    title: 'Mobile Navigation Optimization',
    description: 'Refactor drawer navigation and touch responsiveness on iPhone & Android viewports.',
    assigned_to: MOCK_USERS[3],
    assigned_to_id: 4,
    created_by: MOCK_USERS[1],
    created_by_id: 2,
    status: 'Review',
    priority: 'Urgent',
    start_date: '2026-09-20',
    due_date: '2026-09-27',
    estimated_hours: 8,
    actual_hours: 7.5,
    progress: 90,
    comments_count: 4,
    attachments_count: 1,
    created_at: '2026-09-20 11:00:00',
    updated_at: '2026-09-26 12:45:00'
  },
  {
    id: 1003,
    project_id: 102,
    project_name: 'E-Commerce Platform Launch (Crizpo)',
    client_name: 'Crizpo International',
    title: 'Stripe & UPI Payment Gateway Integration',
    description: 'Setup webhook validation, multi-currency routing and invoice email triggers.',
    assigned_to: MOCK_USERS[2],
    assigned_to_id: 3,
    created_by: MOCK_USERS[0],
    created_by_id: 1,
    status: 'In Progress',
    priority: 'High',
    start_date: '2026-09-21',
    due_date: '2026-09-29',
    estimated_hours: 20,
    actual_hours: 12,
    progress: 60,
    comments_count: 2,
    attachments_count: 0,
    created_at: '2026-09-21 09:00:00',
    updated_at: '2026-09-26 10:15:00'
  },
  {
    id: 1004,
    project_id: 102,
    project_name: 'E-Commerce Platform Launch (Crizpo)',
    client_name: 'Crizpo International',
    title: 'Product Catalog MariaDB Schema Migration',
    description: 'Ensure indexed search for SKU attributes, variant stock, and image galleries.',
    assigned_to: MOCK_USERS[2],
    assigned_to_id: 3,
    created_by: MOCK_USERS[0],
    created_by_id: 1,
    status: 'To Do',
    priority: 'Medium',
    start_date: '2026-09-28',
    due_date: '2026-10-05',
    estimated_hours: 12,
    actual_hours: 0,
    progress: 0,
    comments_count: 0,
    attachments_count: 0,
    created_at: '2026-09-22 14:00:00',
    updated_at: '2026-09-22 14:00:00'
  },
  {
    id: 1005,
    project_id: 103,
    project_name: 'Corporate Identity & Mentorship Video Series',
    client_name: 'Apex Academy',
    title: 'Color Grading & Audio Master Finalization',
    description: 'Export Davinci Resolve timelines in ProRes 4444 with Dolby 5.1 spatial sound.',
    assigned_to: MOCK_USERS[1],
    assigned_to_id: 2,
    created_by: MOCK_USERS[0],
    created_by_id: 1,
    status: 'In Progress',
    priority: 'High',
    start_date: '2026-09-24',
    due_date: '2026-09-28',
    estimated_hours: 10,
    actual_hours: 6,
    progress: 70,
    comments_count: 1,
    attachments_count: 3,
    created_at: '2026-09-24 10:00:00',
    updated_at: '2026-09-26 09:30:00'
  }
];

let mockComments: Record<number, PMComment[]> = {
  1002: [
    {
      id: 1,
      task_id: 1002,
      user: MOCK_USERS[1],
      user_id: 2,
      comment: 'Please update the hero section on smaller screens as well.',
      created_at: '2026-09-24 10:15:00',
      updated_at: '2026-09-24 10:15:00'
    },
    {
      id: 2,
      task_id: 1002,
      user: MOCK_USERS[2],
      user_id: 3,
      comment: 'Started working on this. Tested across Chrome & Safari.',
      created_at: '2026-09-24 11:30:00',
      updated_at: '2026-09-24 11:30:00'
    }
  ]
};

let mockActivities: PMActivityLog[] = [
  {
    id: 1,
    user_id: 2,
    user_name: 'Sujith K.',
    user_role: 'MEMBER',
    entity_type: 'task',
    entity_id: 1002,
    action: 'created',
    old_value: null,
    new_value: 'Mobile Navigation Optimization',
    created_at: '2026-09-20 11:00:00'
  },
  {
    id: 2,
    user_id: 2,
    user_name: 'Sujith K.',
    user_role: 'MEMBER',
    entity_type: 'task',
    entity_id: 1002,
    action: 'assigned',
    old_value: null,
    new_value: 'Rahul Sharma',
    created_at: '2026-09-20 11:05:00'
  },
  {
    id: 3,
    user_id: 4,
    user_name: 'Rahul Sharma',
    user_role: 'MEMBER',
    entity_type: 'task',
    entity_id: 1002,
    action: 'status_changed',
    old_value: 'To Do',
    new_value: 'In Progress',
    created_at: '2026-09-22 09:30:00'
  }
];

let mockNotifications: PMNotification[] = [
  {
    id: 1,
    user_id: 2,
    type: 'task_assigned',
    title: 'New Task Assigned',
    message: 'Admin ShootSide assigned you to Color Grading & Audio Master Finalization.',
    entity_type: 'task',
    entity_id: 1005,
    is_read: 0,
    created_at: '2026-09-24 10:00:00'
  }
];

class PMClient {
  private token: string | null = null;
  private isLiveActive: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('shootside_pm_token');
    }
  }

  public getApiBaseUrl(): string {
    return API_BASE_URL;
  }

  public isLive(): boolean {
    return this.isLiveActive;
  }

  public setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('shootside_pm_token', token);
      } else {
        localStorage.removeItem('shootside_pm_token');
      }
    }
  }

  public getToken(): string | null {
    return this.token;
  }

  private inFlight = new Map<string, Promise<any>>();

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<{ success: boolean; data?: T; message?: string }> {
    const method = (options.method || 'GET').toUpperCase();
    const isGet = method === 'GET';
    const cacheKey = isGet ? `${endpoint}:${this.token || ''}` : null;

    if (cacheKey && this.inFlight.has(cacheKey)) {
      return this.inFlight.get(cacheKey)!;
    }

    const exec = (async () => {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>)
      };

      if (this.token) {
        headers['Authorization'] = `Bearer ${this.token}`;
      }

      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          ...options,
          headers
        });

        const json = await response.json().catch(() => null);

        if (!response.ok) {
          this.isLiveActive = true;
          return {
            success: false,
            data: undefined,
            message: (json && json.message) || `Error ${response.status}: ${response.statusText}`
          };
        }

        this.isLiveActive = true;
        return json || { success: true };
      } catch (err: any) {
        this.isLiveActive = false;
        console.warn(`[ShootSide PM] Real API fetch to ${endpoint} (${err.message}).`);
        
        // Never bypass authentication on network or server errors
        if (endpoint.startsWith('/auth')) {
          return {
            success: false,
            message: 'Unable to connect to WordPress server. Please check your connection and try again.'
          };
        }

        return this.handleMockFallback<T>(endpoint, options);
      } finally {
        if (cacheKey) {
          this.inFlight.delete(cacheKey);
        }
      }
    })();

    if (cacheKey) {
      this.inFlight.set(cacheKey, exec);
    }

    return exec;
  }

  private async handleMockFallback<T>(endpoint: string, options: RequestInit): Promise<{ success: boolean; data?: T; message?: string }> {
    const method = options.method || 'GET';

    if (endpoint === '/auth/login' && method === 'POST') {
      return {
        success: false,
        message: 'Invalid credentials. Access denied.'
      };
    }

    if (endpoint === '/auth/me') {
      return { success: false, message: 'Session expired.' };
    }

    if (endpoint === '/users') {
      return { success: true, data: MOCK_USERS as any };
    }

    if (endpoint.startsWith('/projects') && method === 'GET') {
      return { success: true, data: mockProjects as any };
    }

    if (endpoint.startsWith('/tasks') && method === 'GET') {
      return { success: true, data: mockTasks as any };
    }

    if (endpoint === '/admin/activity') {
      return { success: true, data: mockActivities as any };
    }

    if (endpoint === '/admin/deleted-items') {
      return {
        success: true,
        data: { projects: [], tasks: [] } as any
      };
    }

    if (endpoint === '/notifications') {
      return {
        success: true,
        data: { items: mockNotifications, unread_count: mockNotifications.filter(n => !n.is_read).length } as any
      };
    }

    if (endpoint.match(/\/tasks\/\d+\/merge/) && method === 'POST') {
      const match = endpoint.match(/\/tasks\/(\d+)\/merge/);
      const primaryId = match ? Number(match[1]) : 0;
      const body = options.body ? JSON.parse(options.body as string) : {};
      const childIds: number[] = body.child_task_ids || (body.child_task_id ? [body.child_task_id] : []);
      
      const primaryTask = mockTasks.find(t => t.id === primaryId);
      if (primaryTask) {
        mockTasks = mockTasks.map(t => {
          if (childIds.includes(t.id)) {
            return {
              ...t,
              parent_task_id: primaryId,
              parent_task_title: primaryTask.title,
              parent_task: {
                id: primaryTask.id,
                title: primaryTask.title,
                status: primaryTask.status,
                priority: primaryTask.priority
              },
              status: body.close_child_tasks ? 'Completed' : t.status
            };
          }
          return t;
        });

        const children = mockTasks.filter(t => t.parent_task_id === primaryId);
        const updatedPrimary: PMTask = {
          ...primaryTask,
          child_tasks: children,
          child_tasks_count: children.length
        };
        mockTasks = mockTasks.map(t => t.id === primaryId ? updatedPrimary : t);
        return { success: true, data: updatedPrimary as any, message: 'Task(s) merged successfully' };
      }
    }

    if (endpoint.match(/\/tasks\/\d+\/unmerge/) && method === 'POST') {
      const match = endpoint.match(/\/tasks\/(\d+)\/unmerge/);
      const taskId = match ? Number(match[1]) : 0;
      const task = mockTasks.find(t => t.id === taskId);
      if (task) {
        const oldParentId = task.parent_task_id;
        const updatedTask: PMTask = {
          ...task,
          parent_task_id: null,
          parent_task: null,
          parent_task_title: null
        };
        mockTasks = mockTasks.map(t => t.id === taskId ? updatedTask : t);
        if (oldParentId) {
          const remainingChildren = mockTasks.filter(t => t.parent_task_id === oldParentId);
          mockTasks = mockTasks.map(t => t.id === oldParentId ? {
            ...t,
            child_tasks: remainingChildren,
            child_tasks_count: remainingChildren.length
          } : t);
        }
        return { success: true, data: updatedTask as any, message: 'Task unmerged successfully' };
      }
    }

    if (endpoint === '/admin/statistics') {
      return {
        success: true,
        data: {
          projects: { total: mockProjects.length, active: 2, completed: 1 },
          tasks: {
            total: mockTasks.length,
            todo: 1,
            in_progress: 2,
            review: 1,
            completed: 1,
            overdue: 0,
            due_today: 0,
            due_week: 3,
            my_tasks: 2
          }
        } as any
      };
    }

    return { success: true, data: {} as any };
  }

  // --- Real REST API Methods ---
  public async login(username: string, password: string) {
    const res = await this.request<{ token: string; user: PMUser }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
    if (res.success && res.data?.token) {
      this.setToken(res.data.token);
    }
    return res;
  }

  public async getMe() {
    return this.request<PMUser>('/auth/me');
  }

  public async logout() {
    await this.request('/auth/logout', { method: 'POST' });
    this.setToken(null);
  }

  public async updateProfile(data: { name?: string; email?: string; password?: string; avatar?: string }) {
    return this.request<PMUser>('/auth/profile', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  public async getUsers() {
    return this.request<PMUser[]>('/users');
  }

  public async getProjects(params?: { status?: string; priority?: string; search?: string }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request<PMProject[]>(`/projects${query ? `?${query}` : ''}`);
  }

  public async getProject(id: number) {
    return this.request<PMProject>(`/projects/${id}`);
  }

  public async createProject(data: Partial<PMProject>) {
    return this.request<PMProject>('/projects', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  public async updateProject(id: number, data: Partial<PMProject>) {
    return this.request<PMProject>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  public async deleteProject(id: number) {
    return this.request(`/projects/${id}`, { method: 'DELETE' });
  }

  public async getTasks(params?: { project_id?: number; assigned_to?: number; status?: string; priority?: string; search?: string }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request<PMTask[]>(`/tasks${query ? `?${query}` : ''}`);
  }

  public async getTask(id: number) {
    return this.request<PMTask>(`/tasks/${id}`);
  }

  public async createTask(data: Partial<PMTask>) {
    const payload: any = { ...data };
    if (data.assigned_to_id !== undefined && payload.assigned_to === undefined) {
      payload.assigned_to = Number(data.assigned_to_id);
    }
    return this.request<PMTask>('/tasks', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }

  public async updateTask(id: number, data: Partial<PMTask>) {
    const payload: any = { ...data };
    if (data.assigned_to_id !== undefined && payload.assigned_to === undefined) {
      payload.assigned_to = Number(data.assigned_to_id);
    }
    return this.request<PMTask>(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload)
    });
  }

  public async deleteTask(id: number) {
    return this.request(`/tasks/${id}`, { method: 'DELETE' });
  }

  public async mergeTasks(primaryTaskId: number, childTaskIds: number[], options?: { closeChildTasks?: boolean }) {
    return this.request<PMTask>(`/tasks/${primaryTaskId}/merge`, {
      method: 'POST',
      body: JSON.stringify({
        child_task_ids: childTaskIds,
        close_child_tasks: options?.closeChildTasks ?? false
      })
    });
  }

  public async unmergeTask(childTaskId: number) {
    return this.request<PMTask>(`/tasks/${childTaskId}/unmerge`, {
      method: 'POST'
    });
  }

  public async getTaskComments(taskId: number) {
    return this.request<PMComment[]>(`/tasks/${taskId}/comments`);
  }

  public async addTaskComment(taskId: number, comment: string) {
    return this.request<PMComment>(`/tasks/${taskId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment })
    });
  }

  public async deleteTaskComment(taskId: number, commentId: number) {
    return this.request<{ success: boolean }>(`/tasks/${taskId}/comments/${commentId}`, {
      method: 'DELETE'
    });
  }

  public async deleteComment(commentId: number) {
    return this.request<{ success: boolean }>(`/comments/${commentId}`, {
      method: 'DELETE'
    });
  }

  public async getTaskAttachments(taskId: number) {
    return this.request<PMAttachment[]>(`/tasks/${taskId}/attachments`);
  }

  public async uploadTaskAttachment(taskId: number, data: { file_name: string; file_type: string; file_base64: string }) {
    return this.request<PMAttachment>(`/tasks/${taskId}/attachments`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  public async deleteTaskAttachment(taskId: number, attachmentId: number) {
    return this.request<{ success: boolean }>(`/tasks/${taskId}/attachments/${attachmentId}`, {
      method: 'DELETE'
    });
  }

  // ================= SUBTASKS =================
  public async getTaskSubtasks(taskId: number) {
    return this.request<PMSubtask[]>(`/tasks/${taskId}/subtasks`);
  }

  public async createTaskSubtask(taskId: number, data: Partial<PMSubtask>) {
    return this.request<PMSubtask>(`/tasks/${taskId}/subtasks`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  public async updateSubtask(subtaskId: number, data: Partial<PMSubtask>) {
    return this.request<PMSubtask>(`/subtasks/${subtaskId}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  public async deleteSubtask(subtaskId: number) {
    return this.request<{ success: boolean }>(`/subtasks/${subtaskId}`, {
      method: 'DELETE'
    });
  }

  public async getTaskActivity(taskId: number) {
    return this.request<PMActivityLog[]>(`/tasks/${taskId}/activity`);
  }

  public async getNotifications() {
    return this.request<{ items: PMNotification[]; unread_count: number }>('/notifications');
  }

  public async markNotificationRead(id: number) {
    return this.request(`/notifications/${id}/read`, { method: 'POST' });
  }

  public async markAllNotificationsRead() {
    return this.request('/notifications/read-all', { method: 'POST' });
  }

  public async getAdminActivity(params?: { entity_type?: string; user_id?: number; action?: string; date_from?: string; date_to?: string }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request<PMActivityLog[]>(`/admin/activity${query ? `?${query}` : ''}`);
  }

  public async getDeletedItems() {
    return this.request<DeletedItemsResponse>('/admin/deleted-items');
  }

  public async restoreItem(type: 'project' | 'task', id: number) {
    return this.request(`/admin/deleted-items/${type}/${id}/restore`, { method: 'POST' });
  }

  public async getStatistics() {
    return this.request<PMStatistics>('/admin/statistics');
  }

  // ================= COMPANY VAULT / CREDENTIALS STORE =================
  public async getVaultItems(params?: { category?: string; search?: string }) {
    const query = new URLSearchParams(params as any).toString();
    return this.request<PMVaultItem[]>(`/vault${query ? `?${query}` : ''}`);
  }

  public async getVaultItem(id: number) {
    return this.request<PMVaultItem>(`/vault/${id}`);
  }

  public async createVaultItem(data: Partial<PMVaultItem>) {
    return this.request<PMVaultItem>('/vault', {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  public async updateVaultItem(id: number, data: Partial<PMVaultItem>) {
    return this.request<PMVaultItem>(`/vault/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  public async deleteVaultItem(id: number) {
    return this.request<{ success: boolean }>(`/vault/${id}`, {
      method: 'DELETE'
    });
  }

  // ================= SUBTASKS & SUBTASK COMMENTS =================
  public async createSubtask(taskId: number, data: Partial<PMSubtask>) {
    return this.request<PMSubtask>(`/tasks/${taskId}/subtasks`, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  public async getSubtaskComments(subtaskId: number) {
    return this.request<PMComment[]>(`/subtasks/${subtaskId}/comments`);
  }

  public async addSubtaskComment(subtaskId: number, comment: string) {
    return this.request<PMComment>(`/subtasks/${subtaskId}/comments`, {
      method: 'POST',
      body: JSON.stringify({ comment })
    });
  }
}

export const pmApi = new PMClient();
