<template>
  <main>
    <el-collapse v-model="activeNames">
      <area-list />
      <project-list />
      <task-list />
    </el-collapse>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AreaList from '@/components/Areas/AreaList.vue'
import ProjectList from '@/components/Projects/ProjectList.vue'
import TaskList from '@/components/Tasks/TaskList.vue'
import type { EntityType } from '@/models/entity.model'

const activeNames = ref<EntityType[]>(['area', 'project', 'task'])
</script>
