<template>
  <div :style="{ padding: props.padding, color: props.color }">
    <slot />
  </div>
</template>

<script setup>
const props = defineProps({
  padding: {
    type: String,
    default: '16px 9px',
  },
  color: {
    type: String,
    default: 'currentColor',
  },
});
</script>

<style lang="scss" scoped>
:slotted(div) {
  overflow: auto;
  line-height: 1.8em;
  font-size: 14px;
  ol {
    padding: 0;
    margin: 0;
    counter-reset: num;
    li {
      margin-left: 1.5em;
    }
  }
}
</style>
