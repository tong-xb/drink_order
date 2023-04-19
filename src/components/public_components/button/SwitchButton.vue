<template>
  <div class="cursor-pointer switchButton">
    <div class="buttonWord" :class="{ active: switchControl }" @click="switchTrigger(true)">
      {{ props.switchOn }}
    </div>
    <div class="buttonWord" :class="{ active: !switchControl }" @click="switchTrigger(false)">
      {{ props.switchOff }}
    </div>
  </div>
</template>
<script setup>
import { reactive, computed, watchEffect } from 'vue';
const props = defineProps({
  switchOn: {
    type: String,
    default: '',
  },
  switchOff: {
    type: String,
    default: '',
  },
  switchControl: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['update:switchControl']);

const switchData = reactive({
  switchOn: computed(() => {
    return props.switchOn;
  }),
  switchOff: computed(() => {
    return props.switchOff;
  }),
  switchControl: computed({
    get() {
      return props.switchControl;
    },
    set(newValue) {
      emit('update:switchControl', newValue);
    },
  }),
});

const switchTrigger = (newVal) => {
  switchData.switchControl = newVal;
};

watchEffect(() => switchData.switchControl);
</script>
<style lang="scss" scoped>
.switchButton {
  display: flex;
  background-color: #fff;
  border: #54b4fd 1px solid;
  border-radius: 10000px;
  line-height: 1.2rem;
  height: 1.2rem;
  max-width: 600px;
  font-size: 0.875rem;
  margin: auto;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  text-align: center;
  color: #38a8fd;
  .buttonWord {
    color: #38a8fd;
    text-decoration: none;
    height: 1.2rem;
    margin-left: 3%;
    margin-right: 3%;
    opacity: 1;
    width: 3.5rem;
    top: -1px;
    &.active {
      opacity: 1;
      background-color: #54b4fd;
      color: #ffffff;
      height: calc(1.2rem);
      line-height: calc(1.2rem);
      position: relative;
      opacity: 1;
      top: -1px;
      &::before {
        width: 16%;
        content: '';
        position: absolute;
        right: 100%;
        top: 0;
        background-color: #54b4fd;
        height: calc(1.2rem);
        border-top-left-radius: 10000px;
        border-bottom-left-radius: 10000px;
      }

      &::after {
        width: 16%;
        content: '';
        position: absolute;
        left: 100%;
        top: 0;
        background-color: #54b4fd;
        height: calc(1.2rem);
        border-top-right-radius: 10000px;
        border-bottom-right-radius: 10000px;
      }
    }
  }
}
</style>
