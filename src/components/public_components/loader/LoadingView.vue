<template>
  <transition leave-active-class="animate__animated animate__fadeOut animate__faster">
    <div class="loading" v-if="common.loadingScreen"></div>
  </transition>
</template>

<script setup>
import { useCommonStore } from '@/stores/common';
const common = useCommonStore();
</script>

<style lang="scss" scoped></style>
