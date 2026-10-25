<script setup>
const nav = [
  { heading: 'Overview' },
  { to: '/', icon: 'bi-grid-1x2-fill', label: 'Dashboard' },
  { heading: 'Management' },
  { to: '/users', icon: 'bi-people-fill', label: 'Users' },
  { to: '/products', icon: 'bi-box-seam-fill', label: 'Products' },
  { heading: 'Components' },
  { to: '/forms', icon: 'bi-ui-checks-grid', label: 'Form Group' },
  { heading: 'Account' },
  { to: '/profile', icon: 'bi-person-circle', label: 'Profile' },
]
</script>

<template>
  <aside class="app-sidebar" aria-label="Main navigation">
    <RouterLink to="/" class="sidebar-brand">
      <span class="brand-mark"><i class="bi bi-hexagon-fill"></i></span>
      <span class="brand-text">Nova Admin</span>
    </RouterLink>

    <nav class="sidebar-scroll">
      <template v-for="(item, i) in nav" :key="i">
        <div v-if="item.heading" class="sidebar-heading">{{ item.heading }}</div>
        <RouterLink v-else :to="item.to" class="sidebar-link" :title="item.label">
          <i class="bi" :class="item.icon"></i>
          <span class="sidebar-label">{{ item.label }}</span>
        </RouterLink>
      </template>
    </nav>

    <div class="sidebar-card">
      <div class="fw-semibold text-white mb-1">Need a hand?</div>
      <div class="mb-2" style="color: #94a3b8">Swap the demo stores for your API to go live.</div>
      <a class="btn btn-sm btn-light w-100" href="https://vuejs.org/guide/" target="_blank" rel="noopener">Read the docs</a>
    </div>
  </aside>
</template>
