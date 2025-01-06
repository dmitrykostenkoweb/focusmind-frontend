import { defineStore } from 'pinia'
import type { Area } from '@/models/area.model'

interface State {
  dialogVisible: boolean
  formMode: 'create' | 'update'
  selectedArea: Area | null
}

export const useAreaInteractionStore = defineStore('uiStore', {
  state: (): State => ({
    dialogVisible: false,
    formMode: 'create',
    selectedArea: null,
  }),

  actions: {
    openCreateDialog() {
      this.selectedArea = null
      this.formMode = 'create'
      this.dialogVisible = true
    },

    openEditDialog(area: Area) {
      this.selectedArea = area
      this.formMode = 'update'
      this.dialogVisible = true
    },

    closeDialog() {
      this.dialogVisible = false
    },
  },
})
