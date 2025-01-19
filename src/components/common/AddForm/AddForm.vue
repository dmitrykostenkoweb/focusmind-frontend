<template>
  <el-form :model="form" style="max-width: 600px" label-position="top">
    <el-form-item label="Name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Description">
      <el-input v-model="form.description" type="textarea" />
    </el-form-item>
    <el-form-item style="display: flex; flex-direction: column" label="Cover" name="imageUrl">
      <el-popover placement="right" :width="400" trigger="hover">
        <template #reference>
          <el-tag
            v-if="form.imageUrl"
            closable
            disable-transitions
            type="primary"
            @close="removePhoto"
          >
            unsplash photo
          </el-tag>
          <el-button size="small" style="width: 120px" v-else>Add</el-button>
        </template>
        <unsplash v-model="form.imageUrl" v-model:hex="form.hex" />
      </el-popover>
    </el-form-item>
    <el-form-item v-if="mode === 'update'" label="Delete Area">
      <el-button :loading="loading" @click="emit('delete')" type="danger" :icon="Delete" />
    </el-form-item>

    <el-form-item>
      <el-button @click="closeDialog">Cancel</el-button>
      <el-button :loading="loading" type="primary" @click="emit('submit', form)">
        {{ mode === 'create' ? 'Create' : 'Update' }}
      </el-button>
    </el-form-item>
  </el-form>
  <unsplash-gallery />
</template>

<script lang="ts" setup>
import { reactive, watch } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import { UnsplashGallery, Unsplash } from '@/components/common'
import type { Area, Project } from '@/models'

type Entity = Area | Project
type Form = Omit<Entity, 'id'>

interface Props {
  entity: Entity | null
  mode: 'create' | 'update'
  loading: boolean
}

interface Emits {
  (e: 'delete'): void
  (e: 'submit', form: Form): void
  (e: 'close'): void
}

const { entity, mode, loading } = defineProps<Props>()
const emit = defineEmits<Emits>()

// Reactive form
const form = reactive<Form>({
  name: '',
  description: '',
  imageUrl: '',
  hex: '',
})

// Handlers
const removePhoto = (): void => {
  form.imageUrl = ''
  form.hex = ''
}

const clearForm = (): void => {
  form.name = ''
  form.description = ''
  form.imageUrl = ''
  form.hex = ''
}

const closeDialog = (): void => {
  emit('close')
  clearForm()
}

watch(
  (): Entity | null => entity,
  (newValue) => {
    if (newValue) {
      form.name = newValue.name || ''
      form.description = newValue.description || ''
      form.imageUrl = newValue.imageUrl || ''
      form.hex = newValue.hex || ''
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
