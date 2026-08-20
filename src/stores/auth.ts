import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { demoUsers } from '../data/mockData'
import { api } from '../services/api'
import type { User } from '../types'

const USE_MOCK = true

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('auth_token'))
  const getUsers = (): User[] => [...demoUsers, ...JSON.parse(localStorage.getItem('app_users') ?? '[]')]
  const currentUser = computed(() => token.value ? JSON.parse(token.value) as Pick<User, 'email' | 'name' | 'role'> : null)
  const currentRole = computed(() => currentUser.value?.role ?? null)
  const isAuthenticated = computed(() => Boolean(token.value))

  function localLogin(email: string, password: string) {
    const user = getUsers().find((entry) => entry.email.toLowerCase() === email.toLowerCase() && entry.password === password)
    if (!user) return false
    token.value = JSON.stringify({ email: user.email, name: user.name, role: user.role })
    localStorage.setItem('auth_token', token.value)
    return true
  }

  function localSignup(name: string, email: string, password: string) {
    if (getUsers().some((entry) => entry.email.toLowerCase() === email.toLowerCase())) return null
    const user: User = { id: crypto.randomUUID(), name, email, password, role: 'member', initials: name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(), color: 'bg-indigo-500' }
    const users = JSON.parse(localStorage.getItem('app_users') ?? '[]')
    users.push(user)
    localStorage.setItem('app_users', JSON.stringify(users))
    token.value = JSON.stringify({ email: user.email, name: user.name, role: user.role })
    localStorage.setItem('auth_token', token.value)
    return user
  }

  async function login(email: string, password: string) {
    if (USE_MOCK) return localLogin(email, password)
    const response = await api.post<{ email: string; name: string; role: 'member' | 'admin' }>('/api/v1/auth/login', { email, password })
    token.value = JSON.stringify(response.data)
    localStorage.setItem('auth_token', token.value)
    return true
  }

  async function signup(name: string, email: string, password: string) {
    if (USE_MOCK) return localSignup(name, email, password)
    const response = await api.post<User>('/api/v1/auth/signup', { name, email, password })
    token.value = JSON.stringify(response.data)
    localStorage.setItem('auth_token', token.value)
    return response.data
  }

  function logout() {
    token.value = null
    localStorage.removeItem('auth_token')
  }

  return { login, signup, logout, isAuthenticated, currentUser, currentRole }
})
