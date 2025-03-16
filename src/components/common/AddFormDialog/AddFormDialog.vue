<template>
  <el-dialog v-model="interactionStore.dialogVisible" :title="modalTitle" width="600">
    <el-form :model="form" style="max-width: 600px" label-position="top">
      <el-form-item label="Name">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item label="Description">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>

      <el-form-item v-if="interactionStore.entityType === 'project'" label="Assign to Area">
        <el-select
          v-model="(form as FormProjectEntity).areaId"
          placeholder="Select Area"
          style="width: 240px"
        >
          <el-option
            v-for="item in areaOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <div class="option-cover">
              <el-image class="option-cover__image" :src="item.img" fit="cover">
                <template #error>
                  <el-icon class="option-cover__error-icon"><Compass /></el-icon>
                </template>
              </el-image>
              <span>{{ item.label }}</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="interactionStore.entityType === 'task'" label="Assign to Project">
        <el-select
          v-model="(form as FormTaskEntity).projectId"
          placeholder="Select Project"
          style="width: 240px"
        >
          <el-option
            v-for="item in projectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
            <div class="option-cover">
              <el-image class="option-cover__image" :src="item.img" fit="cover">
                <template #error>
                  <el-icon class="option-cover__error-icon"><List /></el-icon>
                </template>
              </el-image>
              <span>{{ item.label }}</span>
            </div>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item v-if="interactionStore.entityType !== 'area'" label="Select Status">
        <el-select
          v-model="(form as FormProjectEntity | FormTaskEntity).status"
          placeholder="Select Status"
          style="width: 240px"
        >
          <el-option
            v-for="item in statusesOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
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
          <unsplash-widget v-model="form.imageUrl" />
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
import { computed, reactive, ref, watch } from 'vue'
import { Delete } from '@element-plus/icons-vue'

import UnsplashGallery from '@/components/common/Unsplash/UnsplashGallery.vue'
import UnsplashWidget from '@/components/common/Unsplash/UnsplashWidget.vue'

import { useInteractionStore } from '@/stores/interaction/interactionStore'
import { useAreaApiStore } from '@/stores/area/areaApiStore'
import { useProjectApiStore } from '@/stores/project/projectApiStore'

import { createInitialForm } from '@/components/common/AddFormDialog/form.utils'
import { statusesOptions } from '@/constants'

import type {
  EntityTypeMap,
  EntityType,
  FormEntityTypeMap,
  FormProjectEntity,
  FormTaskEntity,
} from '@/models/entity.model'

interface Props {
  modalTitle: string
  loading: boolean
}

interface Emits {
  <T extends EntityType>(e: 'edit', form: FormEntityTypeMap[T]): void
  <T extends EntityType>(e: 'create', form: FormEntityTypeMap[T]): void
  (e: 'delete'): void
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const interactionStore = useInteractionStore()

const mode = computed<'create' | 'update'>(() => interactionStore.formMode)

const entity = computed<EntityTypeMap[EntityType] | null>(() => interactionStore.selectedEntity)

const areaApiStore = useAreaApiStore()

const areaOptions = computed(() => areaApiStore.areaOptions)

const projectApiStore = useProjectApiStore()

const projectOptions = computed(() => projectApiStore.projectOptions)

const form = reactive(
  createInitialForm(interactionStore.entityType) as FormEntityTypeMap[EntityType],
)

const onSubmit = (): void => {
  if (mode.value === 'update') emit('edit', form)
  else emit('create', form)

  clearForm()
}

const removePhoto = (): void => {
  form.imageUrl = ''
}

const clearForm = (): void => {
  form.name = ''
  form.description = ''
  form.imageUrl = ''
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

      if ('areaId' in newValue && interactionStore.entityType === 'project') {
        ;(form as FormProjectEntity).areaId = newValue.areaId
      }
      if ('projectId' in newValue && interactionStore.entityType === 'task') {
        ;(form as FormTaskEntity).projectId = newValue.projectId
      }
      if ('status' in newValue) {
        ;(form as FormProjectEntity | FormTaskEntity).status = newValue.status
      }
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

<style scoped lang="scss">
.option-cover {
  display: flex;
  align-items: center;
  gap: 10px;

  &__image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: contain;
  }

  &__error-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
</style>
