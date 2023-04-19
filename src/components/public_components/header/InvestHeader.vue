<template>
  <nav class="background-base">
    <div class="outlineContent">
      <div class="card-content font-black w-full">
        <infoCard :class-style="'white'" :style="{ margin: '10px 15px' }">
          <template #body>
            <!-- title -->
            <div class="flex">
              <div class="refProfitTitle">總參考損益</div>
              <div class="refProfitTitle">
                <!-- 含息/不含息 incControl 控制 -->
                <SwitchButton
                  v-if="props.incControlVisible"
                  :switchOn="incControl[0]"
                  :switchOff="incControl[1]"
                  v-model:switchControl="headerData.incControlFlag"
                />
                <div v-else>({{ incControl[props.incControlFlag ? 0 : 1] }})</div>
              </div>
            </div>
            <!-- total amount -->
            <div class="flex refProfitContent">
              <div class="">
                <!-- currency -->
                {{ totalCCY }}&nbsp;
              </div>
              <div class="">
                {{ formatTWCurrency(props.totalRefProfit, 0, 'currency') }}
              </div>
              <!-- <FundRate :rate="props.totalRefPayback" /> -->
              <div
                class="fundRate"
                :class="{ up: props.totalRefPayback > 0, down: props.totalRefPayback < 0 }"
                v-if="props.totalRefPayback"
              >
                <div class="fundRatePercent">
                  {{ formatTWCurrency(props.totalRefPayback, 2) + '%' }}
                </div>
              </div>
              <div
                class="fundRate"
                :class="{ up: props.totalIncRefPayback > 0, down: props.totalIncRefPayback < 0 }"
                v-if="props.totalIncRefPayback"
              >
                <div class="fundRatePercent">
                  {{ formatTWCurrency(props.totalIncRefPayback, 2, 'percent') }}
                </div>
              </div>
            </div>
            <!-- performance amount -->
            <div class="grid py-1">
              <div class="grid-content">
                <div>參考總市值</div>
                <div class="flex">
                  <div class="">{{ totalCCY }}&nbsp;</div>
                  <div class="">{{ formatTWCurrency(props.totalRefAmount, 0, 'currency') }}</div>
                </div>
              </div>
              <div class="grid-content">
                <div>總投資金額</div>
                <div class="flex">
                  <div class="">{{ totalCCY }}&nbsp;</div>
                  <div class="">{{ formatTWCurrency(props.nowTotalPay, 0, 'currency') }}</div>
                </div>
              </div>
            </div>
          </template>
        </infoCard>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { formatTWCurrency } from '@/common/method_common/formatPrice.js';
import infoCard from '@/components/public_components/card/infoCard.vue';
import SwitchButton from '@/components/public_components/button/SwitchButton.vue';

const props = defineProps({
  /* 可否進行含息/不含息切換 */
  incControlVisible: {
    type: Boolean,
    default: false,
  },
  /* 含息/不含息 切換 */
  incControlFlag: {
    type: Boolean,
    default: true,
  },
  /* 總參考市值 */
  totalRefAmount: {
    type: Number,
    default: 0,
  },
  /* 總參考報酬率for基金 */
  totalRefPayback: {
    type: Number,
    default: 0.0,
  },
  /* 總參考報酬率for海外債 */
  totalIncRefPayback: {
    type: Number,
    default: 0.0,
  },
  /* 總投資金額 */
  nowTotalPay: {
    type: Number,
    default: 0,
  },
  /* 總參考損益 */
  totalRefProfit: {
    type: Number,
    default: 0,
  },
  /* 參考幣別 */
  totalCCY: {
    type: String,
    default: 'TWD',
  },
});
/* switch 文字內容 */
const incControl = reactive(['含息', '不含息']);

const emit = defineEmits(['update:incControlFlag']);
const headerData = reactive({
  headerTitle: computed(() => {
    return props.headerTitle;
  }),
  incControlFlag: computed({
    get: () => {
      return props.incControlFlag;
    },
    set: (newValue) => {
      emit('update:incControlFlag', newValue);
    },
  }),
});
</script>

<style lang="scss" scoped>
.background-base {
  background: #005bac;
  text-align: center;
  color: #ffffff;
  font-family: 'Roboto', sans-serif;
  height: auto;

  /* 標題 */
  .outlineContent {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .card-content > div {
    background-color: #ffffff;
    padding-top: 1vh;

    .refProfitTitle {
      margin: 0.5em 0.2em 0.5em 0;
    }

    .refProfitContent {
      align-items: center;
      font-size: 1.475rem;
      font-weight: 700;
    }
  }
}

.font-black {
  color: #323232;
  font-weight: 400;
}

.grid {
  display: grid;
  grid-template-columns: 50% 50%;
  text-align: center;
  width: 100%;
  margin-top: 0.5rem;
  .grid-content {
    text-align: start;
    margin-left: 0.25rem;
    div:last-child {
      font-weight: 700;
    }
  }
  .grid-content:not(:last-child) {
    border-right-style: solid;
    border-right-color: #d2d2d2;
    border-right-width: 1px;
    margin-right: 0.25rem;
  }
}
.up {
  background-color: #d23650;
  color: #eeeeee;
}
.down {
  background: #70ae47;
  color: #eeeeee;
}
.fundRate {
  height: 24px;
  line-height: 24px;
  font-size: 1rem;
  font-weight: normal;
  padding: 0 5px;
  border-radius: 4px;
  color: #fff;
  margin-left: 10px;
  .fundRatePercent {
    margin: auto;
    padding: 0;
  }
}
</style>
