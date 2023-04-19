<template>
  <infoCard>
    <template #body>
      <div class="infoCard">
        <div class="infoCard-item">
          <div class="title">交易日期</div>
          <div class="content">{{ props.depositDataItem.postDate }}</div>
        </div>
        <div class="infoCard-item">
          <div class="title">帳務日期</div>
          <div class="content">{{ props.depositDataItem.recordedDate }}</div>
        </div>
        <div class="infoCard-item">
          <div class="title">{{ props.depositDataItem.description }}</div>
          <div class="content font_blue">{{ formatTWCurrency(props.depositDataItem.amount, 0, 'currency') }}</div>
        </div>
        <div class="infoCard-item">
          <div class="title">帳面餘額</div>
          <div class="content">{{ formatTWCurrency(props.depositDataItem.balance, 0, 'currency') }}</div>
        </div>
        <div class="infoCard-item">
          <div class="title">備註</div>
          <div class="content">{{ props.depositDataItem.remark }}</div>
        </div>
      </div>
    </template>
  </infoCard>
</template>
<script setup>
//import dayjs from 'dayjs';
import infoCard from '@/components/public_components/card/infoCard.vue';
import { formatTWCurrency } from '@/common/method_common/formatPrice.js';

const props = defineProps({
  depositDataItem: {
    type: Object,
    default: () => {},
  },
});
</script>
<style lang="scss" scoped>
.infoCard {
  padding: 16px 16px 0 0;
  font-size: 1em;
  line-height: 1.2em;
}

.infoCard-item {
  margin: 0 0 8px;
  display: flex;
  justify-content: space-between;
  .title {
    width: 6rem;
    font-weight: bold;
  }
  .content {
    width: calc(100% - 6em);
    text-align: right;
  }
}
.infoCardBodyItem div {
  white-space: nowrap;
}
.font_blue {
  color: #002e73;
}
</style>
