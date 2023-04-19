<template>
  <div
    class="divButton"
    :style="{ color: props.color, background: props.background, width: props.width, display: props.display }"
  >
    {{ props.wording }}
  </div>
</template>

<script setup>
const props = defineProps({
  wording: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#ffffff',
  },
  background: {
    type: String,
    default: '#0856a0',
  },
  width: {
    type: String,
    default: '128px',
  },
  display: {
    type: String,
    default: 'inline-block',
  },
});
</script>

<style lang="scss" scoped>
.divButton {
  text-align: center;
  line-height: 1.8em;
  margin: 0 auto;
  margin-top: 10px;
  height: 1.8em;
  border-radius: 50px;
  font-weight: bold;
  cursor: pointer;
}
</style>
