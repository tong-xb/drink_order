<template>
  <div class="date-picker">
    <input
      ref="calendar"
      class="searchSelect"
      :style="{ width: props.width }"
      type="text"
      v-model="selectedDate"
      readonly
      autocomplete="off"
      @focus="onFocus"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/l10n/zh.js';
import { formatDate } from '@/common/method_common/formatDate.js';

const props = defineProps({
  propsSelectedDate: {
    type: String,
    default: formatDate(new Date(), 'YYYY-MM-DD'),
  },
  propsFormatDate: {
    type: String,
    default: 'Y/m/d',
  },
  minDate: {
    type: Date,
    default: null,
  },
  maxDate: {
    type: Date,
    default: null,
  },
  width: {
    type: String,
    default: '100vw',
  },
});

const emit = defineEmits(['update:propsSelectedDate']);

const selectedDate = computed({
  get() {
    return props.propsSelectedDate;
  },
  set(newValue) {
    emit('update:propsSelectedDate', newValue);
  },
});

const calendar = ref(null);
const minDateString = computed(() => {
  return formatDate(props.minDate, 'YYYY-MM-DD');
});
const maxDateString = computed(() => {
  return formatDate(props.maxDate, 'YYYY-MM-DD');
});

const onFocus = () => {
  calendar.value.blur();
};

onMounted(() => {
  Flatpickr(calendar.value, {
    locale: 'zh',
    dateFormat: props.propsFormatDate,
    disableMobile: 'true',
    minDate: minDateString.value,
    maxDate: maxDateString.value,
    allowInput: false,
    onChange: (selectedDates) => {
      selectedDate.value = formatDate(selectedDates[0], 'YYYY-MM-DD');
    },
  });
});
</script>

<style lang="scss" scoped>
.date-picker {
  display: inline-block;
  position: relative;

  input {
    border: #0856a0 1px solid;
    border-radius: 5px;
    color: #0856a0;
    height: 25px;
    font-size: 1.1em;
    text-indent: 10px;
    font-family: verdana, Times New Roman, 微軟正黑體, 新細明體;
    &:focus {
      outline: none;
      border-color: #0856a0;
    }
  }

  .searchSelect {
    margin: unset;
    background-size: 27px 27px;
    background-repeat: no-repeat;
    background-position: right;
    padding: 5px 0px;
    margin-top: 5px;
    background-image: url(@/assets/images/icon/arrow_down.png);
  }
}
</style>
