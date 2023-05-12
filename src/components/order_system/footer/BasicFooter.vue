<template>
  <div class="footer">
    <router-link :to="{ name: 'HomeView' }">首頁</router-link>
    <router-link :to="{ name: 'MyOrderView' }" v-if="!loginStore.loginState.user.isAdmin"
      >訂單
      <a v-if="count != 0">{{ count }}</a>
    </router-link>
    <router-link :to="{ name: 'MyMemberView' }" v-else>成員</router-link>
    <router-link :to="{ name: 'MyAccountView' }">帳戶</router-link>
  </div>
</template>

<script setup>
import { useCart } from '@/stores/cart';
import { computed } from 'vue';
import { useLoginStore } from '@/stores/loginState';

const cartStore = useCart();
const loginStore = useLoginStore();

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
  a {
    text-decoration: none;
    color: black;
  }
}
</style>
