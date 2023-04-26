import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive } from 'vue';

export const useCart = defineStore('cart', () => {
  const cart = reactive({ all: [] });

  return {
    cart,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCart, import.meta.hot));
}
