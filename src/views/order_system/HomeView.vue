<template>
  <main>
    <div class="card-container" v-if="loginStore.loginState.user.isAdmin">
      <MenuCard :vendorName="'開放訂餐'" @click.prevent.stop="openOrder()" />
    </div>
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
    <OrderInfoForm
      :menuId="selectedMenuId"
      v-if="formIsOpen && loginStore.loginState.user.isAdmin"
      @emitWindowOpen="closeOrderInfoForm"
    />
  </main>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { formatDate } from '@/common/method_common/formatDate.js';
import { useLoginStore } from '@/stores/loginState';
import menus from '@/api/axios/json/menus.json';
import MenuCard from '@/components/order_system/card/MenuCard.vue';
import OrderInfoForm from '@/components/order_system/OrderInfoForm.vue';

const formIsOpen = ref(false);

const selectedMenuId = ref('');

const openOrderInfoForm = (id) => {
  selectedMenuId.value = id;
  formIsOpen.value = true;
};

const closeOrderInfoForm = (el) => {
  formIsOpen.value = el;
};

const router = useRouter();
const loginStore = useLoginStore();

const today = computed(() => {
  return formatDate(new Date(), 'YYYY/MM/DD HH:mm');
});

const onSchedule = computed(() => {
  return menus.menu.filter((item) => item.openTimeFrom < today.value && item.openTimeTo > today.value);
});

const openOrder = () => {
  router.push({ name: 'OpenOrderView' });
};
const openMenu = (mId) => {
  if (!loginStore.loginState.user.isAdmin) {
    // 一般使用者
    router.push({ name: 'MenuView', params: { menuId: mId } });
  } else {
    openOrderInfoForm(mId);
    // 管理者
  }
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
