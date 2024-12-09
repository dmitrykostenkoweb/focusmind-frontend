<template>
  <div class="grid-container">
    <area-card class="grid-item" v-for="area in areas" :key="area.areaid" :area />
    <area-add-card @create="create" />
  </div>
  <area-form-dialog :area="updatedArea" :form-mode :dialog-visible />
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGetAllAreas } from './composables'
import AreaAddCard from './AreaCard/AreaAddCard.vue'
import AreaCard from './AreaCard/AreaCard.vue'
import AreaFormDialog from './AreaFrom/AreaFormDialog.vue'
import type { Area } from '@/models'

const { get, data: areas } = useGetAllAreas()

const formMode = ref<'create' | 'update'>('create')

const dialogVisible = ref<boolean>(false)
const updatedArea = ref<Area | null>(null)

const create = (): void => {
  updatedArea.value = null
  dialogVisible.value = true
  formMode.value = 'create'
}

onMounted(get)
</script>
<style lang="scss" scoped>
.grid-container {
  padding: 16px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 300px);
  gap: 16px;
}
</style>
