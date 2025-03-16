<template>
  <header class="area-list__header">
    <h2>Areas</h2>
    <el-button plain icon="Plus" size="small" @click="interactionStore.openCreateDialog('area')"
      >Add new area</el-button
    >
  </header>
  <div class="grid-container">
    <card-component
      v-for="entity in areaApiStore.areas"
      :key="entity.id"
      :entity
      @edit="interactionStore.openEditDialog(entity, 'area')"
    />
  </div>
  <area-form v-if="interactionStore.entityType === 'area'" />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useAreaApiStore } from '@/stores/area/areaApiStore'
import { useInteractionStore } from '@/stores/interaction/interactionStore'
import AreaForm from './AreaForm.vue'
import CardComponent from '@/components/common/CardComponent/CardComponent.vue'

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
