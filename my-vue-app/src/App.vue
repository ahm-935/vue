<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import "./assets/css/style.css";
import Sidebar from "./views/layouts/Sidebar.vue";
import Navbar from "./views/layouts/Navbar.vue";
import Footer from "./views/layouts/Footer.vue";import Pagehead from "./components/Pagehead.vue";
</script>

<template>
  <!-- ===== Desktop Sidebar (lg ও তার উপরে) ===== -->
  <Sidebar />



  <div class="main">
    <!-- ===== Navbar ===== -->
   <Navbar />

    <main class="content">
      <RouterView />

     <Footer />
    </main>
  </div>
</template>
