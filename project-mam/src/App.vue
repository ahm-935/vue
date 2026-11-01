<script setup lang="ts">
import './assets/css/style.css';
// import PageHead from './components/PageHead.vue';
import Footer from './views/layouts/Footer.vue';
import Navbar from './views/layouts/Navbar.vue';
import Sidebar from './views/layouts/Sidebar.vue';
import { useRoute } from 'vue-router';

const route = useRoute();

</script>

<template>
  <Sidebar v-if="!route.meta.noLayout" />

  <div class="main">

    <Navbar v-if="!route.meta.noLayout" />

    <main class="content">
      <router-view />

      <Footer />
    </main>
  </div>
</template>
