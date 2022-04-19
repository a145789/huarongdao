<script setup lang="ts">
import { gameConfig } from "@/constants";
import { useStore } from "@/store";

const { setCurrentLevelIndex, setIsShowLevel } = useStore();

function setLevel(index: number) {
  setCurrentLevelIndex(index);
  setIsShowLevel(false);
}
</script>

<template>
  <div class="flex flex-wrap">
    <div
      class="cursor-pointer underline mr-6 mb-3 text-#5d655f text-18px"
      v-for="({ name }, index) in gameConfig"
      :key="name"
      @click="setLevel(index)"
    >
      {{ name }}
    </div>
  </div>
</template>
