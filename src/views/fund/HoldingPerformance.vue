<template>
  <!-- <div>基金庫存績效</div> -->
  <header>
    <!-- 總覽卡片 -->
    <!-- incControlVisible：控制可否切換 -->
    <InvestHeader
      incControlVisible
      v-model:incControlFlag="incControl"
      :totalRefAmount="fundHeader.totalRefAmount"
      :totalRefPayback="fundHeader.totalRefPayback"
      :nowTotalPay="fundHeader.nowTotalPay"
      :totalRefProfit="fundHeader.totalRefProfit"
    />
  </header>
  <main class="bg-f5">
    <MockTestButton router-name="FundOverview" />
    <!-- 各基金項目卡片 -->
    <div class="base-fund w-full">
      <div :key="fund.fundNo + '_' + index" v-for="(fund, index) in fundDetailList">
        <FundBody :fundData="fund" :incControlFlag="incControl" />
      </div>
    </div>
    <!-- 提示訊息 -->
    <NotificationMessage>
      <div class="p-2">
        說明 : <br />
        此頁提供各基金總和績效，例 :
        若以單筆方式申購2筆同一檔基金，則合併計算顯示於同一張卡牌。定期定額、定期不定額以此類推
      </div>
    </NotificationMessage>
    <PageEndGap :height="'100px'" :background="'#f5f5f5'" />
  </main>
</template>

<script setup>
import InvestHeader from '@/components/public_components/header/InvestHeader.vue';
import MockTestButton from '@/components/public_components/mock/MockTestButton.vue';
import NotificationMessage from '@/components/public_components/notification/NotificationMessage.vue';
import FundBody from '@/components/split_component/fund_overview/FundBody.vue';
import PageEndGap from '@/components/public_components/layout/PageEndGap.vue';
import { onMounted, ref, computed } from 'vue';
import { useCommonStore } from '@/stores/common';
import { useMockStore } from '@/stores/mock';
import { useFundOverviewStore } from '@/stores/fundOverview';

const common = useCommonStore();
const mockStore = useMockStore();
// API 呼叫
const fundOverviewStore = useFundOverviewStore();
// 含息/不含息 switch 控制
const incControl = ref(true);
// header 卡片資料
const fundHeader = computed(() =>
  incControl.value
    ? fundOverviewStore.fundOverviewObject.incHeaderData
    : fundOverviewStore.fundOverviewObject.headerData
);
// body 基金詳細資料
const fundDetailList = computed(() => fundOverviewStore.fundOverviewObject.fundDataList);

onMounted(async () => {
  common.headerTitle = '基金總覽庫存績效';
  try {
    await fundOverviewStore.fetchFundOverviewData();
  } catch (error) {
    console.log(error);
    if (mockStore.testVisible) {
      mockStore.fetchMockFundData(1);
    }
  }
});
</script>

<style lang="scss" scoped>
header {
  padding-top: 0px;
  padding-bottom: 15px;
  color: #fff;
  background: #005bac;
}
.bg-f5 {
  background-color: #f5f5f5;
}
</style>
