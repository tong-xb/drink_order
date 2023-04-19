<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="7.207" height="13.414" viewBox="0 0 7.207 13.414">
    <path
      d="M12,6,6,0,0,6"
      transform="translate(6.707 0.707) rotate(90)"
      fill="none"
      :stroke="props.strokeColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="props.strokeWidth"
    />
  </svg>
</template>

<script setup>
const props = defineProps({
  strokeColor: {
    type: String,
    default: 'currentColor',
  },
  strokeWidth: {
    type: String,
    default: '2',
  },
});
</script>
