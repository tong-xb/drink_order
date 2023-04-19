<template>
  <div class="box-container">
    <div class="flex-vh-center" v-show="!cardData.cardVisible" :style="{ height: '40px' }">
      <div class="loader"></div>
    </div>
    <div v-show="cardData.cardVisible">
      <div class="box-top">
        <div class="left">
          <IconHeaderSign :icon-color="cardData.color" />
          <div class="font-bold title" v-html="cardData.assetName"></div>
          <IconOpenClose
            :one-transform="openCloseTransform.one"
            :two-transform="openCloseTransform.two"
            @click.stop="svgOpenClose()"
          />
        </div>
        <div class="font-size-16px right">
          <div v-if="statusData.status === 'ERROR'" class="color-dove-gray">
            {{ statusData.errorMessage }}
          </div>
          <div v-if="!cardData.authorized && statusData.status !== 'ERROR'" class="color-dove-gray">
            {{ cardData.assetSumFormat }}
          </div>
          <a v-if="cardData.authorized && statusData.status !== 'ERROR'" @click.stop href="" target="_blank"
            >立即授權</a
          >
          <div v-if="statusData.status !== 'ERROR'" class="w-4"></div>
          <IconArrowRight v-if="statusData.status !== 'ERROR'" stroke-color="#323232" />
        </div>
      </div>
      <div class="py-1" v-show="cardData.cardBottomVisible">
        <div class="box-bottom font-size-14px color-dove-gray" v-for="item in cardData.cardBottomList" :key="item.name">
          <div class="left">
            <div class="w-6"></div>
            <IconDot :icon-color="cardData.color" />
            <div class="w-2"></div>
            <div>{{ item.name }}</div>
          </div>
          <div class="right">
            <div v-if="item.type === 'number'">{{ item.numberFormat }}</div>
            <div :style="{ color: item.percentageColor }" v-if="item.type === 'percentage'">
              {{ item.formattedPercentage }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconHeaderSign from '@/components/icons/IconHeaderSign.vue';
import IconOpenClose from '@/components/icons/IconOpenClose.vue';
import IconArrowRight from '@/components/icons/IconArrowRight.vue';
import IconDot from '@/components/icons/IconDot.vue';

import { reactive, computed, watch } from 'vue';
import { useAssetsStore } from '@/stores/assets';

const assetsStore = useAssetsStore();

const statusData = assetsStore.assetsObject.statusData;

const props = defineProps({
  cardVisible: {
    type: Boolean,
    default: false,
  },
  cardBottomVisible: {
    type: Boolean,
    default: false,
  },
  color: {
    type: String,
    default: 'currentColor',
  },
  assetName: {
    type: String,
    default: '',
  },
  assetSumFormat: {
    type: String || Number,
    default: '',
  },
  cardBottomList: {
    type: Array,
    default: () => [],
  },
  authorized: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(['update:cardBottomVisible']);

//card 資料設定
const cardData = reactive({
  color: props.color,
  assetName: computed(() => {
    return props.assetName;
  }),
  assetSumFormat: computed(() => {
    return props.assetSumFormat;
  }),
  authorized: computed(() => {
    return props.authorized;
  }),
  cardVisible: computed(() => {
    return props.cardVisible;
  }),
  cardBottomVisible: computed({
    get() {
      return props.cardBottomVisible;
    },
    set(newValue) {
      emit('update:cardBottomVisible', newValue);
    },
  }),
  cardBottomList: props.cardBottomList,
});

//開關預設
const openCloseTransform = reactive({
  one: 'translate(0 8)',
  two: 'translate(13 5) rotate(180)',
});

//監聽下方區塊是否顯示後的開關調整
watch(
  () => cardData.cardBottomVisible,
  (newVisible) => {
    if (newVisible) {
      openCloseTransform.one = 'translate(5 13) rotate(180)';
      openCloseTransform.two = 'translate(8 0)';
    } else {
      openCloseTransform.one = 'translate(0 8)';
      openCloseTransform.two = 'translate(13 5) rotate(180)';
    }
  }
);

//開關觸發
const svgOpenClose = () => {
  if (cardData.cardBottomVisible) {
    cardData.cardBottomVisible = !cardData.cardBottomVisible;
  } else if (cardData.cardBottomVisible === false && cardData.authorized === false && statusData.status !== 'ERROR') {
    cardData.cardBottomVisible = !cardData.cardBottomVisible;
  }
};
</script>

<style lang="scss" scoped>
.box-container {
  background-color: rgb(255, 255, 255, 1);
  width: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  .box-top {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: #111827;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 0.5rem;
    border-bottom: 1px solid #d2d2d2;
    column-gap: 10px;
    .left {
      display: flex;
      align-items: center;
      flex-grow: 1;
      column-gap: 10px;
      .title {
        min-width: 65px;
      }
    }
    .right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-grow: 2;
    }
  }
  .box-bottom {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-right: 1rem;
    .left {
      display: flex;
      align-items: center;
      flex-grow: 1;
    }
    .right {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-grow: 2;
    }
  }
}

.loader {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: conic-gradient(deepskyblue, 30%, white);
  --mask: radial-gradient(closest-side, transparent 75%, black 76%);
  -webkit-mask-image: var(--mask);
  mask-image: var(--mask);
  animation: spin 1s linear infinite reverse;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
