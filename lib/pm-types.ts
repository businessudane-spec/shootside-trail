export type UserRole = 'ADMIN' | 'MEMBER';

export interface PMUser {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
  role: UserRole;
  registered_at?: string;
  status: 'active' | 'inactive';
}

export type ProjectStatus = 'Planning' | 'Active' | 'On Hold' | 'Completed';
export type PriorityLevel = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface ProjectTaskStats {
  total: number;
  completed: number;
  in_progress: number;
  review: number;
  todo: number;
  on_hold: number;
}

export interface PMProject {
  id: number;
  project_name: string;
  client_name: string;
  description: string;
  start_date: string | null;
  deadline: string | null;
  project_manager: PMUser | null;
  project_manager_id: number;
  status: ProjectStatus;
  priority: PriorityLevel;
  progress: number;
  created_by: PMUser | null;
  created_by_id: number;
  members: PMUser[];
  task_stats: ProjectTaskStats;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export type TaskStatus = 'To Do' | 'In Progress' | 'Review' | 'Completed' | 'On Hold';

export function normalizeTaskStatus(status?: string | null): TaskStatus {
  if (!status) return 'To Do';
  const s = status.trim().toLowerCase().replace(/[-_]/g, ' ');
  if (s === 'in progress' || s === 'inprogress') return 'In Progress';
  if (s === 'to do' || s === 'todo') return 'To Do';
  if (s === 'review' || s === 'in review' || s === 'inreview') return 'Review';
  if (s === 'completed' || s === 'complete' || s === 'done') return 'Completed';
  if (s === 'on hold' || s === 'onhold') return 'On Hold';
  return 'To Do';
}

export function normalizePriority(priority?: string | null): PriorityLevel {
  if (!priority) return 'Medium';
  const p = priority.trim().toLowerCase();
  if (p === 'urgent') return 'Urgent';
  if (p === 'high') return 'High';
  if (p === 'low') return 'Low';
  return 'Medium';
}

export interface PMTask {
  id: number;
  project_id: number;
  project_name: string;
  client_name: string;
  title: string;
  description: string;
  assigned_to: PMUser | null;
  assigned_to_id: number;
  created_by: PMUser | null;
  created_by_id: number;
  status: TaskStatus;
  priority: PriorityLevel;
  start_date: string | null;
  due_date: string | null;
  estimated_hours: number;
  actual_hours: number;
  progress: number;
  parent_task_id?: number | null;
  parent_task?: {
    id: number;
    title: string;
    status: TaskStatus;
    priority: PriorityLevel;
  } | null;
  parent_task_title?: string | null;
  child_tasks?: PMTask[];
  child_tasks_count?: number;
  comments_count: number;
  attachments_count: number;
  subtasks_count?: number;
  subtasks_completed_count?: number;
  subtasks?: PMSubtask[];
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export interface PMSubtask {
  id: number;
  task_id: number;
  title: string;
  assigned_to_id?: number | null;
  assigned_to?: PMUser | number | null;
  status: 'todo' | 'in_progress' | 'completed';
  due_date?: string | null;
  comments_count?: number;
  created_by?: number | PMUser | null;
  user?: PMUser | null;
  created_at?: string;
  updated_at?: string;
}

export interface PMComment {
  id: number;
  task_id: number;
  subtask_id?: number;
  user: PMUser | null;
  user_id: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

export interface PMAttachment {
  id: number;
  project_id: number;
  task_id: number;
  user: PMUser | null;
  user_id: number;
  file_url: string;
  stream_url?: string;
  direct_url?: string;
  file_name: string;
  file_type: string;
  file_size: number;
  created_at: string;
}

export interface PMActivityLog {
  id: number;
  user_id: number;
  user_name: string;
  user_avatar?: string;
  user_role?: string;
  entity_type: 'project' | 'task' | 'comment' | 'auth' | string;
  entity_id: number;
  action: string;
  old_value: string | null;
  new_value: string | null;
  metadata?: string | null;
  created_at: string;
}

export interface PMNotification {
  id: number;
  user_id: number;
  type: string;
  title: string;
  message: string;
  entity_type: string;
  entity_id: number;
  is_read: number;
  created_at: string;
}

export interface PMStatistics {
  projects: {
    total: number;
    active: number;
    completed: number;
  };
  tasks: {
    total: number;
    todo: number;
    in_progress: number;
    review: number;
    completed: number;
    overdue: number;
    due_today: number;
    due_week: number;
    my_tasks: number;
  };
}

export interface DeletedItemsResponse {
  projects: PMProject[];
  tasks: PMTask[];
}

export interface PMVaultItem {
  id: number;
  title: string;
  category: string;
  service_url?: string;
  username: string;
  password: string;
  notes?: string;
  created_by: number;
  user?: PMUser;
  updated_by?: number;
  updater?: PMUser;
  created_at: string;
  updated_at: string;
}

