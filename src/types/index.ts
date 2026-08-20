export type Role = 'admin' | 'member'
export type ProjectStatus = 'Active' | 'Planning' | 'Complete'
export type TaskStatus = 'To do' | 'In progress' | 'Done'
export type Priority = 'High' | 'Medium' | 'Low'

export interface User {
  id: string
  name: string
  email: string
  password?: string
  role: Role
  initials: string
  color: string
}

export interface Project {
  id: string
  title: string
  description: string
  status: ProjectStatus
  progress: number
  members: string[]
  dueDate: string
  color: string
  createdAt: string
}

export interface Task {
  id: string
  projectId: string
  title: string
  description: string
  status: TaskStatus
  priority: Priority
  assigneeId: string
  dueDate: string
  createdAt: string
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'project' | 'task'
  targetId: string
  read: boolean
  createdAt: string
}
