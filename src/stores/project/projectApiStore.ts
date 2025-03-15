import { defineStore } from 'pinia'
import axiosInstance from '@/services/axiosInstance'
import type { AxiosError } from 'axios'
import type { ProjectEntity } from '@/models/entity.model'

interface State {
  projects: ProjectEntity[]
  selectedProject: ProjectEntity | null
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
        const response = await axiosInstance.get<ProjectEntity[]>('/projects')
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
        const response = await axiosInstance.get<ProjectEntity>(`/projects/${id}`)
        this.selectedProject = response.data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },

    async createProject(newProject: Omit<ProjectEntity, 'id'>) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axiosInstance.post<ProjectEntity>('/projects', newProject)
        this.projects.push(response.data)
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },

    async updateProject(updatedProject: ProjectEntity) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axiosInstance.put<ProjectEntity>(
          `/projects/${updatedProject.id}`,
          updatedProject,
        )
        this.projects = this.projects.map((project) =>
          project.id === response.data.id ? response.data : project,
        )
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },

    async deleteProject(id: number) {
      this.isLoading = true
      this.error = null
      try {
        await axiosInstance.delete(`/projects/${id}`)
        this.projects = this.projects.filter((project) => project.id !== id)
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },
  },
})
