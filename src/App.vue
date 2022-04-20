<script setup lang="ts">
import Game from "./components/Game.vue";
import Level from "./components/Level.vue";
import { WeatherSunny16Regular, WeatherMoon28Filled } from "@vicons/fluent";
import { Icon } from "@vicons/utils";

import { useStore } from "@/store";

const { isShowLevel } = $(useStore());
let isDark = $ref(false);
</script>

<template>
  <div class="h-full w-full" :class="{ dark: isDark }">
    <div
      class="h-full w-full flex justify-center relative bg-#9abeaf dark:bg-#141e1b transition duration-700"
    >
      <div class="m-42px mt-110px">
        <h2 class="text-center text-#229453 dark:text-#d17525">华容道</h2>
        <Transition appear name="fade" mode="out-in">
          <Level v-if="isShowLevel" />
          <Game v-else />
        </Transition>
      </div>

      <Icon
        class="absolute top-10 right-10"
        size="36"
        :color="isDark ? '#fff' : '#ddd '"
        @click="isDark = !isDark"
      >
        <Transition name="fade" mode="out-in">
          <WeatherMoon28Filled v-if="!isDark" />
          <WeatherSunny16Regular v-else="isDark" />
        </Transition>
      </Icon>
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
</style>
