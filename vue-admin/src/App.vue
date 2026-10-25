<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AdminLayout from '@/layouts/AdminLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const route = useRoute()
const Layout = computed(() => (route.meta.layout === 'auth' ? AuthLayout : AdminLayout))
</script>

<template>
  <component :is="Layout">
    <RouterView v-slot="{ Component }">
      <Transition name="page" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </component>
</template>
