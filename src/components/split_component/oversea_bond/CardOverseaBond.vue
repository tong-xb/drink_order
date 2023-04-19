<template>
  <infoCard :class-style="'full card-white'">
    <template #header>
      <div>
        <div class="title">
          <div>{{ props.overviewList.trustname }} {{ props.overviewList.rate }}%</div>
        </div>
      </div>
    </template>

    <template #body>
      <div :key="card.trustNo" v-for="card in cardList">
        <div v-if="card.trustNo === props.overviewList.trustNo">
          <div class="item-first">
            <div>參考報價日期: {{ card.infoupdate_invest }}</div>
            <SpanTag
              :class-tag="'r_tag'"
              :flag-img="card.payeName"
              :txt="formatCurrencyCHT(card.payeName) + '投資'"
            ></SpanTag>
          </div>
          <div class="item">
            <div>參考市值</div>
            <div>{{ card.payeName + formatTWCurrency(card.incNowValue, 2, 'currency') }}</div>
          </div>
          <div class="item">
            <div>投資金額</div>
            <div>{{ card.payeName + formatTWCurrency(props.overviewList.totAmt, 2, 'currency') }}</div>
          </div>
          <div class="item">
            <div>參考損益</div>
            <SpanTag
              :class-tag="card.incRefProfit > 0 ? 'font_red' : 'font_green'"
              :txt="card.payeName + formatTWCurrency(card.incRefProfit, 2)"
            ></SpanTag>
          </div>
          <div class="item">
            <div>參考報酬率</div>
            <SpanTag
              :class-tag="card.incRefPayback > 0 ? 'font_red' : 'font_green'"
              :txt="formatTWCurrency(card.incRefPayback, 2, 'percent')"
            ></SpanTag>
          </div>
          <div class="item">
            <div>成本價(含前手息)</div>
            <div>{{ props.overviewList.buyValue }}%</div>
          </div>
          <div class="item">
            <div>參考贖回價(含前手息)</div>
            <div>{{ props.overviewList.netvalue }}%</div>
          </div>
        </div>
      </div>
    </template>
  </infoCard>
</template>
<script setup>
import { computed } from 'vue';
import { formatCurrencyCHT } from '@/common/method_common/formatCurrency.js';
import { formatTWCurrency } from '@/common/method_common/formatPrice.js';
import infoCard from '@/components/public_components/card/infoCard.vue';
import SpanTag from '@/components/split_component/oversea_bond/SpanTag.vue';

import { useOverseaBondStore } from '@/stores/overseaBond';

const overseaBondStore = useOverseaBondStore();
const props = defineProps({
  overviewList: {
    type: Object,
    default: () => {},
  },
  incControlFlag: {
    type: Boolean,
    default: true,
  },
});
//卡片資料
const cardList = computed(() => {
  return overseaBondStore.overseaBondObject.cardList;
});
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
.flex {
  padding-top: 10px;
  .item {
    width: 50%;
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
