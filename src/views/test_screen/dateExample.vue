<template>
  <div>外幣活存</div>
  <DateSelect
    v-model:props-selected-date="selectedDate"
    props-format-date="Y-m-d"
    :minDate="minDate"
    :maxDate="maxDate"
    width="200px"
  />
</template>

<script setup>
import DateSelect from '@/components/public_components/date/DateSelect.vue';
import { formatDate } from '@/common/method_common/formatDate.js';

import { ref } from 'vue';

const selectedDate = ref(formatDate(new Date(), 'YYYY-MM-DD'));
const minDate = ref(new Date());
minDate.value.setMonth(minDate.value.getMonth() - 6);
const maxDate = ref(new Date());
</script>

<style lang="scss" scoped></style>
