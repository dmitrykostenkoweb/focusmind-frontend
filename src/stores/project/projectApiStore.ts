import { defineStore } from 'pinia'
import axiosInstance from '@/services/axiosInstance'
import type { AxiosError } from 'axios'
import type { ProjectEntity } from '@/models/entity.model'
import type { Status } from '@/models/shared.model'

interface State {
  projects: ProjectEntity[]
  selectedProject: ProjectEntity | null
  fetchedProject: ProjectEntity | null
  isLoading: boolean
  error: null | AxiosError | string
}

export const useProjectApiStore = defineStore('project-api-store', {
  state: (): State => ({
    projects: [],
    selectedProject: null,
    fetchedProject: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    projectOptions: (state) => {
      return state.projects.map((project) => ({
        value: project.id,
        label: project.name,
        img: project.imageUrl,
      }))
    },
    getProjectsByAreaId: (state) => (areaId: number) => {
      return state.projects.filter((project) => project.areaId === areaId)
    },
  },

  actions: {
    async fetchProjects(statuses?: Status[]) {
      this.isLoading = true
      this.error = null
      try {
        const { data } = await axiosInstance.get<ProjectEntity[]>('/projects', {
          params: {
            status: statuses,
          },
        })
        this.projects = data
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
        const { data } = await axiosInstance.get<ProjectEntity>(`/projects/${id}`)
        this.fetchedProject = data
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
        const { data } = await axiosInstance.post<ProjectEntity>('/projects', newProject)
        this.projects.push(data)
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
        const { data } = await axiosInstance.put<ProjectEntity>(
          `/projects/${updatedProject.id}`,
          updatedProject,
        )
        this.projects = this.projects.map((project) => (project.id === data.id ? data : project))
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

    async updateProjectStatus(id: number, status: Status): Promise<void> {
      this.isLoading = true
      this.error = null
      try {
        const { data } = await axiosInstance.patch<ProjectEntity>(`/projects/${id}/status`, {
          status,
        })
        this.projects = this.projects.map((project) => (project.id === data.id ? data : project))
        if (this.fetchedProject?.id === id) {
          this.fetchedProject = data
        }
        if (this.selectedProject?.id === id) {
          this.selectedProject = data
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },
  },
})
