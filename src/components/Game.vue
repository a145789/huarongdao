<script setup lang="ts">
import { useStore } from "@/store";
import { gameConfig } from "@/constants";

const { currentLevelIndex, setIsShowLevel } = $(useStore());

const { layout: genLayout, name: gameName } = gameConfig[currentLevelIndex];

let layout = $ref(genLayout());
console.log(layout);
let step = $ref(0);

function backLevel() {
  setIsShowLevel(true);
}
function rest() {
  layout = genLayout();
  step = 0;
}

function genPx(num: number) {
  return num + "px";
}
</script>

<template>
  <h3 class="text-#45b787 text-center">{{ gameName }}</h3>
  <div class="w-240px h-300px border-4px border-#141e1b33 relative">
    <div
      v-for="{ name, top, left, width, height, backgroundColor } in layout"
      class="flex justify-center items-center font-20px absolute rounded-md box-border border-2px border-#9abeaf"
      :style="{
        top: genPx(top),
        left: genPx(left),
        width: genPx(width),
        height: genPx(height),
        backgroundColor,
      }"
    >
      {{ name }}
    </div>
    <div class="absolute w-120px h-4px -bottom-4px left-60px bg-#9abeaf" />
  </div>
  <div class="flex justify-around mt-2">
    <div>步数：{{ step }}</div>
    <div class="cursor-pointer underline" @click="rest">重置</div>
    <div class="cursor-pointer underline" @click="backLevel">返回关卡</div>
  </div>
</template>
