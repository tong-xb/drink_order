<template>
  <div>
    <div class="container">
      <div class="item" v-for="store in store.store" :key="store" @click="openSetting(store.vendorId)">
        <h2>{{ store.vendorName }}</h2>
      </div>
    </div>
    <OrderSettingForm v-show="windowOpen" @emitWindowOpen="closeMenu" />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import OrderSettingForm from '@/components/order_system/OrderSettingForm.vue';

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
//       vendorId: 's001',
//       vendorName: '50嵐',
//       vendorType: '飲料',
//     },
//     {
//       vendorId: 's002',
//       vendorName: '龜記',
//       vendorType: '飲料',
//     },
//     {
//       vendorId: 's003',
//       vendorName: '可不可',
//       vendorType: '飲料',
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
