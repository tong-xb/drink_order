<template>
  <div class="layout">
    <header>
      <BasicHeader v-if="route.meta.showHeader" />
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <BasicFooter />
    </footer>
  </div>
</template>

<script setup>
import BasicHeader from './components/order_system/header/BasicHeader.vue';
import BasicFooter from './components/order_system/footer/BasicFooter.vue';
import { useLoginStore } from '@/stores/loginState';
import { useRouter, useRoute } from 'vue-router';

const store = useLoginStore();
const router = useRouter();
const route = useRoute();

// check login IIFE Arrow function
(() => {
  if (store.isLogin) {
    console.log('router.push to HomeView');
    router.push({ name: 'HomeView' });
  } else {
    console.log('router.push to LoginView');
    router.push({ name: 'LoginView' });
  }
})();
</script>

<style></style>
