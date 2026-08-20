import { defineStore } from 'pinia'
import { mockProjects } from '../data/mockData'
import { api } from '../services/api'
import type { Project } from '../types'

const USE_MOCK = true
const storageKey = 'taskflow_projects'
const load = (): Project[] => {
  const stored = localStorage.getItem(storageKey)
  if (stored) return JSON.parse(stored) as Project[]
  localStorage.setItem(storageKey, JSON.stringify(mockProjects))
  return mockProjects
}

export const useProjectStore = defineStore('projects', () => {
  const localGetAll = () => load()
  const localGetById = (id: string) => load().find((project) => project.id === id)
  const localCreate = (input: Omit<Project, 'id' | 'createdAt' | 'progress'>) => {
    const project: Project = { ...input, id: crypto.randomUUID(), progress: 0, createdAt: new Date().toISOString() }
    const projects = load()
    projects.unshift(project)
    localStorage.setItem(storageKey, JSON.stringify(projects))
    return project
  }
  async function getAll(): Promise<Project[]> {
    if (USE_MOCK) return localGetAll()
    return (await api.get<Project[]>('/api/v1/projects')).data
  }
  async function getById(id: string): Promise<Project | undefined> {
    if (USE_MOCK) return localGetById(id)
    return (await api.get<Project>(`/api/v1/projects/${id}`)).data
  }
  async function create(input: Omit<Project, 'id' | 'createdAt' | 'progress'>): Promise<Project> {
    if (USE_MOCK) return localCreate(input)
    return (await api.post<Project>('/api/v1/projects', input)).data
  }
  return { getAll, getById, create }
})
