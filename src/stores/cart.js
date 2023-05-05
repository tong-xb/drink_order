import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive, computed } from 'vue';
import { formatDate } from '@/common/method_common/formatDate.js';
import menus from '@/api/axios/json/menus.json';

export const useCart = defineStore('cart', () => {
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
    // {
    //   menuId: 'm001',
    //   product: [
    //     { productId: 'd001',productName: '麥香紅茶', size: 'M', ice: '多冰', sugar: '多糖', price: 20 },
    //     { productId: 'd002',productName: '麥香紅茶', size: 'L', ice: '溫', sugar: '正常', price: 20 },
    //     { productId: 'd003',productName: '麥香紅茶', size: 'M', ice: '熱', sugar: '無糖', price: 20 },
    //   ],
    // },
    unsentCart: reactive([]),
    sentCart: reactive([]),
    completeCart: reactive([]),
  });

  const addToUnsentCart = (input) => {
    // input :{ menuId: 'm001', productId: 'd001', size: 'M', ice: '多冰', sugar: '多糖', price: 20},
    //menuId存在
    let isExist = false;
    cart.unsentCart.forEach((item) => {
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
      cart.unsentCart.push(obj);
      // console.log(cart.unsentCart);
    }
  };

  const addToSentCart = (id) => {
    cart.unsentCart.forEach((item, idx) => {
      if (item.menuId === id) {
        cart.sentCart.push(item);
        cart.unsentCart.splice(idx, 1);
      }
    });
  };

  const addToCompleteCart = (id) => {
    cart.sentCart.forEach((item, idx) => {
      if (item.menuId === id) {
        cart.completeCart.push(item);
        cart.sentCart.splice(idx, 1);
      }
    });
  };

  const checkOutOfDate = setInterval(() => {
    let today = formatDate(new Date(), 'YYYY/MM/DD HH:mm');
    //unsentCart
    //openTimeTo > today:刪除˙

    cart.unsentCart.forEach((item, idx) => {
      let menuInfo = menus.menu.filter((el) => {
        return el.menuId === item.menuId;
      });

      if (menuInfo[0].openTimeTo <= today) {
        // console.log('openTimeTo <= today: unsentCart刪除');
        cart.unsentCart.splice(idx, 1);
      }
    });

    //sentCart
    //arrivalTime > today:移到completeCart
    cart.sentCart.forEach((item, idx) => {
      let menuInfo = menus.menu.filter((el) => {
        return el.menuId === item.menuId;
      });
      console.log('today:', today);
      console.log('arrivalTime:', menuInfo[0].arrivalTime);
      console.log(menuInfo[0].arrivalTime <= today);
      if (menuInfo[0].arrivalTime <= today) {
        console.log('arrivalTime <= today:sentCart移到completeCart');
        cart.completeCart.push(item);
        cart.sentCart.splice(idx, 1);
      }
    });
  }, 5000);

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
      // console.log(id + ':' + list);
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
    checkOutOfDate,
    addToCompleteCart,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCart, import.meta.hot));
}
