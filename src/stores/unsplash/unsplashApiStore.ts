import { defineStore } from 'pinia'
import unsplashService from '@/services/unsplashService.ts'
import { useUnsplashInteractionStore } from '@/stores/unsplash/unsplashInteractionStore'
import type { Photo } from '@/models/unsplash.model'

interface State {
  photos: Photo[]
  randomPhoto: Photo | null
  loading: boolean
  error: string | null
}

export const useUnsplashApiStore = defineStore('unsplash-api-store', {
  state: (): State => ({
    photos: [],
    randomPhoto: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchPhotos(query: string, page: number = 1, perPage: number = 12) {
      this.loading = true
      this.error = null
      const unsplashInteractionStore = useUnsplashInteractionStore()

      try {
        const photos = await unsplashService.searchPhotos(query, page, perPage)
        this.photos = photos as Photo[]
      } catch (error) {
        this.error = 'Failed to fetch photos'
        console.error(error)
      } finally {
        this.loading = false
        unsplashInteractionStore.openGalleryModal()
      }
    },

    async fetchRandomPhoto() {
      this.loading = true
      this.error = null
      const unsplashInteractionStore = useUnsplashInteractionStore()

      try {
        this.randomPhoto = (await unsplashService.getRandomPhoto()) as Photo
        unsplashInteractionStore.setSelectedPhoto(this.randomPhoto)
      } catch (error) {
        this.error = 'Failed to fetch random photo'
        console.error(error)
      } finally {
        this.loading = false
      }
    },
  },
})
