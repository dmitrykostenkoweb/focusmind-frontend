<template>
  <div class="random-photo">
    <div class="random-photo__header-logo">
      <icon-unsplash />
      <el-link :underline="false" href="https://unsplash.com/" target="_blank"> Unsplash </el-link>
    </div>
    <div class="random-photo__header-search">
      <el-button size="small" @click="getRandomPhoto">Get Random</el-button>
      <!---->
      <el-input
        v-if="searchVisible"
        ref="searchInputRef"
        v-model="searchQuery"
        size="small"
        @keyup.enter="handleSearchConfirm"
        @blur="handleSearchConfirm"
        class="random-photo__header-search-input"
      />
      <el-button
        v-else
        size="small"
        @click="showSearchInput"
        class="random-photo__header-search-button"
      >
        Search
      </el-button>
    </div>

    <el-image
      v-if="url"
      :src="url"
      :alt="altDescription"
      fit="cover"
      style="width: 100%; height: 200px; border-radius: 2px"
    />
    <div class="random-photo__footer">
      <p v-if="photoAuthorLink">
        Photo by:
        <el-link :href="photoAuthorLink" target="_blank">{{ photoAuthorName }}</el-link>
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { IconUnsplash } from '@/components/icons'
import { useUnsplashApiStore, useUnsplashInteractionStore } from '@/stores'
import type { Photo } from '@/models'
import type { InputInstance } from 'element-plus'

const url = defineModel<string>()

const unsplashApiStore = useUnsplashApiStore()
const unsplashInteractionStore = useUnsplashInteractionStore()

const searchInputRef = ref<InputInstance>()
const searchVisible = ref<boolean>(false)
const searchQuery = ref<string>('')

const photoAuthorLink = computed<string>(
  () => unsplashInteractionStore.selectedPhoto?.user.links.html || '',
)
const photoAuthorName = computed<string>(
  () => unsplashInteractionStore.selectedPhoto?.user.username || '',
)
const altDescription = computed<string>(
  () => unsplashInteractionStore.selectedPhoto?.alt_description || '',
)

const searchPhotos = async (): Promise<void> => {
  await unsplashApiStore.fetchPhotos(searchQuery.value)
}

const getRandomPhoto = async (): Promise<void> => {
  await unsplashApiStore.fetchRandomPhoto()
}

const showSearchInput = (): void => {
  searchVisible.value = true
  nextTick(() => {
    searchInputRef.value!.input!.focus()
  })
}

const handleSearchConfirm = (): void => {
  if (searchQuery.value) searchPhotos()

  searchVisible.value = false
  searchQuery.value = ''
}

watch(
  (): Photo | null => unsplashInteractionStore.selectedPhoto,
  (p) => {
    if (p) url.value = p.urls.regular
  },
)

onUnmounted(() => unsplashInteractionStore.clearSelectedPhoto())
</script>
<style lang="scss" scoped>
.random-photo {
  display: flex;
  flex-direction: column;
  gap: 8px;

  &__header-logo {
    display: flex;
    gap: 16px;
    align-items: baseline;
  }

  &__footer {
    width: 100%;
    justify-content: space-between;
    display: flex;
  }

  &__header-search {
    display: flex;
    gap: 8px;
  }

  &__header-search-input {
    width: 100%;
  }

  &__header-search-button {
    width: 100%;
  }
}
</style>
