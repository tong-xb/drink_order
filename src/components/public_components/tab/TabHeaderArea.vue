<template>
  <div class="background-base" :style="{ height: props.height }">
    <div class="tabContent" role="tablist" :style="{ width: props.routerList.length === 2 ? '80vw' : '90vw' }">
      <router-link
        v-for="item in props.routerList"
        :key="item.routerName"
        class="tabItem"
        :class="{ active: route.name === item.routerName }"
        :to="item.pushTo"
        role="tab"
        >{{ item.name }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';

const route = useRoute();

const props = defineProps({
  height: {
    type: String,
    default: '10vh',
  },
  routerList: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.background-base {
  background: #005bac;
  padding-top: calc(((100vh - 45px - 50px) * 2 / 7 - 2rem - 14vh) / 2);
  padding-bottom: calc(((100vh - 45px - 50px) * 2 / 7 - 2rem - 14vh) / 2);

  .tabContent {
    display: flex;
    border: rgba(255, 255, 255, 0.4) 1px solid;
    border-radius: 10000px;
    line-height: 2rem;
    height: 2rem;
    max-width: 800px;
    margin: auto;
    text-align: center;
    color: #ffffff;
    font-size: 1.1rem;
    .tabItem {
      color: #ffffff;
      text-decoration: none;
      height: 2rem;
      margin-left: 3%;
      margin-right: 3%;
      opacity: 0.5;
      width: calc(40vw - 20.725px);
      &.active {
        opacity: 1;
        background-color: #46aefc;
        color: #ffffff;
        height: calc(2rem + 2px);
        line-height: calc(2rem + 2px);
        top: -1px;
        position: relative;

        &::before {
          width: 16%;
          content: '';
          position: absolute;
          right: 100%;
          top: 0;
          background-color: #46aefc;
          height: calc(2rem + 2px);
          border-top-left-radius: 10000px;
          border-bottom-left-radius: 10000px;
        }

        &::after {
          width: 16%;
          content: '';
          position: absolute;
          left: 100%;
          top: 0;
          background-color: #46aefc;
          height: calc(2rem + 2px);
          border-top-right-radius: 10000px;
          border-bottom-right-radius: 10000px;
        }
      }
    }
  }
}
</style>
