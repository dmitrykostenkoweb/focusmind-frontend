<template>
  <el-card class="area-card">
    <template #header>Click the Add button to create a new Area</template>
    <div class="area-card__content">
      <p class="area-card__description">
        An Area is a category like "Health & Fitness" or "Education" that helps you organize related
        projects and tasks.
      </p>
      <el-button type="primary" size="large" round @click="emit('create')">Add</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
interface Emits {
  (emit: 'create'): void
}

const emit = defineEmits<Emits>()
</script>
<style scoped lang="scss">
.area-card {
  max-width: 480px;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  &__description {
    width: 100%;

    color: var(--el-text-color-secondary);
  }
}
</style>
