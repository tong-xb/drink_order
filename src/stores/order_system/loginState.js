import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive, ref, watch } from 'vue';

export const useLoginStore = defineStore('loginState', () => {
  const user = reactive({
    userid: '',
    userName: '',
    isAdmin: false,
  });

  const isLogin = ref(false);

  if (localStorage.getItem('user')) {
    user.value = JSON.parse(localStorage.getItem('user'));
    console.log(1);
    isLogin.value = true;
  }

  watch(
    user,
    (userVal) => {
      localStorage.setItem('user', JSON.stringify(userVal));
    },
    { deep: true }
  );

  return {
    user,
    isLogin,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useLoginStore, import.meta.hot));
}
