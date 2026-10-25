<script setup>
import { useUiStore } from '@/stores/ui'
const ui = useUiStore()
const icons = { success: 'bi-check-circle-fill', danger: 'bi-x-octagon-fill', info: 'bi-info-circle-fill' }
</script>

<template>
  <div class="toast-stack" aria-live="polite">
    <TransitionGroup name="page">
      <div
        v-for="t in ui.toasts"
        :key="t.id"
        class="toast show align-items-center border-0 text-bg-dark shadow"
        role="status"
      >
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center gap-2">
            <i class="bi" :class="[icons[t.type] ?? icons.info, `text-${t.type}`]"></i>
            {{ t.message }}
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>
