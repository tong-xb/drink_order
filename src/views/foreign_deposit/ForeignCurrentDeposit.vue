<template>
  <div :key="item.ccy + item.acctNo" v-for="item in fceDepositStore.fceDepositObject.demandFceDepositSort">
    <infoCard>
      <template #header>
        <div>
          <div>
            <div class="color-midnight-blue">{{ formatCurrencyCHT(item.ccy) }} {{ item.ccy }}</div>
          </div>
        </div>
      </template>

      <template #body>
        <CardFceDeposit :item="item" />
      </template>
      <template #footer>
        <div class="flex">
          <div class="card-footer-name color-dusty-gray">帳號({{ item.branchName }}):</div>
          <div class="card-footer-num">{{ item.acctNo }}</div>
        </div>
      </template>
    </infoCard>
  </div>
  <div class="result" v-show="fceDepositStore.fceDepositObject.demandFceDepositSortLen === 0">查無資料</div>
  <NotificationMessage padding="16px 24px">
    <div>
      說明：
      <ol>
        <li>買入平均匯率僅計算半年內臺幣轉外幣交易</li>
        <li>紅字表示目前參考匯率優於原買入匯率</li>
        <li>綠字表示目前參考匯率劣於原買入匯率</li>
      </ol>
    </div>
  </NotificationMessage>
</template>

<script setup>
import { formatCurrencyCHT } from '@/common/method_common/formatCurrency.js';
import infoCard from '@/components/public_components/card/infoCard.vue';
import NotificationMessage from '@/components/public_components/notification/NotificationMessage.vue';
import CardFceDeposit from '@/components/split_component/fce_deposit/CardFceDeposit.vue';

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
