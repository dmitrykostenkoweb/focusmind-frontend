<template>
  <el-collapse-item name="area">
    <template #title>
      <header class="area-list__header">
        <h2>Areas <el-badge :value="areaApiStore.areas.length" /></h2>
        <el-button
          plain
          icon="Plus"
          size="small"
          @click.stop="interactionStore.openCreateDialog('area')"
          >Add new area</el-button
        >
      </header>
    </template>
    <div class="grid-container">
      <card-component
        v-for="entity in areaApiStore.areas"
        :key="entity.id"
        :entity
        @edit="interactionStore.openEditDialog(entity, 'area')"
      />
    </div>

    <area-form v-if="interactionStore.entityType === 'area'" />
  </el-collapse-item>
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
