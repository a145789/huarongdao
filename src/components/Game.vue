<script setup lang="ts">
import { useStore } from '@/store'
import { gameConfig } from '@/constants'
import { vTouch, Direction } from '@/directive'

const { currentLevelIndex, setIsShowLevel } = $(useStore())

const { layout: genLayout, name: gameName } = gameConfig[currentLevelIndex]

let layout = $ref(genLayout())
let step = $ref(0)

function backLevel() {
  setIsShowLevel(true)
}
function rest() {
  layout = genLayout()
  step = 0
}

function genPx(num: number) {
  return num + 'px'
}

function handle(dir: Direction, index: number) {
  const { top, left, width, height, name } = layout[index]
  let newTop = top
  let newLeft = left
  switch (dir) {
    case Direction.UP:
      newTop = top - 60
      break
    case Direction.DOWN:
      newTop = top + 60
      break
    case Direction.LEFT:
      newLeft = left - 60
      break
    case Direction.RIGHT:
      newLeft = left + 60
      break

    default:
      break
  }
  if (newTop < 0 || newTop >= 300 || newLeft < 0 || newLeft >= 240) {
    return
  }

  if (
    layout.some(({ top: t, left: l, width: w, height: h }, i) => {
      if (i === index) {
        return false
      }
      switch (dir) {
        case Direction.UP:
          return (
            top === t + h &&
            newTop < t + h &&
            ((newLeft >= l && newLeft + width <= l + w) ||
              (newLeft < l + w && newLeft + width > l))
          )
        case Direction.DOWN:
          return (
            top + height === t &&
            newTop + height > t &&
            ((newLeft >= l && newLeft + width <= l + w) ||
              (newLeft < l + w && newLeft + width > l))
          )
        case Direction.LEFT:
          return (
            left === l + w &&
            newLeft < l + w &&
            ((newTop >= t && newTop + height <= t + h) ||
              (newTop < t + h && newTop + height > t))
          )
        case Direction.RIGHT:
          return (
            left + width === l &&
            newLeft + width > l &&
            ((newTop >= t && newTop + height <= t + h) ||
              (newTop < t + h && newTop + height > t))
          )

        default:
          return false
      }
    })
  ) {
    return
  }

  layout[index] = { ...layout[index], top: newTop, left: newLeft }
  step++
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
        class="flex justify-center items-center font-20px absolute rounded-md box-border border-2px border-#9abeaf transition-all"
        :style="{
          top: genPx(top),
          left: genPx(left),
          width: genPx(width),
          height: genPx(height),
          backgroundColor
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
