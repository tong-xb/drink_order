<template>
  <div>
    <!-- Mock test -->
    <div v-if="mockStore.testVisible">
      <button @click="getMockData(1)">測試資料1</button>
      <button @click="getMockData(2)">測試資料2</button>
    </div>
    <!-- 明細內容 -->
    <div class="container">
      <div class="box">
        <div class="title">帳號</div>
        <strong>{{ depositStore.twDetailAccNo }}</strong>
      </div>
      <div class="box">
        <div class="title">可用餘額</div>
        <div>
          <strong class="font_orange">{{ formatTWCurrency(fcyBalance, 0, 'currency') }}</strong>
          <span class="font_gray">&nbsp;元</span>
        </div>
      </div>
      <!-- 搜尋按鈕 -->
      <div class="box">
        <div class="btnRadio">
          <div v-for="item in tabBtns" :key="item.value" class="radioItem">
            <input
              v-model="currentSearchedMonth"
              :id="item.value"
              type="radio"
              name="searchMonth"
              :value="item.value"
              style="display: none"
            />
            <label :for="item.value" @click="filterDepositDetailData(item.value)" role="radio">{{ item.name }}</label>
          </div>
        </div>
        <div class="date-range-period">{{ searchStartDate }} ~ {{ searchEndDate }}</div>
      </div>
      <!-- 搜尋結果 -->
      <div v-if="searchedResult.data?.length > 0" class="box">
        <div
          :class="cardDateTitle === dayjs(item.postDate).format('YYYYMM') ? 'search-result sub' : 'search-result'"
          v-for="(item, index) in sortDatesSearchedResult.data"
          :key="index"
        >
          <div class="search-date">
            {{ formatPosteDate(item.postDate) }}
          </div>
          <CardDetails :depositDataItem="item" />
        </div>
      </div>
      <div v-else class="search-no-result">查無資料</div>
      <!-- 注意事項 -->
      <div class="memo box">
        <div class="title">注意事項</div>
        <NotificationMessage padding="2px 2px" color="#00000">
          <ol class="num">
            <li>本交易明細資料，不得做為存款餘額證明或往來憑證之用。</li>
            <li>
              新申請網銀服務者，申請當日僅提供查詢最近一個月之交易明細，如要查詢六個月內之交易明細，請於次一營業日查詢。
            </li>
            <li>若有執行帳務交易之需求，請開啟元大行動銀行APP。</li>
          </ol>
        </NotificationMessage>
      </div>
    </div>
    <PageEndGap />
  </div>
</template>
<script setup>
import PageEndGap from '@/components/public_components/layout/PageEndGap.vue';
import NotificationMessage from '@/components/public_components/notification/NotificationMessage.vue';
import CardDetails from '@/components/split_component/tw_deposit/CardDetails.vue';
import dayjs from 'dayjs';
import { useMockStore } from '@/stores/mock';
import { useCommonStore } from '@/stores/common';
import { formatTWCurrency } from '@/common/method_common/formatPrice.js';
import { formatDate } from '@/common/method_common/formatDate.js';
import { ref, reactive, computed, onMounted } from 'vue';
import { useDepositStore } from '@/stores/twDeposit';
import { useRouter } from 'vue-router';

const router = useRouter();
const common = useCommonStore();
const depositStore = useDepositStore();
const mockStore = useMockStore();

const searchedResult = reactive({
  data: [],
});
const sortDatesSearchedResult = reactive({
  data: [],
});

const fcyBalance = ref(0);

const currentSearchedMonth = ref('1m');
const tabBtns = [
  {
    name: '一個月',
    value: '1m',
  },
  {
    name: '三個月',
    value: '3m',
  },
];

onMounted(async () => {
  common.headerTitle = '臺幣活存交易明細查詢';

  if (!depositStore.twDetailAccNo) {
    router.push({ name: 'TWCheckCurrentDeposit' });
  }

  const body = {
    acctNo: depositStore.twDetailAccNo,
    startDate: searchStartDate.value,
    endDate: searchEndDate.value,
    searchPeriod: currentSearchedMonth.value,
  };
  await fetchDepositDetailData(body);
});

/**
 * @description get API
 * @param {*} data
 */
const fetchDepositDetailData = async (data) => {
  searchedResult.data = [];
  try {
    await depositStore.fetchDepositDetailData(data);
    searchedResult.data = depositStore.depositObject.TwdAcctTxnDetailInfoList;
    sortDatesSearchedResult.data = sortDates(searchedResult.data);
    getFycBalance();
  } catch (error) {
    console.log(error);
    if (mockStore.testVisible) {
      getMockData(1);
    }
  }
};

/**
 * @description sort date
 * @param {*} searchedData api 明細資料
 */
const sortDates = (searchedData = []) => {
  const sortedData = [...searchedData];
  sortedData.sort((a, b) => {
    const dateA = new Date(a.postDate);
    const dateB = new Date(b.postDate);
    return dateB - dateA;
  });
  return sortedData;
};

/**
 * @description 取得可用餘額
 */
const getFycBalance = () => {
  const [matchedItem] = depositStore.depositObject.deposit.filter((item) => item.acctNo === depositStore.twDetailAccNo);
  fcyBalance.value = matchedItem ? parseFloat(matchedItem.fycBalance) : 0;
};

/**
 * @description 點擊觸發搜尋
 */
const filterDepositDetailData = async (currentVal) => {
  cardDateTitle = '';
  if (currentVal === currentSearchedMonth.value) return;
  currentSearchedMonth.value = currentVal;
  const body = {
    acctNo: depositStore.twDetailAccNo,
    startDate: searchStartDate.value,
    endDate: searchEndDate.value,
    searchPeriod: currentVal, //查詢區間代碼 1d 1w 1m custom
  };
  await fetchDepositDetailData(body);
};

/**
 * @description 搜尋起始日
 */
const dt = new Date();
const searchEndDate = computed(() => {
  return formatDate(dt, 'YYYY/MM/DD');
});

/**
 * @description 搜尋結束日
 */
const searchStartDate = computed(() => {
  let endDate = '';
  const lastDate = new Date(dt.getFullYear(), dt.getMonth() + 1, 0); //當月最後一天
  switch (currentSearchedMonth.value) {
    case '1m':
      //如果迄日為當月最後一天,則起日為當月第一天
      dt.getDate() === lastDate.getDate()
        ? (endDate = dayjs(dt).date(1).format('YYYY/MM/DD'))
        : (endDate = dayjs(dt).subtract(1, 'month').format('YYYY/MM/DD'));
      break;
    case '3m':
      //如果迄日為當月最後一天,則起日為前三月第一天
      dt.getDate() === lastDate.getDate()
        ? (endDate = dayjs(dt).subtract(2, 'month').date(1).format('YYYY/MM/DD'))
        : (endDate = dayjs(dt).subtract(3, 'month').format('YYYY/MM/DD'));
      break;
    default:
      endDate = dayjs(dt).subtract(1, 'month').format('YYYY/MM/DD');
      break;
  }
  return endDate;
});

/**
 * @description 判斷日期顯示
 * @param {*} date postDate
 */
let cardDateTitle = '';
const formatPosteDate = (date) => {
  const year = dayjs(date).year();
  const month = dayjs(date).month() + 1;
  if (cardDateTitle === dayjs(date).format('YYYYMM')) {
    return '';
  } else {
    cardDateTitle = dayjs(date).format('YYYYMM');
    return `${year} 年 ${month} 月`;
  }
};

/**
 * @description mock 測試資料
 * @param {*} num
 */
const getMockData = async (num) => {
  searchedResult.data = await mockStore.fetchMockTwdAccDataDetail(num);
  sortDatesSearchedResult.data = sortDates(searchedResult.data);
};
</script>
<style lang="scss" scoped>
.container {
  padding: 0 16px;
}
.box {
  margin: 16px auto 0;
}
.title {
  font-size: 1em;
  line-height: 1.8em;
  color: #959595;
}

.date-range-period {
  font-weight: 600;
  margin-top: 8px;
}
.search-no-result {
  height: 4em;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hidden {
  display: none;
}

.memo {
  .title {
    margin-bottom: 8px;
  }
}
ol.num {
  padding: 0 0 0 24px;
  li {
    margin-bottom: 8px;
  }
}

.btnRadio {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: auto;
  margin-top: 5px;
  .radioItem {
    margin-right: 5px;
    margin-top: 8px;
    margin-bottom: 8px;
    label {
      padding: 5px;
      background-color: #f0f0f0;
      color: #959595;
      border-radius: 5px;
      cursor: pointer;
    }
    input:checked + label {
      background-color: #e2f1fe;
      color: #0856a0;
    }
  }
}

.font_orange {
  color: rgb(242, 101, 34);
}
.font_gray {
  color: #959595;
}

.search-result {
  padding-top: 15px;
  &.sub {
    border-top: none;
    padding-top: 0px;
    .search-date {
      display: none;
    }
  }
  .search-date {
    border-top: 1px solid #dbdbdb;
    font-weight: 700;
    color: #002e73;
    padding-top: 15px;
    padding-left: 15px;
  }
}
</style>
