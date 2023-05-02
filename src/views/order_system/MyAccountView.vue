<template>
  <div ref="infoCard" class="info-card">
    <div class="card-header">
      <div class="item-first">
        <div>個人資料</div>
      </div>
    </div>
    <div class="card-body">
      <div class="item">
        <div>姓名</div>
        <div>張雅婷</div>
      </div>
      <div class="item">
        <div>身分</div>
        <div>一般使用者</div>
      </div>
      <div class="item">
        <div>帳號</div>
        <div>user1@yuanta.com</div>
      </div>
      <div class="item">
        <div>密碼</div>
        <div>0000</div>
      </div>
    </div>
    <div class="card-footer"><button @click="logout">登出</button></div>
  </div>
</template>

<script setup>
// import { useRouter } from 'vue-router';
import { useLoginStore } from '@/stores/order_system/loginState';

const userStore = useLoginStore();
// const router = useRouter();

const logout = () => {
  if (confirm('確定要登出嗎?') == true) {
    userStore.isLogin = false;
    userStore.user.user = { userId: '', userName: '', isAdmin: false };
    localStorage.removeItem('user');
  }
};
</script>

<style lang="scss" scoped>
.info-card {
  box-shadow: 0px 2px 4px #c5c5c5;
  margin: 15px;
  border-radius: 10px;
  font-size: 1em;
  line-height: 1.425em;

  .card-header {
    padding-top: 15px;
    padding-bottom: 8px;
    margin-left: 15px;
    margin-right: 15px;
    border-bottom: #959595 solid 1px;
    font-size: 1.1em;
    align-items: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .card-item {
      padding-top: 8px;
      div {
        white-space: nowrap;
      }
    }
  }

  .card-body {
    padding-bottom: 15px;
    margin-left: 15px;
    .item {
      padding-top: 8px;
      padding-right: 15px;
      div {
        white-space: nowrap;
      }
    }
  }
  .card-footer {
    padding-top: 8px;
    padding-bottom: 15px;
    margin-left: 15px;
    margin-right: 15px;
    border-top: #959595 solid 1px;
    display: flex;
    justify-content: center;
  }
}
</style>
