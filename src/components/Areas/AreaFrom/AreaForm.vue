<template>
  <el-form :model="form" style="max-width: 600px" label-position="top">
    <el-form-item label="Area Name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Description">
      <el-input v-model="form.description" type="textarea" />
    </el-form-item>
    <el-form-item label="Select Cover" name="imageUrl">
      <unsplash-trigger v-model="form.imageUrl" />
    </el-form-item>
    <el-form-item v-if="mode === 'update'" label="Delete Area">
      <el-button :loading="loading" @click="deleteAreaHandler" type="danger" :icon="Delete" />
    </el-form-item>

    <el-form-item>
      <el-button @click="closeDialog">Cancel</el-button>
      <el-button :loading="loading" type="primary" @click="onSubmit">
        {{ mode === 'create' ? 'Create' : 'Update' }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import { useAreaApiStore, useAreaInteractionStore } from '@/stores'
import type { Area } from '@/models'
import { AxiosError } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import UnsplashTrigger from '@/components/common/Unsplash/UnsplashTrigger.vue'

type Form = Omit<Area, 'areaid'>

// Stores
const areaInteractionStore = useAreaInteractionStore()
const areaApiStore = useAreaApiStore()

// Computed properties
const mode = computed<'create' | 'update'>(() => areaInteractionStore.formMode)
const area = computed<Area | null>(() => areaInteractionStore.selectedArea)
const error = computed<AxiosError | string | null>(() => areaApiStore.error)
const loading = computed<boolean>(() => areaApiStore.isLoading)

// Reactive form
const form = reactive<Form>({
  name: '',
  description: '',
  imageurl: '',
})

// Handlers
const onSubmit = async (): Promise<void> => {
  if (mode.value === 'update') await handleEdit()
  else await handleAdd()
}

const handleEdit = async (): Promise<void> => {
  if (!area.value?.areaid) {
    showMessage('Area not found!', 'error')
    return
  }

  await areaApiStore.updateArea({ areaid: area.value.areaid, ...form })
  handleResponse('Area updated successfully!')
}

const handleAdd = async (): Promise<void> => {
  await areaApiStore.createArea(form)
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
      if (!area.value?.areaid) {
        showMessage('Area not found!', 'error')
        return
      }
      await areaApiStore.deleteArea(area.value.areaid)
      handleResponse('Area deleted successfully!')
    })
    .catch(() => {
      showMessage('Delete canceled', 'info')
    })
}

const clearForm = (): void => {
  form.name = ''
  form.description = ''
  form.imageurl = ''
}

const closeDialog = (): void => {
  areaInteractionStore.closeDialog()
  clearForm()
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

watch(
  area,
  (newValue) => {
    if (newValue) {
      form.name = newValue.name || ''
      form.description = newValue.description || ''
      form.imageurl = newValue.imageurl || ''
    } else {
      clearForm()
    }
  },
  { immediate: true },
)
</script>
<style scoped lang="scss">
:deep(.el-card__body) {
  padding: 4px;
}
:deep(.el-card__footer) {
  padding: 4px;
}
:deep(.el-card) {
  width: fit-content;
}
</style>
