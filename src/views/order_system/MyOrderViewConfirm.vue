<template>
  <div>
    <div>
      <h1>confirm</h1>
    </div>
    <div class="card_container" v-for="cart in storeCart.unsentCart" :key="cart.menuId">
      <MyOrderCard :menuId="cart.menuId" :cartType="'unsentCart'" />
    </div>
  </div>
</template>

<script setup>
import MyOrderCard from '@/components/order_system/card/MyOrderCard.vue';
import { useCart } from '@/stores/order_system/cart';
const storeCart = useCart();
</script>
