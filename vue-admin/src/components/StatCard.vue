<script setup>
defineProps({
  label: String,
  value: String,
  icon: String,
  change: Number, // percentage, positive or negative
  tone: { type: String, default: 'primary' }, // primary | success | warning | info
})
</script>

<template>
  <div class="card h-100">
    <div class="card-body d-flex align-items-center gap-3">
      <div class="stat-icon" :class="`bg-${tone}-subtle text-${tone}`">
        <i class="bi" :class="icon"></i>
      </div>
      <div class="min-w-0">
        <div class="text-secondary small fw-medium text-truncate">{{ label }}</div>
        <div class="stat-value">{{ value }}</div>
        <div v-if="change !== undefined" class="small fw-semibold" :class="change >= 0 ? 'trend-up' : 'trend-down'">
          <i class="bi" :class="change >= 0 ? 'bi-arrow-up-right' : 'bi-arrow-down-right'"></i>
          {{ Math.abs(change) }}% <span class="text-secondary fw-normal">vs last month</span>
        </div>
      </div>
    </div>
  </div>
</template>
