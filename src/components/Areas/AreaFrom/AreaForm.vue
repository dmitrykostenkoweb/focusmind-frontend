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
        <area-form-img-upload />
      </el-form-item>
      <el-form-item v-if="mode === 'update' && area" label="Delete Area">
        <el-button
          @click="deleteAreaHandler"
          :loading="deleteLoading"
          type="danger"
          :icon="Delete"
          circle
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button>Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import AreaFormImgUpload from '@/components/Areas/AreaFrom/AreaFormImgUpload.vue'
import { Delete } from '@element-plus/icons-vue'
import { useCreateArea, useDeleteArea, useUpdateArea } from '@/components/Areas/composables'
import type { Area } from '@/models'

interface Props {
  area: Area | null
  mode: 'create' | 'update'
}
interface Emits {
  (e: 'close'): void
}

type Form = Omit<Area, 'id'>

const form = reactive<Form>({
  name: '',
  description: '',
  imageUrl: '',
})

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { create, error: createError } = useCreateArea()
const { update, error: updateError } = useUpdateArea()
const { deleteArea, error: deleteError, isLoading: deleteLoading } = useDeleteArea()

const onSubmit = async (): Promise<void> => {
  if (props.mode === 'update') await handleEdit()
  else if (props.mode === 'create') await handleAdd()
}

const handleEdit = async (): Promise<void> => {
  if (props.area?.id) await updateArea(props.area.id, form)
  else
    ElMessage({
      message: 'Area not found!',
      type: 'error',
      plain: true,
    })
}

const handleAdd = async (): Promise<void> => await createArea(form)

const updateArea = async (areaId: number, values: Form): Promise<void> => {
  await update(areaId, values.name, values.description, values.imageUrl)
  handleUpdateResponse()
}

const createArea = async (values: Form): Promise<void> => {
  await create(values.name, values.description, values.imageUrl)
  handleCreateResponse()
}

const handleUpdateResponse = (): void => {
  if (updateError.value) {
    ElMessage({
      message: updateError.value.message,
      type: 'error',
      plain: true,
    })
  } else {
    ElMessage({
      message: 'Area updated successfully!',
      type: 'success',
      plain: true,
    })
    emit('close')
  }
}

const handleCreateResponse = (): void => {
  if (createError.value) {
    ElMessage({
      message: createError.value.message,
      type: 'error',
      plain: true,
    })
  } else {
    ElMessage({
      message: 'Area created successfully!',
      type: 'success',
      plain: true,
    })
    emit('close')
    clearFormState()
  }
}

const deleteAreaHandler = async (): Promise<void> => {
  if (props.area?.id) {
    await deleteArea(props.area?.id)

    if (deleteError.value) {
      ElMessage({
        message: deleteError.value.message,
        type: 'error',
        plain: true,
      })
    } else {
      ElMessage({
        message: 'Area deleted successfully!',
        type: 'success',
        plain: true,
      })
      emit('close')
      clearFormState()
    }
  } else {
    ElMessage({
      message: 'Area not found!',
      type: 'error',
      plain: true,
    })
  }
}

const clearFormState = (): void => {
  form.name = ''
  form.description = ''
  form.imageUrl = ''
}
watch(
  () => props.area,
  (el) => console.log(el),
)
</script>
