import { defineStore } from 'pinia'
import type { EntityType, EntityTypeMap } from '@/models/entity.model'
import type { FormMode } from './interaction.types'
interface State {
  dialogVisible: boolean
  formType: EntityType
  formMode: FormMode
  selectedEntity: EntityTypeMap[EntityType] | null
}

export const useInteractionStore = defineStore('interaction-store', {
  state: (): State => ({
    dialogVisible: false,
    formType: 'area',
    formMode: 'create',
    selectedEntity: null,
  }),

  actions: {
    openCreateDialog(formType: EntityType) {
      this.selectedEntity = null
      this.formMode = 'create'
      this.formType = formType
      this.dialogVisible = true
    },

    openEditDialog(entity: EntityTypeMap[EntityType], formType: EntityType) {
      this.selectedEntity = entity
      this.formMode = 'update'
      this.formType = formType
      this.dialogVisible = true
    },

    closeDialog() {
      this.dialogVisible = false
      this.formType = 'area'
    },
  },
})
