<template>
  <div class="scroll-container">
    <div class="container">
      <div class="item addMember" @click.prevent.stop="openAddMemberForm()">
        <h2>加入成員</h2>
      </div>
      <div class="item" v-for="member in memberStore.memberList" :key="member.memberId">
        <h2>{{ member.memberName }}</h2>
        <div class="isOrderDisplay" @click.stop="removeMember(member.memberId, member.memberName)"></div>
      </div>
    </div>
  </div>
  <AddMemberForm v-if="formIsOpen && loginStore.loginState.user.isAdmin" @emitWindowOpen="closeAddMemberForm" />
</template>

<script setup>
import { ref } from 'vue';
import { useLoginStore } from '@/stores/loginState';
import { useMemberStore } from '@/stores/members';
import AddMemberForm from '@/components/order_system/AddMemberForm.vue';

const memberStore = useMemberStore();

const loginStore = useLoginStore();

const formIsOpen = ref(false);

const openAddMemberForm = () => {
  formIsOpen.value = true;
};

const closeAddMemberForm = (el) => {
  formIsOpen.value = el;
};

const removeMember = (id, name) => {
  if (confirm('確定要移除' + name + '嗎?') == true) {
    memberStore.removeMember(id);
    console.log('name:' + name + ', id:' + id + ' 已移除');
  }
};
</script>

<style lang="scss" scoped>
.scroll-container {
  overflow: hidden;
  height: 100%;
  .container {
    height: 100%;
    width: 100%;
    overflow-y: auto;
    padding-right: 10px;
    box-sizing: content-box; //so width will be 100%+10px
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .item.addMember {
      color: rgb(149, 149, 149);
      background-color: white;
      box-shadow: 0px 2px 4px #c5c5c5;
    }
    .item {
      margin-top: 10px;
      padding: 5px 10px;
      width: 300px;
      text-align: center;
      background-color: rgb(109 150 235 / 23%);
      // border-radius: 5px;
      box-shadow: 0px 2px 4px #c5c5c5;
      border-radius: 10px;
      font-size: 1em;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // 0-280px
      @media screen and (max-width: 280px) {
        width: 200px;
      }
      //280-430px
      @media screen and (min-width: 430px) {
        width: 250px;
      }
      //431-650px
      @media screen and (min-width: 431px) {
        width: 300px;
      }
      //651-
      @media screen and (min-width: 650px) {
        width: 350px;
      }

      .isOrderDisplay {
        // content: '';
        position: relative;
        float: right;
        width: 25px;
        height: 25px;
        align-content: center;
        background-image: url(@/assets/images/icon/delete.png);
        background-size: cover;
        border-radius: 50%;
      }
    }
  }
}
</style>
