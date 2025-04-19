<template>
  <el-card class="entity-card" shadow="hover">
    <div class="entity-card__status">
      <el-tag
        @click="handleStatusClick"
        effect="dark"
        v-if="(entity as ProjectEntity | TaskEntity).status"
        :type="statusType"
        style="cursor: pointer"
      >
        {{ (entity as ProjectEntity | TaskEntity).status }}
      </el-tag>

      <el-tag
        v-if="(entity as ProjectEntity).areaId"
        style="color: var(--el-text-color-basic)"
        effect="plain"
        type="info"
      >
        <el-icon><Compass /></el-icon>
        {{ areaApiStore.fetchedArea?.name }}</el-tag
      >
      <el-tag
        v-if="(entity as TaskEntity).projectId"
        style="color: var(--el-text-color-basic)"
        effect="plain"
        type="info"
      >
        <el-icon><List /></el-icon> {{ projectApiStore.fetchedProject?.name }}
      </el-tag>
    </div>
    <template #header>
      <div class="entity-card__header">
        <div class="entity-card__name">
          <el-icon v-if="entity.entityType === 'area'"><Compass /></el-icon>
          <el-icon v-if="entity.entityType === 'project'"><List /></el-icon>
          <el-icon v-if="entity.entityType === 'task'"><CircleCheck /></el-icon>
          {{ entity.name }}
        </div>
        <el-button :icon="Edit" @click="emit('edit')" />
      </div>
    </template>
    <div class="entity-card__cover-wrapper">
      <el-image class="entity-card__cover" :src="entity.imageUrl" fit="cover">
        <template #error>
          <div class="entity-card__image-slot">
            <el-icon><PictureFilled /></el-icon>
          </div>
        </template>
      </el-image>
    </div>
    <template #footer>
      <el-tooltip :content="entity.description" placement="top" effect="light">
        <p class="entity-card__description">
          {{ entity.description }}
        </p>
      </el-tooltip>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Edit, PictureFilled } from '@element-plus/icons-vue'
import { useAreaApiStore } from '@/stores/area/areaApiStore'
import { useProjectApiStore } from '@/stores/project/projectApiStore'
import { useTaskApiStore } from '@/stores/task/taskApiStore'
import type { EntityTypeMap, ProjectEntity, TaskEntity } from '@/models/entity.model'
import type { Status } from '@/models/shared.model'

interface Props {
  entity: EntityTypeMap[keyof EntityTypeMap]
}

interface Emits {
  (e: 'edit'): void
}

const { entity } = defineProps<Props>()
const emit = defineEmits<Emits>()

const areaApiStore = useAreaApiStore()
const projectApiStore = useProjectApiStore()
const taskApiStore = useTaskApiStore()

const statusType = computed<'info' | 'warning' | 'success' | 'primary' | 'danger'>(() => {
  const statusMap: Record<string, 'info' | 'warning' | 'success' | 'primary' | 'danger'> = {
    Inbox: 'info',
    InProgress: 'primary',
    Pause: 'warning',
    Done: 'success',
  }

  return statusMap[(entity as ProjectEntity | TaskEntity).status] || 'info'
})

onMounted(async () => {
  const areaId = (entity as ProjectEntity).areaId
  const projectId = (entity as TaskEntity).projectId

  if (areaId) await areaApiStore.fetchAreaById(areaId)
  if (projectId) await projectApiStore.fetchProjectById(projectId)
})

const handleStatusClick = async () => {
  console.log('handleStatusClick', entity.entityType)
  const statusOrder: Status[] = ['Inbox', 'InProgress', 'Pause', 'Done']

  if (entity.entityType === 'task') {
    console.log('task')
    const currentStatus = (entity as TaskEntity).status
    const currentIndex = statusOrder.indexOf(currentStatus as Status)
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length]

    await taskApiStore.updateTaskStatus(entity.id, nextStatus)
  } else if (entity.entityType === 'project') {
    console.log('project')
    const currentStatus = (entity as ProjectEntity).status
    const currentIndex = statusOrder.indexOf(currentStatus as Status)
    const nextStatus = statusOrder[(currentIndex + 1) % statusOrder.length]

    await projectApiStore.updateProjectStatus(entity.id, nextStatus)
  }
}
</script>

<style scoped lang="scss">
.entity-card {
  position: relative;
  max-width: 480px;
  overflow: visible;

  &__status {
    position: absolute;
    top: -12px;
    left: -12px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

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
    margin-right: 12px;

    font-weight: 500;

    display: flex;
    align-items: center;
    gap: 8px;
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

    font-size: 14px;

    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
