import { reactive, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { formatTWCurrency } from '@/common/method_common/formatPrice.js';

import axios from 'axios';

import {
  apiPostOverallAcctAll,
  apiPostGetBuySelOutRefMktVal,
  apiPostGetConditionalSaleRefMktVal,
} from '@/api/axios/public_axios/publicAxios.js';

export const useAssetsStore = defineStore('assets', () => {
  //資產
  const assetsObject = reactive({
    //原始資料
    RsData: {},
    //處理過後資料
    statusData: {
      errorCode: '',
      status: '',
      errorMessage: '',
    },
    depositData: {
      twCurrentInt: 0, //台幣活期存款
      twCheckInt: 0, //台幣支票存款
      twFixedInt: 0, //台幣定期存款
      foreignCurrentInt: 0, //外幣活期存款
      foreignFixedInt: 0, //外幣定期存款
      twCurrent: computed(() => {
        return formatTWCurrency(assetsObject.depositData.twCurrentInt);
      }), //台幣活期存款
      twCheck: computed(() => {
        return formatTWCurrency(assetsObject.depositData.twCheckInt);
      }), //台幣支票存款
      twFixed: computed(() => {
        return formatTWCurrency(assetsObject.depositData.twFixedInt);
      }), //台幣定期存款
      foreignCurrent: computed(() => {
        return formatTWCurrency(assetsObject.depositData.foreignCurrentInt);
      }), //外幣活期存款
      foreignFixed: computed(() => {
        return formatTWCurrency(assetsObject.depositData.foreignFixedInt);
      }), //外幣定期存款
    },
    investData: {
      fundInt: 0, //基金
      etfTotalInt: 0, //境外ETF
      bondTotalInt: 0, //海外債券
      stockTotalInt: 0, //境外股票(普通股 特別股)
      othersTotalInt: 0, //境外結構型商品(連動債)
      goldTotalInt: 0, //黃金存摺
      DCITotalInt: 0, //結構型商品(DSI/SI)
      insuranceTotalInt: 0, //保險(投資型保單累計保費)
      traditionalInsTotalInt: 0, //保險(傳統型保單累計保費)
      refMarketValInt: 0, //債券自行買賣(買賣斷交易)
      buyRefMarketValInt: 0, //債券自行買賣(附買回交易)
      //基金
      fund: computed(() => {
        return formatTWCurrency(assetsObject.investData.fundInt);
      }),
      //境外ETF
      etfTotal: computed(() => {
        return formatTWCurrency(assetsObject.investData.etfTotalInt);
      }),
      //海外債券
      bondTotal: computed(() => {
        return formatTWCurrency(assetsObject.investData.bondTotalInt);
      }),
      //境外股票(普通股 特別股)
      stockTotal: computed(() => {
        return formatTWCurrency(assetsObject.investData.stockTotalInt);
      }),
      //境外結構型商品(連動債)
      othersTotal: computed(() => {
        return formatTWCurrency(assetsObject.investData.othersTotalInt);
      }),
      //黃金存摺
      goldTotal: computed(() => {
        return formatTWCurrency(assetsObject.investData.goldTotalInt);
      }),
      //結構型商品(DSI/SI)
      DCITotal: computed(() => {
        return formatTWCurrency(assetsObject.investData.DCITotalInt);
      }),
      //保險(投資型保單累計保費)
      insuranceTotal: computed(() => {
        return formatTWCurrency(assetsObject.investData.insuranceTotalInt);
      }),
      //保險(傳統型保單累計保費)
      traditionalInsTotal: computed(() => {
        return formatTWCurrency(assetsObject.investData.traditionalInsTotalInt);
      }),
      //債券自行買賣(買賣斷交易)
      refMarketVal: computed(() => {
        return formatTWCurrency(assetsObject.investData.refMarketValInt);
      }),
      //債券自行買賣(附買回交易)
      buyRefMarketVal: computed(() => {
        return formatTWCurrency(assetsObject.investData.buyRefMarketValInt);
      }),
    },
    liabilitiesData: {
      loanTotalInt: 0, //台幣貸款
      fceLoanTotalInt: 0, //外幣貸款
      creditTotalInt: 0, //信用卡
      overdraftTotalInt: 0, //透支
      //台幣貸款
      loanTotal: computed(() => {
        return formatTWCurrency(assetsObject.liabilitiesData.loanTotalInt);
      }),
      //外幣貸款
      fceLoanTotal: computed(() => {
        return formatTWCurrency(assetsObject.liabilitiesData.fceLoanTotalInt);
      }),
      //信用卡
      creditTotal: computed(() => {
        return formatTWCurrency(assetsObject.liabilitiesData.creditTotalInt);
      }),
      //透支
      overdraftTotal: computed(() => {
        return formatTWCurrency(assetsObject.liabilitiesData.overdraftTotalInt);
      }),
    },
    sumData: {
      //存款總和
      allDepositInt: computed(() => {
        return (
          assetsObject.depositData.twCurrentInt +
          assetsObject.depositData.twCheckInt +
          assetsObject.depositData.twFixedInt +
          assetsObject.depositData.foreignCurrentInt +
          assetsObject.depositData.foreignFixedInt
        );
      }),
      //投資總和
      allInvestInt: computed(() => {
        return (
          assetsObject.investData.fundInt +
          assetsObject.investData.etfTotalInt +
          assetsObject.investData.bondTotalInt +
          assetsObject.investData.stockTotalInt +
          assetsObject.investData.othersTotalInt +
          assetsObject.investData.goldTotalInt +
          assetsObject.investData.DCITotalInt +
          assetsObject.investData.insuranceTotalInt +
          assetsObject.investData.traditionalInsTotalInt +
          assetsObject.investData.refMarketValInt +
          assetsObject.investData.buyRefMarketValInt
        );
      }),
      //總資產
      allAssetsInt: computed(() => {
        return assetsObject.sumData.allDepositInt + assetsObject.sumData.allInvestInt;
      }),
      //總負債
      allLiabilitiesInt: computed(() => {
        return (
          assetsObject.liabilitiesData.loanTotalInt +
          assetsObject.liabilitiesData.fceLoanTotalInt +
          assetsObject.liabilitiesData.creditTotalInt +
          assetsObject.liabilitiesData.overdraftTotalInt
        );
      }),
      // 總資產 + 總負債
      allAssetsAndLiabilitiesInt: computed(() => {
        return assetsObject.sumData.allAssetsInt + assetsObject.sumData.allLiabilitiesInt;
      }),
      // 總資產 - 總負債
      allAssetsMinusLiabilitiesInt: computed(() => {
        return assetsObject.sumData.allAssetsInt - assetsObject.sumData.allLiabilitiesInt;
      }),
      //總貸款
      allLoanInt: computed(() => {
        return assetsObject.liabilitiesData.loanTotalInt + assetsObject.liabilitiesData.fceLoanTotalInt;
      }),
      //存款總和
      allDeposit: computed(() => {
        return formatTWCurrency(assetsObject.sumData.allDepositInt);
      }),
      //投資總和
      allInvest: computed(() => {
        return formatTWCurrency(assetsObject.sumData.allInvestInt);
      }),
      //總資產
      allAssets: computed(() => {
        return formatTWCurrency(assetsObject.sumData.allAssetsInt);
      }),
      //$ + 總資產
      allAssetsCurrency: computed(() => {
        return formatTWCurrency(assetsObject.sumData.allAssetsInt, 0, 'currency');
      }),
      //總負債
      allLiabilities: computed(() => {
        return formatTWCurrency(assetsObject.sumData.allLiabilitiesInt);
      }),
      //$ + 總負債
      allLiabilitiesCurrency: computed(() => {
        return formatTWCurrency(assetsObject.sumData.allLiabilitiesInt, 0, 'currency');
      }),
      // 總資產 + 總負債
      allAssetsAndLiabilities: computed(() => {
        return formatTWCurrency(assetsObject.sumData.allAssetsAndLiabilitiesInt);
      }),
      // 總資產 - 總負債
      allAssetsMinusLiabilities: computed(() => {
        return formatTWCurrency(assetsObject.sumData.allAssetsMinusLiabilitiesInt);
      }),
      //總貸款
      allLoan: computed(() => {
        return formatTWCurrency(assetsObject.sumData.allLoanInt);
      }),
    },
    percentageData: {
      //總資產百分比
      allAssetsPercent: computed(() => {
        return (
          Math.round((assetsObject.sumData.allAssetsInt / assetsObject.sumData.allAssetsAndLiabilitiesInt) * 10000) /
          100
        ).toFixed(1);
      }),
      //總負債百分比
      allLiabilitiesPercent: computed(() => {
        return (
          Math.round(
            (assetsObject.sumData.allLiabilitiesInt / assetsObject.sumData.allAssetsAndLiabilitiesInt) * 10000
          ) / 100
        ).toFixed(1);
      }),
      //存款百分比
      allDepositPercent: computed(() => {
        return (
          Math.round((assetsObject.sumData.allDepositInt / assetsObject.sumData.allAssetsAndLiabilitiesInt) * 10000) /
          100
        ).toFixed(1);
      }),
      //投資百分比
      allInvestPercent: computed(() => {
        return (
          Math.round((assetsObject.sumData.allInvestInt / assetsObject.sumData.allAssetsAndLiabilitiesInt) * 10000) /
          100
        ).toFixed(1);
      }),
      //總貸款百分比
      allLoanPercent: computed(() => {
        return (
          Math.round((assetsObject.sumData.allLoanInt / assetsObject.sumData.allAssetsAndLiabilitiesInt) * 10000) / 100
        ).toFixed(1);
      }),
      //信用卡百分比
      creditTotalPercent: computed(() => {
        if (assetsObject.liabilitiesData.creditTotalInt / assetsObject.sumData.allAssetsAndLiabilitiesInt <= 0) {
          return '0.0';
        } else {
          return (
            Math.round(
              (assetsObject.liabilitiesData.creditTotalInt / assetsObject.sumData.allAssetsAndLiabilitiesInt) * 10000
            ) / 100
          ).toFixed(1);
        }
      }),
      //透支百分比
      overdraftTotalPercent: computed(() => {
        if (assetsObject.liabilitiesData.overdraftTotalInt / assetsObject.sumData.allAssetsAndLiabilitiesInt <= 0) {
          return '0.0';
        } else {
          return (
            Math.round(
              (assetsObject.liabilitiesData.overdraftTotalInt / assetsObject.sumData.allAssetsAndLiabilitiesInt) * 10000
            ) / 100
          ).toFixed(1);
        }
      }),
      //總資產百分比Format
      allAssetsPercentFormat: computed(() => {
        if (assetsObject.percentageData.allAssetsPercent === '0.0') {
          return '<0.1%';
        } else {
          return assetsObject.percentageData.allAssetsPercent + '%';
        }
      }),
      //總資產百分比Format
      allLiabilitiesPercentFormat: computed(() => {
        if (assetsObject.percentageData.allLiabilitiesPercent === '0.0') {
          return '<0.1%';
        } else {
          return assetsObject.percentageData.allLiabilitiesPercent + '%';
        }
      }),
      //存款百分比Format
      allDepositPercentFormat: computed(() => {
        if (assetsObject.percentageData.allDepositPercent === '0.0') {
          return '<0.1%';
        } else {
          return assetsObject.percentageData.allDepositPercent + '%';
        }
      }),
      //投資百分比Format
      allInvestPercentFormat: computed(() => {
        if (assetsObject.percentageData.allInvestPercent === '0.0') {
          return '<0.1%';
        } else {
          return assetsObject.percentageData.allInvestPercent + '%';
        }
      }),
      //總貸款百分比Format
      allLoanPercentFormat: computed(() => {
        if (assetsObject.percentageData.allLoanPercent === '0.0') {
          return '<0.1%';
        } else {
          return assetsObject.percentageData.allLoanPercent + '%';
        }
      }),
      //信用卡百分比Format
      creditTotalPercentFormat: computed(() => {
        if (assetsObject.percentageData.creditTotalPercent === '0.0') {
          return '<0.1%';
        } else {
          return assetsObject.percentageData.creditTotalPercent + '%';
        }
      }),
      //透支百分比Format
      overdraftTotalPercentFormat: computed(() => {
        if (assetsObject.percentageData.overdraftTotalPercent === '0.0') {
          return '<0.1%';
        } else {
          return assetsObject.percentageData.overdraftTotalPercent + '%';
        }
      }),
    },
  });

  function initData() {
    const data = assetsObject.RsData;

    const depositData = assetsObject.depositData;
    const investData = assetsObject.investData;
    const liabilitiesData = assetsObject.liabilitiesData;
    //台幣
    if (data.overallAcctStatus.twdAcctStatus.status == '1' || data.overallAcctStatus.twdAcctStatus.status == '0') {
      //台幣活期存款
      depositData.twCurrentInt = computed(() => {
        return parseFloat(data.twd_DemandDeposit_LcyBalance);
      });
      //台幣支票存款
      depositData.twCheckInt = computed(() => {
        return parseFloat(data.twd_CheckDeposit_LcyBalance);
      });
      //台幣定期存款
      depositData.twFixedInt = computed(() => {
        return parseFloat(data.twd_FixedDeposit_LcyBalance);
      });
    }

    //外幣
    if (data.overallAcctStatus.fceAcctStatus.status == '1' || data.overallAcctStatus.fceAcctStatus.status == '0') {
      //外幣活期存款
      depositData.foreignCurrentInt = computed(() => {
        return parseFloat(data.fce_DemandfceDeposit_TwEquiv);
      });
      //外幣定期存款
      depositData.foreignFixedInt = computed(() => {
        return parseFloat(data.fce_FixedfceDeposit_TwEquiv);
      });
    }

    //基金
    if (
      data.overallAcctStatus.overviewFundStatus.status == '1' ||
      data.overallAcctStatus.overviewFundStatus.status == '0'
    ) {
      investData.fundInt = computed(() => {
        return parseFloat(data.fund_TotalRefAmount);
      });
    }

    //境外ETF 海外債券 境外股票(普通股 特別股) 境外結構型商品(連動債)
    if (
      data.overallAcctStatus.bondOverviewStatus.status == '1' ||
      data.overallAcctStatus.bondOverviewStatus.status == '0'
    ) {
      //境外ETF
      investData.etfTotalInt = computed(() => {
        return parseFloat(data.fund_SumEtf);
      });
      //海外債券
      investData.bondTotalInt = computed(() => {
        return parseFloat(data.fund_SumBond);
      });
      //境外股票(普通股 特別股)
      investData.stockTotalInt = computed(() => {
        return parseFloat(data.fund_SumStock);
      });
      //境外結構型商品(連動債)
      investData.othersTotalInt = computed(() => {
        return parseFloat(data.fund_SumOthers);
      });
    }

    //黃金存摺
    if (data.overallAcctStatus.goldAcctStatus.status == '1' || data.overallAcctStatus.goldAcctStatus.status == '0') {
      investData.goldTotalInt = computed(() => {
        return parseFloat(data.gold_Asset);
      });
    }

    //結構型商品(DSI/SI)
    if (
      data.overallAcctStatus.dcisummeryStatus.status == '1' ||
      data.overallAcctStatus.dcisummeryStatus.status == '0'
    ) {
      investData.DCITotalInt = computed(() => {
        return parseFloat(data.dci_Sum);
      });
    }

    //保險
    if (
      data.overallAcctStatus.insuranceSummeryStatus.status == '1' ||
      data.overallAcctStatus.insuranceSummeryStatus.status == '0'
    ) {
      //保險(投資型保單累計保費)
      investData.insuranceTotalInt = computed(() => {
        return parseFloat(data.insure_Sum);
      });
      //保險(傳統型保單累計保費)
      investData.traditionalInsTotalInt = computed(() => {
        return parseFloat(data.insure_SumTranditional);
      });
    }

    //債券自行買賣(買賣斷交易)
    if (data.refMarketVal) {
      investData.refMarketValInt = computed(() => {
        return parseFloat(data.refMarketVal.split('.')[0].replace(/,/g, '').replace('-', ''));
      });
    }
    //債券自行買賣(附買回交易)
    if (data.buyRefMarketVal) {
      investData.buyRefMarketValInt = computed(() => {
        return parseFloat(data.buyRefMarketVal.split('.')[0].replace(/,/g, '').replace('-', ''));
      });
    }

    //台幣貸款
    if (data.overallAcctStatus.loanAcctStatus.status == '1' || data.overallAcctStatus.loanAcctStatus.status == '0') {
      liabilitiesData.loanTotalInt = computed(() => {
        return parseFloat(data.loan_lcyBalance);
      });
    }

    //外幣貸款
    if (
      data.overallAcctStatus.fceLoanAcctStatus.status == '1' ||
      data.overallAcctStatus.fceLoanAcctStatus.status == '0'
    ) {
      liabilitiesData.fceLoanTotalInt = computed(() => {
        return parseFloat(data.fce_loan_lcyBalance);
      });
    }

    //信用卡
    if (
      data.overallAcctStatus.getCrdtcardSummeryStatus.status == '1' ||
      data.overallAcctStatus.getCrdtcardSummeryStatus.status == '0'
    ) {
      liabilitiesData.creditTotalInt = computed(() => {
        return parseFloat(data.crdt_Summery);
      });
    }

    //透支
    liabilitiesData.overdraftTotalInt = computed(() => {
      return parseFloat(data.overdraft_Sum);
    });
  }

  async function fetchAssetsData() {
    axios
      .all([apiPostOverallAcctAll(), apiPostGetBuySelOutRefMktVal(), apiPostGetConditionalSaleRefMktVal()])
      .then(
        axios.spread((assetsData, refMarketVal, buyRefMarketVal) => {
          const asset = assetsData.data.RsData;
          const refVal = refMarketVal.data.RsData;
          const buyRefVal = buyRefMarketVal.data.RsData;

          if (asset) {
            if (refVal.refMarketVal) {
              asset.refMarketVal = refVal.refMarketVal;
            }
            if (buyRefVal.buyRefMarketVal) {
              asset.buyRefMarketVal = buyRefVal.buyRefMarketVal;
            }
          }

          assetsObject.RsData = asset;
          initData();
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }

  return { assetsObject, initData, fetchAssetsData };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAssetsStore, import.meta.hot));
}
