import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useCart = defineStore('cart', () => {
  let product = reactive([
    {
      size: '',
      ice: '',
      sugar: '',
    },
  ]);

  return {
    product,
  };
});
