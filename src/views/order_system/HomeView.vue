<template>
  <div class="scroll-container">
    <main>
      <div class="select" v-if="!loginStore.loginState.user.isAdmin">
        <select v-model="userOption">
          <option>全部</option>
          <option>已訂餐</option>
          <option>未訂餐</option>
        </select>
      </div>
      <div class="select" v-else>
        <select v-model="adminOption">
          <option>全部</option>
          <option>開放中</option>
          <option>已結束</option>
          <option>歷史菜單</option>
        </select>
      </div>
      <!-- 一般使用者 -->
      <div v-if="!loginStore.loginState.user.isAdmin">
        <div class="card-container" v-for="menuItem in userOptionBy" :key="menuItem.key">
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
        <div class="empty" v-if="userOptionBy.length === 0">
          <h1>{{ userAlert }}</h1>
        </div>
      </div>

      <!-- 系統管理員 -->
      <div v-else>
        <MenuCard :vendorName="'開放訂餐'" @click.prevent.stop="openOrder()" />
        <div class="card-container" v-for="menuItem in adminOptionBy" :key="menuItem.key">
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
        <div class="empty" v-if="adminOptionBy.length === 0">
          <h1>{{ adminAlert }}</h1>
        </div>
      </div>

      <OrderInfoForm
        :menuId="selectedMenuId"
        v-if="formIsOpen && loginStore.loginState.user.isAdmin"
        @emitWindowOpen="closeOrderInfoForm"
      />
    </main>
  </div>
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

const today = ref(formatDate(new Date(), 'YYYY/MM/DD HH:mm'));

const setToday = (() => {
  today.value = formatDate(new Date(), 'YYYY/MM/DD HH:mm');
})();

setInterval(() => {
  setToday;
}, 1000);

const userOption = ref('全部');

const onSchedule = computed(() => {
  return menus.menu.filter((item) => item.openTimeFrom < today.value && item.openTimeTo > today.value);
});

const outOfSchedule = computed(() => {
  return menus.menu.filter((item) => item.openTimeTo < today.value && item.arrivalTime > today.value);
});

const pastSchedule = computed(() => {
  return menus.menu.filter((item) => item.arrivalTime < today.value);
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
  let list = [...onSchedule.value];
  onSchedule.value.filter((item, idx) => {
    cartStore.cart.sentCart.forEach((sentItem) => {
      if (item.menuId === sentItem.menuId) {
        list.splice(idx, 1);
      }
    });
  });

  return list;
});

const userOptionBy = computed(() => {
  let list = [];
  if (userOption.value === '全部') {
    list = onSchedule.value;
  } else if (userOption.value === '已訂餐') {
    list = ordered.value;
  } else if (userOption.value === '未訂餐') {
    list = unordered.value;
  }
  return list;
});

const userAlert = computed(() => {
  let str = '無開放中菜單';
  if (userOption.value === '全部') {
    str = '無開放中菜單!';
  } else if (userOption.value === '已訂餐') {
    str = '無已訂餐菜單!';
  } else if (userOption.value === '未訂餐') {
    str = '無未訂餐菜單!';
  }
  return str;
});

const adminOption = ref('全部');

const adminOptionBy = computed(() => {
  let list = [];
  if (adminOption.value === '全部') {
    list = menus.menu;
  } else if (adminOption.value === '開放中') {
    list = onSchedule.value;
  } else if (adminOption.value === '已結束') {
    list = outOfSchedule.value;
  } else if (adminOption.value === '歷史菜單') {
    list = pastSchedule.value;
  }
  return list;
});

const adminAlert = computed(() => {
  let str = '無菜單';
  if (adminOption.value === '全部') {
    str = '無菜單!';
  } else if (adminOption.value === '開放中') {
    str = '無開放中菜單!';
  } else if (adminOption.value === '已結束') {
    str = '無已結束菜單!';
  } else if (adminOption.value === '歷史菜單') {
    str = '無歷史菜單!';
  }
  return str;
});

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
.scroll-container {
  overflow: hidden;
  height: 100%;
  main {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    height: 100%;
    width: 100%;
    padding-right: 10px;
    box-sizing: content-box; //so width will be 100%+10px
    .select {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      select {
        margin: 10px 10px 0 0;
      }
    }
  }
}

.empty {
  color: antiquewhite;
  margin: 10px;

  text-align: center;
}
</style>
