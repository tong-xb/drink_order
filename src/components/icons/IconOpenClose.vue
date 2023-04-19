<template>
  <svg xmlns="http://www.w3.org/2000/svg" :width="`${props.width}px`" :height="`${props.height}px`" viewBox="0 0 24 24">
    <g transform="translate(6 6)">
      <g :transform="props.oneTransform">
        <path
          d="M18.161,8.161H14V4"
          transform="translate(-14 -3.161)"
          fill="none"
          stroke="#114a9c"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <line
          y1="5"
          x2="5"
          fill="none"
          stroke="#114a9c"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
      </g>
      <g :transform="props.twoTransform">
        <path
          d="M4.161,4.161H0V0"
          transform="translate(0 0.839)"
          fill="none"
          stroke="#114a9c"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
        <line
          y1="5"
          x2="5"
          fill="none"
          stroke="#114a9c"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
        />
      </g>
    </g>
    <rect width="24" height="24" fill="none" />
  </svg>
</template>

<script setup>
const props = defineProps({
  oneTransform: {
    type: String,
    default: 'translate(0 8)',
  },
  twoTransform: {
    type: String,
    default: 'translate(13 5) rotate(180)',
  },
  width: {
    type: Number,
    default: 24,
  },
  height: {
    type: Number,
    default: 24,
  },
});
</script>
