<template>
  <header class="area-list__header">
    <h2>Areas</h2>
    <el-button
      round
      icon="Plus"
      type="primary"
      size="small"
      @click="areaInteractionStore.openCreateDialog()"
      >Add</el-button
    >
  </header>
  <div class="grid-container">
    <area-card
      v-for="area in areaApiStore.areas"
      :key="area.id"
      :area
      @edit="areaInteractionStore.openEditDialog(area)"
    />
  </div>
  <area-form />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAreaApiStore, useAreaInteractionStore } from '@/stores'
import AreaCard from './AreaCard/AreaCard.vue'
import AreaForm from './AreaForm/AreaForm.vue'

const areaApiStore = useAreaApiStore()
const areaInteractionStore = useAreaInteractionStore()

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
