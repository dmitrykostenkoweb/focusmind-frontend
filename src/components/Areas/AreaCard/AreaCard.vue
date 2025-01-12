<template>
  <el-card class="area-card" shadow="hover">
    <template #header>
      <div class="area-card__header">
        <p class="area-card__name">{{ area.name }}</p>
        <el-button type="primary" size="large" circle :icon="Edit" plain @click="emit('edit')" />
      </div>
    </template>
    <div class="area-card__cover-wrapper">
      <el-image class="area-card__cover" lazy :src="area.imageUrl" fit="cover">
        <template #error>
          <div class="area-card__image-slot">
            <el-icon><PictureFilled /></el-icon>
          </div>
        </template>
      </el-image>
    </div>
    <template #footer>
      <p class="area-card__description">
        {{ area.description }}
      </p>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { Edit, PictureFilled } from '@element-plus/icons-vue'
import type { Area } from '@/models'

interface Props {
  area: Area
}

interface Emits {
  (e: 'edit'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<style scoped lang="scss">
.area-card {
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
