<template>
  <div>
    <div class="modal-background"></div>
    <div class="modal-base">
      <!-- Modal content -->
      <div class="modal-content">
        <div class="orderHeader">
          <h1>{{ props.product.drinkName }}</h1>
        </div>
        <div class="orderBody">
          <div class="orderBody-content">
            <h3>大小</h3>
            <div class="radioSelector">
              <div class="radioSelector_container">
                <div>
                  <input type="radio" name="size" value="M" v-model="bag.size" />
                  <label for="M">M</label>
                </div>
                <label for="M">{{ props.product.drinkPrice.M }}</label>
              </div>
              <div class="radioSelector_container">
                <div>
                  <input type="radio" name="size" value="L" v-model="bag.size" />
                  <label for="L">L</label>
                </div>
                <label for="L">{{ props.product.drinkPrice.L }}</label>
              </div>
            </div>
          </div>
          <div class="orderBody-content">
            <h3>冰塊</h3>
            <div class="radioSelector">
              <div>
                <input type="radio" name="ice" value="多冰" v-model="bag.ice" />
                <label for="ice1">多冰</label>
              </div>
              <div>
                <input type="radio" name="ice" value="少冰" v-model="bag.ice" />
                <label for="ice2">少冰</label>
              </div>
              <div>
                <input type="radio" name="ice" value="微冰" v-model="bag.ice" />
                <label for="ice3">微冰</label>
              </div>
              <div>
                <input type="radio" name="ice" value="去冰" v-model="bag.ice" />
                <label for="ice4">去冰</label>
              </div>
              <div>
                <input type="radio" name="ice" value="溫" v-model="bag.ice" />
                <label for="ice5">溫</label>
              </div>
              <div>
                <input type="radio" name="ice" value="熱" v-model="bag.ice" />
                <label for="ice6">熱</label>
              </div>
            </div>
          </div>
          <div class="orderBody-content">
            <h3>甜度</h3>
            <div class="radioSelector">
              <div>
                <input type="radio" name="sugar" value="多糖" v-model="bag.sugar" />
                <label for="sugar1">多糖</label>
              </div>
              <div>
                <input type="radio" name="sugar" value="正常" v-model="bag.sugar" />
                <label for="sugar2">正常</label>
              </div>
              <div>
                <input type="radio" name="sugar" value="少糖" v-model="bag.sugar" />
                <label for="sugar3">少糖</label>
              </div>
              <div>
                <input type="radio" name="sugar" value="半糖" v-model="bag.sugar" />
                <label for="sugar4">半糖</label>
              </div>
              <div>
                <input type="radio" name="sugar" value="微糖" v-model="bag.sugar" />
                <label for="sugar5">微糖</label>
              </div>
              <div>
                <input type="radio" name="sugar" value="淺糖" v-model="bag.sugar" />
                <label for="sugar6">淺糖</label>
              </div>
              <div>
                <input type="radio" name="sugar" value="無糖" v-model="bag.sugar" />
                <label for="sugar7">無糖</label>
              </div>
            </div>
          </div>
        </div>
        <div class="orderFooter">
          <button @click="addToCart">加入訂單 - ${{ total }}</button>
          <button @click="closeWindow">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';
import { useCart } from '@/stores/order_system/cart';

const storeCart = useCart();

const addToCart = () => {
  const bagToPush = {
    menuId: props.menuId,
    productId: bag.productId,
    size: bag.size,
    ice: bag.ice,
    sugar: bag.sugar,
    price: total.value,
  };
  storeCart.cart.all.push(bagToPush);
  closeWindow();
};

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  menuId: {
    type: String,
    required: true,
  },
});
const emit = defineEmits('emitWindowOpen');
const closeWindow = () => {
  clearSheet();
  emit('emitWindowOpen', false);
};
const clearSheet = () => {
  let radio = document.querySelectorAll('input[type=radio]:checked');
  if (radio) {
    console.log(radio);
    radio.forEach((item) => {
      item.checked = false;
    });
  }
  bag.size = '';
  bag.ice = '';
  bag.sugar = '';
};
const bag = reactive({
  productId: '',
  size: '',
  ice: '',
  sugar: '',
});

watch(props, (newVal) => {
  bag.productId = newVal.product.drinkId;
});

const total = computed(() => {
  let price = 0;
  if (bag.size === 'M') {
    price = props.product.drinkPrice.M;
  } else if (bag.size === 'L') {
    price = props.product.drinkPrice.L;
  }
  return price;
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
}
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
}
.orderHeader {
  height: 15%;
  text-align: center;
}
.orderBody {
  overflow: auto;
  height: 70%;
}
.orderBody-content {
  padding: 5px 0;
}
.orderBody-content h3 {
  padding: 5px 0;
}
.radioSelector_container {
  display: flex;
  justify-content: space-between;
}
.radioSelector input {
  margin: 0 5px 0 0;
}
.radioSelector div {
  padding-top: 5px;
}
.orderFooter {
  height: 15%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.orderFooter button {
  width: 80%;
  margin: 3px;
}
</style>
