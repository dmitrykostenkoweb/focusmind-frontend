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
import { ElMessageBox } from 'element-plus'
import { AxiosError } from 'axios'

import AddFormDialog from '@/components/common/AddFormDialog/AddFormDialog.vue'

import { useAreaApiStore } from '@/stores/area/areaApiStore'
import { useInteractionStore } from '@/stores/interaction/interactionStore'

import { showMessage } from '@/utils'

import type { AreaEntity, FormAreaEntity } from '@/models/entity.model'

// Stores
const interactionStore = useInteractionStore()
const areaApiStore = useAreaApiStore()

// Computed properties
const area = computed<AreaEntity | null>(() => interactionStore.selectedEntity)
const error = computed<AxiosError | string | null>(() => areaApiStore.error)
const loading = computed<boolean>(() => areaApiStore.isLoading)
const modalTitle = computed<string>(() =>
  interactionStore.formMode === 'create'
    ? 'Create New Area'
    : `Edit Area: ${interactionStore.selectedEntity?.name || ''}`,
)

const handleEdit = async (payload: FormAreaEntity): Promise<void> => {
  if (!area.value?.id) {
    showMessage('Area not found!', 'error')
    return
  }

  await areaApiStore.updateArea({ id: area.value.id, ...payload })
  handleResponse('Area updated successfully!')
}

const handleAdd = async (payload: FormAreaEntity): Promise<void> => {
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
</script>
