import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive, ref } from 'vue';

export const useLoginStore = defineStore('loginState', () => {
  const user = reactive({
    user: { userId: '', userName: '', isAdmin: false },
  });

  const isLogin = ref(false);

  if (localStorage.getItem('user')) {
    user.user = JSON.parse(localStorage.getItem('user'));
    isLogin.value = true;
  }

  return {
    user,
    isLogin,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot));
}
