<template>
  <AssetSheet
    :color="AssetSummary.loanColor"
    :name="AssetSummary.loanName"
    :dot-content="AssetSummary.loanAmountWithPercentage"
    :card-list="AssetSummary.loanList"
  />
  <div class="h-4"></div>
  <AssetSheet
    :color="AssetSummary.creditColor"
    :name="AssetSummary.creditName"
    :dot-content="AssetSummary.creditAmountWithPercentage"
  />
  <div class="h-4"></div>
  <AssetSheet
    :color="AssetSummary.overdraftColor"
    :name="AssetSummary.overdraftName"
    :dot-content="AssetSummary.overdraftAmountWithPercentage"
  />
</template>

<script setup>
import AssetSheet from '@/components/split_component/asset_overview/AssetSheet.vue';

import { useMockStore } from '@/stores/mock';
import { useAssetsStore } from '@/stores/assets';
import { reactive, computed } from 'vue';

const mockStore = useMockStore();

const assetsStore = useAssetsStore();
const liabilitiesData = assetsStore.assetsObject.liabilitiesData;
const sumData = assetsStore.assetsObject.sumData;
const percentageData = assetsStore.assetsObject.percentageData;

//負債細節
const AssetSummary = reactive({
  loanColor: '#88D498',
  loanName: '貸款',
  loanAmountWithPercentage: computed(() => {
    return `${sumData.allLoan}元 (${percentageData.allLoanPercentFormat})`;
  }),
  loanList: [
    {
      name: '台幣貸款',
      total: computed(() => {
        return `${liabilitiesData.loanTotal}元`;
      }),
      arrowVisible: computed(() => {
        if (mockStore.testVisible === true) {
          return true;
        } else if (liabilitiesData.loanTotalInt === 0) {
          return false;
        } else {
          return false;
        }
      }),
      routerName: '',
    },
    {
      name: '外幣貸款',
      total: computed(() => {
        return `${liabilitiesData.fceLoanTotal}元`;
      }),
      arrowVisible: computed(() => {
        if (mockStore.testVisible === true) {
          return true;
        } else if (liabilitiesData.fceLoanTotalInt === 0) {
          return false;
        } else {
          return false;
        }
      }),
      routerName: '',
    },
  ],
  creditColor: '#EB6100',
  creditName: '信用卡',
  creditAmountWithPercentage: computed(() => {
    return `${liabilitiesData.creditTotal}元 (${percentageData.creditTotalPercentFormat})`;
  }),
  overdraftColor: '#FFD54F',
  overdraftName: '透支',
  overdraftAmountWithPercentage: computed(() => {
    return `${liabilitiesData.overdraftTotal}元 (${percentageData.overdraftTotalPercentFormat})`;
  }),
});
</script>

<style lang="scss" scoped></style>
