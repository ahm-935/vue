<script setup>
import { onBeforeUnmount, watch } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  title: { type: String, default: '' },
  maxWidth: { type: String, default: '560px' },
})
const emit = defineEmits(['update:modelValue'])

const close = () => emit('update:modelValue', false)
const onKey = (e) => e.key === 'Escape' && close()

watch(
  () => props.modelValue,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
    open ? window.addEventListener('keydown', onKey) : window.removeEventListener('keydown', onKey)
  },
)
onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modelValue" class="modal-backdrop-vue" @mousedown.self="close">
        <div class="modal-vue pop-enter-active" :style="{ maxWidth }" role="dialog" aria-modal="true" :aria-label="title">
          <div class="d-flex align-items-center justify-content-between px-4 pt-3 pb-2">
            <h2 class="h5 fw-bold mb-0">{{ title }}</h2>
            <button type="button" class="btn-close" aria-label="Close" @click="close"></button>
          </div>
          <div class="px-4 pb-4 pt-2">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
