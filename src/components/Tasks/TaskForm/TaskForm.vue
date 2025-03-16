<template>
  <add-form-dialog
    :loading="loading"
    :modalTitle="modalTitle"
    @close="closeDialog"
    @edit="handleEdit"
    @create="handleAdd"
    @delete="deleteTaskHandler"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ElMessageBox } from 'element-plus'
import { AxiosError } from 'axios'

import AddFormDialog from '@/components/common/AddFormDialog/AddFormDialog.vue'

import { useTaskApiStore } from '@/stores/task/taskApiStore'
import { useInteractionStore } from '@/stores/interaction/interactionStore'

import { showMessage } from '@/utils'

import type { FormTaskEntity, TaskEntity } from '@/models/entity.model'

// Stores
const interactionStore = useInteractionStore()
const taskApiStore = useTaskApiStore()

// Computed properties
const task = computed<TaskEntity | null>(() => interactionStore.selectedEntity as TaskEntity | null)
const error = computed<AxiosError | string | null>(() => taskApiStore.error)
const loading = computed<boolean>(() => taskApiStore.isLoading)
const modalTitle = computed<string>(() =>
  interactionStore.formMode === 'create'
    ? 'Create New Task'
    : `Edit Task: ${interactionStore.selectedEntity?.name || ''}`,
)

const handleEdit = async (payload: FormTaskEntity): Promise<void> => {
  if (!task.value?.id) {
    showMessage('Task not found!', 'error')
    return
  }

  await taskApiStore.updateTask({ id: task.value.id, ...payload })
  handleResponse('Task updated successfully!')
}

const handleAdd = async (payload: FormTaskEntity): Promise<void> => {
  await taskApiStore.createTask(payload)
  handleResponse('Task created successfully!')
}

const deleteTaskHandler = async (): Promise<void> => {
  ElMessageBox.confirm(
    `Are you sure you want to delete the task '${task.value?.name || ''}'? This action cannot be undone.`,
    'Confirm Deletion',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    },
  )
    .then(async () => {
      if (!task.value?.id) {
        showMessage('Task not found!', 'error')
        return
      }
      await taskApiStore.deleteTask(task.value.id)
      handleResponse('Task deleted successfully!')
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
