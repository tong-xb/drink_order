<template>
  <div>
    <div class="card_container" v-for="cart in storeCart.cart.completeCart" :key="cart.menuId">
      <MyOrderCard :menuId="cart.menuId" :cartType="'completeCart'" />
    </div>
    <div class="empty" v-if="isEmpty">
      <h1>無歷史訂單!</h1>
    </div>
  </div>
</template>

<script setup>
import MyOrderCard from '@/components/order_system/card/MyOrderCard.vue';
import { useCart } from '@/stores/order_system/cart';
import { computed } from 'vue';
const storeCart = useCart();

const isEmpty = computed(() => {
  if (storeCart.cart.completeCart.length === 0) {
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
