import { defineStore } from "pinia";
import { reactive, toRefs } from "vue";

export const useStore = defineStore("Game", () => {
  const state = reactive({
    currentLevelIndex: 0,
    isShowLevel: true,
  });

  const setCurrentLevelIndex = (index: number) =>
    (state.currentLevelIndex = index);

  const setIsShowLevel = (bol: boolean) => (state.isShowLevel = bol);

  return {
    ...toRefs(state),
    setCurrentLevelIndex,
    setIsShowLevel,
  };
});
