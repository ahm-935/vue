<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUiStore } from '@/stores/ui'
import { useAuthStore } from '@/stores/auth'

const ui = useUiStore()
const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const initials = computed(() =>
  (auth.user?.name ?? '?').split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase(),
)

function logout() {
  auth.logout()
  ui.toast('You have been signed out', 'info')
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="app-topbar">
    <button class="icon-btn" aria-label="Toggle sidebar" @click="ui.toggleSidebar">
      <i class="bi bi-list fs-4"></i>
    </button>

    <div class="topbar-search position-relative d-none d-md-block">
      <i class="bi bi-search"></i>
      <input type="search" class="form-control" placeholder="Search…" aria-label="Search" />
    </div>

    <h1 class="h6 fw-semibold mb-0 d-md-none text-truncate">{{ route.meta.title }}</h1>

    <div class="ms-auto d-flex align-items-center gap-1">
      <button
        class="icon-btn"
        :aria-label="'Switch to ' + (ui.theme === 'dark' ? 'light' : 'dark') + ' mode'"
        @click="ui.toggleTheme"
      >
        <i class="bi" :class="ui.theme === 'dark' ? 'bi-sun' : 'bi-moon-stars'"></i>
      </button>

      <div class="dropdown">
        <button class="icon-btn" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-label="Notifications">
          <i class="bi bi-bell"></i><span class="dot"></span>
        </button>
        <div class="dropdown-menu dropdown-menu-end p-0 shadow" style="width: min(340px, 92vw)">
          <div class="px-3 py-2 fw-semibold border-bottom">Notifications</div>
          <a v-for="n in [
            { i: 'bi-person-plus', t: 'New user registered', s: '2 min ago', c: 'primary' },
            { i: 'bi-cart-check', t: 'Order #4821 completed', s: '1 hour ago', c: 'success' },
            { i: 'bi-exclamation-triangle', t: 'Low stock: Orbit Desk Lamp', s: 'Yesterday', c: 'warning' },
          ]" :key="n.t" href="#" class="dropdown-item d-flex gap-3 py-2 align-items-start" @click.prevent>
            <span class="badge-soft info rounded-circle d-grid place-items-center" style="width:36px;height:36px;display:grid;place-items:center">
              <i class="bi" :class="[n.i, `text-${n.c}`]"></i>
            </span>
            <span class="text-wrap">
              <span class="d-block small fw-medium">{{ n.t }}</span>
              <span class="d-block text-secondary" style="font-size:.75rem">{{ n.s }}</span>
            </span>
          </a>
        </div>
      </div>

      <div class="dropdown">
        <button class="btn border-0 d-flex align-items-center gap-2 p-1 ps-2 rounded-pill" data-bs-toggle="dropdown" aria-label="Account menu">
          <span class="text-end d-none d-sm-block lh-sm">
            <span class="d-block small fw-semibold">{{ auth.user?.name }}</span>
            <span class="d-block text-secondary" style="font-size: 0.72rem">{{ auth.user?.role }}</span>
          </span>
          <span class="avatar avatar-sm">{{ initials }}</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-end shadow">
          <li><RouterLink class="dropdown-item" to="/profile"><i class="bi bi-person me-2"></i>Profile</RouterLink></li>
          <li><RouterLink class="dropdown-item" to="/forms"><i class="bi bi-sliders me-2"></i>Settings</RouterLink></li>
          <li><hr class="dropdown-divider" /></li>
          <li><button class="dropdown-item text-danger" @click="logout"><i class="bi bi-box-arrow-right me-2"></i>Sign out</button></li>
        </ul>
      </div>
    </div>
  </header>
</template>
