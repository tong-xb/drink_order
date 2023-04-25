<template>
  <div class="header">
    <h1>This is header</h1>
    <div class="user">
      <a v-if="store.user.isAdmin">管理員</a>
      <a v-else-if="!store.user.isAdmin">hi! {{ store.user.userName }}</a>
    </div>
  </div>
</template>

<script setup>
import { useLoginStore } from '@/stores/loginState';

const store = useLoginStore();
</script>

<style>
.header {
  border-bottom: solid rgb(91 193 197) 0.5px;
  padding-bottom: 5px;
  height: 100%;
}
.header h1 {
  text-align: center;
  margin: 0;
  padding: 20px 0;
}
.header a {
  text-align: right;
}
.user {
  text-align: right;
  padding-right: 10px;
}
</style>
