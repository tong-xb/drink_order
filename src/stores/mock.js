import { ref } from 'vue';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { usePublicAxiosStore } from './publicAxios';
import { useAssetsStore } from './assets';
import { useDepositStore } from './twDeposit';
import { useFceDepositStore } from './fceDeposit';
import { useFundOverviewStore } from './fundOverview';
import { useOverseaBondStore } from './overseaBond';

import axios from 'axios';

import mockRequest from '@/api/axios/mock_axios/mockRequest';

export const useMockStore = defineStore('mock', () => {
  // 測試開關
  const testVisible = ref(false);
  //資產總覽
  async function fetchMockAssetsData(number) {
    axios
      .all([
        mockRequest.get('/json/mock_data/asset_overview/assetsData' + number + '.json'),
        mockRequest.get('/json/mock_data/asset_overview/getRefMarketVal.json'),
        mockRequest.get('/json/mock_data/asset_overview/getBuyRefMarketVal.json'),
      ])
      .then(
        axios.spread((assetsData, refMarketVal, buyRefMarketVal) => {
          const assetsStore = useAssetsStore();

          const asset = assetsData.data.RsData;
          const refVal = refMarketVal.data.RsData;
          const buyRefVal = buyRefMarketVal.data.RsData;

          if (asset) {
            if (refVal.refMarketVal) {
              asset.refMarketVal = refVal.refMarketVal;
            }
            if (buyRefVal.buyRefMarketVal) {
              asset.buyRefMarketVal = refVal.buyRefMarketVal;
            }
          }

          assetsStore.assetsObject.RsData = asset;
          assetsStore.initData(asset);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }

  //臺幣支/活/定存
  async function fetchMockTwdAcctData(number) {
    axios
      .all([
        mockRequest.get('/json/mock_data/deposit/overallAcctTwd' + number + '.json'),
        mockRequest.get('/json/mock_data/deposit/twdAcct' + number + '.json'),
      ])
      .then(
        axios.spread((overallAcctTwdRes, twdAcctRes) => {
          const depositStore = useDepositStore();

          depositStore.depositObject.overallAcctTwdRsData = overallAcctTwdRes.data.RsData;
          depositStore.depositObject.twdAcctRsData = twdAcctRes.data.RsData;

          depositStore.initData();
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }
  //臺幣活存明細
  function fetchMockTwdAccDataDetail(number) {
    return mockRequest
      .get('/json/mock_data/deposit/twdAcctTxnDetail' + number + '.json')
      .then((res) => {
        return res.data.RsData.TwdAcctTxnDetailInfoList;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //臺幣定存明細
  function fetchMockTwdFixedAccDataDetail(number) {
    return mockRequest
      .get('/json/mock_data/deposit/twdAcctInfo' + number + '.json')
      .then((res) => {
        return res.data.RsData;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  //外幣活/定存
  async function fetchMockFceDepositData(number) {
    axios
      .all([
        mockRequest.get('/json/mock_data/foreign_ccy/getHostCcyList' + number + '.json'),
        mockRequest.get('/json/mock_data/foreign_ccy/fixedFceMultiDtl' + number + '.json'),
        mockRequest.get('/json/mock_data/foreign_ccy/fceAcct' + number + '.json'),
      ])
      .then(
        axios.spread((getHostCcyListRes, fixedFceMultiDtlRes, fceAcctRes) => {
          const fceDepositStore = useFceDepositStore();

          fceDepositStore.fceDepositObject.getHostCcyListRsData = getHostCcyListRes.data.RsData;
          fceDepositStore.fceDepositObject.fixedFceMultiDtlRsData = fixedFceMultiDtlRes.data.RsData;
          fceDepositStore.fceDepositObject.fceAcctRsData = fceAcctRes.data.RsData;

          fceDepositStore.initData();
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }

  //信託戶API
  async function fetchFundBranchData(number) {
    mockRequest
      .get('/json/mock_data/public_mock/getFundBranch' + number + '.json')
      .then((response) => {
        const publicAxiosStore = usePublicAxiosStore();
        publicAxiosStore.FundBranchObject.getFundBranchRsData = response.data.RsData;
        publicAxiosStore.initFundBranchData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //客戶基本資料與KYC、專業投資人判斷API
  async function fetchFundCustAndKycData(number) {
    mockRequest
      .get('/json/mock_data/public_mock/getFundCustAndKycInfo' + number + '.json')
      .then((response) => {
        const publicAxiosStore = usePublicAxiosStore();
        publicAxiosStore.FundCustAndKycInfoObject.getFundCustAndKycInfoRsData = response.data.RsData;
        publicAxiosStore.initFundCustAndKycData();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // 基金
  async function fetchMockFundData(number) {
    mockRequest
      .get('/json/mock_data/fund/recServiceDWID' + number + '.json')
      .then((fundRecServiceRes) => {
        const fundOverviewStore = useFundOverviewStore();
        fundOverviewStore.fundOverviewObject.RsData = fundRecServiceRes.data.RsData;
        fundOverviewStore.initData();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //海外債
  async function fetchOverseaBondData(number) {
    axios
      .all([
        mockRequest.get('/json/mock_data/oversea_bond/overseaBondOverview' + number + '.json'),
        mockRequest.get('/json/mock_data/oversea_bond/getOverseaBond' + number + '.json'),
        mockRequest.get('/json/mock_data/oversea_bond/overseaBondPayAmount' + number + '.json'),
      ])
      .then(
        axios.spread((overseaBondOverviewRes, getOverseaBondRes, overseaBondPayAmountRes) => {
          const overseaBondStore = useOverseaBondStore();
          overseaBondStore.overseaBondObject.overseaBondOverviewRsData = overseaBondOverviewRes.data.RsData;
          overseaBondStore.overseaBondObject.getOverseaBondRsData = getOverseaBondRes.data.RsData;
          overseaBondStore.overseaBondObject.overseaBondPayAmountRsData = overseaBondPayAmountRes.data.RsData;
          overseaBondStore.initData();
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }

  async function testFn(routerName, number) {
    if (routerName === 'AssetView' || routerName === 'AssetsOverview') {
      await fetchMockAssetsData(number);
    } else if (routerName === 'TWDeposit') {
      await fetchMockTwdAcctData(number);
    } else if (routerName === 'ForeignDeposit') {
      await fetchMockFceDepositData(number);
    } else if (routerName === 'FundOverview') {
      await fetchMockFundData(number);
    } else if (routerName === 'OverseaBond') {
      Promise.all([fetchFundCustAndKycData(number), fetchOverseaBondData(number)]);
    }
  }

  return {
    testVisible,
    fetchMockAssetsData,
    fetchMockTwdAcctData,
    fetchMockTwdAccDataDetail,
    fetchMockTwdFixedAccDataDetail,
    fetchMockFceDepositData,
    fetchFundBranchData,
    fetchFundCustAndKycData,
    fetchMockFundData,
    fetchOverseaBondData,
    testFn,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMockStore, import.meta.hot));
}
