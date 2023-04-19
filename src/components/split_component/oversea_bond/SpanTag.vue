<template>
  <span :class="props.classTag"><img v-if="props.flagImg != ''" :src="imgPath" />{{ props.txt }}</span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  txt: {
    type: String,
    default: '',
  },
  classTag: {
    type: String,
    default: '',
  },
  flagImg: {
    type: String,
    default: '',
  },
});

const imgPath = computed(() => {
  return new URL(`/src/assets/images/flag/flag_${props.flagImg}.svg`, import.meta.url).href;
});
</script>

<style lang="scss" scoped>
img {
  width: 12px;
  height: 12px;
  margin-right: 2px;
}
.font_red {
  color: rgb(255, 0, 0);
}
.font_green {
  color: rgb(0, 166, 81);
}
.bg_red {
  color: #fff;
  background: rgb(255, 0, 0);
  border-radius: 5px;
  padding: 0 5px;
}
.bg_green {
  color: #fff;
  background: #70ae47;
  border-radius: 5px;
  padding: 0 5px;
}
.r_tag {
  font-size: 0.875rem;
  color: #1bc1d5;
  background-color: #1bc1d51a;
  border-radius: 4px;
  padding: 5px;
}
</style>
