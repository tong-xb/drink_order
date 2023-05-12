import { defineStore, acceptHMRUpdate } from 'pinia';
import { reactive, computed } from 'vue';
import { useLoginStore } from '@/stores/loginState';
import membersImport from '@/api/axios/json/members.json';

export const useMemberStore = defineStore('member', () => {
  const loginStore = useLoginStore();
  const members = reactive(membersImport);

  const memberList = computed(() => {
    let list = [];
    members.groups.forEach((group) => {
      if (group.adminId === loginStore.loginState.user.userId) {
        list = group.memberList;
      }
    });
    return list;
  });

  const addMember = (obj) => {
    memberList.value.push(obj);
  };

  const removeMember = (id) => {
    memberList.value.forEach((member, idx) => {
      if (member.memberId === id) {
        memberList.value.splice(idx, 1);
      }
    });
  };

  return {
    memberList,
    addMember,
    removeMember,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMemberStore, import.meta.hot));
}
