<template>
  <div class="layout">
    <header v-if="route.meta.showHeader">
      <BasicHeader />
    </header>
    <main class="main-container">
      <RouterView />
    </main>
    <footer v-if="route.meta.showFooter">
      <BasicFooter />
    </footer>
  </div>
</template>

<script setup>
import BasicHeader from './components/order_system/header/BasicHeader.vue';
import BasicFooter from './components/order_system/footer/BasicFooter.vue';
import { useLoginStore } from '@/stores/loginState';
import { useRouter, useRoute } from 'vue-router';
import { watch } from 'vue';

const loginStore = useLoginStore();
const router = useRouter();
const route = useRoute();

if (loginStore.isLogin) {
  router.push({ name: 'HomeView' });
} else {
  router.push({ name: 'LoginView' });
}

// reactive需透過函式監控,只能監控單一的值
watch(
  () => loginStore.isLogin,
  (newVal) => {
    if (!newVal) {
      router.push({ name: 'LoginView' });
    }
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  header {
    height: 130px;
    width: 100%;
  }
  .main-container {
    padding-bottom: 100px;
    height: calc(100vh - 230px);
  }
  footer {
    position: absolute;
    bottom: 0px;
    height: 100px;
    width: 100%;
  }
}
</style>

<style lang="scss">
body {
  margin: 0;
}
h1,
h2,
h3,
p {
  margin: 0;
}
</style>
