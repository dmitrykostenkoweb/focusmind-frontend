<template>
  <add-form-dialog
    :loading
    :modalTitle
    @close="closeDialog"
    @edit="handleEdit"
    @create="handleAdd"
    @delete="deleteProjectHandler"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import { AxiosError } from 'axios'

import AddFormDialog from '@/components/common/AddFormDialog/AddFormDialog.vue'

import { useProjectApiStore } from '@/stores/project/projectApiStore'
import { useInteractionStore } from '@/stores/interaction/interactionStore'

import { showMessage } from '@/utils'

import type { FormProjectEntity, ProjectEntity } from '@/models/entity.model'

// Stores
const interactionStore = useInteractionStore()
const projectApiStore = useProjectApiStore()

// Computed properties
const project = computed<ProjectEntity | null>(
  () => interactionStore.selectedEntity as ProjectEntity | null,
)
const error = computed<AxiosError | string | null>(() => projectApiStore.error)
const loading = computed<boolean>(() => projectApiStore.isLoading)
const modalTitle = computed<string>(() =>
  interactionStore.formMode === 'create'
    ? 'Create New Project'
    : `Edit Project: ${interactionStore.selectedEntity?.name || ''}`,
)

const handleEdit = async (payload: FormProjectEntity): Promise<void> => {
  if (!project.value?.id) {
    showMessage('Project not found!', 'error')
    return
  }

  await projectApiStore.updateProject({ id: project.value.id, ...payload })
  handleResponse('Project updated successfully!')
}

const handleAdd = async (payload: FormProjectEntity): Promise<void> => {
  await projectApiStore.createProject(payload)
  handleResponse('Project created successfully!')
}

const deleteProjectHandler = async (): Promise<void> => {
  ElMessageBox.confirm(
    `Are you sure you want to delete the project '${project.value?.name || ''}'? This action cannot be undone.`,
    'Confirm Deletion',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    },
  )
    .then(async () => {
      if (!project.value?.id) {
        showMessage('Project not found!', 'error')
        return
      } else {
        await projectApiStore.deleteProject(project.value.id)
        handleResponse('Project deleted successfully!')
      }
    })
    .catch(() => {
      showMessage('Delete canceled', 'info')
    })
}

const closeDialog = (): void => {
  interactionStore.closeDialog()
}

// Utility functions
const handleResponse = (successMessage: string) => {
  if (error.value) {
    const errorMessage = error.value instanceof AxiosError ? error.value.message : error.value
    showMessage(errorMessage, 'error')
  } else {
    showMessage(successMessage, 'success')
    closeDialog()
  }
}
</script>
