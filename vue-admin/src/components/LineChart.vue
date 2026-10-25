<script setup>
// Dependency-free responsive SVG area/line chart.
import { computed } from 'vue'

const props = defineProps({
  labels: { type: Array, required: true },
  series: { type: Array, required: true }, // [{ name, data: number[], cls }]
  height: { type: Number, default: 280 },
})

const W = 720
const pad = { t: 16, r: 12, b: 28, l: 44 }

const max = computed(() => {
  const m = Math.max(...props.series.flatMap((s) => s.data))
  const step = 10 ** Math.floor(Math.log10(m || 1))
  return Math.ceil(m / step) * step
})
const ticks = computed(() => Array.from({ length: 5 }, (_, i) => (max.value / 4) * i))
const x = (i) => pad.l + (i * (W - pad.l - pad.r)) / Math.max(1, props.labels.length - 1)
const y = (v) => pad.t + (props.height - pad.t - pad.b) * (1 - v / max.value)

const path = (data) => data.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ')
const area = (data) => `${path(data)} L${x(data.length - 1)},${y(0)} L${x(0)},${y(0)} Z`
const fmt = (v) => (v >= 1000 ? `${v / 1000}k` : v)
</script>

<template>
  <svg class="chart-svg w-100" :viewBox="`0 0 ${W} ${height}`" role="img" aria-label="Line chart">
    <defs>
      <linearGradient id="gradPrimary" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0" stop-color="#4f46e5" stop-opacity="0.28" />
        <stop offset="1" stop-color="#4f46e5" stop-opacity="0" />
      </linearGradient>
    </defs>

    <g v-for="t in ticks" :key="t">
      <line class="chart-grid" :x1="pad.l" :x2="W - pad.r" :y1="y(t)" :y2="y(t)" />
      <text :x="pad.l - 8" :y="y(t) + 4" text-anchor="end">{{ fmt(t) }}</text>
    </g>

    <text v-for="(l, i) in labels" :key="l" :x="x(i)" :y="height - 8" text-anchor="middle">{{ l }}</text>

    <path v-if="series[0]" :d="area(series[0].data)" fill="url(#gradPrimary)" />
    <path
      v-for="s in series"
      :key="s.name"
      :d="path(s.data)"
      fill="none"
      :class="s.cls"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <template v-for="s in series" :key="`${s.name}-dots`">
      <circle v-for="(v, i) in s.data" :key="i" :cx="x(i)" :cy="y(v)" r="3.5" :class="s.cls" fill="var(--nova-surface)" stroke-width="2">
        <title>{{ s.name }} · {{ labels[i] }}: {{ v.toLocaleString() }}</title>
      </circle>
    </template>
  </svg>
</template>
