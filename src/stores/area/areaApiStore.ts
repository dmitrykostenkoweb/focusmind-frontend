import { defineStore } from 'pinia'
import axiosInstance from '@/services/axiosInstance'
import type { AreaEntity } from '@/models/entity.model'
import type { AxiosError } from 'axios'

interface State {
  areas: AreaEntity[]
  selectedArea: AreaEntity | null
  isLoading: boolean
  error: null | AxiosError | string
}

export const useAreaApiStore = defineStore('area-api-store', {
  state: (): State => ({
    areas: [],
    selectedArea: null,
    isLoading: false,
    error: null,
  }),

  actions: {
    async fetchAreas() {
      this.isLoading = true
      this.error = null
      try {
        const response = await axiosInstance.get<AreaEntity[]>('/areas')
        this.areas = response.data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },

    async fetchAreaById(id: number) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axiosInstance.get<AreaEntity>(`/areas/${id}`)
        this.selectedArea = response.data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },

    async createArea(newArea: Omit<AreaEntity, 'id'>) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axiosInstance.post<AreaEntity>('/areas', newArea)
        this.areas.push(response.data) // Dodaj do listy po udanym zapisie
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },

    async updateArea(updatedArea: AreaEntity) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axiosInstance.put<AreaEntity>(
          `/areas/${updatedArea.id}`,
          updatedArea,
        )
        const index = this.areas.findIndex((area) => area.id === updatedArea.id)
        if (index !== -1) {
          this.areas[index] = response.data
        }
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },

    async deleteArea(id: number) {
      this.isLoading = true
      this.error = null
      try {
        await axiosInstance.delete(`/areas/${id}`)
        this.areas = this.areas.filter((area) => area.id !== id)
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },
  },
})
