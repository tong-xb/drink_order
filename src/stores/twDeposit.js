import { ref, reactive } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

import axios from 'axios';

import {
  apiPostTwdAcct,
  apiPostTwdAcctTxnDetail,
  apiPostOverallAcctTwd,
  apiPostTwdAcctInfo,
} from '@/api/axios/public_axios/publicAxios.js';

export const useDepositStore = defineStore('twDeposit', () => {
  //查詢臺幣活存帳號明細
  const twDetailAccNo = ref('');
  //查詢臺幣定存帳號明細
  const twFixedDetailAccNo = ref('');

  //資產
  const depositObject = reactive({
    //原始資料
    twdAcctRsData: {}, //取臺幣定存/支存/活存帳戶
    overallAcctTwdRsData: {}, //臺幣帳務總覽
    twdAcctTxnDetailRsData: {}, //臺幣帳號列表
    TwdAcctTxnDetailInfoList: [], //臺幣帳號列表查詢內容
    getDepositTwdAcctRsData: {}, //取得臺幣定存帳戶
    twdAcctInfoRsData: {}, //取得臺幣帳戶內容
    //處理過後資料
    totalDepositAmount: 0, //臺幣支/活存總金額
    totalFixedDepositAmount: 0, //臺幣定存總金額
    demandDeposit: [], //臺幣活存
    overdraftDeposit: [], //透支存款
    twdAcctInfoList: [], //臺幣帳號
    fixedDeposit: [], //臺幣定存
    checkDeposit: [], //臺幣支存
    deposit: [], //臺幣支/活存
    acctList: [], //臺幣定存帳戶列表
    twdAcctInfo: [], //臺幣定存帳戶內容
  });

  //臺幣總覽
  function initData() {
    const twdAcctRsData = depositObject.twdAcctRsData;
    const overallAcctTwdRsData = depositObject.overallAcctTwdRsData;

    //取臺幣定存/支存/活存帳戶
    if (twdAcctRsData != {} && twdAcctRsData.demandDeposit != undefined) {
      depositObject.demandDeposit = [...twdAcctRsData.demandDeposit]; //臺幣活存
      depositObject.overdraftDeposit = [...twdAcctRsData.overdraftDeposit]; //透支存款
      depositObject.twdAcctInfoList = [...twdAcctRsData.twdAcctInfoList]; //臺幣帳號
      depositObject.fixedDeposit = [...twdAcctRsData.fixedDeposit]; //臺幣定存
      depositObject.checkDeposit = [...twdAcctRsData.checkDeposit]; //臺幣支存
      depositObject.deposit = [...twdAcctRsData.demandDeposit, ...twdAcctRsData.checkDeposit]; //臺幣支/活存
    }

    //臺幣帳務總覽
    if (overallAcctTwdRsData != {}) {
      if (overallAcctTwdRsData.twdAcctStatus.status == '1' || overallAcctTwdRsData.twdAcctStatus.status == '0') {
        //臺幣支/活存總金額
        depositObject.totalDepositAmount =
          Number(overallAcctTwdRsData.twd_CheckDeposit_LcyBalance) +
          Number(overallAcctTwdRsData.twd_DemandDeposit_LcyBalance);
        //臺幣定存總金額
        depositObject.totalFixedDepositAmount = Number(overallAcctTwdRsData.twd_FixedDeposit_LcyBalance);
      }
    }
  }

  //臺幣支/活存交易明細
  function initDetailData() {
    const twdAcctTxnDetailRsData = depositObject.twdAcctTxnDetailRsData;
    if (twdAcctTxnDetailRsData != {} && twdAcctTxnDetailRsData.TwdAcctTxnDetailInfoList != undefined) {
      depositObject.TwdAcctTxnDetailInfoList = [...twdAcctTxnDetailRsData.TwdAcctTxnDetailInfoList]; //臺幣活存交易明細
    } else {
      depositObject.TwdAcctTxnDetailInfoList = []; //避免前次查詢資料殘留,當資料為空時需清空
    }
  }

  //臺幣定存交易明細
  function initFixedData() {
    const twdAcctInfoRsData = depositObject.twdAcctInfoRsData;
    if (twdAcctInfoRsData != {} && twdAcctInfoRsData != undefined) {
      depositObject.twdAcctInfo = { ...twdAcctInfoRsData }; //臺幣定存內容
    }
  }

  //取得臺幣帳務總覽
  async function fetchDepositData() {
    axios
      .all([apiPostOverallAcctTwd(), apiPostTwdAcct()])
      .then(
        axios.spread((overallAcctTwdRes, twdAcctRes) => {
          depositObject.overallAcctTwdRsData = overallAcctTwdRes.data.RsData;
          depositObject.twdAcctRsData = twdAcctRes.data.RsData;
          initData();
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }

  //取得臺幣支/活存交易明細
  async function fetchDepositDetailData(data) {
    try {
      const res = await apiPostTwdAcctTxnDetail(data);
      depositObject.twdAcctTxnDetailRsData = res.data.RsData;
      initDetailData();
    } catch (error) {
      console.log(error);
    }
  }

  //取得臺幣定存交易明細
  async function fetchFixedDepositDetailData(data) {
    try {
      const res = await apiPostTwdAcctInfo(data);
      depositObject.twdAcctInfoRsData = res.data.RsData;
      initFixedData();
    } catch (error) {
      console.log(error);
    }
  }

  return {
    twDetailAccNo,
    twFixedDetailAccNo,
    depositObject,
    initData,
    initDetailData,
    initFixedData,
    fetchDepositData,
    fetchDepositDetailData,
    fetchFixedDepositDetailData,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDepositStore, import.meta.hot));
}
