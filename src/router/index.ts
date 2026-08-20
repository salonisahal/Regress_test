import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import ShellLayout from '../layouts/ShellLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    { path: '/login', name: 'login', component: () => import('../views/LoginView.vue') },
    { path: '/signup', name: 'signup', component: () => import('../views/SignupView.vue') },
    { path: '/forgot-password', name: 'forgot-password', component: () => import('../views/ForgotPasswordView.vue') },
    { path: '/project/:id', redirect: (to) => `/projects/${String(to.params.id)}` },
    { path: '/task/:id', redirect: (to) => `/tasks/${String(to.params.id)}` },
    {
      path: '/',
      component: ShellLayout,
      meta: { requiresAuth: true },
      children: [
        { path: 'dashboard', name: 'dashboard', component: () => import('../views/DashboardView.vue') },
        { path: 'projects', name: 'projects', component: () => import('../views/ProjectsView.vue') },
        { path: 'projects/new', name: 'project-new', component: () => import('../views/ProjectFormView.vue') },
        { path: 'projects/:id', name: 'project-detail', component: () => import('../views/ProjectDetailView.vue') },
        { path: 'projects/:projectId/tasks/new', name: 'project-task-new', component: () => import('../views/TaskFormView.vue') },
        { path: 'tasks', name: 'tasks', component: () => import('../views/TasksView.vue') },
        { path: 'tasks/new', name: 'task-new', component: () => import('../views/TaskFormView.vue') },
        { path: 'tasks/:id', name: 'task-detail', component: () => import('../views/TaskDetailView.vue') },
        { path: 'team', name: 'team', component: () => import('../views/TeamView.vue') },
        { path: 'notifications', name: 'notifications', component: () => import('../views/NotificationsView.vue') },
        { path: 'settings', name: 'settings', component: () => import('../views/SettingsView.vue') },
      ],
    },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (auth.isAuthenticated && ['login', 'signup', 'forgot-password'].includes(String(to.name))) {
    return { name: 'dashboard' }
  }

  return true
})

export default router
