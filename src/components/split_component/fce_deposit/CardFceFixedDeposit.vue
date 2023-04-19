<template>
  <div class="item">
    <div>帳戶餘額</div>
    <div class="color-midnight-blue">{{ formatTWCurrency(props.item.acctBal, 2, 'currency') }}</div>
  </div>
  <div class="item">
    <div>約等值臺幣</div>
    <div class="color-midnight-blue">
      {{ formatTWCurrency(props.item.twEquiv, 0, 'currency') }}
      <div class="font_black" v-if="props.item.twEquiv">(目前參考匯率{{ bankBuyRate }})</div>
    </div>
  </div>
  <div class="item">
    <div>期別/定存利率</div>
    <div>{{ formatPeriodToCHT(props.item.depositLength) + '/' + props.item.rate + '%' }}</div>
  </div>
  <div class="item">
    <div>定存起存日</div>
    <div>{{ formatDate(props.item.startDate, 'YYYY/MM/DD', 'YYYY-MM-DD') }}</div>
  </div>
  <div class="item">
    <div>定存到期日</div>
    <div>{{ formatDate(props.item.endDate, 'YYYY/MM/DD', 'YYYY-MM-DD') }}</div>
  </div>
</template>

<script setup>
import { formatTWCurrency } from '@/common/method_common/formatPrice.js';
import { formatPeriodToCHT } from '@/common/method_common/formatDate.js';
import { formatDate } from '@/common/method_common/formatDate.js';

import { computed } from 'vue';
import { useFceDepositStore } from '@/stores/fceDeposit';

const fceDepositStore = useFceDepositStore();

//匯率列表
const ccyList = fceDepositStore.fceDepositObject.ccyList;

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});

//目前參考匯率
const bankBuyRate = computed(() => {
  //預設0
  let rate = '0';
  //取牌告匯率
  ccyList.forEach((element) => {
    if (props.item.acctCcy == element.currency) {
      rate = element.bankBuy;
    }
  });
  return rate;
});
</script>

<style lang="scss" scoped>
.card-body {
  padding-bottom: 15px;
  margin-left: 15px;
  .item {
    display: flex;
    justify-content: space-between;
    padding-top: 8px;
    padding-right: 15px;
    > div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:first-child {
        color: var(--yt-c-dusty-gray);
      }
      &:last-child {
        text-align: right;
      }
    }
  }
}
.font_black {
  color: black;
  font-size: smaller;
}
</style>
