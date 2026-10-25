<script setup>
import { useUiStore } from '@/stores/ui'
import ToastStack from '@/components/ToastStack.vue'
const ui = useUiStore()
</script>

<template>
  <div class="auth-wrap">
    <aside class="auth-hero">
      <div class="d-flex align-items-center gap-2 fw-bold fs-5">
        <span class="brand-mark"><i class="bi bi-hexagon-fill"></i></span>
        Nova Admin
      </div>

      <div style="max-width: 460px">
        <h1 class="display-5 fw-bold mb-3" style="letter-spacing: -0.03em">
          Run your business from one clean dashboard.
        </h1>
        <p class="fs-6 opacity-75 mb-4">
          Manage users, products and insights with a fast, responsive admin panel built on Vue 3 and Bootstrap.
        </p>
        <div class="d-flex gap-4 small opacity-75">
          <div><i class="bi bi-shield-check me-1"></i> Secure</div>
          <div><i class="bi bi-phone me-1"></i> Responsive</div>
          <div><i class="bi bi-moon-stars me-1"></i> Dark mode</div>
        </div>
      </div>

      <div class="small opacity-50">© {{ new Date().getFullYear() }} Nova Admin</div>
    </aside>

    <section class="auth-panel position-relative">
      <button
        class="icon-btn position-absolute top-0 end-0 m-3"
        :aria-label="'Switch to ' + (ui.theme === 'dark' ? 'light' : 'dark') + ' mode'"
        @click="ui.toggleTheme"
      >
        <i class="bi" :class="ui.theme === 'dark' ? 'bi-sun' : 'bi-moon-stars'"></i>
      </button>
      <div class="auth-card">
        <slot />
      </div>
    </section>
    <ToastStack />
  </div>
</template>
