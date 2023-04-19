<template>
  <div class="note-modal-background" v-if="props.modalVisible"></div>
  <transition
    enter-active-class="animate__animated animate__slideInUp animate__faster"
    leave-active-class="animate__animated animate__fadeOutDownBig animate__faster"
  >
    <div class="note-base-modal" v-if="props.modalVisible">
      <div class="content">
        <header>
          <slot name="header">
            <div class="note-modal-header">
              <p>{{ props.headerTitle }}</p>
              <div @click="closeModal()" class="note-modal-close">
                <IconClose iconSize="20" />
              </div>
            </div>
          </slot>
        </header>
        <main>
          <slot name="body"></slot>
        </main>
      </div>
    </div>
  </transition>
</template>
<script setup>
import IconClose from '@/components/icons/IconClose.vue';
import 'animate.css';
import { watch } from 'vue';

const props = defineProps({
  modalVisible: {
    type: Boolean,
    default: false,
  },
  headerTitle: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modalVisible']);

watch(
  () => props.modalVisible,
  (newValue) => {
    emit('update:modalVisible', newValue);
    if (newValue) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
);

const closeModal = () => {
  emit('update:modalVisible', false);
};
</script>
<style lang="scss" scoped>
.note-modal-background {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(1px);
  transition: opacity 0.3s ease-in-out;
}
.note-base-modal {
  position: fixed;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-height: 85vh;
  min-height: 50vh;
  overflow: hidden;
  .note-modal-header {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .note-modal-close {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content {
    width: 100%;
    background-color: #fefefe;
    margin: 0 auto;
    border: 1px solid #888;
    border-radius: 0.5rem;
    font-size: 1.1rem;
    overflow: hidden;

    header {
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
      height: 50px;
      line-height: 50px;
      font-weight: 600;
      font-size: 1.125rem;
      background: #eee;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
      z-index: 1;
      overflow: hidden;
      p {
        padding: 0 40px;
        overflow: hidden;
      }
    }
    main {
      padding: 20px 15px 40px;
      overflow: auto;
      max-height: calc(85vh - 50px);
      min-height: calc(50vh - 50px);
      :slotted(ol) {
        padding: 0;
        margin: 0;
        counter-reset: num;
        li {
          margin-left: 1.5em;
        }
      }
    }
  }
}
</style>
