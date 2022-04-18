<script setup lang="ts">
import Game from "./components/Game.vue";
import Level from "./components/Level.vue";
import { useStore } from "@/store";

const { isShowLevel } = $(useStore());
</script>

<template>
  <div class="h-full w-full flex justify-center">
    <div class="m-42px mt-110px">
      <h2 class="text-center text-#229453">华容道</h2>
      <Level v-if="isShowLevel" />
      <Game v-else />
    </div>
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
  width: 100%;
}

#app {
  background-color: #9abeaf;
}
</style>
