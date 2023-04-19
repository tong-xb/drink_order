import { reactive, computed } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';

// import mockRequest from '@/api/axios/mock_axios/mockRequest';

import { apiPostGetFundBranch, apiPostGetFundCustAndKycInfo } from '@/api/axios/public_axios/publicAxios.js';

export const usePublicAxiosStore = defineStore('publicAxios', () => {
  //信託戶API
  const FundBranchObject = reactive({
    //原始資料
    getFundBranchRsData: [],
    //處理過後資料
    fundBranchList: [], //信託戶
    txnBranchCode: '', //網路交易申請行
    isBranch: false, //判斷信託戶
  });

  //客戶基本資料與KYC、專業投資人判斷API
  const FundCustAndKycInfoObject = reactive({
    //原始資料
    getFundCustAndKycInfoRsData: [],
    //處理過後資料
    level5: false, //專業投資人判斷
  });

  function initFundBranchData() {
    const getFundBranchRsData = FundBranchObject.getFundBranchRsData;

    //信託戶資料處理
    FundBranchObject.fundBranchList = [...getFundBranchRsData.fundBranchList];
    FundBranchObject.txnBranchCode = getFundBranchRsData.fundBranchList[0].branchCode;
    FundBranchObject.isBranch = getFundBranchRsData.fundBranchList.length > 0 ? true : false; //判斷信託戶
  }

  async function fetchFundBranchData() {
    try {
      const res = await apiPostGetFundBranch();
      FundBranchObject.getFundBranchRsData = res.data.RsData;
      initFundBranchData();
    } catch (error) {
      console.log(error);
    }
  }

  function initFundCustAndKycData() {
    const getFundCustAndKycInfoRsData = FundCustAndKycInfoObject.getFundCustAndKycInfoRsData;

    //客戶基本資料與KYC、專業投資人判斷
    FundCustAndKycInfoObject.level5 = computed(() => {
      return getFundCustAndKycInfoRsData.custKyc === '5' && getFundCustAndKycInfoRsData.isProfessional === true
        ? true
        : false;
    });
  }

  async function fetchFundCustAndKycData(data) {
    try {
      const res = await apiPostGetFundCustAndKycInfo(data);
      FundCustAndKycInfoObject.getFundCustAndKycInfoRsData = res.data.RsData;
      initFundCustAndKycData();
    } catch (error) {
      console.log(error);
    }
  }

  return {
    FundBranchObject,
    initFundBranchData,
    fetchFundBranchData,
    FundCustAndKycInfoObject,
    initFundCustAndKycData,
    fetchFundCustAndKycData,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePublicAxiosStore, import.meta.hot));
}
