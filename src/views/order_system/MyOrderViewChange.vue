<template>
  <div>
    <div>
      <h1>change</h1>
    </div>
    <div class="card_container" v-for="cart in storeCart.sentCart" :key="cart.menuId">
      <MyOrderCard :menuId="cart.menuId" :cartType="'sentCart'" />
    </div>
  </div>
</template>

<script setup>
import MyOrderCard from '@/components/order_system/card/MyOrderCard.vue';
import { useCart } from '@/stores/order_system/cart';
const storeCart = useCart();
</script>
