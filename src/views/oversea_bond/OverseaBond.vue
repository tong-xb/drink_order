<template>
  <header>
    <InvestHeader
      :totalRefAmount="totalRefAmount"
      :totalIncRefPayback="totalIncRefPayback"
      :nowTotalPay="totalAmt"
      :totalRefProfit="totalIncRefProfit"
    />
  </header>
  <main class="bg-f5">
    <MockTestButton router-name="OverseaBond" />
    <!-- <div v-if="level5">※客戶風險等級：5.專業投資人<br />您適合投資本行上架之所有理財商品</div> -->
    <div :key="item.certNo" v-for="item in overseaBondOverviewList.slice().reverse()">
      <OverseaBond :overview-list="item" />
    </div>
    <PageEndGap :height="'100px'" :background="'#f5f5f5'" />
  </main>
</template>

<script setup>
import InvestHeader from '@/components/public_components/header/InvestHeader.vue';
import MockTestButton from '@/components/public_components/mock/MockTestButton.vue';
import PageEndGap from '@/components/public_components/layout/PageEndGap.vue';
import OverseaBond from '@/components/split_component/oversea_bond/CardOverseaBond.vue';

import { computed, onMounted } from 'vue';
import { useCommonStore } from '@/stores/common';
import { useMockStore } from '@/stores/mock';
import { usePublicAxiosStore } from '@/stores/publicAxios';
import { useOverseaBondStore } from '@/stores/overseaBond';

const common = useCommonStore();
const mockStore = useMockStore();
const publicAxiosStore = usePublicAxiosStore();
const overseaBondStore = useOverseaBondStore();

//總參考市值
const totalRefAmount = computed(() => {
  return overseaBondStore.overseaBondObject.totalRefAmount;
});
//總參考損益(含息)
const totalIncRefProfit = computed(() => {
  return overseaBondStore.overseaBondObject.totalIncRefProfit;
});
//總參考報酬率(含息)
const totalIncRefPayback = computed(() => {
  return overseaBondStore.overseaBondObject.totalIncRefPayback;
});
//總投資金額
const totalAmt = computed(() => {
  return overseaBondStore.overseaBondObject.totalAmt;
});
//專業投資人判斷
// const level5 = computed(() => {
//   return publicAxiosStore.FundCustAndKycInfoObject.level5;
// });
//台幣轉出帳號
const overseaBondOverviewList = computed(() => {
  return overseaBondStore.overseaBondObject.overseaBondOverviewList;
});

onMounted(async () => {
  common.headerTitle = '海外債券總覽';
  try {
    await publicAxiosStore.fetchFundBranchData();
    await Promise.all([
      publicAxiosStore.fetchFundCustAndKycData({
        branchCode: publicAxiosStore.FundBranchObject.txnBranchCode,
        fundCode: '',
        searchType: '1',
      }),
      overseaBondStore.fetchOverseaBondData(),
    ]);
  } catch (error) {
    console.log(error);
    if (mockStore.testVisible) {
      mockStore.fetchOverseaBondData(1);
    }
  }
});
</script>

<style lang="scss" scoped>
header {
  padding-bottom: 15px;
  color: #fff;
  background: #005bac;
}
.bg-f5 {
  background-color: #f5f5f5;
}
</style>
