<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const form = reactive({ email: 'admin@taskflow.dev', password: 'password123' })
const errors = reactive<Record<string, string>>({})
const touched = reactive<Record<string, boolean>>({})
const message = ref('')
const isValid = computed(() => emailPattern.test(form.email.trim()) && form.password.length >= 6)

function validate() {
  errors.email = !form.email.trim()
    ? 'Email is required.'
    : !emailPattern.test(form.email.trim())
      ? 'Enter a valid work email, such as name@company.com.'
      : ''
  errors.password = !form.password
    ? 'Password is required.'
    : form.password.length < 6
      ? 'Password must contain at least 6 characters.'
      : ''
  return !errors.email && !errors.password
}

function updateField(field: 'email' | 'password') {
  touched[field] = true
  message.value = ''
  validate()
}

async function onSubmit() {
  touched.email = true
  touched.password = true
  if (!validate()) {
    message.value = 'Please correct the highlighted fields to continue.'
    return
  }
  if (!await auth.login(form.email.trim(), form.password)) {
    message.value = 'Invalid email or password. Check your details and try again.'
    return
  }
  const redirectPath = typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/')
    ? route.query.redirect
    : '/dashboard'
  router.push(redirectPath)
}
</script>

<template>
  <div class="grid min-h-screen place-items-center bg-slate-950 p-5">
    <div class="grid w-full max-w-5xl overflow-hidden rounded-panel bg-surface shadow-2xl md:grid-cols-2">
      <section class="hidden bg-primary p-12 text-white md:block">
        <div class="grid h-10 w-10 place-items-center rounded-xl bg-white/20 text-xl font-bold">T</div>
        <h1 class="mt-20 text-4xl font-bold leading-tight">Bring your work into focus.</h1>
        <p class="mt-5 max-w-sm text-indigo-100">Plan projects, keep momentum and deliver every milestone with your team.</p>
        <div class="mt-16 flex items-center gap-3 text-sm text-indigo-100"><span class="h-2 w-2 rounded-full bg-white" /> One place for your team</div>
      </section>
      <section class="p-8 sm:p-12">
        <RouterLink to="/login" class="flex items-center gap-2 text-xl font-bold text-ink md:hidden"><span class="grid h-8 w-8 place-items-center rounded-lg bg-primary text-sm text-white">T</span>Taskflow</RouterLink>
        <h2 class="mt-8 text-2xl font-bold">Welcome back</h2>
        <p class="mt-2 text-sm text-secondary">Sign in to your Taskflow workspace.</p>
        <form class="mt-8 space-y-5" novalidate @submit.prevent="onSubmit">
          <div>
            <label for="login-email" class="block text-sm font-medium">Email</label>
            <input id="login-email" v-model="form.email" type="email" autocomplete="email" aria-describedby="login-email-help login-email-error" :aria-invalid="Boolean(touched.email && errors.email)" class="mt-2 w-full rounded-lg border border-border px-3 py-3 outline-none focus:border-primary" @blur="updateField('email')" @input="updateField('email')" />
            <p id="login-email-help" class="mt-1 text-xs text-muted">Use the email linked to your workspace.</p>
            <p v-if="touched.email && errors.email" id="login-email-error" class="mt-1 text-xs text-danger">{{ errors.email }}</p>
          </div>
          <div>
            <div class="flex items-center justify-between"><label for="login-password" class="text-sm font-medium">Password</label><RouterLink to="/forgot-password" class="text-sm text-primary">Forgot password?</RouterLink></div>
            <input id="login-password" v-model="form.password" type="password" autocomplete="current-password" aria-describedby="login-password-help login-password-error" :aria-invalid="Boolean(touched.password && errors.password)" class="mt-2 w-full rounded-lg border border-border px-3 py-3 outline-none focus:border-primary" @blur="updateField('password')" @input="updateField('password')" />
            <p id="login-password-help" class="mt-1 text-xs text-muted">Passwords are at least 6 characters.</p>
            <p v-if="touched.password && errors.password" id="login-password-error" class="mt-1 text-xs text-danger">{{ errors.password }}</p>
          </div>
          <p v-if="message" class="rounded-lg bg-danger/10 p-3 text-sm text-danger" role="alert">{{ message }}</p>
          <button :disabled="!isValid" class="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">Sign in</button>
        </form>
        <p class="mt-6 text-center text-sm text-secondary">New to Taskflow? <RouterLink to="/signup" class="font-semibold text-primary">Create an account</RouterLink></p>
      </section>
    </div>
  </div>
</template>
