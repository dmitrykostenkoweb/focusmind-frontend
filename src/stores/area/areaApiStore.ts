import { defineStore } from 'pinia'
import axiosInstance from '@/services/axiosInstance'
import type { AreaEntity } from '@/models/entity.model'
import type { AxiosError } from 'axios'

interface State {
  areas: AreaEntity[]
  selectedArea: AreaEntity | null
  fetchedArea: AreaEntity | null
  isLoading: boolean
  error: null | AxiosError | string
}

export const useAreaApiStore = defineStore('area-api-store', {
  state: (): State => ({
    areas: [],
    selectedArea: null,
    fetchedArea: null,
    isLoading: false,
    error: null,
  }),

  getters: {
    areaOptions: (state) => {
      return state.areas.map((area) => ({
        value: area.id,
        label: area.name,
        img: area.imageUrl,
      }))
    },
  },

  actions: {
    async fetchAreas() {
      this.isLoading = true
      this.error = null
      try {
        const { data } = await axiosInstance.get<AreaEntity[]>('/areas')
        this.areas = data
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
        const { data } = await axiosInstance.get<AreaEntity>(`/areas/${id}`)
        this.fetchedArea = data
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
        const { data } = await axiosInstance.post<AreaEntity>('/areas', newArea)
        this.areas.push(data)
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
        const { data } = await axiosInstance.put<AreaEntity>(
          `/areas/${updatedArea.id}`,
          updatedArea,
        )
        this.areas = this.areas.map((area) => (area.id === data.id ? data : area))
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
