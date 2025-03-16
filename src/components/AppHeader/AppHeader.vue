<template>
  <div class="app-header">
    <div class="app-header__logo">
      <icon-logo />
      <p>focusmind</p>
    </div>
    <app-menu />
  </div>
</template>
<script setup lang="ts">
import IconLogo from '@/components/icons/IconLogo.vue'
import AppMenu from '@/components/AppMenu/AppMenu.vue'
</script>
<style scoped lang="scss">
.app-header {
  display: flex;
  align-items: center;
  gap: 16px;
  border-radius: 4px;

  &__logo {
    display: flex;
    align-items: center;
    font-weight: bold;
    gap: 4px;
  }
}
</style>
