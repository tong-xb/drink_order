<template>
  <!-- 銀行 -->
  <CardAsset
    ref="cardRef"
    color="#77b3ee"
    :authorized="displayGroup.authorized"
    :asset-name="cardBottomAsset.assetName"
    :asset-sum-format="cardBottomAsset.assetSumFormat"
    :card-visible="displayGroup.displayBox"
    v-model:card-bottom-visible="displayGroup.displayGroupBottom"
    :card-bottom-list="cardBottomAsset.cardBottomList"
    @click="toCompanyDetail()"
  />
  <MockTestButton router-name="AssetView" />
</template>

<script setup>
import MockTestButton from '@/components/public_components/mock/MockTestButton.vue';
import CardAsset from '@/components/split_component/asset_overview/CardAsset.vue';

import { ref, onMounted, reactive, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useElementSize } from '@vueuse/core';
import { useMockStore } from '@/stores/mock';
import { useUserStore } from '@/stores/user';
import { useAssetsStore } from '@/stores/assets';

const mockStore = useMockStore();
const userStore = useUserStore();

const assetsStore = useAssetsStore();
const sumData = assetsStore.assetsObject.sumData;

const router = useRouter();

const cardRef = ref(null);
//取得卡片高度
const { height } = useElementSize(cardRef);
//偵測卡片高度
watch(height, (newHeight) => {
  console.log(newHeight);

  window.parent.postMessage(
    {
      type: 'change-height',
      fidoAuthorizationCode: 'ASSET_BANK',
      height: newHeight,
    },
    '*'
  );
});

//畫面display
const displayGroup = reactive({
  displayBox: false,
  displayLoading: true,
  authorized: false,
  displayGroupBottom: false,
});

//資產細節
const cardBottomAsset = reactive({
  assetName: '銀行資產',
  assetSum: computed(() => {
    return sumData.allAssetsMinusLiabilitiesInt;
  }),
  assetSumFormat: computed(() => {
    return `TWD ${sumData.allAssetsMinusLiabilities}`;
  }),
  cardBottomList: [
    {
      name: '總資產',
      type: 'number',
      number: computed(() => {
        return sumData.allAssetsInt;
      }),
      numberFormat: computed(() => {
        return sumData.allAssets;
      }),
    },
    {
      name: '總負債',
      type: 'number',
      number: computed(() => {
        return sumData.allLiabilitiesInt;
      }),
      numberFormat: computed(() => {
        return sumData.allLiabilities;
      }),
    },
  ],
});

//點擊至資產詳情
const toCompanyDetail = () => {
  console.log('type: asset-detail');
  const protocol = window.location.protocol;
  const host = window.location.host;
  const totalAssetsRouter = router.resolve({ name: 'TotalAssets' });
  const totalAssetsHref = totalAssetsRouter.href;

  const totalAssetsUrl = protocol + '//' + host + totalAssetsHref;
  console.log(totalAssetsUrl);

  window.parent.postMessage(
    {
      type: 'asset-detail',
      fidoAuthorizationCode: 'ASSET_BANK',
      url: totalAssetsUrl,
    },
    '*'
  );
};

onMounted(async () => {
  // await userStore.fetchOverviewInit({ data: userStore.appData });
  await userStore.fetchOverviewInit({ idNo: 'B101128965' });
  displayGroup.displayBox = true;
  displayGroup.displayLoading = false;
  if (mockStore.testVisible) {
    mockStore.fetchMockAssetsData(1);
  }
});
</script>

<style lang="scss" scoped></style>
