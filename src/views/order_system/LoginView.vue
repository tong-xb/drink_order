<template>
  <div>
    <body>
      <div class="screen-1">
        <div class="logo-container">
          <img class="logo" src="/orderSystemLogo.jpg" alt="" />
          <h2>ORDER SYSTEM</h2>
          <h2>LOGIN</h2>
        </div>
        <div class="email">
          <label for="email">Email Address</label>
          <div class="sec-2">
            <!-- <ion-icon></ion-icon> -->
            <input type="email" name="userAccount" v-model="user.userAccount" placeholder="Username@gmail.com" />
          </div>
        </div>
        <div class="password">
          <label for="password">Password</label>
          <div class="sec-2">
            <!-- <ion-icon></ion-icon> -->
            <input
              type="password"
              name="userPassWord"
              placeholder="......"
              class="pas"
              v-model="user.userPassword"
              @keyup.enter="login"
            />
          </div>
        </div>
        <button class="login" @click="login">Login</button>
        <div class="footer">
          <span>Sign up</span>
          <span>Forgot Password</span>
        </div>
      </div>
    </body>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useLoginStore } from '@/stores/loginState';
import { useLocalStorage } from '@vueuse/core';

const router = useRouter();
const userStore = useLoginStore();

const toHome = () => {
  router.push({ name: 'HomeView' });
};

const user = reactive({
  userAccount: '',
  userPassword: '',
});

const localStorageUser = reactive({
  userId: '',
  userName: '',
  isAdmin: null,
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
  console.log(user.userAccount);
  console.log(user.userPassword);
  usersList.users.forEach((usersListItem) => {
    if (usersListItem.account === user.userAccount && usersListItem.accountPassword === user.userPassword) {
      localStorageUser.userId = usersListItem.id;
      localStorageUser.userName = usersListItem.userName;
      localStorageUser.isAdmin = usersListItem.isAdmin;
      userStore.user.user = localStorageUser;
      // console.log(userStore.user.user);
      useLocalStorage('user', localStorageUser);
      toHome();
    }
  });
};
</script>

<style lang="scss" scoped>
$p: hsl(213deg 85% 97%);
$s: hsl(233deg 36% 38%);
* {
  font-family: 'Poppins';
}
@mixin screen {
  background: $p;
  padding: 2em;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  box-shadow: 0 0 2em hsl(231deg 62% 94%);
}
body {
  user-select: none;
  overflow-y: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background: hsl(218deg 50% 91%);
  height: 100vh;
  // margin: 0;
}

.screen-1 {
  @include screen;
  gap: 2em;

  .logo-container {
    text-align: center;
    .logo {
      // margin-top: -3em;
      width: 150px;
      height: 150px;
      // text-align: center;
    }
  }

  .email {
    background: hsl(0deg 0% 100%);
    box-shadow: 0 0 2em hsl(231deg 62% 94%);
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    border-radius: 20px;
    color: hsl(0deg 0% 30%);
    // margin-top: -3em;
    input {
      outline: none;
      border: none;
      &::placeholder {
        color: rgb(172, 172, 172);
        font-size: 0.9em;
      }
    }
    ion-icon {
      color: hsl(0deg 0% 30%);
      margin-bottom: -0.2em;
    }
  }
  .password {
    background: hsl(0deg 0% 100%);
    box-shadow: 0 0 2em hsl(231deg 62% 94%);
    padding: 1em;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    border-radius: 20px;
    color: hsl(0deg 0% 30%);
    input {
      outline: none;
      border: none;
      &::placeholder {
        color: rgb(172, 172, 172);
        font-size: 0.9em;
      }
    }
    ion-icon {
      color: hsl(0deg 0% 30%);
      margin-bottom: -0.2em;
    }
  }
  .login {
    padding: 1em;
    background: hsl(233deg 36% 38%);
    color: hsl(0deg 0% 100%);
    border: none;
    border-radius: 30px;
    font-weight: 600;
  }
  .footer {
    display: flex;
    font-size: 0.7em;
    color: hsl(0deg 0% 37%);
    gap: 14em;
    padding-bottom: 10em;
    span {
      cursor: pointer;
    }
  }
}

button {
  cursor: pointer;
}
</style>
