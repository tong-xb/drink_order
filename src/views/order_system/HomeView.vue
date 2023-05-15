<template>
  <main>
    <div class="select" v-if="!loginStore.loginState.user.isAdmin">
      <select v-model="userSort">
        <option>全部</option>
        <option>已訂餐</option>
        <option>未訂餐</option>
      </select>
    </div>
    <div class="select" v-else>
      <select>
        <option>全部</option>
        <option>開放菜單</option>
        <option>結束菜單</option>
        <option>歷史菜單</option>
      </select>
    </div>
    <!-- 一般使用者 -->
    <div v-if="!loginStore.loginState.user.isAdmin">
      <div class="card-container" v-for="menuItem in userSortBy" :key="menuItem.key">
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
      <div class="empty" v-if="userSortBy.length === 0">
        <h1>{{ userAlert }}</h1>
      </div>
    </div>

    <!-- 系統管理員 -->
    <div v-else>
      <MenuCard :vendorName="'開放訂餐'" @click.prevent.stop="openOrder()" />
      <div class="card-container" v-for="menuItem in menus.menu" :key="menuItem.key">
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
import { useCart } from '@/stores/cart';
import { useRouter } from 'vue-router';
import { formatDate } from '@/common/method_common/formatDate.js';
import { useLoginStore } from '@/stores/loginState';
import menus from '@/api/axios/json/menus.json';
import MenuCard from '@/components/order_system/card/MenuCard.vue';
import OrderInfoForm from '@/components/order_system/OrderInfoForm.vue';

const cartStore = useCart();

const formIsOpen = ref(false);

const userSort = ref('全部');

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

const userSortBy = computed(() => {
  let list = [];
  if (userSort.value === '全部') {
    list = onSchedule.value;
  } else if (userSort.value === '已訂餐') {
    list = ordered.value;
  } else if (userSort.value === '未訂餐') {
    list = unordered.value;
  }
  return list;
});

const userAlert = computed(() => {
  let str = '無開放中菜單';
  if (userSort.value === '全部') {
    str = '無開放中菜單!';
  } else if (userSort.value === '已訂餐') {
    str = '無已訂餐菜單!';
  } else if (userSort.value === '未訂餐') {
    str = '無未訂餐菜單!';
  }
  return str;
});

const onSchedule = computed(() => {
  let all = menus.menu.filter((item) => item.openTimeFrom < today.value && item.openTimeTo > today.value);

  return all;
});

const ordered = computed(() => {
  let list = [];
  onSchedule.value.filter((item) => {
    cartStore.cart.sentCart.forEach((sentItem) => {
      if (item.menuId === sentItem.menuId) {
        list.push(item);
      }
    });
  });

  return list;
});

const unordered = computed(() => {
  let list = onSchedule.value;
  onSchedule.value.filter((item, idx) => {
    cartStore.cart.sentCart.forEach((sentItem) => {
      if (item.menuId === sentItem.menuId) {
        list.splice(idx, 1);
      }
    });
  });

  return list;
});

// const ordered = ref(onSchedule.value.filter((item) => item.menuId in cartStore.cart.sentCart));

const openOrder = () => {
  router.push({ name: 'OpenOrderView' });
};
const openMenu = (mId) => {
  if (!loginStore.loginState.user.isAdmin) {
    // 一般使用者
    router.push({ name: 'MenuView', params: { menuId: mId } });
  } else {
    // 系統管理員
    openOrderInfoForm(mId);
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
  .select {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    select {
      margin: 10px 10px 0 0;
    }
  }
}
.empty {
  color: antiquewhite;
  margin: 10px;
}
</style>
