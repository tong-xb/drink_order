<template>
  <div class="layout">
    <div class="layout-header">
      <header>
        <nav>
          <router-link :to="{ name: 'TotalAssets' }">總資產</router-link>
          <router-link :to="{ name: 'TotalLiability' }">總負債</router-link>
        </nav>

        <div class="asset">
          <p>{{ totalAmountWording }}</p>
          <p>{{ totalAmount }}</p>
        </div>
      </header>
    </div>
    <main class="layout-content">
      <div class="top-content color-dove-gray">
        <div>幣別:新台幣</div>
        <div class="flex-vh-center">
          <div>{{ time }}</div>
          <div class="w-1"></div>
          <div>更新</div>
        </div>
      </div>
      <div ref="getEchartDOM" :style="{ width: '100%', height: '490px' }" class="chart-wrapper"></div>
      <!-- <div style="height: 80px">
        <OvalDivButton
          wording="人氣基金排行"
          background="linear-gradient(to right, #00aeef 0%, #0856a0 100%)"
          display="block"
          onclick="window.open('https://yuantabank.moneydj.com/', '_blank')"
        />
        <OvalDivButton
          wording="我想參加免費理財說明會"
          background="linear-gradient(to right, #00aeef 0%, #0856a0 100%)"
          width="210px"
          display="block"
          onclick="window.open('https://www.yuantabank.com.tw/bank/service/customer/application/list.do', '_blank')"
        />
      </div> -->
      <MockTestButton router-name="AssetsOverview" />
      <router-view />
      <!-- 注意事項 -->
      <div class="note">
        <div @click="openNoteModal()" class="note-text">
          <IconErrorMark iconSize="20" />
          <p>注意事項</p>
        </div>
      </div>
      <NoteBaseModal v-model:modal-visible="showNoteBaseModal" headerTitle="注意事項">
        <template #body>
          <div>
            <ol>
              本服務之資產與負債總覽資訊僅提供整合性資產配置分析參考，實際金額以本行系統為準。
              <li>
                上述金額為折算新台幣之參考現值，相關現值估算方式，請參各產品注意事項；若欲查詢最新資訊，請至各產品總覽服務或交易明細查詢。
              </li>
              <li>
                投資項目之保險部分包含投資型及傳統型保險商品之保單累計保費，不代表保單之實際價值或解約金，詳細情形請依保險公司公告為依據。
              </li>
              <li>
                結構型商品(DCI/SI)的資產金額以投資金額折算為新台幣；境外結構型商品(連動債)資產，若因發行機構未報價將不包含於上述金額。
              </li>
              <li>
                上述參考現值金額為減項者，如信用卡溢繳款項，則該金額不列為信用卡項下之減項，該產品項目以0列示，不顯示於資產負債之參考比例計算。
              </li>
              <li>
                「元大商業銀行貨幣市場共同信託基金」經106年2月23日受益人書面決議同意終止本基金，自民國106年3月15日起停止網路銀行申購交易服務，請逕洽各營業單位臨櫃辦理(本基金於主管機關核准函送達本行之次一營業日起全面停止申購交易，屆時將另行公告)，本基金庫存資料請至基金/信託&gt;貨幣市場共同信託基金相關功能查詢。
              </li>
              <li>查詢期間如遇特定金錢信託商品贖回尚未分配入帳，可能有在途款項而產生資產總覽之落差。</li>
            </ol>
          </div>
        </template>
      </NoteBaseModal>
      <PageEndGap />
    </main>
  </div>
</template>

<script setup>
import IconErrorMark from '@/components/icons/IconErrorMark.vue';
import PageEndGap from '@/components/public_components/layout/PageEndGap.vue';
import MockTestButton from '@/components/public_components/mock/MockTestButton.vue';
// import OvalDivButton from '@/components/public_components/button/OvalDivButton.vue';
import NoteBaseModal from '@/components/public_components/modal_popup/NoteBaseModal.vue';

import { onMounted, ref, reactive, watch } from 'vue';
import { useEventListener } from '@vueuse/core';
import { useRoute } from 'vue-router';
import { formatDate } from '@/common/method_common/formatDate.js';
import { useAssetsPie } from '@/common/echarts/usePie.js';
import { useMockStore } from '@/stores/mock';
import { useAssetsStore } from '@/stores/assets';

const mockStore = useMockStore();

const assetsStore = useAssetsStore();
const sumData = assetsStore.assetsObject.sumData;
const liabilitiesData = assetsStore.assetsObject.liabilitiesData;
const percentageData = assetsStore.assetsObject.percentageData;

// 初始時間
const time = ref(formatDate(new Date(), 'YYYY/MM/DD HH:mm'));

const getEchartDOM = ref(null);
//chart
let myChart = null;
//chart 封裝Option function
let toSetOption = null;
//chart Option 數據
const chartOption = reactive({
  legend_data: [],
  series_data: [],
});

const route = useRoute();

const currentRouteName = ref('');
currentRouteName.value = route.name;

//總金額
const totalAmountWording = ref('');
const totalAmount = ref('');
const changeTotalAmount = (routeName) => {
  if (routeName === 'TotalAssets') {
    totalAmountWording.value = '資產投資金額(約當新台幣)';
    totalAmount.value = sumData.allAssetsCurrency;
  } else if (routeName === 'TotalLiability') {
    totalAmountWording.value = '負債金額(約當新台幣)';
    totalAmount.value = sumData.allLiabilitiesCurrency;
  }
};

// note Modal
const showNoteBaseModal = ref(false);
const openNoteModal = () => {
  showNoteBaseModal.value = true;
};

//偵測目前route name
watch(
  () => route.name,
  (newName) => {
    currentRouteName.value = newName;

    changeTotalAmount(currentRouteName.value);
  }
);

onMounted(async () => {
  initChart();
  myChart.showLoading();
  try {
    await assetsStore.fetchAssetsData();

    changeTotalAmount(currentRouteName.value);
    myChart.hideLoading();
    changeChart();
  } catch (error) {
    console.log(error);
    if (mockStore.testVisible) {
      mockStore.fetchMockAssetsData(1);
    }
  }
});

//資產總覽圖表初始化
const initChart = () => {
  const { pieChart, setOption, resize } = useAssetsPie(getEchartDOM.value);
  myChart = pieChart;
  toSetOption = setOption;

  //先塞空值
  toSetOption([], []);

  useEventListener(window, 'resize', () => {
    resize();
  });
};

//更新chart數據
const changeChart = () => {
  chartOption.legend_data = [
    { value: sumData.allAssetsInt, percent: percentageData.allAssetsPercentFormat, name: '總資產' },
    { value: sumData.allLiabilitiesInt, percent: percentageData.allLiabilitiesPercentFormat, name: '總負債' },
    { value: sumData.allDepositInt, percent: percentageData.allDepositPercentFormat, name: '存款' },
    { value: sumData.allInvestInt, percent: percentageData.allInvestPercentFormat, name: '投資' },
    { value: sumData.allLoanInt, percent: percentageData.allLoanPercentFormat, name: '貸款' },
    { value: liabilitiesData.creditTotalInt, percent: percentageData.creditTotalPercentFormat, name: '信用卡' },
    { value: liabilitiesData.overdraftTotalInt, percent: percentageData.overdraftTotalPercentFormat, name: '透支' },
  ];

  chartOption.series_data = [
    { value: sumData.allAssetsInt, name: '總資產', itemStyle: { color: '#CFD8DC' } },
    { value: sumData.allLiabilitiesInt, name: '總負債', itemStyle: { color: '#EFEBE9' } },
    { value: sumData.allDepositInt, name: '存款', itemStyle: { color: '#039BE5' } },
    { value: sumData.allInvestInt, name: '投資', itemStyle: { color: '#075094' } },
    { value: sumData.allLoanInt, name: '貸款', itemStyle: { color: '#88D498' } },
    { value: liabilitiesData.creditTotalInt, name: '信用卡', itemStyle: { color: '#EB6100' } },
    { value: liabilitiesData.overdraftTotalInt, name: '透支', itemStyle: { color: '#FFD54F' } },
  ];

  toSetOption(chartOption.legend_data, chartOption.series_data);
};

//偵測data是否有變化去更新echarts
watch(
  () => assetsStore.assetsObject,
  () => {
    changeTotalAmount(currentRouteName.value);
    changeChart();
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  overflow: hidden;
  .layout-header {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    > header {
      width: 90%;
      > nav {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0px;
        > a {
          display: block;
          color: black;
          width: 100%;
          text-align: center;
          padding: 5px 0px;
          text-decoration: none;
          border: #039be5 1px solid;
          border-radius: 0.15rem;
          &:hover {
            background-color: #ddd;
            color: black;
          }
          &.router-link-exact-active {
            background-color: #039be5;
            color: white;
          }
        }
      }
      .asset {
        width: 92%;
        height: 55px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        align-self: auto;
        border-bottom: #f3f3f3 2px solid;
      }
    }
  }

  .layout-content {
    height: calc(100vh - 102.4px);
    overflow: auto;
    .top-content {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-top: 1.5rem;
      padding-left: 1rem;
      padding-right: 1rem;
    }
    .divButton {
      text-align: center;
      background: linear-gradient(to right, #00aeef 0%, #0856a0 100%);
      line-height: 1.8em;
      display: block;
      margin: 0 auto;
      margin-top: 10px;
      color: white;
      width: 128px;
      height: 1.8em;
      border-radius: 50px;
      font-weight: bold;
    }
    .note {
      margin-top: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      .note-text {
        display: flex;
        align-items: center;
      }
      p {
        margin-left: 2px;
        font-size: 1rem;
        color: var(--yt-c-endeavour);
      }
    }
  }
}

.chart-wrapper :deep(div) {
  -webkit-tap-highlight-color: transparent;
}
</style>
