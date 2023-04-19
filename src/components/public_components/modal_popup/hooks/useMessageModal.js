import { createVNode, render, ref } from 'vue';
import MessageModal from '@/components/public_components/modal_popup/MessageModal.vue';
import { useRouter } from 'vue-router';

export function useDefaultModal() {
  const router = useRouter();
  const containerRef = ref(null);
  const modalVisible = ref(false);

  function createModal(buttonType = 'close', slot = createVNode('p', null, '頁面發生錯誤')) {
    containerRef.value = document.createElement('div');
    document.body.appendChild(containerRef.value);

    const vnode = createVNode(
      MessageModal,
      {
        modalVisible: modalVisible.value,
        'onUpdate:modalVisible': (value) => {
          modalVisible.value = value;
        },
        buttonType: buttonType,
        router: router,
      },
      {
        default: () => slot,
      }
    );
    render(vnode, containerRef.value);
  }

  return {
    modalVisible,
    createModal,
  };
}
