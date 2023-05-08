<template>
  <div class="header">
    <h1>訂餐系統</h1>
    <div class="user">
      <a v-if="loginStore.loginState.user.isAdmin">管理員</a>
      <a v-else-if="!loginStore.loginState.user.isAdmin">hi! {{ loginStore.loginState.user.userName }}</a>
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from '@/stores/loginState';

const loginStore = useLoginStore();
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  box-shadow: 0px 2px 4px #c5c5c5;
  background: linear-gradient(to bottom, white, aliceblue);
}
.header h1 {
  text-align: center;
  margin: 0;
  padding: 40px 0 20px 0;
}
.user {
  text-align: right;
  padding-right: 10px;
}
</style>
