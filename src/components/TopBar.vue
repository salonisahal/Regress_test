<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
const router = useRouter()
const auth = useAuthStore()
</script>

<template>
  <header class="flex h-20 items-center justify-between border-b border-border bg-surface px-5 sm:px-8">
    <RouterLink to="/dashboard" class="flex items-center gap-2 lg:hidden"><span class="grid h-8 w-8 place-items-center rounded-lg bg-primary font-bold text-white">T</span><span class="font-bold">Taskflow</span></RouterLink>
    <div class="hidden lg:block"><p class="text-sm text-muted">Tuesday, June 16</p><p class="font-semibold text-ink">Good morning, {{ auth.currentUser?.name?.split(' ')[0] ?? 'there' }}</p></div>
    <div class="flex items-center gap-3">
      <button @click="router.push('/notifications')" aria-label="Notifications" class="relative grid h-10 w-10 place-items-center rounded-full text-secondary hover:bg-surface-muted"><svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5m6 0a3 3 0 0 1-6 0" /></svg><span class="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger" /></button>
      <button @click="router.push('/settings')" class="flex items-center gap-2 rounded-full border border-border py-1 pl-1 pr-3 hover:bg-surface-muted"><span class="grid h-8 w-8 place-items-center rounded-full bg-violet-100 text-xs font-bold text-primary">{{ auth.currentUser?.name?.split(' ').map((part) => part[0]).join('') }}</span><span class="hidden text-sm font-medium sm:block">{{ auth.currentUser?.name }}</span></button>
    </div>
  </header>
</template>
