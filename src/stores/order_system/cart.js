import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive, computed } from 'vue';

export const useCart = defineStore('cart', () => {
  const unsentCart = reactive([
    // {
    //   menuId: 'm001',
    //   product: [
    //     { productId: 'd001',productName: '麥香紅茶', size: 'M', ice: '多冰', sugar: '多糖', price: 20 },
    //     { productId: 'd002',productName: '麥香紅茶', size: 'L', ice: '溫', sugar: '正常', price: 20 },
    //     { productId: 'd003',productName: '麥香紅茶', size: 'M', ice: '熱', sugar: '無糖', price: 20 },
    //   ],
    // },
    // {
    //   menuId: 'm002',
    //   isSend: false,
    //   product: [{ productId: 'd003', size: 'M', ice: '熱', sugar: '無糖', price: 20 }],
    // },
  ]);
  const sentCart = reactive([
    // {
    //   menuId: 'm001',
    //   product: [
    //     { productId: 'd001',productName: '麥香紅茶', size: 'M', ice: '多冰', sugar: '多糖', price: 20 },
    //     { productId: 'd002',productName: '麥香紅茶', size: 'L', ice: '溫', sugar: '正常', price: 20 },
    //     { productId: 'd003',productName: '麥香紅茶', size: 'M', ice: '熱', sugar: '無糖', price: 20 },
    //   ],
    // },
    // {
    //   menuId: 'm002',
    //   isSend: false,
    //   product: [{ productId: 'd003', size: 'M', ice: '熱', sugar: '無糖', price: 20 }],
    // },
  ]);

  const cart = reactive({
    all: [
      // { cart: '001', menuId: 'm001', productId: 'd001', size: 'M', ice: '多冰', sugar: '多糖', price: 20 ,isSend: false},
      // { cart: '002', menuId: 'm001', productId: 'd002', size: 'L', ice: '溫', sugar: '正常', price: 20 },
      // { cart: '003', menuId: 'm001', productId: 'd003', size: 'M', ice: '熱', sugar: '無糖', price: 20 },
      // { cart: '004', menuId: 'm002', productId: 'd003', size: 'M', ice: '熱', sugar: '無糖', price: 20 },
    ],
    byMenuCart: reactive({
      menuId: '',
      isSend: false,
      product: [{ productId: '', size: '', ice: '正常', sugar: '正常', price: 0 }],
    }),
  });

  const addToUnsentCart = (input) => {
    // input :{ menuId: 'm001', productId: 'd001', size: 'M', ice: '多冰', sugar: '多糖', price: 20},
    //menuId存在
    let isExist = false;
    unsentCart.forEach((item) => {
      if (item.menuId === input.menuId) {
        //menuId存在，加入product
        isExist = true;
        delete input.menuId;
        item.product.push(input);
      }
    });
    if (!isExist) {
      //menuId不存在，新增一筆object
      let obj = {
        menuId: input.menuId,
        product: [
          {
            productId: input.productId,
            productName: input.productName,
            size: input.size,
            ice: input.ice,
            sugar: input.sugar,
            price: input.price,
          },
        ],
      };
      unsentCart.push(obj);
    }
  };

  const addToSentCart = (id) => {
    console.log(id);
    unsentCart.forEach((item, idx) => {
      console.log(item.menuId);
      if (item.menuId === id) {
        console.log(2);
        sentCart.push(item);
        unsentCart.splice(idx, 1);
      }
    });
  };

  const menuList = computed(() => {
    let list = [];
    // list: [m001,m001,m001,002]
    list = cart.all.map((e) => e.menuId);
    // list: [m001,002]
    list = list.filter((el, idx, arr) => {
      return arr.indexOf(el) === idx;
    });
    return list;
  });

  // {m001:[object Object],[object Object],m002:[object Object]}
  const byMenuId = computed(() => {
    let obj = {};
    menuList.value.forEach((id) => {
      let list = [];
      cart.all.forEach((cartItem) => {
        if (cartItem.menuId === id) {
          // delete cartItem.menuId;
          list.push(cartItem);
        }
      });
      console.log(id + ':' + list);
      obj[id] = list;
    });
    return obj;
  });

  return {
    cart,
    byMenuId,
    menuList,
    addToUnsentCart,
    addToSentCart,
    unsentCart,
    sentCart,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCart, import.meta.hot));
}
