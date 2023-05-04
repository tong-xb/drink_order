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
    meta: { showHeader: false, showFooter: false },
    component: () => import('../views/order_system/LoginView.vue'),
  },
  {
    path: '/home-view',
    name: 'HomeView', //order system
    meta: { showHeader: true, showFooter: true },
    component: () => import('../views/order_system/HomeView.vue'),
  },
  {
    path: '/my-order-view',
    name: 'MyOrderView', //order system
    redirect: { name: 'Confirm' },
    meta: { showHeader: true, showFooter: true },
    component: () => import('../views/order_system/MyOrderView.vue'),
    children: [
      {
        path: 'confirm',
        name: 'Confirm', //confirm
        component: () => import('../views/order_system/MyOrderViewConfirm.vue'),
      },
      {
        path: 'change',
        name: 'Change', //change
        component: () => import('../views/order_system/MyOrderViewChange.vue'),
      },
      {
        path: 'complete',
        name: 'Complete', //complete
        component: () => import('../views/order_system/MyOrderViewComplete.vue'),
      },
    ],
  },
  {
    path: '/my-account-view',
    name: 'MyAccountView', //order system
    meta: { showHeader: true, showFooter: true },
    component: () => import('../views/order_system/MyAccountView.vue'),
  },
  {
    path: '/menu-view/:menuId',
    name: 'MenuView', //order system
    meta: { showHeader: true, showFooter: true },
    component: () => import('../views/order_system/MenuView.vue'),
    props: true,
  },
  {
    path: '/open-order-view',
    name: 'OpenOrderView', //order system
    meta: { showHeader: true, showFooter: true },
    component: () => import('../views/order_system/OpenOrderView.vue'),
    props: true,
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
  history: createWebHistory(),

  routes: routes,
});

// eslint-disable-next-line no-unused-vars
router.beforeEach(async (to, from) => {});

export default router;
