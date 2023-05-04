<template>
  <main>
    <!-- <div class="card-container">
      <MenuCard :storeName="'開放訂餐'" @click.prevent.stop="openOrder()" />
    </div> -->
    <div class="card-container" v-for="menuItem in drinkShopMenu" :key="menuItem.key">
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
import { useRouter } from 'vue-router';
import menus from '@/api/axios/json/menus.json';
import { reactive } from 'vue';

console.log(menus);

const drinkShopMenu = reactive(menus.drinkShop);

const router = useRouter();

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
