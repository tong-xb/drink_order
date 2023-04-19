import { reactive, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

import axios from 'axios';

import {
  apiPostOverseaBondOverview,
  apiPostGetOverseaBond,
  apiPostOverseaBondPayAmount,
} from '@/api/axios/public_axios/publicAxios.js';

export const useOverseaBondStore = defineStore('overseaBond', () => {
  //資產
  const overseaBondObject = reactive({
    //原始資料
    overseaBondOverviewRsData: [],
    getOverseaBondRsData: [],
    overseaBondPayAmountRsData: [],
    //處理過後資料
    overseaBondOverviewList: [], //臺幣轉出帳號
    payAmountList: [], //累計配息金額資料
    bondList: [], //海外債資料
    cardList: [], //卡片資料
    totalRefAmount: 0, //總參考市值
    totalIncRefProfit: 0, //總參考損益(含息)
    totalIncRefPayback: 0, //總參考報酬率(含息)
    totalAmt: 0, //總投資金額
  });

  function initData() {
    const overseaBondOverviewRsData = overseaBondObject.overseaBondOverviewRsData;
    const getOverseaBondRsData = overseaBondObject.getOverseaBondRsData;
    const overseaBondPayAmountRsData = overseaBondObject.overseaBondPayAmountRsData;

    //台幣轉出帳號
    overseaBondObject.overseaBondOverviewList = [...overseaBondOverviewRsData];
    //申購海外債列表
    overseaBondObject.bondList = [...getOverseaBondRsData];
    //累計配息資料
    overseaBondObject.payAmountList = [...overseaBondPayAmountRsData];
    //卡片資料
    overseaBondObject.cardList = computed(() => {
      const bondList = [...overseaBondOverviewRsData];
      const getbondList = [...getOverseaBondRsData];
      //const amountList = [...overseaBondPayAmountRsData];
      let cardArr = [];
      let incRefProfit = '-';
      let incRefPayback = '-';
      let nowValue = 0;
      overseaBondObject.totalRefAmount = 0;
      overseaBondObject.totalIncRefProfit = 0;
      overseaBondObject.totalIncRefPayback = 0;
      overseaBondObject.totalAmt = 0;
      bondList.forEach((bondItem) => {
        if (bondItem.totUnit != undefined) {
          /** 算出 現值
           * 欄位說明: TFI10-目前單位數、TFI11-投資總額、TFI28-參考淨值、TFI42-累計配息
           * 運算邏輯
           * IF BDA36 = 1  現值 = TFI10 * TFI28 * BDA13 / BDA34
           * IF BDA36 = 2  現值 = TFI10 * TFI28 * BDA13 / 100
           */
          let getNowValue = 1;
          let getListUnit = 1;
          getbondList.forEach((getBondItem) => {
            if (getBondItem.trustNo === bondItem.trustNo) {
              getNowValue = getBondItem.nowValue;
              getListUnit = getBondItem.listUnit;
              if (getBondItem.listType == 1) {
                nowValue = (bondItem.totUnit * bondItem.netvalue * getNowValue) / getListUnit;
              } else if (getBondItem.listType == 2) {
                nowValue = (bondItem.totUnit * bondItem.netvalue * getNowValue) / 100;
              }
            }
          });

          if (bondItem.fixbuy != undefined) {
            // 算出 含息參考損益 = 現值 - 投資總額 + 累計配息
            incRefProfit = (nowValue - bondItem.fixbuy * 1 + bondItem.payAmt * 1).toFixed(2);
            // 算出 含息參考報酬率 = 含息參考損益 / 投資總額
            incRefPayback = incRefProfit / bondItem.fixbuy;
          }
          // 加總 總參考市值 = 「各海外債參考市值」乘「該計價幣別之網銀匯率」
          overseaBondObject.totalRefAmount += nowValue * bondItem.rate;
          // 加總 總參考損益(含息) = 「各海外債含息參考損益」乘「該計價幣別之網銀匯率」
          overseaBondObject.totalIncRefProfit += incRefProfit * bondItem.rate;
          // 加總 總投資金額 = 「各海外債投資金額」乘「該計價幣別之網銀匯率」
          overseaBondObject.totalAmt += bondItem.fixbuy * bondItem.rate;
          // 加總 總參考報酬率(含息) = 總參考損益(含息) / 總投資金額
          overseaBondObject.totalIncRefPayback = overseaBondObject.totalIncRefProfit / overseaBondObject.totalAmt;
          const obj = {
            infoupdate_invest: bondItem.netvaluedate, //參考報價日期
            payeName: bondItem.invCur, //參考幣別
            incNowValue: nowValue, //現值
            incRefProfit: incRefProfit, //含息參考損益
            incRefPayback: incRefPayback, //含息參考報酬率
          };
          const arr = { ...bondItem, ...obj };
          cardArr.push(JSON.parse(JSON.stringify(arr)));
        }
      });
      return cardArr;
    });
  }

  async function fetchOverseaBondData() {
    axios
      .all([apiPostOverseaBondOverview(), apiPostGetOverseaBond(), apiPostOverseaBondPayAmount()])
      .then(
        axios.spread((overseaBondOverviewRes, getOverseaBondRes, overseaBondPayAmountRes) => {
          overseaBondObject.overseaBondOverviewRsData = overseaBondOverviewRes.data.RsData;
          overseaBondObject.getOverseaBondRsData = getOverseaBondRes.data.RsData;
          overseaBondObject.overseaBondPayAmountRsData = overseaBondPayAmountRes.data.RsData;
          initData();
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }

  return { overseaBondObject, initData, fetchOverseaBondData };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOverseaBondStore, import.meta.hot));
}
