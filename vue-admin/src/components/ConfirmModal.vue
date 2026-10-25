<script setup>
import BaseModal from './BaseModal.vue'

defineProps({
  modelValue: Boolean,
  title: { type: String, default: 'Are you sure?' },
  message: { type: String, default: 'This action cannot be undone.' },
  confirmText: { type: String, default: 'Delete' },
})
const emit = defineEmits(['update:modelValue', 'confirm'])
</script>

<template>
  <BaseModal :model-value="modelValue" :title="title" max-width="440px" @update:model-value="emit('update:modelValue', $event)">
    <div class="text-center py-2">
      <div class="stat-icon mx-auto mb-3 bg-danger-subtle text-danger" style="width: 64px; height: 64px; font-size: 1.8rem">
        <i class="bi bi-trash3"></i>
      </div>
      <p class="text-secondary mb-4">{{ message }}</p>
    </div>
    <div class="d-flex gap-2 justify-content-end">
      <button class="btn btn-light" @click="emit('update:modelValue', false)">Cancel</button>
      <button class="btn btn-danger" @click="emit('confirm')">{{ confirmText }}</button>
    </div>
  </BaseModal>
</template>
