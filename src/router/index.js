import { createRouter, createWebHistory } from 'vue-router';

export const routes = [
  {
    path: '/',
    name: 'home',
    meta: { showHeader: false },
    redirect: { name: 'HomeView' },
  },
  {
    path: '/index.html',
    name: 'index',
    meta: { showHeader: false },
    redirect: { name: 'HomeView' },
  },
  {
    path: '/login-view',
    name: 'LoginView', //order system登入頁
    meta: { showHeader: false },
    component: () => import('../views/order_system/LoginView.vue'),
  },
  {
    path: '/home-view',
    name: 'HomeView', //order system
    meta: { showHeader: true },
    component: () => import('../views/order_system/HomeView.vue'),
  },
  {
    path: '/my-order-view',
    name: 'MyOrderView', //order system
    meta: { showHeader: true },
    component: () => import('../views/order_system/MyOrderView.vue'),
  },
  {
    path: '/my-account-view',
    name: 'MyAccountView', //order system
    meta: { showHeader: true },
    component: () => import('../views/order_system/MyAccountView.vue'),
  },
  {
    path: '/fido-example',
    name: 'FidoExampleView', //集團資產測試頁
    meta: { showHeader: false },
    component: () => import('../views/test_screen/FidoExampleView.vue'),
  },
  {
    path: '/test-workcode',
    name: 'TestWorkCode', //workcode 測試頁
    meta: { showHeader: false },
    component: () => import('../views/test_screen/TestWorkCode.vue'),
  },
  {
    path: '/asset-view',
    name: 'AssetView', //集團資產頁
    meta: { showHeader: false, skipLoading: true },
    component: () => import('../views/asset_overview/AssetView.vue'),
  },
  {
    path: '/assets-overview',
    name: 'AssetsOverview', //銀行資產總覽
    redirect: { name: 'TotalAssets' },
    meta: { showHeader: false },
    component: () => import('../views/asset_overview/AssetsOverview.vue'),
    children: [
      {
        path: '010',
        name: 'TotalAssets', //總資產
        component: () => import('../views/asset_overview/TotalAssets.vue'),
      },
      {
        path: '020',
        name: 'TotalLiability', //總負債
        component: () => import('../views/asset_overview/TotalLiability.vue'),
      },
    ],
  },
  {
    path: '/tw-deposit',
    name: 'TWDeposit', //台幣支活存/定存
    redirect: { name: 'TWCheckCurrentDeposit' },
    meta: { showHeader: true },
    component: () => import('../views/tw_deposit/TWDeposit.vue'),
    children: [
      {
        path: '010',
        name: 'TWCheckCurrentDeposit', //台幣支活存
        component: () => import('../views/tw_deposit/TWCheckCurrentDeposit.vue'),
      },
      {
        path: '020',
        name: 'TWFixedDeposit', //台幣定存
        component: () => import('../views/tw_deposit/TWFixedDeposit.vue'),
      },
    ],
  },
  {
    path: '/tw-deposit/010/details',
    name: 'TWCheckCurrentDepositDetails', //台幣支活存明細
    meta: { showHeader: true },
    component: () => import('../views/tw_deposit/TWCheckCurrentDepositDetails.vue'),
  },
  {
    path: '/tw-deposit/020/details',
    name: 'TWFixedDepositDetails', //台幣定存明細
    meta: { showHeader: true },
    component: () => import('../views/tw_deposit/TWFixedDepositDetails.vue'),
  },
  {
    path: '/foreign-deposit',
    name: 'ForeignDeposit', //外幣活存/定存
    meta: { showHeader: true },
    redirect: { name: 'ForeignCurrentDeposit' },
    component: () => import('../views/foreign_deposit/ForeignDeposit.vue'),
    children: [
      {
        path: '010',
        name: 'ForeignCurrentDeposit', //外幣活存
        component: () => import('../views/foreign_deposit/ForeignCurrentDeposit.vue'),
      },
      {
        path: '020',
        name: 'ForeignFixedDeposit', //外幣定存
        component: () => import('../views/foreign_deposit/ForeignFixedDeposit.vue'),
      },
    ],
  },
  {
    path: '/holdingPerformance',
    name: 'HoldingPerformance', //基金庫存績效
    meta: { showHeader: true },
    component: () => import('../views/fund/HoldingPerformance.vue'),
  },
  {
    path: '/oversea-bond',
    name: 'OverseaBond', //海外債券總覽
    meta: { showHeader: true },
    component: () => import('../views/oversea_bond/OverseaBond.vue'),
  },
  //ERROR PAGE錯誤頁
  {
    path: '/error',
    name: 'errorDefaultPage', //錯誤頁
    meta: { showHeader: true },
    component: () => import('../views/error_page/ErrorDefaultPage.vue'),
    props: (route) => ({ showHomeButton: route.query.showHomeButton }),
  },
  {
    path: '/:pathMatch(.*)*',
    meta: { showHeader: true },
    component: () => import('../views/error_page/ErrorDefaultPage.vue'),
    props: (route) => ({ showHomeButton: route.query.showHomeButton }),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        top: 0,
        behavior: 'smooth',
      };
    }
  },
  routes: routes,
});

// import { watch } from 'vue';
import { useEventListener } from '@vueuse/core';
import { useCommonStore } from '../stores/common';
import { useUserStore } from '../stores/user';
let firstCallPubApi = false; //判斷是否有call過OverviewInit

// eslint-disable-next-line no-unused-vars
router.beforeEach(async (to, from) => {
  const userStore = useUserStore();
  const common = useCommonStore();

  //loading 設定
  if (to.name === 'AssetView') {
    common.loadingPage = false;
  } else {
    common.loadingPage = true;
  }

  //接收data
  useEventListener(window, 'message', (e) => {
    //測試要拿掉
    // userStore.appData = 'test app Data';
    if (e.data.action) {
      if (e.data.action === 'sendData') {
        console.log(e.data.data);
        userStore.appData = e.data.data;
      }
    }
  });

  // await new Promise((resolve) => {
  //   watch(
  //     () => userStore.appData,
  //     async (newValue) => {
  //       console.log('我是拿到的data: ' + newValue);
  //       if (newValue) {
  //         if (!firstCallPubApi && to.name !== 'AssetView') {
  //           firstCallPubApi = true;
  //           try {
  //             await userStore.fetchOverviewInit({ data: newValue });
  //             resolve();
  //           } catch (error) {
  //             console.log(error);
  //           }
  //         } else if (to.name === 'AssetView') {
  //           resolve();
  //         }
  //       }
  //     }
  //   );
  // });

  if (!firstCallPubApi && to.name != 'AssetView') {
    firstCallPubApi = true;
    try {
      await userStore.fetchOverviewInit({ idNo: 'B101128965' });
    } catch (error) {
      console.log(error);
    }
  }
});

export default router;
