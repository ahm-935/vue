<script setup lang="ts">
import { api } from "@/api";
import { useCounterState } from "@/store/Count";
import { useRouter } from "vue-router";
const route = useRouter();
const counter = useCounterState();
function handleLogout() {
  api
    .post("/logout")
    .then((res) => {
      console.log(res.data);
      localStorage.removeItem("vue-token");
      route.push({ name: "Login" });
    })
    .catch((err) => {
      console.error(err.response.data);
    });
}
</script>
<template>
  <!-- ===== Navbar ===== -->
  <header class="navbar topbar bg-1 border-bottom">
    <button
      class="btn-icon menu-toggle"
      type="button"
      data-bs-toggle="drawer"
      data-bs-target="#mobileSidebar"
      aria-controls="mobileSidebar"
      aria-label="Open menu"
    >
      <i class="bi bi-list fs-xl"></i>
    </button>
    <span>Count: {{ counter.count }}</span>
    <span>I {{ counter.id }}</span>
    <span class="topbar-title">Dashboard</span>

    <div class="topbar-right">
      <!-- Bootstrap Toggler plugin: <html> এর data-bs-theme অ্যাট্রিবিউট অন/অফ করে -->
      <button
        type="button"
        class="btn-icon"
        aria-label="Toggle dark mode"
        data-bs-toggle="toggler"
        data-bs-target="html"
        data-bs-attribute="data-bs-theme"
        data-bs-value="dark"
      >
        <i class="bi bi-moon-stars"></i>
      </button>

      <!-- Bootstrap Menu plugin -->
      <div>
        <button
          type="button"
          class="btn-text user-btn"
          data-bs-toggle="menu"
          aria-expanded="false"
        >
          <span class="user-badge">A</span>
          <span class="d-none sm:d-inline">Admin</span>
        </button>
        <div class="menu">
          <a class="menu-item" href="#">Profile</a>
          <a class="menu-item" href="#">Settings</a>
          <div class="menu-divider"></div>
          <RouterLink class="menu-item" to="/login" @click="handleLogout"
            >Logout</RouterLink
          >
        </div>
      </div>
    </div>
  </header>
</template>
