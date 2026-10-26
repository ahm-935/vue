<script setup lang="ts">
import './assets/css/style.css';
// import PageHead from './components/PageHead.vue';
import Footer from './views/layouts/Footer.vue';
import Navbar from './views/layouts/Navbar.vue';
import Sidebar from './views/layouts/Sidebar.vue';

</script>

<template>
  <Sidebar />

  <div class="main">

    <Navbar />

    <main class="content">
      <router-view />

      <Footer />
    </main>
  </div>
</template>
