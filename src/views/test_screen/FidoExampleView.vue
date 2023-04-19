<template>
  <div class="header-container bg-color-endeavour">
    <div class="pl-2 flex-align-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="11.8" height="18.623" viewBox="0 0 11.8 18.623">
        <path
          d="M8015.548-6052.467l-8.883-7.9,3.7-3.292,5.182-4.608"
          transform="translate(-8005.16 6069.678)"
          fill="none"
          stroke="#fff"
          stroke-linecap="round"
          stroke-width="2"
        />
      </svg>
    </div>
    <div class="p-2 color-white font-size-18px">元大資產總覽</div>
    <div class="pr-2 flex-align-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18">
        <g transform="translate(-345.5 -13)">
          <path d="M20,0H0" transform="translate(345.5 14)" fill="none" stroke="#fff" stroke-width="2" />
          <line
            x1="20"
            transform="translate(345.5 30)"
            fill="none"
            stroke="#fff"
            stroke-linejoin="round"
            stroke-width="2"
          />
          <line
            x1="20"
            transform="translate(345.5 22)"
            fill="none"
            stroke="#fff"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </g>
      </svg>
    </div>
  </div>
  <div class="top-container color-dove-gray">
    <div class="flex">幣別:新台幣</div>
    <div class="flex-vh-center">
      <div>{{ time }}</div>
      <div class="w-1"></div>
      <div>更新</div>
      <div class="w-1"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14.018"
        viewBox="0 0 14 14.018"
        class="reload-time"
        @click="reloadAll()"
      >
        <path
          d="M7.009,0a7.009,7.009,0,1,0,4.976,11.985l-1.262-1.262A5.26,5.26,0,1,1,6.991,1.752a5.1,5.1,0,0,1,3.662,1.594l-1.91,1.91H14V0L11.915,2.085A6.97,6.97,0,0,0,6.991,0Z"
          fill="#707070"
        />
      </svg>
    </div>
  </div>

  <!-- 銀行 -->
  <div class="container-to-box">
    <div class="box">
      <CardAsset
        color="#77b3ee"
        :authorized="displayGroup.authorized1"
        :asset-name="cardBottomAsset.assetName1"
        :asset-sum-format="cardBottomAsset.assetSumFormat1"
        :card-visible="displayGroup.displayBox"
        v-model:card-bottom-visible="displayGroup.displayGroupBottom1"
        :card-bottom-list="cardBottomAsset.cardBottomList1"
        @click="toCompanyDetail(1)"
      />
    </div>
  </div>
  <!-- 證券 -->
  <div class="container-to-box">
    <div class="box">
      <CardAsset
        color="#94A4BB"
        :authorized="displayGroup.authorized2"
        :asset-name="cardBottomAsset.assetName2"
        :asset-sum-format="cardBottomAsset.assetSumFormat2"
        :card-visible="displayGroup.displayBox"
        v-model:card-bottom-visible="displayGroup.displayGroupBottom2"
        :card-bottom-list="cardBottomAsset.cardBottomList2"
        @click="toCompanyDetail(2)"
      />
    </div>
  </div>
  <!-- 期貨 -->
  <div class="container-to-box">
    <div class="box">
      <CardAsset
        color="#F26F28"
        :authorized="displayGroup.authorized3"
        :asset-name="cardBottomAsset.assetName3"
        :asset-sum-format="cardBottomAsset.assetSumFormat3"
        :card-visible="displayGroup.displayBox"
        v-model:card-bottom-visible="displayGroup.displayGroupBottom3"
        :card-bottom-list="cardBottomAsset.cardBottomList3"
        @click="toCompanyDetail(3)"
      />
    </div>
  </div>
  <!-- 人壽投資型保單 -->
  <div class="container-to-box">
    <div class="box">
      <CardAsset
        color="#F5BB00"
        :authorized="displayGroup.authorized4"
        :asset-name="cardBottomAsset.assetName4"
        :asset-sum-format="cardBottomAsset.assetSumFormat4"
        :card-visible="displayGroup.displayBox"
        v-model:card-bottom-visible="displayGroup.displayGroupBottom4"
        :card-bottom-list="cardBottomAsset.cardBottomList4"
        @click="toCompanyDetail(4)"
      />
    </div>
  </div>
  <!-- 投信 -->
  <div class="container-to-box">
    <div class="box">
      <CardAsset
        color="#C3B893"
        :authorized="displayGroup.authorized5"
        :asset-name="cardBottomAsset.assetName5"
        :asset-sum-format="cardBottomAsset.assetSumFormat5"
        :card-visible="displayGroup.displayBox"
        v-model:card-bottom-visible="displayGroup.displayGroupBottom5"
        :card-bottom-list="cardBottomAsset.cardBottomList5"
        @click="toCompanyDetail(5)"
      />
    </div>
  </div>
  <!-- <button @click="openModal()">測試modal</button> -->

  <!-- The Modal -->
  <!-- <BaseModal v-model:modal-visible="modalVisible">
    <template #default>
      <div class="flex-vh-center font-size-20px color-endeavour font-black">投資型保單帳戶價值</div>
      <ul class="investment-ul">
        <li>僅呈現投資型保單之投資部位</li>
        <li>僅呈現您為要保人身份的投資型保單資料</li>
        <li>投資型保單帳戶價值未扣除解約費用</li>
        <li>如需檢閱計算過程請至元大人壽保戶園地查詢</li>
      </ul>
    </template>

    <template #footer>
      <div class="flex-vh-center">
        <button class="investment-close" type="button" @click="closeModal()">關閉</button>
      </div>
    </template>
  </BaseModal> -->
</template>

<script setup>
import CardAsset from '@/components/split_component/asset_overview/CardAsset.vue';
// import BaseModal from '@/components/public_components/modal_popup/BaseModal.vue';

import { ref, reactive, computed } from 'vue';
import { formatDate } from '@/common/method_common/formatDate.js';
import { formatTWCurrency } from '@/common/method_common/formatPrice.js';

// const modalVisible = ref(false);

// const openModal = () => {
//   modalVisible.value = true;
// };

// const closeModal = () => {
//   modalVisible.value = false;
// };

//畫面display
const displayGroup = reactive({
  displayBox: false,
  displayLoading: true,
  authorized1: true,
  authorized2: false,
  authorized3: true,
  authorized4: true,
  authorized5: true,
  displayGroupBottom1: false,
  displayGroupBottom2: false,
  displayGroupBottom3: false,
  displayGroupBottom4: false,
  displayGroupBottom5: false,
});

//資產細節
const cardBottomAsset = reactive({
  assetName1: '銀行資產',
  assetSum1: '101010',
  assetSumFormat1: computed(() => {
    return 'TWD ' + formatTWCurrency(cardBottomAsset.assetSum1);
  }),
  cardBottomList1: [
    {
      name: '總資產',
      type: 'number',
      number: '2546220',
      numberFormat: computed(() => {
        return 'TWD ' + formatTWCurrency(cardBottomAsset.cardBottomList1[0].number);
      }),
    },
    {
      name: '總負債',
      type: 'number',
      number: 503151,
      numberFormat: computed(() => {
        return 'TWD ' + formatTWCurrency(cardBottomAsset.cardBottomList1[1].number);
      }),
    },
  ],
  assetName2: '證券資產',
  assetSum2: '201010',
  assetSumFormat2: computed(() => {
    return 'TWD ' + formatTWCurrency(cardBottomAsset.assetSum2);
  }),
  cardBottomList2: [
    {
      name: '未實現損益',
      type: 'number',
      number: '1530232',
      numberFormat: computed({
        get() {
          return 'TWD ' + formatTWCurrency(cardBottomAsset.cardBottomList2[0].number);
        },
        set(newValue) {
          cardBottomAsset.cardBottomList2[0].number = newValue;
        },
      }),
    },
  ],
  assetName3: '期貨資產',
  assetSum3: '301010',
  assetSumFormat3: computed(() => {
    return 'TWD ' + formatTWCurrency(cardBottomAsset.assetSum3);
  }),
  cardBottomList3: [
    {
      name: '未平倉損益',
      type: 'number',
      number: '3451153',
      numberFormat: computed(() => {
        return 'TWD ' + formatTWCurrency(cardBottomAsset.cardBottomList3[0].number);
      }),
    },
    {
      name: '可運用保證金',
      type: 'number',
      number: 451561,
      numberFormat: computed(() => {
        return 'TWD ' + formatTWCurrency(cardBottomAsset.cardBottomList3[1].number);
      }),
    },
  ],
  assetName4: '人壽投資型保單<br />帳戶價值',
  assetSum4: '401010',
  assetSumFormat4: computed(() => {
    return 'TWD ' + formatTWCurrency(cardBottomAsset.assetSum4);
  }),
  cardBottomList4: [
    {
      name: '參考總損益',
      type: 'number',
      number: '541562302',
      numberFormat: computed(() => {
        return 'TWD ' + formatTWCurrency(cardBottomAsset.cardBottomList4[0].number);
      }),
    },
    {
      name: '參考投資報酬率',
      type: 'percentage',
      number: 53,
      numberFormat: computed(() => {
        return 'TWD ' + formatTWCurrency(cardBottomAsset.cardBottomList4[1].number);
      }),
      formattedPercentage: computed(() => {
        let num = parseFloat(cardBottomAsset.cardBottomList4[1].number);
        if (isNaN(num)) return '輸入的不是數字';
        num = num.toFixed(2);
        return `${num}%`;
      }),
      percentageColor: computed(() => {
        let num = parseFloat(cardBottomAsset.cardBottomList4[1].number);
        if (isNaN(num)) return 'black';
        return num >= 0 ? '#13887b' : '#e53d00';
      }),
    },
  ],
  assetName5: '投信資產',
  assetSum5: '501010',
  assetSumFormat5: computed(() => {
    return 'TWD ' + formatTWCurrency(cardBottomAsset.assetSum5);
  }),
  cardBottomList5: [
    {
      name: '總成本',
      type: 'number',
      number: '256023',
      numberFormat: computed(() => {
        return 'TWD ' + formatTWCurrency(cardBottomAsset.cardBottomList5[0].number);
      }),
    },
    {
      name: '未實現損益',
      type: 'number',
      number: 1246,
      numberFormat: computed(() => {
        return 'TWD ' + formatTWCurrency(cardBottomAsset.cardBottomList5[1].number);
      }),
    },
    {
      name: '報酬率',
      type: 'percentage',
      number: '-12.11',
      numberFormat: computed(() => {
        return 'TWD ' + formatTWCurrency(cardBottomAsset.cardBottomList5[2].number);
      }),
      formattedPercentage: computed(() => {
        let num = parseFloat(cardBottomAsset.cardBottomList5[2].number);
        if (isNaN(num)) return '輸入的不是數字';
        num = num.toFixed(2);
        return `${num}%`;
      }),
      percentageColor: computed(() => {
        let num = parseFloat(cardBottomAsset.cardBottomList5[2].number);
        if (isNaN(num)) return 'black';
        return num >= 0 ? '#13887b' : '#e53d00';
      }),
    },
  ],
});

// //初始時間
const time = ref(formatDate(new Date(), 'YYYY/MM/DD HH:mm'));

const refreshLoading = () => {
  displayGroup.displayBox = false;
  displayGroup.displayLoading = true;
  displayGroup.displayGroupBottom1 = false;
  displayGroup.displayGroupBottom2 = false;
  displayGroup.displayGroupBottom3 = false;
  displayGroup.displayGroupBottom4 = false;
  displayGroup.displayGroupBottom5 = false;

  window.setTimeout(() => {
    time.value = formatDate(new Date(), 'YYYY/MM/DD HH:mm');
    displayGroup.displayBox = true;
    displayGroup.displayLoading = false;
  }, 2000);
};

refreshLoading();

const reloadAll = () => {
  refreshLoading();
};

//點擊至資產詳情
const toCompanyDetail = (number) => {
  if (displayGroup['authorized' + number] === false) {
    switch (number) {
      case 1:
        window.alert('我要到銀行資產詳情');
        break;
      case 2:
        window.alert('我要到證券資產詳情');
        break;
      case 3:
        window.alert('我要到期貨資產詳情');
        break;
      case 4:
        window.alert('我要到人壽投資型保單帳戶價值詳情');
        break;
      case 5:
        window.alert('我要到投信資產詳情');
        break;
      default:
        window.alert('錯誤頁');
    }
  }
};
</script>

<style lang="scss" scoped>
.header-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.top-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 1.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

.container-to-box {
  padding: 1rem;
  .box {
    display: flex;
    align-items: center;
    overflow: hidden;
    border-radius: 0.375rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }
}

.reload-time {
  cursor: pointer;
  transform: rotate(360deg);
  transition: 0.5s;
}

.reload-time:active {
  transform: rotate(0deg);
  transition: 0s;
}

.investment-ul {
  color: #005bac;
  font-weight: 600;
  padding-inline-start: 20px;
}

.investment-close {
  width: 100%;
  background-color: #005bac;
  font-size: 20px;
  border: 0px;
  color: #ffffff;
  border-radius: 0.25rem;
  padding-top: 6px;
  padding-bottom: 7px;
}
</style>
