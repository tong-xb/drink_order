<template>
  <div class="myOrder_container">
    <div class="select_container">
      <select name="" id="">
        全部
      </select>
    </div>
    <div class="card_container" v-for="cart in sortedCart" :key="cart">
      <MyOrderCard :menuId="cart" />
    </div>
  </div>
</template>

<script setup>
import MyOrderCard from '@/components/order_system/card/MyOrderCard.vue';
import { computed } from 'vue';
import { useCart } from '@/stores/order_system/cart';

const storeCart = useCart();

const sortedCart = computed(() => {
  // menuIdList: [m001,m001,m001,002]
  let menuIdList = storeCart.cart.all.map((e) => e.menuId);
  // myMenu: [m001,002]
  let myMenu = menuIdList.filter((el, idx, arr) => {
    return arr.indexOf(el) === idx;
  });
  return myMenu;
});
</script>

<style>
.select_container {
  height: 30px;
}
.myOrder_container {
  padding: 20px;
}
.myOrder_container select {
  margin-bottom: 20px;
  float: right;
}
.card_container {
  padding-bottom: 10px;
}
</style>
