<template>
  <div class="card-container" :class="(backgroundColor(props.vendorType), isOrderCard ? 'order-card' : '')">
    <div class="card-head" v-if="!isOrderCard">
      <h2>{{ props.vendorType }}</h2>
      <div>
        <a>訂餐時間:{{ props.openTimeFrom }} ~ {{ props.openTimeTo }}</a>
        <a>取餐時間:{{ props.arrivalTime }}</a>
      </div>
    </div>
    <div class="card-head" v-else>
      <h2>+</h2>
    </div>
    <div class="card-content">
      <h1>{{ props.vendorName }}</h1>
      <div v-if="isOrdered" class="isOrderDisplay"></div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
import { useCart } from '@/stores/cart';
const cartStore = useCart();

const props = defineProps({
  id: {
    type: String,
  },
  vendorName: {
    type: String,
  },
  vendorType: {
    type: String,
  },
  openTimeFrom: {
    type: String,
  },
  openTimeTo: {
    type: String,
  },
  arrivalTime: {
    type: String,
  },
});

const isOrdered = computed(() => {
  let bol = false;

  cartStore.cart.sentCart.forEach((item) => {
    if (item.menuId === props.id) {
      bol = true;
    }
  });
  return bol;
});

const isOrderCard = computed(() => {
  if (props.vendorName != '開放訂餐') {
    return false;
  }
  return true;
});

const backgroundColor = (type) => {
  let menuType = '';
  switch (type) {
    case '主食':
      menuType = 'type-main';
      break;
    case '飲料':
      menuType = 'type-drink';
      break;
    case '甜點':
      menuType = 'type-dessert';
      break;
  }
  return menuType;
};
</script>

<style lang="scss" scoped>
.card-container {
  padding: 16px;
  background-color: rgb(249 171 85);
  // border: 2px solid rgb(245 138 7);
  border-radius: 20px;
  margin: 8px 20px;

  box-shadow: 0px 2px 4px #c5c5c5;
  border-radius: 10px;
  font-size: 1em;
  // line-height: 1.425em;
}
.card-head {
  display: flex;
}
.card-head a {
  display: block;
  font-size: 1px;
}
.card-content {
  .isOrderDisplay {
    // content: '';
    position: relative;
    float: right;
    width: 25px;
    height: 25px;
    align-content: center;
    background-image: url(@/assets/images/icon/accept.png);
    background-size: cover;
    border-radius: 50%;
    top: -15px;
    right: -10px;
  }
}
.card-content h1 {
  text-align: center;
}
.type-drink {
  background-color: rgb(249 171 85);
}
.type-main {
  background-color: rgb(225 233 52);
}
.type-dessert {
  background-color: rgb(83 209 96);
}
.order-card {
  border: 2px solid rgb(149, 149, 149);
  color: rgb(149, 149, 149);
  background-color: white;
}
</style>
