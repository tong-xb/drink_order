<template>
  <nav class="background-base" :style="{ height: props.height }">
    <div class="outlineContent">
      <div class="outlineAmount">
        <div v-if="common.eyesOpen">$ {{ props.mount }}</div>
        <div v-if="!common.eyesOpen">
          <img src="@/assets/images/icon/eyes_diamond.png" />
          <img src="@/assets/images/icon/eyes_diamond.png" />
          <img src="@/assets/images/icon/eyes_diamond.png" />
        </div>
      </div>
      <div
        class="outlineDisplay"
        :class="{ active: common.eyesOpen }"
        @click="common.eyesOpen = !common.eyesOpen"
      ></div>
    </div>
  </nav>
</template>

<script setup>
import { useCommonStore } from '@/stores/common';

const common = useCommonStore();

const props = defineProps({
  height: {
    type: String,
    default: '6vh',
  },
  mount: {
    type: String,
    default: '0',
  },
});
</script>

<style lang="scss" scoped>
.background-base {
  background: #005bac;
  text-align: center;
  color: #ffffff;
  font-family: Arial, verdana, Times New Roman, 微軟正黑體, 新細明體;

  /* 標題 */
  .outlineContent {
    padding-top: 1vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    /* 金額 */
    .outlineAmount {
      font-size: 2em;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: calc(100vw - 2em); /*保留 2em 眼睛標示大小*/

      /* 隱藏金額 */
      display: flex;
      align-items: center;
      div {
        margin: 0 0.03em;
      }
      img {
        height: 0.55em;
        width: auto;
      }
    }
    /* 眼睛顯示按鈕 */
    .outlineDisplay {
      width: 1.5em;
      height: 1.5em;
      margin-left: 0.5em;
      align-content: center;
      background-image: url(@/assets/images/icon/eyes_close.png);
      background-size: cover;
      &.active {
        background-image: url(@/assets/images/icon/eyes_open.png);
      }
    }
  }
}
</style>
