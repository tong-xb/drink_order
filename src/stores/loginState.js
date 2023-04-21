import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoginStore = defineStore('loginState', () => {
  const isLogin = ref(false);
  const userName = ref('');
  const userid = ref('');
  const isAdmin = ref(false);

  return {
    isLogin,
    userName,
    userid,
    isAdmin,
  };
});
