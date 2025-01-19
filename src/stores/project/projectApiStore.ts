import { defineStore } from 'pinia'
import axiosInstance from '@/services/axiosInstance'
import type { AxiosError } from 'axios'
import type { Project } from '@/models'

interface State {
  projects: Project[]
  selectedProject: Project | null
  isLoading: boolean
  error: null | AxiosError | string
}

export const useProjectApiStore = defineStore('project-api-store', {
  state: (): State => ({
    projects: [],
    selectedProject: null,
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchProjects() {
      this.isLoading = true
      this.error = null
      try {
        const response = await axiosInstance.get<Project[]>('/projects')
        this.projects = response.data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },

    async fetchProjectById(id: number) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axiosInstance.get<Project>(`/projects/${id}`)
        this.selectedProject = response.data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },

    async createProject(newProject: Omit<Project, 'id'>) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axiosInstance.post<Project>('/projects', newProject)
        this.projects.push(response.data) // Add to the list after successful save
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },
  },
})
