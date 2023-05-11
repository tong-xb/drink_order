<template>
  <div class="card-container" :class="[colorClass, isOrderCard ? 'order-card' : '']">
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
      <div v-if="isOrdered && !loginStore.loginState.user.isAdmin" class="isOrderDisplay"></div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useCart } from '@/stores/cart';
import { useLoginStore } from '@/stores/loginState';
import { formatDate } from '@/common/method_common/formatDate.js';

const cartStore = useCart();
const loginStore = useLoginStore();

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

const colorClass = ref('test');

const setTime = () => {
  let now = formatDate(new Date(), 'YYYY/MM/DD HH:mm');

  if (now < props.openTimeTo) {
    // console.log('now < props.openTimeTo');
    colorClass.value = 'orderOpen';
  } else if (now >= props.openTimeTo && now < props.arrivalTime) {
    // console.log('props.openTimeTo >= now && props.arrivalTime <= now');
    colorClass.value = 'orderClose';
  } else if (now >= props.arrivalTime) {
    // console.log('props.arrivalTime <= now');
    colorClass.value = 'orderFinished';
  }
};

setTime();

setInterval(() => {
  setTime();
}, 1000);
</script>

<style lang="scss" scoped>
.card-container {
  padding: 16px;
  background-color: rgb(249 171 85);
  // border: 2px solid rgb(245 138 7);
  border-radius: 20px;
  margin: 18px 20px 0 20px;

  box-shadow: 0px 2px 4px #c5c5c5;
  border-radius: 10px;
  font-size: 1em;
  width: 300px;
  // 0-280px
  @media screen and (max-width: 280px) {
    width: 200px;
  }
}
.card-head {
  display: flex;
}
.card-head a {
  display: block;
  font-size: 10px;
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
.orderOpen {
  background-color: rgb(122 213 131);
}
.orderClose {
  background-color: rgb(239 226 77);
}
.orderFinished {
  background-color: rgb(149, 149, 149);
}
.order-card {
  // border: 2px solid rgb(149, 149, 149);
  color: rgb(149, 149, 149);
  background-color: white;
}
</style>
