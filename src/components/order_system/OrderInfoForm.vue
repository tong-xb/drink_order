<template>
  <div>
    <div class="modal-background"></div>
    <div class="modal-base">
      <!-- Modal content -->
      <div class="modal-content">
        <div class="orderHeader">
          <h1>{{ thisMenu.vendorName }}</h1>
        </div>
        <div class="orderBody">
          <label class="title">訂購時間:</label>
          <label>{{ thisMenu.openTimeFrom }} ~ {{ thisMenu.openTimeTo }}</label>
          <label class="title">預計送達時間:</label>
          <label>{{ thisMenu.arrivalTime }}</label>
          <label class="title">地址:</label>
          <label>{{ thisVendor.vendorAddress }}</label>
          <div class="orderContainer">
            <label>訂單</label>
            <div>
              <label>張雅婷</label>
              <div class="order_container_content">
                <div class="left">
                  <a>1</a>
                </div>
                <div class="middle">
                  <p class="name">泡沫紅茶</p>
                  <div class="customize_container">
                    <p class="customize">L,微冰,無糖</p>
                  </div>
                </div>
                <div class="right">
                  <p>$20</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="orderFooter">
          <button @click="endOrder">提早結束訂單</button>
          <button class="cancelBtn" @click="closeWindow">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import menus from '@/api/axios/json/menus.json';
import vendors from '@/api/axios/json/vendors.json';
import { computed } from 'vue';

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

const endOrder = () => {
  if (confirm('確定要現在結束嗎?') == true) {
    console.log('訂單結束');
  }
};
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
    .orderBody {
      overflow: auto;
      height: 70%;

      .title {
        font-weight: 600;
        margin-top: 8px;
      }

      label {
        display: block;
      }

      .order_container_content {
        display: flex;
        padding: 20px 0 10px 0;
        .left {
          width: 5%;
          a {
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
        }
        .middle {
          width: 80%;
          display: flex;
          flex-direction: column;
          padding: 0;
          .name {
            font-size: larger;
            font-weight: bold;
          }
          .customize_container {
            display: flex;
            .customize {
              color: #939393;
            }
          }
        }
        .right {
          width: 15%;
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
