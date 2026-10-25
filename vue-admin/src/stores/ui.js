import { defineStore } from 'pinia'
import { ref } from 'vue'
import { load, save } from './storage'

export const useUiStore = defineStore('ui', () => {
  const theme = ref(load('nova:theme', null) ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
  const collapsed = ref(load('nova:collapsed', false)) // desktop icon-only mode
  const mobileOpen = ref(false) // off-canvas on < lg
  const toasts = ref([])

  function applyTheme() {
    document.documentElement.setAttribute('data-bs-theme', theme.value)
    // index.html reads this raw string, so store it unquoted
    try { localStorage.setItem('nova:theme', theme.value) } catch { /* ignore */ }
  }
  applyTheme()

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    applyTheme()
  }

  function toggleSidebar() {
    if (window.matchMedia('(min-width: 992px)').matches) {
      collapsed.value = !collapsed.value
      save('nova:collapsed', collapsed.value)
    } else {
      mobileOpen.value = !mobileOpen.value
    }
  }
  const closeMobile = () => (mobileOpen.value = false)

  function toast(message, type = 'success') {
    const id = Date.now() + Math.random()
    toasts.value.push({ id, message, type })
    setTimeout(() => (toasts.value = toasts.value.filter((t) => t.id !== id)), 3200)
  }

  return { theme, collapsed, mobileOpen, toasts, toggleTheme, toggleSidebar, closeMobile, toast }
})
