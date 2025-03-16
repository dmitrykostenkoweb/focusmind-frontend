<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <app-header />
      </el-header>
      <el-container>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader/AppHeader.vue'
</script>
