<script setup lang="ts"></script>

<template>
  <header class="navbar bg-body border-bottom px-3 sticky-top">
    <button class="btn btn-outline-secondary d-lg-none" id="burger">
      <i class="bi bi-list"></i>
    </button>
    <div class="ms-auto d-flex align-items-center gap-2">
      <div class="dropdown">
        <button
          class="btn btn-outline-secondary"
          data-bs-toggle="dropdown"
          title="Theme"
        >
          <i class="bi bi-circle-half"></i>
        </button>
        <ul class="dropdown-menu dropdown-menu-end">
          <li>
            <button class="dropdown-item" data-theme-set="light">
              <i class="bi bi-sun me-2"></i>Light
            </button>
          </li>
          <li>
            <button class="dropdown-item active" data-theme-set="dark">
              <i class="bi bi-moon-stars me-2"></i>Dark
            </button>
          </li>
          <li>
            <button class="dropdown-item" data-theme-set="auto">
              <i class="bi bi-circle-half me-2"></i>Auto
            </button>
          </li>
        </ul>
      </div>
      <div class="dropdown">
        <a
          href="#"
          class="d-flex align-items-center gap-2 text-decoration-none text-body"
          data-bs-toggle="dropdown"
          ><span class="avatar">AJ</span
          ><span class="d-none d-sm-inline">Alice Johnson</span></a
        >
        <ul class="dropdown-menu dropdown-menu-end">
          <li><a class="dropdown-item" href="profile.html">Profile</a></li>
          <li><a class="dropdown-item" href="settings.html">Settings</a></li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li>
            <RouterLink class="dropdown-item text-danger" to="/logout" id="logout">Log out</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>
