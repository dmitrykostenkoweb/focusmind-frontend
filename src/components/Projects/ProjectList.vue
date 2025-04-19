<template>
  <el-collapse-item name="project">
    <template #title>
      <header class="project-list__header">
        <h2>Projects <el-badge :value="projectApiStore.projects.length" /></h2>
        <el-button
          plain
          icon="Plus"
          size="small"
          @click.stop="interactionStore.openCreateDialog('project')"
          >Add new project</el-button
        >
      </header>
    </template>
    <status-filter v-model="selectedStatuses" :statuses="statuses" />
    <div class="grid-container">
      <card-component
        v-for="entity in projectApiStore.projects"
        :key="entity.id"
        :entity
        @edit="interactionStore.openEditDialog(entity, 'project')"
      />
    </div>
  </el-collapse-item>
  <project-form v-if="interactionStore.entityType === 'project'" />
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useInteractionStore } from '@/stores/interaction/interactionStore'
import { useProjectApiStore } from '@/stores/project/projectApiStore'
import CardComponent from '@/components/common/CardComponent/CardComponent.vue'
import ProjectForm from './ProjectForm.vue'
import StatusFilter from '@/components/common/StatusFilter/StatusFilter.vue'
import { statusesOptions } from '@/constants'
import type { StatusOption, Status } from '@/models/shared.model'

const projectApiStore = useProjectApiStore()
const interactionStore = useInteractionStore()

const selectedStatuses = ref<Status[]>(['InProgress'])
const statuses = ref<StatusOption[]>(statusesOptions)

watch(selectedStatuses, async (newStatuses) => {
  await projectApiStore.fetchProjects(newStatuses)
})

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
