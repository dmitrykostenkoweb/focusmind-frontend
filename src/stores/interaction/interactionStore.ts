import { defineStore } from 'pinia'
import type { Entity } from '@/models/entity.model'

interface State {
  dialogVisible: boolean
  formMode: 'create' | 'update'
  selectedEntity: Entity | null
}

export const useInteractionStore = defineStore('interaction-store', {
  state: (): State => ({
    dialogVisible: false,
    formMode: 'create',
    selectedEntity: null,
  }),

  actions: {
    openCreateDialog() {
      this.selectedEntity = null
      this.formMode = 'create'
      this.dialogVisible = true
    },

    openEditDialog(entity: Entity) {
      this.selectedEntity = entity
      this.formMode = 'update'
      this.dialogVisible = true
    },

    closeDialog() {
      this.dialogVisible = false
    },
  },
})
