<template>
  <div class="layout">
    <header>
      <BasicHeader v-if="route.meta.showHeader" />
    </header>
    <main>
      <RouterView />
    </main>
    <footer>
      <BasicFooter v-if="route.meta.showFooter" />
    </footer>
  </div>
</template>

<script setup>
import BasicHeader from './components/order_system/header/BasicHeader.vue';
import BasicFooter from './components/order_system/footer/BasicFooter.vue';
import { useLoginStore } from '@/stores/order_system/loginState';
import { useRouter, useRoute } from 'vue-router';
import { watch } from 'vue';
import { storeToRefs } from 'pinia';

const userStore = useLoginStore();
const { isLogin } = storeToRefs(userStore);
const router = useRouter();
const route = useRoute();

// check login IIFE Arrow function
(() => {
  if (userStore.isLogin) {
    router.push({ name: 'HomeView' });
  } else {
    router.push({ name: 'LoginView' });
  }
})();

watch(
  isLogin,
  (isLogin) => {
    // console.log('watch isLogin', isLogin);
    if (!isLogin) {
      router.push({ name: 'LoginView' });
    }
  },
  { deep: true }
);
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
