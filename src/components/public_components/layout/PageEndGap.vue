<template>
  <div
    :style="{
      height: props.height,
      background: props.background,
    }"
  ></div>
</template>

<script setup>
const props = defineProps({
  height: {
    type: String,
    default: '200px',
  },
  background: {
    type: String,
    default: '#ffffff',
  },
});
</script>

<style lang="scss" scoped></style>
