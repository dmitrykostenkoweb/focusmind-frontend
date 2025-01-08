<template>
  <!--  v-loading="unsplashApiStore.loading"-->
  <el-dialog
    @click="unsplashInteractionStore.closeGalleryModal"
    v-model="unsplashInteractionStore.galleryVisible"
    title="Unsplash Photos"
    width="800"
  >
    <div class="gallery">
      <el-card
        v-for="photo in unsplashApiStore.photos"
        :key="photo.id"
        shadow="hover"
        @click="unsplashInteractionStore.setSelectedPhoto(photo)"
      >
        <el-image
          class="gallery__item-photo"
          :src="photo.urls.small"
          :alt="photo.alt_description"
          fit="cover"
        />
        <template #footer>
          <el-link :href="photo.user.links.html" target="_blank">{{ photo.user.username }}</el-link>
        </template>
      </el-card>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { useUnsplashInteractionStore, useUnsplashApiStore } from '@/stores'

const unsplashApiStore = useUnsplashApiStore()
const unsplashInteractionStore = useUnsplashInteractionStore()
</script>

<style scoped lang="scss">
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;

  &__item-photo {
    width: 200px;
    height: 200px;
    border-radius: 2px;
  }
}

:deep(.el-card__body) {
  padding: 4px;
}
:deep(.el-card__footer) {
  padding: 4px;
}
:deep(.el-card) {
  width: fit-content;
}
</style>
