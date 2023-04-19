<template>
  <div class="assetsList">
    <div class="dot-div">
      <span class="dot" :style="{ color: props.color }">●</span>
      <span class="dotTitle">{{ props.name }}</span>
      <span class="dotContent">{{ props.dotContent }}</span>
    </div>
    <div
      class="infoCard"
      v-for="item in props.cardList"
      :key="item.name"
      @click="cardPress(item.routerName, item.arrowVisible)"
    >
      <div class="infoCardBody">
        <div class="color-dusty-gray" v-html="item.name"></div>
        <div class="infoCardRight">
          <div>{{ item.total }}</div>
          <div class="w-2"></div>
          <IconArrowRight stroke-color="#002db3" v-show="item.arrowVisible" />
        </div>
      </div>
    </div>
    <div class="h-4" v-show="props.cardList.length !== 0"></div>
  </div>
</template>

<script setup>
import IconArrowRight from '@/components/icons/IconArrowRight.vue';

import { useRouter } from 'vue-router';

const router = useRouter();

const cardPress = (routeName, visible) => {
  if (visible) {
    router.push({ name: routeName });
  }
};

const props = defineProps({
  color: {
    type: String,
    default: 'currentColor',
  },
  name: {
    type: String,
    default: '',
  },
  dotContent: {
    type: String,
    default: '',
  },
  cardList: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.assetsList {
  background-color: #f3f3f3;
  .dot-div {
    height: 45px;
    display: flex;
    background-color: #f3f3f3;
    padding-top: 5px;
    .dot {
      margin-left: 15px;
      font-size: 30px;
    }
    .dotTitle {
      margin: auto;
      margin-left: 10px;
    }
    .dotContent {
      margin: auto;
      margin-right: 20px;
    }
  }
  .infoCard {
    box-shadow: rgb(197, 197, 197) 0px 2px 4px;
    font-size: 1em;
    line-height: 1.2em;
    font-family: Arial, verdana, 'Times New Roman', 微軟正黑體, 新細明體;
    margin: 15px;
    border-radius: 10px;
    background-color: #ffffff;
    .infoCardBody {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin-left: 15px;
      padding-top: 16px;
      padding-right: 12px;
      padding-bottom: 15px;
      .infoCardRight {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
