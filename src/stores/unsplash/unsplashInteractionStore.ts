import { defineStore } from 'pinia'
import type { Photo } from '@/models/unsplash.model'

interface State {
  galleryVisible: boolean
  selectedPhoto: Photo | null
}

export const useUnsplashInteractionStore = defineStore('unsplash-interaction-store', {
  state: (): State => ({
    galleryVisible: false,
    selectedPhoto: null,
  }),

  actions: {
    openGalleryModal() {
      this.galleryVisible = true
    },
    closeGalleryModal() {
      this.galleryVisible = false
    },
    setSelectedPhoto(photo: Photo) {
      this.selectedPhoto = photo
    },
    clearSelectedPhoto() {
      this.selectedPhoto = null
    },
  },
})
