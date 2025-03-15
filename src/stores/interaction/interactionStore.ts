import { defineStore } from 'pinia'
import type { Entity } from '@/models/entity.model'
import type { FormType, FormMode } from './interaction.types'
interface State {
  dialogVisible: boolean
  formType: FormType
  formMode: FormMode
  selectedEntity: Entity | null
}

export const useInteractionStore = defineStore('interaction-store', {
  state: (): State => ({
    dialogVisible: false,
    formType: null,
    formMode: 'create',
    selectedEntity: null,
  }),

  actions: {
    openCreateDialog(formType: FormType) {
      this.selectedEntity = null
      this.formMode = 'create'
      this.formType = formType
      this.dialogVisible = true
    },

    openEditDialog(entity: Entity, formType: FormType) {
      this.selectedEntity = entity
      this.formMode = 'update'
      this.formType = formType
      this.dialogVisible = true
    },

    closeDialog() {
      this.dialogVisible = false
      this.formType = null
    },
  },
})
