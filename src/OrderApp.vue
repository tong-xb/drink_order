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
import { useLoginStore } from '@/stores/order_system/loginState';
import { useRouter, useRoute } from 'vue-router';

const store = useLoginStore();
const router = useRouter();
const route = useRoute();

// check login IIFE Arrow function
(() => {
  if (store.isLogin) {
    router.push({ name: 'HomeView' });
  } else {
    router.push({ name: 'LoginView' });
  }
})();
</script>

<style>
header {
  height: 15vh;
}
main {
  height: 75vh;
  overflow-x: scroll;
}
footer {
  height: 10vh;
}
</style>
