<template>
  <el-card class="unsplash-trigger" shadow="never">
    <template #header>
      <div class="unsplash-trigger__header">
        <div class="unsplash-trigger__header-logo">
          <icon-unsplash />
          <el-link :underline="false" href="https://unsplash.com/" target="_blank">
            Unsplash
          </el-link>
        </div>
        <p v-if="photoAuthorLink">
          Photo by:
          <el-link :href="photoAuthorLink" target="_blank">{{ photoAuthorName }}</el-link>
        </p>
      </div>
    </template>

    <template #default>
      <el-image
        v-if="url"
        :src="url"
        :alt="unsplashInteractionStore.selectedPhoto?.alt_description || ''"
        fit="cover"
        style="width: 100%; height: 200px; border-radius: 2px"
      />
    </template>

    <template #footer>
      <el-input v-model="searchQuery" style="width: 300px" placeholder="Search photos..." />
      <el-button :disabled="!searchQuery" @click="searchPhotos" @keydown.enter="searchPhotos">
        Search
      </el-button>
      <el-button @click="getRandomPhoto">Get Random</el-button>
    </template>
  </el-card>
  <unsplash-gallery />
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { useUnsplashApiStore, useUnsplashInteractionStore } from '@/stores'
import { IconUnsplash } from '@/components/icons'
import UnsplashGallery from './UnsplashGallery.vue'

const url = defineModel<string>()

const unsplashApiStore = useUnsplashApiStore()
const unsplashInteractionStore = useUnsplashInteractionStore()

const searchQuery = ref('')

const photoAuthorLink = computed<string | null>(
  () => unsplashInteractionStore.selectedPhoto?.user.links.html || null,
)

const photoAuthorName = computed<string>(
  () => unsplashInteractionStore.selectedPhoto?.user.username || '',
)

const searchPhotos = async (): Promise<void> => {
  await unsplashApiStore.fetchPhotos(searchQuery.value)
}

const getRandomPhoto = async (): Promise<void> => {
  await unsplashApiStore.fetchRandomPhoto()
}

watch(
  () => unsplashInteractionStore.selectedPhoto,
  (newValue) => {
    if (newValue) url.value = newValue.urls.regular
  },
)

onUnmounted(() => unsplashInteractionStore.clearSelectedPhoto())
</script>
<style scoped lang="scss">
.unsplash-trigger {
  width: 100%;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__header-logo {
    display: flex;
    gap: 16px;
    align-items: baseline;
  }
}

:deep(.el-card__header) {
  padding: 0 8px;
}
</style>
