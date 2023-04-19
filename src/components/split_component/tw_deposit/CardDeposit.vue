<template>
  <div class="item">
    <div>帳戶餘額</div>
    <div>{{ formatTWCurrency(props.item.lcyBalance, 0, 'currency') }}</div>
  </div>
  <div class="item">
    <div>可用餘額</div>
    <div>{{ formatTWCurrency(props.item.fycBalance, 0, 'currency') }}</div>
  </div>
  <div class="item">
    <div>利率</div>
    <div>{{ rate(props.item.rate) }}</div>
  </div>
</template>

<script setup>
import { formatTWCurrency } from '@/common/method_common/formatPrice.js';

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});

const rate = (num) => {
  if (props.item.prodCate == '0066') {
    //判斷是否為薪滿意足儲蓄存款F，利率以'-'表示
    return '-';
  } else if (num == '0') {
    return '-';
  } else {
    return formatTWCurrency(num, 3) + '%';
  }
};
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  justify-content: space-between;
  padding-top: 8px;
  padding-right: 15px;
  div {
    white-space: nowrap;
    &:first-child {
      color: var(--yt-c-dusty-gray);
    }
    &:last-child {
      color: var(--yt-c-midnight-blue);
    }
  }
}
</style>
