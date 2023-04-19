<template>
  <div class="error-page">
    <!-- 錯誤icon -->
    <div>
      <IconErrorMark />
    </div>
    <!-- 錯誤訊息 -->
    <div class="error-message">
      <p>{{ common.errorPageMessage }}</p>
    </div>
    <!--按鈕-->
    <div v-if="props.showHomeButton === 'true'" class="error-btn" @click="router.push({ name: 'TotalAssets' })">
      <OvalDivButton wording="回資產總覽" background="#0856a0" display="block" />
    </div>
  </div>
</template>

<script setup>
import IconErrorMark from '@/components/icons/IconErrorMark.vue';
import OvalDivButton from '@/components/public_components/button/OvalDivButton.vue';
import { useCommonStore } from '@/stores/common';
import { useRouter } from 'vue-router';
import { onMounted } from 'vue';

const router = useRouter();
const common = useCommonStore();

const props = defineProps({
  showHomeButton: {
    type: String,
    default: 'true',
  },
});

onMounted(() => {
  common.headerTitle = '錯誤頁';
});
</script>

<style lang="scss" scoped>
.error-page {
  height: 100vh;
  padding: 100px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  .error-message {
    width: 70%;
    margin: 30px auto 10px;
    text-align: center;
    p {
      font-weight: 500;
      line-height: 1.4em;
      color: var(--yt-c-dove-gray);
    }
  }
}
</style>
