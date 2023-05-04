<template>
  <div>
    <div class="container">
      <div class="item" v-for="store in store.store" :key="store" @click="openSetting(store.storeId)">
        <h2>{{ store.storeName }}</h2>
      </div>
    </div>
    <OrderSettingWindow v-show="windowOpen" @emitWindowOpen="closeMenu" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import OrderSettingWindow from '@/components/order_system/OrderSettingWindow.vue';

const openSetting = (el) => {
  console.log(el);
  windowOpen.value = true;
};

const windowOpen = ref(false);
const closeMenu = (el) => {
  windowOpen.value = el;
};

// const store = reactive({
//   store: [
//     {
//       storeId: 's001',
//       storeName: '50嵐',
//       storeType: '飲料',
//     },
//     {
//       storeId: 's002',
//       storeName: '龜記',
//       storeType: '飲料',
//     },
//     {
//       storeId: 's003',
//       storeName: '可不可',
//       storeType: '飲料',
//     },
//   ],
// });
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 30px 50px;
}
.item {
  margin-top: 10px;
  padding: 5px 10px;
  width: 450px;
  text-align: center;
  background-color: #16c9c9;
  border-radius: 5px;
}
</style>
