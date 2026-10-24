<script setup lang="ts">
// import Img from '../../assets/hero.png';
import Img from "@/assets/hero.png";
const alt = "image";

defineProps({
    name: String,
    roll: Number,
    status: Boolean
})
</script>

<template>
  <div :style="{ background: 'red', color: 'white' }">
    <h2>Hello World</h2>
    <img :src="Img" :alt="alt" :width="100" />
    <p v-if="name">Name: {{ name }}</p>
    <p v-else>Name: Not Found</p>
    <p>Roll: {{ roll }}</p>
    <p>Status: {{ status }}</p>
    <slot />
</div>
</template>

<style scoped></style>