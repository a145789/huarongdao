<script setup lang="ts">
import { gameConfig } from '@/constants'
import { useStore } from '@/store'

const { setCurrentLevelIndex, setIsShowLevel } = useStore()

function setLevel(index: number) {
  setCurrentLevelIndex(index)
  setIsShowLevel(false)
}
</script>

<template>
  <div>
    <div class="flex flex-wrap">
      <div
        class="cursor-pointer underline mr-6 mb-3 text-#5d655f dark:text-#d1d5db text-18px"
        v-for="({ name }, index) in gameConfig"
        :key="name"
        @click="setLevel(index)"
      >
        {{ name }}
      </div>
    </div>
    <div class="mt-20px dark:text-#d1d5db text-center">v1.0.0</div>
  </div>
</template>
