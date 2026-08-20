<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { mockNotifications } from '../data/mockData'
import type { Notification } from '../types'
const router = useRouter(); const notifications = ref<Notification[]>([]); const loading = ref(true)
onMounted(() => { setTimeout(() => { notifications.value = mockNotifications; loading.value = false }, 300) })
function open(notification: Notification) { notification.read = true; router.push(notification.type === 'project' ? `/projects/${notification.targetId}` : `/tasks/${notification.targetId}`) }
function markAll() { notifications.value.forEach((notification) => { notification.read = true }) }
</script><template><div><div class="flex items-center justify-between"><div><h1 class="text-3xl font-bold">Notifications</h1><p class="mt-2 text-sm text-secondary">Keep up with what’s changing across your work.</p></div><button @click="markAll" class="text-sm font-semibold text-primary">Mark all as read</button></div><div v-if="loading" class="mt-7 space-y-3"><div v-for="item in 3" :key="item" class="h-20 animate-pulse rounded-panel bg-slate-200" /></div><div v-else-if="!notifications.length" class="mt-7 rounded-panel bg-surface p-12 text-center">You’re all caught up.</div><div v-else class="mt-7 overflow-hidden rounded-panel border border-border bg-surface"><button v-for="notification in notifications" :key="notification.id" @click="open(notification)" :class="!notification.read ? 'bg-primary-soft/40' : ''" class="flex w-full gap-4 border-b border-border p-5 text-left last:border-0 hover:bg-surface-muted"><span class="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" :class="notification.read ? 'bg-border' : 'bg-primary'" /><div><p class="font-semibold">{{ notification.title }}</p><p class="mt-1 text-sm text-secondary">{{ notification.message }}</p><p class="mt-2 text-xs text-muted">{{ notification.createdAt }}</p></div></button></div></div></template>
