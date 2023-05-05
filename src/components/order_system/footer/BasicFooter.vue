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
import { useCart } from '@/stores/cart';
import { computed } from 'vue';
const cartStore = useCart();

const count = computed(() => {
  return cartStore.cart.unsentCart.length;
});
</script>

<style lang="scss" scoped>
.footer {
  display: flex;
  width: 100%;
  /* position: fixed; */
  bottom: 0px;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background-color: antiquewhite;
}
p {
  display: inline-block;
  padding: 10px 20px;
}
/* .content {
  background-color: rgb(8 72 135);
} */
</style>
