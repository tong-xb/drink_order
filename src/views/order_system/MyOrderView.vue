<template>
  <div class="myOrder_container">
    <div class="layout-header">
      <header>
        <nav>
          <router-link :to="{ name: 'Confirm' }">待送出</router-link>
          <router-link :to="{ name: 'Change' }">可變更</router-link>
          <router-link :to="{ name: 'Complete' }">已完成</router-link>
        </nav>
      </header>
    </div>
    <main class="layout-content">
      <router-view />
    </main>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.select_container {
  height: 30px;
}
.myOrder_container {
  height: 100%;
  overflow-y: auto;
  padding: 20px;
}
.myOrder_container select {
  margin-bottom: 20px;
  float: right;
}
.card_container {
  padding-bottom: 10px;
}
/* ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #efeeee;
}
li {
  float: left;
}
li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}
li a:hover:not(.active) {
  background-color: #111;
}
.active {
  background-color: #04aa6d;
} */

.layout .layout-header {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: sticky;
  top: -30px;
  background-color: white;
  z-index: 99;
  > header {
    width: 90%;
    height: 100%;
    > nav {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 0px;
      > a {
        display: block;
        color: black;
        width: 100%;
        text-align: center;
        padding: 5px 0px;
        text-decoration: none;
        border: #039be5 1px solid;
        border-radius: 0.15rem;
        &:hover {
          background-color: #ddd;
          color: black;
        }
        &.router-link-exact-active {
          background-color: #039be5;
          color: white;
        }
      }
    }
  }
}
.layout-content {
  display: flex;
  justify-content: center;
}
</style>
