<template>
  <add-form-dialog
    :mode
    :loading
    :modalTitle
    :entity="area"
    v-model:visible="interactionStore.dialogVisible"
    @close="closeDialog"
    @submit="onSubmit"
    @delete="deleteAreaHandler"
  />
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { AddFormDialog } from '@/components/common'
import { useInteractionStore } from '@/stores'

const interactionStore = useInteractionStore()
const mode = computed<'create' | 'update'>(() => interactionStore.formMode)
</script>
