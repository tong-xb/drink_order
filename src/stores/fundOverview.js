import { reactive } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { apiPostOverviewFund } from '@/api/axios/public_axios/publicAxios.js';

export const useFundOverviewStore = defineStore('fundOverview', () => {
  const fundOverviewObject = reactive({
    //原始資料
    RsData: {},
    //處理過後資料
    incHeaderData: {
      nowTotalPay: 0,
      totalRefAmount: 0,
      totalRefPayback: 0.0,
      totalRefProfit: 0,
    }, //含息 header
    headerData: {
      nowTotalPay: 0,
      totalRefAmount: 0,
      totalRefPayback: 0.0,
      totalRefProfit: 0,
    }, //不含息 header
    fundDataList: [], //基金資訊
  });
  function initData() {
    const fundData = fundOverviewObject.RsData;
    const incHeaderData = fundOverviewObject.incHeaderData;
    const headerData = fundOverviewObject.headerData;

    // 含息
    incHeaderData.nowTotalPay = fundData.nowTotalPay;
    incHeaderData.totalRefAmount = fundData.fundTotalRefAmount;
    incHeaderData.totalRefPayback = fundData.fundTotalIncRefPayback;
    incHeaderData.totalRefProfit = fundData.fundTotalIncRefProfit;
    // 不含息
    headerData.nowTotalPay = fundData.nowTotalPay;
    headerData.totalRefAmount = fundData.fundTotalRefAmount;
    headerData.totalRefPayback = fundData.fundTotalRefPayback;
    headerData.totalRefProfit = fundData.fundTotalRefProfit;

    // 基金投報整理
    const fundDtlList = fundData.fundDetailList
      .map((_fund) => {
        return _fund.fundRefList.map((_fundDtl) => {
          _fundDtl.fundCurr = _fund.fundCurr;
          _fundDtl.fundName = _fund.fundName;
          _fundDtl.fundNo = _fund.fundNo;
          _fundDtl.invType = _fund.invType;
          return _fundDtl;
        });
      })
      .flat();
    fundOverviewObject.fundDataList = [...fundDtlList];
  }
  async function fetchFundOverviewData() {
    try {
      const res = await apiPostOverviewFund();
      fundOverviewObject.RsData = res.data.RsData;
      initData();
    } catch (error) {
      console.log(error);
    }
  }
  return { fundOverviewObject, initData, fetchFundOverviewData };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFundOverviewStore, import.meta.hot));
}
