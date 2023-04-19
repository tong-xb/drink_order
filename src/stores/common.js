import { ref, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { useStorage } from '@vueuse/core';

export const useCommonStore = defineStore('common', () => {
  //語言
  const language = ref('zh_tw');
  //loading
  const loadingScreen = ref(false);
  //loading page控制
  const loadingPage = ref(true);
  //錯誤頁wording
  const errorPageMessage = ref('發生錯誤');
  //眼睛開關
  const eyesOpen = useStorage('common-eyesOpen', true);
  //basic header title
  const headerTitle = ref('');
  //現在的routerName
  const routerName = ref('');
  // 紀錄進 每個ERROR CODE 是否在十秒內已顯示過
  const errorPopupMap = computed(() => {
    // 切換路由重新記錄
    if (routerName.value) {
      return new Map();
    }
    return new Map();
  });

  return { language, loadingScreen, loadingPage, errorPageMessage, eyesOpen, headerTitle, routerName, errorPopupMap };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCommonStore, import.meta.hot));
}
