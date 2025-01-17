import { defineStore } from 'pinia'
import axiosInstance from '@/services/axiosInstance'
import type { Area } from '@/models/area.model'
import type { AxiosError } from 'axios'

interface State {
  areas: Area[]
  selectedArea: Area | null
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
        const response = await axiosInstance.get<Area[]>('/areas')
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
        const response = await axiosInstance.get<Area>(`/areas/${id}`)
        this.selectedArea = response.data
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },

    async createArea(newArea: Omit<Area, 'id'>) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axiosInstance.post<Area>('/areas', newArea)
        this.areas.push(response.data) // Dodaj do listy po udanym zapisie
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Unknown error'
      } finally {
        this.isLoading = false
      }
    },

    async updateArea(updatedArea: Area) {
      this.isLoading = true
      this.error = null
      try {
        const response = await axiosInstance.put<Area>(`/areas/${updatedArea.id}`, updatedArea)
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
