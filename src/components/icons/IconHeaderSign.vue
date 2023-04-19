<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="6" height="22" viewBox="0 0 6 22">
    <rect width="6" height="22" :fill="props.iconColor" />
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
