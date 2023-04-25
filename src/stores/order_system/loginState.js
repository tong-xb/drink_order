import { defineStore } from 'pinia';
import { ref, reactive, watch } from 'vue';

export const useLoginStore = defineStore('loginState', () => {
  let user = reactive({
    userid: '',
    userName: '',
    isAdmin: false,
  });

  const isLogin = ref(false);

  if (localStorage.getItem('user')) {
    user = JSON.parse(localStorage.getItem('user'));
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
