<script setup  lang="ts">
</script>

<template>
  <aside class="sidebar p-3 open" id="sidebar"><a class="brand d-flex align-items-center gap-2 mb-4"
        href="/"><i class="bi bi-grid-1x2-fill text-primary"></i> AdminKit</a>
      <ul class="nav flex-column gap-1">
        <li><a class="nav-link active" href="/"><i class="bi bi-speedometer2"></i>Dashboard</a></li>
        <li><a class="nav-link " href="/users"><i class="bi bi-people"></i>Users</a></li>
        <li><a class="nav-link " href="/products"><i class="bi bi-box-seam"></i>Products</a></li>
        <li><a class="nav-link " href="/profile"><i class="bi bi-person-circle"></i>My profile</a></li>
        <li><a class="nav-link " href="/settings"><i class="bi bi-gear"></i>Settings</a></li>
      </ul>
      <hr>
      <div class="small text-body-secondary px-2 mb-1">Pages</div>
      <ul class="nav flex-column small">
        <li><a class="nav-link py-1" href="/login"><i class="bi bi-file-earmark"></i>login</a></li>
        <li><a class="nav-link py-1" href="/register"><i class="bi bi-file-earmark"></i>register</a></li>
        <li><a class="nav-link py-1" href="/403"><i class="bi bi-file-earmark"></i>403</a></li>
        <li><a class="nav-link py-1" href="/404"><i class="bi bi-file-earmark"></i>404</a></li>
        <li><a class="nav-link py-1" href="/500"><i class="bi bi-file-earmark"></i>500</a></li>
      </ul>
    </aside>
</template>