<template>
  <add-form-dialog
    :loading
    :modalTitle
    @close="closeDialog"
    @edit="handleEdit"
    @create="handleAdd"
    @delete="deleteAreaHandler"
  />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { AddFormDialog } from '@/components/common'
import { useInteractionStore, useProjectApiStore } from '@/stores'
import { showMessage } from '@/utils'
import type { Area, Project } from '@/models'

type Form = Omit<Project, 'id'>

const interactionStore = useInteractionStore()
const projectApiStore = useProjectApiStore()

const project = computed<Project | null>(() => interactionStore.selectedEntity as Project | null)
const loading = computed<boolean>(() => projectApiStore.isLoading)
const modalTitle = computed<string>(() =>
  interactionStore.formMode === 'create'
    ? 'Create New Project'
    : `Edit Project: ${interactionStore.selectedEntity?.name || ''}`,
)

const handleEdit = async (payload: Form): Promise<void> => {
  if (!project.value?.id) {
    showMessage('Project not found!', 'error')
    return
  }

  await projectApiStore.updateProject({ id: area.value.id, ...payload })
  handleResponse('Area updated successfully!')
}

const closeDialog = (): void => {
  interactionStore.closeDialog()
}
</script>
