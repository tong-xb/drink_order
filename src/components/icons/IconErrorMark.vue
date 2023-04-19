<template>
  <svg
    :width="props.iconSize"
    :height="props.iconSize"
    viewBox="0 0 24 24"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby="errorIconTitle"
    :stroke="props.iconColor"
    stroke-width="1"
    stroke-linecap="square"
    stroke-linejoin="miter"
    fill="none"
    :color="props.iconColor"
  >
    <title id="errorIconTitle">Error</title>
    <path d="M12 8L12 13" :stroke-width="strokeWidth" />
    <line x1="12" y1="16" x2="12" y2="16" :stroke-width="strokeWidth" />
    <circle cx="12" cy="12" r="10" :stroke-width="strokeWidth" />
  </svg>
</template>

<script setup>
const props = defineProps({
  iconSize: {
    type: String,
    default: '100',
  },
  iconColor: {
    type: String,
    default: '#0856a0',
  },
  strokeWidth: {
    type: Number,
    default: 1.5,
  },
});
</script>
