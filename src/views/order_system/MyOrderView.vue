<template>
  <div class="scroll-container">
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
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.scroll-container {
  overflow: hidden;
  height: 100%;
  .myOrder_container {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    padding-right: 10px;
    box-sizing: content-box; //so width will be 100%+10px
    .layout-header {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      position: sticky;
      inset: 0 0 0 0;
      z-index: 99;
      > header {
        width: 90%;
        height: 100%;
        > nav {
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 10px 0px;
          background-color: white;
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
      padding-bottom: 15px;
    }
  }
}
</style>
