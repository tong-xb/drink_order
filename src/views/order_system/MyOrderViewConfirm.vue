<template>
  <div>
    <div class="card_container" v-for="cart in cartStore.cart.unsentCart" :key="cart.menuId">
      <MyOrderCard :menuId="cart.menuId" :cartType="'unsentCart'" />
    </div>
    <div class="empty" v-if="isEmpty">
      <h1>無未送出訂單!</h1>
    </div>
  </div>
</template>

<script setup>
import MyOrderCard from '@/components/order_system/card/MyOrderCard.vue';
import { useCart } from '@/stores/cart';
import { computed } from 'vue';
const cartStore = useCart();

const isEmpty = computed(() => {
  if (cartStore.cart.unsentCart.length === 0) {
    return true;
  }
  return false;
});
</script>

<style lang="scss" scoped>
.empty {
  color: antiquewhite;
}
</style>
