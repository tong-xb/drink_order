<template>
  <div class="myOrder_container">
    <div>
      <!-- <button>待送出</button>
      <button>可變更</button>
      <button>已完成</button> -->
      <nav>
        <router-link :to="{ name: 'Confirm' }">待送出</router-link>
        <router-link :to="{ name: 'Change' }">可變更</router-link>
        <router-link :to="{ name: 'Complete' }">已完成</router-link>
      </nav>
    </div>

    <div>
      <router-view />
    </div>
  </div>
</template>

<script setup></script>

<style>
.select_container {
  height: 30px;
}
.myOrder_container {
  padding: 20px;
}
.myOrder_container select {
  margin-bottom: 20px;
  float: right;
}
.card_container {
  padding-bottom: 10px;
}
</style>
