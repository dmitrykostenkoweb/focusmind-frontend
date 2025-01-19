<template>
  <div>
    <h2>Areas</h2>
    <div class="grid-container">
      <area-card
        v-for="area in areaApiStore.areas"
        :key="area.id"
        :area
        @edit="areaInteractionStore.openEditDialog(area)"
      />
      <area-add-card @create="areaInteractionStore.openCreateDialog()" />
    </div>
  </div>
  <el-dialog v-model="areaInteractionStore.dialogVisible" :title="modalTitle" width="600">
    <area-form />
  </el-dialog>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAreaApiStore, useAreaInteractionStore } from '@/stores'
import AreaAddCard from './AreaCard/AreaAddCard.vue'
import AreaCard from './AreaCard/AreaCard.vue'
import AreaForm from './AreaForm/AreaForm.vue'

const areaApiStore = useAreaApiStore()
const areaInteractionStore = useAreaInteractionStore()

const modalTitle = computed<string>(() =>
  areaInteractionStore.formMode === 'create'
    ? 'Create New Area'
    : `Edit Area: ${areaInteractionStore.selectedArea?.name || ''}`,
)

onMounted(async () => await areaApiStore.fetchAreas())
</script>
