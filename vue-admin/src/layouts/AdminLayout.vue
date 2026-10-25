<script setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import AppSidebar from '@/components/AppSidebar.vue'
import AppTopbar from '@/components/AppTopbar.vue'
import ToastStack from '@/components/ToastStack.vue'

const ui = useUiStore()
const route = useRoute()

// Close the off-canvas menu after navigating on small screens
watch(() => route.fullPath, ui.closeMobile)
</script>

<template>
  <div class="app-shell" :class="{ 'is-collapsed': ui.collapsed, 'is-open': ui.mobileOpen }">
    <AppSidebar />
    <Transition name="fade">
      <div v-if="ui.mobileOpen" class="app-backdrop d-lg-none" @click="ui.closeMobile" />
    </Transition>

    <div class="app-main">
      <AppTopbar />
      <main class="app-content">
        <slot />
      </main>
      <footer class="px-4 py-3 text-secondary small border-top" style="border-color: var(--nova-border) !important">
        © {{ new Date().getFullYear() }} Nova Admin · Built with Vue 3 &amp; Bootstrap
      </footer>
    </div>
    <ToastStack />
  </div>
</template>
