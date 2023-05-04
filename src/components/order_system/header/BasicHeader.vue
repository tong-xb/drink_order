<template>
  <div class="header">
    <h1>訂餐系統</h1>
    <div class="user">
      <a v-if="store.user.isAdmin">管理員</a>
      <a v-else-if="!store.user.user.isAdmin">hi! {{ store.user.user.userName }}</a>
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from '@/stores/loginState';

const store = useLoginStore();
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  background-color: aliceblue;
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
