<template>
  <el-dialog v-model="areaInteractionStore.dialogVisible" :title="modalTitle" width="600">
    <add-form
      :entity="area"
      :mode
      :loading
      @close="closeDialog"
      @submit="onSubmit"
      @delete="deleteAreaHandler"
    />
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { AxiosError } from 'axios'
import { AddForm } from '@/components/common'
import { useAreaApiStore, useAreaInteractionStore } from '@/stores'
import type { Area } from '@/models'

type Form = Omit<Area, 'id'>

// Stores
const areaInteractionStore = useAreaInteractionStore()
const areaApiStore = useAreaApiStore()

// Computed properties
const mode = computed<'create' | 'update'>(() => areaInteractionStore.formMode)
const area = computed<Area | null>(() => areaInteractionStore.selectedArea)
const error = computed<AxiosError | string | null>(() => areaApiStore.error)
const loading = computed<boolean>(() => areaApiStore.isLoading)
const modalTitle = computed<string>(() =>
  areaInteractionStore.formMode === 'create'
    ? 'Create New Area'
    : `Edit Area: ${areaInteractionStore.selectedArea?.name || ''}`,
)

const onSubmit = async (payload: Form): Promise<void> => {
  if (mode.value === 'update') await handleEdit(payload)
  else await handleAdd(payload)
}

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
  areaInteractionStore.closeDialog()
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
