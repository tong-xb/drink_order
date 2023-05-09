<template>
  <div class="scroll-container">
    <div class="container">
      <div class="item" v-for="item in vendors.vendor" :key="item.vendorId" @click="openForm(item.vendorId)">
        <h2>{{ item.vendorName }}</h2>
      </div>
    </div>
    <OrderSettingForm :vendorId="selectedVendorId" v-show="formIsOpen" @emitWindowOpen="closeForm" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import OrderSettingForm from '@/components/order_system/OrderSettingForm.vue';
import vendors from '@/api/axios/json/vendors.json';

const selectedVendorId = ref('');

const openForm = (id) => {
  console.log(id);
  formIsOpen.value = true;
  selectedVendorId.value = id;
};

const formIsOpen = ref(false);
const closeForm = (el) => {
  formIsOpen.value = el;
};
</script>

<style lang="scss" scoped>
.scroll-container {
  overflow: hidden;
  height: 100%;
  .container {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    padding-right: 10px;
    box-sizing: content-box; //so width will be 100%+10px
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .item {
      margin-top: 10px;
      padding: 5px 10px;
      width: 300px;
      text-align: center;
      background-color: rgb(109 150 235 / 23%);
      // border-radius: 5px;
      box-shadow: 0px 2px 4px #c5c5c5;
      border-radius: 10px;
      font-size: 1em;
      // 0-280px
      @media screen and (max-width: 280px) {
        width: 200px;
      }
      //280-430px
      @media screen and (min-width: 430px) {
        width: 250px;
      }
      //431-650px
      @media screen and (min-width: 431px) {
        width: 300px;
      }
      //651-
      @media screen and (min-width: 650px) {
        width: 350px;
      }
    }
  }
}
</style>
