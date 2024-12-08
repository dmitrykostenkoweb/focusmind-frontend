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
import { AppAsideArea, AppAsideProject, AppAsideTask } from './AppAsideNodes'
</script>

<style scoped></style>
