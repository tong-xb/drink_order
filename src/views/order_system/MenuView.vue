<template>
  <div class="scroll-container">
    <div class="menuContainer">
      <div class="titleContainer">
        <h1>{{ selectedVendor.vendorName }}</h1>
        <p>訂購時間: {{ selectedMenu.openTimeFrom }}~{{ selectedMenu.openTimeTo }}</p>
        <p>預計送達時間: {{ selectedMenu.arrivalTime }}</p>
      </div>
      <div class="typeContainer">
        <ul class="nav-bar">
          <li v-for="product in selectedVendor.product" :key="product.drinkType">
            <a @click="scrollTo(product.drinkType)">{{ product.drinkType }}</a>
          </li>
        </ul>
      </div>
      <div
        :id="product.drinkType"
        class="productContainer"
        v-for="product in selectedVendor.product"
        :key="product.drinkType"
      >
        <h1>{{ product.drinkType }}</h1>
        <div class="drinkContainer" v-for="drink in product.drinks" :key="drink.drinkName" @click="openForm(drink)">
          <a>{{ drink.drinkName }}</a>
          <a>{{ Object.values(drink.drinkPrice)[0] }}起 ></a>
        </div>
      </div>
      <CustomizeForm
        :product="selectedProduct.product"
        :menuId="props.menuId"
        v-show="formIsOpen"
        @emitWindowOpen="closeForm"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import CustomizeForm from '@/components/order_system/CustomizeForm.vue';
import menus from '@/api/axios/json/menus.json';
import vendors from '@/api/axios/json/vendors.json';

const props = defineProps({
  menuId: {
    type: String,
    required: true,
  },
});

const formIsOpen = ref(false);

const selectedProduct = reactive({
  product: {
    //    drinkId: '',
    // drinkName: '',
    // drinkPrice: {},
  },
});

const scrollTo = (drinkType) => {
  document.getElementById(drinkType).scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const openForm = (drink) => {
  formIsOpen.value = true;
  // selectedProduct.drinkId = drink.drinkId;
  // selectedProduct.drinkName = drink.drinkName;
  // selectedProduct.drinkPrice = drink.drinkPrice;
  selectedProduct.product = drink;
};

const closeForm = (data) => {
  formIsOpen.value = data;
};

const selectedVendor = computed(() => {
  let obj = {};
  vendors.vendor.forEach((item) => {
    if (item.vendorId == selectedMenu.value.vendorId) {
      obj = item;
    }
  });
  return obj;
});

const selectedMenu = computed(() => {
  let obj = {};
  menus.menu.forEach((item) => {
    if (item.menuId == props.menuId) {
      obj = item;
    }
  });
  return obj;
});
</script>

<style lang="scss" scoped>
* {
  scroll-margin-top: 53px;
}
.scroll-container {
  overflow: hidden;
  height: 100%;
  width: 100%;
  .menuContainer {
    height: 100%;
    overflow-y: auto;
    padding-right: 10px;
    box-sizing: content-box;
    width: 100%;
    .titleContainer {
      padding: 10px 20px;
    }
    .typeContainer {
      inset: 0 0 0 0;
      overflow-x: scroll;
      scroll-snap-type: x mandatory;
      scroll-padding-inline: 30px 0;
      white-space: nowrap;
      z-index: 100;
      position: sticky;
      overflow: hidden;
      height: 50px;
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333333;
        white-space: nowrap;
        display: flex;
        overflow-x: auto;
        height: 100%;
        padding-bottom: 8px;
        li {
          float: left;
          display: inline;
        }
        a {
          display: block;
          color: white;
          text-align: center;
          padding: 16px;
          text-decoration: none;
        }
        a:hover {
          background-color: #111111;
        }
      }
    }
    .productContainer {
      padding: 10px 20px;
      background-color: #f3f3f3;
      .drinkContainer {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
        padding: 5px 5px;
        box-shadow: rgb(197, 197, 197) 0px 2px 4px;
        font-size: 1em;
        line-height: 1.2em;
        font-family: Arial, verdana, 'Times New Roman', 微軟正黑體, 新細明體;
        border-radius: 10px;
        background-color: #ffffff;
      }
    }
  }
}
</style>
