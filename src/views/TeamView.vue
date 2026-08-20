<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import EmptyState from '../components/EmptyState.vue'
import LoadingState from '../components/LoadingState.vue'
import { demoUsers } from '../data/mockData'

const query = ref('')
const inviteOpen = ref(false)
const invite = reactive({ name: '', email: '' })
const sent = ref(false)
const loading = ref(true)
const visible = computed(() => demoUsers.filter((user) => user.name.toLowerCase().includes(query.value.toLowerCase())))

onMounted(() => {
  window.setTimeout(() => { loading.value = false }, 200)
})

function sendInvite() { if (!invite.name || !invite.email.includes('@')) return; sent.value = true; setTimeout(() => { inviteOpen.value = false; sent.value = false; invite.name = ''; invite.email = '' }, 700) }
</script><template><div><div class="flex flex-wrap justify-between gap-4"><div><h1 class="text-3xl font-bold">Team members</h1><p class="mt-2 text-sm text-secondary">People collaborating across your workspace.</p></div><button @click="inviteOpen = true" class="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white">Invite member</button></div><input v-model="query" placeholder="Search people..." class="mt-7 w-full max-w-sm rounded-lg border border-border bg-surface px-3 py-2.5 text-sm" /><LoadingState v-if="loading" class="mt-6" label="Loading team members" /><EmptyState v-else-if="!visible.length" class="mt-6" title="No team members found" description="Try a different search term to find a teammate." /><div v-else class="mt-6 overflow-hidden rounded-panel border border-border bg-surface"><div v-for="user in visible" :key="user.id" class="flex items-center justify-between border-b border-border p-5 last:border-0"><div class="flex items-center gap-3"><span :class="user.color" class="grid h-10 w-10 place-items-center rounded-full text-xs font-bold text-white">{{ user.initials }}</span><div><p class="font-semibold">{{ user.name }}</p><p class="text-sm text-secondary">{{ user.email }}</p></div></div><span class="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-semibold capitalize text-primary">{{ user.role }}</span></div></div><div v-if="inviteOpen" class="fixed inset-0 z-20 grid place-items-center bg-slate-950/50 p-5"><form class="w-full max-w-md rounded-panel bg-surface p-6" @submit.prevent="sendInvite"><h2 class="text-xl font-bold">Invite a teammate</h2><label class="mt-5 block text-sm font-medium">Name<input v-model="invite.name" class="mt-2 w-full rounded-lg border border-border px-3 py-2.5" /></label><label class="mt-4 block text-sm font-medium">Email<input v-model="invite.email" type="email" class="mt-2 w-full rounded-lg border border-border px-3 py-2.5" /></label><p v-if="sent" class="mt-4 text-sm text-success">Invitation sent successfully.</p><div class="mt-6 flex justify-end gap-3"><button type="button" @click="inviteOpen = false" class="rounded-lg border border-border px-4 py-2 text-sm font-semibold">Cancel</button><button :disabled="!invite.name || !invite.email.includes('@')" class="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">Send invite</button></div></form></div></div></template>
