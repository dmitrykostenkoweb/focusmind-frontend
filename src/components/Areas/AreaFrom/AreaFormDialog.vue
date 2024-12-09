<template>
  <el-dialog v-model="dialogVisible" title="Tips" width="500" :before-close="handleClose">
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import AreaForm from './AreaForm.vue'
import type { Area } from '@/models'

interface Props {
  area: Area | null
  formMode: 'create' | 'update'
}

defineProps<Props>()

const dialogVisible = defineModel<boolean>({
  default: false,
})
</script>
