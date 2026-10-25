<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
     <aside class="sidebar bg-1 border-end">
    <RouterLink class="brand" to="/"><i class="bi bi-bar-chart-fill"></i> MyApp</RouterLink>
    <nav class="side-nav">
        <RouterLink class="side-link" active-class="active" to="/"><i class="bi bi-speedometer2"></i> Dashboard</RouterLink>
        <RouterLink class="side-link" :class="{ active: route.path.startsWith('/user') }" to="/users"><i class="bi bi-person-fill"></i> Users</RouterLink>
        <RouterLink class="side-link" :class="{ active: route.path.startsWith('/product') }" to="/products"><i class="bi bi-bag-fill"></i> Products</RouterLink>
    </nav>
  </aside>
    <!-- ===== Mobile Sidebar (Bootstrap Drawer) ===== -->
  <dialog
    class="drawer drawer-start"
    id="mobileSidebar"
    tabindex="-1"
    aria-labelledby="mobileSidebarLabel"
  >
    <div class="drawer-header">
      <h5 class="drawer-title" id="mobileSidebarLabel">AdminPro</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="drawer"
        aria-label="Close"
      ></button>
    </div>
    <div class="drawer-body side-nav">
      <RouterLink class="side-link active" to="/"
        ><i class="bi bi-speedometer2"></i> Dashboard</RouterLink>
      <RouterLink class="side-link" :class="{ active: route.path.startsWith('/user') }" to="/users"
        ><i class="bi bi-person-fill"></i> Users</RouterLink>
      <RouterLink class="side-link" :class="{ active: route.path.startsWith('/product') }" to="/products"
        ><i class="bi bi-bag-fill"></i> Products</RouterLink>
    </div>
  </dialog>
</template>