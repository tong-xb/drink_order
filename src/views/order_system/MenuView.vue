<template>
  <div>
    <div class="titleContainer">
      <h1>{{ selectedStore.storeName }}</h1>
      <h1></h1>
      <a>訂購時間: {{ selectedMenu.openTimeFrom }}~{{ selectedMenu.openTimeTo }}</a>
      <a>預計送達時間: {{ selectedMenu.arrivalTime }}</a>
    </div>
    <div class="typeContainer">
      <nav>
        <a v-for="product in selectedStore.product" :key="product.drinkType">{{ product.drinkType }}</a>
      </nav>
    </div>
    <div class="productContainer" v-for="product in selectedStore.product" :key="product.drinkType">
      <h1>{{ product.drinkType }}</h1>
      <div class="drinkContainer" v-for="drink in product.drinks" :key="drink.drinkName" @click="openMenu(drink)">
        <a>{{ drink.drinkName }}</a>
        <a>{{ drink.drinkPrice.M }}起 ></a>
      </div>
    </div>
    <OrderWindow :product="selectedProduct" v-show="windowOpen" @emitWindowOpen="closeMenu" />
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue';
import OrderWindow from '@/components/order_system/OrderWindow.vue';

const props = defineProps({
  menuId: {
    type: String,
    required: true,
  },
});

const windowOpen = ref(false);

const selectedProduct = reactive({
  drinkId: '',
  drinkName: '',
  drinkPrice: {
    M: '',
    L: '',
  },
});

const openMenu = (drink) => {
  windowOpen.value = true;
  console.log(drink);
  selectedProduct.drinkId = drink.drinkId;
  selectedProduct.drinkName = drink.drinkName;
  selectedProduct.drinkPrice = drink.drinkPrice;
};

const closeMenu = (data) => {
  windowOpen.value = data;
};

const selectedStore = computed(() => {
  let store = {};
  stores.stores.forEach((item) => {
    if (item.storeId == selectedMenu.value.storeId) {
      store = item;
    }
  });
  return store;
});

const selectedMenu = computed(() => {
  let menu = {};
  menus.menu.forEach((item) => {
    if (item.menuId == props.menuId) {
      menu = item;
    }
  });
  return menu;
});

const stores = reactive({
  stores: [
    {
      storeId: 's001',
      storeName: '50嵐',
      storeType: '飲料',
      storeAddress: '台北市松山區北寧路26號',
      product: [
        {
          drinkTypeId: 't001',
          drinkType: '找好茶',
          drinks: [
            {
              drinkId: 'd001',
              drinkName: '茉莉綠茶',
              drinkPrice: {
                M: 20,
                L: 25,
              },
            },
            {
              drinkId: 'd002',
              drinkName: '阿薩姆紅茶',
              drinkPrice: {
                M: 20,
                L: 25,
              },
            },
            {
              drinkId: 'd003',
              drinkName: '四季春青茶',
              drinkPrice: {
                M: 20,
                L: 25,
              },
            },
            {
              drinkId: 'd004',
              drinkName: '黃金烏龍',
              drinkPrice: {
                M: 20,
                L: 25,
              },
            },
            {
              drinkId: 'd005',
              drinkName: '波霸綠',
              drinkPrice: {
                M: 25,
                L: 35,
              },
            },
            {
              drinkId: 'd006',
              drinkName: '波霸紅',
              drinkPrice: {
                M: 25,
                L: 35,
              },
            },
            {
              drinkId: 'd007',
              drinkName: '微檸檬紅',
              drinkPrice: {
                M: 25,
                L: 35,
              },
            },
            {
              drinkId: 'd008',
              drinkName: '微檸檬青',
              drinkPrice: {
                M: 25,
                L: 35,
              },
            },
            {
              drinkId: 'd009',
              drinkName: '檸檬綠',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd010',
              drinkName: '檸檬青',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd011',
              drinkName: '梅子綠',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd012',
              drinkName: '8冰綠',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd013',
              drinkName: '多多綠',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd014',
              drinkName: '冰淇淋紅茶',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd015',
              drinkName: '旺來紅',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd016',
              drinkName: '鮮柚綠',
              drinkPrice: {
                M: 40,
                L: 55,
              },
            },
          ],
        },
        {
          drinkTypeId: 't002',
          drinkType: '找拿鐵 (鮮奶)',
          drinks: [
            {
              drinkId: 'd001',
              drinkName: '紅茶拿鐵',
              drinkPrice: {
                M: 40,
                L: 55,
              },
            },
            {
              drinkId: 'd002',
              drinkName: '抹茶拿鐵',
              drinkPrice: {
                M: 45,
                L: 65,
              },
            },
            {
              drinkId: 'd003',
              drinkName: '珍珠紅茶拿鐵',
              drinkPrice: {
                M: 40,
                L: 55,
              },
            },
            {
              drinkId: 'd004',
              drinkName: '波霸紅茶拿鐵',
              drinkPrice: {
                M: 40,
                L: 55,
              },
            },
            {
              drinkId: 'd005',
              drinkName: '波霸抹茶拿鐵',
              drinkPrice: {
                M: 45,
                L: 65,
              },
            },
            {
              drinkId: 'd006',
              drinkName: '阿華田拿鐵',
              drinkPrice: {
                M: 45,
                L: 65,
              },
            },
            {
              drinkId: 'd007',
              drinkName: '冰淇淋紅茶拿鐵',
              drinkPrice: {
                M: 50,
                L: 70,
              },
            },
          ],
        },
        {
          drinkTypeId: 't003',
          drinkType: '找奶茶 (奶精)',
          drinks: [
            {
              drinkId: 'd001',
              drinkName: '奶茶',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd002',
              drinkName: '奶綠',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd003',
              drinkName: '烏龍奶',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd004',
              drinkName: '珍珠奶茶',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd005',
              drinkName: '珍珠奶綠',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd006',
              drinkName: '波霸奶茶',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd007',
              drinkName: '波霸奶綠',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd008',
              drinkName: '紅茶瑪奇朵 (鮮奶油)',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd009',
              drinkName: '阿華田',
              drinkPrice: {
                M: 35,
                L: 50,
              },
            },
            {
              drinkId: 'd010',
              drinkName: '冰淇淋奶茶',
              drinkPrice: {
                M: 40,
                L: 55,
              },
            },
          ],
        },
        {
          drinkTypeId: 't004',
          drinkType: '找新鮮 (無咖啡因)',
          drinks: [
            {
              drinkId: 'd001',
              drinkName: '8冰茶',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd002',
              drinkName: '檸檬汁',
              drinkPrice: {
                M: 40,
                L: 55,
              },
            },
            {
              drinkId: 'd003',
              drinkName: '葡萄柚汁',
              drinkPrice: {
                M: 40,
                L: 55,
              },
            },
            {
              drinkId: 'd004',
              drinkName: '金桔檸檬',
              drinkPrice: {
                M: 40,
                L: 55,
              },
            },
            {
              drinkId: 'd005',
              drinkName: '檸檬梅汁',
              drinkPrice: {
                M: 40,
                L: 55,
              },
            },
            {
              drinkId: 'd006',
              drinkName: '檸檬多多',
              drinkPrice: {
                M: 45,
                L: 65,
              },
            },
            {
              drinkId: 'd007',
              drinkName: '葡萄柚多多',
              drinkPrice: {
                M: 45,
                L: 65,
              },
            },
          ],
        },
      ],
    },
    {
      storeId: 's002',
      storeName: '龜記',
      storeType: '飲料',
      storeAddress: '台北市松山區八德路三段74巷4號',
      product: [
        {
          drinkTypeId: 't001',
          drinkType: '龜記找好茶',
          drinks: [
            {
              drinkId: 'd001',
              drinkName: '茉莉綠茶',
              drinkPrice: {
                M: 20,
                L: 25,
              },
            },
            {
              drinkId: 'd002',
              drinkName: '阿薩姆紅茶',
              drinkPrice: {
                M: 20,
                L: 25,
              },
            },
            {
              drinkId: 'd003',
              drinkName: '四季春青茶',
              drinkPrice: {
                M: 20,
                L: 25,
              },
            },
            {
              drinkId: 'd004',
              drinkName: '黃金烏龍',
              drinkPrice: {
                M: 20,
                L: 25,
              },
            },
            {
              drinkId: 'd005',
              drinkName: '波霸綠',
              drinkPrice: {
                M: 25,
                L: 35,
              },
            },
            {
              drinkId: 'd006',
              drinkName: '波霸紅',
              drinkPrice: {
                M: 25,
                L: 35,
              },
            },
            {
              drinkId: 'd007',
              drinkName: '微檸檬紅',
              drinkPrice: {
                M: 25,
                L: 35,
              },
            },
            {
              drinkId: 'd008',
              drinkName: '微檸檬青',
              drinkPrice: {
                M: 25,
                L: 35,
              },
            },
            {
              drinkId: 'd009',
              drinkName: '檸檬綠',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd010',
              drinkName: '檸檬青',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd011',
              drinkName: '梅子綠',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd012',
              drinkName: '8冰綠',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd013',
              drinkName: '多多綠',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd014',
              drinkName: '冰淇淋紅茶',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd015',
              drinkName: '旺來紅',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd016',
              drinkName: '鮮柚綠',
              drinkPrice: {
                M: 40,
                L: 55,
              },
            },
          ],
        },
        {
          drinkTypeId: 't002',
          drinkType: '龜記找拿鐵 (鮮奶)',
          drinks: [
            {
              drinkId: 'd001',
              drinkName: '紅茶拿鐵',
              drinkPrice: {
                M: 40,
                L: 55,
              },
            },
            {
              drinkId: 'd002',
              drinkName: '抹茶拿鐵',
              drinkPrice: {
                M: 45,
                L: 65,
              },
            },
            {
              drinkId: 'd003',
              drinkName: '珍珠紅茶拿鐵',
              drinkPrice: {
                M: 40,
                L: 55,
              },
            },
            {
              drinkId: 'd004',
              drinkName: '波霸紅茶拿鐵',
              drinkPrice: {
                M: 40,
                L: 55,
              },
            },
            {
              drinkId: 'd005',
              drinkName: '波霸抹茶拿鐵',
              drinkPrice: {
                M: 45,
                L: 65,
              },
            },
            {
              drinkId: 'd006',
              drinkName: '阿華田拿鐵',
              drinkPrice: {
                M: 45,
                L: 65,
              },
            },
            {
              drinkId: 'd007',
              drinkName: '冰淇淋紅茶拿鐵',
              drinkPrice: {
                M: 50,
                L: 70,
              },
            },
          ],
        },
        {
          drinkTypeId: 't003',
          drinkType: '龜記找奶茶 (奶精)',
          drinks: [
            {
              drinkId: 'd001',
              drinkName: '奶茶',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd002',
              drinkName: '奶綠',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd003',
              drinkName: '烏龍奶',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd004',
              drinkName: '珍珠奶茶',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd005',
              drinkName: '珍珠奶綠',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd006',
              drinkName: '波霸奶茶',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd007',
              drinkName: '波霸奶綠',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd008',
              drinkName: '紅茶瑪奇朵 (鮮奶油)',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd009',
              drinkName: '阿華田',
              drinkPrice: {
                M: 35,
                L: 50,
              },
            },
            {
              drinkId: 'd010',
              drinkName: '冰淇淋奶茶',
              drinkPrice: {
                M: 40,
                L: 55,
              },
            },
          ],
        },
        {
          drinkTypeId: 't004',
          drinkType: '龜記找新鮮 (無咖啡因)',
          drinks: [
            {
              drinkId: 'd001',
              drinkName: '8冰茶',
              drinkPrice: {
                M: 30,
                L: 45,
              },
            },
            {
              drinkId: 'd002',
              drinkName: '檸檬汁',
              drinkPrice: {
                M: 40,
                L: 55,
              },
            },
            {
              drinkId: 'd003',
              drinkName: '葡萄柚汁',
              drinkPrice: {
                M: 40,
                L: 55,
              },
            },
            {
              drinkId: 'd004',
              drinkName: '金桔檸檬',
              drinkPrice: {
                M: 40,
                L: 55,
              },
            },
            {
              drinkId: 'd005',
              drinkName: '檸檬梅汁',
              drinkPrice: {
                M: 40,
                L: 55,
              },
            },
            {
              drinkId: 'd006',
              drinkName: '檸檬多多',
              drinkPrice: {
                M: 45,
                L: 65,
              },
            },
            {
              drinkId: 'd007',
              drinkName: '葡萄柚多多',
              drinkPrice: {
                M: 45,
                L: 65,
              },
            },
          ],
        },
      ],
    },
  ],
});

const menus = reactive({
  menu: [
    {
      menuId: 'm001',
      storeId: 's001',
      storeName: '50嵐',
      storeType: '飲料',
      openTimeFrom: '4/19 (三) 10:00',
      openTimeTo: '4/19 (三) 11:00',
      arrivalTime: '4/19 (三) 12:00',
    },
    {
      menuId: 'm002',
      storeId: 's002',
      storeName: '龜記',
      storeType: '飲料',
      openTimeFrom: '4/20 (四) 10:00',
      openTimeTo: '4/20 (四) 11:00',
      arrivalTime: '4/20 (四) 12:00',
    },
  ],
});
</script>

<style>
.titleContainer {
  padding: 10px 20px;
}
.productContainer {
  padding: 10px 20px;
  /* border: 1px solid black; */
}
.typeContainer {
  inset: 0 0 0 0;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-padding-inline: 30px 0;
  white-space: nowrap;
  z-index: 100;
}
.typeContainer a {
  background-color: antiquewhite;
  margin: 1px 2px;
}
.drinkContainer {
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  padding: 5px 5px;
  border: 1px solid black;
}
</style>
