<template>
  <div>
    <h2>Projects</h2>
    <div class="grid-container">
      <project-card
        class="grid-item"
        v-for="project in projectApiStore.projects"
        :key="project.id"
        :project
        @edit="projectInteractionStore.openEditDialog(project)"
      />
      <project-add-card @create="projectInteractionStore.openCreateDialog()" />
    </div>
  </div>
  <el-dialog v-model="projectInteractionStore.dialogVisible" :title="modalTitle" width="600">
    <!--    <project-form />-->
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'
import { useProjectApiStore, useProjectInteractionStore } from '@/stores'
import ProjectCard from './ProjectCard/ProjectCard.vue'
import ProjectAddCard from './ProjectCard/ProjectAddCard.vue'

const projectApiStore = useProjectApiStore()
const projectInteractionStore = useProjectInteractionStore()

const modalTitle = computed<string>(() =>
  projectInteractionStore.formMode === 'create'
    ? 'Create New Project'
    : `Edit Project: ${projectInteractionStore.selectedProject?.name || ''}`,
)

onMounted(async () => await projectApiStore.fetchProjects())
</script>
