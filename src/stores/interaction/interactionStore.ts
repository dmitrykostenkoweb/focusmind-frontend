import { defineStore } from 'pinia'
import type { EntityType, EntityTypeMap } from '@/models/entity.model'
import type { FormMode } from './interaction.types'

interface State {
  dialogVisible: boolean
  formMode: FormMode
  entityType: EntityType
  selectedEntity: EntityTypeMap[EntityType] | null
}

export const useInteractionStore = defineStore('interaction', {
  state: (): State => ({
    dialogVisible: false,
    formMode: 'create',
    entityType: 'area',
    selectedEntity: null,
  }),

  actions: {
    openCreateWithAreaDialog(type: 'project', areaId: number) {
      this.dialogVisible = true
      this.formMode = 'create'
      this.entityType = type
      this.selectedEntity = {
        areaId,
        status: 'Inbox',
        imageUrl: '',
        id: 0,
        name: '',
        description: '',
      }
    },

    openCreateWithProjectDialog(type: 'task', projectId: number) {
      this.dialogVisible = true
      this.formMode = 'create'
      this.entityType = type
      this.selectedEntity = {
        projectId,
        status: 'Inbox',
        imageUrl: '',
        id: 0,
        name: '',
        description: '',
      }
    },

    openCreateDialog(entityType: EntityType) {
      this.selectedEntity = null
      this.formMode = 'create'
      this.entityType = entityType
      this.dialogVisible = true
    },

    openEditDialog(entity: EntityTypeMap[EntityType], entityType: EntityType) {
      this.selectedEntity = entity
      this.formMode = 'update'
      this.entityType = entityType
      this.dialogVisible = true
    },

    closeDialog() {
      this.dialogVisible = false
      this.entityType = 'area'
    },
  },
})
