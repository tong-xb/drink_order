<template>
  <div class="item">
    <div>帳戶餘額</div>
    <div>{{ formatTWCurrency(props.item.lcyBalance, 2, 'currency') }}</div>
  </div>
  <div class="item">
    <div>買入平均匯率</div>
    <div>{{ buyAvgRate }}</div>
  </div>
  <div class="item">
    <div>約等值臺幣</div>
    <div>{{ formatTWCurrency(props.item.twEquiv) }}</div>
  </div>
  <div class="item">
    <div>目前參考匯率</div>
    <div :class="rateColor">{{ bankBuyRate }}</div>
  </div>
</template>

<script setup>
import { formatTWCurrency } from '@/common/method_common/formatPrice.js';

import { ref, onMounted } from 'vue';
import { useFceDepositStore } from '@/stores/fceDeposit';
const fceDepositStore = useFceDepositStore();

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});

const fceDepositObject = fceDepositStore.fceDepositObject;
//活存列表
const ccyDetailList = fceDepositObject.ccyDetailList;
//匯率列表
const ccyList = fceDepositObject.ccyList;

//買入平均匯率
const buyAvgRate = ref('-');
//目前參考匯率
const bankBuyRate = ref('0');
//目前參考匯率顏色
const rateColor = ref('fxColor');

// 取得買入平均匯率
const getBuyAvgRate = () => {
  if (props.item) {
    let totalAmt = 0;
    let totalFceAmt = 0;
    if (ccyDetailList.length > 0) {
      ccyDetailList.forEach((el) => {
        if (el.txnCcy == props.item.ccy) {
          el.detailList.forEach((val) => {
            if (val.desc.indexOf('結購') !== -1) {
              totalAmt += parseFloat(val.inAmt) * parseFloat(val.txnRate);
              totalFceAmt += parseFloat(val.inAmt);
            }
          });
          // 計算買入平均匯率
          if (el.detailList.length > 0 && totalAmt > 0 && totalFceAmt > 0) {
            buyAvgRate.value = (totalAmt / totalFceAmt).toFixed(4);
          }
        }
      });
    }

    // 更新卡片顯示
    demandDepositUI();
  }
};

// 買入平均匯率、目前參考匯率的字型顏色設定
const demandDepositUI = () => {
  // 取得牌告匯率
  ccyList.forEach((element) => {
    if (props.item.ccy == element.currency) {
      bankBuyRate.value = element.bankBuy;
    }
  });

  // 如果買入平均匯率小於牌告匯率，則參考匯率字型為紅色
  if (parseFloat(buyAvgRate.value) < parseFloat(bankBuyRate.value)) {
    rateColor.value = 'font_red';
  }
  // 如果買入平均匯率大於牌告匯率，則參考匯率字型為綠色
  else if (parseFloat(buyAvgRate.value) > parseFloat(bankBuyRate.value)) {
    rateColor.value = 'font_green';
  }
  // 如果帳戶餘額為0，則買入平均匯率為'-'
  if (props.item.fycBalance == 0) {
    buyAvgRate.value = '-'; // 字型顏色為預設的匯率顏色
    rateColor.value = 'fxColor';
  }
};

onMounted(() => {
  getBuyAvgRate();
});
</script>

<style lang="scss" scoped>
.item {
  width: 50%;
  display: inline-block;
  padding-top: 8px;
  padding-right: 10px;
  overflow: hidden;
  div {
    white-space: nowrap;
    &:first-child {
      color: var(--yt-c-dusty-gray);
    }
    &:last-child {
      color: var(--yt-c-midnight-blue);
      &.font_red {
        color: rgb(255, 0, 0);
      }
      &.font_green {
        color: rgb(0, 166, 81);
      }
    }
  }
}
</style>
