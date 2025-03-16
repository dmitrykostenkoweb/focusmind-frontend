<template>
  <el-menu class="menu" mode="horizontal">
    <el-sub-menu
      v-for="(area, areaIndex) in areaApiStore.areas"
      :key="area.id"
      :index="`${areaIndex}`"
    >
      <template #title>
        <el-image class="menu__title-cover" lazy :src="area.imageUrl" fit="cover">
          <template #error>
            <el-icon class="menu__title-cover-error-icon"><Compass /></el-icon>
          </template>
        </el-image>
        <span>{{ area.name }}</span>
      </template>
      <el-sub-menu
        v-for="(project, projectIndex) in projectApiStore.getProjectsByAreaId(area.id)"
        :key="project.id"
        :index="`${areaIndex}-${projectIndex}`"
      >
        <template #title>
          <el-image class="menu__title-cover" lazy :src="project.imageUrl" fit="cover">
            <template #error>
              <el-icon class="menu__title-cover-error-icon"><List /></el-icon>
            </template>
          </el-image>
          <span>{{ project.name }}</span>
        </template>
        <el-menu-item
          v-for="(task, taskIndex) in taskApiStore.getTasksByProjectId(project.id)"
          :key="task.id"
          :index="`${areaIndex}-${projectIndex}-${taskIndex}`"
        >
          <template #title>
            <el-image class="menu__title-cover" lazy :src="task.imageUrl" fit="cover">
              <template #error>
                <el-icon class="menu__title-cover-error-icon"><CircleCheck /></el-icon>
              </template>
            </el-image>
            <span>{{ task.name }}</span>
          </template>
        </el-menu-item>
        <el-menu-item>
          <el-button
            style="width: 100%"
            plain
            icon="Plus"
            size="small"
            @click="interactionStore.openCreateWithProjectDialog('task', project.id)"
            >Add new task</el-button
          >
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item>
        <el-button
          style="width: 100%"
          plain
          icon="Plus"
          size="small"
          @click="interactionStore.openCreateWithAreaDialog('project', area.id)"
          >Add new project</el-button
        >
      </el-menu-item>
    </el-sub-menu>
    <el-menu-item>
      <el-button
        style="width: 100%"
        plain
        icon="Plus"
        size="small"
        @click="interactionStore.openCreateDialog('area')"
        >Add new area</el-button
      >
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { useProjectApiStore } from '@/stores/project/projectApiStore'
import { useAreaApiStore } from '@/stores/area/areaApiStore'
import { useTaskApiStore } from '@/stores/task/taskApiStore'
import { useInteractionStore } from '@/stores/interaction/interactionStore'

const areaApiStore = useAreaApiStore()
const projectApiStore = useProjectApiStore()
const taskApiStore = useTaskApiStore()
const interactionStore = useInteractionStore()
</script>

<style scoped lang="scss">
.menu {
  width: 100%;
  border-color: transparent;

  &__title-cover {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
    object-fit: contain;
  }

  &__title-cover-error-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
}
</style>
