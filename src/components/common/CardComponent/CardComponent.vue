<template>
  <el-card class="entity-card" shadow="hover">
    <template #header>
      <div class="entity-card__header">
        <p class="entity-card__name">{{ entity.name }}</p>
        <el-button circle :icon="Edit" @click="emit('edit')" />
      </div>
    </template>
    <div class="entity-card__cover-wrapper">
      <el-image class="entity-card__cover" lazy :src="entity.imageUrl" fit="cover">
        <template #error>
          <div class="entity-card__image-slot">
            <el-icon><PictureFilled /></el-icon>
          </div>
        </template>
      </el-image>
    </div>
    <template #footer>
      <p class="entity-card__description">
        {{ entity.description }}
      </p>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Edit, PictureFilled } from '@element-plus/icons-vue'
import type { Entity } from '@/models/entity.model'

interface Props {
  entity: Entity
}

interface Emits {
  (e: 'edit'): void
}

const { entity } = defineProps<Props>()
const emit = defineEmits<Emits>()
</script>

<style scoped lang="scss">
.entity-card {
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
    font-weight: bold;
  }

  &__cover-wrapper {
    width: 100%;
    height: 200px;
  }

  &__cover {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    opacity: 0.8;
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
  }
}
</style>
