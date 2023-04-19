<template>
  <nav class="tab-nav cursor-pointer" role="tablist">
    <div
      class="tab-item"
      role="tab"
      :class="{ active: tab.active }"
      :key="tab.tabId"
      v-for="tab in tabDataList"
      @click="tabSelected(tab)"
    >
      {{ tab.tabName }}
    </div>
  </nav>
</template>

<script setup>
import { onMounted, computed, reactive } from 'vue';
const props = defineProps({
  tabList: {
    type: Array,
    default: () => [],
  },
});
const tabData = reactive({
  tabList: [
    { tabId: '', tabName: '全部' },
    { tabId: 'TW', tabName: '臺股' },
    { tabId: 'US', tabName: '美股' },
    { tabId: 'HK', tabName: '港滬' },
  ],
});
const tabDataList = computed(() => {
  if (props.tabList.length == 0) {
    return tabData.tabList;
  }
  return props.tabList;
});
const tabSelected = (tab) => {
  tabDataList.value.forEach((_tab) => (_tab.active = false));
  tab.active = true;
  emit('tabSelected', tab);
};
const emit = defineEmits(['tabSelected']);

onMounted(() => {
  tabSelected(tabDataList.value[0]);
});
</script>
<style lang="scss" scoped>
.tab-nav {
  display: flex;
  flex-wrap: nowrap;
  padding: 0.5rem 1rem;
  overflow: auto;
  font-weight: 500;
  background-color: #fff;
  color: #000;
  ::before ::after {
    box-sizing: border-box;
  }
  .tab-item {
    white-space: nowrap;
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    &.active {
      font-weight: 800;
      opacity: 1;
      background-color: #46aefc;
      color: #000;
    }
  }
}
</style>
