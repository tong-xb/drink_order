<template>
  <div>
    <div class="modal-background"></div>
    <div class="modal-base">
      <!-- Modal content -->
      <div class="modal-content">
        <div class="orderHeader">
          <h1>{{ thisVendor.vendorName }}</h1>
        </div>
        <div class="orderBody">
          <label class="address">地址:{{ thisVendor.vendorAddress }}</label>

          <div class="item">
            <label>開始訂購時間:</label>
            <p class="warning" v-show="!isInput.openTimeFrom">此欄位為必填!</p>
            <input type="datetime" placeholder="YYYY/MM/DD HH:MM" v-model="times.openTimeFrom" />
          </div>
          <div class="item">
            <label>截止訂購時間:</label>
            <p class="warning" v-show="!isInput.openTimeTo">此欄位為必填!</p>
            <input type="datetime" placeholder="YYYY/MM/DD HH:MM" v-model="times.openTimeTo" />
          </div>
          <div class="item">
            <label>預計到達時間:</label>
            <p class="warning" v-show="!isInput.arrivalTime">此欄位為必填!</p>
            <input type="datetime" placeholder="YYYY/MM/DD HH:MM" v-model="times.arrivalTime" />
          </div>
        </div>
        <div class="orderFooter">
          <button @click="addToCart">加入訂單</button>
          <button class="cancelBtn" @click="closeWindow">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import menus from '@/api/axios/json/menus.json';
import vendors from '@/api/axios/json/vendors.json';
import { computed, reactive, watch } from 'vue';

const props = defineProps({
  vendorId: {
    type: String,
    required: true,
  },
});

const emit = defineEmits('emitWindowOpen');
const closeWindow = () => {
  clearSheet();
  emit('emitWindowOpen', false);
};

const isInput = reactive({
  //有沒有選擇
  openTimeFrom: true,
  openTimeTo: true,
  arrivalTime: true,
});

const times = reactive({
  openTimeFrom: '',
  openTimeTo: '',
  arrivalTime: '',
});

// reactive需透過函式監控,只能監控單一的值
watch(
  () => times.openTimeFrom,
  (newVal) => {
    if (newVal) {
      isInput.openTimeFrom = true;
    }
  },
  { deep: true }
);

watch(
  () => times.openTimeTo,
  (newVal) => {
    if (newVal) {
      isInput.openTimeTo = true;
    }
  },
  { deep: true }
);
watch(
  () => times.arrivalTime,
  (newVal) => {
    if (newVal) {
      isInput.arrivalTime = true;
    }
  },
  { deep: true }
);

const checkIsInput = () => {
  let bol = true;
  if (!times.openTimeFrom) {
    isInput.openTimeFrom = false;
    bol = false;
  } else {
    isInput.openTimeFrom = true;
  }
  if (!times.openTimeTo) {
    isInput.openTimeTo = false;
    bol = false;
  } else {
    isInput.openTimeTo = true;
  }
  if (!times.arrivalTime) {
    isInput.arrivalTime = false;
    bol = false;
  } else {
    isInput.arrivalTime = true;
  }
  return bol;
};

const addToCart = () => {
  if (checkIsInput()) {
    // console.log('addToCart');
    let length = menus.menu.length;
    let menuId = 'm' + length;
    menus.menu.push({ menuId, ...times, ...thisVendor.value });
    // console.log(menus.menu);
    closeWindow();
  }
};

const clearSheet = () => {
  times.openTimeFrom = '';
  times.openTimeTo = '';
  times.arrivalTime = '';
  isInput.openTimeFrom = true;
  isInput.openTimeTo = true;
  isInput.arrivalTime = true;
};

const thisVendor = computed(() => {
  let obj = {};
  vendors.vendor.forEach((item) => {
    if (item.vendorId === props.vendorId) {
      obj.vendorId = item.vendorId;
      obj.vendorName = item.vendorName;
      obj.vendorType = item.vendorType;
      obj.vendorAddress = item.vendorAddress;
    }
  });
  return obj;
});
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
      .address {
        margin-bottom: 20px;
      }
      label {
        font-weight: 600;
        display: block;
      }
      .warning {
        color: red;
        font-size: small;
      }
      input {
        font-size: 16px;
        line-height: 28px;
        padding: 2px 8px;
        margin: 3px 1px 20px 1px;
        border: unset;
        border-radius: 4px;
        outline-color: rgb(84 105 212 / 0.5);
        background-color: rgb(255 255 255);
        box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
          rgba(60, 66, 87, 0.16) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
          rgba(0, 0, 0, 0) 0px 0px 0px 0px;
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
