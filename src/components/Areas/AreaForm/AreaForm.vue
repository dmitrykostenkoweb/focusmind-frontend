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

<script lang="ts" setup>
import { computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { AxiosError } from 'axios'
import { AddFormDialog } from '@/components/common'
import { useAreaApiStore, useInteractionStore } from '@/stores'
import type { Area } from '@/models'

type Form = Omit<Area, 'id'>

// Stores
const interactionStore = useInteractionStore()
const areaApiStore = useAreaApiStore()

// Computed properties
const area = computed<Area | null>(() => interactionStore.selectedEntity)
const error = computed<AxiosError | string | null>(() => areaApiStore.error)
const loading = computed<boolean>(() => areaApiStore.isLoading)
const modalTitle = computed<string>(() =>
  interactionStore.formMode === 'create'
    ? 'Create New Area'
    : `Edit Area: ${interactionStore.selectedEntity?.name || ''}`,
)

const handleEdit = async (payload: Form): Promise<void> => {
  if (!area.value?.id) {
    showMessage('Area not found!', 'error')
    return
  }

  await areaApiStore.updateArea({ id: area.value.id, ...payload })
  handleResponse('Area updated successfully!')
}

const handleAdd = async (payload: Form): Promise<void> => {
  await areaApiStore.createArea(payload)
  handleResponse('Area created successfully!')
}

const deleteAreaHandler = async (): Promise<void> => {
  ElMessageBox.confirm(
    `Are you sure you want to delete the area '${area.value?.name || ''}'? This action cannot be undone.`,
    'Confirm Deletion',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    },
  )
    .then(async () => {
      if (!area.value?.id) {
        showMessage('Area not found!', 'error')
        return
      }
      await areaApiStore.deleteArea(area.value.id)
      handleResponse('Area deleted successfully!')
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

const showMessage = (message: string, type: 'success' | 'error' | 'info') => {
  ElMessage({ message, type, plain: true })
}
</script>
