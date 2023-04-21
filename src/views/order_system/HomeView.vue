<template>
  <div v-for="menuItem in menus.menu" :key="menuItem.key">
    <MenuCard
      :id="menuItem.id"
      :storeName="menuItem.storeName"
      :storeType="menuItem.storeType"
      :openTimeFrom="menuItem.openTimeFrom"
      :openTimeTo="menuItem.openTimeTo"
      :arrivalTime="menuItem.arrivalTime"
    />
  </div>
</template>
<script setup>
import MenuCard from '@/components/order_system/card/MenuCard.vue';
import { reactive } from 'vue';
// import users from '@/api/json/users.json';
// import { useRouter } from 'vue-router';

const menus = reactive({
  menu: [
    {
      id: '001',
      storeName: '50嵐',
      storeType: '飲料',
      openTimeFrom: '4/19 (三) 10:00',
      openTimeTo: '4/19 (三) 11:00',
      arrivalTime: '4/19 (三) 12:00',
    },
    {
      id: '002',
      storeName: '龜記',
      storeType: '飲料',
      openTimeFrom: '4/20 (四) 10:00',
      openTimeTo: '4/20 (四) 11:00',
      arrivalTime: '4/20 (四) 12:00',
    },
    {
      id: '003',
      storeName: '麥當勞',
      storeType: '主食',
      openTimeFrom: '4/19 (三) 10:00',
      openTimeTo: '4/19 (三) 11:00',
      arrivalTime: '4/19 (三) 12:00',
    },
  ],
});

// const router = useRouter();

// const toLogin = () => {
//   router.push({ name: 'LoginView' });
// };

// const localStorageUser = JSON.parse(localStorage.getItem('user'));
// console.log(localStorageUser);

// onBeforeMount(() => {
//   if (!localStorageUser) {
//     // alert('請先登入!');
//     router.push({ name: 'LoginView' });
//     toLogin();
//   }
// });
</script>
