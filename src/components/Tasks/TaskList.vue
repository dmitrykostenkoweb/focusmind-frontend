<template>
  <header class="task-list__header">
    <h2>Tasks</h2>
    <el-button plain icon="Plus" size="small" @click="interactionStore.openCreateDialog('task')"
      >Add new task</el-button
    >
  </header>
  <div class="grid-container">
    <card-component
      v-for="entity in taskApiStore.tasks"
      :key="entity.id"
      :entity
      @edit="interactionStore.openEditDialog(entity, 'task')"
    />
  </div>
  <task-form v-if="interactionStore.entityType === 'task'" />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useInteractionStore } from '@/stores/interaction/interactionStore'
import { useTaskApiStore } from '@/stores/task/taskApiStore'
import CardComponent from '@/components/common/CardComponent/CardComponent.vue'
import TaskForm from './TaskForm.vue'

const taskApiStore = useTaskApiStore()
const interactionStore = useInteractionStore()

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
