<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <app-header />
      </el-header>
      <el-container>
        <app-aside />
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppAside from '@/components/AppAside'
import AppHeader from '@/components/AppHeader'
</script>
<style scoped lang="scss">
.app {
  &__header {
    display: flex;
    align-items: center;
    font-weight: bold;
  }
}
</style>
