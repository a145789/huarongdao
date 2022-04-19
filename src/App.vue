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
      <Transition appear name="fade" mode="out-in">
        <Level v-if="isShowLevel" />
        <Game v-else />
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

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
