<template>
  <el-dialog
    v-model="areaInteractionStore.dialogVisible"
    title="Tips"
    width="500"
    :before-close="emit('close')"
  >
    <area-form />
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="emit('close')">Cancel</el-button>
        <el-button type="primary" @click="emit('confirm')"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import { useAreaInteractionStore } from '@/stores'
import AreaForm from '@/components/Areas/AreaFrom/AreaForm.vue'

const areaInteractionStore = useAreaInteractionStore()

interface Emits {
  (e: 'close'): void
  (e: 'confirm'): void
}

const emit = defineEmits<Emits>()
</script>
