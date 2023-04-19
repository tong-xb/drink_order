<template>
  <div class="layout">
    <div>
      <header>
        <OutlineHeader :mount="headerMountFormat" />
        <TabHeaderArea :router-list="tabData" />
      </header>
    </div>
    <MockTestButton router-name="TWDeposit" />
    <main class="layout-content">
      <router-view />
      <PageEndGap />
    </main>
  </div>
</template>

<script setup>
import { formatTWCurrency } from '@/common/method_common/formatPrice.js';
import OutlineHeader from '@/components/public_components/header/OutlineHeader.vue';
import TabHeaderArea from '@/components/public_components/tab/TabHeaderArea.vue';
import MockTestButton from '@/components/public_components/mock/MockTestButton.vue';
import PageEndGap from '@/components/public_components/layout/PageEndGap.vue';

import { reactive, computed, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { useDepositStore } from '@/stores/twDeposit';
import { useCommonStore } from '@/stores/common';
import { useMockStore } from '@/stores/mock';

const route = useRoute();
const depositStore = useDepositStore();
const common = useCommonStore();
const mockStore = useMockStore();
const depositObject = depositStore.depositObject;

const tabData = reactive([
  {
    routerName: 'TWCheckCurrentDeposit',
    name: '支/活存',
    pushTo: {
      name: 'TWCheckCurrentDeposit',
    },
  },
  {
    routerName: 'TWFixedDeposit',
    name: '定存',
    pushTo: {
      name: 'TWFixedDeposit',
    },
  },
]);

const headerMount = computed(() => {
  let amount =
    route.name === 'TWCheckCurrentDeposit' ? depositObject.totalDepositAmount : depositObject.totalFixedDepositAmount;
  return amount;
});
const headerMountFormat = computed(() => {
  return formatTWCurrency(headerMount.value);
});

watchEffect(() => {
  common.headerTitle = route.name === 'TWCheckCurrentDeposit' ? '臺幣支/活存總金額' : '臺幣定存總金額';
});

onMounted(async () => {
  try {
    await depositStore.fetchDepositData();
  } catch (error) {
    console.log(error);
    if (mockStore.testVisible) {
      mockStore.fetchMockDepositData(1);
    }
  }
});
</script>

<style lang="scss" scoped>
.layout {
  height: 94vh;
  overflow: hidden;

  header {
    background: #005bac;
  }
  .layout-content {
    height: calc(94vh - 20vh);
    overflow: auto;
  }
}
</style>
