<template>
  <div class="header">
    <h1>HOME</h1>
    <div class="user">
      <a v-if="localStorageUser.isAdmin">管理員</a>
      <a v-else-if="!localStorageUser.isAdmin">hi! {{ localStorageUser.userName }}</a>
    </div>
  </div>
  <div class="body">
    <div class="card-container">
      <div class="card-head">
        <h2>主餐</h2>
        <div>
          <a>4/19(三)</a>
          <a>10:00-11:00</a>
        </div>
      </div>
      <div class="card-content">
        <h1>麥當勞</h1>
      </div>
    </div>
    <div class="card-container">
      <div class="card-head">
        <h2>飲料</h2>
        <div>
          <a>4/19(三)</a>
          <a>10:00-11:00</a>
        </div>
      </div>
      <div class="card-content">
        <h1>50嵐</h1>
      </div>
    </div>
  </div>
  <div class="footer">
    <a>首頁</a>
    <a>訂單</a>
    <a>帳戶</a>
  </div>
</template>
<script setup>
// import { reactive } from 'vue';
// import users from '@/api/json/users.json';
const localStorageUser = JSON.parse(localStorage.getItem('user'));
console.log(localStorageUser.userName);
</script>
<style>
.card-container {
  padding: 16px;
  background-color: rgb(91 193 197);
  border: 2px solid;
  border-radius: 20px;
  margin: 8px 20px;
}
.card-head {
  display: flex;
}
.card-head a {
  display: block;
  font-size: 1px;
}
.card-content h1 {
  text-align: center;
}
.header a {
  text-align: right;
}
.user {
  text-align: right;
  padding-right: 10px;
}
.footer {
  display: inline-block;
  text-align: justify;
}
</style>
