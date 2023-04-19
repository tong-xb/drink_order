<template>
  <div class="layout">
    <LoadingView></LoadingView>
    <header class="layout-header" :style="{ height: route.meta.showHeader ? '6vh' : '0vh' }">
      <BasicHeader :header-title="common.headerTitle" v-if="route.meta.showHeader" />
    </header>
    <main class="layout-content" :style="{ height: route.meta.showHeader ? 'calc(100vh - 6vh)' : 'calc(100vh)' }">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import LoadingView from './components/public_components/loader/LoadingView.vue';
import BasicHeader from './components/public_components/header/BasicHeader.vue';

import { onMounted, watchEffect } from 'vue';
import { useEventListener } from '@vueuse/core';
import { RouterView, useRoute, useRouter } from 'vue-router';
import { useCommonStore } from '@/stores/common';

const common = useCommonStore();

const router = useRouter();
const route = useRoute();

watchEffect(() => {
  if (route.name) {
    common.routerName = route.name;
    console.log(common.routerName);
  }
});

onMounted(() => {
  //偵測是否要上一頁
  useEventListener(window, 'message', (e) => {
    if (e.data.action) {
      if (e.data.action === 'goBack') {
        console.log(common.routerName);
        if (common.routerName === 'TotalAssets') {
          window.parent.postMessage(
            {
              action: 'goBack',
              fidoAuthorizationCode: 'ASSET_BANK',
              status: false,
              result: 'is first page',
            },
            e.origin
          );
        } else {
          router.go(-1);
          window.parent.postMessage(
            {
              action: 'goBack',
              fidoAuthorizationCode: 'ASSET_BANK',
              status: true,
              result: 'ok',
            },
            e.origin
          );
        }
      }
    }
  });
});
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
  overflow: hidden;
  .layout-content {
    overflow: auto;
  }
}
</style>
