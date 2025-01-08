import { defineStore } from 'pinia'
import unsplashService from '@/services/unsplashService.ts'
import { useUnsplashInteractionStore } from '@/stores'
import type { Photo } from '@/models'

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
        this.photos = photos
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
        this.randomPhoto = await unsplashService.getRandomPhoto()
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
