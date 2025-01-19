<template>
  <el-card class="project-card" shadow="hover">
    <template #header>
      <div class="project-card__header">
        <p class="project-card__name">{{ project.name }}</p>
        <el-button type="primary" size="large" :icon="Edit" @click="emit('edit')" />
      </div>
    </template>
    <div class="area-card__cover-wrapper">
      <el-image class="project-card__cover" lazy :src="project.imageUrl" fit="cover">
        <template #error>
          <div class="project-card__image-slot">
            <el-icon><PictureFilled /></el-icon>
          </div>
        </template>
      </el-image>
    </div>
    <template #footer>
      <p class="project-card__description">
        {{ project.description }}
      </p>
    </template>
  </el-card>
</template>
<script setup lang="ts">
import { Edit, PictureFilled } from '@element-plus/icons-vue'
import type { Project } from '@/models'

interface Props {
  project: Project
}

interface Emits {
  (e: 'edit'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<style scoped lang="scss">
.project-card {
  max-width: 480px;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__name {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__cover-wrapper {
    width: 100%;
    height: 200px;
    overflow: hidden;
  }

  &__cover {
    width: 100%;
    height: 100%;
  }

  &__image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: var(--el-fill-color-light);
    color: var(--el-text-color-secondary);
    font-size: 30px;
  }

  &__description {
    width: 100%;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: var(--el-text-color-secondary);
  }
}
</style>
