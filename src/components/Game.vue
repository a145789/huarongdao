<script setup lang="ts">
import { useStore } from "@/store";
import { gameConfig } from "@/constants";
import { vTouch, Direction } from "@/directive";

const { currentLevelIndex, setIsShowLevel } = $(useStore());

const { layout: genLayout, name: gameName } = gameConfig[currentLevelIndex];

let layout = $ref(genLayout());
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

function handle(dir: Direction, index: number) {
  const { top, left, width, height } = layout[index];
  let newTop = top;
  let newLeft = left;
  switch (dir) {
    case Direction.UP:
      newTop = top - 60;
      break;
    case Direction.DOWN:
      newTop = top + 60;
      break;
    case Direction.LEFT:
      newLeft = left - 60;
      break;
    case Direction.RIGHT:
      newLeft = left + 60;
      break;

    default:
      break;
  }
  if (newTop < 0 || newTop >= 300 || newLeft < 0 || newLeft >= 240) {
    return;
  }

  if (
    layout.some(({ top: t, left: l, width: w, height: h }) => {
      switch (dir) {
        case Direction.UP:
          return (
            newLeft >= l && newLeft + w <= l + w && newTop < t && newTop < t + h
          );
        case Direction.DOWN:
          return (
            newLeft >= l && newLeft + w <= l + w && newTop > t && newTop + h > t
          );
        case Direction.LEFT:
          return (
            newTop >= t && newTop + h <= t + h && newLeft < l && newLeft < l + w
          );
        case Direction.RIGHT:
          return (
            newTop >= t && newTop + h <= t + h && newLeft > l && newLeft + w > l
          );

        default:
          return false;
      }
    })
  ) {
    return;
  }
  console.log(1);

  layout[index] = { ...layout[index], top: newTop, left: newLeft };
}
</script>

<template>
  <div>
    <h3 class="text-#549b70 text-center">{{ gameName }}</h3>
    <div class="w-240px h-300px border-4px border-#141e1b33 relative">
      <div
        v-for="(
          { name, top, left, width, height, backgroundColor }, index
        ) in layout"
        class="flex justify-center items-center font-20px absolute rounded-md box-border border-2px border-#9abeaf"
        :style="{
          top: genPx(top),
          left: genPx(left),
          width: genPx(width),
          height: genPx(height),
          backgroundColor,
        }"
        v-touch="(dir: Direction)=>handle(dir,index)"
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
  </div>
</template>
