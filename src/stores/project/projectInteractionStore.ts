import { defineStore } from 'pinia'
import type { Project } from '@/models/project.model'

interface State {
  dialogVisible: boolean
  formMode: 'create' | 'update'
  selectedProject: Project | null
}

export const useProjectInteractionStore = defineStore('project-interaction-store', {
  state: (): State => ({
    dialogVisible: false,
    formMode: 'create',
    selectedProject: null,
  }),

  actions: {
    openCreateDialog() {
      this.selectedProject = null
      this.formMode = 'create'
      this.dialogVisible = true
    },

    openEditDialog(project: Project) {
      this.selectedProject = project
      this.formMode = 'update'
      this.dialogVisible = true
    },

    closeDialog() {
      this.dialogVisible = false
    },
  },
})
