<script setup lang="ts">
defineProps<{
  title: string
  description: string
  actionLabel?: string
}>()

defineEmits<{
  action: []
}>()
</script>

<template>
  <section class="rounded-panel border border-dashed border-border bg-surface p-10 text-center">
    <svg
      class="mx-auto h-10 w-10 text-muted"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="1.5"
        d="M9 12h6m-3-3v6m8.25-3a8.25 8.25 0 1 1-16.5 0 8.25 8.25 0 0 1 16.5 0Z"
      />
    </svg>
    <h2 class="mt-4 font-bold text-ink">{{ title }}</h2>
    <p class="mt-2 text-sm text-secondary">{{ description }}</p>
    <button
      v-if="actionLabel"
      class="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
      @click="$emit('action')"
    >
      {{ actionLabel }}
    </button>
  </section>
</template>
