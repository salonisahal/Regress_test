import type { Notification, Project, Task, User } from '../types'

export const demoUsers: User[] = [
  { id: 'u1', name: 'Alex Morgan', email: 'admin@taskflow.dev', password: 'password123', role: 'admin', initials: 'AM', color: 'bg-violet-500' },
  { id: 'u2', name: 'Maya Patel', email: 'maya@taskflow.dev', password: 'password123', role: 'member', initials: 'MP', color: 'bg-rose-500' },
  { id: 'u3', name: 'Jordan Lee', email: 'jordan@taskflow.dev', password: 'password123', role: 'member', initials: 'JL', color: 'bg-sky-500' },
  { id: 'u4', name: 'Sam Wilson', email: 'sam@taskflow.dev', password: 'password123', role: 'member', initials: 'SW', color: 'bg-emerald-500' },
]

export const mockProjects: Project[] = [
  { id: 'p1', title: 'Website Redesign', description: 'A new marketing site built around a clear story and a fast conversion path.', status: 'Active', progress: 72, members: ['u1', 'u2', 'u3'], dueDate: 'Jun 28, 2026', color: 'bg-violet-500', createdAt: '2026-04-12T10:00:00Z' },
  { id: 'p2', title: 'Mobile App Launch', description: 'Ship the first public version of the mobile companion application.', status: 'Active', progress: 48, members: ['u1', 'u3', 'u4'], dueDate: 'Jul 15, 2026', color: 'bg-sky-500', createdAt: '2026-04-16T10:00:00Z' },
  { id: 'p3', title: 'Growth Experiments', description: 'Validate onboarding and activation experiments for the next quarter.', status: 'Planning', progress: 20, members: ['u2', 'u4'], dueDate: 'Aug 04, 2026', color: 'bg-amber-500', createdAt: '2026-05-02T10:00:00Z' },
  { id: 'p4', title: 'Design System', description: 'Unify product patterns, tokens and accessible reusable components.', status: 'Complete', progress: 100, members: ['u1', 'u2'], dueDate: 'May 18, 2026', color: 'bg-emerald-500', createdAt: '2026-03-20T10:00:00Z' },
]

export const mockTasks: Task[] = [
  { id: 't1', projectId: 'p1', title: 'Finalize landing page copy', description: 'Review the final copy and hand it off for implementation.', status: 'In progress', priority: 'High', assigneeId: 'u2', dueDate: 'Jun 17', createdAt: '2026-06-01T10:00:00Z' },
  { id: 't2', projectId: 'p1', title: 'Build responsive navigation', description: 'Implement desktop and compact mobile navigation states.', status: 'To do', priority: 'Medium', assigneeId: 'u3', dueDate: 'Jun 20', createdAt: '2026-06-02T10:00:00Z' },
  { id: 't3', projectId: 'p1', title: 'QA the checkout flow', description: 'Run a full cross-browser quality check before release.', status: 'Done', priority: 'High', assigneeId: 'u1', dueDate: 'Jun 12', createdAt: '2026-05-30T10:00:00Z' },
  { id: 't4', projectId: 'p2', title: 'Android beta build', description: 'Prepare the beta candidate and release notes.', status: 'In progress', priority: 'High', assigneeId: 'u3', dueDate: 'Jun 22', createdAt: '2026-06-03T10:00:00Z' },
  { id: 't5', projectId: 'p2', title: 'App store screenshots', description: 'Create launch screenshots in the full device set.', status: 'To do', priority: 'Medium', assigneeId: 'u4', dueDate: 'Jun 25', createdAt: '2026-06-04T10:00:00Z' },
  { id: 't6', projectId: 'p3', title: 'Define activation metric', description: 'Align on the one measurable activation event.', status: 'To do', priority: 'Low', assigneeId: 'u2', dueDate: 'Jul 02', createdAt: '2026-06-05T10:00:00Z' },
]

export const mockNotifications: Notification[] = [
  { id: 'n1', title: 'Task assigned to you', message: 'Maya assigned you “Finalize landing page copy”.', type: 'task', targetId: 't1', read: false, createdAt: '12 minutes ago' },
  { id: 'n2', title: 'Project progress updated', message: 'Website Redesign is now 72% complete.', type: 'project', targetId: 'p1', read: false, createdAt: '2 hours ago' },
  { id: 'n3', title: 'Task completed', message: 'Jordan completed “QA the checkout flow”.', type: 'task', targetId: 't3', read: true, createdAt: 'Yesterday' },
]
