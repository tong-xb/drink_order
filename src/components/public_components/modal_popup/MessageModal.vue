<template>
  <BaseModal v-model:modal-visible="modalVisible" :blank-close="props.blankClose" :width="props.width" :top="props.top">
    <template #default>
      <slot></slot>
    </template>
    <template #footer>
      <div class="flex-vh-center">
        <button class="close" type="button" v-if="props.buttonType === 'home' ? true : false" @click="toHome">
          回到資產總覽
        </button>
        <button class="close" type="button" v-if="props.buttonType === 'close' ? true : false" @click="closeModal()">
          關閉
        </button>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseModal from '@/components/public_components/modal_popup/BaseModal.vue';

import { ref, reactive, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  modalVisible: {
    type: Boolean,
    default: false,
  },
  blankClose: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: '90%',
  },
  top: {
    type: String,
    default: '25vh',
  },
  buttonType: {
    type: String,
    default: 'close',
  },
  router: {
    type: Object,
    default: () => {
      return {};
    },
  },
});

const emit = defineEmits(['update:modalVisible']);

const modalVisible = ref(props.modalVisible);
const router = Object.keys(props.router).length === 0 ? useRouter() : reactive(props.router);

watch(
  () => props.modalVisible,
  (newValue) => {
    emit('update:modalVisible', newValue);
    modalVisible.value = newValue;
  }
);

const closeModal = () => {
  emit('update:modalVisible', false);
  modalVisible.value = false;
};

const toHome = () => {
  router.push({ name: 'TotalAssets' });
  emit('update:modalVisible', false);
  modalVisible.value = false;
};

onMounted(() => {});
</script>

<style lang="scss" scoped>
.close {
  width: 100%;
  background-color: #005bac;
  font-size: 20px;
  border: 0px;
  color: #ffffff;
  border-radius: 0.25rem;
  padding-top: 6px;
  padding-bottom: 7px;
}
</style>
