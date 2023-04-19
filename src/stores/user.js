import { ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { useAssetsStore } from './assets';

import { apiPostOverviewInit } from '@/api/axios/public_axios/publicAxios.js';

export const useUserStore = defineStore('user', () => {
  //data
  const appData = ref('');
  //session id
  const seId = ref('');

  async function fetchOverviewInit(data) {
    const assetsStore = useAssetsStore();
    try {
      const res = await apiPostOverviewInit(data);

      assetsStore.assetsObject.statusData.status = res.data.status;

      if (res.data.status === 'ERROR') {
        assetsStore.assetsObject.statusData.errorCode = res.data.errorCode;
        assetsStore.assetsObject.statusData.errorMessage = res.data.errorMessage;
      } else {
        seId.value = res.data.RsData.seid;
        assetsStore.assetsObject.RsData = res.data.RsData.overallAcct;
        assetsStore.initData();
      }
    } catch (error) {
      console.log(error);
      assetsStore.assetsObject.statusData.status = 'ERROR';
    }
  }

  return { appData, seId, fetchOverviewInit };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
