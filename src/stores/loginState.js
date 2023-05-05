import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive, computed } from 'vue';

export const useLoginStore = defineStore('loginState', () => {
  const loginState = reactive({
    user: {},
  });

  const isLogin = computed(() => {
    if (Object.keys(loginState.user).length === 0) {
      return false;
    }
    return true;
  });

  if (localStorage.getItem('user')) {
    loginState.user = JSON.parse(localStorage.getItem('user'));
  }

  return {
    loginState,
    isLogin,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot));
}
