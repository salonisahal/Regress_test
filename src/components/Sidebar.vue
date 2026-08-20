<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const navItems = [
  { label: 'Overview', to: '/dashboard', roles: ['admin', 'member'], icon: 'home' },
  { label: 'Projects', to: '/projects', roles: ['admin', 'member'], icon: 'folder' },
  { label: 'My tasks', to: '/tasks', roles: ['admin', 'member'], icon: 'check' },
  { label: 'Team', to: '/team', roles: ['admin'], icon: 'users' },
]
const secondaryItems = [
  { label: 'Notifications', to: '/notifications', icon: 'bell' },
  { label: 'Settings', to: '/settings', icon: 'cog' },
]
const visibleNavItems = computed(() => navItems.filter((item) => auth.currentRole && item.roles.includes(auth.currentRole)))
function logout() { auth.logout(); router.push('/login') }
</script>

<template>
  <aside class="hidden w-64 shrink-0 flex-col border-r border-border bg-surface px-4 py-6 lg:flex">
    <RouterLink to="/dashboard" class="mb-10 flex items-center gap-3 px-2">
      <span class="grid h-9 w-9 place-items-center rounded-xl bg-primary text-lg font-black text-white">T</span>
      <span class="text-lg font-bold tracking-tight text-ink">Taskflow</span>
    </RouterLink>
    <nav class="space-y-1">
      <template v-for="item in visibleNavItems" :key="item.to">
        <RouterLink :to="item.to" active-class="bg-primary-soft text-primary" class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-secondary transition hover:bg-surface-muted">
          <svg v-if="item.icon === 'home'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z" /></svg>
          <svg v-else-if="item.icon === 'folder'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" /></svg>
          <svg v-else-if="item.icon === 'check'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="m5 12 4 4L19 6" /></svg>
          <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17 20h5V4H2v16h5m10 0v-2a4 4 0 0 0-4-4h-2a4 4 0 0 0-4 4v2m10 0H7m9-12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
          {{ item.label }}
        </RouterLink>
      </template>
    </nav>
    <div class="mt-auto space-y-1 border-t border-border pt-5">
      <RouterLink v-for="item in secondaryItems" :key="item.to" :to="item.to" active-class="bg-primary-soft text-primary" class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-secondary hover:bg-surface-muted">
        <svg v-if="item.icon === 'bell'" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0a3 3 0 0 1-6 0" /></svg>
        <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7-3.5 2-1-2-3-2 .8a7 7 0 0 0-1.7-1L15 5h-3l-.3 2.8a7 7 0 0 0-1.7 1L8 8l-2 3 2 1a7 7 0 0 0 0 2l-2 1 2 3 2.1-.8a7 7 0 0 0 1.6 1L12 21h3l.3-2.8a7 7 0 0 0 1.7-1L19 18l2-3-2-1a7 7 0 0 0 0-2Z" /></svg>
        {{ item.label }}
      </RouterLink>
      <button @click="logout" class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-secondary hover:bg-danger/10 hover:text-danger"><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10 17l5-5-5-5m5 5H3m9-9h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6" /></svg>Log out</button>
    </div>
  </aside>
</template>
