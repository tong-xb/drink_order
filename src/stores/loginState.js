import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive, computed } from 'vue';

export const useLoginStore = defineStore('loginState', () => {
  const user = reactive({
    user: {},
  });

  const isLogin = computed(() => {
    if (Object.keys(user.user).length === 0) {
      return false;
    }
    return true;
  });

  if (localStorage.getItem('user')) {
    user.user = JSON.parse(localStorage.getItem('user'));
  }

  return {
    user,
    isLogin,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot));
}
