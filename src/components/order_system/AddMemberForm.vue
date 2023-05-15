<template>
  <div>
    <div class="modal-background"></div>
    <div class="modal-base">
      <!-- Modal content -->
      <div class="modal-content">
        <div class="orderHeader">
          <h1>加入成員</h1>
        </div>
        <div class="orderBody">
          <div class="item">
            <div>帳號</div>
            <input type="text" placeholder="user0@yuanta.com" v-model="thisMember.account" />
          </div>
          <div class="item">
            <div>姓名</div>
            <div class="name">{{ thisMember.memberName }}</div>
          </div>
        </div>
        <div class="orderFooter">
          <button @click="addMember">加入</button>
          <button class="cancelBtn" @click="closeWindow">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import users from '@/api/axios/json/users.json';
import { useMemberStore } from '@/stores/members';
import { reactive, watch } from 'vue';

const memberStore = useMemberStore();

const thisMember = reactive({
  account: '',
  memberId: '',
  memberName: '',
});

const checkIsMember = () => {
  let bol = false;
  memberStore.memberList.forEach((member) => {
    if (member.memberId === thisMember.memberId) {
      bol = true;
    }
  });
  return bol;
};

watch(
  () => thisMember.account,
  (newVal) => {
    thisMember.memberId = '';
    thisMember.memberName = '';
    users.user.forEach((item) => {
      if (item.account === newVal) {
        thisMember.memberId = item.id;
        thisMember.memberName = item.userName;
      }
    });
  }
);

const addMember = () => {
  if (!thisMember.memberId) {
    alert('查無此人!');
  } else if (checkIsMember()) {
    alert('此人已經加入群組!');
  } else if (confirm('確定加入' + thisMember.memberName + '嗎?') == true) {
    memberStore.addMember({ ...thisMember });
    closeWindow();
  }
};

const emit = defineEmits('emitWindowOpen');
const closeWindow = () => {
  emit('emitWindowOpen', false);
};
</script>

<style lang="scss" scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.3s ease-in-out;
}
.modal-base {
  position: fixed; /* Stay in place */
  z-index: 100; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: hidden; /* Enable scroll if needed */
  display: flex;
  justify-content: center;
  .modal-content {
    display: flex;
    flex-direction: column;
    background-color: #fefefe;
    margin: 30vh 5vh;
    padding: 10px 20px;
    border: 1px solid #888;
    border-radius: 0.5rem;
    height: 40vh;
    font-size: 1.1rem;
    width: 300px;
    .orderHeader {
      height: 15%;
      align-items: center;
      display: flex;
      justify-content: center;
    }
    .orderBody {
      height: 60%;
      padding-top: 20px;
      .item {
        margin-bottom: 10px;
        input {
          border: 1px solid #ccc;
          font: 15px/24px 'Lato', Arial, sans-serif;
          letter-spacing: 1px;
          margin-top: 5px;
          .name {
            font-weight: bold;
          }
        }
      }
    }

    .orderFooter {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      button {
        width: 80%;
        background-color: rgb(84, 105, 212);
        box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
          rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgb(84, 105, 212) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
          rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.08) 0px 2px 5px 0px;
        color: #fff;
        font-weight: 600;
        font-size: 16px;
        padding: 2px 8px;
        margin: 5px 1px 0 1px;
        border: unset;
        border-radius: 4px;
        outline-color: rgb(84 105 212 / 0.5);
      }
      .cancelBtn {
        background-color: rgb(118 118 118 / 23%);
        box-shadow: 0px 2px 4px #c5c5c5;
      }
    }
  }
}
</style>
