import { defineStore } from 'pinia'
import { mockTasks } from '../data/mockData'
import { api } from '../services/api'
import type { Task } from '../types'

const USE_MOCK = true
const storageKey = 'taskflow_tasks'
const load = (): Task[] => {
  const stored = localStorage.getItem(storageKey)
  if (stored) return JSON.parse(stored) as Task[]
  localStorage.setItem(storageKey, JSON.stringify(mockTasks))
  return mockTasks
}

export const useTaskStore = defineStore('tasks', () => {
  const localGetAll = () => load()
  const localGetById = (id: string) => load().find((task) => task.id === id)
  const localCreate = (input: Omit<Task, 'id' | 'createdAt'>) => {
    const task: Task = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() }
    const tasks = load()
    tasks.unshift(task)
    localStorage.setItem(storageKey, JSON.stringify(tasks))
    return task
  }
  const localUpdate = (id: string, updates: Partial<Task>) => {
    const tasks = load().map((task) => task.id === id ? { ...task, ...updates } : task)
    localStorage.setItem(storageKey, JSON.stringify(tasks))
    return tasks.find((task) => task.id === id)
  }
  const localDelete = (id: string) => localStorage.setItem(storageKey, JSON.stringify(load().filter((task) => task.id !== id)))
  async function getAll(): Promise<Task[]> { if (USE_MOCK) return localGetAll(); return (await api.get<Task[]>('/api/v1/tasks')).data }
  async function getById(id: string): Promise<Task | undefined> { if (USE_MOCK) return localGetById(id); return (await api.get<Task>(`/api/v1/tasks/${id}`)).data }
  async function create(input: Omit<Task, 'id' | 'createdAt'>): Promise<Task> { if (USE_MOCK) return localCreate(input); return (await api.post<Task>('/api/v1/tasks', input)).data }
  async function update(id: string, updates: Partial<Task>): Promise<Task | undefined> { if (USE_MOCK) return localUpdate(id, updates); return (await api.post<Task>(`/api/v1/tasks/${id}`, updates)).data }
  async function remove(id: string): Promise<void> { if (USE_MOCK) return localDelete(id); await api.post(`/api/v1/tasks/${id}/delete`, {}) }
  return { getAll, getById, create, update, remove }
})
