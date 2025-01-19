<template>
  <el-card class="project-card">
    <template #header>Click the Add button to create a new Project</template>
    <div class="project-card__content">
      <p class="project-card__description">
        A project is a collection of tasks that help you achieve a specific goal. For example,
        "Learn to play the guitar" or "Build a website."
      </p>
      <el-button round icon="Plus" type="primary" size="large" @click="emit('create')">
        Add
      </el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
interface Emits {
  (emit: 'create'): void
}

const emit = defineEmits<Emits>()
</script>
