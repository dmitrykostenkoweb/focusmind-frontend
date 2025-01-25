<template>
  <header class="area-list__header">
    <h2>Areas</h2>
    <el-button
      round
      icon="Plus"
      type="primary"
      size="small"
      @click="interactionStore.openCreateDialog()"
      >Add</el-button
    >
  </header>
  <div class="grid-container">
    <card
      v-for="entity in areaApiStore.areas"
      :key="entity.id"
      :entity
      @edit="interactionStore.openEditDialog(entity)"
    />
  </div>
  <area-form />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAreaApiStore, useInteractionStore } from '@/stores'
import AreaForm from './AreaForm/AreaForm.vue'
import { Card } from '@/components/common'

const areaApiStore = useAreaApiStore()
const interactionStore = useInteractionStore()

onMounted(async () => await areaApiStore.fetchAreas())
</script>

<style scoped lang="scss">
.area-list {
  &__header {
    display: flex;
    align-items: baseline;
    gap: 16px;
  }
}
</style>
