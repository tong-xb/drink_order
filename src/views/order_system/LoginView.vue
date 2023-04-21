<template>
  <div>
    <h1>訂餐系統</h1>
    <div>
      <div class="container">
        <h2>登入</h2>
        <div>
          <label for="useraccount">
            <b>User Account</b>
          </label>
          <input type="text" placeholder="Enter User Account" name="useraccount" v-model="user.userAccount" />
        </div>
        <div>
          <label for="useraccount">
            <b>User Password</b>
          </label>
          <input
            type="text"
            placeholder="Enter User Password"
            name="userpassword"
            v-model="user.userPassword"
            @keyup.enter="login"
          />
        </div>
        <button @click="login">Login</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
// import users from '@/api/json/users.json';
import { useRouter } from 'vue-router';
import { useLoginStore } from '@/stores/loginState';

const router = useRouter();
const store = useLoginStore();

const toHome = () => {
  router.push({ name: 'HomeView' });
};

const user = reactive({
  userAccount: '',
  userPassword: '',
});

const localStorageUser = reactive({
  id: '',
  userName: 'unknown',
  isAdmin: '',
});
const usersList = reactive({
  users: [
    { id: '001', account: 'user1@yuanta.com', accountPassword: '0000', userName: '張明宏', isAdmin: false },
    { id: '002', account: 'user2@yuanta.com', accountPassword: '0000', userName: '張雅婷', isAdmin: false },
    { id: '003', account: 'user3@yuanta.com', accountPassword: '0000', userName: '陳家豪', isAdmin: false },
    { id: '004', account: 'user4@yuanta.com', accountPassword: '0000', userName: '林志明', isAdmin: false },
    { id: '005', account: 'admin1@yuanta.com', accountPassword: '0000', userName: '張明宏', isAdmin: true },
  ],
});
const login = () => {
  usersList.users.forEach((usersListItem) => {
    if (usersListItem.account === user.userAccount) {
      if (usersListItem.accountPassword === user.userPassword) {
        localStorageUser.userName = usersListItem.userName;
        localStorageUser.isAdmin = usersListItem.isAdmin;
        localStorageUser.id = usersListItem.id;
        store.isLogin = true;
        localStorage.setItem('user', JSON.stringify(localStorageUser));
        toHome();
      }
    }
  });
  console.log('userName:' + localStorageUser.userName + ', isAdmin:' + localStorageUser.isAdmin);
};
</script>

<style>
button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20ppx;
  margin: 8px 0;
  border: none;
  width: 100%;
}
.container {
  padding: 16px;
}
input[type='text'] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
</style>
