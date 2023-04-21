<template>
  <div>
    <router-view />
  </div>
</template>
<script setup>
import { onBeforeMount } from 'vue';
// import users from '@/api/json/users.json';
import { useRouter } from 'vue-router';

const router = useRouter();

const toLogin = () => {
  router.push({ name: 'LoginView' });
};

const localStorageUser = JSON.parse(localStorage.getItem('user'));
console.log(localStorageUser);

onBeforeMount(() => {
  if (!localStorageUser) {
    // alert('請先登入!');
    router.push({ name: 'LoginView' });
    toLogin();
  }
});
</script>
