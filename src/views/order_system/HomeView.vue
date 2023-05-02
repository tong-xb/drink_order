<template>
  <main>
    <div class="card-container">
      <MenuCard :storeName="'開放訂餐'" @click.prevent.stop="openOrder()" />
    </div>
    <div class="card-container" v-for="menuItem in menus.menu" :key="menuItem.key">
      <MenuCard
        :id="menuItem.menuId"
        :storeName="menuItem.storeName"
        :storeType="menuItem.storeType"
        :openTimeFrom="menuItem.openTimeFrom"
        :openTimeTo="menuItem.openTimeTo"
        :arrivalTime="menuItem.arrivalTime"
        @click.prevent.stop="openMenu(menuItem.menuId)"
      />
    </div>
  </main>
</template>
<script setup>
import MenuCard from '@/components/order_system/card/MenuCard.vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const menus = reactive({
  menu: [
    {
      menuId: 'm001',
      storeId: 's001',
      storeName: '50嵐',
      storeType: '飲料',
      openTimeFrom: '4/19 (三) 10:00',
      openTimeTo: '4/19 (三) 11:00',
      arrivalTime: '4/19 (三) 12:00',
    },
    {
      menuId: 'm002',
      storeId: 's001',
      storeName: '龜記',
      storeType: '飲料',
      openTimeFrom: '4/20 (四) 10:00',
      openTimeTo: '4/20 (四) 11:00',
      arrivalTime: '4/20 (四) 12:00',
    },
  ],
});

const router = useRouter();

const openOrder = () => {
  router.push({ name: 'OpenOrderView' });
};
const openMenu = (mId) => {
  // console.log(mId);
  router.push({ name: 'MenuView', params: { menuId: mId } });
};
</script>

<style lang="scss" scoped>
main {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
}
</style>
