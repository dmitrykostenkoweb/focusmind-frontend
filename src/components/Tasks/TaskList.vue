<template>
  <el-collapse-item name="task">
    <template #title>
      <header class="task-list__header">
        <h2>Tasks <el-badge :value="taskApiStore.tasks.length" /></h2>
        <el-button
          plain
          icon="Plus"
          size="small"
          @click.stop="interactionStore.openCreateDialog('task')"
          >Add new task</el-button
        >
      </header>
    </template>
    <status-filter v-model="selectedStatuses" :statuses="statuses" />
    <div class="grid-container">
      <card-component
        v-for="entity in taskApiStore.tasks"
        :key="entity.id"
        :entity
        @edit="interactionStore.openEditDialog(entity, 'task')"
      />
    </div>
  </el-collapse-item>
  <task-form v-if="interactionStore.entityType === 'task'" />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useInteractionStore } from '@/stores/interaction/interactionStore'
import { useTaskApiStore } from '@/stores/task/taskApiStore'
import CardComponent from '@/components/common/CardComponent/CardComponent.vue'
import TaskForm from './TaskForm.vue'
import StatusFilter from '@/components/common/StatusFilter/StatusFilter.vue'
import { statusesOptions } from '@/constants'
import type { Status, StatusOption } from '@/models/shared.model'

const taskApiStore = useTaskApiStore()
const interactionStore = useInteractionStore()

const selectedStatuses = ref<Status[]>(['InProgress'])
const statuses = ref<StatusOption[]>(statusesOptions)

watch(selectedStatuses, async (newStatuses) => {
  await taskApiStore.fetchTasks(newStatuses)
})

onMounted(async () => await taskApiStore.fetchTasks())
</script>

<style scoped lang="scss">
.task-list {
  &__header {
    display: flex;
    align-items: baseline;
    gap: 16px;
  }
}
</style>
