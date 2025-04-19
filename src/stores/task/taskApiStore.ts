import { defineStore } from 'pinia'
import axiosInstance from '@/services/axiosInstance'
import type { AxiosError } from 'axios'
import type { TaskEntity, FormTaskEntity } from '@/models/entity.model'
import type { Status } from '@/models/shared.model'

interface State {
  tasks: TaskEntity[]
  selectedTask: TaskEntity | null
  isLoading: boolean
  error: AxiosError | string | null
}

export const useTaskApiStore = defineStore('task-api-store', {
  state: (): State => ({
    tasks: [],
    selectedTask: null,
    error: null,
    isLoading: false,
  }),

  getters: {
    getTasksByProjectId: (state) => (projectId: number) => {
      return state.tasks.filter((task) => task.projectId === projectId)
    },
  },

  actions: {
    async fetchTasks(statuses?: Status[]): Promise<void> {
      this.isLoading = true
      try {
        const { data } = await axiosInstance.get<TaskEntity[]>('/tasks', {
          params: {
            status: statuses,
          },
        })
        this.tasks = data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },

    async fetchTaskById(id: number): Promise<void> {
      this.isLoading = true
      this.error = null
      try {
        const { data } = await axiosInstance.get<TaskEntity>(`/tasks/${id}`)
        this.selectedTask = data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },

    async createTask(task: FormTaskEntity): Promise<void> {
      this.isLoading = true
      this.error = null
      try {
        const { data } = await axiosInstance.post<TaskEntity>('/tasks', task)
        this.tasks.push(data)
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },

    async updateTask(updatedTask: TaskEntity): Promise<void> {
      this.isLoading = true
      this.error = null
      try {
        const { data } = await axiosInstance.put<TaskEntity>(
          `/tasks/${updatedTask.id}`,
          updatedTask,
        )

        this.tasks = this.tasks.map((task) => (task.id === data.id ? data : task))
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },

    async deleteTask(id: number): Promise<void> {
      this.isLoading = true
      this.error = null
      try {
        await axiosInstance.delete(`/tasks/${id}`)
        this.tasks = this.tasks.filter((task) => task.id !== id)
      } catch (error) {
        this.error = error as AxiosError
      } finally {
        this.isLoading = false
      }
    },

    async updateTaskStatus(id: number, status: Status): Promise<void> {
      this.isLoading = true
      this.error = null
      try {
        const { data } = await axiosInstance.patch<TaskEntity>(`/tasks/${id}/status`, { status })
        this.tasks = this.tasks.map((task) => (task.id === data.id ? data : task))
        if (this.selectedTask?.id === id) {
          this.selectedTask = data
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },
  },
})
