<script setup>
import { computed } from 'vue'

const props = defineProps({
  page: { type: Number, required: true },
  perPage: { type: Number, required: true },
  total: { type: Number, required: true },
})
const emit = defineEmits(['update:page'])

const pages = computed(() => Math.max(1, Math.ceil(props.total / props.perPage)))
const from = computed(() => (props.total === 0 ? 0 : (props.page - 1) * props.perPage + 1))
const to = computed(() => Math.min(props.page * props.perPage, props.total))
const go = (p) => emit('update:page', Math.min(Math.max(1, p), pages.value))
</script>

<template>
  <div class="d-flex flex-column flex-sm-row align-items-center justify-content-between gap-2 px-3 py-3 border-top" style="border-color: var(--nova-border) !important">
    <small class="text-secondary">Showing {{ from }}–{{ to }} of {{ total }}</small>
    <ul class="pagination pagination-sm mb-0">
      <li class="page-item" :class="{ disabled: page === 1 }">
        <button class="page-link" aria-label="Previous" @click="go(page - 1)"><i class="bi bi-chevron-left"></i></button>
      </li>
      <li v-for="p in pages" :key="p" class="page-item" :class="{ active: p === page }">
        <button class="page-link" @click="go(p)">{{ p }}</button>
      </li>
      <li class="page-item" :class="{ disabled: page === pages }">
        <button class="page-link" aria-label="Next" @click="go(page + 1)"><i class="bi bi-chevron-right"></i></button>
      </li>
    </ul>
  </div>
</template>
