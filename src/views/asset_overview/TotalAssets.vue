<template>
  <AssetSheet
    :color="AssetSummary.depositColor"
    :name="AssetSummary.depositName"
    :dot-content="AssetSummary.depositAmountWithPercentage"
    :card-list="AssetSummary.depositList"
  />
  <div class="h-4"></div>
  <AssetSheet
    :color="AssetSummary.investColor"
    :name="AssetSummary.investName"
    :dot-content="AssetSummary.investAmountWithPercentage"
    :card-list="AssetSummary.investList"
  />
</template>

<script setup>
import AssetSheet from '@/components/split_component/asset_overview/AssetSheet.vue';

import { useMockStore } from '@/stores/mock';
import { useAssetsStore } from '@/stores/assets';
import { reactive, computed } from 'vue';

const mockStore = useMockStore();

const assetsStore = useAssetsStore();
const depositData = assetsStore.assetsObject.depositData;
const investData = assetsStore.assetsObject.investData;
const sumData = assetsStore.assetsObject.sumData;
const percentageData = assetsStore.assetsObject.percentageData;

//資產細節
const AssetSummary = reactive({
  depositColor: '#039be5',
  depositName: '存款',
  depositAmountWithPercentage: computed(() => {
    return `${sumData.allDeposit}元 (${percentageData.allDepositPercentFormat})`;
  }),
  depositList: [
    {
      name: '臺幣活期存款',
      total: computed(() => {
        return `${depositData.twCurrent}元`;
      }),
      arrowVisible: true,
      routerName: 'TWCheckCurrentDeposit',
    },
    {
      name: '台幣支票存款',
      total: computed(() => {
        return `${depositData.twCheck}元`;
      }),
      arrowVisible: true,
      routerName: 'TWCheckCurrentDeposit',
    },
    {
      name: '台幣定期存款',
      total: computed(() => {
        return `${depositData.twFixed}元`;
      }),
      arrowVisible: true,
      routerName: 'TWFixedDeposit',
    },
    {
      name: '外幣活期存款',
      total: computed(() => {
        return `${depositData.foreignCurrent}元`;
      }),
      arrowVisible: true,
      routerName: 'ForeignCurrentDeposit',
    },
    {
      name: '外幣定期存款',
      total: computed(() => {
        return `${depositData.foreignFixed}元`;
      }),
      arrowVisible: true,
      routerName: 'ForeignFixedDeposit',
    },
  ],
  investColor: '#075094',
  investName: '投資',
  investAmountWithPercentage: computed(() => {
    return `${sumData.allInvest}元 (${percentageData.allInvestPercentFormat})`;
  }),
  investList: [
    {
      name: '基金',
      total: computed(() => {
        return `${investData.fund}元`;
      }),
      arrowVisible: computed(() => {
        if (mockStore.testVisible === true) {
          return true;
        } else if (investData.fundInt === 0) {
          return false;
        } else {
          return true;
        }
      }),
      routerName: 'HoldingPerformance',
    },
    {
      name: '境外ETF',
      total: computed(() => {
        return `${investData.bondTotal}元`;
      }),
      arrowVisible: computed(() => {
        if (mockStore.testVisible === true) {
          return true;
        } else if (investData.bondTotalInt === 0) {
          return false;
        } else {
          return false;
        }
      }),
      routerName: '',
    },
    {
      name: '海外債券',
      total: computed(() => {
        return `${investData.bondTotal}元`;
      }),
      arrowVisible: computed(() => {
        if (mockStore.testVisible === true) {
          return true;
        } else if (investData.bondTotalInt === 0) {
          return false;
        } else {
          return true;
        }
      }),
      routerName: 'OverseaBond',
    },
    {
      name: '境外股票<br />(普通股 特別股)',
      total: computed(() => {
        return `${investData.stockTotal}元`;
      }),
      arrowVisible: computed(() => {
        if (mockStore.testVisible === true) {
          return true;
        } else if (investData.stockTotalInt === 0) {
          return false;
        } else {
          return false;
        }
      }),
      routerName: '',
    },
    {
      name: '境外結構型商品<br />(連動債)',
      total: computed(() => {
        return `${investData.othersTotal}元`;
      }),
      arrowVisible: computed(() => {
        if (mockStore.testVisible === true) {
          return true;
        } else if (investData.othersTotalInt === 0) {
          return false;
        } else {
          return false;
        }
      }),
      routerName: '',
    },
    {
      name: '黃金存摺',
      total: computed(() => {
        return `${investData.goldTotal}元`;
      }),
      arrowVisible: computed(() => {
        if (mockStore.testVisible === true) {
          return true;
        } else if (investData.goldTotalInt === 0) {
          return false;
        } else {
          return false;
        }
      }),
      routerName: '',
    },
    {
      name: '結構型商品<br />(DSI/SI)',
      total: computed(() => {
        return `${investData.DCITotal}元`;
      }),
      arrowVisible: computed(() => {
        if (mockStore.testVisible === true) {
          return true;
        } else if (investData.DCITotalInt === 0) {
          return false;
        } else {
          return false;
        }
      }),
      routerName: '',
    },
    {
      name: '保險<br />(投資型保單累計保費)',
      total: computed(() => {
        return `${investData.insuranceTotal}元`;
      }),
      arrowVisible: computed(() => {
        if (mockStore.testVisible === true) {
          return true;
        } else if (investData.insuranceTotalInt === 0) {
          return false;
        } else {
          return false;
        }
      }),
      routerName: '',
    },
    {
      name: '保險<br />(傳統型保單累計保費)',
      total: computed(() => {
        return `${investData.traditionalInsTotal}元`;
      }),
      arrowVisible: computed(() => {
        if (mockStore.testVisible === true) {
          return true;
        } else if (investData.traditionalInsTotalInt === 0) {
          return false;
        } else {
          return false;
        }
      }),
      routerName: '',
    },
    {
      name: '債券自行買賣<br />(買賣斷交易)',
      total: computed(() => {
        return `${investData.refMarketVal}元`;
      }),
      arrowVisible: computed(() => {
        if (mockStore.testVisible === true) {
          return true;
        } else if (investData.refMarketValInt === 0) {
          return false;
        } else {
          return false;
        }
      }),
      routerName: '',
    },
    {
      name: '債券自行買賣<br />(附買回交易)',
      total: computed(() => {
        return `${investData.buyRefMarketVal}元`;
      }),
      arrowVisible: computed(() => {
        if (mockStore.testVisible === true) {
          return true;
        } else if (investData.buyRefMarketValInt === 0) {
          return false;
        } else {
          return false;
        }
      }),
      routerName: '',
    },
  ],
});
</script>

<style lang="scss" scoped></style>
