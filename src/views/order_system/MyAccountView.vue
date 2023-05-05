<template>
  <div class="infoCard-container">
    <div ref="infoCard" class="info-card">
      <div class="card-header">
        <div class="item-first">
          <div>個人資料</div>
        </div>
      </div>
      <div class="card-body">
        <div class="item">
          <div>姓名</div>
          <div>{{ thisUser.userName }}</div>
        </div>
        <div class="item">
          <div>身分</div>
          <div v-if="thisUser.isAdmin">管理員</div>
          <div v-else>一般使用者</div>
        </div>
        <div class="item">
          <div>帳號</div>
          <div>{{ thisUser.account }}</div>
        </div>
        <div class="item">
          <div class="psd_container">
            <div>
              <div>密碼</div>
              <div v-if="eye_Open">{{ thisUser.password }}</div>
              <div v-else>****</div>
            </div>
            <div class="outlineDisplay" :class="{ active: eye_Open }" @click="eye_Open = !eye_Open"></div>
          </div>
        </div>
      </div>
      <div class="card-footer"><button @click="logout">登出</button></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useLoginStore } from '@/stores/loginState';
import users from '@/api/axios/json/users.json';

const loginStore = useLoginStore();

const thisUser = computed(() => {
  let obj = {};
  users.user.forEach((item) => {
    if (item.id === loginStore.loginState.user.userId) {
      obj = item;
    }
  });
  return obj;
});

const eye_Open = ref(false);

const logout = () => {
  if (confirm('確定要登出嗎?') == true) {
    loginStore.loginState.user = {};
    localStorage.removeItem('user');
  }
};
</script>

<style lang="scss" scoped>
.infoCard-container {
  display: flex;
  justify-content: center;
}
.info-card {
  box-shadow: 0px 2px 4px #c5c5c5;
  margin: 15px;
  border-radius: 10px;
  font-size: 1em;
  line-height: 1.425em;
  min-width: 300px;

  //651-
  @media screen and (min-width: 650px) {
    width: 500px;
  }

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
      .psd_container {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }

      .outlineDisplay {
        width: 1.5em;
        height: 1.5em;
        margin-left: 0.5em;
        align-content: center;
        background-image: url(@/assets/images/icon/eye_close.png);
        background-size: cover;
        &.active {
          background-image: url(@/assets/images/icon/eye_open.png);
        }
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
