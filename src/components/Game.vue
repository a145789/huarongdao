<script setup lang="ts">
import { useStore } from "@/store"
import { gameConfig } from "@/constants"
import vTouchdir, { Direction } from "vtouchdir"

const { currentLevelIndex, setIsShowLevel } = $(useStore())

const { layout: genLayout, name: gameName } = gameConfig[currentLevelIndex]

let realLayout = $ref(genLayout())
let step = $ref(0)
let visible = $ref(false)

function backLevel() {
  setIsShowLevel(true)
}
function rest() {
  realLayout = genLayout()
  step = 0
}

function modalHandle(type: "rest" | "backLevel") {
  if (type === "rest") {
    rest()
  } else {
    backLevel()
  }

  visible = false
}

function genPx(num: number) {
  return num + "px"
}

function judgeIsWin(
  dir: Direction,
  index: number,
  layout: ReturnType<typeof genLayout>
) {
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
  if (
    newTop < 0 ||
    newTop + height > 300 ||
    newLeft < 0 ||
    newLeft + width > 240
  ) {
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

  if (name === "曹操" && newTop === 180 && newLeft === 60) {
    return {
      top: newTop,
      left: newLeft,
      isWin: true,
    }
  } else {
    return {
      top: newTop,
      left: newLeft,
      isWin: false,
    }
  }
}

function touchHandle(dir: Direction, index: number) {
  const result = judgeIsWin(dir, index, realLayout)
  if (result) {
    const { isWin, top, left } = result
    realLayout[index] = { ...realLayout[index], top, left }
    step++
    if (isWin) {
      setTimeout(() => {
        visible = true
      }, 200)
    }
  }
}

function hook() {}

function test() {
  let i = 0
  while (i < 400) {
    const index = Math.floor(Math.random() * realLayout.length)
    const result = [
      judgeIsWin(Direction.UP, index, realLayout),
      judgeIsWin(Direction.DOWN, index, realLayout),
      judgeIsWin(Direction.LEFT, index, realLayout),
      judgeIsWin(Direction.RIGHT, index, realLayout),
    ].filter((item) => item) as {
      top: number
      left: number
      isWin: boolean
    }[]
    if (!result.length) {
      continue
    } else {
      for (const iterator of result) {
        const { isWin, top, left } = iterator
        realLayout[index] = { ...realLayout[index], top, left }
       
      }
    }
    i++
  }
}
</script>

<template>
  <div>
    <h3 class="text-#549b70 dark:text-#d1d5db text-center">{{ gameName }}</h3>
    <div
      class="w-240px h-300px border-4px border-#141e1b33 dark:border-#0d8e66 relative transition duration-700"
    >
      <div
        v-for="(
          { name, top, left, width, height, backgroundColor }, index
        ) in realLayout"
        class="flex justify-center items-center font-20px absolute rounded-md box-border border-2px border-#9abeaf dark:border-#141e1b transition-all"
        :style="{
          top: genPx(top),
          left: genPx(left),
          width: genPx(width),
          height: genPx(height),
          backgroundColor,
        }"
        v-touchdir.prevent="(dir: Direction) => touchHandle(dir, index)"
      >
        {{ name }}
      </div>
      <div
        class="absolute w-120px h-4px -bottom-4px left-60px bg-#9abeaf dark:bg-#141e1b transition duration-700"
      />
    </div>
    <div class="flex justify-around mt-2 dark:text-#eee">
      <div>步数：{{ step }}</div>
      <div class="cursor-pointer underline" @click="rest">重置</div>
      <div class="cursor-pointer underline" @click="backLevel">返回关卡</div>
    </div>

    <!-- Modal -->
    <Teleport to="body">
      <Transition name="fade" mode="out-in">
        <div
          class="fixed h-full w-full top-0 z-50 overflow-hidden"
          v-show="visible"
        >
          <div class="absolute h-full w-full bg-gray-600 opacity-75" />
          <div class="absolute h-full w-full flex items-center justify-center">
            <div
              class="bg-#9abeaf dark:bg-#141e1b rounded-lg shadow-xl px-6 py-6 overflow-hidden"
            >
              <h3 class="text-#549b70 dark:text-#d1d5db text-center">
                恭喜你，通关{{ gameName }}！
              </h3>
              <div
                class="text-#229453 dark:text-#d1d5db mt-8 text-center font-bold"
              >
                仅用了 {{ step }} 步，太厉害了。
              </div>
              <div
                class="text-#229453 dark:text-#d1d5db mt-4 text-center w-200px"
              >
                Give 朱浩: hope you happy everyday !!!
              </div>
              <div class="mt-12 flex justify-around">
                <div
                  class="cursor-pointer underline dark:text-#eee"
                  @click="modalHandle('rest')"
                >
                  重置
                </div>
                <div
                  class="cursor-pointer underline dark:text-#eee"
                  @click="modalHandle('backLevel')"
                >
                  返回关卡
                </div>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
