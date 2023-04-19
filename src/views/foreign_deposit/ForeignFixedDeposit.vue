<template>
  <div :key="item.acctCcy + item.acctNo" v-for="item in fceDepositStore.fceDepositObject.fixedFceDepositSort">
    <infoCard>
      <template #header>
        <div>
          <div>
            <div class="color-midnight-blue">{{ formatCurrencyCHT(item.acctCcy) }} {{ item.acctCcy }}</div>
          </div>
        </div>
      </template>

      <template #body>
        <CardFceFixedDeposit :item="item" />
      </template>
      <template #footer>
        <div class="flex">
          <div class="card-footer-name color-dusty-gray">帳號({{ item.branchName }}):</div>
          <div class="card-footer-num">{{ item.acctNo }}</div>
        </div>
      </template>
    </infoCard>
  </div>
  <div class="result" v-show="fceDepositStore.fceDepositObject.fixedFceDepositSortLen === 0">查無資料</div>
</template>

<script setup>
import { formatCurrencyCHT } from '@/common/method_common/formatCurrency.js';

import infoCard from '@/components/public_components/card/infoCard.vue';
import CardFceFixedDeposit from '@/components/split_component/fce_deposit/CardFceFixedDeposit.vue';

import { useFceDepositStore } from '@/stores/fceDeposit';

const fceDepositStore = useFceDepositStore();
</script>

<style lang="scss" scoped>
.result {
  padding: 15px;
  color: var(--yt-c-midnight-blue);
  text-align: center;
  font-weight: bold;
}
</style>
