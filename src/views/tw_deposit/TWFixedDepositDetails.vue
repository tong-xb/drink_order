<template>
  <div>
    <!-- Mock test -->
    <div v-if="mockStore.testVisible">
      <button @click="getMockData(1)">測試資料1</button>
      <button @click="getMockData(2)">測試資料2</button>
    </div>
    <!-- 搜尋內容 -->
    <div v-if="searchedResult.data" class="fixed-deposit-container">
      <div class="item-list">
        <div class="txt" data-txt="lblCDAccount">定存帳號</div>
        <div class="value">{{ getBranchName() }} - {{ depositStore.twFixedDetailAccNo }}</div>
      </div>
      <div class="item-list">
        <div class="txt">定存金額</div>
        <div class="value">{{ formatTWCurrency(searchedResult.data.depositAmount, 0, 'decimal') }} 元</div>
      </div>
      <div class="item-list">
        <div class="txt">定存利率</div>
        <div class="value">{{ formatUSCurrency(searchedResult.data.rate, 3, 'decimal') }}%</div>
      </div>
      <div class="item-list">
        <div class="txt">利率種類</div>
        <div class="value">{{ formatRateType(searchedResult.data.rateType) }}</div>
      </div>
      <div class="item-list">
        <div class="txt">定存存期</div>
        <div class="value">{{ formatTWCurrency(searchedResult.data.depositPeriod) }} 個月</div>
      </div>
      <div class="item-list">
        <div class="txt">定存起存日</div>
        <div class="value">{{ searchedResult.data.depositStartDate }}</div>
      </div>
      <div class="item-list">
        <div class="txt">定存到期日</div>
        <div class="value">{{ searchedResult.data.depositEndDate }}</div>
      </div>
      <div class="item-list">
        <div class="txt">領息周期</div>
        <div class="value">{{ formatInterestPeriod(searchedResult.data.interestPeriod) }}</div>
      </div>
      <div class="item-list">
        <div class="txt">領息方式</div>
        <div class="value">{{ formatInterestMethod(searchedResult.data.interestMethod) }}</div>
      </div>
      <div class="item-list">
        <div class="txt">轉入帳號</div>
        <div class="value">{{ searchedResult.data.acctNo }}</div>
      </div>
      <div class="item-list">
        <div class="txt">到期是否續存</div>
        <div class="value">{{ formatDepositRolloverType(searchedResult.data.depositRolloverType) }}</div>
      </div>
      <div class="item-list note">
        <div class="txt">注意事項</div>
        <div class="value">若有執行帳務交易之需求，請開啟元大行動銀行APP。</div>
      </div>
    </div>
    <PageEndGap />
  </div>
</template>
<script setup>
import PageEndGap from '@/components/public_components/layout/PageEndGap.vue';
import { formatUSCurrency, formatTWCurrency } from '@/common/method_common/formatPrice.js';
import { useCommonStore } from '@/stores/common';
import { useMockStore } from '@/stores/mock';
import { reactive, onMounted } from 'vue';
import { useDepositStore } from '@/stores/twDeposit';
import { useRouter } from 'vue-router';

const router = useRouter();
const common = useCommonStore();
const depositStore = useDepositStore();
const mockStore = useMockStore();

const searchedResult = reactive({
  data: [],
});

onMounted(async () => {
  common.headerTitle = '臺幣定存查詢';

  if (!depositStore.twFixedDetailAccNo) {
    router.push({ name: 'TWFixedDeposit' });
  }

  const body = {
    acctNo: depositStore.twFixedDetailAccNo,
  };
  try {
    await depositStore.fetchFixedDepositDetailData(body);
    searchedResult.data = depositStore.depositObject.twdAcctInfo;
  } catch (error) {
    console.log(error);
    if (mockStore.testVisible) {
      getMockData(1);
    }
  }
});

/**
 * @description 取得分行名稱
 */
const getBranchName = () => {
  if (!depositStore.twFixedDetailAccNo || depositStore.depositObject.fixedDeposit.length === 0) return '';
  const [{ branchName }] = depositStore.depositObject.fixedDeposit.filter((item) => {
    if (item.acctNo === depositStore.twFixedDetailAccNo) {
      return item.branchName;
    }
    return '';
  });
  return branchName;
};

/**
 * @description 利率類別文字
 * @param {String} rateType
 */
const formatRateType = (rateType) => {
  let formatString = '';
  switch (rateType) {
    case 'L':
      formatString = '機動利率';
      break;
    case 'F':
      formatString = '固定利率';
      break;
    default:
      formatString = rateType;
      break;
  }
  return formatString;
};

/**
 * @description 取得領息周期
 * @param {String} interestPeriod
 */
const formatInterestPeriod = (interestPeriod) => {
  let formatString = '';
  switch (interestPeriod) {
    case 'M':
      formatString = '到期領息';
      break;
    case '1A':
      formatString = '每月領息';
      break;
    case 'YA':
      formatString = '每年領息';
      break;
    default:
      formatString = interestPeriod;
      break;
  }
  return formatString;
};

/**
 * @description 取得領息方式
 * @param {String} interestMethod
 */
const formatInterestMethod = (interestMethod) => {
  let formatString = '';
  switch (interestMethod) {
    case 'R':
      formatString = '滾入本金';
      break;
    case 'T':
      formatString = '自動轉息';
      break;
    case 'I':
      formatString = '臨櫃領息';
      break;
    default:
      formatString = interestMethod;
      break;
  }
  return formatString;
};

/**
 * @description 取得到期是否續存
 * @param {String} depositRolloverType
 */
const formatDepositRolloverType = (depositRolloverType) => {
  let formatString = '';
  switch (depositRolloverType) {
    case 'R':
      formatString = '到期本金續存';
      break;
    case 'N':
      formatString = '不自動續存';
      break;
    default:
      formatString = depositRolloverType;
      break;
  }
  return formatString;
};

/**
 * @description mock 測試資料
 * @param {*} num
 */
const getMockData = async (num) => {
  searchedResult.data = await mockStore.fetchMockTwdFixedAccDataDetail(num);
};
</script>
<style lang="scss" scoped>
.fixed-deposit-container {
  padding: 16px;
}
.item-list {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 10px auto 0;
  .txt {
    width: 7em;
    font-size: 1em;
    color: #959595;
  }
  .value {
    width: calc(100% - 7em);
    align-self: center;
    font-weight: 500;
    color: #014099;
  }
  &.note {
    flex-wrap: wrap;
    margin-top: 64px;
    & > div {
      width: 100%;
    }
    .txt {
      font-size: 0.9em;
    }
    .value {
      margin-top: 0.3em;
      font-size: 0.9em;
      color: #000000;
    }
  }
}
</style>
