<template>
  <el-sub-menu index="3">
    <template #title>
      <el-icon><CircleCheck /></el-icon>Tasks
    </template>
    <el-menu-item-group>
      <template #title>Group 1</template>
      <el-menu-item index="3-1">Option 1</el-menu-item>
      <el-menu-item index="3-2">Option 2</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="Group 2">
      <el-menu-item index="3-3">Option 3</el-menu-item>
    </el-menu-item-group>
    <el-sub-menu index="3-4">
      <template #title>Option 4</template>
      <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
    </el-sub-menu>
  </el-sub-menu>
</template>
<script setup lang="ts">
import { CircleCheck } from '@element-plus/icons-vue'
</script>
<style lang="scss" scoped></style>
