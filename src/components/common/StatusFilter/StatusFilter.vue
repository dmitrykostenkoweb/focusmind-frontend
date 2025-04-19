<template>
  <el-checkbox-group class="status-filter" v-model="selectedStatuses">
    <el-checkbox v-for="status in statuses" :key="status.value" :label="status.value">
      {{ status.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script setup lang="ts">
import type { Status, StatusOption } from '@/models/shared.model'

interface Props {
  statuses: StatusOption[]
}

defineProps<Props>()
const selectedStatuses = defineModel<Status[]>({ required: true })
</script>

<style scoped>
.status-filter {
  margin-bottom: 1.5rem;
}
</style>
