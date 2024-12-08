<template>
  <el-sub-menu index="2">
    <template #title>
      <el-icon><List /></el-icon>Project
    </template>
    <el-menu-item-group>
      <template #title>Group 1</template>
      <el-menu-item index="2-1">Option 1</el-menu-item>
      <el-menu-item index="2-2">Option 2</el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="Group 2">
      <el-menu-item index="2-3">Option 3</el-menu-item>
    </el-menu-item-group>
    <el-sub-menu index="2-4">
      <template #title>Option 4</template>
      <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
    </el-sub-menu>
  </el-sub-menu>
</template>
<script setup lang="ts">
import { List } from '@element-plus/icons-vue'
</script>
<style lang="scss" scoped></style>
