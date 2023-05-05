<template>
  <div>
    <div class="card_container" v-for="cart in cartStore.cart.sentCart" :key="cart.menuId">
      <MyOrderCard :menuId="cart.menuId" :cartType="'sentCart'" />
    </div>
    <div class="empty" v-if="isEmpty">
      <h1>無未完成訂單!</h1>
    </div>
  </div>
</template>

<script setup>
import MyOrderCard from '@/components/order_system/card/MyOrderCard.vue';
import { useCart } from '@/stores/cart';
import { computed } from 'vue';
const cartStore = useCart();

const isEmpty = computed(() => {
  if (cartStore.cart.sentCart.length === 0) {
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
