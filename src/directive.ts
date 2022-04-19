import type { Directive } from "vue";

export const enum Direction {
  LEFT,
  RIGHT,
  UP,
  DOWN,
}

const ctxKey = Symbol(`_cDt_${Math.random().toString().slice(4)}`);

interface CustomHTMLElement extends HTMLElement {
  [ctxKey]: {
    startPageX: number;
    startPageY: number;
    startTarget: HTMLElement | null;
    handler: ((direction: Direction) => void) | null;
  } | null;
}

function touchStartHandle(e: TouchEvent) {
  const { target, touches } = e;
  if (touches.length !== 1) {
    return;
  }
  e.preventDefault();
  const option = (target as CustomHTMLElement)[ctxKey];
  option!.startPageX = Math.round(touches[0].pageX);
  option!.startPageY = Math.round(touches[0].pageY);
}
function touchEndHandle(e: TouchEvent) {
  const { changedTouches, target } = e;
  if (changedTouches.length !== 1) {
    return;
  }
  e.preventDefault();
  const { startTarget, startPageX, startPageY, handler } = (
    target as CustomHTMLElement
  )[ctxKey]!;
  if (!startTarget || target !== startTarget) {
    return;
  }
  const endPageX = Math.round(changedTouches[0].pageX);
  const endPageY = Math.round(changedTouches[0].pageY);
  const deltaX = endPageX - startPageX;
  const deltaY = endPageY - startPageY;
  if (Math.abs(deltaY) < 10 && Math.abs(deltaX) < 10) {
    return;
  }
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      // 向右滑动
      handler?.(Direction.RIGHT);
    } else {
      // 向左滑动
      handler?.(Direction.LEFT);
    }
  } else {
    if (deltaY > 0) {
      // 向下滑动
      handler?.(Direction.DOWN);
    } else {
      // 向上滑动
      handler?.(Direction.UP);
    }
  }
}
export const vTouch: Directive<
  CustomHTMLElement,
  (direction: Direction) => void
> = {
  mounted(el, binding) {
    if (!el[ctxKey]) {
      el[ctxKey] = {
        startPageX: 0,
        startPageY: 0,
        startTarget: el,
        handler: binding.value,
      };
    }
    el.addEventListener("touchstart", touchStartHandle);
    el.addEventListener("touchend", touchEndHandle);
  },
  beforeUnmount(el) {
    el.removeEventListener("touchstart", touchStartHandle);
    el.removeEventListener("touchend", touchEndHandle);
    el[ctxKey] = null;
  },
};
