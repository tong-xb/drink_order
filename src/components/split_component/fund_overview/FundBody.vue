<template>
  <infoCard :class-style="'full card-white'">
    <template #header>
      <div class="title">
        {{ props.fundData.fundName }}
      </div>
    </template>
    <template #body>
      <div>
        <div class="item-first">
          <div class="netValue">淨值:&nbsp;{{ formatTWCurrency(props.fundData.netValue, 4) }}</div>
          <SpanTag
            :class-tag="'r_tag'"
            :flag-img="props.fundData.investfundCurr"
            :txt="formatCurrencyCHT(props.fundData.investfundCurr) + '投資'"
          ></SpanTag>
        </div>
        <div class="item">
          <div class="">參考市值</div>
          <div class="">
            <span>{{ props.fundData.investfundCurr }}&nbsp;{{ formatTWCurrency(props.fundData.refAmount, 0) }}</span>
          </div>
        </div>
        <div class="item">
          <div>投資金額</div>
          <div>
            <span>{{ props.fundData.investfundCurr }}&nbsp;{{ formatTWCurrency(props.fundData.totalCost, 0) }}</span>
          </div>
        </div>
        <div class="item">
          <div>參考損益({{ incControlWord }})</div>
          <SpanTag
            :class-tag="refProfit > 0 ? 'font_red' : 'font_green'"
            :txt="props.fundData.investfundCurr + formatTWCurrency(refProfit, 2)"
          ></SpanTag>
        </div>
        <div class="item">
          <div>參考報酬率({{ incControlWord }})</div>
          <SpanTag
            :class-tag="refPayback > 0 ? 'font_red' : 'font_green'"
            :txt="formatTWCurrency(refPayback / 100, 2, 'percent')"
          ></SpanTag>
        </div>
      </div>
    </template>
  </infoCard>
</template>
<script setup>
import { computed } from 'vue';
import { formatTWCurrency } from '@/common/method_common/formatPrice.js';
import { formatCurrencyCHT } from '@/common/method_common/formatCurrency.js';
import infoCard from '@/components/public_components/card/infoCard.vue';
import SpanTag from '@/components/split_component/oversea_bond/SpanTag.vue';
const props = defineProps({
  fundData: {
    type: Object,
    default: () => {},
  },
  incControlFlag: {
    type: Boolean,
    default: true,
  },
});
const incControlWord = computed(() => (props.incControlFlag ? '含息' : '不含息'));
const refProfit = computed(() => (props.incControlFlag ? props.fundData.incomeRefProfit : props.fundData.refProfit));
const refPayback = computed(() => (props.incControlFlag ? props.fundData.incomeRefPayback : props.fundData.refPayback));
</script>
<style lang="scss" scoped>
.full {
  .title {
    padding-left: 15px;
    padding-right: 15px;
    color: #38a8fd;
    div {
      white-space: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
    }
  }
}
.info-card {
  &.full {
    .item-first {
      display: flex;
      justify-content: space-between;
      padding-top: 8px;
      padding-right: 15px;
    }
    .item {
      width: 50%;
      display: inline-block;
      padding-top: 10px;
      margin-bottom: 5px;
      padding-right: 10px;
      overflow: hidden;
      &:nth-child(odd) {
        padding-left: 15px;
        &::after {
          content: '';
          width: 1px;
          height: 85%;
          background-color: #d2d2d2;
          display: block;
          position: absolute;
          left: 0;
          top: 10px;
        }
      }
      div {
        white-space: nowrap;
        &:nth-child(even) {
          font-weight: 700;
        }
      }
      span {
        font-weight: 700;
      }
    }
  }
}
</style>
