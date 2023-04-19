<template>
  <div class="header">
    <h1 class="header-title">{{ common.headerTitle }}</h1>
  </div>
</template>

<script setup>
import { useCommonStore } from '@/stores/common';
const common = useCommonStore();
</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 6vh;
  background: #005bac;
  &-title {
    font-size: 17px;
    line-height: 1.4em;
    font-weight: 500;
    color: #ffffff;
  }
}
</style>
