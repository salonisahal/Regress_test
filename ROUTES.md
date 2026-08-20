# Test Vue — Routes & Navigation

## How to run
cd /home/ryzen/frontend_generator_backend-test/frontend_runs/run_a0952451_20260820_082827/project
npm install --legacy-peer-deps && npm run dev -- --port 42639 --strictPort
Then open http://localhost:42639

## Routes

| Route | Component file | Description |
|-------|----------------|-------------|
| / | redirect | Redirects to the main dashboard screen |
| /login | src/views/LoginView.vue | Public authentication screen |
| /signup | src/views/SignupView.vue | Public account registration screen |
| /forgot-password | src/views/ForgotPasswordView.vue | Password reset request screen |
| /dashboard | src/views/DashboardView.vue | Workspace KPIs, project health, and activity overview |
| /projects | src/views/ProjectsView.vue | Searchable and filterable project directory |
| /projects/new | src/views/ProjectFormView.vue | Validated project creation form |
| /projects/:id | src/views/ProjectDetailView.vue | Project workspace with board and list task views |
| /projects/:projectId/tasks/new | src/views/TaskFormView.vue | Task creation form scoped to a project |
| /tasks | src/views/TasksView.vue | Searchable task list with status and priority filters |
| /tasks/new | src/views/TaskFormView.vue | Global task creation form |
| /tasks/:id | src/views/TaskDetailView.vue | Task detail, status update, and deletion confirmation |
| /team | src/views/TeamView.vue | Team member directory and invitation modal |
| /notifications | src/views/NotificationsView.vue | Project and task notification feed |
| /settings | src/views/SettingsView.vue | Profile and notification preferences form |
| /:pathMatch(.*)* | src/views/NotFoundView.vue | Public fallback for unknown URLs |

## Navigation map
- Login -> Dashboard (successful authentication form submission)
- Login -> Signup (create an account link)
- Login -> Forgot Password (forgot password link)
- Signup -> Dashboard (successful registration)
- Forgot Password -> Login (back link)
- Dashboard -> Projects (project progress action and sidebar)
- Dashboard -> Project Detail (project progress row)
- Dashboard -> Create Project (New project button)
- Dashboard -> Create Task (Add task button)
- Sidebar -> Dashboard, Projects, Tasks, Team, Notifications, Settings (RouterLink navigation, role-filtered)
- Top bar -> Notifications and Settings (icon/profile controls)
- Projects -> Project Detail (project card)
- Projects -> Create Project (New project button)
- Create Project -> Project Detail (successful persisted creation)
- Project Detail -> Projects (breadcrumb)
- Project Detail -> Create Task (Add task button)
- Project Detail -> Task Detail (board card or list row)
- Tasks -> Create Task (Add task button)
- Tasks -> Task Detail (task row)
- Create Task -> Task Detail (successful persisted creation)
- Task Detail -> Project Detail (project breadcrumb)
- Task Detail -> Project Detail (confirmed deletion)
- Notifications -> Project Detail or Task Detail (notification item)
- Any protected screen -> Login (auth route guard when signed out)
- Any page -> NotFound (unknown URL)

## Shared components
- `src/components/Sidebar.vue` — role-aware primary navigation and logout control.
- `src/components/TopBar.vue` — workspace greeting, notifications shortcut, and profile shortcut.
- `src/layouts/ShellLayout.vue` — responsive application shell wrapping all protected views.

## Design tokens
- `primary`: #4F46E5
- `primary-hover`: #4338CA
- `primary-soft`: #EEF2FF
- `background`: #F8FAFC
- `surface`: #FFFFFF
- `surface-muted`: #F1F5F9
- `border`: #E2E8F0
- `ink`: #0F172A
- `secondary`: #475569
- `muted`: #94A3B8
- `success`: #16A34A
- `warning`: #D97706
- `danger`: #DC2626
- `info`: #0284C7
