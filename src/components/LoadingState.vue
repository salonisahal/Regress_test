<script setup lang="ts">
withDefaults(
  defineProps<{
    label?: string
    rows?: number
  }>(),
  {
    label: 'Loading content',
    rows: 3,
  },
)
</script>

<template>
  <div
    class="rounded-panel border border-border bg-surface p-5"
    role="status"
    :aria-label="label"
  >
    <div class="flex items-center gap-3 text-sm font-medium text-secondary">
      <span
        class="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent"
        aria-hidden="true"
      />
      {{ label }}
    </div>
    <div class="mt-5 space-y-3" aria-hidden="true">
      <div
        v-for="row in rows"
        :key="row"
        class="h-4 animate-pulse rounded bg-slate-200"
        :class="row === rows ? 'w-2/3' : 'w-full'"
      />
    </div>
  </div>
</template>
