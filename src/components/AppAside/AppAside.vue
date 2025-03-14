<template>
  <el-aside width="200px">
    <el-scrollbar>
      <el-menu :default-openeds="['1', '3']">
        <app-aside-area />
        <app-aside-project />
        <app-aside-task />
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts" setup>
import AppAsideArea from './AppAsideNodes/AppAsideArea.vue'
import AppAsideProject from './AppAsideNodes/AppAsideProject.vue'
import AppAsideTask from './AppAsideNodes/AppAsideTask.vue'
</script>

<style scoped></style>
