<template>
  <div class="header">
    <h1>HOME</h1>
    <div class="user">
      <a v-if="localStorageUser.isAdmin">管理員</a>
      <a v-else-if="!localStorageUser.isAdmin">hi! {{ localStorageUser.userName }}</a>
    </div>
  </div>
</template>

<script setup>
const localStorageUser = JSON.parse(localStorage.getItem('user'));
</script>

<style>
.header {
  border-bottom: solid rgb(91 193 197) 0.5px;
  padding-bottom: 5px;
}
.header h1 {
  text-align: center;
}
.header a {
  text-align: right;
}
.user {
  text-align: right;
  padding-right: 10px;
}
</style>
