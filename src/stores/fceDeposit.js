import { ref, reactive, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

import axios from 'axios';

import {
  apiPostFceAcct,
  apiPostGetHostCcyList,
  apiPostFixedFceMultiDtl,
} from '@/api/axios/public_axios/publicAxios.js';

export const useFceDepositStore = defineStore('fceFceDeposit', () => {
  // 查詢外幣活存帳號明細
  const fceDetailAccNo = ref('');
  // 查詢外幣定存帳號明細
  const fceFixedDetailAccNo = ref('');

  //資產
  const fceDepositObject = reactive({
    //原始資料
    getHostCcyListRsData: [], //利匯率列表
    fixedFceMultiDtlRsData: [], //外幣活存全部幣別明細查詢
    fceAcctRsData: [], //取得外幣定存/活存帳戶
    //處理過後資料
    ccyList: [], //利匯率列表
    ccyDetailList: [], //取活存列表
    demandFceDepositSort: [], //排序後外幣活存明細
    fixedFceDepositSort: [], //排序後外幣定存明細
    demandFceDepositSortLen: 0, //排序後外幣活存明細
    fixedFceDepositSortLen: 0, //排序後外幣定存明細
    totalDemandDepositAmt: 0, //外幣活存總金額
    totalFixedDepositAmt: 0, //外幣定存總金額
  });

  function initData() {
    const getHostCcyListRsData = fceDepositObject.getHostCcyListRsData;
    const fceAcctRsData = fceDepositObject.fceAcctRsData;
    //利匯率列表
    if (getHostCcyListRsData != {}) {
      fceDepositObject.ccyList = [...getHostCcyListRsData.ccyList];
    }
    //排序後外幣活存明細
    const dataSort = (dataBySort) => {
      fceDepositObject.demandFceDepositSortLen = dataBySort.length;
      return dataBySort.sort((a, b) => a.ccy - b.ccy);
    };
    fceDepositObject.demandFceDepositSort = computed(() => {
      const sortData = [...fceAcctRsData.demandfceDeposit]; //外幣活存明細
      return dataSort(sortData);
    });
    //排序後外幣定存明細
    const dataSortFixed = (dataBySort) => {
      fceDepositObject.fixedFceDepositSortLen = dataBySort.length;
      return dataBySort.sort((a, b) => a.acctCcy - b.acctCcy);
    };
    fceDepositObject.fixedFceDepositSort = computed(() => {
      const sortData = [...fceAcctRsData.fixedfceDeposit]; //外幣定存明細
      return dataSortFixed(sortData);
    });
    //外幣活存總金額
    fceDepositObject.totalDemandDepositAmt = computed(() => {
      let amount = 0;
      if (fceAcctRsData.demandfceDeposit.length > 0) {
        fceAcctRsData.demandfceDeposit.forEach((element) => {
          amount += Number(element.twEquiv);
          fceDetailAccNo.value = element.acctNo;
        });
      }
      return amount;
    });
    //外幣定存總金額
    fceDepositObject.totalFixedDepositAmt = computed(() => {
      let amount = 0;
      if (fceAcctRsData.fixedfceDeposit.length > 0) {
        fceAcctRsData.fixedfceDeposit.forEach((element) => {
          amount += Number(element.twEquiv);
          fceFixedDetailAccNo.value = element.acctNo;
        });
      }
      return amount;
    });
  }

  //取活存列表
  function initFixedFceMultiDtlData() {
    const fixedFceMultiDtlRsData = fceDepositObject.fixedFceMultiDtlRsData;
    if (fixedFceMultiDtlRsData != {}) {
      fceDepositObject.ccyDetailList = [...fixedFceMultiDtlRsData.ccyDetailList];
    }
  }

  //取得外幣活存全部幣別明細查詢
  async function fetchFixedFceMultiDtlData(data) {
    try {
      const res = await apiPostFixedFceMultiDtl(data);
      fceDepositObject.fixedFceMultiDtlRsData = res.data.RsData;
      initFixedFceMultiDtlData();
    } catch (error) {
      console.log(error);
    }
  }

  //取得外幣帳務總覽
  async function fetchFceDepositData(data) {
    axios
      .all([apiPostGetHostCcyList(), apiPostFceAcct()])
      .then(
        axios.spread((getHostCcyListRes, fceAcctRes) => {
          fceDepositObject.getHostCcyListRsData = getHostCcyListRes.data.RsData;
          fceDepositObject.fceAcctRsData = fceAcctRes.data.RsData;
          console.log(data);
          initData();
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }

  return {
    fceDetailAccNo,
    fceFixedDetailAccNo,
    fceDepositObject,
    initData,
    initFixedFceMultiDtlData,
    fetchFceDepositData,
    fetchFixedFceMultiDtlData,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFceDepositStore, import.meta.hot));
}
