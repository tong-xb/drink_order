<template>
  <div>
    <div class="modal-background"></div>
    <div class="modal-base">
      <!-- Modal content -->
      <div class="modal-content">
        <div class="orderHeader">
          <h1>{{ props.product.drinkName }}</h1>
        </div>
        <div class="scroll-container">
          <div class="orderBody">
            <div class="orderBody-content">
              <h3>大小</h3>
              <p class="warning" v-show="!ratioSelect.size">請選擇飲料大小!</p>
              <div class="radioSelector">
                <label for="M" class="size_container shadow-container">
                  <div class="size_container_L">
                    <input id="M" type="radio" name="size" value="M" v-model="bag.size" />
                    <p>M</p>
                  </div>
                  <p>{{ props.product.drinkPrice.M }}</p>
                </label>
                <label for="L" class="size_container shadow-container">
                  <div class="size_container_L">
                    <input id="L" type="radio" name="size" value="L" v-model="bag.size" />
                    <p>L</p>
                  </div>
                  <p>{{ props.product.drinkPrice.L }}</p>
                </label>
              </div>
            </div>
            <div class="orderBody-content">
              <h3>冰塊</h3>
              <p class="warning" v-show="!ratioSelect.ice">請選擇飲料冰塊!</p>
              <div class="radioSelector">
                <label for="ice1" class="cus-container shadow-container">
                  <input id="ice1" type="radio" name="ice" value="多冰" v-model="bag.ice" />
                  <p>多冰</p>
                </label>
                <label for="ice2" class="cus-container shadow-container">
                  <input id="ice2" type="radio" name="ice" value="少冰" v-model="bag.ice" />
                  <p>少冰</p>
                </label>
                <label for="ice3" class="cus-container shadow-container">
                  <input id="ice3" type="radio" name="ice" value="微冰" v-model="bag.ice" />
                  <p>微冰</p>
                </label>
                <label for="ice4" class="cus-container shadow-container">
                  <input id="ice4" type="radio" name="ice" value="去冰" v-model="bag.ice" />
                  <p>去冰</p>
                </label>
                <label for="ice5" class="cus-container shadow-container">
                  <input id="ice5" type="radio" name="ice" value="溫" v-model="bag.ice" />
                  <p>溫</p>
                </label>
                <label for="ice6" class="cus-container shadow-container">
                  <input id="ice6" type="radio" name="ice" value="熱" v-model="bag.ice" />
                  <p>熱</p>
                </label>
              </div>
            </div>
            <div class="orderBody-content">
              <h3>甜度</h3>
              <p class="warning" v-show="!ratioSelect.sugar">請選擇飲料甜度!</p>
              <div class="radioSelector">
                <label for="sugar1" class="cus-container shadow-container">
                  <input id="sugar1" type="radio" name="sugar" value="多糖" v-model="bag.sugar" />
                  <p>多糖</p>
                </label>
                <label for="sugar2" class="cus-container shadow-container">
                  <input id="sugar2" type="radio" name="sugar" value="正常" v-model="bag.sugar" />
                  <p>正常</p>
                </label>
                <label for="sugar3" class="cus-container shadow-container">
                  <input id="sugar3" type="radio" name="sugar" value="少糖" v-model="bag.sugar" />
                  <p>少糖</p>
                </label>
                <label for="sugar4" class="cus-container shadow-container">
                  <input id="sugar4" type="radio" name="sugar" value="半糖" v-model="bag.sugar" />
                  <p>半糖</p>
                </label>
                <label for="sugar5" class="cus-container shadow-container">
                  <input id="sugar5" type="radio" name="sugar" value="微糖" v-model="bag.sugar" />
                  <p>微糖</p>
                </label>
                <label for="sugar6" class="cus-container shadow-container">
                  <input id="sugar6" type="radio" name="sugar" value="淺糖" v-model="bag.sugar" />
                  <p>淺糖</p>
                </label>
                <label for="sugar7" class="cus-container shadow-container">
                  <input id="sugar7" type="radio" name="sugar" value="無糖" v-model="bag.sugar" />
                  <p>無糖</p>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="orderFooter">
          <button @click="addToCart">加入訂單 ${{ total }}</button>
          <button class="cancelBtn" @click="closeWindow">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, watch } from 'vue';
import { useCart } from '@/stores/cart';

const cartStore = useCart();

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

const bag = reactive({
  productId: '',
  size: '',
  ice: '',
  sugar: '',
});

const ratioSelect = reactive({
  //有沒有選擇
  size: true,
  ice: true,
  sugar: true,
});

// reactive需透過函式監控,只能監控單一的值
watch(
  () => bag.size,
  (newVal) => {
    if (newVal) {
      ratioSelect.size = true;
    }
  },
  { deep: true }
);

watch(
  () => bag.ice,
  (newVal) => {
    if (newVal) {
      ratioSelect.ice = true;
    }
  },
  { deep: true }
);
watch(
  () => bag.sugar,
  (newVal) => {
    if (newVal) {
      ratioSelect.sugar = true;
    }
  },
  { deep: true }
);

const checkRatioSelect = () => {
  let bol = true;
  if (!bag.size) {
    ratioSelect.size = false;
    bol = false;
  } else {
    ratioSelect.size = true;
  }
  if (!bag.ice) {
    ratioSelect.ice = false;
    bol = false;
  } else {
    ratioSelect.ice = true;
  }
  if (!bag.sugar) {
    ratioSelect.sugar = false;
    bol = false;
  } else {
    ratioSelect.sugar = true;
  }
  return bol;
};

const addToCart = () => {
  if (checkRatioSelect()) {
    const bagToPush = {
      menuId: props.menuId,
      productId: bag.productId,
      productName: props.product.drinkName,
      size: bag.size,
      ice: bag.ice,
      sugar: bag.sugar,
      price: total.value,
    };
    cartStore.addToUnsentCart(bagToPush);
    closeWindow();
  }
};

const clearSheet = () => {
  let radio = document.querySelectorAll('input[type=radio]:checked');
  if (radio) {
    radio.forEach((item) => {
      item.checked = false;
    });
  }
  bag.size = '';
  bag.ice = '';
  bag.sugar = '';
  ratioSelect.size = true;
  ratioSelect.ice = true;
  ratioSelect.sugar = true;
};

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
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.3s ease-in-out;
}
.modal-base {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
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
    @media screen and (min-width: 800px) {
      width: 400px;
    }

    .orderHeader {
      height: 15%;
      text-align: center;
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
        .orderBody-content {
          padding: 5px 0;

          h3 {
            padding: 5px 0;
          }
          .warning {
            color: red;
            font-size: small;
          }
          .size_container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .size_container_L {
              display: flex;
            }
          }
          .radioSelector input {
            margin: 0 5px 0 0;
          }

          .radioSelector div {
            padding-top: 5px;
          }

          .cus-container {
            display: flex;
          }
          .shadow-container {
            margin: 10px 3px 0 3px;
            padding: 0 5px;
            box-shadow: 0px 2px 4px #c5c5c5;
            border-radius: 10px;
            font-size: 1em;
            line-height: 1.425em;
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

// .l-radio {
//   $primary: #6743ee;
//   $secondary: #9f9f9f;
//   padding: 6px;
//   border-radius: 50px;
//   display: inline-flex;
//   cursor: pointer;
//   transition: background-color 0.2s ease;
//   margin: 8px 0;
//   -webkit-tap-highlight-color: transparent;

//   &:hover,
//   &:focus-within {
//     background-color: rgba($secondary, 0.1);
//   }

//   input {
//     vertical-align: middle;
//     width: 20px;
//     height: 20px;
//     border-radius: 10px;
//     background-color: none;
//     border: 0;
//     box-shadow: inset 0 0 0 1px $secondary;
//     box-shadow: inset 0 0 0 1.5px $secondary;
//     appearance: none;
//     padding: 0;
//     margin: 0;
//     transition: box-shadow 150ms cubic-bezier(0.95, 0.15, 0.5, 1.25);
//     pointer-events: none;
//   }

//   &:focus {
//     outline: none;
//   }

//   &:checked {
//     box-shadow: inset 0 0 0 6px $primary;
//   }
// }
</style>
