<template>
  <div class="modal-background" v-if="props.modalVisible"></div>
  <transition enter-active-class="animate__animated animate__zoomIn animate__faster">
    <div ref="baseModal" class="base-modal" :style="{ paddingTop: props.top }" v-if="props.modalVisible">
      <!-- Modal content -->
      <div :style="{ width: props.width }" class="content">
        <header>
          <slot name="header"></slot>
        </header>
        <main>
          <slot></slot>
        </main>
        <footer>
          <slot name="footer"></slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script setup>
import 'animate.css';
import { ref, watch, onMounted } from 'vue';
import { useEventListener } from '@vueuse/core';

const baseModal = ref(null);

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
});

const emit = defineEmits(['update:modalVisible']);

watch(
  () => props.modalVisible,
  (newValue) => {
    emit('update:modalVisible', newValue);
    if (newValue) {
      document.body.style.overflow = 'hidden'; // 鎖定背景
    } else {
      document.body.style.overflow = 'auto'; // 還原body的overflow屬性
    }
  }
);

const closeModal = (e) => {
  if (e.target === baseModal.value && props.blankClose) {
    emit('update:modalVisible', false);
  }
};

onMounted(() => {
  useEventListener(document, 'click', closeModal);
});
</script>

<style lang="scss" scoped>
.modal-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.3s ease-in-out;
}
.base-modal {
  position: fixed; /* Stay in place */
  z-index: 100; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: hidden; /* Enable scroll if needed */

  /* Modal Content */
  .content {
    display: flex;
    flex-direction: column;
    background-color: #fefefe;
    margin: auto;
    border: 1px solid #888;
    border-radius: 0.5rem;
    min-height: 20vh;
    max-height: 60vh;
    font-size: 1.1rem;

    main {
      flex-grow: 1;
      padding: 15px;
      overflow: auto;
    }
  }
}
</style>
