<template>
  <div class="footer">
    <router-link :to="{ name: 'HomeView' }">首頁</router-link>
    <router-link :to="{ name: 'MyOrderView' }">訂單</router-link>
    <router-link :to="{ name: 'MyAccountView' }">帳戶</router-link>
  </div>
</template>

<style>
.footer {
  display: flex;
  width: 100%;
  /* position: fixed; */
  bottom: 0px;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  border-top: solid rgb(91 193 197) 0.5px;
}
p {
  display: inline-block;
  padding: 10px 20px;
}
.content {
  background-color: blue;
}
</style>
