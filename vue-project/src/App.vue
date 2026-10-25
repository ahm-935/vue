<script setup lang="ts">
// import Loop from "./components/Loop.vue";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
<nav class="nav">
  <router-link to="/">Home</router-link> |
  <router-link to="/form">Form</router-link>|
  <router-link to="/student">Student</router-link>
</nav>
<RouterView></RouterView>
</template>

<style scoped>
nav {
  padding: 30px;
  margin: 0 auto;
}
</style>
