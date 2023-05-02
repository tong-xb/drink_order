<template>
  <div class="footer">
    <router-link :to="{ name: 'HomeView' }">首頁</router-link>
    <router-link :to="{ name: 'MyOrderView' }"
      >訂單
      <a v-if="count != 0">{{ count }}</a>
    </router-link>
    <router-link :to="{ name: 'MyAccountView' }">帳戶</router-link>
  </div>
</template>

<script setup>
import { useCart } from '@/stores/order_system/cart';
import { computed } from 'vue';
const storeCart = useCart();

const count = computed(() => {
  return storeCart.cart.unsentCart.length;
});
</script>

<style>
.footer {
  display: flex;
  width: 100%;
  /* position: fixed; */
  bottom: 0px;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  border-top: solid rgb(8 72 135) 0.5px;
}
p {
  display: inline-block;
  padding: 10px 20px;
}
/* .content {
  background-color: rgb(8 72 135);
} */
</style>
