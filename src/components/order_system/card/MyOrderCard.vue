<template>
  <div class="order_container">
    <div class="order_container_title" @click="toggle">
      <h1>{{ thisMenu.vendorName }}</h1>
      <p v-if="!open">{{ thisMenu.arrivalTime }}</p>
      <a :class="[open ? 'rotate' : '']">></a>
    </div>
    <div class="toggle_container" v-if="open">
      <p>預計送達時間: {{ thisMenu.arrivalTime }}</p>
      <div class="order_container_content" v-for="item in thisCart.product" :key="item.productId">
        <div class="left">
          <a>1</a>
        </div>
        <div class="middle">
          <p class="name">{{ item.productName }}</p>
          <div class="customize_container">
            <p class="customize">{{ item.size }},{{ item.ice }},{{ item.sugar }}</p>
          </div>
        </div>
        <div class="right">
          <p>${{ item.price }}</p>
        </div>
      </div>
      <div class="order_container_footer">
        <div class="total_container">
          <div class="total">${{ total }}</div>
        </div>
        <div class="button_container">
          <button v-if="props.cartType == 'unsentCart'" @click="sendMenu()">送出</button>
          <button @click="deleteMenu()">刪除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue';
import { useCart } from '@/stores/cart';
import menus from '@/api/axios/json/menus.json';

// import { send } from 'vite';

const cartStore = useCart();
const props = defineProps({
  menuId: {
    type: String,
    require: true,
  },
  cartType: {
    type: String,
    require: true,
  },
});

const sendMenu = () => {
  if (confirm('確定送出 ' + thisMenu.value.vendorName + ' 訂單?') == true) {
    cartStore.addToSentCart(props.menuId);
  }
};

const deleteMenu = () => {
  if (confirm('確定刪除 ' + thisMenu.value.vendorName + ' 訂單?') == true) {
    let listName = props.cartType;
    cartStore.cart[listName].forEach((item, idx) => {
      if (item.menuId === props.menuId) {
        // delete cartStore[listName][idx];
        cartStore.cart[listName].splice(idx, 1);
      }
    });
  }
};

const open = ref(false);

const toggle = () => {
  open.value = !open.value;
};

const thisMenu = computed(() => {
  return menus.menu.filter((el) => el.menuId === props.menuId)[0];
  // {"menuId":"m001","vendorId":"s001","vendorName":"50嵐","vendorType":"飲料","openTimeFrom":"4/19 (三) 10:00","openTimeTo":"4/19 (三) 11:00","arrivalTime":"4/19 (三) 12:00"}
});

const thisCart = computed(() => {
  let listName = props.cartType;
  let obj = {};
  cartStore.cart[listName].forEach((item) => {
    if (item.menuId === props.menuId) {
      obj = item;
    }
  });
  return obj;
  // {
  //   menuId: 'm001',
  //   product: [
  //     { productId: 'd001',productName: '麥香紅茶', size: 'M', ice: '多冰', sugar: '多糖', price: 20 },
  //     { productId: 'd002',productName: '麥香紅茶', size: 'L', ice: '溫', sugar: '正常', price: 20 },
  //     { productId: 'd003',productName: '麥香紅茶', size: 'M', ice: '熱', sugar: '無糖', price: 20 },
  //   ],
  // },
});

const total = computed(() => {
  let price = 0;
  thisCart.value.product.forEach((item) => {
    price += item.price;
  });
  return price;
});
</script>

<style lang="scss" scoped>
.order_container {
  padding: 10px 20px;
  min-width: 250px;
  margin-top: 10px;
  box-shadow: 0px 2px 4px #c5c5c5;
  border-radius: 10px;
  font-size: 1em;
  line-height: 1.425em;
  //0-430
  @media screen and (max-width: 430px) {
    width: 250px;
  }
  //431-650
  @media screen and (min-width: 431px) {
    width: 300px;
  }
  //651-
  @media screen and (min-width: 650px) {
    width: 500px;
  }
}
.order_container h1 {
  margin: 15px 0;
}
.order_container_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.order_container p {
  padding: 0;
}
.order_container_content {
  display: flex;
  padding: 20px 0 10px 0;
}
.order_container_content .left {
  width: 5%;
}
.order_container_content .left a {
  background-color: #d3d3d3;
  top: 5px;
  position: relative;
  //0-650
  @media screen and (max-width: 650px) {
    padding: 0px;
  }
  //651-
  @media screen and (min-width: 651px) {
    padding: 2px;
  }
}
.order_container_content .middle {
  width: 80%;
  display: flex;
  flex-direction: column;
  padding: 0;
}
.order_container_content .right {
  width: 15%;
}
.name {
  font-size: larger;
  font-weight: bold;
}
.customize_container {
  display: flex;
}
.customize {
  color: #939393;
}
.order_container_footer .total {
  width: 15%;
  float: right;
}
.total_container {
  border-top: #939393 solid 1px;
  padding-top: 10px;
  height: 50px;
}
.button_container {
  display: flex;
  justify-content: center;
}
.rotate {
  transform: rotate(90deg);
}
</style>
