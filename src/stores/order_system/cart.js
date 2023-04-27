import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

export const useCart = defineStore('cart', () => {
  // const cart = reactive({ all: [] });
  const cart = reactive({
    all: [
      { menuId: 'm001', productId: 'd001', size: 'M', ice: '多冰', sugar: '多糖', price: 20 },
      { menuId: 'm001', productId: 'd002', size: 'L', ice: '溫', sugar: '正常', price: 20 },
      { menuId: 'm001', productId: 'd003', size: 'M', ice: '熱', sugar: '無糖', price: 20 },
      { menuId: 'm002', productId: 'd003', size: 'M', ice: '熱', sugar: '無糖', price: 20 },
    ],
  });

  return {
    cart,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCart, import.meta.hot));
}
