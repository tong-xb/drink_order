<template>
  <main>
    <!-- <div class="card-container">
      <MenuCard :vendorName="'開放訂餐'" @click.prevent.stop="openOrder()" />
    </div> -->
    <div class="card-container" v-for="menuItem in onSchedule" :key="menuItem.key">
      <MenuCard
        :id="menuItem.menuId"
        :vendorName="menuItem.vendorName"
        :vendorType="menuItem.vendorType"
        :openTimeFrom="menuItem.openTimeFrom"
        :openTimeTo="menuItem.openTimeTo"
        :arrivalTime="menuItem.arrivalTime"
        @click.prevent.stop="openMenu(menuItem.menuId)"
      />
    </div>
  </main>
</template>
<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import menus from '@/api/axios/json/menus.json';
import MenuCard from '@/components/order_system/card/MenuCard.vue';
import { formatDate } from '@/common/method_common/formatDate.js';

const router = useRouter();

const today = computed(() => {
  return formatDate(new Date(), 'YYYY/MM/DD HH:mm');
});

const onSchedule = computed(() => {
  return menus.menu.filter((item) => item.openTimeFrom < today.value && item.openTimeTo > today.value);
});

// const openOrder = () => {
//   router.push({ name: 'OpenOrderView' });
// };
const openMenu = (mId) => {
  router.push({ name: 'MenuView', params: { menuId: mId } });
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  height: 100%;
}
</style>
