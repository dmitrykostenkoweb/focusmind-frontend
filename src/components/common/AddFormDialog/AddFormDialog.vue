<template>
  <el-dialog v-model="interactionStore.dialogVisible" :title="modalTitle" width="600">
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
          <unsplash-widget v-model="form.imageUrl" v-model:hex="form.hex" />
        </el-popover>
      </el-form-item>
      <el-form-item v-if="mode === 'update'" label="Delete Area">
        <el-button :loading="loading" @click="emit('delete')" type="danger" :icon="Delete" />
      </el-form-item>

      <el-form-item>
        <el-button @click="closeDialog">Cancel</el-button>
        <el-button :loading="loading" type="primary" @click="onSubmit">
          {{ mode === 'create' ? 'Create' : 'Update' }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <unsplash-gallery />
</template>

<script lang="ts" setup>
import { computed, reactive, watch } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import UnsplashGallery from '@/components/common/Unsplash/UnsplashGallery.vue'
import UnsplashWidget from '@/components/common/Unsplash/UnsplashWidget.vue'
import { useInteractionStore } from '@/stores/interaction/interactionStore'
import type { Entity } from '@/models/entity.model'

type Form = Omit<Entity, 'id'>

interface Props {
  modalTitle: string
  loading: boolean
}

interface Emits {
  (e: 'delete'): void
  (e: 'edit', form: Form): void
  (e: 'create', form: Form): void
  (e: 'close'): void
}

const { modalTitle, loading } = defineProps<Props>()
const emit = defineEmits<Emits>()

const interactionStore = useInteractionStore()

const mode = computed<'create' | 'update'>(() => interactionStore.formMode)
const entity = computed<Entity | null>(() => interactionStore.selectedEntity)

// Reactive form
const form = reactive<Form>({
  name: '',
  description: '',
  imageUrl: '',
  hex: '',
})

// Handlers
const onSubmit = (): void => {
  if (mode.value === 'update') emit('edit', form)
  else emit('create', form)
}

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
  entity,
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

watch(
  () => interactionStore.dialogVisible,
  (newValue) => {
    if (!newValue) clearForm()
  },
)
</script>
