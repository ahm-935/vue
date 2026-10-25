<script setup lang="ts">
defineProps({
    title: String,
    subtitle: String
})
</script>

<template>

     <div class="page-head">
        <div>
          <h1 class="page-title">{{ title }}</h1>
          <p v-if="subtitle" class="muted">{{ subtitle }}</p>
        </div>
       <slot></slot>
      </div>
</template>