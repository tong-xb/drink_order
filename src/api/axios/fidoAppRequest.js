import { oBaseUrl } from './config.js';
import axios from 'axios';

import { createVNode } from 'vue';
import { useUserStore } from '@/stores/user';
import { useCommonStore } from '@/stores/common';

import { useDefaultModal } from '@/components/public_components/modal_popup/hooks/useMessageModal.js';
import { uaParser } from '@/common/method_common/uaParser';

const fidoAppRequest = axios.create({
  baseURL:
    import.meta.env.VITE_APP_NODE_ENV === 'production' ? oBaseUrl.fidoAppBaseUrl.PROD : oBaseUrl.fidoAppBaseUrl.DEV,
  headers: { 'Content-Type': 'application/json' },
});

let requestCount = 0;

function showLoading() {
  const common = useCommonStore();
  if (requestCount === 0 && common.loadingPage) {
    common.loadingScreen = true;
  }
  requestCount++;
}

function hideLoading() {
  const common = useCommonStore();
  requestCount--;
  if (requestCount === 0) {
    common.loadingScreen = false;
  }
}
// 攔截 API request 的請求
fidoAppRequest.interceptors.request.use(
  (request) => {
    const userStore = useUserStore();
    showLoading();
    const url = request.url;
    const work_code = url.match(/workCode=([^&?]+)(?=\?|$)/)[1];

    // API送出前可以做最後的處理
    if (request.method === 'post') {
      request.data = {
        workCode: work_code,
        ...uaParser(),
        seid: userStore.seId,
        ...request.data,
      };
    }
    return request;
  },
  (error) => {
    hideLoading();
    // 如果送出前失敗了，這邊就可以做一些處理
    return Promise.reject(error);
  }
);

// 錯誤提示
function errorPopup(msg) {
  const defaultModal = useDefaultModal();
  const slotData = [createVNode('p', null, msg)];

  defaultModal.modalVisible.value = true;
  defaultModal.createModal('close', slotData);
}

// 攔截 API response 的回傳
fidoAppRequest.interceptors.response.use(
  (response) => {
    const common = useCommonStore();
    hideLoading();
    // 這邊可以對回來的資料先進行驗證處理，再來決定要不要把資料給吐出去

    // const url = response.config.url;
    // console.log(response.config.url);
    // const work_code = url.match(/workCode=([^&?]+)(?=\?|$)/)[1];

    if (response.data.status === 'ERROR' && common.routerName !== 'AssetView') {
      // 避免同一個錯誤提示顯示多個
      // 如果取得此errorCode undefined或false, 則此error code 還未跳過錯誤提示(或距離上次提示已超過十秒), 進入判斷
      const errorCode = response.data.errorCode;
      if (!common.errorPopupMap.get(errorCode)) {
        // 將其設置為 error code 紀錄存入已顯示過
        common.errorPopupMap.set(errorCode, true);
        // 計時十秒後 error code 紀錄存入未顯示過
        setTimeout(() => {
          common.errorPopupMap.set(errorCode, false);
        }, 10000);
        errorPopup(response.data.errorMessage);
      }
    }

    return response;
  },
  (error) => {
    const common = useCommonStore();
    hideLoading();

    // 避免同一個錯誤提示顯示多個
    // 如果取得此 error.response.status undefined或false, 則此error.response.status 還未跳過錯誤提示(或距離上次提示已超過十秒), 進入判斷
    if (!common.errorPopupMap.get(error.response.status)) {
      // 將其設置為 error code 紀錄存入已顯示過
      common.errorPopupMap.set(error.response.status, true);
      // 計時十秒後 error code 紀錄存入未顯示過
      setTimeout(() => {
        common.errorPopupMap.set(error.response.status, false);
      }, 10000);
      errorPopup(
        '因網路訊號不穩定無法完成服務，請您確認手機網路連線或稍後再重新啟動APP，如仍無法解決問題，請您撥打客服02-21821988或0800-688168，我們將竭誠為您服務，謝謝。'
      );
    }
    // 這邊當API發生錯誤的時候就可以處理 Error handling
    return Promise.reject(error.response.data);
  }
);

export default fidoAppRequest;
