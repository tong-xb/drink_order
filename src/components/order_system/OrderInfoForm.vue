<template>
  <div>
    <div class="modal-background"></div>
    <div class="modal-base">
      <!-- Modal content -->
      <div class="modal-content">
        <div class="orderHeader">
          <h1>{{ thisMenu.vendorName }}</h1>
        </div>
        <div class="scroll-container">
          <div class="orderBody">
            <div class="title orderTitleContainer" @click="toggle('openTime')">
              <label>訂購時間:</label>
              <a :class="[open.openTime ? 'rotate' : '']">></a>
            </div>
            <label v-if="open.openTime">{{ thisMenu.openTimeFrom }} ~ {{ thisMenu.openTimeTo }}</label>

            <div class="title orderTitleContainer" @click="toggle('arrivalTime')">
              <label>預計送達時間:</label>
              <a :class="[open.arrivalTime ? 'rotate' : '']">></a>
            </div>
            <label v-if="open.arrivalTime">{{ thisMenu.arrivalTime }}</label>

            <div class="title orderTitleContainer" @click="toggle('vendorAddress')">
              <label>店家地址:</label>
              <a :class="[open.vendorAddress ? 'rotate' : '']">></a>
            </div>
            <label v-if="open.vendorAddress">{{ thisVendor.vendorAddress }}</label>

            <div class="title orderTitleContainer" @click="toggle('order')">
              <label>訂單:</label>
              <a :class="[open.order ? 'rotate' : '']">></a>
            </div>

            <div class="orders" v-if="open.order">
              <div class="orderContainer" v-for="order in orderList" :key="order.consumer">
                <label>{{ order.consumerName }}</label>
                <div class="order_container_content" v-for="product in order.product" :key="product.productId">
                  <div class="left">
                    <a>1</a>
                  </div>
                  <div class="middle">
                    <p class="name">{{ product.productName }}</p>
                    <div class="customize_container">
                      <p class="customize">{{ product.size }},{{ product.ice }},{{ product.sugar }}</p>
                    </div>
                  </div>
                  <div class="right">
                    <p>${{ product.price }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="title orderTitleContainer" @click="toggle('total')">
              <label>總價:</label>
              <a :class="[open.total ? 'rotate' : '']">></a>
            </div>
            <label v-if="open.total">${{ total }}</label>
          </div>
        </div>

        <div class="orderFooter">
          <button v-if="showTimeOverBtn" @click="endOrder">提早結束訂單</button>
          <button class="cancelBtn" @click="closeWindow">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import menus from '@/api/axios/json/menus.json';
import vendors from '@/api/axios/json/vendors.json';
import orders from '@/api/axios/json/orders.json';
import { ref, reactive, computed } from 'vue';
import { formatDate } from '@/common/method_common/formatDate.js';

const props = defineProps({
  menuId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits('emitWindowOpen');
const closeWindow = () => {
  emit('emitWindowOpen', false);
};

const open = reactive({
  openTime: true,
  arrivalTime: true,
  vendorAddress: true,
  order: true,
  total: true,
});

const thisMenu = computed(() => {
  let obj = {};
  menus.menu.forEach((item) => {
    if (item.menuId === props.menuId) {
      obj = item;
    }
  });
  return obj;
});

const thisVendor = computed(() => {
  let obj = {};
  vendors.vendor.forEach((item) => {
    if (item.vendorId === thisMenu.value.vendorId) {
      obj.vendorId = item.vendorId;
      obj.vendorName = item.vendorName;
      obj.vendorType = item.vendorType;
      obj.vendorAddress = item.vendorAddress;
    }
  });
  return obj;
});

const orderList = computed(() => {
  let list = [];
  orders.forEach((item) => {
    if (item.menuId === props.menuId) {
      list = item.orderList;
    }
  });
  return list;
});

const total = computed(() => {
  let val = 0;
  orderList.value.forEach((order) => {
    order.product.forEach((item) => {
      val += item.price;
    });
  });
  return val;
});

const endOrder = () => {
  if (confirm('確定要現在結束嗎?') == true) {
    let now = formatDate(new Date(), 'YYYY/MM/DD HH:mm');
    menus.menu.forEach((item) => {
      if (item.menuId === props.menuId) {
        item.openTimeTo = now;
        thisMenu.value.openTimeTo = now;
      }
    });
    console.log('訂單結束');
    closeWindow();
  }
};

const toggle = (el) => {
  switch (el) {
    case 'openTime':
      open.openTime = !open.openTime;
      break;
    case 'arrivalTime':
      open.arrivalTime = !open.arrivalTime;
      break;
    case 'vendorAddress':
      open.vendorAddress = !open.vendorAddress;
      break;
    case 'order':
      open.order = !open.order;
      break;
    case 'total':
      open.total = !open.total;
      break;
  }
};

const showTimeOverBtn = ref(false);

const setTime = () => {
  let now = formatDate(new Date(), 'YYYY/MM/DD HH:mm');
  // console.log(props.vendorName);
  // console.log('props.openTimeTo:' + props.openTimeTo);
  // console.log('now:' + now);
  if (now < thisMenu.value.openTimeTo) {
    showTimeOverBtn.value = true;
  }
};

setTime();

setInterval(() => {
  setTime();
}, 1000);
</script>

<style lang="scss" scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.3s ease-in-out;
}
.modal-base {
  position: fixed; /* Stay in place */
  z-index: 100; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: hidden; /* Enable scroll if needed */
  display: flex;
  justify-content: center;
  .modal-content {
    display: flex;
    flex-direction: column;
    background-color: #fefefe;
    margin: 10vh 5vh;
    padding: 10px 20px;
    border: 1px solid #888;
    border-radius: 0.5rem;
    height: 80vh;
    font-size: 1.1rem;
    width: 300px;
    .orderHeader {
      height: 15%;
      align-items: center;
      display: flex;
      justify-content: center;
    }

    .scroll-container {
      overflow: hidden;
      height: 100%;
      .orderBody {
        height: 100%;
        width: 100%;
        overflow-y: auto;
        padding-right: 10px;
        box-sizing: content-box; //so width will be 100%+10px

        .title {
          font-weight: 600;
          margin-top: 8px;
          background-color: rgb(84 105 212 / 36%);
        }

        label {
          display: block;
        }

        .orderTitleContainer {
          display: flex;
          justify-content: space-between;
          padding-right: 3px;
          a {
            display: inline-block;
          }
          .rotate {
            transform: rotate(90deg);
          }
        }

        .orders {
          .orderContainer {
            padding-bottom: 10px;
            border-bottom: 3px solid rgb(84 105 212 / 36%);
            label {
              // background-color: rgb(84 105 212 / 36%);
              border-bottom: 1px solid rgb(84 105 212 / 36%);
              padding: 2px 0;
              font-weight: bold;
              text-align: center;
            }
            .order_container_content {
              display: flex;
              padding: 5px 3px 0 0;
              .left {
                width: 5%;
                a {
                  background-color: #d3d3d3;
                  position: relative;
                  font-size: 15px;
                  //0-650
                  @media screen and (max-width: 650px) {
                    padding: 0px;
                  }
                  //651-
                  @media screen and (min-width: 651px) {
                    padding: 2px;
                  }
                }
              }
              .middle {
                width: 80%;
                display: flex;
                flex-direction: column;
                padding: 0;
                .customize_container {
                  display: flex;
                  .customize {
                    color: #939393;
                    font-size: 15px;
                  }
                }
              }
              .right {
                width: 15%;
                text-align: end;
              }
            }
          }
        }
      }
    }

    .orderFooter {
      height: 15%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      button {
        width: 80%;
        background-color: rgb(84, 105, 212);
        box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
          rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgb(84, 105, 212) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
          rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;
        color: #fff;
        font-weight: 600;
        font-size: 16px;
        padding: 2px 8px;
        margin: 5px 1px 0 1px;
        border: unset;
        border-radius: 4px;
        outline-color: rgb(84 105 212 / 0.5);
      }
      .cancelBtn {
        background-color: rgb(118 118 118 / 23%);
        box-shadow: 0px 2px 4px #c5c5c5;
      }
    }
  }
}
</style>
