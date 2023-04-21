<template>
  <div class="layout">
    <header>
      <BasicHeader />
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
import { onMounted, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const store = useLoginStore();
const router = useRouter();

const checkLogin = () => {
  //1. check local storage
  if (store.isLogin) {
    // console.log('登入狀態:' + store.isLogin);
  } else {
    router.push({ name: 'LoginView' });
  }

  if (!store.isLogin) {
    let localStorageUser = JSON.parse(localStorage.getItem('user'));
    ////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    ////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    ////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log(localStorageUser.userName);
    router.push({ name: 'LoginView' });
  }
};

onMounted(() => {
  checkLogin();
});

watchEffect(() => {
  console.log('登入狀態:' + store.isLogin);
});
</script>

<style></style>
