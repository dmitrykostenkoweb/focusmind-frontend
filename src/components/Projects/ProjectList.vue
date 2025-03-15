<template>
  <header class="project-list__header">
    <h2>Projects</h2>
    <el-button
      round
      icon="Plus"
      type="primary"
      size="small"
      @click="interactionStore.openCreateDialog('project')"
      >Add</el-button
    >
  </header>
  <div class="grid-container">
    <card-component
      v-for="entity in projectApiStore.projects"
      :key="entity.id"
      :entity
      @edit="interactionStore.openEditDialog(entity, 'project')"
    />
  </div>
  <project-form v-if="interactionStore.formType === 'project'" />
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useInteractionStore } from '@/stores/interaction/interactionStore'
import { useProjectApiStore } from '@/stores/project/projectApiStore'
import CardComponent from '@/components/common/CardComponent/CardComponent.vue'
import ProjectForm from './ProjectForm/ProjectForm.vue'
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
