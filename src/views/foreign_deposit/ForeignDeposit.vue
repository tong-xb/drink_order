<template>
  <div class="layout">
    <div class="layout-header">
      <header>
        <OutlineHeader :mount="headerMountFormat" />
        <TabHeaderArea :router-list="tabData" />
      </header>
    </div>
    <MockTestButton router-name="ForeignDeposit" />
    <main class="layout-content">
      <router-view />
      <PageEndGap />
    </main>
  </div>

  <!-- <BaseModal v-model:modal-visible="modalVisible">
    <template #default>
      <div>即日起新增「買入平均匯率」欄位，計算半年內臺幣轉外幣交易的平均匯率。</div>
    </template>

    <template #footer>
      <div class="flex-vh-center">
        <button class="close" type="button" @click="closeModal()">關閉</button>
      </div>
    </template>
  </BaseModal> -->
</template>

<script setup>
import { formatTWCurrency } from '@/common/method_common/formatPrice.js';
import { formatDate } from '@/common/method_common/formatDate.js';
import dayjs from 'dayjs';

import OutlineHeader from '@/components/public_components/header/OutlineHeader.vue';
import TabHeaderArea from '@/components/public_components/tab/TabHeaderArea.vue';
import MockTestButton from '@/components/public_components/mock/MockTestButton.vue';
import PageEndGap from '@/components/public_components/layout/PageEndGap.vue';
// import BaseModal from '@/components/public_components/modal_popup/BaseModal.vue';

import { ref, reactive, computed, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
//import { useStorage } from '@vueuse/core';
import { useFceDepositStore } from '@/stores/fceDeposit';
import { useCommonStore } from '@/stores/common';
import { useMockStore } from '@/stores/mock';

const route = useRoute();
const common = useCommonStore();
const mockStore = useMockStore();
const fceDepositStore = useFceDepositStore();
const fceDepositObject = fceDepositStore.fceDepositObject;
//const FceDepositShowError = useStorage('FceDepositShowError', '0');

//預設_買入平均匯率僅計算半年內臺幣轉外幣交易
const endDate = ref(formatDate(new Date(), 'YYYY/MM/DD'));
const startDate = ref(dayjs(new Date()).subtract(6, 'month').format('YYYY/MM/DD'));

const tabData = reactive([
  {
    routerName: 'ForeignCurrentDeposit',
    name: '活存',
    pushTo: {
      name: 'ForeignCurrentDeposit',
    },
  },
  {
    routerName: 'ForeignFixedDeposit',
    name: '定存',
    pushTo: {
      name: 'ForeignFixedDeposit',
    },
  },
]);

const headerMount = computed(() => {
  let amount =
    route.name === 'ForeignCurrentDeposit'
      ? fceDepositObject.totalDemandDepositAmt
      : fceDepositObject.totalFixedDepositAmt;
  return amount;
});
const headerMountFormat = computed(() => {
  return formatTWCurrency(headerMount.value);
});

//const modalVisible = ref(false);

// const closeModal = () => {
//   modalVisible.value = false;
//   FceDepositShowError.value = '1';
// };
// const checkError = () => {
//   if (FceDepositShowError.value != '1') {
//     modalVisible.value = true;
//   }
// };

watchEffect(() => {
  common.headerTitle = route.name === 'ForeignCurrentDeposit' ? '外幣活期存款(等值新臺幣)' : '外幣定期存款';
});

onMounted(async () => {
  try {
    const body = {
      startDate: startDate.value,
      endDate: endDate.value,
      searchPeriod: 'custom',
    };
    await fceDepositStore.fetchFceDepositData(body);
    //checkError();
  } catch (error) {
    console.log(error);
    if (mockStore.testVisible) {
      mockStore.fetchMockFceDepositData(1);
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

.close {
  width: 100%;
  background-color: #005bac;
  font-size: 20px;
  border: 0px;
  color: #ffffff;
  border-radius: 0.25rem;
  padding-top: 6px;
  padding-bottom: 7px;
  margin-top: 15px;
}
</style>
