<template>
  <div>
    <el-form :model="form" style="max-width: 600px">
      <el-form-item label="Area Name">
        <el-input v-model="form.name" />
      </el-form-item>
      <!---->
      <el-form-item label="Description">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>
      <!---->
      <el-form-item label="Upload Cover" name="imageUrl">
        <!--        <area-form-img-upload />-->
      </el-form-item>
      <el-form-item v-if="mode === 'update'" label="Delete Area">
        <el-button :loading @click="deleteAreaHandler" type="danger" :icon="Delete" circle />
      </el-form-item>

      <el-form-item>
        <el-button @click="areaInteractionStore.closeDialog()">Cancel</el-button>
        <el-button :loading type="primary" @click="onSubmit">Create</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { computed, reactive } from 'vue'
// import AreaFormImgUpload from '@/components/Areas/AreaFrom/AreaFormImgUpload.vue'
import { Delete } from '@element-plus/icons-vue'
import { useAreaApiStore, useAreaInteractionStore } from '@/stores'
import type { Area } from '@/models'
import { AxiosError } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'

type Form = Omit<Area, 'areaid'>

const areaInteractionStore = useAreaInteractionStore()
const areaApiStore = useAreaApiStore()

const mode = computed(() => areaInteractionStore.formMode)
const area = computed<Area | null>(() => areaInteractionStore.selectedArea)
const error = computed<null | AxiosError | string>(() => areaApiStore.error)
const loading = computed<boolean>(() => areaApiStore.isLoading)

const form = reactive<Form>({
  name: area.value?.name || '',
  description: area.value?.description,
  imageurl: area.value?.imageurl,
})

const onSubmit = async (): Promise<void> => {
  if (mode.value === 'update') await handleEdit()
  else if (mode.value === 'create') await handleAdd()
}

const handleEdit = async (): Promise<void> => {
  if (area.value?.areaid) {
    await areaApiStore.updateArea({
      areaid: area.value.areaid,
      ...form,
    })
  } else
    ElMessage({
      message: 'Area not found!',
      type: 'error',
      plain: true,
    })

  handleUpdateResponse()
}

const handleAdd = async (): Promise<void> => {
  await areaApiStore.createArea(form)
  handleCreateResponse()
}

const handleUpdateResponse = (): void => {
  if (error.value) {
    if (error.value instanceof AxiosError) {
      ElMessage({
        message: error.value.message,
        type: 'error',
        plain: true,
      })
    } else {
      ElMessage({
        message: error.value,
        type: 'error',
        plain: true,
      })
    }
  } else {
    ElMessage({
      message: 'Area updated successfully!',
      type: 'success',
      plain: true,
    })
  }
  areaInteractionStore.closeDialog()
}

const handleCreateResponse = (): void => {
  if (error.value) {
    if (error.value instanceof AxiosError) {
      ElMessage({
        message: error.value.message,
        type: 'error',
        plain: true,
      })
    } else {
      ElMessage({
        message: error.value,
        type: 'error',
        plain: true,
      })
    }
  } else {
    ElMessage({
      message: 'Area created successfully!',
      type: 'success',
      plain: true,
    })
    areaInteractionStore.closeDialog()
  }
}

const deleteAreaHandler = () => {
  ElMessageBox.confirm(
    `Are you sure you want to delete the area '${area.value?.name || ''}'? This action cannot be undone, and all related data will be permanently removed`,
    'Confirm Deletion',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    },
  )
    .then(async () => {
      if (area.value?.areaid) {
        await areaApiStore.deleteArea(area.value?.areaid)
        handleDeleteResponse()
      } else {
        ElMessage({
          type: 'error',
          message: 'Area not found!',
        })
      }
      areaInteractionStore.closeDialog()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled',
      })
    })
}

const handleDeleteResponse = (): void => {
  if (error.value) {
    if (error.value instanceof AxiosError) {
      ElMessage({
        message: error.value.message,
        type: 'error',
        plain: true,
      })
    } else {
      ElMessage({
        message: error.value,
        type: 'error',
        plain: true,
      })
    }
  } else {
    ElMessage({
      message: 'Area deleted successfully!',
      type: 'success',
      plain: true,
    })
    areaInteractionStore.closeDialog()
  }
}
</script>
