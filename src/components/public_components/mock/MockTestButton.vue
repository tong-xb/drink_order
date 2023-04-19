<template>
  <div v-if="mockStore.testVisible">
    <button @click="mockStore.testFn(props.routerName, 1)">測試資料1</button>
    <button @click="mockStore.testFn(props.routerName, 2)">測試資料2</button>
  </div>
</template>

<script setup>
import { useMockStore } from '@/stores/mock';
const mockStore = useMockStore();

const props = defineProps({
  routerName: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped></style>
