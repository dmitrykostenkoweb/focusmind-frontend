<template>
  <header class="project-list__header">
    <h2>Projects</h2>
    <el-button
      round
      icon="Plus"
      type="primary"
      size="small"
      @click="interactionStore.openCreateDialog()"
      >Add</el-button
    >
  </header>
  <div class="grid-container">
    <card
      v-for="entity in projectApiStore.projects"
      :key="entity.id"
      :entity
      @edit="interactionStore.openEditDialog(entity)"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useInteractionStore, useProjectApiStore } from '@/stores'
import { Card } from '@/components/common'

const projectApiStore = useProjectApiStore()
const interactionStore = useInteractionStore()

const modalTitle = computed<string>(() =>
  interactionStore.formMode === 'create'
    ? 'Create New Project'
    : `Edit Project: ${interactionStore.selectedEntity?.name || ''}`,
)

onMounted(async () => await projectApiStore.fetchProjects())
</script>
<style scoped lang="scss">
.project-list {
  &__header {
    display: flex;
    align-items: baseline;
    gap: 16px;
  }
}
</style>
