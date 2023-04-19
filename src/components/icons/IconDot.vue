<template>
  <svg width="8" height="8">
    <circle cx="4" cy="4" r="4" :fill="props.iconColor" />
  </svg>
</template>

<script setup>
const props = defineProps({
  iconColor: {
    type: String,
    default: 'currentColor',
  },
});
</script>
