<template>
  <div>
    <div class="card_container" v-for="cart in storeCart.cart.sentCart" :key="cart.menuId">
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
const storeCart = useCart();

const isEmpty = computed(() => {
  if (storeCart.cart.sentCart.length === 0) {
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
